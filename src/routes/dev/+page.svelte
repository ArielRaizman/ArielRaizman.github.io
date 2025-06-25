<script>
  import { onMount } from 'svelte';
  import masterImageData from '../../lib/assets/image-data.json';

  let imageData = [];
  let currentImageIndex = -1;
  let filteredImages = [];
  let searchField = 'image_name';
  let searchValue = '';
  let formData = {
    image_name: '',
    location: '',
    title: '',
    link: ''
  };

  // New state for custom key-value pair
  let newKey = '';
  let newValue = '';
  let showCustomField = false;

  let saveStatus = ''; // Add this near other state variables
  let saveTimeout;

  onMount(() => {
    imageData = [...masterImageData];
    filteredImages = [...imageData];
    if (filteredImages.length > 0) {
      currentImageIndex = 0;
      displayImage(filteredImages[0]);
    }
  });

  function handleSearch() {
    if (searchValue === '') {
      filteredImages = [...imageData];
    } else {
      filteredImages = imageData.filter(img => {
        const fieldValue = (img[searchField] || '').toLowerCase();
        return fieldValue.includes(searchValue.toLowerCase());
      });
    }
    
    // Reset current image if no results found
    if (filteredImages.length === 0) {
      currentImageIndex = -1;
      formData = {
        image_name: '',
        location: '',
        title: '',
        link: ''
      };
    } else if (currentImageIndex === -1 || currentImageIndex >= filteredImages.length) {
      // If we had no selection or the current index is out of bounds, select the first result
      currentImageIndex = 0;
      displayImage(filteredImages[0]);
    }
  }

  function displayImage(imageInfo) {
    formData = { ...imageInfo };  // Copy all properties, not just the default ones
    showCustomField = false;  // Reset custom field visibility
    newKey = '';
    newValue = '';
  }

  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      displayImage(filteredImages[currentImageIndex]);
    }
  }

  function nextImage() {
    if (currentImageIndex < filteredImages.length - 1) {
      currentImageIndex++;
      displayImage(filteredImages[currentImageIndex]);
    }
  }

  function addCustomField() {
    if (newKey && newValue) {
      formData[newKey] = newValue;
      showCustomField = false;
      newKey = '';
      newValue = '';
    }
  }

  function removeField(key) {
    if (key !== 'image_name' && key !== 'location' && key !== 'title' && key !== 'link') {
      // Delete from formData
      delete formData[key];
      formData = { ...formData }; // Trigger reactivity

      // Delete from the current image in filteredImages
      if (currentImageIndex !== -1) {
        delete filteredImages[currentImageIndex][key];
        filteredImages = [...filteredImages]; // Trigger reactivity
      }

      // Delete from the corresponding image in imageData
      const mainIndex = imageData.findIndex(img => img.image_name === formData.image_name);
      if (mainIndex !== -1) {
        delete imageData[mainIndex][key];
        imageData = [...imageData]; // Trigger reactivity
      }

      saveChanges(); // Automatically save after deleting a field
    }
  }

  async function saveChanges() {
    if (currentImageIndex === -1) return;
    
    const currentImage = filteredImages[currentImageIndex];
    
    // Update both the filtered and main arrays
    Object.assign(currentImage, formData);
    const mainIndex = imageData.findIndex(img => img.image_name === currentImage.image_name);
    if (mainIndex !== -1) {
      Object.assign(imageData[mainIndex], formData);
    }

    try {
      saveStatus = 'Saving...';
      
      const response = await fetch('/api/save-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageData, null, 2)
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to save');
      }

      saveStatus = 'Saved!';
      
      // Clear the status after 2 seconds
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveStatus = '';
      }, 2000);

    } catch (error) {
      console.error('Error saving:', error);
      saveStatus = 'Error saving!';
      
      // Create a backup download just in case
      const jsonString = JSON.stringify(imageData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Clear the error status after 3 seconds
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveStatus = '';
      }, 3000);
    }
  }

  $: {
    searchValue;
    handleSearch();
  }
</script>

<svelte:head>
  <title>JSON Editor - Dev Tools</title>
</svelte:head>

<div class="container">
  <div class="search-panel">
    <h2>Search & Filter</h2>
    <div class="search-field">
      <label for="searchField">Search Field:</label>
      <select id="searchField" class="search-input" bind:value={searchField}>
        <option value="image_name">Image Name</option>
        <option value="location">Location</option>
        <option value="title">Title</option>
        <option value="link">Link</option>
      </select>
    </div>
    <div class="search-field">
      <label for="searchValue">Search Value:</label>
      <input type="text" id="searchValue" class="search-input" placeholder="Enter search term..." bind:value={searchValue}>
    </div>
    <div class="results-list">
      {#each filteredImages as img, i}
        <div 
          class="result-item" 
          class:active={i === currentImageIndex}
          on:click={() => {
            currentImageIndex = i;
            displayImage(img);
          }}
        >
          {img.image_name}
        </div>
      {/each}
    </div>
  </div>
  <div class="image-panel">
    <div class="preview-container">
      {#if currentImageIndex !== -1}
        <img 
          src={`/src/lib/assets/${filteredImages[currentImageIndex].image_name}`} 
          alt="Selected image"
        >
      {:else}
        <div class="no-image">No image selected</div>
      {/if}
    </div>
    <form class="metadata-form" on:submit|preventDefault>
      <!-- Default fields -->
      <label for="image_name">Image Name:</label>
      <input type="text" id="image_name" bind:value={formData.image_name} readonly>
      
      <label for="location">Location:</label>
      <input type="text" id="location" bind:value={formData.location}>
      
      <label for="title">Title:</label>
      <input type="text" id="title" bind:value={formData.title}>
      
      <label for="link">Link:</label>
      <input type="text" id="link" bind:value={formData.link}>

      <!-- Custom fields -->
      {#each Object.entries(formData) as [key, value]}
        {#if !['image_name', 'location', 'title', 'link'].includes(key)}
          <div class="custom-field">
            <label for={key}>{key}:</label>
            <div class="field-with-delete">
              <input type="text" id={key} bind:value={formData[key]}>
              <button type="button" class="delete-btn" on:click={() => removeField(key)}>×</button>
            </div>
          </div>
        {/if}
      {/each}

      <!-- Add new custom field -->
      {#if showCustomField}
        <div class="add-custom-field">
          <div class="custom-field-inputs">
            <input 
              type="text" 
              placeholder="Key" 
              bind:value={newKey}
              class="custom-key"
            >
            <input 
              type="text" 
              placeholder="Value" 
              bind:value={newValue}
              class="custom-value"
            >
          </div>
          <div class="custom-field-buttons">
            <button type="button" class="add-btn" on:click={addCustomField}>Add</button>
            <button type="button" class="cancel-btn" on:click={() => showCustomField = false}>Cancel</button>
          </div>
        </div>
      {:else}
        <button type="button" class="add-field-btn" on:click={() => showCustomField = true}>
          + Add Custom Field
        </button>
      {/if}
      
      <div class="navigation">
        <button type="button" on:click={prevImage} disabled={currentImageIndex <= 0}>Previous</button>
        <div class="save-container">
          <button type="button" on:click={saveChanges} disabled={saveStatus === 'Saving...'}>
            {saveStatus || 'Save Changes'}
          </button>
          {#if saveStatus === 'Error saving!'}
            <span class="save-note">Backup file downloaded</span>
          {/if}
        </div>
        <button type="button" on:click={nextImage} disabled={currentImageIndex >= filteredImages.length - 1}>Next</button>
      </div>
    </form>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .search-panel {
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .image-panel {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .search-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  .search-field {
    margin-bottom: 15px;
  }

  .preview-container {
    margin: 20px 0;
    text-align: center;
  }

  .preview-container img {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
  }

  .no-image {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    color: #666;
  }

  .metadata-form {
    margin-top: 20px;
  }

  .metadata-form label {
    display: block;
    margin-top: 10px;
  }

  .metadata-form input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: #0056b3;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .results-list {
    max-height: 400px;
    overflow-y: auto;
    margin-top: 10px;
  }

  .result-item {
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }

  .result-item:hover {
    background: #f0f0f0;
  }

  .result-item.active {
    background: #e3f2fd;
  }

  .custom-field {
    margin-top: 15px;
  }

  .field-with-delete {
    display: flex;
    gap: 8px;
  }

  .delete-btn {
    padding: 8px 12px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }

  .delete-btn:hover {
    background: #c82333;
  }

  .add-custom-field {
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .custom-field-inputs {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8px;
    margin-bottom: 10px;
  }

  .custom-field-buttons {
    display: flex;
    gap: 8px;
  }

  .add-btn {
    background: #28a745;
  }

  .add-btn:hover {
    background: #218838;
  }

  .cancel-btn {
    background: #6c757d;
  }

  .cancel-btn:hover {
    background: #5a6268;
  }

  .add-field-btn {
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    background: #f8f9fa;
    color: #007bff;
    border: 2px dashed #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .add-field-btn:hover {
    background: #e2e6ea;
    color: #0056b3;
    border-color: #0056b3;
  }

  .save-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .save-note {
    font-size: 12px;
    color: #dc3545;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
</style> 
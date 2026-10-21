<script>
  let { name = '', description = '' } = $props();

  let visible = $state(false);
  let dividerEl = $state(null);

  $effect(() => {
    if (!dividerEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(dividerEl);
    return () => observer.disconnect();
  });
</script>

<div class="subcategory-divider" class:visible bind:this={dividerEl}>
  <div class="divider-line">
    <span class="line-segment"></span>
    {#if name}
      <h3 class="subcategory-title">{name}</h3>
    {/if}
    <span class="line-segment"></span>
  </div>
  {#if description}
    <p class="subcategory-description">{description}</p>
  {/if}
</div>

<style>
  .subcategory-divider {
    padding: 48px 0 20px;
    text-align: center;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .subcategory-divider.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .divider-line {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .line-segment {
    flex: 1;
    height: 1px;
    background: rgba(0, 0, 0, 0.10);
  }

  .subcategory-title {
    font-family: 'Georgia', serif;
    font-size: 0.85rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #999;
    margin: 0;
    line-height: 1;
    white-space: nowrap;
  }

  .subcategory-description {
    font-family: 'Georgia', serif;
    font-size: 0.76rem;
    font-style: italic;
    color: #b0b0b0;
    margin: 8px 0 0;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    .subcategory-divider {
      padding: 36px 0 16px;
    }

    .subcategory-title {
      font-size: 0.65rem;
      letter-spacing: 0.14em;
    }

    .divider-line {
      gap: 12px;
    }
  }
</style>

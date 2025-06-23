const fs = require('fs');
const path = require('path');

// Read all JSON files
const imageData = require('./image_data.json');
const tideData = require('./src/lib/assets/galleries/tide/tide.json');
const valleyData = require('./src/lib/assets/galleries/valley/valley.json');
const cascadiaData = require('./src/lib/assets/galleries/cascadia/cascadia.json');
const bearData = require('./src/lib/assets/galleries/bear/bear.json');
const bayData = require('./src/lib/assets/galleries/bay/bay.json');

// Create lookup maps for each gallery
const createLookup = (data) => {
  const lookup = {};
  data.forEach(item => {
    lookup[item.filename] = item;
  });
  return lookup;
};

const tideLookup = createLookup(tideData);
const valleyLookup = createLookup(valleyData);
const cascadiaLookup = createLookup(cascadiaData);
const bearLookup = createLookup(bearData);
const bayLookup = createLookup(bayData);

// Combine the data
const combinedData = imageData.map(item => {
  const result = { ...item };
  const location = item.location;
  
  let lookup = null;
  if (location.includes('tide')) {
    lookup = tideLookup;
  } else if (location.includes('valley')) {
    lookup = valleyLookup;
  } else if (location.includes('cascadia')) {
    lookup = cascadiaLookup;
  } else if (location.includes('bear')) {
    lookup = bearLookup;
  } else if (location.includes('bay')) {
    lookup = bayLookup;
  }
  
  if (lookup) {
    const galleryInfo = lookup[item.image_name];
    if (galleryInfo) {
      result.title = galleryInfo.title;
      result.link = galleryInfo.link;
      if (galleryInfo.location) {
        result.image_location = galleryInfo.location;
      }
    }
  }
  
  return result;
});

// Write the combined data to a file
fs.writeFileSync(
  'combined_image_data.json', 
  JSON.stringify(combinedData, null, 2)
);

console.log('Combined image data saved to combined_image_data.json');
export async function getPlants(term: string) {
  const resPerenual = await fetch(
    `https://perenual.com/api/species-list?key=${process.env.API_KEY_PERENUAL}&q=${term}`
  );
  const resTrefle = await fetch(
    `http://trefle.io/api/v1/plants/search?token=${process.env.API_KEY_TREFLE}&q=${term}`
  );

  const dataPerenual = await resPerenual.json();
  const dataTrefle = await resTrefle.json();

  // Assuming you have the two JSON sources stored in variables data1 and data2

  // Normalize the first JSON data
  const normalizedData1 = dataPerenual.data.map((item: any) => {
    const {
      id,
      common_name,
      scientific_name,
      other_name,
      cycle,
      watering,
      sunlight,
      default_image,
    } = item;

    // Define the image URLs in the preferred order
    const imageUrls = [
      default_image?.original_url,
      default_image?.regular_url,
      default_image?.medium_url,
      default_image?.small_url,
    ];

    // Find the first non-empty and non-null URL
    const validImageUrl = imageUrls.find(
      (url) => url !== undefined && url !== null && url !== ""
    );

    if (!validImageUrl) {
      console.log("There is no valid image for item with ID:", id);
    }

    const normalizedItem = {
      source: "perenual", // Assuming this is the source for this data
      id,
      common_name,
      scientific_name,
      other_name,
      cycle,
      watering,
      sunlight,
      image:
        validImageUrl ||
        "https://st4.depositphotos.com/32990740/41533/v/450/depositphotos_415335606-stock-illustration-gardening-concept-plant-in-a.jpg", // Use null if no valid URL is found
    };

    return normalizedItem;
  });

  // Normalize the second JSON data
  const normalizedData2 = dataTrefle.data.map((item: any) => {
    return {
      source: "trefle", // Add a source identifier for the second JSON
      id: item.id,
      common_name: item.common_name,
      scientific_name: [item.scientific_name],
      other_name: item.synonyms,
      cycle: "N/A", // Add a placeholder value for cycle, as it's not present in the second JSON
      watering: "N/A", // Add a placeholder value for watering, as it's not present in the second JSON
      sunlight: [], // Add a placeholder value for sunlight, as it's not present in the second JSON
      image:
        item?.image_url ||
        "https://st4.depositphotos.com/32990740/41533/v/450/depositphotos_415335606-stock-illustration-gardening-concept-plant-in-a.jpg",
    };
  });

  // Combine the normalized data
  const combinedData = [...normalizedData2, ...normalizedData1];

  // Now combinedData will have the format you specified
  return combinedData;
}

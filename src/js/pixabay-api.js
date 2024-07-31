export async function searchImageByQuery(query, page = 1, perPage = 15) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '45098523-0f66f1bf08e0be6a1e71621a5';

  try {
    const response = await fetch(
      `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}

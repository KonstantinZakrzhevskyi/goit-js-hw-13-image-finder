const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '23616749-9d77515f343e9cfce3b12231a';

const params = 'image_type=photo&orientation=horizontal';
const query = '';
const pageNumber = 1;
const perPage = 12;



function fetchGallery(query) {
  const url = (`${BASE_URL}/?${params}&q=${query}&page=${pageNumber}&per_page=${perPage}&key=${API_KEY}`);
  console.log(url);

  return fetch(url).then(response => response.json());
}






const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '23616749-9d77515f343e9cfce3b12231a';

const params = 'image_type=photo&orientation=horizontal';
let searchQuery = '';
let pageNumber = 1;
const perPage = 12;



// function fetchGallery(query) {
//   const url = (`${BASE_URL}/?${params}&q=${query}&page=${pageNumber}&per_page=${perPage}&key=${API_KEY}`);
//   console.log(url);

//   return fetch(url).then(response => response.json());

// };

//   function incrementPage() {
//     perPage += 1
// };

//  function resetPage() {
//     perPage = 1
// };

//   get query() {
//     return this.searchQuery
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery
//   }


// export default { fetchGallery };




export default {
  async fetchGallery() {
    
    const url = (`${BASE_URL}/?${params}&q=${searchQuery}&page=${pageNumber}&per_page=${perPage}&key=${API_KEY}`);
    // console.log(url);

    const response = await fetch(url);
    const parseResponse = await response.json();
    this.incrementPage();
    return parseResponse.hits;


  },

  incrementPage() {
    pageNumber += 1;
  },

  resetPage() {
    pageNumber = 1;
  },

  get query() {
    return searchQuery;
  },

  set query(newQuery) {
    searchQuery = newQuery;
  },
};
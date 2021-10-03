import apiService from './apiService';
import refs from './refs';
import imageCardTpt from '../templates/imageCardTpt.hbs';

// import { debounce } from 'lodash';
import { Notify, Loading } from 'notiflix';

const { success, warning, failure, info } = Notify;

refs.searchForm.addEventListener('submit', onSearchImages);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchImages(e) {
  e.preventDefault();
  clearListItem();

  apiService.resetPage();
  const value = e.currentTarget.elements.query.value
  apiService.query = value;

  if (value === '') {
    info('Enter your request!');
    return
  }

  apiService.fetchGallery()
    .then(hits => {
     if (hits.length === 0) {
    warning('Enter the correct query!');
    return
  }
    const markup = buildListItemsTemplate(hits);
      insertListItems(markup);
      success('completed successfully!');
    }).then(show).catch(fetchError);
  e.currentTarget.elements.query.value = '';
  
};

function onLoadMore() {
  apiService.fetchGallery().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);


//     window.scrollTo(0, 1000);
    
//     window.scrollTo({
//     top:  1000,
//   behavior: "smooth",
// });

const stats = document.getElementById(hits[0].id);
stats.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
});

 });
    
}

function insertListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return imageCardTpt(items);
};

function show() {
refs.loadMore.classList.remove('is-hidden');
};

function clearListItem() {
  refs.gallery.innerHTML = '';
};

function fetchError(err) {
  failure('Error!!! Request not found!')
};







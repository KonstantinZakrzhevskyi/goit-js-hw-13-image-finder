import apiService from './apiService';
import refs from './refs';
import imageCardTpt from '../templates/imageCardTpt.hbs';

import { debounce } from 'lodash';
import { Notify, Loading } from 'notiflix';

const { success, warning, failure, info } = Notify;


// refs.searchFormBtn.addEventListener('submit', debounce(onSearchImages, 1000));
refs.searchForm.addEventListener('submit', onSearchImages);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchImages(e) {
  e.preventDefault();
  clearListItem();

  apiService.resetPage();
  apiService.query = e.currentTarget.elements.query.value;
  // apiService.query = e.target.value;

  // if (apiService.searchQuery.length < 1) {
  //   refs.gallery.imageCardTpt.innerHTML = ''
  //   return
  // }

  apiService.fetchGallery().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
  });
  e.currentTarget.elements.query.value = '';
  
}


function onLoadMore() {
  apiService.fetchGallery().then( hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
    scroll()
  });
}
function insertListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
function buildListItemsTemplate(items) {
  return imageCardTpt(items);
}

function scroll() {
  refs.loadMore.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
};

function clearListItem() {
  refs.gallery.innerHTML = '';
}

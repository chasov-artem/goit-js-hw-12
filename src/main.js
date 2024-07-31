import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pathSprite from '../src/img/icon.svg';

import { searchImageByQuery } from './js/pixabay-api.js';
import { renderImages, onFetchError } from './js/render-functions';

const searchForm = document.querySelector('.form-inline');
const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let queryValue = '';
let page = 1;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (queryValue === '') {
    iziToast.warning({
      title: '',
      message: 'Search query cannot be empty.',
      position: 'topRight',
      backgroundColor: 'red',
      icon: '',
      iconUrl: `${pathSprite}#icon-Group-1`,
    });
    return;
  }

  page = 1;
  imageContainer.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await searchImageByQuery(queryValue);

    if (data.hits.length > 0) {
      renderImages(data.hits);
    } else {
      iziToast.warning({
        title: '',
        backgroundColor: 'red',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        iconUrl: `${pathSprite}#icon-Group-1`,
      });
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    loader.style.display = 'none';
    searchForm.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await searchImageByQuery(queryValue, page);

    if (data.hits.length > 0) {
      renderImages(data.hits, true);
    } else {
      iziToast.warning({
        title: '',
        backgroundColor: 'red',
        message: 'No more images to load.',
        position: 'topRight',
        iconUrl: `${pathSprite}#icon-Group-1`,
      });
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    loader.style.display = 'none';
  }
}

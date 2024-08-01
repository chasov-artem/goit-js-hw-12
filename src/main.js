import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pathSprite from '../src/img/icon.svg';

import { searchImageByQuery } from './js/pixabay-api.js';
import { renderImages, onFetchError } from './js/render-functions';

const searchForm = document.querySelector('.form-inline');
const imageContainer = document.querySelector('.image-container');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let queryValue = '';
let page = 1;
let totalImagesLoaded = 0;
let totalHits = 0;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  queryValue = form.elements.query.value.trim().toLowerCase();

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
  totalImagesLoaded = 0;
  imageContainer.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await searchImageByQuery(queryValue, page);
    totalHits = data.totalHits;

    if (data.hits.length > 0) {
      renderImages(data.hits);
      totalImagesLoaded += data.hits.length;

      if (totalImagesLoaded < totalHits) {
        loadMoreBtn.style.display = 'block';
      } else {
        iziToast.info({
          title: '',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          backgroundColor: 'blue',
          icon: '',
          iconUrl: `${pathSprite}#icon-Group-1`,
        });
      }
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
    totalImagesLoaded += data.hits.length;

    if (data.hits.length > 0) {
      renderImages(data.hits, true);

      const { height: cardHeight } =
        imageContainer.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (totalImagesLoaded >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'blue',
        icon: '',
        iconUrl: `${pathSprite}#icon-Group-1`,
      });
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    loader.style.display = 'none';
  }
}

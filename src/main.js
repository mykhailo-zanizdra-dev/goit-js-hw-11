import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
} from './js/render-functions.js';

let queryString = '';

const form = document.querySelector('.form');
const searchButton = document.querySelector('.search-button');

form.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();

  if (queryString) {
    showLoader();
    searchButton.disabled = true;
    searchButton.classList.add('disabled');

    getImagesByQuery(queryString)
      .then(data => {
        if (!data?.hits?.length) {
          showError(
            'Sorry, there are no images matching your search query. Please try again!'
          );
          return;
        }
        createGallery(data.hits);
      })
      .catch(error => {
        showError(`Error fetching images: ${error.message}`);
      })
      .finally(() => {
        hideLoader();
        searchButton.disabled = false;
        searchButton.classList.remove('disabled');
      });
  }
});

form.addEventListener('input', e => {
  queryString = e.target.value.trim();
  if (queryString) {
    searchButton.classList.remove('disabled');
    searchButton.disabled = false;
  } else {
    searchButton.classList.add('disabled');
    searchButton.disabled = true;
  }
});

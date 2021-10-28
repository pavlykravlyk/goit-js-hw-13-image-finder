import photoCardsTpl from './templates/photo-card-template.hbs';
import debounce from 'lodash.debounce';
import PixabayApiService from './js/pixabay-api-service';
import NotificationPnotify from './js/notification-pnotify';
import './sass/main.scss';
import getRefs from './js/get-refs.js';

const refs = getRefs();
const elem = refs.photoCards.children;

const pixabayApiService = new PixabayApiService();
const error = new NotificationPnotify();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  pixabayApiService.query = event.target.value.trim();
  refs.photoCards.innerHTML = '';

  if (pixabayApiService.query !== '') {
    pixabayApiService.resetPage();
    lazyScroll();
  } else {
    error.empty();
  }
}

function fetchGallery() {
  pixabayApiService
    .fetchArticles()
    .then(hits => {
      appendPhotoCardsMarkup(hits);
      if (elem.length === 0) {
        error.noFound();
      }
    })
    .catch(error => error.error);
}

function appendPhotoCardsMarkup(hits) {
  refs.photoCards.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
}

function lazyScroll() {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchGallery();
      }
    });
  };

  const options = {
    rootMargin: '200px',
  };

  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.loadMore);
}

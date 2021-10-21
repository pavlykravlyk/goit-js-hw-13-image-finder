import photoCardsTpl from './templates/photo-card-template.hbs';
import debounce from 'lodash.debounce';
import PixabayApiService from './js/pixabay-api-service';
import LoadMoreBtn from './js/load-more-btn';
import NotificationPnotify from './js/notification-pnotify';
import './sass/main.scss';
import getRefs from './js/get-refs.js';

const refs = getRefs();
const elem = refs.photoCards.children;

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
const error = new NotificationPnotify();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(event) {
  pixabayApiService.query = event.target.value.trim();
  refs.photoCards.innerHTML = '';

  if (pixabayApiService.query !== '') {
    pixabayApiService.resetPage();
    fetchGallery();
    loadMoreBtn.show();
  } else {
    loadMoreBtn.hide();
    error.empty();
  }
}

function fetchGallery() {
  loadMoreBtn.disable();

  pixabayApiService
    .fetchArticles()
    .then(hits => {
      appendPhotoCardsMarkup(hits);
      if (elem.length === 0) {
        loadMoreBtn.hide();
        error.noFound();
      }
      loadMoreBtn.enable();
      onGalleryScroll();
    })
    .catch(error => error.error);
}

function appendPhotoCardsMarkup(hits) {
  refs.photoCards.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
}

function onGalleryScroll() {
  setTimeout(() => {
    loadMoreBtn.refs.button.scrollIntoView({
      behavior: 'smooth',
      // block: 'end',
    });
  }, 500);
}

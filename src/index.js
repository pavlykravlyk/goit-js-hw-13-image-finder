import photoCardsTpl from './templates/photo-card-template.hbs';
import debounce from 'lodash.debounce';
import PixabayApiService from './js/pixabay-api-service';
import LoadMoreBtn from './js/load-more-btn';
import NotificationPnotify from './js/notification-pnotify';
import './sass/main.scss';
import getRefs from './js/get-refs.js';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
const error = new NotificationPnotify();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(event) {
  pixabayApiService.query = event.target.value.trim();

  refs.photoCards.innerHTML = '';

  if (pixabayApiService.query === '') {
    loadMoreBtn.hide();
    return error.empty();
  }

  pixabayApiService.resetPage();
  fetchGallery();
  loadMoreBtn.show();
}

function fetchGallery() {
  loadMoreBtn.disable();

  pixabayApiService.fetchArticles().then(hits => {
    appendPhotoCardsMarkup(hits);

    loadMoreBtn.enable();
    onGalleryScroll();
  });
}

function appendPhotoCardsMarkup(hits) {
  refs.photoCards.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
}

function onGalleryScroll() {
  const elem = refs.photoCards.children;
  elem[elem.length - pixabayApiService.perPage].scrollIntoView({
    behavior: 'smooth',
    // block: 'end',
  });
}

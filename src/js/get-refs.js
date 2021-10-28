export default function getRefs() {
  return {
    searchForm: document.getElementById('search-form'),
    photoCards: document.querySelector('.gallery'),
    loadMore: document.getElementById('load-more'),
  };
}

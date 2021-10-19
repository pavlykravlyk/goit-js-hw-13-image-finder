const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23902495-d255dd7217da8bb07f7abae59';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 12;
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();

        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

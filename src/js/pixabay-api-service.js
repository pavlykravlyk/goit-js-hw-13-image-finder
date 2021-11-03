const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23902495-d255dd7217da8bb07f7abae59';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 12;
    this.page = 1;
    this.lang = 'ua, de, en, ru,';
  }

  async fetchArticles() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.page,
      per_page: this.perPage,
      lang: this.lang,
      key: API_KEY,
    });

    const response = await fetch(`${BASE_URL}?${searchParams}`);
    const articles = await response.json();

    this.incrementPage();

    return articles.hits;
    // return (await (await fetch(`${BASE_URL}?${searchParams}`)).json()).hits;
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

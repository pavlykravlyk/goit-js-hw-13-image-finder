const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23902495-d255dd7217da8bb07f7abae59';

export default class PixabayApiService {
  constructor() {}

  fetchArticles() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: '',
      page: 1,
      per_page: 12,
      lang: 'ua, de, en, ru,',
      key: API_KEY,
    });

    const url = `${BASE_URL}?${searchParams}`;

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

export default class Filters {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.filterRadios = document.querySelectorAll('input[name="type"]');
    this.searchBtn = document.getElementById('search');
    this.searchInput = document.querySelector('input[name="words"]');
  }

  onFilterChange(callback) {
    this.filterRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        callback();
      });
    });
  }

  onSearch(callback) {
    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        callback();
      });
    }
    
    if (this.searchInput) {
      this.searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          callback();
        }
      });
    }
  }
}
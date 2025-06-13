import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  price?: number;
  category: string;
  code: string;
  content?: string;
}

@Component({
  selector: 'app-giveaway',
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.scss']
})
export class GiveawayComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  searchTerm: string = '';
  selectedCategories: string[] = [];
  categories: string[] = [];
  sliderPositions: { [key: string]: number } = {};
  favorites: string[] = [];
  sidebarOpen: boolean = false;
  isLoading: boolean = false;
  modalSliderPosition: number = 0;
  categoryIcons: { [key: string]: string } = {
    'vip': 'fas fa-star',
    'pens': 'fas fa-pen',
    'electronics': 'fas fa-laptop',
    'clothing': 'fas fa-tshirt',
    'books': 'fas fa-book',
  };

  constructor(private http: HttpClient) {
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  ngOnInit() {
    this.http.get<{ products: Product[] }>('../../../assets/products.json').subscribe(data => {
      this.products = data.products;
      this.filteredProducts = [...this.products];
      this.categories = [...new Set(this.products.map(p => p.category))];
      this.filteredProducts.forEach(product => {
        this.sliderPositions[product.id] = 0;
      });
    });
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
    this.filteredProducts.forEach(product => {
      if (!(product.id in this.sliderPositions)) {
        this.sliderPositions[product.id] = 0;
      }
    });
  }

  toggleCategory(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;
    const category = target.value;
    if (target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    }
    setTimeout(() => {
      this.applyFilters();
      this.isLoading = false;
    }, 500);
  }

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || 'fas fa-question-circle';
  }

  openModal(product: Product) {
    this.selectedProduct = { ...product };
    this.modalSliderPosition = 0;
    this.updateModalSlider();
  }

  closeModal(event?: Event) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.selectedProduct = null;
      }
    } else {
      this.selectedProduct = null;
    }
  }

  slideLeft(productId: string) {
    const product = this.filteredProducts.find(p => p.id === productId);
    if (product) {
      const currentIndex = this.sliderPositions[productId];
      const newIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
      this.sliderPositions[productId] = newIndex;
      const slider = document.querySelector(`#slider-${productId}`) as HTMLElement;
      if (slider) {
        slider.scrollTo({
          left: newIndex * slider.offsetWidth,
          behavior: 'smooth'
        });
      }
    }
  }

  slideRight(productId: string) {
    const product = this.filteredProducts.find(p => p.id === productId);
    if (product) {
      const currentIndex = this.sliderPositions[productId];
      const newIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
      this.sliderPositions[productId] = newIndex;
      const slider = document.querySelector(`#slider-${productId}`) as HTMLElement;
      if (slider) {
        slider.scrollTo({
          left: newIndex * slider.offsetWidth,
          behavior: 'smooth'
        });
      }
    }
  }

  slideModalLeft() {
    if (this.selectedProduct) {
      const newIndex = this.modalSliderPosition === 0 ? this.selectedProduct.images.length - 1 : this.modalSliderPosition - 1;
      this.modalSliderPosition = newIndex;
      this.updateModalSlider();
    }
  }

  slideModalRight() {
    if (this.selectedProduct) {
      const newIndex = this.modalSliderPosition === this.selectedProduct.images.length - 1 ? 0 : this.modalSliderPosition + 1;
      this.modalSliderPosition = newIndex;
      this.updateModalSlider();
    }
  }

  updateModalSlider() {
    if (this.selectedProduct) {
      const slider = document.querySelector(`#modal-slider-${this.selectedProduct.id}`) as HTMLElement;
      if (slider) {
        slider.scrollTo({
          left: this.modalSliderPosition * slider.offsetWidth,
          behavior: 'smooth'
        });
      }
    }
  }

  toggleFavorite(productId: string) {
    const index = this.favorites.indexOf(productId);
    if (index === -1) {
      this.favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.updateFavoriteButton(productId, true);
    } else {
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.updateFavoriteButton(productId, false);
    }
  }

  updateFavoriteButton(productId: string, isFavorite: boolean) {
    const button = document.querySelector(`button.favorite-btn[data-product-id="${productId}"]`) as HTMLButtonElement;
    if (button) {
      const icon = button.querySelector('i');
      if (icon) {
        if (isFavorite) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          button.style.color = '#ff0000';
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
          button.style.color = '#ff0000';
          button.style.border = '1px solid #ff0000';
        }
      }
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  callUs() {
    const whatsappNumber = '+201062157623';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }
}
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-printing-home',
  templateUrl: './printing-home.component.html',
  styleUrls: ['./printing-home.component.scss']
})
export class PrintingHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('productSlider') productSlider!: ElementRef;

  products = [
    { type: 'Indoor', name: 'Indoor Banner', image: '../../../assets/image/outdoor1.jpg' },
    { type: 'Outdoor', name: 'Outdoor Billboard', image: '../../../assets/image/outdoor2.jpg' },
    { type: 'Indoor', name: 'Indoor Poster', image: '../../../assets/image/outdoor3.jpg' },
    { type: 'Outdoor', name: 'Outdoor Sign', image: '../../../assets/image/outdoor4.jpg' },
    { type: 'Indoor', name: 'Indoor Flyer', image: '../../../assets/image/outdoor6.jpg' },
    { type: 'Indoor', name: 'Indoor Brochure', image: '../../../assets/image/outdoor7.jpg' },
    { type: 'Indoor', name: 'Indoor Display', image: '../../../assets/image/outdoor8.jpg' },
  ];

  filteredProducts = [...this.products];
  private scrollAmount = 0;
  private scrollStep = 220;
  private direction = 1;
  private intervalId: any;

  showModal = false;
  selectedImage: string | null = null;
  isHovered = false;
  hoveredProduct: any = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustScrollStep();
  }

  ngAfterViewInit() {
    this.startAutoSlide();
    this.adjustScrollStep();
  }

  adjustScrollStep() {
    const sliderWidth = this.productSlider.nativeElement.clientWidth;
    this.scrollStep = sliderWidth * 0.7; // 70% of slider width for smoother mobile scrolling
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.autoSlide(), 3000);
  }

  autoSlide() {
    const slider = this.productSlider.nativeElement;
    this.scrollAmount += this.scrollStep * this.direction;
    if (this.scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      this.scrollAmount = slider.scrollWidth - slider.clientWidth;
      this.direction = -1;
    } else if (this.scrollAmount <= 0) {
      this.scrollAmount = 0;
      this.direction = 1;
    }
    slider.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
  }

  filterCategory(type: string) {
    if (type === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.type === type);
    }
    this.scrollAmount = 0;
    this.productSlider.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
  }

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
  }

  onHover(product: any) {
    if (window.innerWidth <= 576) {
      this.isHovered = true;
      this.hoveredProduct = product;
    }
  }

  onLeave() {
    if (window.innerWidth <= 576) {
      this.isHovered = false;
      this.hoveredProduct = null;
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showLogoFlag = false;

  showLogo(event: MouseEvent) {
    this.showLogoFlag = true;
    const overlay = (event.currentTarget as HTMLElement).querySelector('.overlay');
    if (overlay) overlay.classList.add('active');
  }

  hideLogo(event: MouseEvent) {
    this.showLogoFlag = false;
    const overlay = (event.currentTarget as HTMLElement).querySelector('.overlay');
    if (overlay) overlay.classList.remove('active');
  }
}
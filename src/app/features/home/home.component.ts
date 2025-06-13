import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        animate('1s ease-in-out', keyframes([
          style({ transform: 'translateX(-20px)', opacity: 0, offset: 0 }),
          style({ transform: 'translateX(20px)', opacity: 1, offset: 0.5 }),
          style({ transform: 'translateX(0)', opacity: 1, offset: 1 })
        ]))
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('counterAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('1.2s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
slideLeft() {
throw new Error('Method not implemented.');
}
slideRight() {
throw new Error('Method not implemented.');
}
  @ViewChild('clientSlider') clientSlider!: ElementRef;
  @ViewChild('productSlider') productSlider!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('counterSection') counterSection!: ElementRef;

  clients = [
    { name: 'Red Cross Organization', image: 'assets/image/Red Cross Organization.svg' },
    { name: 'Dream Land', image: 'assets/image/dream-land-logo.jpg' },
    { name: 'Banque Misr', image: 'assets/image/Banque Misr.png' },
    { name: 'Al Tadamun Finance Corporation', image: 'assets/image/tdamunlogo.svg' },
    { name: 'Al Shroouk Scan', image: 'assets/image/Al Shroouk Scan.png' },
    { name: 'Kalemat', image: 'assets/image/kalemat.png' },
    { name: 'IDF', image: 'assets/image/idf.png' },
    { name: 'Insha', image: 'assets/image/insha.png' },
    { name: 'Maven Development', image: 'assets/image/Maven Development.png' },
    { name: 'ISIS and Sekem', image: 'assets/image/ISIS and Sekem.png' },
    { name: 'Mega Scan', image: 'assets/image/Mega Scan.webp' },
    { name: 'Unitec', image: 'assets/image/Unitec.png' },
    { name: 'Global Napi Pharmaceuticals', image: 'assets/image/logoWithTextTransparent.png' }
  ];

  products = [
    { type: 'T-shirts', name: 'T-shirts', image: 'assets/image/product7.png' },
    { type: 'CUP', name: 'CUP', image: '../../../assets/image/product2.png' },
    { type: 'BAG', name: 'BAG', image: '../../../assets/image/product3.png' },
    { type: 'BAG', name: 'BAG', image: 'assets/image/product4.png' },
    { type: 'shield', name: 'shield', image: 'assets/image/product5.png' },
    { type: 'PENS', name: 'PENS', image: 'assets/image/product6.png' },
    { type: 'T-shirts', name: 'T-shirts', image: 'assets/image/product8.png' }
  ];

  private clientScrollAmount = 0;
  private clientScrollStep = 200;
  private clientDirection = 1; // تصحيح من 2 إلى 1 لتوافق الاتجاه
  private clientIntervalId: any;

  private productScrollAmount = 0;
  private productScrollStep = 220;
  private productDirection = 1;
  private productIntervalId: any;

  showModal = false;
  selectedImage: string | null = null;

  // Counter Data
  counters = [
    { label: 'Happy Clients', target: 1500, icon: 'fas fa-users' },
    { label: 'Products Created', target: 25000, icon: 'fas fa-box' },
    { label: 'Satisfied Clients (%)', target: 95, icon: 'fas fa-smile' },
    { label: 'Awards Won', target: 10, icon: 'fas fa-award' }
  ];

  ngAfterViewInit() {
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true;
    }
    this.startAutoSlideClients();
    this.startAutoSlideProducts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.startCounterAnimation();
  }

  // --- CLIENT SLIDER ---
  slideLeftClients() {
    const slider = this.clientSlider.nativeElement;
    this.clientScrollAmount -= this.clientScrollStep;
    if (this.clientScrollAmount < 0) {
      this.clientScrollAmount = 0;
      this.clientDirection = 1;
    }
    slider.scrollTo({ left: this.clientScrollAmount, behavior: 'smooth' });
  }

  slideRightClients() {
    const slider = this.clientSlider.nativeElement;
    this.clientScrollAmount += this.clientScrollStep;
    if (this.clientScrollAmount > (slider.scrollWidth - slider.clientWidth)) {
      this.clientScrollAmount = slider.scrollWidth - slider.clientWidth;
      this.clientDirection = -1;
    }
    slider.scrollTo({ left: this.clientScrollAmount, behavior: 'smooth' });
  }

  private autoSlideClients() {
    this.clientDirection === 1 ? this.slideRightClients() : this.slideLeftClients();
  }

  private startAutoSlideClients() {
    this.clientIntervalId = setInterval(() => this.autoSlideClients(), 2300);
  }

  // --- PRODUCT SLIDER ---
  slideLeftProducts() {
    const slider = this.productSlider.nativeElement;
    this.productScrollAmount -= this.productScrollStep;
    if (this.productScrollAmount < 0) {
      this.productScrollAmount = 0;
      this.productDirection = 1;
    }
    slider.scrollTo({ left: this.productScrollAmount, behavior: 'smooth' });
  }

  slideRightProducts() {
    const slider = this.productSlider.nativeElement;
    this.productScrollAmount += this.productScrollStep;
    if (this.productScrollAmount > (slider.scrollWidth - slider.clientWidth)) {
      this.productScrollAmount = slider.scrollWidth - slider.clientWidth;
      this.productDirection = -1;
    }
    slider.scrollTo({ left: this.productScrollAmount, behavior: 'smooth' });
  }

  private autoSlideProducts() {
    this.productDirection === 1 ? this.slideRightProducts() : this.slideLeftProducts();
  }

  private startAutoSlideProducts() {
    this.productIntervalId = setInterval(() => this.autoSlideProducts(), 3000);
  }

  // --- MODAL ---
  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.showModal = true;
  }

  closeModal(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.showModal = false;
        this.selectedImage = null;
      }
    } else {
      this.showModal = false;
      this.selectedImage = null;
    }
  }

  contactUs() {
    const whatsappNumber = '+201062157623';
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  }

  // --- COUNTER ANIMATION ---
  startCounterAnimation() {
    const section = this.counterSection?.nativeElement;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= 0 && rect.top < windowHeight) {
      const counters = section.querySelectorAll('.counter-number');
      counters.forEach((counter: HTMLElement) => {
        if (!counter.classList.contains('animated')) {
          const target = +counter.getAttribute('data-target')!;
          let count = 0;
          const duration = 2000; // 2 ثانية
          const increment = target / (duration / 16); // 60 إطار في الثانية
          const updateCounter = () => {
            if (count < target) {
              count += increment;
              counter.textContent = Math.ceil(count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              counter.classList.add('animated');
            }
          };
          requestAnimationFrame(updateCounter);
        }
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.clientIntervalId);
    clearInterval(this.productIntervalId);
  }
}
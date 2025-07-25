import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  activeLink: string = 'home';
  private fragmentSubscription!: Subscription;
  @ViewChild('navbarNav') navbarNav!: ElementRef;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setActiveLinkBasedOnRoute();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLinkBasedOnRoute();
        this.closeNavbar(); // إغلاق الـ Navbar بعد التنقل
      }
    });
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(fragment => {
      this.updateActiveLink(fragment);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.navbarNav && !this.navbarNav.nativeElement.contains(event.target as Node)) {
      this.closeNavbar();
    }
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    switch (link) {
      case 'home':
        this.router.navigate(['/'], { fragment: 'hero' });
        break;
      case 'about':
        this.router.navigate(['/about']);
        break;
      case 'services':
        this.router.navigate(['/'], { fragment: 'services' });
        break;
      case 'products':
        this.router.navigate(['/'], { fragment: 'products' });
        break;
      case 'contact':
        this.router.navigate(['/'], { fragment: 'contact' });
        break;
      case 'printing':
        this.router.navigate(['/printing']);
        break;
      case 'giveaway':
        this.router.navigate(['/giveaway']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
    this.closeNavbar(); // إغلاق الـ Navbar بعد النقر
  }

  toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      const isOpen = navbarCollapse.classList.contains('show');
      if (isOpen) {
        this.closeNavbar();
      } else {
        navbarCollapse.classList.add('show');
      }
    }
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }

  private setActiveLinkBasedOnRoute() {
    const url = this.router.url.split('#')[0];
    const fragment = this.activatedRoute.snapshot.fragment;

    if (url === '/' || url === '/home') {
      this.updateActiveLink(fragment);
    } else if (url === '/about') {
      this.activeLink = 'about';
    } else if (url === '/printing') {
      this.activeLink = 'printing';
    } else if (url === '/giveaway') {
      this.activeLink = 'giveaway';
    } else {
      this.activeLink = 'home';
    }
  }

  private updateActiveLink(fragment: string | null) {
    switch (fragment) {
      case 'hero':
        this.activeLink = 'home';
        break;
      case 'about':
        this.activeLink = 'about';
        break;
      case 'services':
        this.activeLink = 'services';
        break;
      case 'products':
        this.activeLink = 'products';
        break;
      case 'contact':
        this.activeLink = 'contact';
        break;
      default:
        const url = this.router.url.split('#')[0];
        if (url === '/' || url === '/home') {
          this.activeLink = 'home';
        } else if (url === '/about') {
          this.activeLink = 'about';
        }
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.html',
    styleUrl: './about.scss'
})
export class About {
    images = [
        'assets/img1.jpeg',
        'assets/foto1.png'
    ];

    currentIndex = 0;
    autoSlideInterval: any;

    ngAfterViewInit() {
        const section = document.querySelector('.about-container');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section?.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        if (section) observer.observe(section);
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextImage(), 10000);
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    prevImage() {
        this.currentIndex =
            this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    }

    ngOnDestroy() {
        if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
    }
}
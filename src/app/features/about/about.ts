import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/env/environment';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.html',
    styleUrls: ['./about.scss']
})
export class About implements AfterViewInit, OnDestroy {

    @ViewChild('aboutContainer', { static: true }) aboutContainer!: ElementRef<HTMLElement>;

    images: string[] = environment.profile.images ?? [];
    currentIndex = 0;
    private autoSlideInterval?: ReturnType<typeof setInterval>;
    private observer?: IntersectionObserver;

    ngAfterViewInit() {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.aboutContainer.nativeElement.classList.add('visible');
                    this.observer?.unobserve(entry.target);
                }
            });
        });
        if (this.aboutContainer && this.aboutContainer.nativeElement) {
            this.observer.observe(this.aboutContainer.nativeElement);
        }

        if (this.images.length > 0) {
            this.startAutoSlide();
        }
    }

    ngOnDestroy() {
        this.observer?.disconnect();
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = undefined;
        }
    }

    startAutoSlide() {
        if (this.autoSlideInterval) return;
        this.autoSlideInterval = setInterval(() => this.nextImage(), 10000);
    }

    nextImage() {
        if (!this.images.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    prevImage() {
        if (!this.images.length) return;
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    }
}
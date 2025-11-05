import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItem } from '../../core/models/timeline.model';
import { timeline } from '../../core/env/data-experience';
import { gsap } from 'gsap';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience.html',
    styleUrls: ['./experience.scss']
})
export class Experience implements AfterViewInit {
    @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dotsContainer', { static: true }) dotsContainer!: ElementRef<HTMLDivElement>;

    items: TimelineItem[] = timeline;
    currentIndex = 0;
    selectedFilter: 'work' | 'education' | 'cert' = 'work';
    selectedItem: TimelineItem | null = null;

    get filteredItems(): TimelineItem[] {
        return this.items.filter(i => i.type === this.selectedFilter);
    }

    ngAfterViewInit() {
        // Espera micro-tick para que DOM esté listo
        setTimeout(() => {
            this.syncView(true);
            // fuerza que la primera tarjeta aparezca activa
            const first = this.cardContainer.nativeElement.querySelector('.card') as HTMLElement | null;
            if (first) first.classList.add('active');
            // entrada suave
            gsap.from(this.cardContainer.nativeElement.querySelectorAll('.card'), {
                duration: 0.6,
                y: 18,
                opacity: 0,
                stagger: 0.04,
                ease: 'power3.out'
            });
        }, 40);
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.syncView();
        }
    }

    next() {
        if (this.currentIndex < this.filteredItems.length - 1) {
            this.currentIndex++;
            this.syncView();
        }
    }

    goTo(i: number) {
        if (i >= 0 && i < this.filteredItems.length) {
            this.currentIndex = i;
            this.syncView();
        }
    }

    setFilter(type: 'work' | 'education' | 'cert') {
        this.selectedFilter = type;
        this.currentIndex = 0;
        // small delay so DOM updates and syncView centers correctly
        setTimeout(() => this.syncView(true), 80);
    }

    openDetails(item: TimelineItem) {
        this.selectedItem = item;
        document.body.style.overflow = 'hidden';
    }

    closeDetails() {
        this.selectedItem = null;
        document.body.style.overflow = 'auto';
    }

    private syncView(skipAnim = false) {
        const container = this.cardContainer.nativeElement;
        const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
        if (!cards.length) return;

        // clamp currentIndex (por si cambias filtro y hay menos items)
        if (this.currentIndex >= cards.length) this.currentIndex = cards.length - 1;
        if (this.currentIndex < 0) this.currentIndex = 0;

        const active = cards[this.currentIndex];
        const vpWidth = container.parentElement?.clientWidth ?? container.clientWidth;
        const cardCenter = active.offsetLeft + active.offsetWidth / 2;
        const translateX = Math.max(0, cardCenter - vpWidth / 2);

        if (skipAnim) {
            container.style.transform = `translateX(${-translateX}px)`;
        } else {
            gsap.to(container, { x: -translateX, duration: 0.5, ease: 'power3.out' });
        }

        // clases visuales (Angular ya marca active en template, pero dejamos sincronización visual por si acaso)
        cards.forEach((c, idx) => c.classList.toggle('active', idx === this.currentIndex));
    }

    @HostListener('window:keydown', ['$event'])
    handleKey(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') this.previous();
        if (e.key === 'ArrowRight') this.next();
    }
}
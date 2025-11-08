import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
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

    items: TimelineItem[] = timeline;
    selectedFilter: 'work' | 'education' | 'cert' = 'work';
    currentIndex = 0;
    selectedItem: TimelineItem | null = null;

    constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

    get filteredItems(): TimelineItem[] {
        return this.items.filter(i => i.type === this.selectedFilter);
    }

    ngAfterViewInit() {
        setTimeout(() => this.setActiveVisualState(), 300);
    }

    setFilter(type: 'work' | 'education' | 'cert') {
        if (this.selectedFilter === type) return;
        this.selectedFilter = type;
        this.currentIndex = 0;
        this.cdr.detectChanges();
        setTimeout(() => this.setActiveVisualState(), 300);
    }

    previous() {
        const total = this.filteredItems.length;
        this.currentIndex = (this.currentIndex - 1 + total) % total;
        this.setActiveVisualState();
    }

    next() {
        const total = this.filteredItems.length;
        this.currentIndex = (this.currentIndex + 1) % total;
        this.setActiveVisualState();
    }

    goTo(i: number) {
        if (i < 0 || i >= this.filteredItems.length) return;
        this.currentIndex = i;
        this.setActiveVisualState();
    }

    private setActiveVisualState() {
        const container = this.cardContainer.nativeElement;
        const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
        if (!cards.length) return;

        const total = cards.length;
        this.currentIndex = ((this.currentIndex % total) + total) % total;

        cards.forEach((card, idx) => {
            const isActive = idx === this.currentIndex;
            card.classList.toggle('active', isActive);

            gsap.to(card, {
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.6,
                duration: 0.35,
                ease: 'power3.out'
            });
        });

        const activeCard = cards[this.currentIndex];
        const viewport = container.parentElement!;
        const vpWidth = viewport.clientWidth;
        const targetX = activeCard.offsetLeft - (vpWidth / 2 - activeCard.offsetWidth / 2);

        gsap.to(container, {
            x: -targetX,
            duration: 0.5,
            ease: 'power3.inOut'
        });
    }

    openDetails(item: TimelineItem) {
        this.selectedItem = item;
        document.body.style.overflow = 'hidden';
    }

    closeDetails() {
        this.selectedItem = null;
        document.body.style.overflow = 'auto';
    }

    @HostListener('window:keydown', ['$event'])
    handleKey(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') this.previous();
        if (e.key === 'ArrowRight') this.next();
    }
}
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
    @ViewChild('dotsContainer', { static: true }) dotsContainer!: ElementRef<HTMLDivElement>;

    items: TimelineItem[] = timeline;
    currentIndex = 0;
    selectedFilter: 'work' | 'education' | 'cert' = 'work';
    selectedItem: TimelineItem | null = null;
    private waitingForCards = false;

    constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

    get filteredItems(): TimelineItem[] {
        return this.items.filter(i => i.type === this.selectedFilter);
    }

    ngAfterViewInit() {
        this.waitForCardsAndInit();
        setTimeout(() => this.setActiveVisualState(), 300);
    }

    private waitForCardsAndInit(maxWaitMs = 1200) {
        if (this.waitingForCards) return;
        this.waitingForCards = true;
        const start = performance.now();

        const tryInit = () => {
            const container = this.cardContainer?.nativeElement;
            const cards = container ? Array.from(container.querySelectorAll('.card')) as HTMLElement[] : [];
            if (cards.length && cards.length === this.filteredItems.length) {
                this.cdr.detectChanges();
                this.quickEntrance(cards);
                this.setActiveVisualState();
                this.updateDots();
                this.waitingForCards = false;
                return;
            }
            if (performance.now() - start > maxWaitMs) {
                this.cdr.detectChanges();
                this.setActiveVisualState();
                this.updateDots();
                this.waitingForCards = false;
                return;
            }
            this.ngZone.runOutsideAngular(() => requestAnimationFrame(tryInit));
        };

        tryInit();
    }

    private quickEntrance(cards: HTMLElement[]) {
        gsap.fromTo(
            cards,
            { y: 20, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
        );
    }

    private setActiveVisualState() {
        const container = this.cardContainer?.nativeElement;
        if (!container) return;

        const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
        if (this.currentIndex >= cards.length) this.currentIndex = Math.max(0, cards.length - 1);
        if (this.currentIndex < 0) this.currentIndex = 0;

        cards.forEach((c, idx) => {
            c.classList.toggle('active', idx === this.currentIndex);
            if (idx === this.currentIndex) {
                gsap.to(c, { scale: 1, opacity: 1, duration: 0.22, ease: 'power2.out' });
            } else {
                gsap.to(c, { scale: 0.93, opacity: 0.66, duration: 0.22, ease: 'power2.out' });
            }
        });

        this.syncView(true);
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.setActiveVisualState();
        }
    }

    next() {
        if (this.currentIndex < this.filteredItems.length - 1) {
            this.currentIndex++;
            this.setActiveVisualState();
        }
    }

    goTo(i: number) {
        if (i >= 0 && i < this.filteredItems.length) {
            this.currentIndex = i;
            this.setActiveVisualState();
        }
    }

    setFilter(type: 'work' | 'education' | 'cert') {
        if (this.selectedFilter === type) return;
        this.selectedFilter = type;
        this.currentIndex = 0;
        this.cdr.detectChanges();
        Promise.resolve().then(() => this.waitForCardsAndInit());
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

        if (this.currentIndex >= cards.length) this.currentIndex = cards.length - 1;
        if (this.currentIndex < 0) this.currentIndex = 0;

        const active = cards[this.currentIndex];
        const vpWidth = container.parentElement?.clientWidth ?? container.clientWidth;
        const cardCenter = active.offsetLeft + active.offsetWidth / 2;
        const translateX = Math.max(0, cardCenter - vpWidth / 2);

        if (skipAnim) {
            container.style.transform = `translateX(${-translateX}px)`;
        } else {
            gsap.to(container, { x: -translateX, duration: 0.36, ease: 'power3.out' });
        }

        this.updateDots();
    }

    private updateDots() {
        const dots = this.dotsContainer?.nativeElement?.querySelectorAll('.dot') ?? [];
        dots.forEach((d: Element, i: number) => d.classList.toggle('selected', i === this.currentIndex));
    }

    @HostListener('window:keydown', ['$event'])
    handleKey(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') this.previous();
        if (e.key === 'ArrowRight') this.next();
    }
}
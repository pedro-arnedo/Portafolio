import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../core/env/data-project';
import { ViewEncapsulation } from '@angular/core';

interface Technology {
    name: string;
    icon: string;
}

interface ProjectItem {
    title: string;
    description: string;
    image: string;
    technologies: Technology[];
}

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project.html',
    styleUrls: ['./project.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Project implements OnInit, OnDestroy {
    projects: ProjectItem[] = projects as ProjectItem[];
    visibleProjects: ProjectItem[] = [];
    currentIndex = 0;
    interval: any;
    isMobile = false;

    ngOnInit() {
        this.checkScreen();
        this.updateVisibleProjects();
        this.startAutoSlide();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    @HostListener('window:resize', [])
    onResize() {
        this.checkScreen();
        this.updateVisibleProjects();
    }

    checkScreen() {
        this.isMobile = window.innerWidth <= 480;
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 15000);
    }

    nextSlide() {
        if (this.isMobile) return;
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateVisibleProjects();
    }

    prevSlide() {
        if (this.isMobile) return;
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateVisibleProjects();
    }

    updateVisibleProjects() {
        const total = this.projects.length;

        if (this.isMobile) {
            this.visibleProjects = this.projects;
            return;
        }

        const screenWidth = window.innerWidth;
        const itemsToShow = screenWidth <= 600 ? 1 : 2;

        const endIndex = this.currentIndex + itemsToShow;
        if (endIndex <= total) {
            this.visibleProjects = this.projects.slice(this.currentIndex, endIndex);
        } else {
            const overflow = endIndex - total;
            this.visibleProjects = [
                ...this.projects.slice(this.currentIndex),
                ...this.projects.slice(0, overflow)
            ];
        }
    }

    getTransform() {
        return 'translateX(0)';
    }
}
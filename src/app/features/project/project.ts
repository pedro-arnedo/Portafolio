import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../core/env/data-project';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project.html',
    styleUrl: './project.scss',
    encapsulation: ViewEncapsulation.None
})
export class Project implements OnInit, OnDestroy {
    projects = projects;
    visibleProjects = this.projects.slice(0, 3);
    currentIndex = 0;
    interval: any;

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 15000);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateVisibleProjects();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateVisibleProjects();
    }

    updateVisibleProjects() {
        const total = this.projects.length;
        this.visibleProjects = [
            this.projects[this.currentIndex % total],
            this.projects[(this.currentIndex + 1) % total],
            this.projects[(this.currentIndex + 2) % total]
        ];
    }

    getTransform() {
        return `translateX(0)`;
    }
}
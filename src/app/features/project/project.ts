import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../core/config/data-project';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project.html',
    styleUrl: './project.scss'
})
export class Project implements OnInit, OnDestroy {
    projects = projects;
    visibleProjects: any[] = [];
    currentIndex = 0;
    isTransitioning = false;
    interval: any;

    ngOnInit() {
        this.setupInitialProjects();
        this.startAutoSlide();
    }

    setupInitialProjects() {
        this.visibleProjects = [
            this.projects[this.currentIndex % this.projects.length],
            this.projects[(this.currentIndex + 1) % this.projects.length],
            this.projects[(this.currentIndex + 2) % this.projects.length]
        ];
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        setTimeout(() => {
            this.setupInitialProjects();
            this.isTransitioning = false;
        }, 1300);
    }

    prevSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        setTimeout(() => {
            this.setupInitialProjects();
            this.isTransitioning = false;
        }, 1300);
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 7000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    getTransform() {
        return this.isTransitioning ? 'translateX(-33.33%)' : 'translateX(0)';
    }

    getTagStyle(name: string) {
        const colors: any = {
            Angular: '#DD0031',
            'Node.js': '#3C873A',
            NestJS: '#E0234E',
            PostgreSQL: '#336791',
            '.NET Core': '#512BD4',
            MySQL: '#00758F',
            Salesforce: '#00A1E0',
            TypeScript: '#3178C6',
            Bootstrap: '#7952B3',
            'Git / Bitbucket': '#0052CC',
            GitHub: '#171515',
            Jira: '#0052CC',
            'Repository Pattern': '#40C057'
        };

        const color = colors[name] || '#00c3ff';
        return {
            background: `${color}1A`,
            border: `1px solid ${color}80`,
            color
        };
    }
}
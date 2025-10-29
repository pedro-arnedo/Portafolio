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
    autoSlideInterval: any;
    transformStyle = 'translateX(0)';
    totalDots: any[] = [];

    ngOnInit() {
        this.updateVisibleProjects();
        this.startAutoSlide();
        this.totalDots = Array(this.projects.length).fill(0);
    }

    ngOnDestroy() {
        clearInterval(this.autoSlideInterval);
    }

    updateVisibleProjects() {
        const total = this.projects.length;
        const start = this.currentIndex;
        this.visibleProjects = [
            this.projects[start % total],
            this.projects[(start + 1) % total],
            this.projects[(start + 2) % total]
        ];
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateVisibleProjects();
    }

    prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateVisibleProjects();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5500);
    }

    getTagColor(tech: string) {
        const map: any = {
            Angular: { bg: '#ff4c4c20', text: '#ff4c4c' },
            TypeScript: { bg: '#3178c620', text: '#3178c6' },
            JavaScript: { bg: '#f7df1e20', text: '#f7df1e' },
            Node: { bg: '#68a06320', text: '#68a063' },
            'Node.js': { bg: '#68a06320', text: '#68a063' },
            Firebase: { bg: '#ffca2820', text: '#ffca28' },
            'Firebase Hosting': { bg: '#ffca2820', text: '#ffca28' },
            PostgreSQL: { bg: '#33679120', text: '#336791' },
            MySQL: { bg: '#00758f20', text: '#00758f' },
            Bootstrap: { bg: '#563d7c20', text: '#563d7c' },
            '.NET Core': { bg: '#512bd420', text: '#512bd4' },
            Sass: { bg: '#cf649a20', text: '#cf649a' },
            Figma: { bg: '#a259ff20', text: '#a259ff' },
            default: { bg: '#00c3ff20', text: '#00c3ff' }
        };
        return map[tech] || map.default;
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../core/config/data-project';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project.html',
    styleUrls: ['./project.scss']
})
export class Project implements OnInit, OnDestroy {
    projects = projects;
    visibleProjects = [...this.projects];
    currentIndex = 0;
    interval: any;

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 46000);
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

    getTagColor(name: string) {
        const colors: any = {
            Angular: { bg: 'rgba(221,27,49,0.15)', color: '#DD1B31' },
            'Node.js': { bg: 'rgba(87,187,79,0.15)', color: '#57BB4F' },
            NestJS: { bg: 'rgba(206,48,86,0.15)', color: '#CE3056' },
            PostgreSQL: { bg: 'rgba(51,103,145,0.15)', color: '#336791' },
            'Salesforce API': { bg: 'rgba(0,113,188,0.15)', color: '#0071BC' },
            TypeScript: { bg: 'rgba(0,122,204,0.15)', color: '#007ACC' },
            MySQL: { bg: 'rgba(0,117,143,0.15)', color: '#00758F' },
            '.NET Core': { bg: 'rgba(90,45,145,0.15)', color: '#5A2D91' },
            AWS: { bg: 'rgba(255,153,0,0.15)', color: '#FF9900' },
            Python: { bg: 'rgba(255,230,0,0.15)', color: '#FFE600' },
            Jira: { bg: 'rgba(0,82,204,0.15)', color: '#0052CC' },
            Git: { bg: 'rgba(240,80,50,0.15)', color: '#F05032' },
            default: { bg: 'rgba(0,195,255,0.1)', color: '#00C3FF' }
        };
        return colors[name] || colors.default;
    }
}
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
    currentIndex = 0;
    autoSlide: any;
    visibleCount = 3;

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        clearInterval(this.autoSlide);
    }

    startAutoSlide() {
        this.autoSlide = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + this.visibleCount) % this.projects.length;
    }

    prevSlide() {
        this.currentIndex =
            (this.currentIndex - this.visibleCount + this.projects.length) % this.projects.length;
    }

    getTransform() {
        const offset = this.currentIndex * (350 + 24); // ancho + gap
        return `translateX(-${offset}px)`;
    }

    getTechColor(tech: string) {
        const colors: any = {
            Angular: { color: '#DD0031', border: '1px solid #DD0031', background: 'rgba(221,0,49,0.1)' },
            'Node.js': { color: '#8CC84B', border: '1px solid #8CC84B', background: 'rgba(140,200,75,0.1)' },
            'NestJS': { color: '#E0234E', border: '1px solid #E0234E', background: 'rgba(224,35,78,0.1)' },
            'PostgreSQL': { color: '#336791', border: '1px solid #336791', background: 'rgba(51,103,145,0.1)' },
            '.NET Core': { color: '#512BD4', border: '1px solid #512BD4', background: 'rgba(81,43,212,0.1)' },
            MySQL: { color: '#00618A', border: '1px solid #00618A', background: 'rgba(0,97,138,0.1)' },
            Salesforce: { color: '#00A1E0', border: '1px solid #00A1E0', background: 'rgba(0,161,224,0.1)' },
            Firebase: { color: '#FFCA28', border: '1px solid #FFCA28', background: 'rgba(255,202,40,0.1)' },
            Default: { color: '#00C3FF', border: '1px solid rgba(0,195,255,0.5)', background: 'rgba(0,195,255,0.1)' }
        };
        return colors[tech] || colors['Default'];
    }
}
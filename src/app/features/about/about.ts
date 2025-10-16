import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    imports: [CommonModule],
    templateUrl: './about.html',
    styleUrl: './about.scss'
})
export class About {

    ngAfterViewInit() {
        const section = document.querySelector('.about-container');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section?.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        if (section) observer.observe(section);
    }

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timeline } from '../../core/config/data-experience';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience.html',
    styleUrl: './experience.scss'
})
export class Experience {
    timeline = timeline;
}
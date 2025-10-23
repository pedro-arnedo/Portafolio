import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../core/config/data-project';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project.html',
    styleUrl: './project.scss'
})
export class Project {
    projects = projects;
}
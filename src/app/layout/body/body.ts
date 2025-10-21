import { Component } from '@angular/core';
import { About } from '../../features/about/about';
import { Experience } from '../../features/experience/experience';
import { Project } from '../../features/project/project';
import { Services } from '../../features/services/services';
import { Stack } from '../../features/stack/stack';

@Component({
    selector: 'app-body',
    standalone: true,
    // imports: [About, Experience, Project, Services, Stack],
    imports: [About, Stack],
    templateUrl: './body.html',
    styleUrl: './body.scss'
})
export class Body {

}

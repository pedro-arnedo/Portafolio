import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timeline } from '../../core/env/data-experience';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience.html',
    styleUrl: './experience.scss'
})
export class Experience {
    selectedFilter: 'work' | 'education' | 'cert' = 'work';

    workItems: TimelineItem[] = timeline.filter(i => i.type === 'work');
    educationItems: TimelineItem[] = timeline.filter(i => i.type === 'education');
    certItems: TimelineItem[] = timeline.filter(i => i.type === 'cert');

    get itemsToShow() {
        switch (this.selectedFilter) {
            case 'education': return this.educationItems;
            case 'cert': return this.certItems;
            default: return this.workItems;
        }
    }

    setFilter(type: 'work' | 'education' | 'cert') {
        this.selectedFilter = type;
    }
}
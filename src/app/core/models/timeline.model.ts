export interface TimelineItem {
    type: 'work' | 'education' | 'cert';
    title: string;
    entity: string;
    date: string;
    description: string;
    tags: string[];
    icon: string;
}
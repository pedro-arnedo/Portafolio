export interface TimelineItem {
    title: string;
    entity: string;
    location?: string;
    date: string;
    modality?: string;
    type: 'work' | 'education' | 'cert';
    description?: string;
    stack?: string[];
    modules?: string[];
    responsibilities?: string[];
    architecture?: string[];
    results?: string[];
    icon?: string;
    id?: string | number;
}
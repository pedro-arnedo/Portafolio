export interface TimelineItem {
    type: 'work' | 'education' | 'cert';
    title: string;
    entity: string;
    date: string;
    description: string;
    stack: string[];
    icon: string;

    modules?: string[]; 
    responsibilities?: string[];    
    architecture?: string;  
    results?: string[]; 
}
export interface CalendarEvent {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;
    module?: {
        id: number;
        label: string;
    };
    publisher?: {
        id: number;
        fullname: string;
    };
}

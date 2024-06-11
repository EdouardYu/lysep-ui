export interface Profile {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: 'STUDENT' | 'TEACHER';
}
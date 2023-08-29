import { Owner } from "src/app/modules/todo/interfaces/owner";

export interface TodoList {
    "@id"?: string;
    id: number;
    title: string;
    description: string;
    status: 'in_progress' | 'done';
    public: boolean;
    owner: Owner;
    createdAt: string;
    updatedAt: string;
}

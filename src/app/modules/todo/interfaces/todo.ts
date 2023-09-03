import { Owner } from "src/app/modules/todo/interfaces/owner";
import { DialogActionType } from "src/app/modules/todo/interfaces/custum-type";

export interface Todo {
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

export interface TodoCreate {
    title: string;
    description: string;
    public: boolean;
}

export interface TodoUpdate extends TodoCreate{
    "@id"?: string;
    id: number;
    // status: 'in_progress' | 'done';
}

export interface TodoItem {
    action: DialogActionType;
    todo?: Todo;
}

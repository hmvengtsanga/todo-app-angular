

export class DialogConfig<T> {
    header: string|undefined;
    visible: boolean = false;
    action: 'create' | 'update' = 'create';
    todo?: T;

    constructor(init?: Partial<DialogConfig<T>>) {
        Object.assign(this, init);
    }
}
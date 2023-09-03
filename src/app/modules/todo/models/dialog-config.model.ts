

export class DialogConfig {
    header: string|undefined;
    visible: boolean = false;
    action: 'create' | 'update' | 'show' = 'show';
    todo?: any;

    constructor(init?: Partial<DialogConfig>) {
        Object.assign(this, init);
    }
}
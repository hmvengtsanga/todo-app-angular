
export class ChangeAppLanguage {
    static readonly type = '[App Language] Set Language';

    constructor(public lang: string) {}
}
export class Template {
    public languages: string[] = [];
    public defaultLanguage: string = "";
    constructor(public templateName: string, public shortName: string, languages: string[], public tags: string[]) {
        const defaultLanguageRegex = /\[.*\]/;
        languages.forEach(lang => {
            const match = lang.match(defaultLanguageRegex);
            if (match !== null) {
                this.defaultLanguage = lang;
            }
            this.languages.push(lang);
        });
    }
}
export class FilterModelUrlHelper {
    static toUrl(filter: Filter): string {
        if (filter) {
            return Object.keys(filter)
                .reduce((a: any[], b: string) => {
                    const param = filter[b] ? `${b}=${encodeURIComponent(filter[b])}` : null;
                    if (param) {
                        return [...a, param];
                    } else {
                        return a;
                    }
                }, [])
                .join('&');
        } else {
            return '';
        }
    }
}

// tslint:disable-next-line
export interface Filter { } // empty interface just to keep syntax clear on grid.component.ts, etc

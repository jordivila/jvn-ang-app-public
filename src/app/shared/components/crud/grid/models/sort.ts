export interface SortModel {
    sortBy: string;
    sortAsc: boolean;
}

export class SortModelUrlHelper {
    static toUrl(sort: SortModel): string {
        if (sort) {
            return `&sortBy=${sort.sortBy}&sortAsc=${sort.sortAsc}`;
        } else {
            return '';
        }
    }
}

export interface ProductListItemGroupedByKey {
    [key: string]: ProductListItem;
}

export interface ProductListItem {
    id: number;
    title: string;
    image: string;
    description?: string;
    data?: any;
}

import { GridRow } from './grid-row';
import { MatPaginator } from '@angular/material/paginator';

export interface PaginatedResults<T extends GridRow> {
    total: number;
    results: T[];
}

export interface PaginationTexts {
    showingData: string;
    showXPerPage: string;
}

export interface PaginationEventArgs {
    pageIndex: number;
    pageSize: number;
}

export interface PaginationUrlHelperModel {
    skip: number;
    top: number;
}

export class PaginationUrlHelper {
    static toUrl(pagination: PaginationModel): string {
        const model = PaginationUrlHelper.toUrlModel(pagination);
        return `&skip=${model.skip}&top=${model.top}`;
    }
    static toUrlModel(pagination: PaginationModel): PaginationUrlHelperModel {
        return {
            skip: (pagination.pageIndex * pagination.pageSize),
            top: ((pagination.pageIndex + 1) * pagination.pageSize)
        } as PaginationUrlHelperModel;
    }
}

export class PaginationModelMapper {
    static mapFromMatPaginator(paginator: MatPaginator): PaginationModel {
        return {
            pageIndex: paginator.pageIndex,
            pageSize: paginator.pageSize,
            pageSizes: paginator.pageSizeOptions,
        } as PaginationModel;
    }
}

export class PaginationModel implements PaginationEventArgs {

    pageIndex: number;
    pageSize: number;
    pageSizes: number[];
    totalRows: number;
    texts: PaginationTexts;

    private pageSizesDefault = [10, 20, 30, 40, 50, 100];
    private totalRowsDefault = 0;
    private textsDefault: PaginationTexts = {
        showingData: 'of {0}',
        showXPerPage: 'Per página'
    };

    constructor(data?: PaginationModel | PaginationEventArgs) {
        this.pageIndex = data && data.pageIndex ? data.pageIndex : 0;
        this.pageSize = data && data.pageSize ? data.pageSize : 10;
        this.pageSizes = this.pageSizesDefault;

        if (data instanceof PaginationModel) {
            this.pageSizes = data && data.pageSizes ? data.pageSizes : this.pageSizesDefault;
            this.totalRows = data && data.totalRows ? data.totalRows : this.totalRowsDefault;
            this.texts = data && data.texts ? data.texts : this.textsDefault;
        }
    }

    toSerializable(): PaginationModel {
        return {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            pageSizes: this.pageSizes,
        } as PaginationModel;
    }
}

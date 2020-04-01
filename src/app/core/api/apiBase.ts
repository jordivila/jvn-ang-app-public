import { Filter, FilterModelUrlHelper } from '../../shared/components/crud/filter/models/filter';
import { PaginationModel, PaginationUrlHelper } from '../../shared/components/crud/grid/models/pagination';
import { SortModel, SortModelUrlHelper } from '../../shared/components/crud/grid/models/sort';


export abstract class ApiBaseService {

    abstract url(...args: string[]): string;

    listParamsToUrl(
        filterModel: Filter,
        paginationModel: PaginationModel,
        sortModel: SortModel): string {

        return FilterModelUrlHelper.toUrl(filterModel)
            .concat(
                PaginationUrlHelper.toUrl(paginationModel),
                SortModelUrlHelper.toUrl(sortModel));
    }
}

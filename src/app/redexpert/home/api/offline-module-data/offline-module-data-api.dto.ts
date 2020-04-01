import { GridRow } from '../../../../shared/components/crud/grid/models/grid-row';

export interface OfflineModuleMetadataDefinition {
    moduleId: number;
    endpoints: string[];
    version: string;
}

export interface OfflineModuleMetadata {
    moduleId: number;
    endpoints: EndpointDataKeyValuePair[];
    version: string;
}

export interface EndpointDataKeyValuePair {
    key: string;
    value: any;
}

export interface ProductViewerGridRow extends GridRow {
    orderCode: string;
    ID: number;
}


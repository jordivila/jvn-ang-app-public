import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    OfflineModuleMetadata,
    OfflineModuleMetadataDefinition,
    EndpointDataKeyValuePair
} from './offline-module-data-api.dto';
import { OfflineModuleDataList } from './offline-module-data-list.dto';
import { ApiBaseService } from '../../../../core/api/apiBase';
import { ConfigService } from '../../../../core/services/config/config.service';

export interface OfflineModuleApi {
    url(...args: string[]): string;
    urlImages(): string;
    list(): Promise<OfflineModuleDataList[]>;
    get(moduleId: number): Promise<OfflineModuleMetadata>;
}

@Injectable()
export class OfflineModuleApiService extends ApiBaseService implements OfflineModuleApi {


    constructor(
        private http: HttpClient,
        private config: ConfigService) {

        super();
    }

    url(...args: string[]): string {
        return `./assets/json/redexpert/product-module-data${args.length > 0 ? '/' : ''}${args.join('/')}`;
    }

    urlImages(): string {
        return `${this.url()}/images`;
    }


    async list(): Promise<OfflineModuleDataList[]> {
        const url = `${this.url()}/modules/all.json`;
        const list = await this.http.get<OfflineModuleDataList[]>(url).toPromise();
        return list;
    }

    async get(moduleId: number): Promise<OfflineModuleMetadata> {
        const url = `${this.url()}/modules/offlinedata/${moduleId}.json`;
        // load module metadata
        const offlineData = await this.http.get<OfflineModuleMetadataDefinition>(url).toPromise();
        // map module endpoints to Promises
        const offlineEndpointsPromises = offlineData.endpoints.map((endpoint: string) => {
            const endpointBaseUrl = `${this.url()}/${endpoint}.json`;
            return this.http.get(endpointBaseUrl).toPromise();
        });
        // load all endpoints
        const offlineEndpointsData = await Promise.all(offlineEndpointsPromises);
        // map endpoint data to KeyValuePair
        const result = {
            moduleId,
            endpoints: offlineData.endpoints.map((endpoint: string, index: number) => {
                return { key: endpoint, value: offlineEndpointsData[index] } as EndpointDataKeyValuePair;
            }),
            version: offlineData.version
        } as OfflineModuleMetadata;
        return result;
    }
}

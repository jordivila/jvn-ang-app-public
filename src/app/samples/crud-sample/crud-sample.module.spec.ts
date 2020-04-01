import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestModuleMetadata } from '../../../../node_modules/@angular/core/testing';
import { CrudSampleModule } from './crud-sample.module';

export const crudTestModuleMetadata: TestModuleMetadata = {
    imports: [
        CoreModule.forRoot(),
        SharedModule,
        RouterTestingModule,
        CrudSampleModule,
    ],
    declarations: [],
    providers: []
};

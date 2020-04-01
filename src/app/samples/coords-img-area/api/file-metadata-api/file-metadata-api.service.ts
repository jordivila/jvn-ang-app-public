import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { FileMetadata } from './file-metadata-api.interface';

@Injectable()
export class FileMetadataApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) {

  }

  public get(fileId: string): Promise<FileMetadata> {
    return of({
      id: fileId,
      dateUploaded: new Date(),
      name: 'super_large_name_to_prove_ellipsis_text_is_working_fine_payslipsample.pdf',
      totalPages: 2
    } as FileMetadata)
      .toPromise();
  }

  public getUrl(fileId: string): string {
    return `${this.config.API}/coords-img-area/${fileId}`;
  }
}

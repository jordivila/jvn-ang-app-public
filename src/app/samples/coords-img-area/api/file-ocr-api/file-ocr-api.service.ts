import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable()
export class FileOcrApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) {

  }

  public get(fileId: string, pageIndex?: number): Promise<Blob> {
    return this.http.get(`${this.getUrl(fileId)}/payslipsample${pageIndex}.jpg`, {
      headers: { Accept: 'application/octet-stream' },
      responseType: 'blob'
    }).toPromise();
  }

  // public delete(partnerId: string, ncId: string) {
  //   return this.$http.delete(`${this.getUrl(partnerId, ncId)}`).then(
  //     (response) => this.requestHandler.onSuccess(response),
  //     (error) => this.requestHandler.onError(error)
  //   );
  // }

  public getUrl(fileId: string): string {
    // return `${this.config.API}/coords-img-area-ocr/${fileId}`;
    return `./assets/images/`;
  }
}

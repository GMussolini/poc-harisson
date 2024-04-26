import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BuddyTalkApi } from '../interfaces/buddy-talk-api.interface';
import BuddyTalkResponse from '../interfaces/buddy-talk-response.interface';
import BuddyTalkRequest from '../interfaces/buddy-talk-request.interface';

@Injectable({
  providedIn: 'root'
})
export class BuddyTalkApiService {
  constructor(private readonly http: HttpClient) {}

  private getBuddyApi(buddyApi: BuddyTalkApi): string {
    switch (buddyApi) {
      case BuddyTalkApi.ThothApi:
        return environment.thothApi;
      default:
        throw new Error('Invalid API');
    }
  }

  private getUrl(request: BuddyTalkRequest): string {
    return `${this.getBuddyApi(request.buddyApi)}/${request.resource}`;
  }

  async get<TData>(request: BuddyTalkRequest): Promise<TData> {
    const url = this.getUrl(request);
    const response = await this.http.get<TData>(url).toPromise();
    if (!response) {
      throw new Error('nenhum retorno da API.');
    }
    return response;
  }

  async patch<TData>(request: BuddyTalkRequest): Promise<BuddyTalkResponse<TData>> {
    const url = this.getUrl(request);
    const response = await this.http.patch<BuddyTalkResponse<TData>>(url, request.body).toPromise();
    if (!response) {
      throw new Error('nenhum retorno da API.');
    }
    return response;
  }

  async post<TData>(request: BuddyTalkRequest): Promise<TData> {
    const url = this.getUrl(request);
    const response = await this.http.post<TData>(url, request.body).toPromise();
    if (!response) {
      throw new Error('nenhum retorno da API.');
    }
    return response;
  }

  async put<TData>(request: BuddyTalkRequest): Promise<BuddyTalkResponse<TData>> {
    const url = this.getUrl(request);
    const response = await this.http.put<BuddyTalkResponse<TData>>(url, request.body).toPromise();
    if (!response) {
      throw new Error('nenhum retorno da API.');
    }
    return response;
  }

  async delete<TData>(request: BuddyTalkRequest): Promise<BuddyTalkResponse<TData>> {
    const url = this.getUrl(request);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: request.body
    };
    const response = await this.http.delete<BuddyTalkResponse<TData>>(url, options).toPromise();
    if (!response) {
      throw new Error('nenhum retorno da API.');
    }
    return response;
  }

  public getErrorMessage<TData>(response: BuddyTalkResponse<TData>): string {
    let errorMsg = '';
    response.errors.forEach((er) => {
      errorMsg = `${errorMsg}${er} `;
    });
    return errorMsg;
  }
}

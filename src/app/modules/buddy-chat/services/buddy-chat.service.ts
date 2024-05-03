import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map } from 'rxjs';
import { BuddyTalkApiService } from 'src/app/core/http/buddy-talk-api.service';
import { BuddyTalkApi } from 'src/app/core/interfaces/buddy-talk-api.interface';
import BuddyTalkRequest from 'src/app/core/interfaces/buddy-talk-request.interface';
import { ResponseModel } from '../types/response-model.type';

@Injectable({
  providedIn: 'root',
})
export class BuddyChatService {
  constructor(
    private readonly buddyApi: BuddyTalkApiService,
    private readonly http: HttpClient
  ) {}

  async startSessionPoc(): Promise<any> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.CognisyncApi,
      resource: `medAI/create-chat-with-assistant`,
    };

    try {
      const response = await this.buddyApi.post<any>(request);
      return response;
    } catch (exception: unknown) {
      if (
        typeof exception === 'object' &&
        exception !== null &&
        'error' in exception
      ) {
        throw this.buddyApi.getErrorMessage(
          (exception as { error: any }).error
        );
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async startSessionMed(): Promise<any> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.LangchainApi,
      resource: `chat/start-session/${1}/${'chat'}`,
    };

    try {
      const response = await this.buddyApi.get<any>(request);
      return response;
    } catch (exception: unknown) {
      if (
        typeof exception === 'object' &&
        exception !== null &&
        'error' in exception
      ) {
        throw this.buddyApi.getErrorMessage(
          (exception as { error: any }).error
        );
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  getStreamData(sessionId: string, text: string): Observable<string> {
    const endpoint =
      'https://homol3.medgrupo.com.br/med-ai/langchain-service/chat/stream-answer/';
    const body = { session_id: sessionId, text: text };
    return this.http
      .post(endpoint, body, {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        filter((event) => event.type === HttpEventType.Response),
        map((event) => {
          return (event as any).body;
        })
      );
  }

  async InteractionWithAssistant(sessionId: string, text: string): Promise<Observable<any>> {
    const endpoint =
      'https://homol3.medgrupo.com.br/med-ai/api-cognisync-ia/medAI/interaction-with-assistant';
    const body = { threadId: sessionId, prompt: text };
    return this.http.post(endpoint, body);
  }
}

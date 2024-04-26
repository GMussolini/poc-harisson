import { Injectable } from '@angular/core';
import { BuddyTalkApiService } from 'src/app/core/http/buddy-talk-api.service';
import { BuddyTalkApi } from 'src/app/core/interfaces/buddy-talk-api.interface';
import BuddyTalkRequest from 'src/app/core/interfaces/buddy-talk-request.interface';

@Injectable({
  providedIn: 'root'
})
export class BuddyChatService {

  constructor(private readonly buddyApi: BuddyTalkApiService) {}

  async startSessionPoc(): Promise<string> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.ThothApi,
      resource: `chat/start-session/${1}`,
    };

    try {
      const response = await this.buddyApi.get<string>(request);
      return response;
    } catch (exception: unknown) {
      if (typeof exception === 'object' && exception !== null && 'error' in exception) {
        throw this.buddyApi.getErrorMessage((exception as { error: any }).error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async startSessionMed(): Promise<string> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.ThothApi,
      resource: `chat/start-session/${1}`,
    };

    try {
      const response = await this.buddyApi.get<string>(request);
      return response;
    } catch (exception: unknown) {
      if (typeof exception === 'object' && exception !== null && 'error' in exception) {
        throw this.buddyApi.getErrorMessage((exception as { error: any }).error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async streamAwnserPoc(sessionId: string, prompt: string): Promise<string> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.ThothApi,
      resource: `chat/stream-answer-poc2/`,
      body: { "session_id": sessionId, "text": prompt}
    };

    try {
      const response = await this.buddyApi.post<string>(request);
      return response;
    } catch (exception: unknown) {
      if (typeof exception === 'object' && exception !== null && 'error' in exception) {
        throw this.buddyApi.getErrorMessage((exception as { error: any }).error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async streamAwnserMed(sessionId: string, prompt: string): Promise<string> {
    const request: BuddyTalkRequest = {
      buddyApi: BuddyTalkApi.ThothApi,
      resource: `chat/stream-answer-poc/`,
      body: { "session_id": sessionId, "text": prompt}
    };

    try {
      const response = await this.buddyApi.post<string>(request);
      return response;
    } catch (exception: unknown) {
      if (typeof exception === 'object' && exception !== null && 'error' in exception) {
        throw this.buddyApi.getErrorMessage((exception as { error: any }).error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

}

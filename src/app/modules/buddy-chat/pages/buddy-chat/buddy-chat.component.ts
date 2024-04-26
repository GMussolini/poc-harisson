import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MessageMed, MessagePoc } from '../../types/message.type';
import { MatSidenav } from '@angular/material/sidenav';
import { BuddyChatService } from '../../services/buddy-chat.service';
import { ModalResumoReferenciaComponent } from '../../components/modal-resumo-referencia/modal-resumo-referencia.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ResponseMedModel,
  ResponsePocModel,
} from '../../types/response-model.type';

@Component({
  selector: 'app-buddy-chat',
  templateUrl: './buddy-chat.component.html',
  styleUrls: ['./buddy-chat.component.css'],
})
export class BuddyChatComponent implements AfterViewInit {
  constructor(
    private _buddyService: BuddyChatService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.sessionIdMed = (await this._buddyService.startSessionMed()) || '';
    this.sessionIdHarrison = (await this._buddyService.startSessionPoc()) || '';
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  messagesMed: MessageMed[] = [];
  messagesPoc: MessagePoc[] = [];
  prompt: string = '';
  isProcess: boolean = false;
  isLoading = false;
  sessionIdMed: string = '';
  sessionIdHarrison: string = '';
  responseMed: ResponseMedModel = { resposta: '' };
  responsePoc: ResponsePocModel = { resposta: '' };

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  async OnAddNewChat(): Promise<void> {
    this.isLoading = true;
    this.sessionIdHarrison = (await this._buddyService.startSessionPoc()) || '';
    this.sessionIdMed = (await this._buddyService.startSessionMed()) || '';
    this.isLoading = false;
  }
  async OnSendPrompt(): Promise<void> {
    this.isLoading = true;

    let messageMed: MessageMed = {
      userName: 'User',
      userImage: './../../../../../assets/user-image.jpg',
      date: new Date(),
      text: this.prompt,
    };

    let messagePoc: MessagePoc = {
      userName: 'User',
      userImage: './../../../../../assets/user-image.jpg',
      date: new Date(),
      text: this.prompt,
    };

    this.messagesMed.push(messageMed);
    this.messagesPoc.push(messagePoc);

    await this.getResponseModel(this.prompt);

    let messageBotMed: MessageMed = {
      userName: 'Medrobot',
      userImage:
        './../../../../../assets/logo-medgrupo.jpg',
      date: new Date(),
      text: this.responseMed.resposta,
    };

    let messageBotPoc: MessageMed = {
      userName: 'Medrobot',
      userImage:
        './../../../../../assets/logo-medgrupo.jpg',
      date: new Date(),
      text: this.responsePoc.resposta,
    };

    this.messagesMed.push(messageBotMed);
    this.messagesPoc.push(messageBotPoc);
  }

  openDialog(resume: string): void {
    this._dialog.open(ModalResumoReferenciaComponent, {
      data: { resume },
    });
  }

  cutText(text: string, length: number): string {
    return text.substr(0, length);
  }

  private async getResponseModel(promp: string): Promise<void> {
    if (promp !== '') {
      this.responsePoc.resposta = await this._buddyService.streamAwnserPoc(
        this.sessionIdMed,
        promp
      );
      this.responseMed.resposta = await this._buddyService
        .streamAwnserMed(this.sessionIdMed, promp)
        .finally(() => {
          this.prompt = '';
          this.isLoading = false;
        });

      console.log(this.responsePoc.resposta);
      console.log(this.responseMed.resposta);
    }
  }

  private replaceMarkdown(text: string): string {
    const markdownRegex = /(\*|_|`|!|\[|\]|\(|\)|!\[.*?\]\(.*?\))/g;

    return text.replace(markdownRegex, '');
  }

  private processText(chunk: string): string {
    const htmlLineBreak = chunk.replace(/\n/g, '<br>');

    return this.replaceMarkdown(htmlLineBreak);
  }
}

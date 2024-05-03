import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MessageMed, MessagePoc } from '../../types/message.type';
import { MatSidenav } from '@angular/material/sidenav';
import { BuddyChatService } from '../../services/buddy-chat.service';
import { ModalResumoReferenciaComponent } from '../../components/modal-resumo-referencia/modal-resumo-referencia.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ResponseModel } from '../../types/response-model.type';

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
    this.sessionIdMed =
      (await this._buddyService.startSessionMed()).session_id || '';
    this.sessionIdHarrison =
      (await this._buddyService.startSessionPoc()).result.id || '';
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  messagesMed: MessageMed[] = [];
  messagesPoc: MessagePoc[] = [];
  prompt: string = '';
  isProcess: boolean = false;
  isLoading = false;
  sessionIdMed: string = '';
  sessionIdHarrison: string = '';
  responseMed: ResponseModel = { resposta: '' };
  responsePoc: ResponseModel = { resposta: '' };

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  async OnAddNewChat(): Promise<void> {
    this.isLoading = true;
    this.messagesMed = [];
    this.messagesPoc = [];
    this.sessionIdHarrison =
      (await this._buddyService.startSessionPoc()).result.id || '';
    this.sessionIdMed =
      (await this._buddyService.startSessionMed()).session_id || '';
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
      (
        await this._buddyService.getStreamData(this.sessionIdMed, promp)
      ).subscribe((data) => {
        this.responseMed.resposta = data;
        let messageBotMed: MessageMed = {
          userName: 'Medrobot',
          userImage: './../../../../../assets/logo-medgrupo.jpg',
          date: new Date(),
          text: this.responseMed.resposta,
        };
        this.messagesMed.push(messageBotMed);
      });

      (
        await this._buddyService.InteractionWithAssistant(this.sessionIdHarrison, promp)
      ).subscribe((data: any) => {
        this.responsePoc.resposta = data.result.content.text.value;
        this.isLoading = false;
        let messageBotPoc: MessageMed = {
          userName: 'Harrison',
          userImage: './../../../../../assets/logo-medgrupo.jpg',
          date: new Date(),
          text: this.responsePoc.resposta,
        };
        this.messagesPoc.push(messageBotPoc);
      });
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

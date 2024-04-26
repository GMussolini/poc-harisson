import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BuddyChatRoutingModule } from './buddy-chat.routing.module';
import { BuddyChatComponent } from './pages/buddy-chat/buddy-chat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { HttpClientModule } from '@angular/common/http';
import { BuddyTalkApiService } from 'src/app/core/http/buddy-talk-api.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalResumoReferenciaComponent } from './components/modal-resumo-referencia/modal-resumo-referencia.component';

registerLocaleData(localePt, 'pt-BR', localePtExtra);


@NgModule({
  declarations: [BuddyChatComponent,
    LoadingComponent,
    ModalResumoReferenciaComponent
  ],
  imports: [
    CommonModule,
    BuddyChatRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule
  ],
  exports: [],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, BuddyTalkApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuddyChatPageModule {}

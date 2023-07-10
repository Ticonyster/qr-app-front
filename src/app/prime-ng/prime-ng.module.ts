import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    TooltipModule,
    MessagesModule,
    CardModule
  ],
  exports:[
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    TooltipModule,
    MessagesModule,
    CardModule
  ]
})
export class PrimeNgModule { }

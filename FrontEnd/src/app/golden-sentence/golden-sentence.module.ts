import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoldenSentencePageRoutingModule } from './golden-sentence-routing.module';

import { GoldenSentencePage } from './golden-sentence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoldenSentencePageRoutingModule,
  ],
  declarations: [GoldenSentencePage],
})
export class GoldenSentencePageModule {}

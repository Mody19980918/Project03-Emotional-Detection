import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmojiGamePageRoutingModule } from './emoji-game-routing.module';

import { EmojiGamePage } from './emoji-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmojiGamePageRoutingModule
  ],
  declarations: [EmojiGamePage]
})
export class EmojiGamePageModule {}

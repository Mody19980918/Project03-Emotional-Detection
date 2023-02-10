import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmojiGamePage } from './emoji-game.page';

const routes: Routes = [
  {
    path: '',
    component: EmojiGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmojiGamePageRoutingModule {}

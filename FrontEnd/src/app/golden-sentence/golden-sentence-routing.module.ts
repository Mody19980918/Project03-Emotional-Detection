import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoldenSentencePage } from './golden-sentence.page';

const routes: Routes = [
  {
    path: '',
    component: GoldenSentencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoldenSentencePageRoutingModule {}

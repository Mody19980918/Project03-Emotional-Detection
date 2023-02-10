import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'ranking',
    loadChildren: () =>
      import('./ranking/ranking.module').then((m) => m.RankingPageModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'record',
    loadChildren: () =>
      import('./record/record.module').then((m) => m.RecordPageModule),
  },
  {
    path: 'emoji-game',
    loadChildren: () =>
      import('./emoji-game/emoji-game.module').then(
        (m) => m.EmojiGamePageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'golden-sentence',
    loadChildren: () =>
      import('./golden-sentence/golden-sentence.module').then(
        (m) => m.GoldenSentencePageModule
      ),
  },
  {
    path: 'user-information',
    loadChildren: () =>
      import('./user-information/user-information.module').then(
        (m) => m.UserInformationPageModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'forget',
    loadChildren: () =>
      import('./forget/forget.module').then((m) => m.ForgetPageModule),
  },
  {
    path: 'changepassword',
    loadChildren: () =>
      import('./changepassword/changepassword.module').then(
        (m) => m.ChangepasswordPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

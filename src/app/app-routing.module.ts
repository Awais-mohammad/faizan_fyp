import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'panel-home',
    loadChildren: () => import('./panel-home/panel-home.module').then( m => m.PanelHomePageModule)
  },
  {
    path: 'bookpurchase',
    loadChildren: () => import('./bookpurchase/bookpurchase.module').then( m => m.BookpurchasePageModule)
  },
  {
    path: 'employeepayslips',
    loadChildren: () => import('./employeepayslips/employeepayslips.module').then( m => m.EmployeepayslipsPageModule)
  },
  {
    path: 'salleries',
    loadChildren: () => import('./salleries/salleries.module').then( m => m.SalleriesPageModule)
  },
  {
    path: 'feeinvoice',
    loadChildren: () => import('./feeinvoice/feeinvoice.module').then( m => m.FeeinvoicePageModule)
  },
  {
    path: 'billsmanagement',
    loadChildren: () => import('./billsmanagement/billsmanagement.module').then( m => m.BillsmanagementPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'teacher-panel',
    loadChildren: () => import('./teacher-panel/teacher-panel.module').then( m => m.TeacherPanelPageModule)
  },  {
    path: 'students-panel',
    loadChildren: () => import('./students-panel/students-panel.module').then( m => m.StudentsPanelPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

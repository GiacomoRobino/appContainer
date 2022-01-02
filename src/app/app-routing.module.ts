import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourglassComponent } from './pages/apps/hourglass/hourglass.component';
import { AppWrapperComponent } from './pages/apps/app-wrapper/app-wrapper.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'apps', component: AppWrapperComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { HourglassComponent } from './pages/apps/hourglass/hourglass.component';
import { AppWrapperComponent } from './pages/apps/app-wrapper/app-wrapper.component';
import { GolComponent } from './pages/apps/gol/gol.component';
import { JsonToGraphComponent } from './pages/apps/json-to-graph/json-to-graph.component';
import { CircularCalendarComponent } from './pages/apps/circular-calendar/circular-calendar.component';
import { ParticleNetworkComponent } from './pages/apps/particle-network/particle-network.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HourglassComponent,
    AppWrapperComponent,
    GolComponent,
    JsonToGraphComponent,
    CircularCalendarComponent,
    ParticleNetworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

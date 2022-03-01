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
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MarkupEditorComponent } from './pages/apps/markup-editor/markup-editor.component';
import { MatrixComponent } from './pages/apps/matrix/matrix.component';
import { OrganizerComponent } from './pages/apps/organizer/organizer.component';
import { ContactMeComponent } from './pages/header/contact-me/contact-me.component';
import { AboutMeComponent } from './pages/header/about-me/about-me.component';
import { BackgroundComponent } from './background/background.component';
import { ParticleCanvasComponent } from './utils/particle-canvas/particle-canvas.component';
import { FooterContainerComponent } from './pages/footer/footer-container/footer-container.component';
import { SkillContainerComponent } from './pages/footer/footer-container/skill-container/skill-container.component';

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
    ParticleNetworkComponent,
    MarkupEditorComponent,
    MatrixComponent,
    OrganizerComponent,
    ContactMeComponent,
    AboutMeComponent,
    BackgroundComponent,
    ParticleCanvasComponent,
    FooterContainerComponent,
    SkillContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

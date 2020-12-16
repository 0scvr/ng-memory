import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { EndGameDialogComponent } from './endgamedialog/endgamedialog.component';
import { OptionsPanelComponent } from './options-panel/options-panel.component';
import { MinFlipCountDirective } from './min-flip-count.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    EndGameDialogComponent,
    OptionsPanelComponent,
    MinFlipCountDirective,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

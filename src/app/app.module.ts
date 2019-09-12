import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { PostComponent } from './components/post/post.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';

// Material UI
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    RoutesModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    private router: Router
  ) {
  }
}

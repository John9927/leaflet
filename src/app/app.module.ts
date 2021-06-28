import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { ListComponent } from './components/list/list.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

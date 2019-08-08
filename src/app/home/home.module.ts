import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule, HomeRoutingModule, FormsModule
  ]
})
export class HomeModule { }

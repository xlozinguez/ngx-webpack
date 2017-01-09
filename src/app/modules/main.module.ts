import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate';
import { HelloWorldComponent } from '../components/hello-world/hello-world.component';

@NgModule({
  bootstrap: [HelloWorldComponent],
  declarations: [HelloWorldComponent],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot()
  ],
  providers: []
})
export class MainModule {}

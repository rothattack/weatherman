import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherComponent } from './weather.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule, SharedModule],
})
export class WeatherModule {}

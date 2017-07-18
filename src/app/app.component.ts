import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GeolocationService} from './services/geolocation.service';
import {WeatherService} from './services/weather.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.s' +
  'css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public weather: any;
  public cityName: string;

  constructor(private locationService: GeolocationService, private weatherService: WeatherService) { }

  public ngOnInit(): void {
    // get the weather for the current location
    this.locationService.getLocation()
      .switchMap(location =>
        this.weatherService.getWeatherByCoords(location.coords.latitude, location.coords.longitude))
      .subscribe(weather => this.weather = weather);
  }

  public getWeatherClass(): string {
    if (this.weather) {
      switch (this.weather.weather[0].icon.substring(0, 2)) {
        case "01":
          return "fa fa-sun-o";
        case "10":
        case "09":
          return "fa fa-tint";
        case "02":
        case "03":
        case "04":
          return "fa fa-cloud";
        case "11":
          return "fa fa-bolt";
        case "13":
          return "fa fa-snowflake-o";
      }
    }
  }

  public getWeatherForCity(): void {
    if (this.cityName) {
      this.weatherService.getWeather(this.cityName)
        .subscribe(weather => this.weather = weather);
    }
  }
}

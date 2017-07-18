import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

const URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '60084b8e9ea1ced01baec89638db7f58';

/**
 * Handles getting weather information.
 */
@Injectable()
export class WeatherService {
  constructor(private http: Http) { }

  public getWeather(cityName: string): Observable<any> {
    return this.http.get(`${URL}?APPID=${API_KEY}&q=${cityName}&units=imperial`)
      .map(response => response.json());
  }

  /**
   * Gets weather data for the specified lat and lon.
   * @param lat
   * @param lon
   * @returns {Observable<Object>}
   */
  public getWeatherByCoords(lat: number = undefined, lon: number = undefined): Observable<any> {
    return this.http.get(`${URL}?APPID=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`)
      .map(response => response.json());
  }
}

import {HttpModule, ResponseOptions, XHRBackend, Response } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { MockBackend } from '@angular/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;
  let mockBackEnd: MockBackend;
  let lastConnection: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        WeatherService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(WeatherService);
    mockBackEnd = TestBed.get(XHRBackend);

    mockBackEnd.connections.subscribe(connection => {
      lastConnection = connection;

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ main: { temp: 92 } })
      })))
    });
  });

  describe('getWeather', () => {
    it('should return an Observable<any> that contains weather data', (done: any) => {

      service.getWeather('test city').subscribe(response => {
        expect(response.main.temp).toBe(92);
        expect(lastConnection.request.url).toBe('http://api.openweathermap.org/data/2.5/' +
          'weather?APPID=60084b8e9ea1ced01baec89638db7f58&q=test city');
        done();
      });
    });
  })
});

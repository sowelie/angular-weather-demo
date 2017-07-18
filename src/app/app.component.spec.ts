import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {GeolocationService} from './services/geolocation.service';
import {WeatherService} from './services/weather.service';
import {Observable} from 'rxjs/Observable';
import {HttpModule} from '@angular/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let weatherService: WeatherService;
  let geolocationService: GeolocationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ HttpModule ],
      providers: [
        GeolocationService,
        WeatherService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    weatherService = TestBed.get(WeatherService);
    geolocationService = TestBed.get(GeolocationService);
  });

  it('should display the current weather', ((done: any) => {
    let weatherSpy = spyOn(weatherService, 'getWeatherByCoords').and.returnValue(Observable.of({ main: { temp: 92 }}));
    spyOn(geolocationService, 'getLocation').and.returnValue({ coordinates: { latitude: 42, longitude: -71 }});

    // wait for the weather call to complete
    weatherSpy.calls.mostRecent().returnValue.subscribe(result => {

    });
  }));
});

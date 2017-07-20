import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {GeolocationService} from './services/geolocation.service';
import {WeatherService} from './services/weather.service';
import {Observable} from 'rxjs/Observable';
import {HttpModule} from '@angular/http';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let weatherService: WeatherService;
  let geolocationService: GeolocationService;
  let weatherSpy: jasmine.Spy;

  let expectText = (element: DebugElement, query: string = undefined): jasmine.Matchers<string> => {
    let resultElement = element;

    if (query) {
      resultElement = element.query(By.css(query));
    }

    return expect(resultElement ? resultElement.nativeElement.textContent : undefined);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ HttpModule, FormsModule ],
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

    weatherSpy = spyOn(weatherService, 'getWeatherByCoords').and.returnValue(Observable.of({
      main: {
        temp: 92,
        temp_min: 87,
        temp_max: 102
      },
      weather: [
        { description: 'rain', icon: '01d.png' }
      ],
      name: 'Concord'
    }));

    spyOn(geolocationService, 'getLocation').and.returnValue(Observable.of({
      coords: {
        latitude: 42,
        longitude: -71
      }
    }));
  });

  it('should display the current weather', ((done: any) => {
    fixture.detectChanges();

    // wait for the weather call to complete
    weatherSpy.calls.mostRecent().returnValue.subscribe(() => {
      expectText(fixture.debugElement, 'h1').toBe('Local weather for Concord');
      expectText(fixture.debugElement, 'h2').toBe('92° F');
      expectText(fixture.debugElement, '.low-temp').toBe('87° F');
      expectText(fixture.debugElement, '.high-temp').toBe('102° F');
      expectText(fixture.debugElement, '.description').toBe('rain');
      expect(fixture.debugElement.query(By.css('.icon')).classes['fa-sun-o']);

      expect(weatherSpy.calls.mostRecent().args[0]).toBe(42);
      expect(weatherSpy.calls.mostRecent().args[1]).toBe(-71);

      done();
    });
  }));

  it('should allow users to lookup different cities', (done:any) => {
    let weatherByCitySpy = spyOn(weatherService, 'getWeather').and.returnValue(Observable.of({
      main: {
        temp: 99,
        temp_min: 22,
        temp_max: 199
      },
      weather: [
        { description: 'sun', icon: '01d.png' }
      ],
      name: 'Test city'
    }));

    fixture.detectChanges();

    let input = fixture.debugElement.query(By.css('input.cityName')).nativeElement;
    // set the input text
    input.value = 'Test city';
    input.dispatchEvent(new Event('input'));

    // trigger the button click
    fixture.debugElement.query(By.css('button.submit')).triggerEventHandler('click', null);

    fixture.detectChanges();

    weatherByCitySpy.calls.mostRecent().returnValue.subscribe(() => {
      expectText(fixture.debugElement, 'h1').toBe('Local weather for Test city');
      expectText(fixture.debugElement, 'h2').toBe('99° F');
      expectText(fixture.debugElement, '.low-temp').toBe('22° F');
      expectText(fixture.debugElement, '.high-temp').toBe('199° F');
      expectText(fixture.debugElement, '.description').toBe('sun');
      expect(fixture.debugElement.query(By.css('.icon')).classes['fa-sun-o']);

      expect(weatherByCitySpy.calls.mostRecent().args[0]).toBe('Test city');

      done();
    });
  });
});

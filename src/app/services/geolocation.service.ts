import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Handles geolocation using the HTML 5 geolocation API.
 */
@Injectable()
export class GeolocationService {
  /**
   * Gets the user's current geographic coordinates.
   * @returns {any}
   */
  public getLocation(): Observable<any> {
    // check to see if the browser supports geolocation
    if (navigator.geolocation) {
      return Observable.create(observer => {
        // get the current position, trigger the subject once the position is returned from the browser
        navigator.geolocation.getCurrentPosition(position => {
          observer.next(position);
        });
      });
    } else {
      return Observable.of({ coords: { latitude: 0, longitude: 0 }});
    }
  }
}

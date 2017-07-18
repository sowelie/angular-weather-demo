import {GeolocationService} from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    service = new GeolocationService();
  });

  describe('getLocation()', () => {
    it('should use the geolocation API', (done: any) => {
      // mock geolocation
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((callback: any) => {
        callback({ coordinates: { latitude: 42, longitude: -71 }});
      });

      service.getLocation().subscribe(result => {
        expect(result.coordinates.latitude).toBe(42);
        expect(result.coordinates.longitude).toBe(-71);

        done();
      });
    })
  });
});

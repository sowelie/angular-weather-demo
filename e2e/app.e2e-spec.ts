import { AngularWeatherDemoPage } from './app.po';

describe('angular-weather-demo App', () => {
  let page: AngularWeatherDemoPage;

  beforeEach(() => {
    page = new AngularWeatherDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

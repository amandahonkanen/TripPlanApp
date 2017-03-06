import { TripPlanClientPage } from './app.po';

describe('trip-plan-client App', () => {
  let page: TripPlanClientPage;

  beforeEach(() => {
    page = new TripPlanClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

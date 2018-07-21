import { WellDonePage } from './app.po';

describe('well-done App', () => {
  let page: WellDonePage;

  beforeEach(() => {
    page = new WellDonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { AppaPage } from './app.po';

describe('appa App', () => {
  let page: AppaPage;

  beforeEach(() => {
    page = new AppaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

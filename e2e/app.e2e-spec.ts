import { FormsReactivePage } from './app.po';

describe('forms-reactive App', () => {
  let page: FormsReactivePage;

  beforeEach(() => {
    page = new FormsReactivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

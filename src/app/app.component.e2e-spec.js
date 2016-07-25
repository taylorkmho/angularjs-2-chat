describe('App', function () {
  beforeEach(function () {
    browser.get('/');
  });

  describe('Document', function () {
    it('should have a document title', function () {
      expect(browser.getTitle()).toEqual("Chat");
    });
  });

  describe('Structure', function () {
    describe('Header', function () {
      it('should have <header>', function () {
        expect(element(by.css('my-app header')).isPresent()).toEqual(true);
      });
      it('should have back button', function () {
        expect(element(by.css('my-app button')).isPresent()).toEqual(true);
      });
      it('should have title', function () {
        expect(element(by.css('my-app header h1')).isPresent()).toEqual(true);
      });
    });

    describe('Main', function () {
      it('should have <main>', function () {
        expect(element(by.css('my-app main')).isPresent()).toEqual(true);
      });
    });
  });

});

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //This test makes sure that each feed contains a url and that the URL is not empty.
        it ('has URL', function() {
          for (let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });
        //This test makes sure that the feed has a name and the name is not empty.
        it('has name', function() {
          for (feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          }

        })
    });


    describe('The menu', function() {
      //This test makes sure that the menu is hidden by default. Ryan Boris's Udacity FEND P4 Walkthrough was helpful in solving this section.
      const body = document.querySelector('body');
      const callback = jasmine.createSpy('body', 'toggleClass');
      it('menu is hidden', function() {
        expect(body).toHaveClass("menu-hidden");
        expect(callback).not.toHaveBeenCalled();
      });
      //This test makes sure that the visibility changes when clicked.
      it('menu visibility changes on click', function(){
        if(callback.calls.count() % 2 === 0) {
          expect(body).toHaveClass("menu-hidden");
        } else {
          $('.menu-icon-link').trigger('click');
          expect(body).toHaveClass("menu-hidden").toBe(false);
        }
      });
      });

    describe('Initial Entries', function() {
      //This test allows the feed to load and then checks to make sure that there is at least one entry in the feed.
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      it('loadFeed completes and contains entries', function() {
        const entries= document.querySelector('.feed').querySelectorAll('.entry');
        const entryLength = entries.length;
        expect(entryLength).toBeGreaterThan(0);
      });
    });

    //S.C. and Sara Krum's discussion on Slack about what an Udacity review recommended was the basis of some of this code.
      describe('New Feed Selection', function(){
        let firstArticle = document.querySelector('.feed');
        let secondArticle = document.querySelector('.feed');
        beforeEach(function(done){
          loadFeed(0, function(){
            firstArticle = firstArticle.innerHTML;
          });
          loadFeed(1, function() {
            secondArticle = secondArticle.innerHTML;
            done();
          });
        });
        it('changes as feeds are loaded', function() {
          expect(firstArticle).not.toEqual(secondArticle);
        })
      });
}());

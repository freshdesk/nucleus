import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() { 
    this.route("usage");

    this.route("components", function() {
      this.route("nucleus-button");
      this.route("nucleus-inline-banner");
      this.route("nucleus-modal");
      this.route("nucleus-toast-message");
      this.route("nucleus-banner");
    });

    this.route('not-found', { path: '/*path' });
  });
});

export default Router;

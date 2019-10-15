'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'nucleus',
    environment,
    rootURL: '/',
    locationType: 'auto',
    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 0,
      priority: 200,
      sticky: false,
      showProgress: false,

      // service defaults
      type: 'info',
      types: [ 'success', 'info', 'warning', 'danger', 'alert', 'secondary' ],
      preventDuplicates: true,
      destroyOnClick: false
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-a11y-testing'] = {
    componentOptions: {
      turnAuditOff: true, // Change to true to disable the audit in development
      visualNoiseLevel: 2,
      axeViolationClassNames: ['alert-box', 'alert-box--a11y']
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};

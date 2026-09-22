const defaults = {
  signupEndpoint: null,
  feedbackEndpoint: null,
  supportUrl: null,
  contactUrl: null,
  privacyUrl: null,
  collaboratorsUrl: null,
};

const runtimeOverrides = typeof window === 'undefined'
  ? {}
  : window.GENEOGRAPH_LANDING_CONFIG || {};

export const landingConfig = Object.freeze({ ...defaults, ...runtimeOverrides });

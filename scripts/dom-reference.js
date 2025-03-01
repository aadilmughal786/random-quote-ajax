// Button elements
const BUTTON_SELECTORS = {
  copy: '.btn-copy',
  info: '.btn-info', 
  refresh: '.btn-refresh',
  share: '.btn-share'
};

// Details elements
const DETAILS_SELECTORS = {
  creationDate: '.created-date',
  container: '.details-wrapper',
  modificationDate: '.modify-date',
  quoteLength: '.quote-length'
};

// Quote elements
const QUOTE_SELECTORS = {
  loader: '.quote-loader',
  text: '.quote',
  tags: '.tags',
  title: '.title'
};

// Get DOM elements using selectors
const buttons = Object.entries(BUTTON_SELECTORS).reduce((acc, [key, selector]) => {
  acc[`${key}Btn`] = document.querySelector(selector);
  return acc;
}, {});

const details = Object.entries(DETAILS_SELECTORS).reduce((acc, [key, selector]) => {
  acc[key === 'container' ? 'detailsContainer' : key] = document.querySelector(selector);
  return acc;
}, {});

// Modified to store quote elements directly without nesting
const quoteElements = Object.entries(QUOTE_SELECTORS).reduce((acc, [key, selector]) => {
  acc[key === 'loader' ? 'quoteLoader' : `quote${key.charAt(0).toUpperCase()}${key.slice(1)}`] = document.querySelector(selector);
  return acc;
}, {});

export default {
  buttons,
  details,
  // Spread quote elements at the top level instead of nesting them
  ...quoteElements
};

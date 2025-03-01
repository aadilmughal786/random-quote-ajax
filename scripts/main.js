import { init } from './util.js';

/**
 * Main entry point for the quote application
 * Initializes the app and displays welcome message
 */
const main = async () => {
  const WELCOME_MESSAGE = `
    ╔═══════════════════════════╗
    ║   Welcome to Quote App!   ║
    ╚═══════════════════════════╝
  `;

  try {
    console.log(WELCOME_MESSAGE);
    await init();
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
};

// Execute main function
(async () => {
  await main();
})();

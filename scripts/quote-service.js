/**
 * Service class for fetching quotes from the Quotable API
 */
class QuoteService {
  static BASE_URL = 'https://api.quotable.io';

  /**
   * Fetches a random quote from the API
   * @returns {Promise<Object>} Quote object containing content and metadata
   * @throws {Error} If the API request fails
   */
  static async fetchRandomQuote() {
    return await this.makeApiRequest('/random');
  }

  /**
   * Fetches a specific quote by ID
   * @param {string} quoteId - The ID of the quote to fetch
   * @returns {Promise<Object>} Quote object containing content and metadata
   * @throws {Error} If the quote ID is missing or the API request fails
   */
  static async fetchQuoteById(quoteId) {
    if (!quoteId?.trim()) {
      throw new Error('Quote ID is required and cannot be empty');
    }

    return await this.makeApiRequest(`/quotes/${quoteId}`);
  }

  /**
   * Makes an API request to the specified endpoint
   * @private
   * @param {string} endpoint - The API endpoint to request
   * @returns {Promise<Object>} Parsed JSON response
   * @throws {Error} If the request fails
   */
  static async makeApiRequest(endpoint) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error making API request to ${endpoint}:`, error);
      throw error;
    }
  }
}

export default QuoteService;

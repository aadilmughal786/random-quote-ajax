class LocalDb {
  static #QUOTE_ID_KEY = 'quoteId';

  /**
   * Sets the quote ID in local storage
   * @param {string|number} id - The quote ID to store
   */
  static setQuoteId(id) {
    if (!id) {
      throw new Error('Quote ID is required');
    }
    localStorage.setItem(this.#QUOTE_ID_KEY, id.toString());
  }

  /**
   * Gets the quote ID from local storage
   * @returns {string|null} The stored quote ID or null if not found
   */
  static getQuoteId() {
    return localStorage.getItem(this.#QUOTE_ID_KEY);
  }
}

export default LocalDb;

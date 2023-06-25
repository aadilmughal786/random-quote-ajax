class QuoteService {
  static url = "https://api.quotable.io";

  static async fetchRandomQuote() {
    const response = await fetch(`${QuoteService.url}/random`);
    const data = await response.json();
    return data;
  }

  static async fetchQuoteById(quoteId) {
    try {
      const response = await fetch(`${QuoteService.url}/quotes/${quoteId}`);
      const data = await response.json();
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export default QuoteService;

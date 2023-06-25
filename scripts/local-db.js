class LocalDb {
  static setQuoteId(id) {
    localStorage.setItem("quoteId", id);
  }

  static GetQuoteId() {
    return localStorage.getItem("quoteId");
  }
}

export default LocalDb;

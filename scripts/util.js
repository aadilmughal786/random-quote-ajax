import DOM from "./dom-reference.js";
import QuoteService from "./quote-service.js";
import LocalDb from "./local-db.js";

/**
 * Removes query parameters from the current URL
 */
const removeQueryParams = () => {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, document.title, url.toString());
};

/**
 * Creates a chip element with the given text
 * @param {string} text - Text to display in the chip
 * @returns {HTMLElement} Chip element
 */
const createChip = (text) => {
  const chip = document.createElement("span");
  chip.innerText = text;
  chip.classList.add("chip");
  return chip;
};

/**
 * Renders tags in the specified container
 * @param {HTMLElement} tagsContainer - Container element for tags
 * @param {string[]} data - Array of tag strings
 */
const renderTags = (tagsContainer, data = []) => {
  if (!tagsContainer) return;
  
  tagsContainer.innerHTML = ""; // Clear existing tags
  const DEFAULT_TAGS = ["inspiration", "motivation", "wisdom"];
  
  // Combine unique tags from data and default tags
  const uniqueTags = [...new Set([...data, ...DEFAULT_TAGS])];
  
  if (uniqueTags.length === 0) {
    tagsContainer.innerText = 'No tags available';
    return;
  }

  uniqueTags.forEach(tag => {
    tagsContainer.appendChild(createChip(tag));
  });
};

/**
 * Renders quote data to the DOM
 * @param {Object} quoteData - Quote data object
 */
const renderData = (data) => {
  if (!data) return;
  
  const { content, author = "Aadil Mughal Says", tags = [], dateAdded, dateModified, length } = data;
  
  if (DOM.quoteText) DOM.quoteText.innerHTML = content;
  if (DOM.quoteTitle) DOM.quoteTitle.innerText = author;
  
  // Handle tags using the unified renderTags function
  if (DOM.quoteTags) {
    renderTags(DOM.quoteTags, tags);
  }
  
  // Update details content with proper text formatting
  if (DOM.details.creationDate) {
    DOM.details.creationDate.innerText = `Created on ${formatDate(dateAdded)}`;
  }
  if (DOM.details.modificationDate) {
    DOM.details.modificationDate.innerText = `Last modified on ${formatDate(dateModified)}`;
  }
  if (DOM.details.quoteLength) {
    DOM.details.quoteLength.innerText = `${length || content.length} characters`;
  }
};

/**
 * Generates HTML content for 404 not found message
 * @param {string} quoteId - ID of quote that wasn't found
 * @param {string} statusMessage - Status message to display
 * @returns {string} HTML content
 */
const getNotFoundContent = (quoteId, statusMessage) => `
  <div class="notFound">
    <h3>404 - Not Found</h3>
    <p class="error-message">The quote ID <span>'${quoteId}'</span> is invalid</p>
  </div>
`;

/**
 * Fetches quote data based on URL parameters
 * @returns {Promise<Object>} Quote data
 */
const getData = async () => {
  if (!navigator.onLine) {
    return {
      _id: 'offline',
      content: "You are offline",
      author: "Aadil Mughal Says",
      tags: ["offline"],
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      length: 14
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const quoteId = urlParams.get("id");

    if (!quoteId) {
      return await QuoteService.fetchRandomQuote();
    }

    let data;
    try {
      data = await QuoteService.fetchQuoteById(quoteId);
    } catch (error) {
      data = { content: getNotFoundContent(quoteId, error.message) };
    }
    
    removeQueryParams();
    return data;
  } catch (error) {
    console.error('Error fetching quote data:', error);
    return { content: "Error occurred while fetching data" };
  }
};

/**
 * Toggles visibility of quote content and loader
 * @param {boolean} showLoader - Whether to show the loader
 */
const toggleQuoteDisplay = (showLoader = true) => {
  DOM.quoteText.style.display = showLoader ? "none" : "flex";
  DOM.quoteLoader.style.display = showLoader ? "flex" : "none";
};

/**
 * Initializes the application
 */
export const init = async () => {
  try {
    toggleQuoteDisplay(true);
    const data = await getData();
    renderData(data);
    LocalDb.setQuoteId(data._id);
    toggleQuoteDisplay(false);
  } catch (error) {
    console.error("Error occurred during initialization:", error);
    toggleQuoteDisplay(false);
  }

  setupEventListeners();
};

/**
 * Toggles visibility of quote details
 * Adds or removes 'open' class from details container
 */
export const toggleDetails = () => {
  if (!DOM.details?.detailsContainer) {
    console.error('Details container not found in DOM');
    return;
  }
  DOM.details.detailsContainer.classList.toggle("open");
};

/**
 * Handles clipboard operations with error handling
 * @param {string} content - Content to copy
 * @param {string} successMessage - Message to show on success
 */
const handleClipboardOperation = async (content, successMessage) => {
  const quoteId = LocalDb.getQuoteId();
  if (!quoteId) {
    alert("No quote found");
    return;
  }

  try {
    await navigator.clipboard.writeText(content);
    alert(successMessage);
  } catch (error) {
    console.error('Clipboard operation failed:', error);
    alert(`Error while copying ${successMessage.toLowerCase()}`);
  }
};

/**
 * Handles copying quote text to clipboard
 */
export const copyHandler = () => {
  handleClipboardOperation(DOM.quoteText.innerHTML, "Quote copied to clipboard");
};

/**
 * Handles sharing quote link
 */
export const shareHandler = () => {
  const quoteId = LocalDb.getQuoteId();
  handleClipboardOperation(
    `${window.location.href}?id=${quoteId}`,
    "Link copied to clipboard"
  );
};

/**
 * Sets up event listeners for UI interactions
 */
export const setupEventListeners = () => {
  const { copyBtn, infoBtn, refreshBtn, shareBtn } = DOM.buttons;

  copyBtn.addEventListener("click", copyHandler);
  infoBtn.addEventListener("click", toggleDetails);
  refreshBtn.addEventListener("click", init);
  shareBtn.addEventListener("click", shareHandler);
};

/**
 * Formats a date string to a readable format
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

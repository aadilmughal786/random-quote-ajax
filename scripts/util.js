import DOM from "./dom-reference.js";
import QuoteService from "./quote-service.js";
import LocalDb from "./local-db.js";

const removeQueryParams = () => {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, document.title, url.toString());
};

const renderTags = (tags, data) => {
  tags.innerHTML = "";
  const tagsData = data || [];
  const additionalTags = ["motivation", "quotes"];
  const allTags = [...tagsData, ...additionalTags];
  allTags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.innerText = tag;
    chip.classList.add("chip");
    tags.appendChild(chip);
  });
};

const renderData = (data) => {
  const { title, quote, tags, details } = DOM;
  title.innerHTML = data?.author || "Aadil Says";
  quote.innerHTML = data.content;
  renderTags(tags, data?.tags);
  details.createdDate.innerText = `Created date : ${data?.dateAdded || "NA"}`;
  details.modifyDate.innerText = `Modified date : ${
    data?.dateModified || "NA"
  }`;
  details.quoteLength.innerText = `Length data : ${data?.length || "NA"}`;
};

const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quoteId = urlParams.get("id");

  if (!navigator.onLine) {
    return { content: "You are offline" };
  }

  try {
    let data;
    if (quoteId) {
      data = await QuoteService.fetchQuoteById(quoteId);
      if (!data.content) {
        data.content = `<div class="notFound">
          <h3>404</h3>
          <p>${data.statusMessage}</p>
          <p><span>${quoteId}</span> is not a valid ID</p>
        </div>`;
      }
      removeQueryParams();
    } else {
      data = await QuoteService.fetchRandomQuote();
    }
    return data;
  } catch (error) {
    return { content: "Error occurred while fetching data" };
  }
};

export const init = async () => {
  try {
    DOM.quote.style.display = "none";
    DOM.loader.style.display = "flex";

    const data = await getData();
    renderData(data);
    LocalDb.setQuoteId(data._id);

    DOM.quote.style.display = "flex";
    DOM.loader.style.display = "none";
  } catch (error) {
    console.error("Error occurred during initialization:");
    DOM.loader.style.display = "none";
  }

  setupEventListeners();
};

export const toggleDetails = () => {
  DOM.details.detailsWrapper.classList.toggle("open");
};

export const copyHandler = async () => {
  const quoteId = LocalDb.GetQuoteId();
  if (quoteId) {
    try {
      await navigator.clipboard.writeText(DOM.quote.innerHTML);
      alert("Quote copied to clipboard");
    } catch (error) {
      alert("Error while copying quote to clipboard");
    }
  } else {
    alert("No quote found");
  }
};

export const shareHandler = async () => {
  const quoteId = LocalDb.GetQuoteId();
  if (quoteId) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}?id=${quoteId}`
      );
      alert("Link copied to clipboard");
    } catch (error) {
      alert("Error while copying link to clipboard");
    }
  } else {
    alert("No quote found");
  }
};

export const setupEventListeners = () => {
  const { copyButton, infoButton, refreshButton, shareButton } = DOM.buttons;

  copyButton.addEventListener("click", copyHandler);
  infoButton.addEventListener("click", toggleDetails);
  refreshButton.addEventListener("click", init);
  shareButton.addEventListener("click", shareHandler);
};

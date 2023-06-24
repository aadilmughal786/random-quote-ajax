// write a code to fetch random quote in fetch api?

const url = "https://api.quotable.io";

const refreshButton = document.getElementsByClassName("btn-refresh")[0];
const infoButton = document.getElementsByClassName("btn-info")[0];
const copyButton = document.getElementsByClassName("btn-copy")[0];
const shareButton = document.getElementsByClassName("btn-share")[0];

const detailsWrapper = document.getElementsByClassName("details-wrapper")[0];
const quote = document.getElementsByClassName("quote")[0];

let quoteId = "";

const fetchQuote = async () => {
  const response = await fetch(`${url}/random`);
  const data = await response.json();
  return data;
};

const fetchQuoteById = async (quoteId) => {
  try {
    const response = await fetch(`${url}/quotes/${quoteId}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
};

const init = async () => {
  const title = document.getElementsByClassName("title")[0];
  const loader = document.getElementsByClassName(" quote-loader")[0];
  const tags = document.getElementsByClassName("tags")[0];

  const createddate = document.getElementsByClassName("created-date")[0];
  const modifyDate = document.getElementsByClassName("modify-date")[0];
  const quoteLength = document.getElementsByClassName("quote-length")[0];

  quote.style.display = "none";
  loader.style.display = "flex";
  refreshButton.classList.toggle("spin");

  let data = {};

  const urlParams = new URLSearchParams(window.location.search);
  quoteId = urlParams.get("id");

  if (!navigator.onLine) {
    data.content = "You are offline";
  } else if (quoteId) {
    data = await fetchQuoteById(quoteId);
    if (!data.content) {
      data.content = `<div><h1>404</h1>
      <p>${data.statusMessage}</p></div>`;
    }
    // Get the current URL
    const url = new URL(window.location.href);

    // Remove the query parameters
    url.search = "";

    // Replace the current URL without query parameters
    window.history.replaceState({}, document.title, url.toString());
  } else {
    data = await fetchQuote();
  }

  quoteId = data._id;

  quote.style.display = "flex";
  loader.style.display = "none";
  refreshButton.classList.toggle("spin");

  createddate.innerText = `Created date : ${data?.dateAdded || "NA"}`;
  modifyDate.innerText = `Modified date : ${data?.dateModified || "NA"}`;
  quoteLength.innerText = `Length data : ${data?.length || "NA"}`;

  tags.innerHTML = "";
  const tagsData = data?.tags || [];
  const additionalTags = ["motivation", "quotes"];
  const allTags = [...tagsData, ...additionalTags];
  allTags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.innerText = tag;
    chip.classList.add("chip");
    tags.appendChild(chip);
  });

  title.innerHTML = data.author || "Aadil Says";
  quote.innerHTML = data.content;
};

refreshButton.addEventListener("click", init);
infoButton.addEventListener("click", () => {
  detailsWrapper.classList.toggle("open");
});

copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(quote.innerHTML)
    .then(() => {
      alert("Quote copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy quote:", error);
      alert("Error copying quote to clipboard");
    });
});

shareButton.addEventListener("click", () => {
  if (quoteId) {
    navigator.clipboard
      .writeText(`${window.location.href}?id=${quoteId}`)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        alert("Error copying link to clipboard");
      });
  } else {
    alert("No quote found");
  }
});

init();

console.log("Welcome to quote app");

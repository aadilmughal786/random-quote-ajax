// write a code to fetch random quote in fetch api?

const url = "https://api.quotable.io/random";

const refreshButton = document.getElementsByClassName("btn-refresh")[0];
const infoButton = document.getElementsByClassName("btn-info")[0];
const details = document.getElementsByClassName("details")[0];

const fetchQuote = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const init = async () => {
  const title = document.getElementsByClassName("title")[0];
  const loader = document.getElementsByClassName(" quote-loader")[0];
  const quote = document.getElementsByClassName("quote")[0];
  const tags = document.getElementsByClassName("tags")[0];

  const createddate = document.getElementsByClassName("created-date")[0];
  const modifyDate = document.getElementsByClassName("modify-date")[0];
  const quoteLength = document.getElementsByClassName("quote-length")[0];

  quote.style.display = "none";
  loader.style.display = "flex";

  const data = await fetchQuote();
  quote.style.display = "flex";
  loader.style.display = "none";

  createddate.innerText = `Created data : ${data?.dateAdded}`;
  modifyDate.innerText = `Modified data : ${data?.dateModified}`;
  quoteLength.innerText = `Length data : ${data?.length}`;

  tags.innerHTML = "";
  data?.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.innerText = tag;
    chip.classList.add("chip");
    tags.appendChild(chip);
  });

  title.innerHTML = `By : ${data.author}`;
  quote.innerHTML = data.content;
};

refreshButton.addEventListener("click", init);
infoButton.addEventListener("click", () => {
  details.classList.toggle("hide");
});

init();

console.log("Welcome to quote app");

// write a code to fetch random quote in fetch api?

const url = "https://api.quotable.io/random";

const refreshButton = document.getElementsByClassName("btn-refresh")[0];

const fetchQuote = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const init = async () => {
  const data = await fetchQuote();

  console.log(data);
  const titleField = document.getElementsByClassName("title")[0];
  const quoteField = document.getElementsByClassName("quote")[0];

  titleField.innerHTML = `By : ${data.author}`;
  quoteField.innerHTML = data.content;

  console.log(quoteField);
};

refreshButton.addEventListener("click", init);

init();

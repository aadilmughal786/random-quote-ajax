const copyButton = document.querySelector(".btn-copy");
const infoButton = document.querySelector(".btn-info");
const refreshButton = document.querySelector(".btn-refresh");
const shareButton = document.querySelector(".btn-share");

const createdDate = document.querySelector(".created-date");
const detailsWrapper = document.querySelector(".details-wrapper");
const modifyDate = document.querySelector(".modify-date");
const quoteLength = document.querySelector(".quote-length");

const loader = document.querySelector(".quote-loader");
const quote = document.querySelector(".quote");
const tags = document.querySelector(".tags");
const title = document.querySelector(".title");

export default {
  buttons: {
    copyButton,
    infoButton,
    refreshButton,
    shareButton,
  },
  details: {
    createdDate,
    detailsWrapper,
    modifyDate,
    quoteLength,
  },
  loader,
  quote,
  tags,
  title,
};

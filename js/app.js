const api = new API();

const stockList = [
  {
    symbol: 'CSCO',
    name: 'CISCO',
    domainName: 'cisco',
    targetPrice: 48.1,
    currency: '$'
  },
  {
    symbol: 'CDR.XWAR',
    name: 'CD PROJEKT RED',
    domainName: 'cdprojekt',
    targetPrice: 308.9,
    currency: 'zł'
  },
  {
    symbol: 'BB',
    name: 'BlackBerry',
    domainName: 'bb',
    targetPrice: 16.94,
    currency: '$'
  }
];
const defaultStock = stockList[stockList.length - 1];

const stock = stockList.find(st => location.hostname.includes(st.domainName)) || defaultStock;

function stopLoading() {
  document.getElementById('main').classList.remove('loading');
}

function positiveMessage() {
  return 'YES!!';
}

function negativeMessage() {
  const messages = ['No', 'Nope', 'Niet', 'Nain', 'Ne', 'Non'];
  return messages[Math.floor(Math.random() * messages.length)];
}

function pricify(value) {
  return `${value.toFixed(2)}${stock.currency}`;
}

function percentify(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function answerQuestion(quote) {
  const currentPrice = quote.close;
  const rootElement = document.getElementById('main');
  const messageElement = document.getElementById('answer');

  if (currentPrice >= stock.targetPrice) {
    messageElement.textContent = positiveMessage();
    rootElement.classList.add('positive');
  }
  else {
    messageElement.textContent = negativeMessage();
    rootElement.classList.add('negative');
  }

  const percentage = 100.0 * (currentPrice - stock.targetPrice) / stock.targetPrice;
  document.getElementById('percentage').textContent = percentify(percentage);

  document.getElementById('current').textContent = pricify(currentPrice);
  document.getElementById('target').textContent = pricify(stock.targetPrice);
}

api.quote(stock.symbol).then(quote => {
  console.debug('API results: ', quote)

  answerQuestion(quote);
  stopLoading();
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('stock-name').textContent = stock.name;
});

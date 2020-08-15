var targetPrice = 48.1;
var symbol = 'CSCO';
var stocks = new Stocks('P7UHM0LC4MTDBVT7');

function stopLoading() {
  document.getElementById('main').classList.remove('loading');
}

function positiveMessage() {
  return 'YES!!';
}

function negativeMessage() {
  var messages = ['No', 'Nope', 'Niet', 'Nain', 'Ne', 'Non'];
  return messages[Math.floor(Math.random() * messages.length)];
}

function pricify(value) {
  return `${value.toFixed(2)}$`;
}

function percentify(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function answerQuestion(quote) {
  var currentPrice = quote.open;
  var rootElement = document.getElementById('main');
  var messageElement = document.getElementById('answer');

  if (currentPrice >= targetPrice) {
    messageElement.textContent = positiveMessage();
    rootElement.classList.add('positive');
  }
  else {
    messageElement.textContent = negativeMessage();
    rootElement.classList.add('negative');
  }

  var percentage = 100.0 * (currentPrice - targetPrice) / targetPrice;
  document.getElementById('percentage').textContent = percentify(percentage);

  document.getElementById('current').textContent = pricify(currentPrice);
  document.getElementById('target').textContent = pricify(targetPrice);
}

stocks.timeSeries({ symbol, interval: '1min', amount: 1 }).then((results) => {
  answerQuestion(results[0]);
  stopLoading();
});

function API(apiKey) {
  this.quote = symbol => {
    const url = `http://api.marketstack.com/v1/tickers/${symbol}/eod?access_key=${apiKey}`;

    return fetch(url).then(response => response.json())
      .then(json => json.data.eod[0]);
  };
};

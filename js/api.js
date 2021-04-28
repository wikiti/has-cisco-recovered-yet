function API() {
  const proxyApiKey = 'ee1a507201fa29f4017171ed6f830939';
  const apiKey = '669413426e2966f4fffeff7a5cf60900';

  // NOTE: A proxy is used since firebase does not allow HTTP requests
  const proxiedUrl = url => {
    const encodedUrl = encodeURIComponent(url);
    return `https://api.scraperapi.com?api_key=${proxyApiKey}&url=${encodedUrl}`;
  };

  this.quote = symbol => {
    const url = `http://api.marketstack.com/v1/tickers/${symbol}/eod?access_key=${apiKey}`;

    return fetch(proxiedUrl(url)).then(response => response.json())
      .then(json => json.data.eod[0]);
  };
};

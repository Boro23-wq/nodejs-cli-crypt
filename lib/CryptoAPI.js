const axios = require('axios');
const colors = require('colors');

class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.nomics.com/v1/currencies/ticker';
  }

  async getPriceData(coinOption, curOption) {
    try {
      //currency formatter
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: curOption,
      });
      const res = await axios.get(
        `${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`
      );

      let output = '';
      res.data.forEach((coin) => {
        output += `Coin: ${coin.symbol.brightYellow} (${
          coin.name.cyan
        }) | Price: ${formatter.format(coin.price).green} | Market Cap: ${
          coin.market_cap.green
        } | Rank: ${coin.rank.bold.brightBlue}\n`;
      });

      return output;
    } catch (err) {
      handleAPIError(err);
    }
  }
}

function handleAPIError(err) {
  if (err.response.status === 401) {
    throw new Error('API Key Invalid! - Get an API Key at https://nomics.com');
  } else if (err.response.status === 404) {
    throw new Error('API Not Responding, Try Again Later!');
  } else {
    throw new Error('Uhoh! Something went wrong.');
  }
}

module.exports = CryptoAPI;

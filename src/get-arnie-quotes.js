'use strict';

const { httpGet } = require('./mock-http-interface');
const HTTP_OK = 200;

const getArnieQuotes = async (urls) => {
  // We can use parallelism as there are no rate limits
  const promises = urls.map((url) => getArnieQuote(url));
  const results = await Promise.all(promises);

  return results;
};

const getArnieQuote = async (url) => {
  const response = await httpGet(url);
  try {
    const body = JSON.parse(response.body);

    return response.status === HTTP_OK
      ? { 'Arnie Quote': body.message }
      : { FAILURE: body.message };
  } catch (error) {
    return { FAILURE: `Invalid JSON response from ${url}: ${error.message}` };
  }
};

module.exports = {
  getArnieQuotes,
};

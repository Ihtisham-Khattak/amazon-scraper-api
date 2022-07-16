//Import express and request-promise
const express = require("express");
const request = require("request-promise");
const cors = require('cors');
//Initialize the express
const app = express();

//Data will be receive in the Json form.
app.use(express.json());
app.use(cors());

//Get the API key form scraperApi
// const apiKey = '58ff2e30c30537b23dd54effcf7d856e';

const getPersonalParserKey = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//Our server will run on the PORT is.
const PORT = process.env.PORT || 5000;

//Sending response to the browser.
app.get("/", (req, res) => {
  res.send("Amazon Web Scrapper");
});

//ROUTING: Use routing to get the specific info of the product and its descriptions.

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const {apiKey} = req.query;

  try {
    const response = await request(`${getPersonalParserKey(apiKey)}&url=http://www.amazon.com/dp/${productId}`);
    //Fetching the Data in JSON
    res.json(JSON.parse(response));

  } catch (error) {
    res.json(error);
  }
});


//ROUTING: Use routing to get the the selected product reviews.
app.get('/products/:productId/reviews', async (req, res) => {

  const {productId} = req.params;
  const {apiKey} = req.query;

  try {
    const response = await request(`${getPersonalParserKey(apiKey)}&url=http://www.amazon.com/product-reviews/${productId}`);
    res.json(JSON.parse(response));
    
  } catch (error) {
    res.json(error)  
  }

})

//ROUTING: Use routing for Offers.
app.get('/products/:productId/offers', async (req, res) => {

  const {productId} = req.params;
  const {apiKey} = req.query;
  
  try {
    const response = await request(`${getPersonalParserKey(apiKey)}&url=http://www.amazon.com/gp/offer-listing/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error)
  }
})

//ROUTING: Use routing for Searching the specific itmes.

app.get('/search/:searchQuery', async (req, res) => {

  const {searchQuery} = req.params
  const {apiKey} = req.params

  try {
    const response = await request(`${getPersonalParserKey(apiKey)}&url=http://www.amazon.com/s?k=${searchQuery}`);
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }

})


app.get('/products/:productId/offers', async (req, res) => {

  const {productId} = req.params;
  const {apiKey} = req.query
  try {
    const response = await request(`${getPersonalParserKey(apiKey)}&url=http://www.amazon.com/gp/offer-listing/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error)
  }
})




//Listen the port
app.listen(PORT, () => {
  console.log(`Port is running on http://localhost:${PORT}`);
});

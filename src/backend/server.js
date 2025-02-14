import express from "express";
import cors from "cors";
import finnhub from "finnhub";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Data store for stock quotes
const stockQuotes = {};

// NSE stocks list
const STOCK_SYMBOLS = [
	"AAPL",
	"GOOGL",
	"MSFT",
	"AMZN",
	"NVDA",
	"INTC",
	"CSCO",
	"ADBE",
	"ORCL",
	"IBM",
	"QCOM",
	"TXN",
	"AMD",
	"MU",
	"HPQ",
	"DELL",
	"SAP",
	"UBER",
];

// Setup Finnhub Client
const ApiClient = finnhub.ApiClient.instance;
const api_key = ApiClient.authentications["api_key"];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

let tweets = [];

const fetchStockQuotes = () => {
	STOCK_SYMBOLS.forEach((symbol, index) => {
		setTimeout(() => {
			finnhubClient.quote(symbol, (error, data, response) => {
				if (error) {
					console.error(`Error fetching quote for ${symbol}:`, error);
				} else {
					stockQuotes[symbol] = data;
					console.log(`Quote for ${symbol}:`, data);
				}
			});
		}, index * 2000); // 2000ms delay between each call
	});
};

const fetchTweets = async () => {
	try {
		const response = await axios.get(
			"https://nitter.privacydev.net/search?q=stock%20market&f=tweets"
		);
		const $ = cheerio.load(response.data);
		tweets = [];

		$(".timeline-item").each((_, element) => {
			const text = $(element).find(".tweet-content").text().trim();
			const author = $(element).find(".username").text().trim();
			const timestamp = $(element).find(".tweet-date a").attr("title");

			if (text) {
				tweets.push({ author, text, timestamp });
			}
		});
		if (tweets.length === 0) {
			console.warn(
				"⚠️ No tweets found. Check the HTML structure and selectors."
			);
		}
	} catch (error) {
		if (error.response && error.response.status === 429) {
			console.warn("⚠️ Rate limit exceeded. Retrying in 60 seconds...");
			setTimeout(fetchTweets, 60000); // Retry after 60 seconds
		} else {
			console.error("❌ Error fetching tweets:", error);
		}
	}
};

// Initial fetches
fetchStockQuotes();
fetchTweets();

// Optional: Root route returns a simple message
app.get("/", (req, res) => {
	res.send("API is running.");
});

// Tweets API route
app.get("/api/tweets", (req, res) => {
	res.json(tweets);
});

// Stocks API route
app.get("/api/stock-quotes", (req, res) => {
	res.json(stockQuotes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

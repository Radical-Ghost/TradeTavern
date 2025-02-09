import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

console.log('🔄 Server is starting...');

let tweets = [];
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute

const fetchTweets = async () => {
    const currentTime = Date.now();

    try {
        const response = await axios.get('https://nitter.privacydev.net/search?q=stock%20market&f=tweets');

        const $ = cheerio.load(response.data);
        tweets = [];

        $('.timeline-item').each((_, element) => {
            const text = $(element).find('.tweet-content').text().trim();
            const author = $(element).find('.username').text().trim();
            const timestamp = $(element).find('.tweet-date a').attr('title');

            if (text) {
                tweets.push({ author, text, timestamp });
            }
        });

        console.log('📊 Parsed Tweets:', tweets);
        lastFetchTime = currentTime; // Update last fetch time

        if (tweets.length === 0) {
            console.warn('⚠️ No tweets found. Check the HTML structure and selectors.');
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn('⚠️ Rate limit exceeded. Retrying in 60 seconds...');
            setTimeout(fetchTweets, 60000); // Retry after 60 seconds
        } else {
            console.error('❌ Error fetching tweets:', error);
        }
    }
};

// Initial fetch
fetchTweets();

// Root route
app.get('/', (req, res) => {
    console.log('✅ Root route accessed');
    res.send('✅ Server is running! Use /api/tweets to fetch data.');
});

// Tweets API route
app.get('/api/tweets', (req, res) => {
    res.json(tweets);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
import React, { useEffect, useState } from 'react';

const CompanyNews = () => {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tweets');
                if (!response.ok) {
                    throw new Error('Failed to fetch tweets');
                }
                const data = await response.json();
                console.log('Fetched Tweets:', data);
                setTweets(data);
            } catch (err) {
                console.error('Error fetching tweets:', err);
                setError('Failed to load tweets');
            }
        };

        fetchTweets();
    }, []);

    return (
        <div
            style={{
                // marginLeft: '2vh',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '15px',
                width: '100%',
                overflowY: 'auto', // Enable scrolling for overflow content
                scrollbarWidth: 'none', // Hide scrollbar (Firefox)
                msOverflowStyle: 'none', // Hide scrollbar (IE/Edge)
                backgroundColor: "#1C2331",
                color: "white",
            }}
        >
            <style>
                {`
                    /* Hide scrollbar for Chrome, Safari, and Edge */
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <h2>Company News from Twitter (via Nitter)</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : tweets.length > 0 ? (
                tweets.map((tweet, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                        }}
                    >
                        <p>{tweet.text}</p>
                        <small>By: {tweet.author}</small>
                    </div>
                ))
            ) : (
                <p>Loading tweets...</p>
            )}
        </div>
    );
};

export default CompanyNews;
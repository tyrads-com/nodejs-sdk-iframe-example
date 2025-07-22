const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Configuration
const BASE_API_URL = "https://api.tyrads.com";
const API_KEY = "YOUR_API_KEY";                 // Replace with your actual API key
const API_SECRET = "YOUR_API_SECRET";           // Replace with your actual API secret
const SDK_VERSION = "3.0";
const SDK_PLATFORM = "Web";
const LANGUAGE = "en";
const AGE = 18;                                 // Replace with actual age
const GENDER = 1;                               // 1 for male, 2 for female
const PUBLISHER_USER_ID = "PUBLISHER_USER_ID";  // Replace with actual publisher user ID

app.get('/', async (req, res) => {
    try {
        const url = `${BASE_API_URL}/v${SDK_VERSION}/auth?lang=${LANGUAGE}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "X-Api-Key": API_KEY,
                "X-Api-Secret": API_SECRET,
                "X-User-ID": PUBLISHER_USER_ID,
                "X-SDK-Version": SDK_VERSION,
                "X-SDK-Platform": SDK_PLATFORM,
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                publisherUserId: PUBLISHER_USER_ID,
                age: AGE,
                gender: GENDER
            })
        });

        const data = await response.json();
        const SUCCESS = data?.data?.token ? true : false;
        const TOKEN = SUCCESS ? data.data.token : '';
        const IFRAME_URL = `https://sdk.tyrads.com?token=${encodeURIComponent(TOKEN)}`;

        res.json({ success: SUCCESS, token: TOKEN, iframeUrl: IFRAME_URL });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

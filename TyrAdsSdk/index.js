const express = require('express');
const cors = require('cors');
const { TyradsSDK } = require('@tyrads.com/tyrads-sdk-iframe');
const app = express();
const port = 3000;

app.use(cors());

// Configuration
const API_KEY = "YOUR_API_KEY";                 // Replace with your actual API key
const API_SECRET = "YOUR_API_SECRET";           // Replace with your actual API secret
const LANGUAGE = "en";
const AGE = 18;                                 // Replace with actual age
const GENDER = 1;                               // 1 for male, 2 for female
const PUBLISHER_USER_ID = "PUBLISHER_USER_ID";  // Replace with actual publisher user ID

app.get('/', async (req, res) => {
    try {
        const tyradsSDK = TyradsSDK.make(API_KEY, API_SECRET, LANGUAGE);
        const response = await tyradsSDK.authenticate({
            publisherUserId: PUBLISHER_USER_ID,
            age: AGE,
            gender: GENDER,
        });
        
        const token = response.getToken();
        const SUCCESS = token ? true : false;
        const TOKEN = SUCCESS ? token : '';
        const IFRAME_URL = tyradsSDK.iframeUrl(token)
        const IFRAME_PREMIUM_URL = tyradsSDK.iframePremiumWidget(token);

        res.json({ success: SUCCESS, token: TOKEN, iframeUrl: IFRAME_URL, iframePremiumUrl: IFRAME_PREMIUM_URL });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

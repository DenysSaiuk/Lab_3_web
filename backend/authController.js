const express = require('express');
const axios = require('axios');
const router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const clientId = 'acc667173afa64d95bdc';
const clientSecret = 'f38fc4df744d85b3f8d2d50bee51434d18788dac';
const redirectUri = 'https://localhost:3000/auth/casdoor/callback';
const casdoorTokenUrl = 'https://localhost:8443/api/login/oauth/access_token';

router.get('/casdoor/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing "code" in query parameters');
  }

  try {
    const response = await axios.post(
      casdoorTokenUrl,
      {
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    console.log('Token data:', JSON.stringify(data));

    if (data.access_token) {
      res.redirect(`https://localhost:3001/callback?token=${data.access_token}`);
    } else {
      res.status(400).send('Token exchange failed');
    }

  } catch (error) {
    console.error('Casdoor error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

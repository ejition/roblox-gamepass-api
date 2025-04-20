const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/gamepasses', async (req, res) => {
    const { userId, gameId } = req.query;
    if (!userId || !gameId) {
        return res.status(400).send('Missing userId or gameId');
    }

    try {
        const url = `https://games.roblox.com/v1/games/${gameId}/game-passes?userId=${userId}`;
        const response = await axios.get(url);

        const passes = response.data.data.map(pass => ({
            id: pass.id,
            name: pass.name,
            price: pass.price || 0
        }));

        res.json(passes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Failed to fetch gamepasses');
    }
});

app.listen(PORT, () => {
    console.log(`✅ API Server running on port ${PORT}`);
});

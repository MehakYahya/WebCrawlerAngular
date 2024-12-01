const express = require('express');
const axios = require('axios');
const JSSoup = require('jssoup').default;
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/scrape-bbc', async (req, res) => {
    try {
        // Fetch the BBC homepage
        const response = await axios.get('https://www.bbc.com');
        const soup = new JSSoup(response.data);

        // Extract articles based on available tags
        const titlesAndDescriptions = [];

        // Adjust selectors to get specific headlines and descriptions (ensure they are unique)
        const titles = soup.findAll('h2', {'data-testid': 'card-headline'});
        const descriptions = soup.findAll('p', {'data-testid': 'card-description'});

        // Ensure limiting to first 5
        const numberOfArticles = Math.min(titles.length, descriptions.length, 7);

        // Loop through the titles and descriptions and push them to the result
        for (let i = 0; i < numberOfArticles; i++) {
            const title = titles[i].text || 'No Title'; // Get the title text
            const description = descriptions[i].text || 'No Description';

            // Ensure no duplicates are added
            if (!titlesAndDescriptions.some(article => article.title === title)) {
                titlesAndDescriptions.push({ title, description });
            }
        }

        // Send the scraped data as JSON
        res.json(titlesAndDescriptions);
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).send('Error occurred while scraping BBC.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

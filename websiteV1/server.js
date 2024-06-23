import { createServer } from 'vite';
import express from 'express';
import bodyParser from 'body-parser';
import { filterCamp, filteredData } from './cronjob.js';

const app = express();
app.use(bodyParser.json());

(async() => {
    app.get('/api/campaigns', (req, res) => {
        res.json(filteredData);
    });

    const vite = await createServer({
        server: { middlewareMode: 'ssr' }
    });

    app.use(vite.middlewares);

    filterCamp.start();
    console.log('Cron job is scheduled');

    app.listen(3000, () => {
        console.log('Server is running at http://localhost:3000');
    });
})();
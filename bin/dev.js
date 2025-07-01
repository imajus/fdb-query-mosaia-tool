import dotenv from 'dotenv';
import express from 'express';
import { handler } from '../dist/index.js';

dotenv.config();

const app = express();

const { ETHEREUM_PRIVATE_KEY, PORT } = process.env;

if (ETHEREUM_PRIVATE_KEY === undefined) {
  console.log(
    '`ETHEREUM_PRIVATE_KEY` not set. Copy .env.example to .env first.'
  );
  process.exit(1);
}

app.get('/', async (req, res) => {
  const { datasetId, sql } = req.query;

  const event = {
    body: JSON.stringify({
      args: {
        datasetId,
        sql,
      },
      secrets: {
        ETHEREUM_PRIVATE_KEY,
      },
    }),
  };

  const result = await handler(event);

  res.status(result.statusCode).send(result.body);
});

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Local development server running on port ${port}`);
});

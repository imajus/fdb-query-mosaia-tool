import dotenv from 'dotenv';
import toolCall from './tool-call.js';

type RawEvent = {
  body: string;
};

type ParsedEvent = {
  args: Record<string, string>;
  secrets: Record<string, string>;
};

dotenv.config();

export async function handler(event: RawEvent) {
  const {
    args: { datasetId, sql },
    secrets: { ETHEREUM_PRIVATE_KEY },
  } = JSON.parse(event.body) as ParsedEvent;
  try {
    dotenv.populate(process.env, { ETHEREUM_PRIVATE_KEY }, { override: true });
    const result = await toolCall(datasetId, sql);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: unknown) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = 'Unknown error';
    }
    return {
      statusCode: 500,
      body: JSON.stringify(message),
    };
  }
}

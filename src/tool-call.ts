/// <reference types="./lib/types.d.ts" />
import { FilecoinDatasetFactory } from './lib/bundle.cjs';

export default async function toolCall(
  address: string,
  sql: string
): Promise<string> {
  const factory = new FilecoinDatasetFactory();
  const dataset = await factory.get(address);
  await dataset.purchase(sql);
  const rows = await dataset.query(sql);
  return JSON.stringify(rows);
}

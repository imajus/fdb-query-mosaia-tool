/// <reference types="filo-data-broker-mcp/types.d.ts" />
import { FilecoinDatasetFactory } from 'filo-data-broker-mcp';

export default async function toolCall(
  address: string,
  sql: string
): Promise<string> {
  const factory = new FilecoinDatasetFactory();
  const dataset = await factory.get(address);
  const rows = await dataset.query(sql);
  return JSON.stringify(rows);
}

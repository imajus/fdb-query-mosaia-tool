# FiloDataBroker Query Tool - Mosaia Tool

A Mosaia Tool for querying datasets from FiloDataBroker, a secure, decentralized marketplace for data trading.

## Overview

This tool enables AI agents to execute SQL queries against specific datasets on FiloDataBroker. It requires a dataset address and SQL query as input parameters, and returns the query results as JSON data.

## Getting Started

### Prerequisites

1. Register for an account on [mosaia.ai](https://mosaia.ai)
2. Install the GitHub app to this repo via the "Launch App" button on: https://mosaia.ai/org/mosaia/app/github
3. Have an Ethereum private key for blockchain access

### Local Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Validate the manifest**:

   ```bash
   npm run validate:manifest
   ```

3. **Build the project**:

   ```bash
   npm run build
   ```

4. **Start local development server**:

   ```bash
   npm run start:dev
   ```

5. **Test the tool** (in another terminal):
   ```bash
   npm run test:request
   ```

### Testing

- **Local Server**: The development server runs on port 3000
- **Manual Testing**: Use `npm run test:request` to test dataset querying with sample parameters
- **Postman**: Import the Postman collection from `postman/` directory for advanced testing
- **Required Parameters**:
  - `datasetId`: The address of the FiloDataBroker dataset
  - `sql`: The SQL query to execute against the dataset

### Tool Parameters

```json
{
  "datasetId": "0x7dA47e0E00173d9Fa860379E018b76ADEd769290",
  "sql": "SELECT * FROM dataset LIMIT 3"
}
```

### Environment Variables

- **`ETHEREUM_PRIVATE_KEY`**: Required for blockchain access and dataset querying

### Expected Response

The tool returns the actual query results as JSON. For example:

```json
[
  {
    "column1": "value1",
    "column2": "value2",
    "column3": "value3"
  },
  {
    "column1": "value4",
    "column2": "value5",
    "column3": "value6"
  }
]
```

## Deployment

### Automatic Deployment

1. Push changes to the `main` branch
2. The deployment script automatically triggers
3. Tool appears in the Mosaia Tool Registry within ~1 minute
4. Available at: `https://mosaia.ai/user/YOUR_USERNAME?tab=tools`

### Manual Validation

Before deploying, ensure:

- Manifest file is valid: `npm run validate:manifest`
- Build succeeds: `npm run build`
- Local testing passes: `npm run start:dev` + `npm run test:request`

## Mosaia Tool Requirements

This tool meets all Mosaia Tool requirements:

1. ✅ Contains a valid `.mosaia` manifest file
2. ✅ Defines an npm `build` command that runs TypeScript compiler
3. ✅ `npm run build` emits transpiled JavaScript into `dist/` directory
4. ✅ Entry point is `dist/index.js` after build

## Tool Manifest Configuration

The `.mosaia` manifest file defines:

- **name**: Tool display name
- **description**: Tool description
- **schema.function.parameters**:
  - `datasetId` (required): Dataset address on FiloDataBroker
  - `sql` (required): SQL query to execute
- **envVars**: `ETHEREUM_PRIVATE_KEY` for blockchain access

## Architecture

### Core Files

- **`src/index.ts`**: Main handler function that processes events with datasetId and sql parameters
- **`src/tool-call.ts`**: Core tool logic using FilecoinDatasetFactory to query datasets
- **`.mosaia`**: Tool manifest defining the interface with required parameters
- **`bin/dev.js`**: Local development server
- **`bin/validate-manifest.cjs`**: Manifest validation script

## Usage in AI Agents

Once deployed, AI agents can add this tool to query FiloDataBroker datasets:

1. **Required Configuration**: Must provide ETHEREUM_PRIVATE_KEY with positive tFIL token balance on Filecoin Cailbration network
2. **Query Execution**: Specify dataset address and SQL query
3. **Data Access**: Get real-time results from decentralized datasets
4. **Blockchain Integration**: Secure access via Ethereum blockchain

## Contributing

1. Fork this repository
2. Create a feature branch
3. Test changes locally with `npm run start:dev`
4. Validate manifest with `npm run validate:manifest`
5. Submit a pull request to `main`

## License

ISC

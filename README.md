![AIM 640x360](https://github.com/user-attachments/assets/039a7277-91f2-41c0-abef-dd3089cc6609)

AIMantle is a powerful web-based development environment for building, testing, and deploying Mantle agentic workflows. 

This project uses [AIM](https://aim.microchipgnu.pt) to run Markdown-based workflows. 

## Features

1. Integrates Reown Appkit to interact with the Mantle blockchain.
2. Integrates with GOAT SDK to enable AI Agents to interact with the blockchain.
  2.1 
3. Integrates with ZeroEx API to enable AI Agents to interact with the blockchain.
4. Integrates with E2B Code Interpreter to enable AI Agents to interact with the blockchain.

## What was not implemented

I tried integrating something similar to this Wagmi + GOAT integration https://github.com/goat-sdk/goat/pull/342 since it was not merged yet. So I could sign transactions with my connected wallet. Unfortunately since I joined the hackathon late, I was not able to get it working in time for the demo.

This is the reason you get both connection options: the Reown Appkit connection and the private key connection via the .env file.

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

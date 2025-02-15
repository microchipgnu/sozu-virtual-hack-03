import { config } from "@/reown/config";
import { aim, defaultRuntimeOptions } from "@aim-sdk/core";
import { Sandbox } from '@e2b/code-interpreter';
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { zeroEx } from "@goat-sdk/plugin-0x";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { viem } from "@goat-sdk/wallet-viem";
import { mantle } from "@reown/appkit/networks";
import { getBalance } from "@wagmi/core";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { z } from "zod";
import { createFileSystem } from "./filesystem";


const fileSystem = createFileSystem();
const files = fileSystem.getAllFiles();

export const createAimConfig = async (content: string, context: { accountDetails: string }) => {

    const account = privateKeyToAccount(
        process.env.WALLET_PRIVATE_KEY as `0x${string}`
    );

    const walletClient = createWalletClient({
        account: account,
        chain: mantle,
        transport: http()
    })

    // const uniswapPlugin = uniswap({
    //     baseUrl: process.env.UNISWAP_BASE_URL as string,
    //     apiKey: process.env.UNISWAP_API_KEY as string,
    // });

    const zeroexPlugin = zeroEx({
        apiKey: process.env.ZEROEX_API_KEY as string,
    });

    const erc20Plugin = erc20({
        tokens: [
            {
                chains: {
                    [mantle.id]: {
                        contractAddress: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
                    }
                },
                symbol: "MNT",
                name: "MNT",
                decimals: 18
            },
            {
                chains: {
                    [mantle.id]: {
                        contractAddress: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
                    }
                },
                symbol: "USDC",
                name: "USDC",
                decimals: 18
            },
        ]
    });

    const goatOnchainTools = await getOnChainTools({
        // @ts-ignore
        wallet: viem(walletClient),
        plugins: [zeroexPlugin, erc20Plugin]
    })

    const tools = {
        accountDetails: {
            description: "Get the account details",
            parameters: z.object({}),
            execute: async (input: unknown) => {
                return context.accountDetails
            }
        },
        get_charities: {
            description: "Get the charities",
            parameters: z.object({}),
            execute: async (input: unknown) => {
                return JSON.stringify([
                    {
                        name: "Save the Children",
                        description: "International NGO promoting children's rights and providing relief and support",
                        url: "https://www.savethechildren.org",
                        address: "0xcB1C6becbF9c4B85CFbB9BbC72d0e06509225E3C"
                    },
                    {
                        name: "UNICEF",
                        description: "United Nations agency working in over 190 countries for children's rights",
                        url: "https://www.unicef.org",
                        address: "0xcB1C6becbF9c4B85CFbB9BbC72d0e06509225E3C"
                    },
                    {
                        name: "Red Cross",
                        description: "International humanitarian organization providing emergency assistance and disaster relief",
                        url: "https://www.redcross.org",
                        address: "0xcB1C6becbF9c4B85CFbB9BbC72d0e06509225E3C"
                    },
                    {
                        name: "Doctors Without Borders",
                        description: "International medical humanitarian organization",
                        url: "https://www.doctorswithoutborders.org",
                        address: "0xcB1C6becbF9c4B85CFbB9BbC72d0e06509225E3C"
                    }
                ])
            }
        },
        balance: {
            description: "Get the balance of the connected account",
            parameters: z.object({
                address: z.string().describe("The connected account address to get the balance of")
            }),
            execute: async (input: unknown) => {
                const params = input as { address?: string };

                if (!params?.address) {
                    return "No address provided";
                }

                const balance = await getBalance(config, {
                    address: params.address as `0x${string}`,
                })

                // Convert balance.value to BigInt first, then do the division
                const balanceValue = BigInt(balance.value)
                const divisor = BigInt(10) ** BigInt(balance.decimals)
                const balanceInMNT = Number(balanceValue * BigInt(100) / divisor) / 100

                return `${balanceInMNT.toFixed(2)} ${balance.symbol}`
            }
        },
        tokenMap: {
            description: "Get the token map",
            parameters: z.object({}),
            execute: async (input: unknown) => {
                return JSON.stringify({
                    "MNT": "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
                    "USDC": "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9"
                })
            }
        },
        ...goatOnchainTools
    }



    // Object.keys(tools).map((name) => {
    //     // @ts-ignore
    //     tools[name].execute = undefined;
    // });


    return aim({
        content,
        options: {
            ...defaultRuntimeOptions,
            timeout: 1000 * 60 * 5,
            experimental_files: files.reduce((acc, file) => {
                acc[file.path] = { content: file.content };
                return acc;
            }, {} as Record<string, { content: string }>),
            env: {
                "OPENAI_API_KEY": process.env.OPENAI_API_KEY || "",
                "E2B_API_KEY": process.env.E2B_API_KEY || "",
                "REPLICATE_API_KEY": process.env.REPLICATE_API_KEY || "",
                "OPENROUTER_API_KEY": process.env.OPENROUTER_API_KEY || "",
            },
            events: {
                onError: (error) => {
                    console.error(error);
                },
                onLog: (message) => {
                    console.log(message);
                },
                onToolCall: (name, args) => {
                    console.log(name, args);
                },
            },
            adapters: [
                {
                    type: "code",
                    handlers: {
                        eval: async ({ code, language, variables }) => {
                            console.log(code, language, variables);
                            const sbx = await Sandbox.create({
                                apiKey: process.env.E2B_API_KEY || "", logger: console
                            });
                            const execution = await sbx.runCode(code, { language });
                            await sbx.kill();
                            return execution.toJSON();
                        }
                    }
                }
            ],
            tools: {
                ...tools,
            },
            plugins: [
                {
                    plugin: {
                        name: "get",
                        version: "0.0.1",
                        tags: {
                            "tools": {
                                render: "tools",
                                execute: async function* ({ node, config, state }) {
                                    yield Object.keys({ ...tools }).join(',');
                                },
                            },
                        },
                    },
                },
                {
                    plugin: {
                        name: "time",
                        version: "0.0.1",
                        tags: {
                            "wait": {
                                render: "wait",
                                execute: async function* ({ node, config, state }) {
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                },
                            },
                        },
                    },
                },
            ],
        },
    });
};

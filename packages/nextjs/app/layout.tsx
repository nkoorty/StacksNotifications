import type {Metadata} from "next";
import {ScaffoldStarkAppWithProviders} from "~~/components/ScaffoldStarkAppWithProviders";
import "~~/styles/globals.css";
import {ThemeProvider} from "~~/components/ThemeProvider";

const ScaffoldStarkApp = ({children}: {children: React.ReactNode}) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://etherscan.io/"],
      chainId: 1,
      chainName: "Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
      name: "Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Sepolia Ether",
        symbol: "SETH",
      },
      networkId: 1,
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      vanityName: "Sepolia Mainnet",
    },
  ];

  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <DynamicContextProvider
            settings={{
              environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
              walletConnectorExtensions: [EthersExtension],
              // initialAuthenticationMode: "connect-only",
            }}
          >
            <ScaffoldStarkAppWithProviders>
              {children}
            </ScaffoldStarkAppWithProviders>
          </DynamicContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;

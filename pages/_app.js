import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider supportedChainIds={[ChainId.Rinkeby]}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

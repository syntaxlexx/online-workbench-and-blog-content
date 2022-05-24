import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";

import nhost from "@/utils/nhost";

function MyApp({ Component, pageProps }) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;

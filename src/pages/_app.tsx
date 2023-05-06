import React, { useState } from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import theme from "../../theme";
import RouteGuard from "../components/RouteGuard";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      {getLayout(
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      )}
    </ChakraProvider>
  );
}

export default MyApp;

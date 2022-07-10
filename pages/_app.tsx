// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
// own css files here
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;

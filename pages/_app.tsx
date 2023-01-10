// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";

// roboto fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// own css files here
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import TasksService from "../services/tasks.service";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
  }, [router.events]);

  return <Component {...pageProps} />;
}

export const tasksService = new TasksService();

export default MyApp;

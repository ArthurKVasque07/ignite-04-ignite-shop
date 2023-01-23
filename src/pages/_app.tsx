import { globalStyles } from "@/styles/global";
import { AppProps } from "next/app";

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;

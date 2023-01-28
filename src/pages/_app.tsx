import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";
import { AppProps } from "next/app";
import { CartContextProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}
export default MyApp;

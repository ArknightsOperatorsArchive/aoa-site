import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";
import { UserInfoProvider } from "../providers/UserInfoProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <UserInfoProvider>
        <Component {...pageProps} />
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
export default MyApp;

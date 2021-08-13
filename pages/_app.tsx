import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { ProjectProvider } from "../providers/ProjectsProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <UserInfoProvider>
        <ProjectProvider>
          <Component {...pageProps} />
        </ProjectProvider>
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
export default MyApp;

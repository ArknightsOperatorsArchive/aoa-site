import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { ProjectProvider } from "../providers/ProjectsProvider";
import { ArtistProvider } from "../contexts/ArtistsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <UserInfoProvider>
        <ArtistProvider>
          <ProjectProvider>
            <Component {...pageProps} />
          </ProjectProvider>
        </ArtistProvider>
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
export default MyApp;

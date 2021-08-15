import "../styles/globals.css";
import type { AppProps } from "next/app";

import NotificationsContainer from "../containers/NotificationsContainer";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { ProjectProvider } from "../providers/ProjectsProvider";
import { ArtistProvider } from "../contexts/ArtistsContext";
import NotificationProvider from "../contexts/NotificationProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <UserInfoProvider>
        <ArtistProvider>
          <ProjectProvider>
            <NotificationProvider>
              <Component {...pageProps} />
              <NotificationsContainer />
            </NotificationProvider>
          </ProjectProvider>
        </ArtistProvider>
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
export default MyApp;

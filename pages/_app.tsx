import type { AppProps } from "next/app";
import Head from 'next/head'

import NotificationsContainer from "../containers/NotificationsContainer";

import { AuthenticationProvider } from "../providers/AuthenticationProvider";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { ProjectProvider } from "../providers/ProjectsProvider";
import { ArtistProvider } from "../contexts/ArtistsContext";
import NotificationProvider from "../contexts/NotificationProvider";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Arknights Operators Archive</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    </Head>
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
    </AuthenticationProvider></>
  );
}
export default MyApp;

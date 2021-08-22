# Arknights: Operators Archive

## Development

To build this project locally, follow the following steps:

### Prequisites

You will need Node to run this.

### Setup

1.  Install Dependencies

    ```sh
    npm install

    # or if you use yarn

    yarn
    ```

2.  Create a local environment file `.env.local` for local developments, add firebase values in from the GCP project

    ```.env.local
    NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=<YOUR_API_KEY>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<YOUR_DOMAIN>
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
    ```

3.  Run `npm run dev` or `yarn dev` to start the local NextJS server
4.  Visit localhost:3000

## License

TBD

### DISCLAIMER

Arknights is owned by HyperGryph, Yostar Games and Longcheng Ltd. This project has no association with the copyright holders and is used for fanart purposes.

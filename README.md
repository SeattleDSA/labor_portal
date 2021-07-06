# What does this site do
See https://docs.google.com/document/d/1tkk-wEBLtvsR31e1jY9Ys-TfIjE6n8cCXSPa2Ph8__Q/edit?usp=sharing
The labor portal is being worked on as an independent project of the Seattle DSA tech working group, to support the chapter’s labor organizing, including giving organizers a lay of the land of unions in Seattle, figuring out what unions and sectors Seattle DSA is strong in, assist the chapter in intentionally recruiting union members, and support Seattle DSA members seeking union jobs. 

We also seek to support other DSA chapters by providing this software open-source, with an installation guide, in order to facilitate labor organizing in other DSA chapters.  
# Setting up airtable data
TODO
# Setting up the environment
# Auth0
## Why auth0
Your chapter's labor information is somewhat sensitive. Using slack authentication means that you can at least ensure people
are valid DSA members in order to view labor data. In the future, we can explore more hierarchical permissions.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Setup slack authentication
1. Create a slack app
2. Connect it to Auth0

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` with your Auth0 credentials. If you don't yet have an Auth0 account, [sign up](https://auth0.com/signup) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

If you're using a hosting provider that uses a proxy in front of Node.js, comment in the `trust proxy` configuration in [app.js](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/blob/812bb41fa655a1178f6a33ba54b0aee2397b1917/01-Login/app.js#L63-L70). This is a [`express-session` configuration setting](https://www.npmjs.com/package/express-session#cookiesecure) that allows for trusting this first proxy.

Run the app.

```bash
npm start
```

The app will be served at `localhost:3000`.

## Running the Sample With Docker

In order to run the example with docker you need to have `docker` installed.

You also need to set the environment variables as explained [previously](#running-the-sample).

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## Running the application in glitch

TODO


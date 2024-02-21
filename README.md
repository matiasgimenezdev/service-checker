# NOC - Network Operation Center

This console application simulates a network operation center.

It is implemented in Node.js with Typescript and it follows Clean Architecture principles for modularity and scalability.

## Requirements

-   Node.js (v18.17.1 or higher)
-   NPM (v10.3 or higher)
-   Docker + Docker Compose

## Installation

1. Clone the repository

```bash
git clone https://github.com/matiasgimenezdev/network-operation-center
```

2. Install dependencies

```bash
npm install
```

3. Set up the environment variables on .env (see .env.example)

```
# Your email
MAILER_EMAIL =
#Generate this key using in your gmail account: https://myaccount.google.com/u/0/apppasswords
MAILER_SECRET_KEY =
MAILER_SERVICE = gmail

PRODUCTION = false

PRODUCTION = false
```

4. Run the application

```bash
npm run dev
```

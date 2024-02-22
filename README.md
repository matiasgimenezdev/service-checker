# Service checker

This console application checks the status of a given service and logs the results on the file system and different databases (MongoDB & Postgres).

It is implemented in Node.js with Typescript and follows Clean Architecture principles for modularity and scalability.

## Requirements

-   Node.js (v18.17.1 or higher)
-   NPM (v10.3 or higher)
-   Docker + Docker Compose

## Installation

1. Clone the repository

```bash
git clone https://github.com/matiasgimenezdev/service-checker
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

MONGO_URL =
MONGO_DB_NAME = "NOC"
MONGO_DB_USER =
MONGO_DB_PASSWORD =

POSTGRES_URL =
POSTGRES_DB_NAME = "NOC"
POSTGRES_USER =
POSTGRES_PASSWORD =
```

4. Start the database containers

```
docker compose up -d
```

5.  Run the application

```bash
npm run dev
```

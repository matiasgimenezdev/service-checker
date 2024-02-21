import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
	MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
	MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
	MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),

	PRODUCTION: env.get('PRODUCTION').required().asBool(),

	MONGO_URL: env.get('MONGO_URL').required().asString(),
	MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
	MONGO_DB_USER: env.get('MONGO_DB_USER').required().asString(),
	MONGO_DB_PASSWORD: env.get('MONGO_DB_PASSWORD').required().asString(),
};

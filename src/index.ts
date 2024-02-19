import { envs as env } from './config/plugins/env.plugin';
import { Server } from './presentation/server';

function main() {
	Server.start();

	const { MAILER_EMAIL, MAILER_SECRET_KEY, PRODUCTION } = env;
	// console.log({
	// 	MAILER_EMAIL,
	// 	MAILER_SECRET_KEY,
	// 	PRODUCTION,
	// });
}

(async () => {
	main();
})();

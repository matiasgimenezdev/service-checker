import { CheckService } from '../domain/usecases/checks/checkService';
import { CronService } from './cron/cronService';

export class Server {
	public static start() {
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';

			new CheckService(
				() => console.log(`Service ${url} is up!`),
				(error) => console.log(error)
			).execute(url);
		});
	}
}

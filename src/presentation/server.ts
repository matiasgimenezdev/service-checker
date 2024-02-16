import { CheckService } from '../domain/usecases/checks/checkService';
import { CronService } from './cron/cronService';

export class Server {
	public static start() {
		CronService.createJob('*/5 * * * * *', () => {
			new CheckService().execute('https://google.com');
		});
	}
}

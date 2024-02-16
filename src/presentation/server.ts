import { CronService } from './cron/cronService';

export class Server {
	public static start() {
		CronService.createJob('*/5 * * * * *', () => {
			const date = new Date();
			console.log('Running job at', date);
		});
	}
}

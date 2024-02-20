import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { CronService } from './cron/cron-service';
import { EmailService } from './mailer/email.service';
import { LogRepository } from '../infrastructure/repositories/log.repository';

// Instanciate the dependencies
const fileSystemDatasource = new FileSystemDatasource();
const fileSystemLogRepository = new LogRepository(fileSystemDatasource);

export class Server {
	public static async start() {
		// CronService.createJob('*/5 * * * * *', () => {
		// 	const url = 'https://google.com';
		// 	new CheckService(
		// 		fileSystemLogRepository,
		// 		() => console.log(`Service ${url} is up!`),
		// 		(error) => console.log(error)
		// 	).execute(url);
		// });
		//
		// const emailService = new EmailService(fileSystemLogRepository);
		// await emailService.sendEmailWithFileSystemLogs(
		// 	'matiasgimenez.dev@gmail.com'
		// );
	}
}

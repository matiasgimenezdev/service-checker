import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { CronService } from './cron/cron-job.service';
import { EmailService } from './mailer/email.service';
import { LogRepository } from '../infrastructure/repositories/log.repository';
import { SendLogsEmail } from '../domain/usecases/email/send-logs-email';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';

// Instanciate the dependencies
const mongoDatasource = new MongoDatasource();
const fileSystemDatasource = new FileSystemDatasource();
const logRepository = new LogRepository(mongoDatasource);

export class Server {
	public static async start() {
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';
			new CheckService(
				logRepository,
				() => console.log(`Service ${url} is up!`),
				(error) => console.log(error)
			).execute(url);
		});
	}
}

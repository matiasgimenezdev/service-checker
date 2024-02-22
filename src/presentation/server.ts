import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { CronService } from './cron/cron-job.service';
import { EmailService } from './mailer/email.service';
import { LogRepository } from '../infrastructure/repositories/log.repository';
import { SendLogsEmail } from '../domain/usecases/email/send-logs-email';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource';
import { PostgresDatasource } from '../infrastructure/datasources/postgres.datasource';
import { CheckServiceMultiple } from '../domain/usecases/checks/check-service-multiple';

const mongoDatasource = new MongoDatasource();
const fileSystemDatasource = new FileSystemDatasource();
const postgresDatasource = new PostgresDatasource();
const fileSystemLogRepository = new LogRepository(fileSystemDatasource);
const mongoLogRepository = new LogRepository(mongoDatasource);
const postgresLogRepository = new LogRepository(postgresDatasource);

export class Server {
	public static async start() {
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';
			new CheckServiceMultiple(
				[
					fileSystemLogRepository,
					mongoLogRepository,
					postgresLogRepository,
				],
				() => console.log(`Service ${url} is up!`),
				(error) => console.log(error)
			).execute(url);
		});
	}
}

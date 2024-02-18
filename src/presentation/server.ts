import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.';
import { LogRepository } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';

// Instanciate the dependencies
const fileSystemDatasource = new FileSystemDatasource();
const fileSystemLogRepository = new LogRepository(fileSystemDatasource);

export class Server {
	public static start() {
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';

			new CheckService(
				() => console.log(`Service ${url} is up!`),
				(error) => console.log(error),
				fileSystemLogRepository
			).execute(url);
		});
	}
}

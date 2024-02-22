import { LogRepository } from '../../../application/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface CheckServiceMultipleUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
	private logRepository: LogRepository[];
	private successCallback: SuccessCallback;
	private errorCallback: ErrorCallback;

	constructor(
		logRepository: LogRepository[],
		successCallback?: SuccessCallback,
		errorCallback?: ErrorCallback
	) {
		this.logRepository = logRepository;
		this.errorCallback = errorCallback;
		this.successCallback = successCallback;
	}

	private saveLogs(log: LogEntity): void {
		this.logRepository.forEach((logRepository) =>
			logRepository.saveLog(log)
		);
	}

	public async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Service ${url} is down`);
			}

			const log = new LogEntity({
				message: `Service ${url} is up and running`,
				level: LogSeverityLevel.low,
				origin: 'check-service-multiple.ts',
			});
			this.saveLogs(log);
			this.successCallback && this.successCallback();

			return true;
		} catch (error) {
			const errorMessage = `${url} is failing: ${error}`;

			const log = new LogEntity({
				message: errorMessage,
				level: LogSeverityLevel.high,
				origin: 'check-service-multiple.ts',
			});

			this.saveLogs(log);
			this.errorCallback && this.errorCallback(errorMessage);

			return false;
		}
	}
}

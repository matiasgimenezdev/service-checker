import { LogRepository } from '../../../application/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	private logRepository: LogRepository;
	private successCallback: SuccessCallback;
	private errorCallback: ErrorCallback;

	constructor(
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
		logRepository: LogRepository
	) {
		this.errorCallback = errorCallback;
		this.successCallback = successCallback;

		this.logRepository = logRepository;
	}

	public async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Service ${url} is down`);
			}

			const log = new LogEntity(
				`Service ${url} is up and running`,
				LogSeverityLevel.low
			);
			this.logRepository.saveLog(log);
			this.successCallback();

			return true;
		} catch (error) {
			const errorMessage = `${error}`;

			const log = new LogEntity(errorMessage, LogSeverityLevel.high);
			this.logRepository.saveLog(log);
			this.errorCallback(errorMessage);

			return false;
		}
	}
}

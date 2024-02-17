import { LogRepository as ILogRepository } from '../../application/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDatasource } from '../../application/datasources/log.datasource';

export class LogRepository implements ILogRepository {
	private logDatasource: LogDatasource;

	// DI - Dependency injection
	constructor(logDatasource: LogDatasource) {
		this.logDatasource = logDatasource;
	}

	public async saveLog(log: LogEntity): Promise<void> {
		this.logDatasource.saveLog(log);
	}

	public async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		return this.logDatasource.getLog(severityLevel);
	}
}

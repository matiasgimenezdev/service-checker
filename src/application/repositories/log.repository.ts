import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface LogRepository {
	saveLog(log: LogEntity): Promise<void>;
	getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

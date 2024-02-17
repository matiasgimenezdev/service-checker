import { LogEntity, LogSeverityLevel } from '../../domain/entities/logEntity';

export abstract class LogDatasource {
	abstract saveLog(log: LogEntity): Promise<void>;
	abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

import fs from 'fs';
import { LogDatasource } from '../../application/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
	private readonly logsPath = 'logs/';
	private readonly allLogsPath = 'logs/all.log';
	private readonly mediumLogsPath = 'logs/medium.log';
	private readonly highLogsPath = 'logs/high.log';

	constructor() {
		this.createLogFiles();
	}

	private createLogFiles() {
		if (!fs.existsSync(this.logsPath)) {
			fs.mkdirSync(this.logsPath);
		}

		[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
			(path) => {
				if (fs.existsSync(path)) return;

				fs.writeFileSync(path, '');
			}
		);
	}

	public async saveLog(newLog: LogEntity) {
		const newLogAsJson = `${JSON.stringify(newLog)} \n`;

		fs.appendFileSync(this.allLogsPath, newLogAsJson);

		if (newLog.level === LogSeverityLevel.low) return;
		if (newLog.level === LogSeverityLevel.medium) {
			fs.appendFileSync(this.mediumLogsPath, newLogAsJson);
		} else {
			fs.appendFileSync(this.highLogsPath, newLogAsJson);
		}
	}

	private readLogsFromFile(path: string): LogEntity[] {
		const content = fs.readFileSync(path, 'utf-8');

		const logs: LogEntity[] = content
			.split('\n')
			.map((currentLog) => LogEntity.fromJson(currentLog));

		return logs;
	}

	public async getLog(severityLevel: LogSeverityLevel) {
		switch (severityLevel) {
			case LogSeverityLevel.low:
				return this.readLogsFromFile(this.allLogsPath);
			case LogSeverityLevel.medium:
				return this.readLogsFromFile(this.mediumLogsPath);
			case LogSeverityLevel.high:
				return this.readLogsFromFile(this.highLogsPath);
			default:
				throw new Error(
					`${severityLevel} is not a valid severity level. Valid levels are: low, medium, high.`
				);
		}
	}
}

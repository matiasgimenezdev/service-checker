export enum LogSeverityLevel {
	low = 'LOW',
	medium = 'MEDIUM',
	high = 'HIGH',
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel) {
		this.level = level;
		this.message = message;
		this.createdAt = new Date();
	}

	public static fromJson(json: string): LogEntity {
		const { message, level, createdAt } = JSON.parse(json);

		if (!message) throw new Error('Log message is required');
		if (!level) throw new Error('Log severity level is required');

		const log = new LogEntity(message, level);
		log.createdAt = new Date(createdAt);

		return log;
	}
}

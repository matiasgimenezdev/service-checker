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
}

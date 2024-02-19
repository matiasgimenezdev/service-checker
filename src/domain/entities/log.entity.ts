export enum LogSeverityLevel {
	low = 'LOW',
	medium = 'MEDIUM',
	high = 'HIGH',
}

export interface LogEntityParams {
	level: LogSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(params: LogEntityParams) {
		const { level, message, origin, createdAt = new Date() } = params;
		this.level = level;
		this.message = message;
		this.origin = origin;
		this.createdAt = createdAt;
	}

	public static fromJson(json: string): LogEntity {
		const { message, level, createdAt, origin } = JSON.parse(json);

		if (!message) throw new Error('Log message is required');
		if (!level) throw new Error('Log severity level is required');

		const log = new LogEntity({
			message,
			level,
			createdAt,
			origin,
		});

		return log;
	}
}

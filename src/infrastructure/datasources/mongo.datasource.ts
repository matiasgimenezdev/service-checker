import { LogDatasource } from '../../application/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/models/log.model';

export class MongoDatasource implements LogDatasource {
	public async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create({
			message: log.message,
			origin: log.origin,
			level: log.level,
			createdAt: log.createdAt,
		});

		newLog.save();
	}

	public async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({ level: severityLevel });

		return logs.map((mongoLog) => {
			return LogEntity.fromObject(mongoLog);
		});
	}
}

import { LogDatasource } from '../../application/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostgresDatasource implements LogDatasource {
	public async saveLog(log: LogEntity): Promise<void> {
		const newLog = await prisma.logModel.create({
			data: log,
		});
	}

	public async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await prisma.logModel.findMany({
			where: {
				level: severityLevel,
			},
		});

		return logs.map((log) => LogEntity.fromObject(log));
	}
}

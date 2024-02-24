import { PrismaClient } from '@prisma/client';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing postgres.datasource.ts', () => {
	const prisma = new PrismaClient();

	beforeEach(() => {
		prisma.logModel.deleteMany({});
	});

	afterAll(() => {
		prisma.$disconnect();
	});

	const log = new LogEntity({
		message: 'Test message',
		origin: 'Test origin',
		level: LogSeverityLevel.low,
		createdAt: new Date(),
	});

	test('should create a log', async () => {
		await prisma.logModel.create({ data: log });
		const logsAmount = await prisma.logModel.count();
		expect(logsAmount).toBe(1);
	});

	test('should get logs by severity level', async () => {
		await prisma.logModel.create({ data: log });
		const logs = await prisma.logModel.findMany({
			where: { level: LogSeverityLevel.low },
		});

		expect(logs.length).toBe(1);
	});
});

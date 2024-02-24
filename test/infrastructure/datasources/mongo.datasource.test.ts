import { MongoDatasource } from '../../../src/infrastructure/datasources/mongo.datasource';
import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/env.plugin';
import mongoose from 'mongoose';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo/models/log.model';

describe('Testing mongo.datasource.ts', () => {
	const mongoDatasource = new MongoDatasource();
	const log = new LogEntity({
		message: 'Test message',
		origin: 'Test origin',
		level: LogSeverityLevel.low,
		createdAt: new Date(),
	});

	beforeAll(async () => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoURL: envs.MONGO_URL,
		});
	});

	beforeEach(async () => {
		await LogModel.deleteMany({}).exec();
	});

	afterAll(async () => {
		mongoose.connection.close();
	});

	test('should create a log', async () => {
		await mongoDatasource.saveLog(log);

		const logsAmount = await LogModel.countDocuments();
		expect(logsAmount).toBe(1);
	});

	test('should get logs by severity level', async () => {
		await LogModel.create(log);
		const logs = await mongoDatasource.getLog(LogSeverityLevel.low);
		expect(logs.length).toBe(1);
	});
});

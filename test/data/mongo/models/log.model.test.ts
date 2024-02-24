import { MongoDatabase } from '../../../../src/data/mongo/init';
import { envs } from '../../../../src/config/plugins/env.plugin';
import mongoose from 'mongoose';
import { LogModel } from '../../../../src/data/mongo/models/log.model';

describe('Testing log.model.ts', () => {
	beforeAll(async () => {
		await MongoDatabase.connect({
			mongoURL: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME,
		});
	});

	afterAll(async () => {
		mongoose.connection.close();
	});

	test('should return LogModel', async () => {
		const logData = {
			origin: 'log.model.test.ts',
			message: 'test-message',
			level: 'LOW',
		};

		const log = await LogModel.create(logData);
		expect(log).toEqual(
			expect.objectContaining({
				...logData,
				id: expect.any(String),
				createdAt: expect.any(Date),
			})
		);

		await LogModel.findByIdAndDelete(log.id);
	});

	test('should return the schema object', () => {
		const logSchema = LogModel.schema.obj;
		expect(logSchema).toEqual(
			expect.objectContaining({
				level: {
					type: String,
					enum: ['LOW', 'MEDIUM', 'HIGH'],
					default: 'LOW',
				},
				message: {
					type: String,
					required: true,
				},
				origin: {
					type: String,
				},
				createdAt: {
					type: Date,
					default: expect.any(Date),
				},
			})
		);
	});
});

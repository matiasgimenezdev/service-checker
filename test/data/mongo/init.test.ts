import mongoose from 'mongoose';
import { envs } from '../../../src/config/plugins/env.plugin';
import { MongoDatabase } from '../../../src/data/mongo/init';

describe('Testing init.ts', () => {
	afterAll(() => {
		mongoose.connection.close();
	});

	test('should connect to mongodb', async () => {
		const connected = await MongoDatabase.connect({
			mongoURL: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME,
		});

		expect(connected).toBeTruthy();
	});

	test('should throw error when connection fails', async () => {
		try {
			await MongoDatabase.connect({
				mongoURL: 'invalid-url',
				dbName: envs.MONGO_DB_NAME,
			});
			expect(true).toBeFalsy();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});
});

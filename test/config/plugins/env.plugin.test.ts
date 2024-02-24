import { envs } from '../../../src/config/plugins/env.plugin';

describe('Testing env.plugin', () => {
	test('should return .env variables', () => {
		expect(envs).toEqual({
			MAILER_EMAIL: 'servicecheckertesting@gmail.com',
			MAILER_SECRET_KEY: 'sasfasfasgasg',
			MAILER_SERVICE: 'gmail',
			PRODUCTION: false,
			MONGO_URL: 'mongodb://tester:123456789@localhost:27017',
			MONGO_DB_NAME: 'service-checker-testing',
			MONGO_DB_USER: 'tester',
			MONGO_DB_PASSWORD: '123456789',
		});
	});

	test('should return an error if not found env variable', async () => {
		jest.resetModules();
		process.env.MONGO_DB_PASSWORD = '';
		try {
			await import('../../../src/config/plugins/env.plugin');
			expect(true).toBe(false);
		} catch (error) {
			expect(`${error}`).toContain(
				`"MONGO_DB_PASSWORD" is a required variable`
			);
		}
	});
});

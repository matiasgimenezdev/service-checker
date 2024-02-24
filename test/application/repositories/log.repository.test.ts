import { LogRepository } from '../../../src/application/repositories/log.repository';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing log.repository.ts', () => {
	const newLog = new LogEntity({
		origin: 'log.repository.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	});

	class LogRepositoryMock implements LogRepository {
		async saveLog(log: LogEntity): Promise<void> {
			return;
		}

		async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLog];
		}
	}

	test('should test the abstract class', async () => {
		// Here we test that the class implements the methods
		const logRepositoryMock = new LogRepositoryMock();
		expect(logRepositoryMock).toBeInstanceOf(LogRepositoryMock);
		expect(typeof logRepositoryMock.saveLog).toBe('function');
		expect(typeof logRepositoryMock.getLog).toBe('function');

		// Here we test the methods parameters and return types. In other words, we test the contract of the class
		await logRepositoryMock.saveLog(newLog);
		const logs = await logRepositoryMock.getLog(LogSeverityLevel.low);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(LogEntity);
	});
});

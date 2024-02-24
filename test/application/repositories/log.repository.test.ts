import { LogRepository } from '../../../src/application/repositories/log.repository';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing log.repository.ts', () => {
	const log = new LogEntity({
		origin: 'log.datasource.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	});

	class LogRepositoryMock implements LogRepository {
		async saveLog(log: LogEntity): Promise<void> {
			return;
		}

		async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [log];
		}
	}

	test('should test the abstract class', async () => {
		const logRepositoryMock = new LogRepositoryMock();
		expect(logRepositoryMock).toBeInstanceOf(LogRepositoryMock);
		expect(typeof logRepositoryMock.saveLog).toBe('function');
		expect(typeof logRepositoryMock.getLog).toBe('function');

		await logRepositoryMock.saveLog(log);

		const logs = await logRepositoryMock.getLog(LogSeverityLevel.low);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(LogEntity);
	});
});

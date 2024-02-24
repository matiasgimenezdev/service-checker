import { LogDatasource } from '../../../src/application/datasources/log.datasource';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing log.datasource.ts', () => {
	const newLog = new LogEntity({
		origin: 'log.datasource.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	});

	class LogDatasourceMock implements LogDatasource {
		async saveLog(log: LogEntity): Promise<void> {
			return;
		}

		async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLog];
		}
	}

	test('should test the abstract class', async () => {
		const logDatasourceMock = new LogDatasourceMock();

		expect(logDatasourceMock).toBeInstanceOf(LogDatasourceMock);
		expect(typeof logDatasourceMock.saveLog).toBe('function');
		expect(typeof logDatasourceMock.getLog).toBe('function');

		await logDatasourceMock.saveLog(newLog);

		const logs = await logDatasourceMock.getLog(LogSeverityLevel.low);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(LogEntity);
	});
});

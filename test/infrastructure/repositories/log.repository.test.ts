import { LogRepository } from '../../../src/infrastructure/repositories/log.repository';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing log.repository.ts', () => {
	const mockLogDatasource = {
		saveLog: jest.fn(),
		getLog: jest.fn(),
	};

	const log = new LogEntity({
		message: 'This is a test',
		level: LogSeverityLevel.low,
		origin: 'test',
	});

	test('saveLog() should call the datasource', async () => {
		const logRepository = new LogRepository(mockLogDatasource);
		logRepository.saveLog(log);

		expect(mockLogDatasource.saveLog).toHaveBeenCalledTimes(1);
		expect(mockLogDatasource.saveLog).toHaveBeenCalledWith({
			...log,
			createdAt: expect.any(Date),
		});
	});

	test('getLog() should call the datasource', async () => {
		const logRepository = new LogRepository(mockLogDatasource);
		logRepository.getLog(LogSeverityLevel.low);

		expect(mockLogDatasource.getLog).toHaveBeenCalledTimes(1);
		expect(mockLogDatasource.getLog).toHaveBeenCalledWith(
			LogSeverityLevel.low
		);
	});
});

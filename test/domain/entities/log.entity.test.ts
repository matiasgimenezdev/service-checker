import exp from 'constants';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing log.entity.ts', () => {
	const logData = {
		level: LogSeverityLevel.low,
		message: 'Test message',
		origin: 'Test origin',
		createdAt: new Date(),
	};

	test('should create a LogEntity instance', () => {
		const log = new LogEntity(logData);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log).toEqual({
			...logData,
			createdAt: expect.any(Date),
		});
	});

	test('should create a LogEntity instance from JSON', () => {
		const json = JSON.stringify(new LogEntity(logData));
		const log = LogEntity.fromJson(json);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log).toEqual(logData);
	});

	test('should create a LogEntity instance from Object', () => {
		const log = LogEntity.fromObject(logData);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log).toEqual(logData);
	});
});

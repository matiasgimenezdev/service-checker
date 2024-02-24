import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource';
import { LogDatasource } from '../../../src/application/datasources/log.datasource';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('Testing file-system.datasource.ts', () => {
	const logPath = path.join(__dirname, '../../../logs');

	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	test('should create log files if the do not exist', () => {
		new FileSystemDatasource();
		const files = fs.readdirSync(logPath);
		expect(files.length).toBe(3);
		expect(files).toEqual(['all.log', 'high.log', 'medium.log']);
	});

	test('should save a log in all.log', () => {
		const logDatasource = new FileSystemDatasource();
		const log = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.low,
			origin: 'test',
		});

		logDatasource.saveLog(log);
		const allLogs = fs.readFileSync(path.join(logPath, 'all.log'), 'utf-8');
		expect(allLogs).toContain(JSON.stringify(log));
	});

	test('should save a log in all.log and medium.log', () => {
		const logDatasource = new FileSystemDatasource();
		const log = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.medium,
			origin: 'test',
		});

		logDatasource.saveLog(log);
		const allLogs = fs.readFileSync(path.join(logPath, 'all.log'), 'utf-8');
		const mediumLogs = fs.readFileSync(
			path.join(logPath, 'medium.log'),
			'utf-8'
		);
		expect(allLogs).toContain(JSON.stringify(log));
		expect(mediumLogs).toContain(JSON.stringify(log));
	});

	test('should save a log in all.log and high.log', () => {
		const logDatasource = new FileSystemDatasource();
		const log = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.high,
			origin: 'test',
		});

		logDatasource.saveLog(log);
		const allLogs = fs.readFileSync(path.join(logPath, 'all.log'), 'utf-8');
		const highLogs = fs.readFileSync(
			path.join(logPath, 'high.log'),
			'utf-8'
		);
		expect(allLogs).toContain(JSON.stringify(log));
		expect(highLogs).toContain(JSON.stringify(log));
	});

	test('should return an empty array if there is zero logs', async () => {
		const logDatasource = new FileSystemDatasource();
		const logs = await logDatasource.getLog(LogSeverityLevel.low);
		expect(logs.length).toBe(0);
	});

	test('should return all logs', async () => {
		const logDatasource = new FileSystemDatasource();

		const lowLog = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.low,
			origin: 'test',
		});

		const mediumLog = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.medium,
			origin: 'test',
		});
		const highLog = new LogEntity({
			message: 'This is a test',
			level: LogSeverityLevel.high,
			origin: 'test',
		});

		logDatasource.saveLog(lowLog);
		logDatasource.saveLog(mediumLog);
		logDatasource.saveLog(highLog);

		const lowLogs = await logDatasource.getLog(LogSeverityLevel.low);
		const mediumLogs = await logDatasource.getLog(LogSeverityLevel.medium);
		const highLogs = await logDatasource.getLog(LogSeverityLevel.high);

		expect(lowLogs.length).toBe(3);
		expect(lowLogs).toEqual(
			expect.arrayContaining([lowLog, mediumLog, highLog])
		);
		expect(mediumLogs.length).toBe(1);
		expect(mediumLogs[0]).toEqual(mediumLog);
		expect(highLogs.length).toBe(1);
		expect(highLogs[0]).toEqual(highLog);
	});

	test('should return an error if the log level does not exist', async () => {
		const logDatasource = new FileSystemDatasource();
		const invalidSeverityLevel = 'other' as LogSeverityLevel;
		try {
			logDatasource.getLog(invalidSeverityLevel);
		} catch (error) {
			expect(`${error}`).toContain(
				`${invalidSeverityLevel} is not a valid severity level`
			);
		}
	});
});

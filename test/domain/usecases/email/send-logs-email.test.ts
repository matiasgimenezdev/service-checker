import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SendLogsEmail } from '../../../../src/domain/usecases/email/send-logs-email';
import { EmailService } from '../../../../src/presentation/mailer/email.service';
describe('Testing send-logs-email.ts', () => {
	const mockLogRepository = {
		saveLog: jest.fn(),
		getLog: jest.fn(),
	};

	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn(),
	};

	const sendLogsEmail = new SendLogsEmail(
		mockEmailService as any,
		mockLogRepository
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call sendEmail() and saveLog()', async () => {
		mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(true);

		const wasSend = await sendLogsEmail.execute('matias@google.com');

		expect(wasSend).toBe(true);
		expect(
			mockEmailService.sendEmailWithFileSystemLogs
		).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
	});

	test('should throw an error and call saveLog() if sendEmail() returns false', async () => {
		mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

		const wasSend = await sendLogsEmail.execute('');

		expect(wasSend).toBe(false);
		expect(
			mockEmailService.sendEmailWithFileSystemLogs
		).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
			message: 'Error: Error sending email with the logs',
			level: 'HIGH',
			createdAt: expect.any(Date),
			origin: 'send-logs-email.ts',
		});
	});
});

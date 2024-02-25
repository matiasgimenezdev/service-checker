import nodemailer from 'nodemailer';
import {
	EmailService,
	sendEmailOptions,
} from '../../../src/presentation/mailer/email.service';

describe('Testing email.service.ts', () => {
	const mockSendMail = jest.fn();

	nodemailer.createTransport = jest
		.fn()
		.mockReturnValue({ sendMail: mockSendMail });

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const emailService = new EmailService();
	test('should send an email', async () => {
		const sendEmailOptions: sendEmailOptions = {
			to: 'test@test.com',
			subject: 'Test email',
			htmlBody: '<h1>This is a test email</h1>',
		};

		await emailService.sendEmail(sendEmailOptions);
		expect(mockSendMail).toHaveBeenCalledWith({
			to: 'test@test.com',
			subject: 'Test email',
			html: '<h1>This is a test email</h1>',
			attachments: expect.any(Array),
		});
	});

	test('should send an email with attachments', async () => {
		await emailService.sendEmailWithFileSystemLogs('test@test.com');

		expect(mockSendMail).toHaveBeenCalledWith({
			to: 'test@test.com',
			subject: 'Logs del sistema',
			html: expect.any(String),
			attachments: expect.arrayContaining([
				{ filename: 'logs-all.log', path: './logs/all.log' },
				{ filename: 'logs-medium.log', path: './logs/medium.log' },
				{ filename: 'logs-high.log', path: './logs/high.log' },
			]),
		});
	});
});

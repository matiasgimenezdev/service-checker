import { EmailService } from '../../../presentation/mailer/email.service';
import { LogRepository } from '../../../application/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface SendLogsEmailUseCase {
	execute(to: string | string[]): Promise<boolean>;
}

export class SendLogsEmail implements SendLogsEmailUseCase {
	private emailService: EmailService;
	private logRepository: LogRepository;

	public constructor(
		emailService: EmailService,
		logRepository: LogRepository
	) {
		this.emailService = emailService;
		this.logRepository = logRepository;
	}

	public async execute(to: string | string[]): Promise<boolean> {
		try {
			const sent = await this.emailService.sendEmailWithFileSystemLogs(
				to
			);
			if (!sent) throw new Error('Error sending email with the logs');

			const log = new LogEntity({
				message: `Email with logs sent successfully`,
				level: LogSeverityLevel.high,
				origin: 'send-logs-email.ts',
			});
			this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			const log = new LogEntity({
				message: `${error}`,
				level: LogSeverityLevel.high,
				origin: 'send-logs-email.ts',
			});
			this.logRepository.saveLog(log);
			return false;
		}
	}
}

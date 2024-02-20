import nodemailer, { Transporter } from 'nodemailer';
import { envs as env } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../application/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendEmailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter: Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: env.MAILER_SERVICE,
			auth: {
				user: env.MAILER_EMAIL,
				pass: env.MAILER_SECRET_KEY,
			},
		});
	}

	public async sendEmail(options: sendEmailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;
		try {
			await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	public async sendEmailWithFileSystemLogs(
		to: string | string[]
	): Promise<boolean> {
		const subject = 'Logs del sistema';
		const htmlBody = `
            <h2>Logs del sistema - NOC</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p>Ver logs adjuntos</p>
        `;
		const attachments: Attachment[] = [
			{ filename: 'logs-all.log', path: './logs/all.log' },
			{ filename: 'logs-medium.log', path: './logs/medium.log' },
			{ filename: 'logs-high.log', path: './logs/high.log' },
		];

		const sendResult = await this.sendEmail({
			to,
			subject,
			htmlBody,
			attachments,
		});
		return sendResult;
	}
}

import { CronService } from '../../../src/presentation/cron/cron-job.service';

describe('Testing cron-job.service.ts', () => {
	const mockOnTick = jest.fn();

	test('should create a cron job', (done) => {
		const job = CronService.createJob('* * * * * * ', mockOnTick);

		setTimeout(() => {
			expect(mockOnTick).toHaveBeenCalledTimes(2);
			job.stop();
			done();
		}, 2000);
	});
});

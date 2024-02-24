import { error } from 'console';
import { CheckService } from '../../../../src/domain/usecases/checks/check-service';
import { LogEntity } from '../../../../src/domain/entities/log.entity';

describe('Testing check-service.ts', () => {
	const mockLogRepository = {
		saveLog: jest.fn(),
		getLog: jest.fn(),
	};
	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call success callback when fetch success', async () => {
		const checkService = new CheckService(
			mockLogRepository,
			successCallback,
			errorCallback
		);

		const wasOk = await checkService.execute('http://www.google.com');
		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
	});

	test('should call error callback when fetch fails', async () => {
		const checkService = new CheckService(
			mockLogRepository,
			successCallback,
			errorCallback
		);

		const wasOk = await checkService.execute('http://www.gooasfasfgle.com');
		expect(wasOk).toBe(false);
		expect(errorCallback).toHaveBeenCalled();
		expect(successCallback).not.toHaveBeenCalled();
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
	});
});

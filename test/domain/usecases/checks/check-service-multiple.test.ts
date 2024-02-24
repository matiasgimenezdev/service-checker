import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/usecases/checks/check-service-multiple';
describe('Testing check-service-multiple.ts', () => {
	const mockLogRepositories = [
		{
			saveLog: jest.fn(),
			getLog: jest.fn(),
		},
		{
			saveLog: jest.fn(),
			getLog: jest.fn(),
		},
		{
			saveLog: jest.fn(),
			getLog: jest.fn(),
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	test('should call success callback if fetch success', async () => {
		const checkServiceMultiple = new CheckServiceMultiple(
			mockLogRepositories,
			successCallback,
			errorCallback
		);
		const wasOk = await checkServiceMultiple.execute(
			'http://www.google.com'
		);

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();
		expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
		expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
		expect(mockLogRepositories[2].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
	});

	test('should call error callback if fetch fails', async () => {
		const checkServiceMultiple = new CheckServiceMultiple(
			mockLogRepositories,
			successCallback,
			errorCallback
		);

		const wasOk = await checkServiceMultiple.execute(
			'http://www.googleasd.com'
		);

		expect(wasOk).toBe(false);
		expect(errorCallback).toHaveBeenCalled();
		expect(successCallback).not.toHaveBeenCalled();
		expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
		expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
		expect(mockLogRepositories[2].saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		);
	});
});

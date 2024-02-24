import mongoose from 'mongoose';

interface ConnectionOptions {
	mongoURL: string;
	dbName: string;
}

export class MongoDatabase {
	public static async connect(connectionOptions: ConnectionOptions) {
		const { mongoURL, dbName } = connectionOptions;
		try {
			await mongoose.connect(mongoURL, { dbName });
			return true;
		} catch (error) {
			throw error;
		}
	}
}

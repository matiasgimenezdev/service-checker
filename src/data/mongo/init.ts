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
			console.log('Mongo connection successful!');
		} catch (error) {
			console.log('Mongo connection failed...');
			throw error;
		}
	}
}

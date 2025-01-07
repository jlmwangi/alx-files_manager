import { createClient } from 'redis';

class RedisClient {
	// a constructor that creates a redis client
	constructor() {
		this.client = createClient();
		this.client.on('error', (err) => console.log('Redis client error: ', err));
	}

	//a function returning true when redis connection is a success
	async isAlive() {
		try {
			await this.client.connect();
			return true;
		} catch (error) {
			console.error('Failed to connect: ', error);
			return false;
		}
	}

	// an async function that takes a string key arg and returns its value
	async get(key) {
		return await this.client.get(key);
	}

	// a set async function that also sets an expiration time
	async set(key, val, duration) {
		return await this.client.set(key, val, { EX: duration });
	}

	// a function that deletes value associated with key
	async del(key) {
		await this.client.del(key);
	}
}

const redisClient = new RedisClient();

export default redisClient;

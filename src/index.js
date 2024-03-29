import { filterSchema, walkThroughHandler } from './lib/engine.js';

const Syntaxe = class {
	#data; #schema;

	constructor(config = null){
		this.#init(config);
	}

	#init(config = null){
		if (config) {
			this.#data = config.data || this.#data;
			this.#schema = config.schema || this.#schema;
		}
	}

	async query(config = null){
		try {
			if (config)
				this.#init(config);

			if (!this.#data)
				throw new Error(`'data' is invalid.`);
			else if (!this.#schema)
				throw new Error(`'schema' is invalid.`);

			const filtered = await filterSchema(this.#schema);
			return await walkThroughHandler({ data: this.#data, ...filtered });
		} catch(err) { return err; }
	}

	schema(schema = null){
		this.#schema = schema;
		return this;
	}

	data(data = null){
		this.#data = data;
		return this;
	}
};

export default Syntaxe;
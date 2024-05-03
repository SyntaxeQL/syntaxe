import { SyntaxeEngine } from './lib/engine.js';

const Syntaxe = class {
	#data; #schema; success; error;

	constructor(config = null){
		this.#init(config);
	}

	#init(config = null){
		if (config) {
			this.#data = config.data || this.#data;
			this.#schema = config.schema || this.#schema;
		}
		this.success = false;
		this.error = String();
	}

	async query(config = null){
		try {
			this.#init(config);

			if (!this.#data)
				this.error = `'data' is invalid.`;
			else if (!this.#schema)
				this.error = `'schema' is invalid.`;

			const syntaxeEngine = new SyntaxeEngine();

			const filtered = await syntaxeEngine.filterSchema(this.#schema);

			if (filtered.status) {
				let result = await syntaxeEngine.walkThroughHandler({ data: this.#data, ...filtered });
				
				if (result == null || result == undefined) {
					this.error = `Query failed. Check your schema and try again.`
					return this.#data;
				}

				this.success = true;
				return result;
			} else {
				this.error = filtered.err;
				return this.#data;
			}
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
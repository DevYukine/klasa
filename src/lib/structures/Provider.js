/**
 * Base class for all Klasa Providers. See {@tutorial CreatingProviders} for more information how to use this class
 * to build custom providers.
 * @tutorial CreatingProviders
 */
class Provider {

	/**
	 * @typedef {Object} ProviderOptions
	 * @property {boolean} [enabled=true] Whether the provider is enabled or not
	 * @property {string} [description=''] The provider description
	 * @property {boolean} [sql=false] If the provider provides to a sql datasource
	 */

	/**
	 * @param {KlasaClient} client The Klasa client
	 * @param {string} dir The path to the core or user provider pieces folder
	 * @param {string} file The path from the pieces folder to the provider file
	 * @param {string} name The name of the provider
	 * @param {ProviderOptions} [options = {}] Optional Provider settings
	 */
	constructor(client, dir, file, name, options = {}) {
		/**
		 * @type {KlasaClient}
		 */
		this.client = client;

		/**
		 * The directory to where this provider piece is stored
		 * @type {string}
		 */
		this.dir = dir;

		/**
		 * The file location where this provider is stored
		 * @type {string}
		 */
		this.file = file;

		/**
		 * The name of the provider
		 * @type {string}
		 */
		this.name = name;

		/**
		 * The type of Klasa piece this is
		 * @type {string}
		 */
		this.type = 'provider';

		/**
		 * If the provider is enabled or not
		 * @type {boolean}
		 */
		this.enabled = options.enabled || true;

		/**
		 * The description of the provider
		 * @type {string}
		 */
		this.description = options.description || '';

		/**
		 * If the provider provides to a sql datasource
		 * @type {boolean}
		 */
		this.sql = options.sql || false;
	}

	/**
	 * Reloads this provider
	 * @returns {Promise<Provider>} The newly loaded provider
	 */
	async reload() {
		const pro = this.client.providers.load(this.dir, this.file);
		await pro.init();
		return pro;
	}

	/**
	 * Unloads this provider
	 * @returns {void}
	 */
	unload() {
		return this.client.providers.delete(this);
	}

	/**
	 * Disables this provider
	 * @returns {Provider} This provider
	 */
	disable() {
		this.enabled = false;
		return this;
	}

	/**
	 * Enables this provider
	 * @returns {Provider} This provider
	 */
	enable() {
		this.enabled = true;
		return this;
	}

	/**
	 * The init method to be optionaly overwritten in actual provider pieces
	 * @abstract
	 * @returns {Promise<void>}
	 */
	async init() {
		// Optionally defined in extension Classes
	}

}

module.exports = Provider;

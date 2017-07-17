/**
 * Base class for all Klasa Monitors. See {@tutorial CreatingMonitors} for more information how to use this class
 * to build custom monitors.
 * @tutorial CreatingMonitors
 */
class Monitor {

	/**
	 * @typedef {Object} MonitorOptions
	 * @property {boolean} [enabled=true] Whether the monitor is enabled
	 * @property {boolean} [ignoreBots=true] Whether the monitor ignores bots or not
	 * @property {boolean} [ignoreSelf=true] Whether the monitor ignores itself or not
	 */

	/**
	 * @param {KlasaClient} client The Klasa client
	 * @param {string} dir The path to the core or user monitor pieces folder
	 * @param {string} file The path from the pieces folder to the monitor file
	 * @param {string} name The name of the monitor
	 * @param {MonitorOptions} [options = {}] Optional Monitor settings
	 */
	constructor(client, dir, file, name, options = {}) {
		/**
		 * @type {KlasaClient}
		 */
		this.client = client;

		/**
		 * The directory to where this monitor piece is stored
		 * @type {string}
		 */
		this.dir = dir;

		/**
		 * The file location where this monitor is stored
		 * @type {string}
		 */
		this.file = file;

		/**
		 * The name of the monitor
		 * @type {string}
		 */
		this.name = name;

		/**
		 * The type of Klasa piece this is
		 * @type {string}
		 */
		this.type = 'monitor';

		/**
		 * If the monitor is enabled or not
		 * @type {boolean}
		 */
		this.enabled = options.enabled || true;

		/**
		 * Whether the monitor ignores bots or not
		 * @type {boolean}
		 */
		this.ignoreBots = options.ignoreBots || true;

		/**
		 * Whether the monitor ignores itself or not
		 * @type {boolean}
		 */
		this.ignoreSelf = options.ignoreSelf || true;
	}

	/**
	 * Reloads this monitor
	 * @returns {Promise<Monitor>} The newly loaded monitor
	 */
	async reload() {
		const mon = this.client.monitors.load(this.dir, this.file);
		await mon.init();
		return mon;
	}

	/**
	 * Unloads this monitor
	 * @returns {void}
	 */
	unload() {
		return this.client.monitors.delete(this);
	}

	/**
	 * Disables this monitor
	 * @returns {Monitor} This monitor
	 */
	disable() {
		this.enabled = false;
		return this;
	}

	/**
	 * Enables this monitor
	 * @returns {Monitor} This monitor
	 */
	enable() {
		this.enabled = true;
		return this;
	}

	/**
	 * The run method to be overwritten in actual monitor pieces
	 * @param {external:Message} msg The discord message
	 * @abstract
	 * @returns {void}
	 */
	run() {
		// Defined in extension Classes
	}

	/**
	 * The init method to be optionaly overwritten in actual monitor pieces
	 * @abstract
	 * @returns {Promise<void>}
	 */
	async init() {
		// Optionally defined in extension Classes
	}

}

module.exports = Monitor;

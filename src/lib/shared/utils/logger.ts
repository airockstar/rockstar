import { parseTime } from "@utils/dateUtils";

type ILevelOptions = {
	[Prop in LogLevel]?: LevelOptions;
};

interface LogPrefix {
	color: string;
	margin?: string;
}

interface LevelOptions {
	color?: string;
	prefix?: LogPrefix | false;
	underline?: boolean;
	spaced?: boolean;
}

interface LogOptions extends ILevelOptions {
	date: boolean;
}

type LogLevel = keyof typeof logLevels;

const logLevels = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3
};

const logOptions: LogOptions = {
	date: false,
	debug: {
		color: "magenta",
		spaced: true,
		prefix: {
			color: "magenta"
		}
	},
	info: {
		color: "blue",
		prefix: {
			color: "blue"
		},
	},
	error: {
		color: "red",
		prefix: {
			color: "red"
		}
	},
	warn: {
		color: "orange",
		prefix: {
			color: "orange"
		}
	}
};

class Logger {
	private level: LogLevel;
	date: boolean;
	formattedDate: boolean;
	options: LogOptions;
	filename: string;

	constructor(filename: string, maxLevel: LogLevel = "debug", formattedDate: boolean, options: LogOptions = logOptions) {
		this.filename = filename || "";
		if (this.filename) {
			let arr = this.filename.split("/");
			while (arr.length > 4) {
				arr.shift();
			}
			this.filename = arr.join('/');
		}
		this.filename = this.filename.split("?")[0];
		this.date = options.date;
		this.level = maxLevel;
		this.formattedDate = formattedDate;
		this.options = options;
	}

	/**
	 * Check if the level is allowed to be logged ti the console.
	 *
	 * @param {number} logLevel The numerical log level value
	 * @returns {boolean} If the level is above the minimum logging level
	 */
	private levelSilenced(logLevel: number): boolean {
		return logLevel < logLevels[this.level];
	}

	/**
	 * Adds a prefix to logged messages
	 *
	 * @param {LogLevel} level log level to be prefixed
	 * @returns {string} Prefix string attached to the log level
	 */
	private prefix(level: LogLevel): string {
		return `%c${level == "error" ? "[" + level.toUpperCase() + "]" : ""}%c ${this.formattedDate ? " [" + parseTime(new Date()) + "]" : ""} ${this.filename}: `;
	}

	/**
	 * Formats the style paramters based on the log's config
	 *
	 * @param {LogLevel} level log level to be prefixed
	 * @param {LevelOptions} options Custom logging options
	 * @returns {unknown[]} Array of options to be attached to the console
	 */
	private formatStyle(level: LogLevel, options?: LevelOptions): unknown[] {
		const defaultOptions = !options ? this.options[level] : { ...this.options[level], ...options };
		const optionsString = [];
		let argCount = 0;

		if (defaultOptions.prefix instanceof Object) {
			optionsString[argCount++] = `color: ${defaultOptions.prefix.color};`;
		}
		optionsString[argCount] = `padding: 1px 0;`;
		if (defaultOptions.underline)
			optionsString[argCount] = `border-bottom: 1px solid white; padding: 2px 0; margin: 10px 3px;`;
		if (defaultOptions.color) optionsString[argCount] += `color: ${defaultOptions.color};`;
		if (defaultOptions.spaced) optionsString[argCount] += `margin: 10px 0;`;

		return optionsString;
	}

	/**
	 * Formats the string message to allow for Object types
	 *
	 * @param {unknown[]} message Array of messages. Can be any type
	 * @param level
	 * @returns
	 */
	private constructMessage(message: unknown[], level: LogLevel, enterExit: string): { message: unknown[]; objects: unknown[] } {
		const objects = [];
		message = [logOptions[level].prefix ? `${this.prefix(level)}` : "%c", ...message];

		if (message.length > 1) {
			message[1] += "()";
		}
		if (enterExit) {
			message = [enterExit, ...message];
		}

		return {
			message: message.map((message, i) => {
				if (message instanceof Object) {
					objects.push(message);
					message = "\n%o";
				}
				if (i > 0) message = message + " ";
				return message;
			}),
			objects
		};
	}

	format(options: LevelOptions, message: string) {
		console.info(`%c[INFO] %c${message}`, `color: #33CE33`, this.formatStyle("info", options));
	}

	log(level: LogLevel, message: unknown[], options?: LogOptions) {
		if (this.levelSilenced(logLevels[level])) return;

		const messageConstruct = this.constructMessage(message, level, options);

		console.info(messageConstruct.message.join(""), ...this.formatStyle(level), ...messageConstruct.objects);
	}

	debug(...message: unknown[]) {
		return this.log("debug", message);
	}

	info(...message: unknown[]) {
		return this.log("info", message);
	}

	warn(...message: unknown[]) {
		return this.log("warn", message);
	}

	error(...message: unknown[]) {
		return this.log("error", message);
	}

	enter(...message: unknown[]) {
		return this.log("info", message, "ENTER");
	}

	exit(...message: unknown[]) {
		return this.log("info", message, "EXIT");
	}
}

export function getLogger(location, showTimestamp, level) {
	return new Logger(location, showTimestamp, level);
}


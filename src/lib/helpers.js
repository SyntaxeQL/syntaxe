// define patterns
export const patterns = {
	general: {
		newLine 				: /(\\n|\n)/,
		opList 					: /\](\s*)\[/,
		operation 			: /\[|\]/,
		quotes 					: /(\`|\"|\')|(\`|\"|\')/,
		raws						: / {2,}/,
		ws							: / /,
		nonTimeXter			: /[^\d:]/,
		nonDigit				: /[^\d]/,
		nonDecimal			: /[^\d\.]/,
		nonAlphabet			: /[^a-z]/,
		nonSign 				: /[^-\+]/,
		omission 				: /\?/
	},
	operations: {
		propertyOp 			: /(((\w+)(\s*)(\??))((\s*)\[(\s*)(\w+)(\s*)(:*)(\s*)(\'([\w\+\s\(\):]*|\s{1,})\'|\"([\w\+\s\(\):]*|\s{1,})\"|(\[[\"\w\+\s\(\):\",]+\])|(\"[-\d\w\s]+\")|(\[(\s*)\/(\^?)(\w+)(\$?)\/(\w*)(\,(\s*)\/(\^?)(\w+)(\$?)\/(\w*))*(\s*)\])|(\[(\s*)\"[\w\/]*\"(\,(\s*)\"[\w\/]*\")+(\s*)\](\s*))|(\w+)|((\/)(\S+)(\/)(\w*)(\s*))|(\S+))\])+)/,
		objectOp 				: /(((\})(\s*))((\s*)\[(\w+)(\s*)(:*)(\s*)((\[[\"\w\+\s\(\):\",]+\])|\"(\w+)\"|(\w+)|((\+|\-){1}\w+))\])+)/,
	},
	schema: {
		commaAndSpace  	: /(,)|(\s{2,})/,
		objectProperty 	: /(((\w+)(\-|\.)*(\w+)(\??))|(\*instr-p:((\w+)(\-|\.)*(\w+)))|(\*instr-o:id_(\w+)))/,
		spaceAndBrace 	: /(" ")|((" |")\{)|((" |")\})/,
		braceAndSpace 	: /\}( "|")/
	}
};

// month map
export const monthMap = new Map([
	[0, ['january', 'jan']], [1, ['february', 'feb']], [2, ['march', 'mar']],
	[3, ['april', 'apr']], [4, ['may', 'may']], [5, ['june', 'jun']],
	[6, ['july', 'jul']], [7, ['august', 'aug']], [8, ['september', 'sep']],
	[9, ['october', 'oct']], [10, ['november', 'nov']], [11, ['december', 'dec']]
]);

// day map
export const dayMap = new Map([
	[1, ['monday', 'mon']], [2, ['tuesday', 'tue']], [3, ['wednesday', 'wed']],
	[4, ['thursday', 'thu', 'thur']], [5, ['friday', 'fri']], [6, ['saturday', 'sat']], 
	[0, ['sunday', 'sun']]
]);

// time duration array
export const timeDuration = [
	'se', 'second', 'seconds',
	'mi', 'minute', 'minutes',
	'hr', 'hour', 	'hours',
	'dy', 'day', 		'days',
	'wk', 'week', 	'weeks',
	'mo', 'month', 	'months',
	'yr', 'year', 	'years',
];

// time ticks map
export const timeTicksMap = new Map([
	['sec', 1000],
	['min', 1000 * 60],
	['hou', 1000 * 60 * 60],
	['day', 1000 * 60 * 60 * 24],
	['wee', 1000 * 60 * 60 * 24 * 7],
	['mon', 1000 * 60 * 60 * 24 * 31],
	['yea', 1000 * 60 * 60 * 24 * 31 * 12]
]);

// time duration map
export const timeDurationMap = new Map([
	['se', timeTicksMap.get('sec')], ['second', timeTicksMap.get('sec')], ['seconds', timeTicksMap.get('sec')],
	['mi', timeTicksMap.get('min')], ['minute', timeTicksMap.get('min')], ['minutes', timeTicksMap.get('min')],
	['hr', timeTicksMap.get('hou')], ['hour', timeTicksMap.get('hou')], ['hours', timeTicksMap.get('hou')],
	['dy', timeTicksMap.get('day')], ['day', timeTicksMap.get('day')], ['days', timeTicksMap.get('day')],
	['wk', timeTicksMap.get('wee')], ['week', timeTicksMap.get('wee')], ['weeks', timeTicksMap.get('wee')],
	['mo', timeTicksMap.get('mon')], ['month', timeTicksMap.get('mon')], ['months', timeTicksMap.get('mon')],
	['yr', timeTicksMap.get('yea')], ['year', timeTicksMap.get('yea')], ['years', timeTicksMap.get('yea')]
]);
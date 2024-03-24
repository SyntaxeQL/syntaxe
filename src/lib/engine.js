// define patterns
const patterns = {
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
		nonSign 				: /[^-\+]/
	},
	operations: {
		propertyOp 			: /(((\w+)(\s*))((\s*)\[(\s*)(\w+)(\s*)(:*)(\s*)(\'([\w\+\s\(\):]*|\s{1,})\'|\"([\w\+\s\(\):]*|\s{1,})\"|(\[[\"\w\+\s\(\):\",]+\])|(\"[-\d\w\s]+\")|(\[(\s*)\/(\^?)(\w+)(\$?)\/(\w*)(\,(\s*)\/(\^?)(\w+)(\$?)\/(\w*))*(\s*)\])|(\[(\s*)\"[\w\/]*\"(\,(\s*)\"[\w\/]*\")+(\s*)\](\s*))|(\w+)|((\/)(\S+)(\/)(\w*)(\s*))|(\S+))\])+)/,
		objectOp 				: /(((\})(\s*))((\s*)\[(\w+)(\s*)(:*)(\s*)((\[[\"\w\+\s\(\):\",]+\])|\"(.+)\"|(\w+)|((\+|\-){1}\w+))\])+)/,
	},
	schema: {
		commaAndSpace  	: /(,)|(\s{2,})/,
		objectProperty 	: /(((\w+)(\-|\.)*(\w+))|(\*instr-p:((\w+)(\-|\.)*(\w+)))|(\*instr-o:id_(\w+)))/,
		spaceAndBrace 	: /(" ")|((" |")\{)|((" |")\})/,
		braceAndSpace 	: /\}( "|")/
	}
};

// define objects holder
const holder = {
	propertyOps 	: null,
	objectOps			: null,
	rootOp 				: null,
	rootKey 			: 'root',
	context 			: 'json',
	mode 					: 'and',
	condition 		: 'and',
	defaultDate		: [1991,6,1]
};

// month map
const monthMap = new Map([
	[0, ['january', 'jan']], [1, ['february', 'feb']], [2, ['march', 'mar']],
	[3, ['april', 'apr']], [4, ['may', 'may']], [5, ['june', 'jun']],
	[6, ['july', 'jul']], [7, ['august', 'aug']], [8, ['september', 'sep']],
	[9, ['october', 'oct']], [10, ['november', 'nov']], [11, ['december', 'dec']]
]);

// day map
const dayMap = new Map([
	[1, ['monday', 'mon']], [2, ['tuesday', 'tue']], [3, ['wednesday', 'wed']],
	[4, ['thursday', 'thu', 'thur']], [5, ['friday', 'fri']], [6, ['saturday', 'sat']], 
	[0, ['sunday', 'sun']]
]);

// time duration array
const timeDuration = [
	'se', 'second', 'seconds',
	'mi', 'minute', 'minutes',
	'hr', 'hour', 	'hours',
	'dy', 'day', 		'days',
	'wk', 'week', 	'weeks',
	'mo', 'month', 	'months',
	'yr', 'year', 	'years',
];

// time ticks map
const timeTicksMap = new Map([
	['sec', 1000],
	['min', 1000 * 60],
	['hou', 1000 * 60 * 60],
	['day', 1000 * 60 * 60 * 24],
	['wee', 1000 * 60 * 60 * 24 * 7],
	['mon', 1000 * 60 * 60 * 24 * 31],
	['yea', 1000 * 60 * 60 * 24 * 31 * 12]
]);

// time duration map
const timeDurationMap = new Map([
	['se', timeTicksMap.get('sec')], ['second', timeTicksMap.get('sec')], ['seconds', timeTicksMap.get('sec')],
	['mi', timeTicksMap.get('min')], ['minute', timeTicksMap.get('min')], ['minutes', timeTicksMap.get('min')],
	['hr', timeTicksMap.get('hou')], ['hour', timeTicksMap.get('hou')], ['hours', timeTicksMap.get('hou')],
	['dy', timeTicksMap.get('day')], ['day', timeTicksMap.get('day')], ['days', timeTicksMap.get('day')],
	['wk', timeTicksMap.get('wee')], ['week', timeTicksMap.get('wee')], ['weeks', timeTicksMap.get('wee')],
	['mo', timeTicksMap.get('mon')], ['month', timeTicksMap.get('mon')], ['months', timeTicksMap.get('mon')],
	['yr', timeTicksMap.get('yea')], ['year', timeTicksMap.get('yea')], ['years', timeTicksMap.get('yea')]
]);

// convert string pattern to regex
const regexify = (pattern, regexStart, regexEnd, options) =>
	new RegExp((regexStart ? '^' : '') + String(pattern).substr(1, String(pattern).length - 2) + (regexEnd ? '$' : ''), options || 'gi');

// parse date
const dateify = (...arg) => arg.length ? new Date(...arg) : new Date();

// get random string
const randomKey = (length, start, end) => Math.random().toString(length ?? 20).substring(start ?? 2, end ?? 12);

// get month index from month name
const findMonthIndex = (month) => {
	for (let item of monthMap) {
		if (item[1].includes(month.toLowerCase()))
			return item[0] + 1
	} 
	return 0
}

// get day index from day name
const findDayIndex = (day) => {
	for (let item of dayMap) {
		if (item[1].includes(day.toLowerCase()))
			return item[0] + 1
	} 
	return 0
}

// filter operations
const filterOperations = async(schema) => {
	try {
		// initialize operation maps
		holder.propertyOps = new Map();
		holder.objectOps = new Map();
		holder.rootOp = null;
		holder.context = 'json';

		let operationsString;

		// check schema context
		String(schema).trim().startsWith('[')
			? ((holder.context = 'root') && (schema = `{ rootPropertyIdentifier }${schema}`))
			: true;

		// extract possible operations from schema
		const filtered = String(schema)
		    .replace(regexify(patterns.general.newLine), '')
		    .replace(regexify(patterns.operations.propertyOp), (_, __) => {
		    	// detect property operations
	        let indexOfDelimiter = _.split('').indexOf('['),
	        		prop = _.substring(0, indexOfDelimiter),
	        		instrs = _.substring(indexOfDelimiter).replace(regexify(patterns.general.opList), ']*^*[').split('*^*'),
	        		name = `*instr-p:id_${randomKey()}`,
	        		operations = instrs.map(i => String(i).replace(regexify(patterns.general.operation, true, true), ''));

      		// get operations string
      		operationsString = JSON.stringify(operations);

      		// define conditon for operation
      		let propertyCondition = 'and';

      		// get operation condition and remove cond from operations
      		if (operationsString.match(/"cond:/)) {
      			propertyCondition = operationsString.match(/"cond:\\"or\\"/) ? 'or' : 'and';
      			operations = operations.filter(x => !x.match(/cond:/));
      		}

      		// pass property name and operations into holder
      		holder.propertyOps.set(name, {
      			property: prop.trim(),
      			operation: operations,
      			condition: propertyCondition
      		});

	        return `${name}`;
		    })
		    .replace(regexify(patterns.operations.objectOp, null, true), (_, __) => {
		    	// detect root object operations
	        let indexOfDelimiter = _.split('').indexOf('['),
	        		instrs = _.substring(indexOfDelimiter).replace(regexify(patterns.general.opList), ']*^*[').split('*^*'),
	        		operations = instrs.map(i => String(i).replace(regexify(patterns.general.operation, true, true), ''));

      		// get operations string
      		operationsString = JSON.stringify(operations);

      		// get operation condition
      		holder.condition = operationsString.match(/"cond:/) && operationsString.match(/"cond:\\"or\\"/) ? 'or' : 'and';
      		holder.mode = operationsString.match(/"mode:/) && operationsString.match(/"mode:\\"or\\"/) ? 'or' : 'and';

      		// remove mode and condition
      		operations = operations.filter(x => !x.match(/mode:/) && !x.match(/cond:/));

      		// get root operations
	        holder.rootOp = operations;
	        return `}`;
		    })
		    .replace(regexify(patterns.operations.objectOp), (_, __) => {
		    	// detect inner object operations
	        let indexOfDelimiter = _.split('').indexOf('['),
	        		instrs = _.substring(indexOfDelimiter).replace(regexify(patterns.general.opList), ']*^*[').split('*^*'),
	        		name = `*instr-o:id_${randomKey()}`,
	        		operations = instrs.map(i => String(i).replace(regexify(patterns.general.operation, true, true), ''));

      		// get operations string	
      		operationsString = JSON.stringify(operations);

	    		// define conditon for operation
	    		let propertyCondition = 'and',
	    				propertyMode = 'and';

	    		// get operation condition and remove condition from operations
	    		if (operationsString.match(/"cond:/)) {
	    			propertyCondition = operationsString.match(/"cond:\\"or\\"/) ? 'or' : 'and';
	    			operations = operations.filter(x => !x.match(/cond:/));
	    		}

	    		// get operation mode and remove mode from operations
	    		if (operationsString.match(/"mode:/)) {
	    			propertyMode = operationsString.match(/"mode:\\"or\\"/) ? 'or' : 'and';
	    			operations = operations.filter(x => !x.match(/mode:/));
	    		}

      		// get object operations
	        holder.objectOps.set(name, {
	        	operation: operations,
	        	mode: propertyMode,
	        	condition: propertyCondition
	        });

	        return `} ${name}`;
		    })

		return filtered;
	} catch(err) {
		return schema;
	}
}

// filter the schema
const filterSchema = async(schema) => {
	try {
		// filter operations
		let filtered = await filterOperations(schema);

		// prepare schema for json
		const resolve = String(filtered)
			.replace(regexify(patterns.general.newLine), '')
			.replace(regexify(patterns.schema.commaAndSpace), ' ')
			.replace(regexify(patterns.schema.objectProperty), (_, match) => `"${match}"`)
			.replace(regexify(patterns.schema.spaceAndBrace), (_, __) => {
			return {
				'" "': '":1, "',
				'" {': '": {',
				'"{': '": {',
				'" }': '":1 }',
				'"}': '":1 }'
			}[_] || ''
			})
			.replace(regexify(patterns.schema.braceAndSpace), '}, "');
			
	  	return { status: true, schema: JSON.parse(resolve) };
	} catch(err) {
		return { status: false };
	}
}

// clean up and extract data
const laundry = async({ data, status, schema }) => {
	// check if no schema
	if (!schema) return undefined;
	// only work for data that can be jsonified
	try {
		// convert data to json
		const subject = (typeof data == 'string') 
			? (holder.context != 'root' ? JSON.parse(data) : data) 
			: data;
		
		// process the schema and subject
		let result = (holder.context == 'json') 
			? (await sweep({ schema, subject })).result
			: subject;

		// check if root operations available
		if (holder.rootOp) {
			// pass new random name
			const name = `*instr-p:id_${randomKey()}`;

  		// pass property name and operations into holder
  		holder.propertyOps.set(name, {
  			property: holder.rootKey,
  			operation: holder.rootOp,
  			condition: holder.condition
  		});

  		// compute status
			let operationStatus = await sweep({ schema: { [name]: 1 }, subject: { [holder.rootKey]: result } })
			result = operationStatus.schemaPass 
				? operationStatus.result[holder.rootKey]
				: operationStatus.result[holder.rootKey] instanceof Array ? [] : Object.create(null);
		}
		return result;
	} catch(err) {
		console.error(new Date(), err, schema)
		return null
	}
}

// sweep through and extract data
const sweep = async({ schema, subject, mode }) => {
	// define result as an object and property pass
	let result = {}, schemaPass = true, schemaPassSet = new Set([]), filtered = null;

	// check if array or object
	if (Array.isArray(subject)) {
		// change result to array
		result = [];
		// loop through array of data
		for (let item of subject) {
			let line = await sweep({ schema: schema, subject: item, mode });
			line.schemaPass && result.push(line.result);
		}
	} else {
		// define schema properties and counter
		let properties = Object.keys(schema), keyCounter = -1;

		// loop through schema
		for (let key of properties) {
			// increase counter
			++keyCounter;

			// define property pass and set
			let keyPass = true, keyPassSet = new Set([]), propertyInfo = null;

			// check if property has operation(s)
			if (holder.propertyOps.has(key)) {
				// get property info
				propertyInfo = holder.propertyOps.get(key);
				// get value of property
				let value = subject[propertyInfo.property];

				// check if property exists in normal schema
				if(subject.hasOwnProperty(propertyInfo.property)) {		
					// loop through operations
					for (let ndex = 0; ndex < propertyInfo.operation.length; ndex++) {
						// get current operation
						let o = propertyInfo.operation[ndex];

						// split characters
						let xters = o.split(''), firstColonIndex = xters.indexOf(':');
						// get left and right side
						let [ls, rs] = [o.substr(0, firstColonIndex), o.substr(++firstColonIndex)], operationObject = {};
						// ensure left side always has operation
						ls = ls || rs;
						// filter value if right side is valie
						rs && (filtered = String(rs).replace(regexify(patterns.general.quotes, true, true), '') || '');

						// define haystack
						let haystack = (["in", "nin", "ini", "nini", "sin", "snin", "dtin", "dtnin", "dtinrange", "dtninrange", "dtmin", "dtmnin", "dtminrange", "dtmninrange",
														"yin", "ynin", "min", "mnin", "minrange", "mninrange", "din", "dnin", "dinrange", "dninrange", "dwin", "dwnin", "dwinrange", "dwninrange",
														"hin", "hnin", "hinrange", "hninrange", "minin", "minnin", "mininrange", "minninrange",
														"tin", "tnin", "tinrange", "tninrange", "agoin", "btw"].includes(ls))
							? String(filtered).replace(regexify(patterns.general.operation, true, true), '')
								.split(',')
								.map(w => {
									const trimmedEntity = String(w).trim().replace(regexify(patterns.general.quotes, true, true), '');
									return ["sin", "snin", "yin", "ynin", "btw"].includes(ls) ? Number(trimmedEntity) : trimmedEntity;
								})
							: [];

						// check the left side
						switch (ls) {
							case 'as': // substitute property name
								propertyInfo.alias = filtered;
								break;
							case 'rew': // remove all whitespace
								filtered = (filtered == ls) ? '' : filtered;
								value = String(value).replace(regexify(patterns.general.raws), filtered || '');
								break;
							case 'rw': // remove whitespace
								filtered = (filtered == ls) ? '' : filtered;
								value = String(value).replace(regexify(patterns.general.ws), filtered || '');
								break;
							case 'eq': // equal to
								keyPass = (String(value) === filtered);
								break;
							case 'eqi': // equal to / case insensitive
								keyPass = (String(value).toLowerCase() === filtered.toLowerCase());
								break;
							case 'ne': // not equal to
								keyPass = (String(value) !== filtered);
								break;
							case 'nei': // not equal to / case insensitive
								keyPass = (String(value).toLowerCase() !== filtered.toLowerCase());
								break;
							case 'gt': // greater than
								keyPass = (Number(value) > Number(filtered));
								break;
							case 'gte': // greater than or equal to
								keyPass = (Number(value) >= Number(filtered));
								break;
							case 'lt': // less than
								keyPass = (Number(value) < Number(filtered));
								break;
							case 'lte': // less than or equal to
								keyPass = (Number(value) <= Number(filtered));
								break;
							case 'nn': // not null
								keyPass = (![null, undefined, ""].includes(value));
								break;
							case 'in': // in array
								keyPass = Array.isArray(value)
									? value.some(v => haystack.some(x => (x == v || x === v))) : haystack.some(x => (x == value || x === value));
								break;
							case 'nin': // not in
								keyPass = Array.isArray(value)
									? value.every(v => !(haystack.some(x => (x == v || x === v)))) : !(haystack.some(x => (x == value || x === value)));
								break;
							case 'ini': 	// in array / case insensitive
							case 'nini': 	// not in / case insensitive
								haystack = haystack.join(',').toLowerCase().split(',');
								operationObject.status = Array.isArray(value)
									? value.some(v => Array.from(haystack).includes(String(v).toLowerCase())) : Array.from(haystack).includes(String(value).toLowerCase());
								keyPass = (ls == 'ini') ? operationObject.status : !operationObject.status;
								break;
							case 'regex': 	// matches
							case 'regexne': // does not match
								// get regex pattern and possible options
								operationObject.regexPattern = filtered.trim().substring(1).split('/');
								operationObject.status = (new RegExp(operationObject.regexPattern[0], operationObject.regexPattern[1])).test(value);
								keyPass = (ls == 'regex') ? operationObject.status : !operationObject.status;
								break;
							case 'regexin': 	// matches a pattern in array
							case 'regexnin': 	// does not match a pattern in array
								// get regex cluster
								operationObject.regexCluster = filtered.replace(regexify(patterns.general.operation, true, true), '').split(',');
								// loop through regex patterns and match
								keyPass = operationObject.regexCluster.some(p => {
									// get regex pattern and possible options
									operationObject.regexPattern = p.trim().substring(1).split('/');
									// attempt match
									operationObject.status = Array.isArray(value)
										? value.some(v => (new RegExp(operationObject.regexPattern[0], operationObject.regexPattern[1])).test(v)) : (new RegExp(operationObject.regexPattern[0], operationObject.regexPattern[1])).test(value);

									return (ls == 'regexin') ? operationObject.status : !operationObject.status;
								});
								break;
							case 'size': // return size
								value = (value instanceof Array) || (typeof value == 'string')
									? value.length 
									: (typeof value == 'object')
										? Object.keys(value).length : value;
								break;
							case 'seq': // check if size equal
								keyPass = value.length == Number(filtered);
								break;
							case 'sne': // check if size / not equal
								keyPass = value.length != Number(filtered);
								break;
							case 'sgt': // check if size is greater than
								keyPass = value.length > Number(filtered);
								break;
							case 'slt': // check if size is less than
								keyPass = value.length < Number(filtered);
								break;
							case 'sgte': // check if size is greater than or equal to
								keyPass = value.length >= Number(filtered);
								break;
							case 'slte': // check if size is less than or equal to
								keyPass = value.length <= Number(filtered);
								break;
							case 'sin': // check if size is in range
							case 'snin': // check if size is not in range
								// get min and max
								let [min, max] = [Math.min(...Array.from(haystack)), Math.max(...Array.from(haystack))];
								operationObject.status = (value.length >= min) && (value.length <= max);
								keyPass = (ls == 'sin') ? operationObject.status : !operationObject.status;
								break;
							case 'dteq': // check if date equal
							case 'dtne': // check if date / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value).toLocaleDateString(), dateify(filtered).toLocaleDateString()];
								operationObject.status = ((operationObject.valueDate != 'Invalid Date') && (operationObject.valueDate == operationObject.filteredDate));
								keyPass = (ls == 'dteq') ? operationObject.status : !operationObject.status;
								break;
							case 'dtgt': // check if date is greater than
							case 'dtlt': // check if date is less than
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(dateify(value).toLocaleDateString()), dateify(dateify(filtered).toLocaleDateString())];
								keyPass = (![String(operationObject.valueDate), String(operationObject.filteredDate)].includes('Invalid Date')) 
									&& ((ls == 'dtgt') ? operationObject.valueDate > operationObject.filteredDate : operationObject.valueDate < operationObject.filteredDate);
								break;
							case 'dtgte': // check if date is greater than or equal to
							case 'dtlte': // check if date is less than or equal to
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), dateify(filtered)];
								keyPass = (![String(operationObject.valueDate), String(operationObject.filteredDate)].includes('Invalid Date')) 
									&& (((ls == 'dtgte') ? (operationObject.valueDate > operationObject.filteredDate) : (operationObject.valueDate < operationObject.filteredDate)) 
											|| (operationObject.valueDate.toLocaleDateString() == operationObject.filteredDate.toLocaleDateString()));
								break;
							case 'dtin': // check if date is in list
							case 'dtnin': // check if date is not in list
								operationObject.valueDate = dateify(value).toLocaleDateString();
								operationObject.haystack = haystack;
								operationObject.status = operationObject.haystack.some(dt => {
									const lineDate = dateify(dt).toLocaleDateString();
									return ((lineDate != 'Invalid Date') && (operationObject.valueDate == lineDate));
								});
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'dtin') ? operationObject.status : !operationObject.status);
								break;
							case 'dtinrange': // check if date is in range
							case 'dtninrange': // check if date is not in range
								operationObject.valueDate = dateify(dateify(value).toLocaleDateString());
								operationObject.haystack = { min: dateify(dateify(haystack[0]).toLocaleDateString()), max: (haystack.length == 2 ? dateify(dateify(haystack[1]).toLocaleDateString()) : dateify().toLocaleDateString()) }; 
								operationObject.status = ((operationObject.valueDate > operationObject.haystack.min) || (operationObject.valueDate.toLocaleDateString() == operationObject.haystack.min.toLocaleDateString())) 
									&& ((operationObject.valueDate < operationObject.haystack.max) || (operationObject.valueDate.toLocaleDateString() == operationObject.haystack.max.toLocaleDateString()));
								keyPass = (![String(operationObject.valueDate), String(operationObject.haystack.min), String(operationObject.haystack.max)].includes('Invalid Date')) 
									&& ((ls == 'dtinrange') ? operationObject.status : !operationObject.status);
								break;
							case 'dtmeq': // check if datetime equal
							case 'dtmne': // check if datetime / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), dateify(filtered)];
								operationObject.status = ((String(operationObject.valueDate) != 'Invalid Date') && (String(operationObject.valueDate) == String(operationObject.filteredDate)));
								keyPass = (ls == 'dtmeq') ? operationObject.status : !operationObject.status;
								break;
							case 'dtmgt': // check if datetime is greater than
							case 'dtmlt': // check if datetime  is less than
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), dateify(filtered)];
								keyPass = (![String(operationObject.valueDate), String(operationObject.filteredDate)].includes('Invalid Date')) 
									&& ((ls == 'dtmgt') ? operationObject.valueDate > operationObject.filteredDate : operationObject.valueDate < operationObject.filteredDate);
								break;
							case 'dtmgte': // check if datetime is greater than or equal to
							case 'dtmlte': // check if datetime is less than or equal to
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), dateify(filtered)];
								keyPass = (![String(operationObject.valueDate), String(operationObject.filteredDate)].includes('Invalid Date')) 
									&& (((ls == 'dtmgte') ? (operationObject.valueDate > operationObject.filteredDate) : (operationObject.valueDate < operationObject.filteredDate)) 
											|| (String(operationObject.valueDate) == String(operationObject.filteredDate)));
								break;
							case 'dtmin': // check if datetime is in list
							case 'dtmnin': // check if datetime is not in list
								operationObject.valueDate = dateify(value);
								operationObject.haystack = haystack;
								operationObject.status = operationObject.haystack.some(dtm => {
									const lineDateTime = dateify(dtm)
									return ((lineDateTime != 'Invalid Date') && (String(operationObject.valueDate) == String(lineDateTime)));
								});
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))  
									&& ((ls == 'dtmin') ? operationObject.status : !operationObject.status);
								break;
							case 'dtminrange': // check if datetime is in range
							case 'dtmninrange': // check if datetime is not in range
								operationObject.valueDate = dateify(value);
								operationObject.haystack = { min: dateify(haystack[0]), max: dateify(haystack[1]) };
								operationObject.status = ((operationObject.valueDate > operationObject.haystack.min) || (String(operationObject.valueDate) == String(operationObject.haystack.min))) 
									&& ((operationObject.valueDate < operationObject.haystack.max) || (String(operationObject.valueDate) == String(operationObject.haystack.max)));
								keyPass = (![String(operationObject.valueDate), String(operationObject.haystack.min), String(operationObject.haystack.max)].includes('Invalid Date'))  
									&& ((ls == 'dtminrange') ? operationObject.status : !operationObject.status);
								break;
							case 'yeq': // check if date year equal
							case 'yne': // check if date year / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (String(operationObject.valueDate.getFullYear()) == String(operationObject.filteredDate)));
								keyPass = (ls == 'yeq') ? operationObject.status : !operationObject.status;
								break;
							case 'ygt': // check if date year is greater than
							case 'ylt': // check if date year is less than
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((ls == 'ygt') 
											? Number(operationObject.valueDate.getFullYear()) > Number(operationObject.filteredDate) 
											: Number(operationObject.valueDate.getFullYear()) < Number(operationObject.filteredDate));
								break;
							case 'ygte': // check if date year is greater than or equal to
							case 'ylte': // check if date year is less than or equal to
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((ls == 'ygte') 
											? (Number(operationObject.valueDate.getFullYear()) >= Number(operationObject.filteredDate)) 
											: (Number(operationObject.valueDate.getFullYear()) <= Number(operationObject.filteredDate)));
								break;
							case 'yin': // check if date year is in range
							case 'ynin': // check if date year is not in range
								operationObject.valueDate = dateify(value);
								operationObject.haystack = { min: haystack[0], max: haystack[1] };
								operationObject.status = (Number(operationObject.valueDate.getFullYear()) >= Number(operationObject.haystack.min)) 
									&& (Number(operationObject.valueDate.getFullYear()) <= Number(operationObject.haystack.max));
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'yin') ? operationObject.status : !operationObject.status);
								break;
							case 'meq': // check if date month equal
							case 'mne': // check if date month / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.monthFilter = (operationObject.valueDate.getMonth() || 0) + 1;
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((isNaN(operationObject.filteredDate) && (Array.from(monthMap.get(operationObject.valueDate.getMonth())).includes(String(operationObject.filteredDate).toLowerCase()))) 
											|| (!isNaN(operationObject.filteredDate) && (String(operationObject.monthFilter) == String(Number(operationObject.filteredDate))))));
								keyPass = (ls == 'meq') ? operationObject.status : !operationObject.status;
								break;
							case 'mgt': // check if date month is greater than
							case 'mlt': // check if date month is less than
								operationObject.valueDate = dateify(value);
								operationObject.monthFilter = (operationObject.valueDate.getMonth() || 0) + 1;
								operationObject.filteredDate = isNaN(filtered)
									? findMonthIndex(filtered) : filtered;
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (Number(operationObject.filteredDate) >= 1 && Number(operationObject.filteredDate) <= 12)
									&& ((ls == 'mgt') 
											? Number(operationObject.monthFilter) > Number(operationObject.filteredDate) 
											: Number(operationObject.monthFilter) < Number(operationObject.filteredDate));
								break;
							case 'mgte': // check if date month is greater than or equal to
							case 'mlte': // check if date month is less than or equal to
								operationObject.valueDate = dateify(value);
								operationObject.monthFilter = (operationObject.valueDate.getMonth() || 0) + 1;
								operationObject.filteredDate = isNaN(filtered)
									? findMonthIndex(filtered) : filtered;
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (Number(operationObject.filteredDate) >= 1 && Number(operationObject.filteredDate) <= 12)
									&& ((ls == 'mgte') 
											? (Number(operationObject.monthFilter) >= Number(operationObject.filteredDate)) 
											: (Number(operationObject.monthFilter) <= Number(operationObject.filteredDate)));
								break;
							case 'min': // check if date month is in array
							case 'mnin': // check if date month is not in array
								operationObject.valueDate = dateify(value);
								operationObject.monthFilter = (operationObject.valueDate.getMonth() || 0) + 1;
								operationObject.haystack = haystack;
								operationObject.status = operationObject.haystack.some(m => {
									const monthEntry = isNaN(m) ? findMonthIndex(m) : m;
									return (String(operationObject.monthFilter) == String(Number(monthEntry)))
								});
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'min') ? operationObject.status : !operationObject.status);
								break;
							case 'minrange': // check if date month is in range
							case 'mninrange': // check if date month is not in range
								operationObject.valueDate = dateify(value);
								operationObject.monthFilter = (operationObject.valueDate.getMonth() || 0) + 1;
								operationObject.isNaN = haystack.some(m => isNaN(m));
								operationObject.haystack = !operationObject.isNaN 
									? [haystack[0], haystack[1]] 
									: haystack.map(mv => (isNaN(mv) ? findMonthIndex(mv) : mv));
								operationObject.haystack = { 
									min: Math.min(operationObject.haystack[0], operationObject.haystack[1]), 
									max: Math.max(operationObject.haystack[0], operationObject.haystack[1])
								};
								operationObject.status = ((Number(operationObject.haystack.min) >= 1 && Number(operationObject.haystack.max) <= 12) 
									&& ((Number(operationObject.monthFilter) >= Number(operationObject.haystack.min)) 
									&& (Number(operationObject.monthFilter) <= Number(operationObject.haystack.max))));
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'minrange') ? operationObject.status : !operationObject.status);
								break;
							case 'today': // check if date is today
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), dateify()];
								keyPass = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (operationObject.valueDate.toLocaleDateString() == operationObject.filteredDate.toLocaleDateString()));
								break;
							case 'deq': // check if date day equal
							case 'dne': // check if date day / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (!isNaN(operationObject.filteredDate) && (String(operationObject.valueDate.getDate()) == String(Number(operationObject.filteredDate)))));
								keyPass = (ls == 'deq') ? operationObject.status : !operationObject.status;
								break;
							case 'dgt': // check if date day is greater than
							case 'dlt': // check if date day is less than
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((ls == 'dgt') 
											? Number(operationObject.valueDate.getDate()) > Number(operationObject.filteredDate) 
											: Number(operationObject.valueDate.getDate()) < Number(operationObject.filteredDate));
								break;
							case 'dgte': // check if date day is greater than or equal to
							case 'dlte': // check if date day is less than or equal to
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((ls == 'dgte') 
											? (Number(operationObject.valueDate.getDate()) >= Number(operationObject.filteredDate)) 
											: (Number(operationObject.valueDate.getDate()) <= Number(operationObject.filteredDate)));
								break;
							case 'din': // check if date day is in array
							case 'dnin': // check if date day is not in array
								operationObject.valueDate = dateify(value);
								operationObject.haystack = haystack;
								operationObject.status = operationObject.haystack.some(d => (String(Number(operationObject.valueDate.getDate())) == String(Number(d))));
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'din') ? operationObject.status : !operationObject.status);
								break;
							case 'dinrange': // check if date day is in range
							case 'dninrange': // check if date day is not in range
								operationObject.valueDate = dateify(value);
								operationObject.haystack = { 
									min: Math.min(haystack[0], haystack[1]), 
									max: Math.max(haystack[0], haystack[1])
								};
								operationObject.status = ((Number(operationObject.haystack.min) >= 1 && Number(operationObject.haystack.max) <= 31) 
									&& ((Number(operationObject.valueDate.getDate()) >= Number(operationObject.haystack.min)) 
									&& (Number(operationObject.valueDate.getDate()) <= Number(operationObject.haystack.max))));
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'dinrange') ? operationObject.status : !operationObject.status);
								break;
							case 'dweq': // check if week day equal
							case 'dwne': // check if week day / not equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.dayFilter = (operationObject.valueDate.getDay() || 0) + 1;
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((isNaN(operationObject.filteredDate) && (Array.from(dayMap.get(operationObject.valueDate.getDay())).includes(String(operationObject.filteredDate).toLowerCase()))) 
											|| (!isNaN(operationObject.filteredDate) && (String(operationObject.dayFilter) == String(Number(operationObject.filteredDate))))));
								keyPass = (ls == 'dweq') ? operationObject.status : !operationObject.status;
								break;
							case 'dwgt': // check if week day is greater than
							case 'dwlt': // check if week day is less than
								operationObject.valueDate = dateify(value);
								operationObject.dayFilter = (operationObject.valueDate.getDay() || 0) + 1;
								operationObject.filteredDate = isNaN(filtered)
									? findDayIndex(filtered) : filtered;
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (Number(operationObject.filteredDate) >= 1 && Number(operationObject.filteredDate) <= 7)
									&& ((ls == 'dwgt') 
											? Number(operationObject.dayFilter) > Number(operationObject.filteredDate) 
											: Number(operationObject.dayFilter) < Number(operationObject.filteredDate));
								break;
							case 'dwgte': // check if week day is greater than or equal to
							case 'dwlte': // check if week day is less than or equal to
								operationObject.valueDate = dateify(value);
								operationObject.dayFilter = (operationObject.valueDate.getDay() || 0) + 1;
								operationObject.filteredDate = isNaN(filtered)
									? findDayIndex(filtered) : filtered;
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (Number(operationObject.filteredDate) >= 1 && Number(operationObject.filteredDate) <= 7)
									&& ((ls == 'dwgte') 
											? Number(operationObject.dayFilter) >= Number(operationObject.filteredDate) 
											: Number(operationObject.dayFilter) <= Number(operationObject.filteredDate));
								break;
							case 'dwin': // check if week day is in array
							case 'dwnin': // check if week day is not in array
								operationObject.valueDate = dateify(value);
								operationObject.dayFilter = (operationObject.valueDate.getDay() || 0) + 1;
								operationObject.haystack = haystack;
								operationObject.status = operationObject.haystack.some(d => {
									const dayEntry = isNaN(d) ? findDayIndex(d) : d;
									return (String(operationObject.dayFilter) == String(Number(dayEntry)))
								});
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'dwin') ? operationObject.status : !operationObject.status);
								break;
							case 'dwinrange': // check if week day is in range
							case 'dwninrange': // check if week day is not in range
								operationObject.valueDate = dateify(value);
								operationObject.dayFilter = (operationObject.valueDate.getDay() || 0) + 1;
								operationObject.isNaN = haystack.some(d => isNaN(d));
								operationObject.haystack = !operationObject.isNaN 
									? [haystack[0], haystack[1]] 
									: haystack.map(wd => (isNaN(wd) ? findDayIndex(wd) : wd));
								operationObject.haystack = { 
									min: Math.min(operationObject.haystack[0], operationObject.haystack[1]), 
									max: Math.max(operationObject.haystack[0], operationObject.haystack[1])
								};
								operationObject.status = ((Number(operationObject.haystack.min) >= 1 && Number(operationObject.haystack.max) <= 7) 
									&& ((Number(operationObject.dayFilter) >= Number(operationObject.haystack.min)) 
									&& (Number(operationObject.dayFilter) <= Number(operationObject.haystack.max))));
								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) 
									&& ((ls == 'dwinrange') ? operationObject.status : !operationObject.status);
								break;
							case 'heq': // check if time hour equal
							case 'hne': // check if time hour / not equal
							case 'hgt': // check if time hour is greater than
							case 'hlt': // check if time hour is less than
							case 'hgte': // check if time hour is greater than or equal
							case 'hlte': // check if time hour is less than or equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.isNaN = isNaN(operationObject.filteredDate);
								operationObject.timeInfo = operationObject.isNaN 
									? { hour: Number(operationObject.filteredDate.replace(regexify(patterns.general.nonDigit), '')), meridiem: operationObject.filteredDate.replace(regexify(patterns.general.nonAlphabet), '') }
									: { hour: Number(operationObject.filteredDate) };
								operationObject.isNaN 
									&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem.toLowerCase() == 'pm') && (operationObject.timeInfo.hour != 12)) 
											? 12 : ((((operationObject.timeInfo.meridiem.toLowerCase() == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem.toLowerCase() == 'am')) 
												? 0 : -12));

								// check left side
								switch (ls) {
									case 'heq':
									case 'hne':
										operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
											&& (String(operationObject.valueDate.getHours()) == String(operationObject.timeInfo.hour)));
										keyPass = (ls == 'heq') ? operationObject.status : !operationObject.status;
										break;
									case 'hgt':
									case 'hlt':
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'hgt') 
												? operationObject.valueDate.getHours() > operationObject.timeInfo.hour
												: operationObject.valueDate.getHours() < operationObject.timeInfo.hour);
										break;
									default:
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'hgte') 
												? operationObject.valueDate.getHours() >= operationObject.timeInfo.hour
												: operationObject.valueDate.getHours() <= operationObject.timeInfo.hour);
										break;
								}	
								break;
							case 'hin': // check if time hour is in list
							case 'hnin': // check if time hour is not in list
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& haystack.some(h => {
										operationObject.isNaN = isNaN(h);
										operationObject.timeInfo = operationObject.isNaN 
											? { hour: Number(String(h).replace(regexify(patterns.general.nonDigit), '')), meridiem: String(h).replace(regexify(patterns.general.nonAlphabet), '') }
											: { hour: Number(h) };
										operationObject.isNaN 
											&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem.toLowerCase() == 'pm') && (operationObject.timeInfo.hour != 12)) 
													? 12 : ((((operationObject.timeInfo.meridiem.toLowerCase() == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem.toLowerCase() == 'am')) 
														? 0 : -12));
										return (String(operationObject.valueDate.getHours()) == String(operationObject.timeInfo.hour));
									}));
								keyPass = (ls == 'hin') ? operationObject.status : !operationObject.status;
								break;
							case 'hinrange': // check if time hour is in range
							case 'hninrange': // check if time hour is not in range
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.haystack = (haystack.length >= 2) ? [haystack[0], haystack[1]] : [haystack[0], haystack[0]];
								operationObject.timeInfoRange = operationObject.haystack.map(h => {
									operationObject.isNaN = isNaN(h);
									operationObject.timeInfo = operationObject.isNaN 
										? { hour: Number(String(h).replace(regexify(patterns.general.nonDigit), '')), meridiem: String(h).replace(regexify(patterns.general.nonAlphabet), '') }
										: { hour: Number(h) };
									operationObject.isNaN 
										&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem.toLowerCase() == 'pm') && (operationObject.timeInfo.hour != 12)) 
												? 12 : ((((operationObject.timeInfo.meridiem.toLowerCase() == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem.toLowerCase() == 'am')) 
													? 0 : -12));
									return operationObject.timeInfo.hour;
								})
								operationObject.haystack = [Math.min(...operationObject.timeInfoRange), Math.max(...operationObject.timeInfoRange)];
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((Number(operationObject.valueDate.getHours()) >= operationObject.haystack[0])
										&& (Number(operationObject.valueDate.getHours()) <= operationObject.haystack[1])));
								keyPass = (ls == 'hinrange') ? operationObject.status : !operationObject.status;
								break;
							case 'mineq': // check if time minute equal
							case 'minne': // check if time minute / not equal
							case 'mingt': // check if time minute is greater than
							case 'minlt': // check if time minute is less than
							case 'mingte': // check if time minute is greater than or equal
							case 'minlte': // check if time minute is less than or equal
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.minutes = operationObject.valueDate.getMinutes();

								// check left side
								switch (ls) {
									case 'mineq':
									case 'minne':
										operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
											&& (String(operationObject.minutes) == String(Number(operationObject.filteredDate))));
										keyPass = (ls == 'mineq') ? operationObject.status : !operationObject.status;
										break;
									case 'mingt':
									case 'minlt':
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'mingt') 
												? operationObject.minutes > Number(operationObject.filteredDate)
												: operationObject.minutes < Number(operationObject.filteredDate));
										break;
									default:
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'mingte') 
												? operationObject.minutes >= Number(operationObject.filteredDate)
												: operationObject.minutes <= Number(operationObject.filteredDate));
										break;
								}	
								break;
							case 'minin': // check if time minute is in list
							case 'minnin': // check if time minute is not in list
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.minutes = operationObject.valueDate.getMinutes();
								operationObject.status = (![String(operationObject.valueDate)].includes('Invalid Date'))
									&& haystack.some(h => (String(Number(h)) == String(operationObject.minutes)));
								keyPass = (ls == 'minin') ? operationObject.status : !operationObject.status;
								break;
							case 'mininrange': // check if time minute is in range
							case 'minninrange': // check if time minute is not in range
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.minutes = operationObject.valueDate.getMinutes();
								operationObject.haystack = (haystack.length >= 2) ? [haystack[0], haystack[1]] : [haystack[0], haystack[haystack.length - 1]];
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& ((operationObject.minutes >= operationObject.haystack[0])
										&& (operationObject.minutes <= operationObject.haystack[1])));
								keyPass = (ls == 'mininrange') ? operationObject.status : !operationObject.status;
								break;
							case 'teq': // check if time equal
							case 'tne': // check if time / not equal
							case 'tgt': // check if time is greater than
							case 'tlt': // check if time is less than
								// get date values
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.possibleMeridiem = operationObject.filteredDate.replace(regexify(patterns.general.nonAlphabet), '').toLowerCase();
								operationObject.hasMeridiem = ["am", "pm"].includes(operationObject.possibleMeridiem);
								operationObject.timeParts = operationObject.filteredDate.replace(regexify(patterns.general.nonTimeXter), '').split(':').map(t => Number(t));
								operationObject.timeInfo = operationObject.hasMeridiem 
									? { hour: Number(operationObject.timeParts[0]), meridiem: operationObject.possibleMeridiem }
									: { hour: Number(operationObject.timeParts[0]) };
								operationObject.hasMeridiem 
									&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem == 'pm') && (operationObject.timeInfo.hour != 12)) 
											? 12 : ((((operationObject.timeInfo.meridiem == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem == 'am')) 
												? 0 : -12));
								operationObject.timeParts[0] = operationObject.timeInfo.hour;
								operationObject.valueTimeParts = [operationObject.valueDate.getHours(), operationObject.valueDate.getMinutes(), operationObject.valueDate.getSeconds()];
								operationObject.valueDateTime = dateify(...holder.defaultDate, ...operationObject.valueTimeParts);
								operationObject.filteredDateTime = dateify(...holder.defaultDate, ...operationObject.timeParts);

								// check left side
								switch(ls) {
									case 'teq':
									case 'tne':
										operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
											&& String(operationObject.valueDateTime) == String(operationObject.filteredDateTime));
										keyPass = (ls == 'teq') ? operationObject.status : !operationObject.status;
										break;
									case 'tgt':
									case 'tlt':
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'tgt') 
													? (operationObject.valueDateTime > operationObject.filteredDateTime) 
													: (operationObject.valueDateTime < operationObject.filteredDateTime));
										break;
									case 'tgte':
									case 'tlte':
										keyPass = (![String(operationObject.valueDate)].includes('Invalid Date'))
											&& ((ls == 'tgte') 
													? (operationObject.valueDateTime >= operationObject.filteredDateTime) 
													: (operationObject.valueDateTime <= operationObject.filteredDateTime));
										break;
								}
								break;
							case 'tin': // check if time is in list
							case 'tnin': // check if time is not in list
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.valueTimeParts = [operationObject.valueDate.getHours(), operationObject.valueDate.getMinutes(), operationObject.valueDate.getSeconds()];
								operationObject.valueDateTime = dateify(...holder.defaultDate, ...operationObject.valueTimeParts);
								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& haystack.some(tm => {
										operationObject.possibleMeridiem = String(tm).replace(regexify(patterns.general.nonAlphabet), '').toLowerCase();
										operationObject.hasMeridiem = ["am", "pm"].includes(operationObject.possibleMeridiem);
										operationObject.timeParts = String(tm).replace(regexify(patterns.general.nonTimeXter), '').split(':').map(t => Number(t));
										operationObject.timeInfo = operationObject.hasMeridiem 
											? { hour: Number(operationObject.timeParts[0]), meridiem: operationObject.possibleMeridiem }
											: { hour: Number(operationObject.timeParts[0]) };
										operationObject.hasMeridiem 
											&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem == 'pm') && (operationObject.timeInfo.hour != 12)) 
													? 12 : ((((operationObject.timeInfo.meridiem == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem == 'am')) 
														? 0 : -12));
										operationObject.timeParts[0] = operationObject.timeInfo.hour;
										operationObject.filteredDateTime = dateify(...holder.defaultDate, ...operationObject.timeParts);
										
										return (String(operationObject.valueDateTime) == String(operationObject.filteredDateTime));
									}));
								keyPass = (ls == 'tin') ? operationObject.status : !operationObject.status;
								break;
							case 'tinrange': // check if time is in range
							case 'tninrange': // check if time is not in range
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.valueTimeParts = [operationObject.valueDate.getHours(), operationObject.valueDate.getMinutes(), operationObject.valueDate.getSeconds()];
								operationObject.valueDateTime = dateify(...holder.defaultDate, ...operationObject.valueTimeParts);
								operationObject.haystack = (haystack.length >= 2) ? [haystack[0], haystack[1]] : [haystack[0], haystack[0]];
								operationObject.haystackTimeParts = operationObject.haystack.map(tm => {
									operationObject.possibleMeridiem = String(tm).replace(regexify(patterns.general.nonAlphabet), '').toLowerCase();
									operationObject.hasMeridiem = ["am", "pm"].includes(operationObject.possibleMeridiem);
									operationObject.timeParts = String(tm).replace(regexify(patterns.general.nonTimeXter), '').split(':').map(t => Number(t));
									operationObject.timeInfo = operationObject.hasMeridiem 
										? { hour: Number(operationObject.timeParts[0]), meridiem: operationObject.possibleMeridiem }
										: { hour: Number(operationObject.timeParts[0]) };
									operationObject.hasMeridiem 
										&& (operationObject.timeInfo.hour += ((operationObject.timeInfo.meridiem == 'pm') && (operationObject.timeInfo.hour != 12)) 
												? 12 : ((((operationObject.timeInfo.meridiem == 'am') && (operationObject.timeInfo.hour != 12)) || (operationObject.timeInfo.meridiem == 'am')) 
													? 0 : -12));
									operationObject.timeParts[0] = operationObject.timeInfo.hour;
									return dateify(...holder.defaultDate, ...operationObject.timeParts);
								});

								operationObject.status = ((![String(operationObject.valueDate)].includes('Invalid Date'))
									&& (((operationObject.valueDateTime > operationObject.haystackTimeParts[0]) || (String(operationObject.valueDateTime) == String(operationObject.haystackTimeParts[0])))
										&& ((operationObject.valueDateTime < operationObject.haystackTimeParts[1]) || (String(operationObject.valueDateTime) == String(operationObject.haystackTimeParts[1])))));
								keyPass = (ls == 'tinrange') ? operationObject.status : !operationObject.status;
								break;
							case 'ago': // check if time matches period
								// get date value
								[operationObject.valueDate, operationObject.filteredDate] = [dateify(value), filtered];
								operationObject.timeSpan = {
									sign: operationObject.filteredDate.replace(regexify(patterns.general.nonSign), ''),
									time: operationObject.filteredDate.replace(regexify(patterns.general.nonDecimal), ''),
									duration: operationObject.filteredDate.replace(regexify(patterns.general.nonAlphabet), '').toLowerCase()
								};

								// check that time span is valid
								if (timeDuration.includes(operationObject.timeSpan.duration) && Number(operationObject.timeSpan.time) > 0) { 
									operationObject.timeSpan.ticks = timeDurationMap.get(operationObject.timeSpan.duration);
									operationObject.timeSpan.ms = Number(operationObject.timeSpan.time) * operationObject.timeSpan.ticks;
									operationObject.timeSpan.lapse = (dateify().getTime() - operationObject.timeSpan.ms);
									operationObject.range = { 
										min: operationObject.timeSpan.lapse, 
										max: operationObject.timeSpan.lapse + operationObject.timeSpan.ticks,
										maxWithSign: (operationObject.timeSpan.sign == '+') ? dateify().getTime() : null
									};

									operationObject.status = (!operationObject.timeSpan.sign) 
										? (operationObject.valueDate.getTime() >= operationObject.range.min) 
											&& (operationObject.valueDate.getTime() <= operationObject.range.max)
										: (operationObject.timeSpan.sign == '+')
											? (operationObject.valueDate.getTime() >= operationObject.range.min) 
												&& (operationObject.valueDate.getTime() <= (operationObject.range.maxWithSign || operationObject.range.max))
											: (operationObject.valueDate.getTime() <= operationObject.range.min);
									
									keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) && operationObject.status;
								} else keyPass = false;
								break;
							case 'agoin': // check if time matches period range
								// get date value
								operationObject.valueDate = dateify(value);
								operationObject.haystack = (haystack.length == 2) ? [haystack[0], haystack[1]] : [haystack[0], haystack[0]];
								operationObject.haystackTimeMs = operationObject.haystack.map(tm => {
									operationObject.timeSpan = {
										time: tm.replace(regexify(patterns.general.nonDecimal), ''),
										duration: tm.replace(regexify(patterns.general.nonAlphabet), '').toLowerCase()
									};

									// check that time span is valid
									if (timeDuration.includes(operationObject.timeSpan.duration) && Number(operationObject.timeSpan.time) > 0) { 
										operationObject.timeSpan.ticks = timeDurationMap.get(operationObject.timeSpan.duration);
										operationObject.timeSpan.ms = Number(operationObject.timeSpan.time) * operationObject.timeSpan.ticks;
										operationObject.timeSpan.lapse = (dateify().getTime() - operationObject.timeSpan.ms);
										
										return {
											min: operationObject.timeSpan.lapse, 
											max: operationObject.timeSpan.lapse + operationObject.timeSpan.ticks
										};
									} else return 0;
								});

								operationObject.range = { 
									min: Math.min(operationObject.haystackTimeMs[0].min, operationObject.haystackTimeMs[1].min), 
									max: Math.max(operationObject.haystackTimeMs[0].max, operationObject.haystackTimeMs[1].max)
								};
								operationObject.status = (operationObject.valueDate.getTime() >= operationObject.range.min) 
											&& (operationObject.valueDate.getTime() <= operationObject.range.max);

								keyPass = (![String(operationObject.valueDate)].includes('Invalid Date')) && operationObject.status;
								break;
							case 'first': // get first item in array
								value = Array.isArray(value) 
									? (isNaN(filtered) 
											? value[0] || [] : value.slice(0, Number(filtered))) 
									: value;
								break;
							case 'last': // get last item in array
								value = Array.isArray(value) 
									? (isNaN(filtered)
											? value[value.length - 1] || [] : value.slice(-Number(filtered.replace(regexify(patterns.general.nonDigit), '')))) 
									: value;
								break;
							case 'btw': // get item in range
								operationObject.haystack = (haystack.length == 2) ? [Number(haystack[0]) - 1, haystack[1]] : [0, haystack[0]];
								value = Array.isArray(value) 
									? value.slice(operationObject.haystack[0], operationObject.haystack[1]) || [] : value;
								break;
							case 'dist': // get distinct list of values
								let localSet = new Set([]), objectSet = new Set([]);
								value = Array.isArray(value) 
									? Array.from(value, x => 
										(typeof x == 'object') 
										? (ls == filtered) 
											? localSet.add(x) 
											: (x[filtered] && objectSet.has(x[filtered]))
												? null : (localSet.add(x) && objectSet.add(x[filtered]))
										: localSet.add(x)) 
									: value;
								value = Array.from(localSet.values());
								break;
						}

						// add key pass to its set
						keyPassSet.add(keyPass);
					}

					// place key and its value in new schema
					result[propertyInfo.alias || propertyInfo.property] = value;
				}
			}
			// check if property exists in normal schema
			else if (subject.hasOwnProperty(key)) {
				if (schema[key] === 1)
					result[key] = subject[key];
				else {
					// define store
					let objectHasOperationsStatus = false,
							currentKeyMode = 'and',
							currentKeyAsNewPropertyName = String(),
							objectPropertyInfo = null;
					
					// check if an property is an operation for previous property key (key with object value)
					if (holder.objectOps.has(properties[keyCounter + 1])) {
						let objectPropertyInfoKey = properties[keyCounter + 1],
							prop = key;
							
						// extract object info
						objectPropertyInfo = holder.objectOps.get(objectPropertyInfoKey);
						
						// pass new random name
						currentKeyAsNewPropertyName = `*instr-p:id_${randomKey()}`;
						// extract mode for object
						currentKeyMode = objectPropertyInfo.mode;

						// check if any valid operations
						if (objectPropertyInfo.operation.length) {
							// check if [as] operator is set property
							const operatorIndexAs = objectPropertyInfo.operation.findIndex(x => x.match(/^as:\".*\"$/));

			    		// check 
			    		if(operatorIndexAs >= 0) {
			    			let operatorAsAlias = String(objectPropertyInfo.operation[operatorIndexAs]).split(':')[1];
			    			// change key name to alias
			    			objectPropertyInfo.currentKeyAlias = operatorAsAlias.replace(regexify(patterns.general.quotes, true, true), '');
			    			// remove [as] operator
			    			objectPropertyInfo.operation.splice(operatorIndexAs, 1);	
			    			// indicate that current key holding an object has operations
			    			objectHasOperationsStatus = (objectPropertyInfo.operation.length > 0);
			    		} else objectHasOperationsStatus = true;

			    		// pass property name and operations into holder
			    		holder.propertyOps.set(currentKeyAsNewPropertyName, {
			    			property: prop,
			    			operation: objectPropertyInfo.operation,
			    			condition: objectPropertyInfo.condition
			    		});
			    	}
					}
					
					// process schema and subject for current key
					result[objectPropertyInfo?.currentKeyAlias || key] = (await sweep({ schema: schema[key], subject: subject[key], mode: currentKeyMode })).result;

					// check if key has operations waiting in next key
					if (objectHasOperationsStatus) {
						// compute status
						let operationStatus = await sweep({ schema: { [currentKeyAsNewPropertyName]: 1  }, subject: { [key]: result[objectPropertyInfo?.currentKeyAlias || key] } })
						result[objectPropertyInfo?.currentKeyAlias || key] = operationStatus.schemaPass 
							? operationStatus.result[key] 
							: operationStatus.result[key] instanceof Array ? [] : Object.create(null);

						// add key pass to its set
						keyPassSet.add(operationStatus.schemaPass);
					}
				}
			}

			// add key pass from key pass set to schema pass set
			schemaPassSet.add((keyPassSet.size > 1) 
				? (propertyInfo.condition == 'or' ? true : false) 
				: Array.from(keyPassSet.values())[0] ?? keyPass);
		}

		// compute pass
		schemaPass = (holder.propertyOps.size < 1) 
			? true 
			: (schemaPassSet.size > 1) 
				? ((mode ?? holder.mode) == 'or' ? true : false) 
				: Array.from(schemaPassSet.values())[0];
	}

	return { schemaPass, result };
}

export { filterSchema, laundry };
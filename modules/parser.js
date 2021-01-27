const parse = (input) => {
	// Special tokens
	const tokens = { project: "@", tag: "#" };

	const projects = [];
	const tags = [];

	for( let i = 0; i < input.length; i ++ ){
		if(input[i] === tokens.project){
			let end = input.indexOf(" ", i);
            end === -1 ? end = input.length : null;

			if(end !== -1){
				const str = input.slice(i + 1, end);
				projects.push(str);
			}
		}

		if(input[i] === tokens.tag){
			let end = input.indexOf(" ", i);
            end === -1 ? end = input.length : null;

			if(end !== -1){
				const str = input.slice(i + 1, end);
				tags.push(str);
			}
		}
	}
	return { tokens: { projects, tags } };
}

// Used to parse innerHTMLs (which evaluate ' ' as 'nbsp;' )
const parseInner = (input) => {
    const _input = input.replace('&nbsp;', ' ');
    return { value:_input, ...parse(_input) };
}

module.exports.parse = parse;
module.exports.parseInner = parseInner;

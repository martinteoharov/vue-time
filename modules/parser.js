const parse = (input) => {
	// Special tokens
	const tokens = { project: "@", tag: "#" };

	const projects = [];
	const tags = [];

    const last = { type: null, input: null };

	for( let i = 0; i < input.length; i ++ ){

		if(input[i] === tokens.project){
			let end = input.indexOf(" ", i);

            // There has been a token, but the string isn't yet finished
            if(end === -1){
                end = input.length;
                const notFinishedStr = input.slice(i + 1, end);

                last.type = "project";
                last.input = notFinishedStr;

            }

            // There has been a token and the string is finished
			else {
				const finishedStr = input.slice(i + 1, end);
				projects.push(finishedStr);
			}
		}

		if(input[i] === tokens.tag){
			let end = input.indexOf(" ", i);

            // There has been a token, but the string isn't yet finished
            if(end === -1){
                end = input.length;
                const notFinishedStr = input.slice(i + 1, end);

                last.type = "tag";
                last.input = notFinishedStr;
            }

            // There has been a token and the string is finished
            else {
				const finishedStr = input.slice(i + 1, end);
				tags.push(finishedStr);
			}
		}
	}
	return { tokens: { projects, tags }, last };
}

// Used to parse innerHTMLs (which evaluate ' ' as 'nbsp;' )
const parseInner = (input) => {
	const _input = input.replace('&nbsp;', ' ');
	return { value:_input, ...parse(_input) };
}

module.exports.parse = parse;
module.exports.parseInner = parseInner;

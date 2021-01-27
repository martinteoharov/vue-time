const parse = (input) => {
	// Special tokens
	const tokens = { project: "@", tag: "#" };

	const projects = [];
	const tags = [];

	for( let i = 0; i < input.length; i ++ ){
		if(input[i] === tokens.project){
			let end = input.indexOf(" ", i);

			if(end !== -1){
				const str = input.slice(i + 1, end);
				projects.push(str);
			}
		}

		if(input[i] === tokens.tag){
			let end = input.indexOf(" ", i);

			if(end !== -1){
				const str = input.slice(i + 1, end);
				tags.push(str);
			}
		}
	}
	return { projects, tags };
}

module.exports.parse = parse;

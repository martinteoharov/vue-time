export default (context, inject) => {
    inject('parse', msg => parse(msg));
    inject('parseInner', msg => parseInner(msg));
}

const parse = (input) => {
	// Special tokens
	const tokens = { project: "@", tag: "#" };

    const last = { type: null, input: null };
	let projects = [];
	let tags = [];

    /* --------- Parsing --------- */
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


    /* --------- Processing input --------- */

    // The last "unfinished" item should also be included..
    if(last.type === 'project'){
        projects.push(last.input);
    }
    else if(last.type === 'tag') {
        tags.push(last.input); 
    }

    // Remove duplicates...
    projects = removeDuplicates(projects);
    tags = removeDuplicates(tags);

	return { tokens: { projects, tags }, last };
}

// Used to parse innerHTMLs (which evaluate ' ' as 'nbsp;' )
const parseInner = (input) => {
	const _input = input.replace('&nbsp;', ' ');
	return { value:_input, ...parse(_input) };
}


/* --------- Helpers --------- */
const removeDuplicates = (arr) => {
    const unique = [];
    for(const el of arr){
        if(!findInArr(el, unique)){
            unique.push(el); 
        }
    }
    return unique;
}

const findInArr = (val, arr) => {
    for(const el of arr){
        if(val == el) return true;
    }
    return false;
}






















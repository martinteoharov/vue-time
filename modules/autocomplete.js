/*
 * type: String  (projects || tags)
 * input: String
 * src: Array
 */
const exec = (input, src) => {
    const matches = [];
    const regex = `^(${input}).*`;
    // const regex = `(${input}).*`; --- Softer search

    for(const el of src){
        if(el.match(regex)) matches.push(el);
    }

    return { matches };
}


module.exports.exec = exec;

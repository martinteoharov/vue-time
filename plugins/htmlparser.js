// Responsible for colouring @projects
const transformProject = () => {
}

// Responsible for colouring @tags
const transformTag = () => {
}


/*
 * input: String
 *
 *
 */
const encode = ({ input, tags, projects }) => {
    for(const tag of tags){
        input.replace(`@${tag}`, `TAG:${tag}`);
    }

    return { input };
}

const reverse = () => {
}

module.exports.encode = encode;

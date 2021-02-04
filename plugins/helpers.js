export default (context, inject) => {
    inject('removeDuplicates', arr => removeDuplicates(arr));
}

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

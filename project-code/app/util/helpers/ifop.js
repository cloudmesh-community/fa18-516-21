module.exports = function(arg1, operator, arg2, options){
    let result;
    low_arg1 = arg1.toLowerCase();
    switch (operator) {
        case '==':
            result = (low_arg1 == arg2);
            break;
        case '===':
            result = (low_arg1 === arg2);
            break;
        case '!==':
            result = (low_arg1 !== arg2);
            break;
        case '<':
            result =  (low_arg1 < arg2);
            break;
        case '<=':
            result =  (low_arg1 <= arg2);
            break;
        case '>':
            result =  (low_arg1 > arg2);
            break;
        case '>=':
            result =  (low_arg1 >= arg2);
            break;
        case '||':
            result =  (low_arg1 || arg2);
            break;
        case '&&':
            result =  (low_arg1 && arg2);
            break;
        default:
            result =  false;
    }
    return result ? options.fn(this) : options.inverse(this)
}
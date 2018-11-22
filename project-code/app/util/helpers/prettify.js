module.exports = function(arg1, options){
    return JSON.stringify(JSON.parse(arg1), null, 2)
}
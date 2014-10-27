module.exports = function(fileName) {
    var split = fileName.split('.');
    var extension = split[split.length - 1];
    return extension !== "js";
}
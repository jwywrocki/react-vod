const textTurncate = ((str, maxWords, ending) => {
    var strippedString = str.trim();
    var wordsArray = strippedString.split(" ");
    var wordCount = wordsArray.length;
    var string = wordsArray.splice(0, maxWords).join(" ");
    if (wordCount > maxWords) {
        string += ending;
    }
    return string;
});
export default textTurncate;
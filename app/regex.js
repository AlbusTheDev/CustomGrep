var customRegex = {

    matchNumber: function (input, index) {

        const code = input.charCodeAt(0);
        return(code >= 49 && code <= 57);

    },

    matchAlphanumeric: function (c) {
        
        const code = c.charCodeAt(0);
        return (!isNaN(c) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || c == '_');
        
    },

    matchCharacters: function (input, pattern) {
        
        var flag = true;
        if (pattern[0] === "^") flag = false;

        for (const c of pattern) {
            if (c === input) return flag;
        }

        return !flag;
    }, 
    getPattern: function (pattern) {
        var arr = [];

        for (let i = 0; i < pattern.length;) {
            if (pattern[i] === '\\') {
                arr.push("\\" + pattern[++i]);
                i++;
            } else if (pattern[i] === '[') {
                const index = pattern.indexOf(']', i) + 1;
                arr.push(pattern.substr(i, index));
                i = index;
            } else {
                arr.push(pattern[i]);
                i++;
            }
        }

        return arr;
    },
    handlePattern: function (pattern, input) {
        if (pattern === "\\d") {
            return customRegex.matchNumber(input);
        } else if (pattern === "\\w") {
            return customRegex.matchAlphanumeric(input);
        } else if (pattern[0] === "[") {
            return customRegex.matchCharacters(input, pattern.substr(1, pattern.length - 1));
        } else if (pattern === ".") {
            return true;
        } else {
            return pattern === input;
        }
    }
};

module.exports = {customRegex};
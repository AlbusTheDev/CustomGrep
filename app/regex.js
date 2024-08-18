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
    }
};

module.exports = {customRegex};
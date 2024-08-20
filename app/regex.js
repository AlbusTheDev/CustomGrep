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
    
    matchStartEnd: function (input, arr, j) {
        var flag = true;
        for (let i = 0; i < arr.length; i++) {
            const patternElement = arr[i];
            const inputElement = input[j];

            if (patternElement[1] === "+") {
                flag = patternElement[0] === inputElement;
                if (!flag) return false;

                while (input[j + 1] === input[j] && flag) {
                    j++;
                }
            } else if (!this.handlePattern(patternElement, inputElement)) return false;

            j++;
        }

        return true;
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
            } else if (pattern[i] === '+') {
                arr[arr.length - 1] = arr[arr.length - 1] + "+";
                i++;
            } else {
                arr.push(pattern[i]);
                i++;
            }
        }

        return arr;
    },
    handlePattern: function (pattern, input, obj) {
        if (pattern === "\\d") {
            obj = {};
            return customRegex.matchNumber(input);
        } else if (pattern === "\\w") {
            obj = {};
            return customRegex.matchAlphanumeric(input);
        } else if (pattern[0] === "[") {
            obj = {};
            return customRegex.matchCharacters(input, pattern.substr(1, pattern.length - 1));
        } else if (pattern === ".") {
            obj = {};
            return true;
        } else {
            obj = {};
            return pattern === input;
        }
    }
};

module.exports = {customRegex};
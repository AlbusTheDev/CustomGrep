var customRegex = {

    matchNumber: function (input) {

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

        for (var i = 1; i < pattern.length; i++) {
            if (pattern[i] === input) return flag;
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
            } else if (patternElement[1] === "?") {
                if (patternElement[0] !== inputElement) continue;
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
            } else if (pattern[i] === '+' || pattern[i] === '?') {
                arr[arr.length - 1] = arr[arr.length - 1] + pattern[i];
                i++;
            } else if (pattern[i] === '(') {
                const index = pattern.indexOf(')', i) + 1;
                arr.push(pattern.substr(i, index - 2));
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
            return customRegex.matchCharacters(input, pattern.substr(1, pattern.length - 2));
        } else if (pattern === ".") {
            return true;
        } else {
            return pattern === input;
        }
    }
};

module.exports = {customRegex};
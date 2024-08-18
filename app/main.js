const {customRegex} = require("./regex");

function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    
    return inputLine.includes(pattern);
  } else if (pattern[0] === "^") {
    var arr = getPattern(pattern.substr(1));
    if (arr.length > inputLine.length) return false;

    for (let i = 0; i < arr.length; i++) {
      const patternElement = arr[i];
      const inputElement = inputLine[i];

      if (!handlePattern(patternElement, inputElement)) return false;
    }

    return true;
  } else if (pattern.length > 1) {
    var arr = getPattern(pattern);
    
    if (arr.length === 0) return true;

    for (let i = 0; i < (inputLine.length - (arr.length - 1)); i++) {

      var flag = true;
      let j = 0;
      for (; j < arr.length; j++) {
        const patternElement = arr[j];

        flag = handlePattern(patternElement, inputLine[i + j]);

        if (!flag) break;
      }

      if (flag) return true;
    }

    return false;
    
  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function getPattern(pattern) {
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
}

function handlePattern(pattern, input) {
  if (pattern === "\\d") {
    return customRegex.matchNumber(input);
    
  } else if (pattern === "\\w") {
    return customRegex.matchAlphanumeric(input);
    
  } else if (pattern[0] === "[") {
    return customRegex.matchCharacters(input, pattern.substr(1, pattern.length - 1));
    
  } else {
    return pattern === input;
    
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require("fs").readFileSync(0, "utf-8").trim();

  if (process.argv[2] !== "-E") {
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  //console.log("Logs from your program will appear here");

  // Uncomment this block to pass the first stage
  if (matchPattern(inputLine, pattern)) {
    //console.log(0);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();

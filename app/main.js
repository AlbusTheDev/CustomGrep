const {customRegex} = require("./regex");

function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    
    return inputLine.includes(pattern);
  } else if (pattern.length > 1) {
    var arr = getPattern(pattern);
    if (arr.length === 0) return true;

    for (let i = 0; i < (inputLine.length - (arr.length - 1)); ) {
      //const inputElement = inputLine[i];
      var flag = true;
      let j = 0;
      for (; j < arr.length; j++) {
        const patternElement = arr[j];
        
        if (patternElement === "\\d") {
          flag = customRegex.matchNumber(inputLine[i + j]);
        } else if (patternElement === "\\w") {
          flag = customRegex.matchAlphanumeric(inputLine[i + j]);
        } else if (patternElement[0] === "[") {
          flag = customRegex.matchCharacters(inputLine[i + j], patternElement.substr(1, patternElement.length - 1));
        }

        if (!flag) break;
      }

      if (flag) return true;

      i += j + 1;
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
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();

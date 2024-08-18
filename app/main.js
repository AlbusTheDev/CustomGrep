function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    
    return inputLine.includes(pattern);
  } else if (pattern.startsWith("\\d")) {

    for (let i = 0; i < inputLine.length; i++) {
      const code = inputLine[i].charCodeAt(0);
      if (code >= 49 && code <= 57) return true;
    }

    return false;

  } else if (pattern.startsWith("\\w")) {
    
    for (const c of inputLine) {
      const code = c.charCodeAt(0);
      if (!isNaN(c) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || c == '_') return true;
    }

    return false;

  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    var obj = {};
    
    for (const c of inputLine) {
      if (obj[c]) obj[c]++;
      else obj[c] = 1;
    }

    var flag = true;

    if (pattern[1] === "^") flag = false;

    for (const c of pattern) {
      if (obj[c]) return flag;
    }

    return !flag;

  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
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
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();

function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    
    return inputLine.includes(pattern);
  } else if (pattern.startsWith("\\d")) {

    for (const c of inputLine) {
      if (!isNaN(c)) return true;
    }

    return false;

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
  console.log("Logs from your program will appear here");

  // Uncomment this block to pass the first stage
  if (matchPattern(inputLine, pattern)) {
    console.log(0);
    process.exit(0);
  } else {
    console.log(1);
    process.exit(1);
  }
}

main();

const {customRegex} = require("./regex");

function matchPattern(inputLine, pattern) {

    if (pattern.length === 1) {

		return inputLine.includes(pattern);

	} else if (pattern[0] === "^") {

		var arr = [];
		if (pattern[pattern.length - 1] === "$") {
			arr = customRegex.getPattern(pattern.substr(1, pattern.length - 2));
			if (arr.length >= inputLine.length) return false;
		} else {
			arr = customRegex.getPattern(pattern.substr(1));
			if (arr.length > inputLine.length) return false;
		}

		return customRegex.matchStartEnd(inputLine, arr, 0);

	} else if (pattern[pattern.length - 1] === "$") {
		
		var arr = customRegex.getPattern(pattern.substr(0, pattern.length - 1));
		
		if (arr.length > inputLine.length) return false;
		
		var j = inputLine.length - arr.length; 
		return customRegex.matchStartEnd(inputLine, arr, j);

	} else if (pattern.length > 1) {
		
		var arr = customRegex.getPattern(pattern);
		
		if (arr.length === 0) return true;

		for (let i = 0; i < (inputLine.length); i++) {

			var flag = true;
			
			for (let j = 0; j < arr.length; j++) {
				const patternElement = arr[j];

				if (patternElement[1] === "+") {
					flag = patternElement[0] === inputLine[i + j];
					while (inputLine[i + j + 1] === inputLine[i + j] && flag) {
						i++;
					}
					
				} else if (patternElement[1] == "?") {
                    
					if (inputLine[i+j] !== patternElement[0]) {
                        flag = true;
                        i--;
                    }
				} else if (patternElement[0] === "(") {

					var patternArr = patternElement.substr(1, patternElement.length - 2).split('|');

					flag = false;

					for (let k = 0; k < patternArr.length; k++) {

						const element = patternArr[k];
						const inputLastIndex = i + j + element.length;

						if (inputLastIndex > inputLine.length) continue;

						const inputStr = inputLine.substr(i+j, inputLastIndex - 2);
						
						if (inputStr === element) {
							flag = true;
							break;
						}
					}

				} else {
                    
					flag = customRegex.handlePattern(patternElement, inputLine[i + j]);

				}

				if (!flag) break;
			}

			if (flag) return true;
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
	//console.log("Logs from your program will appear here");

	// Uncomment this block to pass the first stage
	if (matchPattern(inputLine, pattern)) {
		//console.log(0);
		process.exit(0);
	} else {
		//console.log(1);
		process.exit(1);
	}
}

main();

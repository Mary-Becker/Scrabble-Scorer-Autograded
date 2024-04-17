// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   let letterPoints = ``
	word = word.toUpperCase();
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      
		 }
 
	  }
	}
	return letterPoints;
 } 


// Where we are asking the user to play scrabble.
function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter word:");
   return word;
};
// Option 0, simple scorer, only each letter is only one piont.
 function simpleScorer(word){
   let totalPoints = 0;;
   word = word.toUpperCase();
   for (i = 0; i < word.length; i++){
      totalPoints++
    } 

return totalPoints;
 }

// Option 1, vowel bonus, where vowels are worth 3 pts and the rest or worth 1.
function vowelBonusScorer(word){
   let totalPoints = 0
   let vowels = ["A", "E", "I", "O", "U"]
   word = word.toUpperCase();
      for (let i = 0; i < word.length; i++){
         if(vowels.includes(word[i])){
            totalPoints += 3;
            
      } else {
         totalPoints++;
      } 
   
      }
   return totalPoints;
}

// New scrabble function.
function scrabbleScorer(word) {
   let totalPoints = 0
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
      let letter = word[i]
      if (newPointStructure.hasOwnProperty(letter)) {
         totalPoints += newPointStructure[letter];
      }
   }
   return totalPoints
}
// An array of objects where each has a function to be executed, depending on which object the user chooses.
const scoringAlgorithms = [ 
  { 
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
  },
  {
   name:"Bonus Vowels",
   description: "Vowls are 3 points, consonants are 1 point.",
   scorerFunction: vowelBonusScorer
  },
  {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scorerFunction: scrabbleScorer
  }
 ];

//  Where we ask the user which scoring method/object to execute.
function scorerPrompt() {
   num = input.question("Which Scoring method would you like?\n Simple Score: 0\n Vowl Bonus: 1\n Scrabble: 2\n")
   
return scoringAlgorithms[num]
}
 
// Where the old point structure is transformed into the new point structure.
//  by using a for in loop we are able to go into the old point structure and declare the values as letters,
// make it case insensitive, then establish the new point structure with letters as the key. and the point values as integers. 

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure){
      let letters = oldPointStructure[pointValue];
      for(let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }   
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure)

function runProgram() { 
    let word = initialPrompt();
   let num = scorerPrompt();
   let totalPoints = num.scorerFunction(word)
   let finalScore = `Your total points for "${word}" is ${totalPoints}!`
   console.log(finalScore)
   
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

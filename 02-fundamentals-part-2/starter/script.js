console.log("Part 2: Functions ready!");


// Functions - Declarations and Expressions
console.log("=== FUNCTIONS ===");

// Function declaration
function logger() {
  console.log("My name is Jonas");
}

// Calling / running / invoking the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const juice1 = `Juice with 5 apples and 0 oranges.`;
const juice2 = `Juice with 2 apples and 4 oranges.`;
const juice3 = `Juice with 3 apples and 2 oranges.`;

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const age1 = calcAge(1991);
console.log(age1);

function calcAge(birthYear, currentYear) {
  // Parameters
  const age = currentYear - birthYear;
  return age;
}

const myAge = calcAge(1991, 2037); 
const herAge = calcAge(2005, 2037);

console.log(`I am ${myAge} years old`);
console.log(`She is ${herAge} years old`);

function introduce(firstName, lastName, age) {
  const introduction = `Hi, I'm ${firstName} ${lastName} and I'm ${age} years old.`;
  return introduction;
}

console.log(introduce("Jonas", "Schmedtmann", 46));
console.log(introduce("Sarah"));

function calcAge(birthYear) {
  return 2037 - birthYear;
}

function yearsUntilRetirement(birthYear, firstName) {
  const age = calcAge(birthYear); // Using one function inside another!
  const retirement = 65 - age;

  if (retirement > 0) {
    return `${firstName} retires in ${retirement} years`;
  } else {
    return `${firstName} has already retired!`;
  }
}

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));

// Global scope
const globalVar = "I am global";

function testScope() {
  const localVar = "I am local";
  console.log(globalVar); // Can access global
  console.log(localVar); // Can access local
}

testScope();
console.log(globalVar);

const userName = "Jonas"; // Global

function createWelcomeMessage(user) {
  const message = `Welcome back, ${user}!`;
  const timestamp = new Date().toLocaleTimeString();

  return `${message} Current time: ${timestamp}`;
}

console.log(createWelcomeMessage(userName));

const student1Grade = 85;
const student2Grade = 92;
const student3Grade = 78

const grades = [85, 92, 78, 96, 88];
console.log(grades)

////////////////////////////////////
console.log("=== ARRAYS ===");


const friends = ["Michael", "Steven", "Peter"];
console.log(friends);


const mixed = ["Jonas", 27, true, friends];
console.log(mixed);


const years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]); // Michael (first element)
console.log(friends[1]); // Steven (second element)
console.log(friends[2]); // Peter (third element)


console.log(friends.length); // 3

console.log(friends[friends.length - 1]); 

friends[1] = "Jay";
console.log(friends);

const friends = ["Michael", "Steven", "Peter"];

const newLength = friends.push("Jay");
console.log(friends);
console.log(newLength);

friends.unshift("John");
console.log(friends);

const popped = friends.pop();
console.log(popped);
console.log(friends); 

const shifted = friends.shift();
console.log(shifted);
console.log(friends);

console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob"));

console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));

const jonasArray = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
];

console.log(jonasArray[0]);
console.log(jonasArray[1]);
console.log(jonasArray[2]);

console.log("=== OBJECTS ===");

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher", 
  friends: ["Michael", "Peter", "Steven"],
};
console.log(jonas);

const jonasArray = [
  "Jonas",
  "Schmedtmann",
  46,
  "teacher",
  ["Michael", "Peter", "Steven"],
];

const jonasObject = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 46,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};

console.log(jonas.firstName);
console.log(jonas.lastName);
console.log(jonas.age);
console.log(jonas.job);
console.log(jonas.friends);

console.log(jonas["firstName"]);
console.log(jonas["lastName"]);
console.log(jonas["age"]);

// Bracket notation with expressions - compute property names!
const nameKey = "Name";
console.log(jonas["first" + nameKey]); 
console.log(jonas["last" + nameKey]);

jonas.job = "programmer";
jonas["age"] = 35;
console.log(jonas);

jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman";
jonas.hasDriversLicense = true;
console.log(jonas);

const message = document.querySelector(".message"); // Select by class
const button = document.querySelector("#btn"); // Select by ID
const heading = document.querySelector("h1"); // Select by tag
const input = document.querySelector(".guess"); // Select by class

console.log(message);
console.log(button);
console.log(heading);

// Different selector types
document.querySelector(".className"); // Class selector
document.querySelector("#idName"); // ID selector
document.querySelector("tagName"); // Tag selector
document.querySelector('[type="text"]'); // Attribute selector
document.querySelector("div p"); // Descendant selector

const buttonById = document.getElementById("btn");
console.log(buttonById);
console.log(buttonById === button);

const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs); // NodeList (like an array)
console.log(allParagraphs[0]); // First paragraph
console.log(allParagraphs.length); // Number of paragraphs

const guessInput = document.querySelector(".guess");
console.log(guessInput);


const buttonQuery = document.querySelector("#btn");

const buttonById = document.getElementById("btn");
console.log(buttonQuery === buttonById); 


const allSpans = document.querySelectorAll("span");
console.log(allSpans);

const firstSpan = document.querySelector("span");
console.log(firstSpan.textContent);

const message = document.querySelector(".message");


console.log(message.textContent);
message.textContent = "Hello from JavaScript!";

message.innerHTML = "<strong>Bold text from JS!</strong>";
console.log(message.innerText);

const input = document.querySelector(".guess");

console.log(input.value);

input.value = "Default text";

input.placeholder = "Type here";

// Different selector types
document.querySelector(".className"); // Class selector
document.querySelector("#idName"); // ID selector
document.querySelector("tagName"); // Tag selector
document.querySelector('[type="text"]'); // Attribute selector
document.querySelector("div p"); // Descendant selector

// getElementById - only works with IDs
const buttonById = document.getElementById("btn");
console.log(buttonById);
console.log(buttonById === button); // Same element, different method

// querySelectorAll - gets ALL matching elements
const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs); // NodeList (like an array)
console.log(allParagraphs[0]); // First paragraph
console.log(allParagraphs.length); // Number of paragraphsss
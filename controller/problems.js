// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomOperator() {
//     const operators = ["+", "-", "*", "/", "^"];
//     return operators[Math.floor(Math.random() * operators.length)];
//   }

//   function generateRandomEquation(termsCount) {
//     let equation = getRandomInt(1, 10).toString();
//     console.log(equation);
//     for (let i = 1; i < termsCount; i++) {
//       const operator = getRandomOperator();
//       const operand = getRandomInt(1, 10);
//       equation += ` ${operator} ${operand}`;
//     }
//     return equation;
//   }

//   function evaluateEquation(equation) {
//     const postfix = infixToPostfix(equation);
//     return evaluatePostfix(postfix);
//   }
  
//   function generateAndEvaluateRandomEquation(termsCount) {
//     const equation = generateRandomEquation(termsCount);
//     const answer = evaluateEquation(equation);
//     return { equation, answer };
//   }
  
// const generateEquation = async (req, res) => {
//     try{
//         const termsCount = parseInt(req.query.termsCount) || 5; // Default to 5 terms if not specified
//         const result = generateAndEvaluateRandomEquation(termsCount);
//         res.json(result);
//     } catch {
//         res.status(500).json({ error: 'Something went wrong' });
//     }
//   };

//   module.exports = generateEquation;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperator() {
  const operators = ["+", "-", "*", "/", "^"];
  return operators[Math.floor(Math.random() * operators.length)];
}

function generateRandomEquation(termsCount) {
  let equation = getRandomInt(1, 10).toString();
  for (let i = 1; i < termsCount; i++) {
      const operator = getRandomOperator();
      const operand = getRandomInt(1, 10);
      equation += ` ${operator} ${operand}`;
  }
  return equation;
}

function infixToPostfix(infix) {
  const precedence = {
      "^": 4,
      "*": 3,
      "/": 3,
      "+": 2,
      "-": 2
  };
  const associativity = {
      "^": "Right",
      "*": "Left",
      "/": "Left",
      "+": "Left",
      "-": "Left"
  };
  const output = [];
  const operators = [];
  const tokens = infix.split(" ");

  tokens.forEach(token => {
      if (!isNaN(parseFloat(token))) {
          output.push(token);
      } else if (token in precedence) {
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token] &&
              associativity[token] === "Left") {
              output.push(operators.pop());
          }
          operators.push(token);
      }
  });

  while (operators.length) {
      output.push(operators.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  postfix.forEach(token => {
      if (!isNaN(parseFloat(token))) {
          stack.push(parseFloat(token));
      } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
              case "+":
                  stack.push(a + b);
                  break;
              case "-":
                  stack.push(a - b);
                  break;
              case "*":
                  stack.push(a * b);
                  break;
              case "/":
                  stack.push(a / b);
                  break;
              case "^":
                  stack.push(Math.pow(a, b));
                  break;
          }
      }
  });

  return stack[0];
}

function evaluateEquation(equation) {
  const postfix = infixToPostfix(equation);
  return evaluatePostfix(postfix);
}

function generateAndEvaluateRandomEquation(termsCount) {
  const equation = generateRandomEquation(termsCount);
  const answer = evaluateEquation(equation);
  return { equation, answer };
}

const generateEquation = async (req, res) => {
  try {
      const termsCount = parseInt(req.query.termsCount) || 4;
      const result = generateAndEvaluateRandomEquation(termsCount);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = generateEquation;

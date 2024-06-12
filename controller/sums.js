function infixToPostfix(expression) {
  const precedence = {
    "^": 4,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
    "(": 1,
  };

  const operators = [];
  const postfix = [];
  const tokens = expression.match(/\d+|\+|\-|\*|\/|\^|\(|\)/g);

  for (let token of tokens) {
    if (/\d/.test(token)) {
      postfix.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        postfix.push(operators.pop());
      }
      operators.pop();
    } else {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        postfix.push(operators.pop());
      }
      operators.push(token);
    }
  }
  while (operators.length) {
    postfix.push(operators.pop());
  }
  return postfix;
}

function evaluatePostfix(postfix) {
  const stack = [];
  for (let token of postfix) {
    if (/\d/.test(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      let result;
      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = a / b;
          break;
        case "^":
          result = Math.pow(a, b);
          break;
        default:
          throw new Error("Unsupported operator");
      }
      stack.push(result);
    }
  }
  return stack.pop();
}

const getequ = async (res, req) => {
  const { equation, answer } = req.body;
  try {
    
  } catch {

  }
};

const checksum = async (req, res) => {
  const { sum, numbers } = req.body;

  if (!sum || !numbers || !Array.isArray(numbers) || numbers.length !== 2) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const [num1, num2] = numbers;
  const actualSum = num1 + num2;
  if (actualSum == sum) {
    res.json({ result: "Correct" });
  } else {
    res.json({ result: "Incorrect", actualSum });
  }
};

const sendsum = async (req, res) => {
  const numbers = async (max1, max2) => {};
  const max1 = 100;
  const max2 = 50;
  const result = await numbers(max1, max2);
  res.json({ numbers: result });
};
const randnum1 = Math.floor(Math.random() * max1);
const randnum2 = Math.floor(Math.random() * max2);
return [randnum1, randnum2];

module.exports = { sendsum, checksum };

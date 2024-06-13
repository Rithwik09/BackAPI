function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperator() {
    const operators = ["+", "-", "*", "/", "^"];
    return operators[Math.floor(Math.random() * operators.length)];
  }

  function generateRandomEquation(termsCount) {
    let equation = getRandomInt(1, 10).toString();
    console.log(equation);
    for (let i = 1; i < termsCount; i++) {
      const operator = getRandomOperator();
      const operand = getRandomInt(1, 10);
      equation += ` ${operator} ${operand}`;
    }
    return equation;
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
    try{
        const termsCount = parseInt(req.query.termsCount) || 5; // Default to 5 terms if not specified
        const result = generateAndEvaluateRandomEquation(termsCount);
        res.json(result);
    } catch {
        res.status(500).json({ error: 'Something went wrong' });
    }
  };

  module.exports = generateEquation;
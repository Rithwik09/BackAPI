const  sendsum = async (req, res) => {
    const numbers = async (max1, max2) => {
        const randnum1 = Math.floor(Math.random() * max1);
        const randnum2 = Math.floor(Math.random() * max2);
        return [randnum1 ,randnum2];
    }
    const max1 = 100;
    const max2 = 50;
    const result = await numbers(max1, max2);
    res.json({ numbers: result }); 
}
const checksum = async (req, res) => {
    const { sum, numbers } = req.body;

    if (!sum || !numbers || !Array.isArray(numbers) || numbers.length !== 2) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const [num1, num2] = numbers;
    const actualSum = num1 + num2;
    if (actualSum == sum) {
        res.json({ result: 'Correct' });
    } else {
        res.json({ result: 'Incorrect', actualSum });
    }
}

module.exports = {sendsum, checksum};

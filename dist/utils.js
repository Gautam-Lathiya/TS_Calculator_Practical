/**
 * Utility class containing mathematical operations and helper functions
 */
export const MathUtils = {
    // Validates mathematical expressions by checking parentheses balance
    isValidExpression(expr) {
        let count = 0;
        for (let char of expr) {
            if (char === "(")
                count++;
            if (char === ")")
                count--;
            if (count < 0)
                return false;
        }
        return count === 0;
    },
    // Checks if a character is a basic arithmetic operator
    isOperator(char) {
        return "+-×/".includes(char);
    },
    // Counts opening and closing parentheses in an expression
    countParentheses(expr) {
        const open = (expr.match(/\(/g) || []).length;
        const close = (expr.match(/\)/g) || []).length;
        return { open, close };
    },
    // Mathematical constants used in calculations
    CONSTANTS: {
        pi: Math.PI,
        eps: Math.E,
    },
    // Formats numbers for display, handling both integers and decimals
    formatNumber(num) {
        return Number.isInteger(num) ? num.toString() : num.toPrecision(3);
    },
    // Calculates factorial of a number
    calculateFactorial(n) {
        const num = parseInt(n.toString());
        if (isNaN(num))
            throw new Error("Invalid number");
        if (num < 0)
            throw new Error("Cannot calculate factorial of negative number");
        if (num > 200)
            throw new Error("Number too large for factorial");
        if (num === 0)
            return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    },
    // Calculates modulo operation between two numbers
    calculateModulo(a, b) {
        const num1 = parseFloat(a.toString());
        const num2 = parseFloat(b.toString());
        if (isNaN(num1) || isNaN(num2))
            throw new Error("Invalid numbers");
        if (num2 === 0)
            throw new Error("Cannot divide by zero");
        return num1 % num2;
    },
    // Calculates 10 raised to a power
    calculatePowerOf10(exponent) {
        const num = parseFloat(exponent.toString());
        if (isNaN(num))
            throw new Error("Invalid exponent");
        if (Math.abs(num) > 308)
            throw new Error("Exponent too large");
        return Math.pow(10, num);
    },
    // Calculates trigonometric functions (sin, cos, tan)
    calculateTrig(operation, value) {
        const num = parseFloat(value.toString());
        if (isNaN(num))
            throw new Error("Invalid number");
        try {
            switch (operation) {
                case "sin":
                    return Math.sin(num);
                case "cos":
                    return Math.cos(num);
                case "asin":
                    return Math.asin(num);
                case "acos":
                    return Math.acos(num);
                case "atan":
                    return Math.atan(num);
                case "tan":
                    if (Math.abs(Math.cos(num)) < 1e-10) {
                        throw new Error("Undefined (tan 90°)");
                    }
                    return Math.tan(num);
                default:
                    throw new Error("Invalid operation");
            }
        }
        catch (error) {
            console.error(`Trig error (${operation}):`, error);
            throw error;
        }
    },
};

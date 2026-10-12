// ==========================================
// ПІДГОТОВЧІ МЕТОДИ
// ==========================================

// Генерація двовимірного масиву m x n з випадковими числами[cite: 1]
function generateMatrix(m, n, min, max) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            row.push(randomNum);
        }
        matrix.push(row);
    }
    return matrix;
}

// Виведення матриці у вигляді таблиці[cite: 1]
function printMatrix(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) {
        console.log("Матриця порожня!");
        return;
    }

    let header = "\t";
    for (let j = 0; j < matrix[0].length; j++) {
        header += "стовпець " + (j + 1) + "\t";
    }
    console.log(header);

    for (let i = 0; i < matrix.length; i++) {
        let rowStr = "рядок " + (i + 1) + "\t";
        for (let j = 0; j < matrix[i].length; j++) {
            let val = matrix[i][j];
            // Якщо число дробове, округлюємо до 2 знаків
            if (typeof val === "number" && !Number.isInteger(val)) {
                val = val.toFixed(2);
            }
            rowStr += val + "\t";
        }
        console.log(rowStr);
    }
}


// ==========================================
// ОСНОВНІ ЗАВДАННЯ
// ==========================================

// 1. Відняти від елементів кожного рядка середнє арифметичне цього рядка[cite: 1]
function subtractRowAverage(matrix) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
        }
        let avg = sum / matrix[i].length;

        let newRow = [];
        for (let j = 0; j < matrix[i].length; j++) {
            newRow.push(matrix[i][j] - avg);
        }
        result.push(newRow);
    }
    return result;
}

// 2. Циклічний зсув матриці на k позицій вправо та на k догори[cite: 1]
function shiftMatrix(matrix, k) {
    let m = matrix.length;
    let n = matrix[0].length;
    
    let shifted = [];
    for (let i = 0; i < m; i++) {
        shifted.push(new Array(n));
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Зсув вгору на k
            let newI = (i - (k % m) + m) % m;
            // Зсув вправо на k
            let newJ = (j + (k % n)) % n;

            shifted[newI][newJ] = matrix[i][j];
        }
    }
    return shifted;
}

// 3. Знайти максимальні елементи та видалити всі рядки й стовпці з ними[cite: 1]
function removeMaxRowsAndCols(matrix) {
    let maxVal = matrix[0][0];

    // Пошук максимуму
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > maxVal) {
                maxVal = matrix[i][j];
            }
        }
    }

    let rowsToDelete = {};
    let colsToDelete = {};

    // Фіксація рядків та стовпців з максимумом
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === maxVal) {
                rowsToDelete[i] = true;
                colsToDelete[j] = true;
            }
        }
    }

    // Створення нової матриці без видалених рядків/стовпців
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        if (rowsToDelete[i]) continue;
        let newRow = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (!colsToDelete[j]) {
                newRow.push(matrix[i][j]);
            }
        }
        result.push(newRow);
    }

    console.log("Максимальне значення у матриці:", maxVal);
    return result;
}

// 4. Обертання квадратної матриці на 90 градусів in-place (за годинниковою стрілкою)[cite: 1]
function rotateMatrixInPlace(matrix) {
    let n = matrix.length;

    // Транспонування (заміна matrix[i][j] на matrix[j][i])
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Перевертання елементів кожного рядка
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < Math.floor(n / 2); j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
}


// ПРИКЛАД ВИКОРИСТАННЯ (ТЕСТ)


console.log("=== 1. Початкова матриця 4x4 ===");
let myMatrix = generateMatrix(4, 4, 1, 10);
printMatrix(myMatrix);

console.log("\n=== 2. Віднімання середнього арифметичного ===");
let matrixAvg = subtractRowAverage(myMatrix);
printMatrix(matrixAvg);

console.log("\n=== 3. Циклічний зсув (k = 1) ===");
let shiftedMatrix = shiftMatrix(myMatrix, 1);
printMatrix(shiftedMatrix);

console.log("\n=== 4. Видалення рядків та стовпців з максимумом ===");
let trimmedMatrix = removeMaxRowsAndCols(myMatrix);
printMatrix(trimmedMatrix);

console.log("\n=== 5. Обертання на 90 градусів in-place ===");
let squareMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("До обертання:");
printMatrix(squareMatrix);
rotateMatrixInPlace(squareMatrix);
console.log("Після обертання:");
printMatrix(squareMatrix);

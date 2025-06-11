const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");

const biometrics = document.getElementById("biometrics");
const metricFields = biometrics.querySelectorAll(".calculator__form-biometric");
const imperialFields = biometrics.querySelectorAll(".calculator__form-fieldset");

const allInputs = biometrics.querySelectorAll(".calculator__form-number-input");

const calculatorInitial = document.getElementById("calculator-initial");
const calculatorCalculated = document.getElementById("calculator-calculated");

const bmiScoreEl = document.getElementById("bmi-score");
const classificationEl = document.getElementById("classification");
const rangeEl = document.getElementById("range");
// console.log(inputs);

let activeUnit = "metric";

imperialRadioBtn.addEventListener("change", () => {
    console.log("changed");
    biometrics.classList.remove("calculator__form-biometrics--metric");
    biometrics.classList.add("calculator__form-biometrics--imperial");

    activeUnit = "imperial";

    metricFields.forEach(field => {
        field.style.display = "none";
    });
    imperialFields.forEach(field => {
        field.style.display = "block";
    });
});

metricRadioBtn.addEventListener("change", () => {
    console.log("changed");
    biometrics.classList.add("calculator__form-biometrics--metric");
    biometrics.classList.remove("calculator__form-biometrics--imperial");

    activeUnit = "metric";

    metricFields.forEach(field => {
        field.style.display = "block";
    });
    imperialFields.forEach(field => {
        field.style.display = "none";
    });
});

function isAllFilled(unit) {
    const relevantInputs = Array.from(allInputs).filter(input => input.dataset.unit === unit);

    if (relevantInputs.every(input => input.value.trim() !== "")) {
        return { "relevantInputs": relevantInputs, "filled": true }
    }

    return { "relevantInputs": [], "filled": false };
}

function displayResult({ bmi, message, minIdealWeight, maxIdealWeight }) {
    bmiScoreEl.textContent = bmi;
    classificationEl.textContent = message;
    rangeEl.textContent = `${minIdealWeight}kgs - ${maxIdealWeight}kgs`;
}

function handleInputCheck() {
    if (metricRadioBtn.checked) {
        const relevantInputs = isAllFilled("metric").relevantInputs;
        if (isAllFilled("metric").filled) {
            const height = parseFloat(relevantInputs.find(input => input.dataset.type === "height")?.value.trim());
            const weight = parseFloat(relevantInputs.find(input => input.dataset.type === "weight")?.value.trim());

            const result = calculateBMI(height, weight);
            console.log(result);
            displayResult(result);
            calculatorInitial.classList.add("hidden");
            calculatorCalculated.classList.remove("hidden");
        } else {
            console.log("metric inputs incomplete");
        }
    }

    if (imperialRadioBtn.checked) {
        const relevantInputs = isAllFilled("imperial").relevantInputs;
        if (isAllFilled("imperial").filled) {
            const feet = parseFloat(relevantInputs.find(input => input.dataset.type === "height-feet")?.value.trim());
            const inch = parseFloat(relevantInputs.find(input => input.dataset.type === "height-inch")?.value.trim());

            const stone = parseFloat(relevantInputs.find(input => input.dataset.type === "weight-stone")?.value.trim());
            const pounds = parseFloat(relevantInputs.find(input => input.dataset.type === "weight-pounds")?.value.trim());

            const totalInches = (feet * 12) + inch;
            const heightCm = totalInches * 2.54;

            const totalPounds = (stone * 14) + pounds;
            const weightKg = totalPounds * 0.453592;

            const result = calculateBMI(heightCm.toFixed(2), weightKg.toFixed(2));
            console.log(result);
            displayResult(result);
            calculatorInitial.classList.add("hidden");
            calculatorCalculated.classList.remove("hidden");
        } else {
            console.log("imperial inputs incomplete");
        }
    }
}

allInputs.forEach(input => {
    input.addEventListener("input", handleInputCheck);
});

const bmiRanges = {
    "underweight": 18.5,
    "healthy": 24.9,
    "overweight": 29.9,
    "obeseClass1": 34.9,
    "obeseClass2": 39.9,
};

// const idealWeights = {
//     "underweight": 18.5,
//     "healthy": 24.9,
//     "overweight": 29.9,
//     "obeseClass1": 34.9,
//     "obeseClass2": 39.9,
// }

function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    const heightSquared = heightInMeters ** 2;

    const bmi = Number((weight / heightSquared).toFixed(1));

    let message = "";
    if (bmi <= bmiRanges.underweight) {
        message = "Underweight";
    } else if (bmi <= bmiRanges.healthy) {
        message = "a Healthy Weight";
    } else if (bmi <= bmiRanges.overweight) {
        message = "Overweight";
    } else if (bmi <= bmiRanges.obeseClass1) {
        message = "Obese. You have Obesity Class 1.";
    } else if (bmi <= bmiRanges.obeseClass2) {
        message = "Obese. You have Obesity Class 2.";
    } else {
        message = "Obese. You have Obesity Class 3.";
    }

    const minBMI = 18.5;
    const maxBMI = 24.9;

    const minIdealWeight = Number((minBMI * (heightInMeters ** 2)).toFixed(1));
    const maxIdealWeight = Number((maxBMI * (heightInMeters ** 2)).toFixed(1));

    return { bmi, message, minIdealWeight, maxIdealWeight };
}

document.addEventListener("DOMContentLoaded", () => { metricRadioBtn.checked = "true" });


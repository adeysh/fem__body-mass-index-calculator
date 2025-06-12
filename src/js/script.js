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

const HEALTHY_MIN_BMI = 18.5;
const HEALTHY_MAX_BMI = 24.9;

let activeUnit = "metric";

// Utility functions

function toggleUnit(unit) {
    biometrics.classList.toggle("calculator__form-biometrics--metric", unit === "metric");
    biometrics.classList.toggle("calculator__form-biometrics--imperial", unit === "imperial");

    metricFields.forEach(field => field.style.display = unit === "metric" ? "block" : "none");
    imperialFields.forEach(field => field.style.display = unit === "imperial" ? "block" : "none");

    activeUnit = unit;
    handleInputCheck();
}

function getRelevantInputs(unit) {
    return Array.from(allInputs).filter(input => input.dataset.unit === unit);
}

function areInputsFilled(inputs) {
    return inputs.every(input => {
        const val = input.value.trim();
        return val !== "" && +val > 0;
    });
}

function displayResult({ bmi, message, minIdealWeight, maxIdealWeight }) {
    bmiScoreEl.textContent = bmi;
    classificationEl.textContent = message;
    rangeEl.textContent = `${minIdealWeight}kgs - ${maxIdealWeight}kgs`;

    calculatorInitial.classList.add("hidden");
    calculatorCalculated.classList.remove("hidden");
}

// BMI logic

function calculateBMI(heightCm, weightKg) {
    const heightM = heightCm / 100;
    const bmi = +(weightKg / (heightM ** 2)).toFixed(1);

    const bmiRanges = {
        underweight: 18.5,
        healthy: 24.9,
        overweight: 29.9,
        obeseClass1: 34.9,
        obeseClass2: 39.9,
    };

    let message = "Obese. You have Obesity Class 3.";
    if (bmi <= bmiRanges.underweight) message = "Underweight";
    else if (bmi <= bmiRanges.healthy) message = "a Healthy Weight";
    else if (bmi <= bmiRanges.overweight) message = "Overweight";
    else if (bmi <= bmiRanges.obeseClass1) message = "Obese. You have Obesity Class 1.";
    else if (bmi <= bmiRanges.obeseClass2) message = "Obese. You have Obesity Class 2.";

    const minIdealWeight = +(HEALTHY_MIN_BMI * heightM ** 2).toFixed(1);
    const maxIdealWeight = +(HEALTHY_MAX_BMI * heightM ** 2).toFixed(1);

    return { bmi, message, minIdealWeight, maxIdealWeight };
}

function convertImperialToMetric(inputs) {
    const feet = +inputs.find(i => i.dataset.type === "height-feet")?.value || 0;
    const inch = +inputs.find(i => i.dataset.type === "height-inch")?.value || 0;
    const stone = +inputs.find(i => i.dataset.type === "weight-stone")?.value || 0;
    const pounds = +inputs.find(i => i.dataset.type === "weight-pounds")?.value || 0;

    const heightCm = ((feet * 12) + inch) * 2.54;
    const weightKg = ((stone * 14) + pounds) * 0.453592;

    return { heightCm, weightKg };
}

function extractMetricValues(inputs) {
    const height = +inputs.find(i => i.dataset.type === "height")?.value || 0;
    const weight = +inputs.find(i => i.dataset.type === "weight")?.value || 0;

    return { heightCm: height, weightKg: weight };
}

// Main Input Handler

function handleInputCheck() {
    const inputs = getRelevantInputs(activeUnit);
    if (!areInputsFilled(inputs)) return;

    const { heightCm, weightKg } = activeUnit === "imperial"
        ? convertImperialToMetric(inputs)
        : extractMetricValues(inputs);

    const result = calculateBMI(heightCm, weightKg);
    displayResult(result);
}

// Event Listeners

allInputs.forEach(input => input.addEventListener("input", handleInputCheck));

metricRadioBtn.addEventListener("change", () => toggleUnit("metric"));
imperialRadioBtn.addEventListener("change", () => toggleUnit("imperial"));

document.addEventListener("DOMContentLoaded", () => {
    metricRadioBtn.checked = "true";
    toggleUnit("metric"); //set initial state
});


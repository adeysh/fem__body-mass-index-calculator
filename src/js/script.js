const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");

const biometrics = document.getElementById("biometrics");
const metricFields = biometrics.querySelectorAll(".calculator__form-biometric");
const imperialFields = biometrics.querySelectorAll(".calculator__form-fieldset");

const allInputs = biometrics.querySelectorAll(".calculator__form-number-input");
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

function handleInputCheck() {
    if (metricRadioBtn.checked) {
        const relevantInputs = isAllFilled("metric").relevantInputs;
        if (isAllFilled("metric").filled) {
            const height = parseFloat(relevantInputs.find(input => input.dataset.type === "height")?.value.trim());
            const weight = parseFloat(relevantInputs.find(input => input.dataset.type === "weight")?.value.trim());

            calculateBMI(height, weight);
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

            calculateBMI(heightCm.toFixed(2), weightKg.toFixed(2));
        } else {
            console.log("imperial inputs incomplete");
        }
    }
}

allInputs.forEach(input => {
    input.addEventListener("input", handleInputCheck);
})

function calculateBMI(height, weight) {
    // console.log(height, weight);
    const heightInMeters = height / 100;
    const heightSquared = heightInMeters ** 2;

    const bmi = weight / heightSquared;
    console.log(bmi);
}

document.addEventListener("DOMContentLoaded", () => { metricRadioBtn.checked = "true" });


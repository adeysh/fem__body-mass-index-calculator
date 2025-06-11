const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");

const biometrics = document.getElementById("biometrics");
const metricFields = biometrics.querySelectorAll(".calculator__form-biometric");
const imperialFields = biometrics.querySelectorAll(".calculator__form-fieldset");

imperialRadioBtn.addEventListener("change", () => {
    console.log("changed");
    biometrics.classList.remove("calculator__form-biometrics--metric");

    biometrics.classList.add("calculator__form-biometrics--imperial");
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
    metricFields.forEach(field => {
        field.style.display = "block";
    });
    imperialFields.forEach(field => {
        field.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => { metricRadioBtn.checked = "true" });


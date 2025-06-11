const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");

const biometrics = document.getElementById("biometrics");
const biometricFields = biometrics.querySelectorAll(".calculator__form-biometric");

imperialRadioBtn.addEventListener("change", () => {
    console.log("changed");
    biometrics.classList.toggle("calculator__form-metrics--metric");
    biometrics.classList.toggle("calculator__form-metrics--imperial");
    biometricFields.style.display = "none";
});
import { Calculator } from "./Calculator.js";
/**
 * Main application initialization function.
 * Sets up event listeners, theme handling, and calculator functionality.
 */
function initializeApp() {
    var _a, _b, _c, _d, _e, _f;
    // Handles theme switching between light and dark modes
    function setTheme(isDarkMode) {
        const icon = document.querySelector(".theme-toggle i");
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
        else {
            document.body.classList.remove("dark-mode");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
        localStorage.setItem("isDarkMode", isDarkMode.toString());
    }
    // Get theme preference
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme !== null) {
        setTheme(savedTheme === "true");
    }
    // Show UI
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
    const calculator = new Calculator(document.getElementById("calcInput"));
    // Angle mode toggle (Degrees/Radians)
    const angleModeElement = document.getElementById("angleMode");
    angleModeElement.addEventListener("click", function () {
        calculator.isDegreeMode = !calculator.isDegreeMode;
        this.textContent = calculator.isDegreeMode ? "DEG" : "RAD";
    });
    // Global button click handler for numbers and operations
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const number = button.getAttribute("data-numbers");
            const operation = button.getAttribute("data-operation");
            if (number !== null) {
                calculator.appendNumber(number);
            }
            else if (operation !== null) {
                calculator.handleOperation(operation);
            }
            // to prevent the button from staying focused after click
            button.blur();
        });
    });
    // Theme toggle handler
    (_a = document.querySelector(".theme-toggle")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        const isDarkMode = !document.body.classList.contains("dark-mode");
        setTheme(isDarkMode);
    });
    // Trigonometry dropdown toggle handler
    (_b = document.getElementById("trigToggle")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var _a, _b;
        (_a = document.getElementById("trigDropdown")) === null || _a === void 0 ? void 0 : _a.classList.toggle("show");
        (_b = document
            .querySelector("#trigToggle .fa-chevron-down")) === null || _b === void 0 ? void 0 : _b.classList.toggle("rotate-arrow");
    });
    // History panel show handler
    (_c = document.querySelector('.history-toggle')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (e) {
        const historyPanel = document.querySelector('.history-panel');
        historyPanel.classList.add('show');
        this.style.display = 'none';
        calculator.renderHistory(document.querySelector('.history-list'));
    });
    // History clear handler
    (_d = document.querySelector('.clear-history')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function (e) {
        e.stopPropagation();
        calculator.clearHistory();
    });
    // History item selection handler
    (_e = document.querySelector('.history-list')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function (e) {
        e.stopPropagation();
        const historyItem = e.target.closest('.history-item');
        if (historyItem && !historyItem.classList.contains('no-history')) {
            // Cast to HTMLElement to access dataset
            const expression = historyItem.dataset.expression || "";
            calculator.displayValue = expression;
            calculator.updateDisplay();
        }
    });
    // History panel close handler
    (_f = document.querySelector('.history-close')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
        var _a;
        (_a = document.querySelector('.history-panel')) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
        const historyToggle = document.querySelector('.history-toggle');
        historyToggle.style.display = 'block';
    });
}
// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

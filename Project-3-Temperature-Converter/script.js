document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const input = document.getElementById('temp-input');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const swapBtn = document.getElementById('swap-btn');
    const resultArea = document.getElementById('result-area');
    const displayValue = document.getElementById('output-temp');
    const displayUnit = document.getElementById('output-unit');

    const SYMBOLS = {
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K'
    };

    const performConversion = (val, from, to) => {
        if (from === to) return val;
        let celsius;
        switch (from) {
            case 'fahrenheit': celsius = (val - 32) * 5 / 9; break;
            case 'kelvin': celsius = val - 273.15; break;
            default: celsius = val;
        }
        switch (to) {
            case 'fahrenheit': return (celsius * 9 / 5) + 32;
            case 'kelvin': return celsius + 273.15;
            default: return celsius;
        }
    };

    const updateUI = () => {
        const value = parseFloat(input.value);
        if (input.value.trim() === '' || isNaN(value)) {
            resultArea.classList.remove('active');
            return;
        }
        const result = performConversion(value, fromUnit.value, toUnit.value);
        displayValue.textContent = Number(result.toFixed(4)).toString();
        displayUnit.textContent = SYMBOLS[toUnit.value];
        resultArea.classList.add('active');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        updateUI();
    });

    swapBtn.addEventListener('click', () => {
        const prevFrom = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = prevFrom;
        if (input.value.trim() !== '') updateUI();
    });

    [fromUnit, toUnit].forEach(select => {
        select.addEventListener('change', () => {
            if (input.value.trim() !== '') updateUI();
        });
    });

    input.addEventListener('input', () => {
        if (input.value.trim() === '') resultArea.classList.remove('active');
    });
});

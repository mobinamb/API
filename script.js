const apiKey = '850fefaae3244999d27eaf50'; // API key
let currency = {};

const fetchAPIData = async () => {
    try {
        const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/USD'; // Endpoint URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error', error);
    }
}

const convertButton = document.getElementById('convert');
const exchangeContainer = document.getElementsByClassName('exchange-container')[0];

convertButton.addEventListener('click', async (e) => { //when the convert button is clicked
    e.preventDefault();

    const previousResults = document.getElementsByClassName('currency-data'); // removing the previous results
    while (previousResults.length > 0) {
        previousResults[0].parentNode.removeChild(previousResults[0]);
    }

    //GET
    //getting the information from the user's inputs
    const input = document.getElementById('amount');
    const inputValue = parseFloat(input.value);
    

    const currency_from = document.getElementById("currency-from");
    const currency_from_value = currency_from.value;
    
    const currency_to = document.getElementById("currency-to");
    const currency_to_value = currency_to.value;

    const currencyData = await fetchAPIData(); //getting the rate from the API
    if (currencyData && currencyData.conversion_rates) {
        const fromRate = currencyData.conversion_rates[currency_from_value];
        const toRate = currencyData.conversion_rates[currency_to_value];
        const result = (inputValue / fromRate) * toRate;

        const currencyDiv = document.createElement('div'); //adding a paragraph showing the converted value
        const p1Elem = document.createElement('p');
        p1Elem.textContent = result ? `Converted Amount: ${result}` : 'Conversion Error';
        currencyDiv.appendChild(p1Elem);
        currencyDiv.className = 'currency-data';
        exchangeContainer.appendChild(currencyDiv);
    }
});

//POST
// if the user inserts a currency to be added to the current currencies
document.getElementById('add-currency').addEventListener('click', function() {
    const newCurrencyCode = document.getElementById('new-currency-code').value.toUpperCase();

    // Add to dropdowns if not already present
    if (!document.querySelector(`#currency-from option[value="${newCurrencyCode}"]`)) {
        addCurrencyToDropdowns(newCurrencyCode);
    }

    // Fetch updated rates (assuming you have a function to do this)
    fetchAPIData();

    // Clear the input field
    document.getElementById('new-currency-code').value = '';
});

const addCurrencyToDropdowns = (currencyCode, rates) => {
    if (rates[currencyCode]) {
        const optionFrom = document.createElement('option');
        optionFrom.value = currencyCode;
        optionFrom.textContent = currencyCode;
        document.getElementById('currency-from').appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currencyCode;
        optionTo.textContent = currencyCode;
        document.getElementById('currency-to').appendChild(optionTo);
    } else {
        displayErrorMessage(`Currency code "${currencyCode}" not found.`);
    }
};

//if the currency doesn't exist in the api json file
const displayErrorMessage = (message) => {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;

    // Optional: clear the message after some time
    setTimeout(() => errorDiv.textContent = '', 5000);
};

document.getElementById('add-currency').addEventListener('click', async function() {
    const newCurrencyCode = document.getElementById('new-currency-code').value.toUpperCase();
    document.getElementById('new-currency-code').value = ''; // Clear input field

    const currencyData = await fetchAPIData();
    if (currencyData && currencyData.conversion_rates) {
        addCurrencyToDropdowns(newCurrencyCode, currencyData.conversion_rates);
    }
});


const coinsList = document.getElementById('coins-list');
const exchangesList = document.getElementById('exchanges-list');
const nftsList = document.getElementById('nfts-list');

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');  // Retrieve the 'query' parameter from the URL
    if (query) {
        // If a query exists, fetch the search results
        fetchSearchResult(query, [coinsList, exchangesList, nftsList]);
    } else {
        // If no query is provided, display a message to prompt the user to search
        const searchHeading = document.getElementById('searchHeading');
        const searchContainer = document.querySelector('.search-container');
        searchContainer.innerHTML = `<p style="color: red; text-align: center; margin-bottom: 8px">Nothing To Show...</p>`;
        searchHeading.innerText = 'Please search something...';
    }
});

// Function to fetch search results based on the query parameter
function fetchSearchResult(param, idsToToggle) {
    const searchHeading = document.getElementById('searchHeading');

    // Loop through all elements to toggle the loading spinner
    idsToToggle.forEach(id => {
        const errorElement = document.getElementById(`${id}-error`);

        if (errorElement) {
            errorElement.style.display = 'none';  // Hide any previous error messages
        }
        toggleSpinner(id, `${id}-spinner`, true);  // Show the spinner while fetching data
    });

    // Clear previous results
    coinsList.innerHTML = '';
    exchangesList.innerHTML = '';
    nftsList.innerHTML = '';

    searchHeading.innerText = `Search results for "${param}"`;  // Update the search heading

    const url = `https://api.coingecko.com/api/v3/search?query=${param}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    // Fetch data from the CoinGecko API
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);  // Error handling for bad responses
            }
            idsToToggle.forEach(id => toggleSpinner(id, `${id}-spinner`, false));  // Hide the spinner after fetching data
            return response.json();
        })
        .then(data => {
            // Filter out results with missing thumbnails
            let coins = (data.coins || []).filter(coin => coin.thumb !== "missing_thumb.png");
            let exchanges = (data.exchanges || []).filter(ex => ex.thumb !== "missing_thumb.png");
            let nfts = (data.nfts || []).filter(nf => nf.thumb !== "missing_thumb.png");

            const coinsCount = coins.length;
            const exchangesCount = exchanges.length;
            const nftsCount = nfts.length;

            // Limit results to the smallest dataset size if all types of data are available
            let minCount = Math.min(coinsCount, exchangesCount, nftsCount);

            if (coinsCount > 0 && exchangesCount > 0 & nftsCount > 0) {
                coins = coins.slice(0, minCount);
                exchanges = exchanges.slice(0, minCount);
                nfts = nfts.slice(0, minCount);
            }

            // Display results for each category
            coinsResult(coins);
            exchangesResult(exchanges);
            nftsResult(nfts);

            // Show messages if no results were found for each category
            if (coins.length === 0) {
                coinsList.innerHTML = '<p style="color: red; text-align: center;">No results found for coins.</p>';
            }

            if (exchanges.length === 0) {
                exchangesList.innerHTML = '<p style="color: red; text-align: center;">No results found for exchanges.</p>';
            }

            if (nfts.length === 0) {
                nftsList.innerHTML = '<p style="color: red; text-align: center;">No results found for nfts.</p>';
            }

        })
        .catch(error => {
            // Handle errors by showing an error message
            idsToToggle.forEach(id => {
                toggleSpinner(id, `${id}-spinner`, false);  // Hide the spinner on error
                document.getElementById(`${id}-error`).style.display = 'block';  // Show error message
            });
            console.error('Error fetching data:', error);  // Log error to console
        });
}

// Function to display coins result in a table format
function coinsResult(coins) {
    coinsList.innerHTML = '';  // Clear any previous results

    const table = createTable([
        'Rank', 'Coin'
    ]);  // Create table headers for coins

    coins.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${coin.market_cap_rank}</td>
           <td class="name-column"><img src="${coin.thumb}" alt="${coin.name}"> ${coin.name} <span>(${coin.symbol.toUpperCase()})</span></td>
        `;
        table.appendChild(row);
        row.onclick = () => {
            window.location.href = `../../pages/coin.html?coin=${coin.id}`;  // Navigate to detailed coin page on row click
        };
    });
    coinsList.appendChild(table);  // Append the table to the coins list
}

// Function to display exchanges result in a table format
function exchangesResult(exchanges) {
    exchangesList.innerHTML = '';  // Clear any previous results

    const table = createTable([
        'Exchange', 'Market'
    ]);  // Create table headers for exchanges

    exchanges.forEach(ex => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td class="name-column"><img src="${ex.thumb}" alt="${ex.name}"> ${ex.name}</td>
           <td>${ex.market_type}</td>
        `;
        table.appendChild(row);
    });
    exchangesList.appendChild(table);  // Append the table to the exchanges list
}

// Function to display NFTs result in a table format
function nftsResult(nfts) {
    nftsList.innerHTML = '';  // Clear any previous results

    const table = createTable([
        'NFT', 'Symbol'
    ]);  // Create table headers for NFTs

    nfts.forEach(nf => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td class="name-column"><img src="${nf.thumb}" alt="${nf.name}"> ${nf.name}</td>
           <td class="name-column">${nf.symbol}</td>
        `;
        table.appendChild(row);
    });
    nftsList.appendChild(table);  // Append the table to the NFTs list
}

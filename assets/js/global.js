const coinsCount = document.getElementById('coins-count');
const exchangesCount = document.getElementById('exchanges-count');
const marketCap = document.getElementById('marketCap');
const marketCapChangeElement = document.getElementById('marketCapChange');
const volume = document.getElementById('volume');
const dominance = document.getElementById('dominance');

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if a theme is saved in localStorage and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.id = savedTheme;
        updateIcon(savedTheme);
    }

    // Toggle theme between light and dark
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.id === 'light-theme') {
                body.id = 'dark-theme';
                localStorage.setItem('theme', 'dark-theme');
                updateIcon('dark-theme');
            } else {
                body.id = 'light-theme';
                localStorage.setItem('theme', 'light-theme');
                updateIcon('light-theme');
            }

            // Reinitialize widget if necessary
            if (typeof initializeWidget === 'function') {
                initializeWidget();
            }
        });
    }

    function updateIcon(currentTheme) {
        if (currentTheme === 'light-theme') {
            themeToggle.classList.remove('ri-moon-line');
            themeToggle.classList.add('ri-sun-line');
        } else {
            themeToggle.classList.remove('ri-sun-line');
            themeToggle.classList.add('ri-moon-line');
        }
    }

    // Search form functionality
    const form = document.getElementById('searchForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('searchInput').value.trim();
            if (!query) return;

            window.location.href = `../../pages/search.html?query=${query}`;
        });
    }

    // Menu opening and closing functionality
    const openMenuBtn = document.getElementById('openMenu');
    const overlay = document.querySelector('.overlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', () => {
            overlay.classList.add('show');
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    }

    fetchGlobal();
});

// Functions for local storage handling
function getLocalStorageData(key) {
    const storedData = localStorage.getItem(key);
    if (!storedData) return null;

    const parsedData = JSON.parse(storedData);
    const currentTime = Date.now();
    if (currentTime - parsedData.timestamp > 300000) {
        localStorage.removeItem(key);
        return null;
    }
    return parsedData.data;
}

function setLocalStorageData(key, data) {
    const storedData = {
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(key, JSON.stringify(storedData));
}

// Fetch global data with a timeout mechanism
function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
}

function fetchGlobal() {
    const localStorageKey = 'Global_Data';
    const localData = getLocalStorageData(localStorageKey);

    if (localData) {
        displayGlobalData(localData);
    } else {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetchWithTimeout('https://api.coingecko.com/api/v3/global', options)
            .then(response => response.json())
            .then(data => {
                const globalData = data.data;
                displayGlobalData(globalData);
                setLocalStorageData(localStorageKey, globalData);
            })
            .catch(error => {
                coinsCount.textContent = 'N/A';
                exchangesCount.textContent = 'N/A';
                marketCap.textContent = 'N/A';
                marketCapChangeElement.textContent = 'N/A';
                volume.textContent = 'N/A';
                dominance.textContent = 'BTC N/A% - ETH N/A%';
                console.error(error);
            });
    }
}

// Display global data function
function displayGlobalData(globalData) {
    coinsCount.textContent = globalData.active_cryptocurrencies || 'N/A';
    exchangesCount.textContent = globalData.markets || 'N/A';

    marketCap.textContent = globalData.total_market_cap?.usd ? `$${(globalData.total_market_cap.usd / 1e12).toFixed(3)}T` : 'N/A';
    const marketCapChange = globalData.market_cap_change_percentage_24h_usd;

    if (marketCapChange !== undefined) {
        const changeText = `${marketCapChange.toFixed(1)}%`;
        marketCapChangeElement.innerHTML = `${changeText} <i class="${marketCapChange < 0 ? 'red' : 'green'} ri-arrow-${marketCapChange < 0 ? 'down' : 'up'}-s-fill"></i>`;
        marketCapChangeElement.style.color = marketCapChange < 0 ? 'red' : 'green';
    } else {
        marketCapChangeElement.textContent = 'N/A';
    }

    volume.textContent = globalData.total_volume?.usd ? `$${(globalData.total_volume.usd / 1e9).toFixed(3)}B` : 'N/A';

    const btcDominance = globalData.market_cap_percentage?.btc ? `${globalData.market_cap_percentage.btc.toFixed(1)}%` : 'N/A';
    const ethDominance = globalData.market_cap_percentage?.eth ? `${globalData.market_cap_percentage.eth.toFixed(1)}%` : 'N/A';
    dominance.textContent = `BTC ${btcDominance} - ETH ${ethDominance}`;
}

// Toggle spinner visibility
function toggleSpinner(listId, spinnerId, show) {
    const listElement = document.getElementById(listId);
    const spinnerElement = document.getElementById(spinnerId);

    if (spinnerElement) {
        spinnerElement.style.display = show ? 'block' : 'none';
    }
    if (listElement) {
        listElement.style.display = show ? 'none' : 'block';
    }
}

// Create a table dynamically
function createTable(headers, fixedIndex = 0) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    table.appendChild(thead);

    const headerRow = document.createElement('tr');
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        if (index === fixedIndex) {
            th.classList.add('table-fixed-column');
        }
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    return table;
}

// Create and initialize a widget
function createWidget(containerId, widgetConfig, widgetSrc) {
    const container = document.getElementById(containerId);

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.classList.add('tradingview-widget-container__widget');
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = widgetSrc;
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig);
    container.appendChild(script);

    setTimeout(() => {
        const copyright = document.querySelector('.tradingview-widget-copyright');
        if (copyright) {
            copyright.classList.remove('hidden');
        }
    }, 5000);
}

// Scroll to top button functionality
const scrollTopBtn = document.getElementById("scrollTop");
window.onscroll = () => {
    scrollFunction();
};

function scrollFunction() {
    scrollTopBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "flex" : "none";
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}

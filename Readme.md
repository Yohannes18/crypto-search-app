## 📊 Crypto Search Application

This is a web-based application that allows users to search for information on various cryptocurrencies, exchanges, and NFTs using the CoinGecko API. The application displays search results in an organized table format, providing details on each coin, exchange, or NFT. 

Credit: Built following tutorials by **AsmrProg YT**.

### 🚀 Features

- **Dynamic Search**: Users can search for cryptocurrencies, exchanges, and NFTs by name.
- **Real-Time Data**: Fetches data from the CoinGecko API to provide the latest information.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Theme Toggle**: Light and dark theme support with local storage to remember the user's preference.
- **Error Handling**: Proper error messages are displayed if there are no results or if the API fails.

### 📂 Project Structure

```
.
├── index.html                # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css        # Global CSS styles
|   ├── js/
|   │   ├── script.js         # Main JavaScript file
|   │   ├── chart.js          # JavaScript for chart functionalities
|   │   ├── global.js         # JavaScript for global functionalities
|   │   ├── search.js         # JavaScript for search functionalities
|   |   └── coin.js           # JavaScript for individual coin functionalities
|   └── images/               # Images used in the application
└── README.md                 # Documentation file
```

### 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yohannes18/crypto-search-app.git
   cd crypto-search-app
   ```

2. **Open `index.html` in your web browser:**
   Simply open the `index.html` file in any modern browser.

### 📝 Usage

1. **Search for Coins, Exchanges, or NFTs:**
   - Enter a keyword in the search bar and press Enter or click the search button.
   - The application will display results for cryptocurrencies, exchanges, or NFTs that match the search query.

2. **Theme Toggle:**
   - Click the theme toggle button to switch between light and dark themes. The chosen theme will be saved for future visits.

3. **Scroll to Top:**
   - A "Scroll to Top" button will appear when scrolling down the page. Click it to quickly return to the top.

### 📦 Dependencies

- [CoinGecko API](https://www.coingecko.com/en/api): Used for fetching real-time cryptocurrency data.
- **Icons**: Uses Remix Icon for theme toggle icons.
  
### ⚙️ API Configuration

- The application uses the [CoinGecko API](https://www.coingecko.com/en/api) for data retrieval. No API key is required, but be mindful of the API's rate limits.

### 🎨 Styling

- The application uses basic CSS for styling. You can modify `assets/css/styles.css` to customize the look and feel of the app.

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Open a pull request

### 🐛 Reporting Issues

If you encounter any issues, please [open an issue](https://github.com/Yohannes18/crypto-search-app/issues) on GitHub.

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 💬 Contact

- **Email**: johannes0590@gmail.com
- **GitHub**: [@Yohannes18](https://github.com/Yohannes18)

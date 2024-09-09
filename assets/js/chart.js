function getThemeCongig(){
    const root = getComputedStyle(document.documentElement);
    const isDarkTheme = localStorage.getItem('theme') === 'light-theme' ? false : true;

    const backgroundColor = root.getPropertyValue(isDarkTheme ? '--chart-dark-bg' : '--chart-light-bg').trim();
    const gridColor = root.getPropertyValue(isDarkTheme ? '--chart-dark-border' : '--chart-light-border').trim();

    return {
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "4H",
        timezone: "Etc/UTC",
        theme: isDarkTheme ? 'dark' : 'light',
        style: "1",
        locale: "en",
        backgroundColor: backgroundColor,
        gridColor: gridColor,
        withdateranges: true,
        range: "YTD",
        details: true,
        container_id: "chart-widget",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        save_image: true,

        
        details: true,
        hotlist: true,
        calendar: false,
       
        support_host: "https://www.tradingview.com"
    };
}

function initializeWidget() {
    const widgetConfig = getThemeCongig();
    createWidget('chart-widget', widgetConfig, 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js');
}

initializeWidget();
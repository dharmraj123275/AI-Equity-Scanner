async function scanMarket() {

    document.getElementById("lastScan").innerHTML =
        new Date().toLocaleTimeString();

    const buyList = document.getElementById("buyList");
    const sellList = document.getElementById("sellList");

    buyList.innerHTML = "Scanning...";
    sellList.innerHTML = "Scanning...";

    try {

        const response = await fetch("stocks.json");
        const stocks = await response.json();

        let buyHTML = "";
        let sellHTML = "";

        stocks.forEach(stock => {

            let color =
                stock.score >= 90 ? "#00ff66" :
                stock.score >= 80 ? "#66ff00" :
                "#ffd700";

            let card = `
            <div class="stock">
                <h3 style="color:${color};">✅ ${stock.symbol}</h3>
                <p>AI Score : ${stock.score}%</p>
                <p>Sector : ${stock.sector}</p>
                <p>RSI : ${stock.rsi}</p>
                <p>Volume : ${stock.volume}</p>
                <p>Entry : ₹${stock.entry}</p>
                <p>Target : ₹${stock.target}</p>
                <p>Stop Loss : ₹${stock.sl}</p>
                <p style="color:${color};font-weight:bold;">
                    ${stock.signal}
                </p>
            </div>
            `;

            if (stock.signal.includes("BUY")) {
                buyHTML += card;
            } else {
                sellHTML += card;
            }

        });

        if (buyHTML === "")
            buyHTML = "<p>No BUY Signals</p>";

        if (sellHTML === "")
            sellHTML = "<p>No SELL Signals</p>";

        buyList.innerHTML = buyHTML;
        sellList.innerHTML = sellHTML;

    }

    catch (e) {

        buyList.innerHTML = "❌ stocks.json not found";
        sellList.innerHTML = "";

        console.log(e);

    }

}

function searchStock() {

    let input = document
        .getElementById("searchBox")
        .value
        .toUpperCase();

    let cards = document.getElementsByClassName("stock");

    for (let i = 0; i < cards.length; i++) {

        let txt = cards[i].innerText.toUpperCase();

        if (txt.indexOf(input) > -1)
            cards[i].style.display = "";
        else
            cards[i].style.display = "none";

    }

}

scanMarket();

setInterval(scanMarket,30000);

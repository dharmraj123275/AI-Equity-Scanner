async function scanMarket() {

    document.getElementById("lastScan").innerHTML =
        new Date().toLocaleTimeString();

    const buyList = document.getElementById("buyList");
    const sellList = document.getElementById("sellList");

    buyList.innerHTML = "Scanning...";
    sellList.innerHTML = "Scanning...";

    try{

        const response = await fetch("stocks.json");

        const stocks = await response.json();

        let buyHTML = "";
        let sellHTML = "";

        stocks.forEach(stock=>{

            if(stock.signal==="BUY"){

                buyHTML += `
                <div class="stock">
                    <h3>✅ ${stock.symbol}</h3>
                    <p>AI Score : ${stock.score}%</p>
                    <p>Sector : ${stock.sector}</p>
                    <p class="buy">🟢 STRONG BUY</p>
                </div>
                `;
            }

            if(stock.signal==="SELL"){

                sellHTML += `
                <div class="stock">
                    <h3>❌ ${stock.symbol}</h3>
                    <p>AI Score : ${stock.score}%</p>
                    <p>Sector : ${stock.sector}</p>
                    <p style="color:#ff4d4d;font-weight:bold;">🔴 STRONG SELL</p>
                </div>
                `;
            }

        });

        if(buyHTML===""){
            buyHTML="<p>No BUY Signals</p>";
        }

        if(sellHTML===""){
            sellHTML="<p>No SELL Signals</p>";
        }

        buyList.innerHTML=buyHTML;
        sellList.innerHTML=sellHTML;

    }catch(error){

        buyList.innerHTML="❌ stocks.json not found";
        sellList.innerHTML="";

        console.log(error);

    }

}

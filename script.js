const Stocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];
let selectedStock = 'AAPL';
let stocksProfileData;
let stocksStatsData;
async function getStockList() {
  let response = await fetch(
    "https://stocks3.onrender.com/api/stocks/getstockstatsdata"
  );
  let result = await response.json();
  stocksStatsData = result["stocksStatsData"][0];
  Stocks.forEach((element) => {
    displayStockList(
      element,
      stocksStatsData[`${element}`]["bookValue"],
      stocksStatsData[`${element}`]["profit"]
    );
    getStockDetails(Stocks[0]);
  });
}
async function getStockDetails(stockName) {
    let result;
    let response;
    if(stocksProfileData == undefined){
      try {
        response = await fetch(
            "https://stocks3.onrender.com/api/stocks/getstocksprofiledata"
          );
          result = await response.json();
          stocksProfileData = result["stocksProfileData"][0];

        
    } catch (error) {
        console.error('error in get stock details');        
    }
    }

  displayStockDetails(stockName, stocksStatsData[`${stockName}`]["profit"], stocksStatsData[`${stockName}`]['bookValue'], stocksProfileData[`${stockName}`]['summary']);
}
function displayStockList(stockName, bookValue, profit) {
  const list = document.getElementById("stock-list");
  let color = "";
  if (profit <= 0) {
    color = "red";
  } else {
    color = "green";
  }
  const listItem = `            
    <li class="stock-list-item ${color}">
    <button class="list-button" onclick="renderUpdate('${stockName}')">
        ${stockName}
    </button>
    <span class="stock-price">$${bookValue}</span>
    <span class="stock-percentage">${profit.toFixed(2)}%</span>
    </li>`;
  list.insertAdjacentHTML("beforeend", listItem);
}
function displayStockDetails(stockName, profit, price, description) {
  const detailDiv = document.getElementById('detail-section');
  detailDiv.textContent = "";
  let color = "";
  if (profit <= 0) {
    color = "red";
  } else {
    color = "green";
  }
  const details = `    
    <div id="basic-info">
        <!-- ds stands for detail section -->
        <span id="stock-name-ds">
            ${stockName}
        </span>
        <span id="stock-percentage-ds" class="${color}">
            ${profit}%
        </span>
        <span id="stock-price-ds">
            $${price}
        </span>
    </div>
    <div id="description">
    ${description}
    </div>
`;
    detailDiv.insertAdjacentHTML('beforeend', details);
}
function renderUpdate(stockName){
    selectedStock = stockName;
    // getStockDetails(stockName);
  displayStockDetails(stockName, stocksStatsData[`${stockName}`]["profit"], stocksStatsData[`${stockName}`]['bookValue'], stocksProfileData[`${stockName}`]['summary']);
  destroyChart(currChart);
  displayChart(stockName);
    
}



function runWebsite(){
  getStockList();
  getChartDetails('AAPL');
}
runWebsite();


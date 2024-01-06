
const ctx = document.getElementById('myChart');
let currChart;
const timeData = {
  '1mo': '1 month',
  '3mo':'3 months',
  '1y' : '1 year', 
  '5y': '5 years'
};
let stockChartData;    
async function getChartDetails( time='1mo'){
    fetch('https://stocks3.onrender.com/api/stocks/getstocksdata')
    .then(response =>{
        if(!response.ok){
            throw new Error('Oops some error occured');
        }
        return response.json();
    })
    .then(result =>{
        stockChartData = result['stocksData'][0];
        displayChart('AAPL','1mo',stockChartData);
    })
    .catch(err=>{
        console.error(err);
    });
}
function displayChart(stockName, time='1mo',Input=stockChartData){
  ctx.innerText = "";
  let dataInput  = Input[`${stockName}`];
  const temp = new Chart(ctx, {
        type: 'line',
        data: {
          labels:dataInput[`${time}`]['timeStamp'],
          datasets: [{
            fill:false,
            label:timeData[`${time}`],
            data: dataInput[`${time}`]['value'],
            borderWidth: 1,
          },
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }, 
        }
      });
      currChart = temp;

}
function destroyChart(chart){
  chart.destroy();
}
function updateChart(newTime){
  console.log(newTime);
  destroyChart(currChart);
  displayChart(selectedStock,  newTime);
}


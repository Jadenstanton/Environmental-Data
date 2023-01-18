chartIt();

async function chartIt(){
  const data = await getData();
  const ctx = document.getElementById('chart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.result,
      datasets: [
        {
        label: 'Yearly Deforestation 1990',
        data: data.ylabels1990,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)'
        },
        {
        label: 'Yearly Deforestation 2000',
        data: data.ylabels2000,
        borderWidth: 2,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)'
        },
        {
        label: 'Yearly Deforestation 2010',
        data: data.ylabels2010,
        borderWidth: 2,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)'
        },
        {
        label: 'Yearly Deforestation 2015',
        data: data.ylabels2015,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 205, 86)'
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Global Yearly Deforestation'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true
        },
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
                return Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]) + ' Hectacres';
            }
          },
          stacked: true,
          beginAtZero: true
        }
      }
    }
  })
};
 
async function getData(){
const xlabels = [];
const years = [];
const ylabels1990 = [];
const ylabels2000 = [];
const ylabels2010 = [];
const ylabels2015 = [];
const result = [];

const response = await fetch('annual-deforestation.csv');
const data = await response.text();

const table = data.split('\n').slice(1);
table.forEach(row => {
  const cols = row.split(',');
  const country = cols[0];
  const year = cols[2];
  const hectacres = cols[3];
  years.push(year);
  xlabels.push(country);
    if(year == '1990'){ylabels1990.push(hectacres)};
    if(year == '2000'){ylabels2000.push(hectacres)};
    if(year == '2010'){ylabels2010.push(hectacres)};
    if(year == '2015'){ylabels2015.push(hectacres)};
})

xlabels.forEach((item, index) => { if (result.indexOf(item) === -1) result.push(item) });

return {result,years, ylabels1990, ylabels2000, ylabels2010, ylabels2015};
}
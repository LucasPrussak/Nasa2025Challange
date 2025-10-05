async function getData() {
  try {
    const response = await fetch("https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle-indices.json");
    var data = await response.json();
    data = data.filter(item => item["time-tag"] >= "2010-01");
    console.log("Data:", data);
    
    const labels = data.map(item => item["time-tag"]);
    const valores = data.map(item => item["ssn"]);

    grafico(labels,valores);
    

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();

function grafico(labels, valores) {
    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: valores,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


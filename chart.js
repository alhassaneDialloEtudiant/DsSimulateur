export function genererGraphique(amortissement) {
  const ctx = document.getElementById('amortissementChart').getContext('2d');
  const labels = amortissement.map((_, index) => index + 1);
  const dataCapitalAmorti = amortissement.map(item => item.capitalAmorti);
  const dataInteret = amortissement.map(item => item.interet);
  const dataCapitalRestantDu = amortissement.map(item => item.capitalRestantDu);

  return new Chart(ctx, {
    type: 'bar', // Changer le type de graphique en 'bar' pour un diagramme en bâtons
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Capital Amorti',
          data: dataCapitalAmorti,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Intérêts',
          data: dataInteret,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Capital Restant Dû',
          data: dataCapitalRestantDu,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Amortissement du Prêt'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Période'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Montant (€)'
          },
          ticks: {
            beginAtZero: true // Commencer l'axe Y à zéro
          }
        }]
      }
    }
  });
}
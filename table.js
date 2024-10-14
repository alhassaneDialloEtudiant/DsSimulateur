export function remplirTableau(amortissement) {
  let totalCapitalAmorti = 0;
  let totalInteret = 0;
  let totalRemboursementMensuel = 0;
  let dernierCapitalRestantDu = 0;

  let html = `<thead>
    <tr>
      <th>Période</th>
      <th>Capital Amorti</th>
      <th>Intérêts</th>
      <th>Capital restant dû</th>
      <th>Mensualité</th>
    </tr>
  </thead>`;
  
  amortissement.forEach(({ remboursementMensuel, capitalAmorti, interet, capitalRestantDu }, index) => {
    totalCapitalAmorti += capitalAmorti;
    totalInteret += interet;
    totalRemboursementMensuel += remboursementMensuel;
    dernierCapitalRestantDu = capitalRestantDu; // Mettre à jour à chaque itération

    html += `
      <tr class="${Math.round(capitalAmorti) < Math.round(interet) ? "table-warning" : ""}">
        <td>${index + 1}</td>
        <td>${capitalAmorti.toFixed(2)}</td>
        <td>${interet.toFixed(2)}</td>
        <td>${capitalRestantDu.toFixed(2)}</td>
        <td>${remboursementMensuel.toFixed(2)}</td>
      </tr>
    `;
  });

  // Ajouter la ligne de total
  html += `
    <tr class="font-weight-bold">
      <td>Total</td>
      <td>${totalCapitalAmorti.toFixed(2)}</td>
      <td>${totalInteret.toFixed(2)}</td>
      <td>${dernierCapitalRestantDu.toFixed(2)}</td>
      <td>${totalRemboursementMensuel.toFixed(2)}</td>
    </tr>
  `;

  document.getElementById("tableAmortissement").innerHTML = html;
}
function getValues() {
    const inputMontant = document.getElementById('inputMontant');
    const inputTaux = document.getElementById('inputTaux');
    const inputAnnee = document.getElementById('inputAnnee');
  
    let montant = Math.abs(inputMontant.valueAsNumber) || 0;
    let annee = Math.abs(inputAnnee.valueAsNumber) || 0;
    let mois = annee * 12 || 1;
    let taux = Math.abs(inputTaux.valueAsNumber) || 0;
    let tauxMensuel = taux / 100 / 12;
  
    return { montant, annee, mois, taux, tauxMensuel };
  }
  
  function calculMensualite(montant, tauxMensuel, mois) {
    if (tauxMensuel) {
      return montant * tauxMensuel / (1 - Math.pow(1 / (1 + tauxMensuel), mois));
    } else {
      return montant / mois;
    }
  }
  
  function calculAmortissement(montant, tauxMensuel, mois, annee) {
    let remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
    let balance = montant;
    let amortissementM = [];
  
    for (let y = 0; y < annee; y++) {
      for (let m = 0; m < 12; m++) {
        let interestM = balance * tauxMensuel;
        let montantM = remboursementMensuel - interestM;
        balance -= montantM;
        amortissementM.push({
          remboursementMensuel,
          capitalAmorti: montantM,
          interet: interestM,
          capitalRestantDu: balance
        });
      }
    }
  
    return { remboursementMensuel, amortissementM };
  }
  
  function remplirTableau(amortissement) {
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
      html += `
        <tr class="${Math.round(capitalAmorti) < Math.round(interet) ? "warning" : ""}">
          <td>${index + 1}</td>
          <td>${capitalAmorti.toFixed(2)}</td>
          <td>${interet.toFixed(2)}</td>
          <td>${capitalRestantDu.toFixed(2)}</td>
          <td>${remboursementMensuel.toFixed(2)}</td>
        </tr>
      `;
    });
    document.getElementById("tableAmortissement").innerHTML = html;
  }
  
  Array.from(document.querySelectorAll('input')).forEach(input => {
    input.addEventListener("input", function() {
      let { montant, tauxMensuel, mois, annee } = getValues();
      let { remboursementMensuel, amortissementM } = calculAmortissement(montant, tauxMensuel, mois, annee);
  
      document.getElementById('inputMensualite').innerHTML = `<strong>Mensualité :</strong> ${remboursementMensuel.toFixed(2)} €`;
      remplirTableau(amortissementM);
    }, false);
  });
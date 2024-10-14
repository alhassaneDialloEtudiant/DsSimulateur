import { getValues, calculMensualite, calculAmortissement } from './calculation.js';
import { remplirTableau } from './table.js';
import { genererGraphique } from './chart.js';

let chartInstance = null; // Variable globale pour stocker l'instance du graphique

document.getElementById('formulaire-simulateur').addEventListener('input', function(event) {
  if (event.target.matches('input')) {
    let { montant, tauxMensuel, mois, annee } = getValues();
    let { remboursementMensuel, amortissementM } = calculAmortissement(montant, tauxMensuel, mois, annee);

    document.getElementById('inputMensualite').innerHTML = `<strong>Mensualité :</strong> ${remboursementMensuel.toFixed(2)} €`;
    remplirTableau(amortissementM);

    // Mettre à jour le graphique
    if (chartInstance) {
      chartInstance.destroy(); // Détruire l'ancien graphique
    }
    chartInstance = genererGraphique(amortissementM); // Créer un nouveau graphique
  }
});
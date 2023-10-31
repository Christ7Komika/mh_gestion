export function restDate(date2: string): number | string {
  const date1Obj = new Date(Date.now());
  const date2Obj = new Date(date2);

  const differenceEnMillisecondes = date2Obj.getTime() - date1Obj.getTime();
  const joursRestants = differenceEnMillisecondes / (1000 * 60 * 60 * 24);

  if (joursRestants < 0) {
    return "Expiré";
  } else {
    return Number(joursRestants.toFixed(0));
  }
}

export function duration(dateDebut: Date, dateFin: Date): number {
  const ms = dateFin.getTime() - dateDebut.getTime();
  const years = 1000 * 60 * 60 * 24 * 365.25;
  const duration = ms / years;
  return Math.ceil(duration);
}

export function dateDelay(dateDebut: Date, dateFin: Date): string {
  const differenceEnMilliseconds: number = Math.abs(
    dateFin.getTime() - dateDebut.getTime()
  );
  const millisecondsDansUneHeure: number = 60 * 60 * 1000;
  const millisecondsDansUnJour: number = 24 * millisecondsDansUneHeure;
  const millisecondsDansUnMois: number = 30 * millisecondsDansUnJour;
  const millisecondsDansUneAnnee: number = 365 * millisecondsDansUnJour;

  if (differenceEnMilliseconds >= millisecondsDansUneAnnee) {
    const annees: number = Math.floor(
      differenceEnMilliseconds / millisecondsDansUneAnnee
    );
    return `${annees} an${annees > 1 ? "s" : ""}`;
  } else if (differenceEnMilliseconds >= millisecondsDansUnMois) {
    const mois: number = Math.floor(
      differenceEnMilliseconds / millisecondsDansUnMois
    );
    return `${mois} mois`;
  } else if (differenceEnMilliseconds >= millisecondsDansUnJour) {
    const jours: number = Math.floor(
      differenceEnMilliseconds / millisecondsDansUnJour
    );
    return `${jours} jour${jours > 1 ? "s" : ""}`;
  } else {
    const heures: number = Math.floor(
      differenceEnMilliseconds / millisecondsDansUneHeure
    );
    return `${heures} heure${heures > 1 ? "s" : ""}`;
  }
}

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
export function isExpired(date2: string): boolean {
  const date1Obj = new Date(Date.now());
  const date2Obj = new Date(date2);

  const differenceEnMillisecondes = date2Obj.getTime() - date1Obj.getTime();
  const joursRestants = differenceEnMillisecondes / (1000 * 60 * 60 * 24);

  if (joursRestants < 0) {
    return true;
  } else {
    return false;
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

export function getMessageForDateRange(startDate: Date, endDate: Date): string {
  const now = new Date();
  if (now < startDate) {
    let timeDiff = startDate.getTime() - now.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée
    const oneMonth = 30 * oneDay; // Environ 30 jours par mois
    const oneYear = 365 * oneDay; // Environ 365 jours par an

    let message = "Dans ";
    if (timeDiff >= oneYear) {
      const years = Math.floor(timeDiff / oneYear);
      message += `${years} an${years > 1 ? "s" : ""}`;
      timeDiff %= oneYear;
    }
    if (timeDiff >= oneMonth) {
      const months = Math.floor(timeDiff / oneMonth);
      message += `${months > 0 ? " et " : ""}${months} mois`;
      timeDiff %= oneMonth;
    }
    const days = Math.floor(timeDiff / oneDay);
    message += `${days > 0 ? " et " : ""}${days} jour${days > 1 ? "s" : ""}`;

    return message;
  } else if (now.toDateString() === endDate.toDateString()) {
    return "Expire aujourd'hui";
  } else if (now < endDate) {
    let timeDiff = endDate.getTime() - now.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée
    const oneMonth = 30 * oneDay; // Environ 30 jours par mois
    const oneYear = 365 * oneDay; // Environ 365 jours par an

    let message = "Expire dans ";
    if (timeDiff >= oneYear) {
      const years = Math.floor(timeDiff / oneYear);
      message += `${years} an${years > 1 ? "s" : ""}`;
      timeDiff %= oneYear;
    }
    if (timeDiff >= oneMonth) {
      const months = Math.floor(timeDiff / oneMonth);
      message += `${months > 0 ? " et " : ""}${months} mois`;
      timeDiff %= oneMonth;
    }
    const days = Math.floor(timeDiff / oneDay);
    message += `${days > 0 ? " et " : ""}${days} jour${days > 1 ? "s" : ""}`;

    return message;
  } else {
    return "Expiré";
  }
}

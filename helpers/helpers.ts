import { dateDelay } from "@/lib/helpers";
import { subDays, isBefore, isAfter, isEqual } from "date-fns";

interface Element {
  id: string;
  startDate: string;
  endDate: string;
  file?: string;
  document?: string;
  isNew: boolean;
  otherDocumentType?: {
    name: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  };
}
export interface ElementStatus {
  id: string;
  employee: string;
  status: number;
  file: string;
  isNew: boolean;
  section: string;
  startDate: string;
  endDate: string;
  delay?: string;
}

export function getExpirationStatus(
  elements: Element[],
  section: string
): ElementStatus[] {
  const currentDate = new Date();
  const result: ElementStatus[] = [];

  for (const element of elements) {
    if (element.endDate) {
      const endDate = new Date(element.endDate);
      const endDateMinus10Days = subDays(endDate, 10);
      let status = -1;

      if (
        isBefore(currentDate, endDate) &&
        isAfter(currentDate, endDateMinus10Days)
      ) {
        status = 2; // Expired in 10 days
      } else if (isEqual(currentDate, endDate)) {
        status = 1; // Expired today
      } else if (isAfter(currentDate, endDate)) {
        status = 0; // Is expired
      } else if (isBefore(currentDate, endDateMinus10Days)) {
        status = -2;
      }

      const isValid = element.startDate && element.endDate ? true : false;

      result.push({
        id: element.id,
        status,
        employee: `${element.employee.firstName} ${element.employee.lastName}`,
        section:
          section === "document" && element.otherDocumentType
            ? element.otherDocumentType.name
            : section,
        file: element.file
          ? element.file
          : element.document
          ? element.document
          : "",
        isNew: element.isNew,
        startDate: element.startDate,
        endDate: element.endDate,
        delay: isValid
          ? dateDelay(new Date(element.startDate), new Date(element.endDate))
          : "inconnu",
      });
    }
  }

  return result;
}

export function cut(text: string, limit: number): string {
  if (text.length > limit) return text.substring(0, limit) + "...";
  return text;
}

function getAge(birthday: Date): string {
  const now = new Date();
  const anneeActuelle = now.getFullYear();
  const birthYears = birthday.getFullYear();

  let age = anneeActuelle - birthYears;

  // Vérifier si l'anniversaire de la personne est déjà passé cette année
  const month = now.getMonth();
  const monthBirth = birthday.getMonth();

  if (
    month < monthBirth ||
    (month === monthBirth && now.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return `${age} an${age > 1 ? "s" : ""}`;
}

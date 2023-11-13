# AJOUTER LE NOMBRE DE SANCTION, CONGES ET AUTRES RECU

# POUVOIR COMPTABILISER CA PAR RAPPORT AU CALENDRIER

# CORRIGER CONTRAT NOMBRE DE CONTRAT EN COUR ET TERMINÉ

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function supprimerUtilisateurAvecCascade(userId: number) {
await prisma.$transaction(async (transaction) => {
// Supprimer l'utilisateur
await transaction.utilisateur.delete({
where: {
id: userId,
},
});

    // Supprimer d'autres éléments liés à l'utilisateur
    await transaction.profilUtilisateur.deleteMany({
      where: {
        utilisateurId: userId,
      },
    });

    // Ajoutez d'autres suppressions en cascade selon vos relations de base de données

    // N'oubliez pas de gérer les erreurs et de faire un rollback si nécessaire

});
}

// Exemple d'utilisation
const userIdToDelete = 1;
supprimerUtilisateurAvecCascade(userIdToDelete)
.catch((erreur) => {
console.error(erreur);
})
.finally(async () => {
await prisma.$disconnect();
});

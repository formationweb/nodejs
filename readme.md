Ajouter une fonctionnalité de suivi d'utilisateurs à l'API

Objectif

Créer un point de terminaison qui permet à un utilisateur de suivre un autre utilisateur. Utilisez Zod pour valider les entrées afin d'assurer la sécurité des données.

1. Créer le schéma de validation pour le suivi (followSchema)

Définissez un schéma followSchema avec Zod pour valider les données de suivi. Les données de suivi doivent inclure :

followerId : ID de l'utilisateur qui suit (doit être un entier positif).

> z.number().int().positive()

followeeId : ID de l'utilisateur suivi (doit être un entier positif).

2. Créer le point de terminaison pour suivre un utilisateur

Implémentez un point de terminaison POST `/follow` qui permet à un utilisateur de suivre un autre utilisateur

Puisqu’on nous n’avons pas de base de données, avoir juste un 

const follows = [];

en haut du fichier

* Validez les données de la requête avec followSchema.
* Vérifiez que les IDs des utilisateurs existent avant d'ajouter un suivi.
* En cas de succès, renvoyez les données de suivi avec un statut HTTP 204.
* En cas d'erreur de validation ou si les utilisateurs n'existent pas, renvoyez un message d'erreur approprié avec un statut HTTP 400 ou 404.

3.  Tester /follow avec Vitest

Créez des tests unitaires pour le point de terminaison POST /follow en utilisant Vitest. Assurez-vous de tester les cas suivants :

* Suivi réussi d'un utilisateur.
* Erreur de validation lorsque les données sont incorrectes.
* Erreur lorsque l'utilisateur qui suit ou l'utilisateur suivi n'existe pas.
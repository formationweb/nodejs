1. Tests pour "/api/posts":
  * Test de Récupération de Tous les Messages: Vérifiez que la requête GET sur /api/posts retourne tous les messages.
  * Test de Recherche par Titre: Testez la fonctionnalité de recherche sur /api/posts?search=mot-clé. Assurez-vous que les posts contenant le mot-clé dans le titre sont retournés.
  * 
2. Tests pour "/api/posts/:postId":
  * Test de Récupération d'un Message Spécifique: Créez un test pour s'assurer que la requête GET avec un postId valide retourne le post correspondant.
  * Test de Gestion des Erreurs: Testez la réponse de l'API lorsque le postId n'existe pas, s'attendant à une erreur 404.
* 
1. Tests pour "/api/users/:userId/posts":
  * Test de Récupération des Messages d'un Utilisateur: Vérifiez que la requête GET retourne correctement les messages d'un utilisateur spécifié par userId.
  * Test de Gestion des Utilisateurs Inexistants: Assurez-vous que l'API retourne une erreur 404 lorsque l’userId ne correspond à aucun utilisateur.
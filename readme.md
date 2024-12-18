A partir des données suivantes:  https://jsonplaceholder.typicode.com/posts

* Créez un routeur qui :
  * Affichera tous les messages. Url: `/api/posts`
    * Avoir la possibilité de rechercher le titre d’un post: `/api/posts?search=mot`. ça renvoie un tableau avec les résultats
    * Aide: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  * Affichera seulement un message. Url: `/api/posts/:postId`
    * Si le message n’existe pas, envoyez une erreur 404
  * Récupérer les messages d’un utilisateur en précisant l’identifiant. On aimerait avoir l’URL suivante: `/api/users/:userId/posts`
    * Si l’utilisateur n’existe pas, envoyez une erreur 404. 
     > Si l'id de l'utilisateur n'est pas dans le fichier posts.json
* Partie avancée:
  * Au lieu d’utiliser un tableau d’objet. Transformer votre tableau de façon à avoir un tableau d’instance d'une' classe Post.
  * Aide: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
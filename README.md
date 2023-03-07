-> Dans la page register & login 
 - Finaliser l'affichage des erreurs avec le composant Notification
 - Si login ou register est bien exécuté (si token renvoyé), 
    - on le stocke dans le localStorage ou cookie storage
    - on redirige vers la page account
-> Page profil
    - fetcher les informations du user connecté (insérer dans le header de la requête un token)
    - firstName, lastName, email
    - Créer une fonctionnalité dans la page profil pour modifier les informations du user connecté
        Bouton modifier -> ouvre modal avec champs à modifier 
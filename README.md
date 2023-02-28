-> Cas d'erreur à traiter dans l'Interface, 
    - Créer un composant Alert / Notification(props message d'erreur)
        - Afficher ce composant, si erreur dans le fetch(erreur serveur, mauvais mot de passe, pas d'user reconnu etc...)
-> Afficher un loader (sous forme de composant) si loading à true 
(setTimeout pour créer donner plus de latence au déclenchement du fetch)
-> Si login success,
    - stocker le JWT dans les cookies(package js - cookie)
    - rediriger vers la page profil (router next à utiliser)

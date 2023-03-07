-> Page profil :
    
    - Créer une fonctionnalité dans la page profil pour modifier les informations du user connecté
        Bouton modifier -> ouvre modal avec champs à modifier 
    - >Styliser la modal 
    -> Insérer le composant Modal dans la page profil
    -> L'utiliser pour insérer les inputs, chaque input doit reprendre la valeur de la propriété du user à modifier
    -> À la soummission du form dans la modal, déclencher la route nécessaire pour modifier le user.
    -> En cas d'erreur utiliser le composant Notification dans la modal.
    -> Si les informations sont validées, on peut  fermer la modal et afficher une notification success "user successfully updated"

-> Implémentation du context pour disposer des infos du user au niveau global dans l'application
    -> Dans le header, si le user est connecté on affiche son nom de famille à la place du bouton login et un lien vers son profil
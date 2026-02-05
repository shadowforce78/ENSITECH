
Hopital

```mermaid
erDiagram
    SERVICE ||--|{ MEDECIN : "(1,n) emploie (1,1)"
    SERVICE ||--|{ PATIENT : "(1,n) héberge (1,1)"
    MEDECIN ||--o{ VISITE : "(0,n) effectue (1,1)"
    PATIENT ||--o{ VISITE : "(0,n) passe (1,1)"
    VISITE ||--|{ PRESCRIPTION : "(1,n) génère (1,1)"

    SERVICE {
        string nom_identifiant PK
        string localisation
        string specialite
    }

    MEDECIN {
        string nom
        string prenom
    }

    PATIENT {
        int num_inscription PK
        string nom
        string prenom
        string adresse
    }

    VISITE {
        date date_visite
    }

    PRESCRIPTION {
        string nom_medicament
        string posologie
    }
```

![[Pasted image 20260205123602.png]]

![[Pasted image 20260205143317.png]]
MLD =>

Motivation(<u>id_mot</u>, intitulé)
Abonnee(<u>id_abo</u>, nom_abo, prenom_abo, age_abo, num_rue, nom_rue, code_postale, pays)
Newsletter(<u>id_news</u>, sujet, date_envoi, contenu)
Rubrique(<u>id_rub</u>, nom_rub)
Inscrit( #id_abo, #id_rub)

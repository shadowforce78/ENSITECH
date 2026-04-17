![[Pasted image 20260417154136.png]]



Partie A :
	1) Le premier mot de passe de Alice ne sera pas accepté car il ne contient pas au moins 5 lettres (ici seulement 4)
	2) Le mot de passe a 8 lettres sera lui accepté car il contient bien les 5 lettres minimum, 3 chiffre minimum (ici 4) et 3 caractères spéciaux (ici 4)

Partie B :
	1) $A (a,b,c) = ac+b+\bar a bc$ 
	2) 

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    | 1          |                 | 1          |
| $\bar a$ | 1    | 1          |                 |            |
		On peut donc simplifier $A$ tel que $A(a,b,c) = b + c$ 
	3) Pour qu'un mot de passe soi valide, il suffit donc qu'il contienne au moins 5 lettres et 3 caractères spéciaux 

Partie C :

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      |      |            | 1               |            |
| $\bar a$ |      |            | 1               | 1          |
	1) $\bar A(a,b,c) = a \bar b \bar c + \bar a \bar b \bar c + \bar a \bar b c$ 
	2) On peut donc dire que le mot de passe sera refuser si il ne contient pas au moins 5 lettres 
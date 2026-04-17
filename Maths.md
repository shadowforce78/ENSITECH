$\vee +$ = OU
$\wedge *$ = ET

$a \implies b$ est toujours vrais si $a=0$ et toujours faux si $a=1$ et $b=0$

| $a$ | $b$ | $c$ | $\overline{a}$ | $\overline{b}$ | $\overline{c}$ | $b \implies c$ | $a \implies (b \implies c)$ | $(a \implies b) \implies c$ |
| --- | --- | --- | -------------- | -------------- | -------------- | -------------- | --------------------------- | --------------------------- |
| 0   | 1   | 0   | 1              | 0              | 1              | 0              | 1                           | 0                           |
| 0   | 0   | 0   | 1              | 1              | 1              | 1              | 1                           | 0                           |
| 0   | 1   | 1   | 1              | 0              | 0              | 1              | 1                           | 1                           |
| 0   | 0   | 1   | 1              | 1              | 0              | 1              | 1                           | 1                           |
| 1   | 1   | 0   | 0              | 0              | 1              | 0              | 1                           | 0                           |
| 1   | 0   | 0   | 0              | 1              | 1              | 1              | 0                           | 1                           |
| 1   | 1   | 1   | 0              | 0              | 0              | 1              | 1                           | 1                           |
| 1   | 0   | 1   | 0              | 1              | 0              | 1              | 0                           | 1                           |

Exo Booléens
$\overline{x}+x=1$
$1+1=1$
$b+1=1$
$\overline{a}1=\overline a$ 
$0x=0$
$x+0=x$
$\overline y y= 0$ 
$x+y+x=x+y$
$\overline 0 +x y=1$
$\overline 1 a \overline b=0$


# Diagramme de karnaugh


$g(a,b,c) = ab+\bar a \bar c + abc$ $=> ab + \bar a \bar c$ 

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    | 1          |                 |            |
| $\bar a$ |      | 1          | 1               |            |

$h(a,b,c)=abc+\bar c + a\bar b$ $=> a + \bar c$ 

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    | 1          | 1               | 1          |
| $\bar a$ |      | 1          | 1               |            |

$i(a,b,c,)=\bar a +c$ 

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    |            |                 | 1          |
| $\bar a$ | 1    | 1          | 1               | 1          |

$j(a,b,c)=\bar b +ac$

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    |            | 1               | 1          |
| $\bar a$ |      |            | 1               | 1          |



$E(a,b,c)= abc+ \bar a c+ b \bar x$ 

|          | $bc$ | $b \bar c$ | $\bar b \bar c$ | $\bar b c$ |
| -------- | ---- | ---------- | --------------- | ---------- |
| $a$      | 1    | 1          |                 |            |
| $\bar a$ | 1    | 1          |                 | 1          |
$b+ \bar a c$ 
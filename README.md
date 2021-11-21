#	Témalabor – React és ASP.NET Core technológiák használatával webfejlesztés

## Leírás

Az elkészített alkalmazás célja egy Teendőket kezelő alkalmazás biztosítása, amelyben webes felületen oszlopokat hozhatunk létre, melyekhez teendőket adhatunk hozzá, és ezen teendőket egy adatbázisban tároljuk.

## Tartalom
Az Github repository 3 fő elemet tartalmaz. A technológiák megismerése során elkészített tutorialok forrásait, a React alapú frontendet, és az ASP.NET Core Web Api alapú backendet.

A tutorialok folyamán készítettem: TicTacToe React webalkalmazást, illetve ASP.NET Core alapú adatbázist Mssql-re építve, illetve egy WebApi projektet.

## Letöltés,beüzemelés

 - Github reposity klónozása
 - a backend futtatása visual studioval a TodoApi.sln-n megnyitása után
 - a frondend futtatásához szükséges npm telepítése és futtatása a frondend mappában

## Projekt felépítés

### A React Frontend

FONTOS: A futtatáshoz először a backend elindítása szükséges ahonnan betöltheti és ahova mentheti az adatokat.

Három osztályt különböztetek meg
  -	ColumnContainer
  -	Column
  -	Todo
ColumnContainer: Feladata az adatbázisban található oszlopok betöltése, az oszlopok megjelenítése, kezelése.

Column: Feladata az adatbázisban található teendők betöltése, tárolása, megjelenítésének kezdeményezése, és a teendőkön végezhető műveletek kezelése.
Ilyen műveletek a teendőkön:
  - Új hozzáadása
  - Törlés
  - Két teendő sorrendjének megcserélése

Todo: Megjeleníti a teendőt, tárolja a hozzá tartozó nevet, leírást, illetve ezen adatokat módosíthatóvá teszi. Beépített gombjai kezdeményezik a Column teendőkezelő műveleteit.

Adatok feltöltése: A fetch() művelet használatával indítás után először beolvassa a kívánt oszlopokat, majd ezekhez hozzárendeli a megfelelő todo kártyákat.

A webalkalmazás a :3000-es porton fut, míg az adatbázis az :5000(http)/:5001(https) porton érhető el. A kettő közti kapcsolat megteremtéséhez package.json fájlban a projektben proxyt állítottam be az :5001-es portra, így a fetch műveletek elérik a kívánt Url-t.

### Az ASP.NET Core WebApi Backend

A szerver  ASP.NET Core alapú, az adatok tárolására pedig SqLite-ot használok. Az SqLite abból fakad, hogy kezdetben  SQL Server LocalDB-t használtam, viszont mivel MacOs-t használok, és az csak Windows alatt támogatott így a fejlesztés megkönnyítése érdekében áttértem SqLite-ra.

A létrehozott modellem két különböző entitást tartalmaz. 
  - Oszlopot(Column),
  - és a Teendőt(TodoItem). 

Az oszlop tartalmaz:
  - egy egyedi azonosítót.

A teendőknek van:
 - egy egyedi azonosítója,
 - neve,
 - leírása,
 - illetve, hogy melyik oszlophoz tartoznak.


A program indításkor leellenőrzi, hogy létezik-e az adatbázis. Amennyiben nem, létrehozza azt.
GET,PUT, POST,DELETE műveletek hajthatóak végre az adatokon, ezeket meghívhatjuk manuálisan is például a Postman alkalmazás használatával, illetve a webalkalmazásunk is ezeket használja.
A megfelelő url el host:5001/api/+colums vagy todoitems hívott művelettel az alábbiakat tehetjük.

GET: Visszatér a tárolt adatokat tartalmazó listával.
 - return 200 (OK) : a lekérdezés sikeres volt

PUT: A megadott /id vel rendelkező elemet módosítja.
 - return 200 (OK) : az adat módosítása sikeres volt
 - return 404 (NOT FOUND) : amennyiben nem található ilyen id-jú módosítani kívánt elem.

POST: Hozzáadja az elemet a listához.
 - return 201 (CREATED) : az új adategység hozzáfűzése sikeres
 - return 500 (Internal server error) : hibát dob ha olyan id-jú elemet akarunk hozzáadni ami már létezik, ezzel megsértve a kulcs egyediségét

DELETE: A megadott /id vel rendelkező elemet eltávolítja.
 - return 204 (NO CONTENT) : az elem eltávolítása sikeres
 - return 404 (NOT FOUND) : nincs ilyen törölni kívánt elem

## Motiváció

A téma kiválasztásában fontos szerepet játszott, hogy igyekeztem olyat keresni amely bővíteni tudja a tudásomat a mintatanterven kívül is, és a Javascript a Mobil és Webes szoftverek tárgy leírását előre megnézve sem volt túlságosan mély, illetve a React pedig egy teljesen új technológia volt számomra. A kiválasztás mellett az is sokat számított, hogy számos témát megnyitva minimális leírást láttam csak, ezen téma viszont a teljes félévre lebontva, tételesen kifejtve jobban is megragadta az érdeklődésemet.

## Féléves tapasztalatok

A rendszeres konzultációk, illetve a nagy önállóság a kiadott segédanyagok feldolgozásával, majd elkészítésével mindenképpen pozitívan hatott. Segített, hogy jobban beoszthassam az időmet, illetve az önálló feldolgozás, utánajárás során úgy érzem jobban is megértettem a használt technológiák működését, mint ahogy azt egy vezetettebb formában megtehettem volna.


Egészen sok nehézségbe ütköztem eleinte a frontend fejlesztése során, ami abból fakad, hogy nagy mértékben más volt, mint bármely korábban tanult nyelv. A React.js komponensek megértése olyannyira nehezen ment, hogy már egy működő frontendem volt csupán komponensekre bontás nélkül (god class effect), mikor megértettem pontosan hogyan működnek. Ekkor több Componentre bontva újraírtam a teljes frondend kódot a jelenlegi állapotára.

# Starting webapp
node 14.15.0

LR-Point is een website waarop je reviews voor laptops kan plaatsen wanneer je bent ingelogd.
Om de reviews te bekijken is er geen account nodig. De website maakt gebruik van cookies, waardoor je onader andere ingelogd kunt blijven voor een bepaalde duur zelfs wanneer je de pagina verlaat.

Het installeren van nodejs en de node package manager (npm) kan op Mac en Windows via de site: https://nodejs.org/download/release/v14.15.0/ of de laatste versie via https://nodejs.org/en/. 
Op linux kan het ook via de download, maar eenvoudiger via de terminal met volgende commands: 
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

Het opstarten van de webapplicatie kan op meerdere manieren. Vanuit een ontwikkelingsomgeving zoals bijvoorbeeld webstorm volstaat het om in de bin-folder het www.js bestand te runnen. Opstarten kan echter ook via de terminal door in de directory van de applicatie het commando 'npm start' in te geven. Na het opstarten van de server is de website toegankelijk in de browser via de url 'http://localhost:3000/'.



//////////////////


Geen zorgen, de wachtwoorden komen gehashed to in de databank, wij kunnen uw persoonlijk wachtwoord dus niet zien. 


//////////////////


(voor de zekerheid:)
Indien het registreren niet zou lukken, gebruik volgende login gegevens om de site te testen.
gebruikersnaam: mvl
wachtwoord: haha1



/////////////////


GEBRUIKTE MODULES


npm install express-validator@5.3.0

express

express-messages

serve-favicon

mongoose

passport

passport-local

multer

connect-flash

async

express session

cookie-parser

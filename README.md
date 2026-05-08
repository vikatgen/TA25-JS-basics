# Moderne veebirakenduste arendmine
> Võtame kasutusele ViteJS komplekteerija ning loome NodeJS arenduskeskkonna.

**Bundleri** (näiteks Webpack, Vite, Parcel, Rollup) kasutamine nõuab Node.js keskkonda peamiselt seetõttu, et need tööriistad on ehitatud JavaScriptis ja vajavad käivitamiseks serveripoolset JavaScripti mootorit.
- **JavaScripti käituskeskkond:** Bundlerid on ise Node.js rakendused, mis vajavad töötamiseks V8 JavaScripti mootorit, mida Node.js pakub väljaspool veebibrauserit.
- **Sõltuvuste haldus (npm):** Bundlerid ja nende pluginad laaditakse alla npm-i (Node Package Manager) kaudu, mis kuulub Node.js komplekti.
- **Failisüsteemiga töötamine:** Bundlerid peavad lugema, kirjutama ja jälgima tuhandeid faile teie projektis (JS, CSS, pildid). Node.js pakub vajalikke tööriistu (fs moodul) failisüsteemiga efektiivseks suhtlemiseks.
- **Kompileerimine ja teisendamine:** Bundlerid kompileerivad kaasaegset JavaScripti (ES6+), TypeScripti, Sass'i jms. See nõuab suure jõudlusega serveripoolset keskkonda.

## Bundler
**Bundler** (või moodulite komplekteerija, ingl. k module bundler) on tarkvaraarenduses, eriti veebiarenduses (frontend), kasutatav tööriist, mis võtab kokku projekti erinevad failid (JavaScript, CSS, pildid jms) ja pakib need kokku väikeseks komplektiks (bundle).Veebilehitsejad ei suuda alati efektiivselt käsitleda sadu eraldiseisvaid faile, mida kaasaegsed veebirakendused vajavad. Bundler lahendab selle probleemi.

**Mida bundler teeb?**
- **Sõltuvuste haldamine:** Vaatab koodis olevaid importimisi (import/require) ja ehitab sõltuvusgraafiku, et teada, millises järjekorras faile laadida.
- **Failide kokkupakkimine:** Ühendab paljud JavaScripti ja CSS-i failid üheks või vähesteks failideks, vähendades HTTP-päringute arvu.
- **Optimeerimine (Minifitseerimine):** Vähendab koodi suurust, eemaldades tühikud, kommentaarid ja lühendades muutujate nimesid, mis kiirendab lehe laadimist.
- **Tree-shaking (Kasutamata koodi eemaldamine):** Eemaldab lähtekoodist osad, mida rakendus tegelikult ei kasuta, muutes lõppfaili väiksemaks.
- **Uute funktsioonide tugi:** Võimaldab kasutada uusimaid JavaScripti funktsioone (ES6+), teisendades need vanematesse versioonidesse, mida vanemad brauserid mõistavad (kasutades tööriistu nagu Babel).

**Miks peaks bundlerit kasutama?**
- **Kiirem veebileht:** Väiksemad failid ja vähem päringuid tähendavad kasutajale kiiremat laadimisaega.
- **Parem arenduskogemus:** Võimaldab arendajatel faile struktureeritult hallata (kasutades mooduleid), ilma et peaks muretsema brauserite piirangute pärast.

### Lisame oma projekti NodeJS keskkonna.
```
npm init -y
```

### Lisame ViteJS bundleri.
[Dokumentatsioon](https://vite.dev/guide/#manual-installation)
```
npm install -D vite
```

-D tähendab, et lisame antud mooduli DevDependency hulka.

**DevDependencies (arendussõltuvused)** on tarkvaraarenduses kasutatavad teegid või paketid, mida läheb vaja ainult arendus- ja testimisprotsessi ajal, kuid mitte rakenduse lõplikus versioonis
Siin on peamised punktid nende tähenduse kohta:
- **Kasutusala:** Need on tööriistad, mis aitavad koodi kirjutada, testida, kompileerida või kontrollida (näiteks testiraamistikud, linterid, bundlerid).
- **Tootmiskeskkond:** DevDependencies'eid ei installita tootmiskeskkonda (production), mis muudab lõpprakenduse suuruse väiksemaks ja kiiremaks.Näited: Jest (testimiseks), ESLint (koodi kvaliteedi kontrolliks), Webpack või Vite (koodi bundlimiseks), TypeScript (kui see kompileeritakse JS-iks).
- **npm/package.json:** Node.js projektides defineeritakse need package.json failis devDependencies sektsioonis.
- **Paigaldamine:** Need paigaldatakse käsuga npm install --save-dev <paketi-nimi>.Erinevus tavalistest sõltuvustest (dependencies):Dependencies: Vajalikud rakenduse tööks (nt React, Express).DevDependencies: Vajalikud ainult arendajale koodi loomiseks.

package.json failis lisame uue scripti, mis saame terminalis jooksutada.
``` json
"scripts": {
    "dev": "npx vite"
  },
```

Samuti peame andma Javascriptile märku, et me kasutame ES6 versiooni, ehk `package.json` faili lisame
``` json
"type": "module"
```

### Keskkonna salajased võtmed (env)
Enne kui rakenduse käima paneme läbi scriptis loodud käsu, lisame oma API võtmed env faili.
ENV faile me loome algusega ".", mis annab kaustasüsteemide märku, et tegemist on peidetud failiga.
ENV faile me kunagi ei pane giti, vaid lisame .gitignore faili.

- Loome `.env` faili.
- Sinna sisse kirjutame `VITE_NASA_API_KEY=****`
- `.gitignore` failis lisame `.env` faili.

Salajase võtme kasutamiseks pöördume ViteJS protsesside poole.
`app.js` failis lisame võtme string väärtuse asemele `import.meta.env.VITE_NASA_API_KEY` ning võime ära kustutada `getSecretKey()` funktsiooni kasutamise.

## Produktsiooniks ettevalmistamine
Enne kui saame hakata oma lehte ülesse panema, peame kasutama ära ViteJS võimalusi, ning meie rakenduse ka päriselt kokku pakkima.
Seda sammu nimetame "build" sammuks.

Lisame `package.json` faili kaks uue scripti:
``` json
"scripts": {
    "dev": "npx vite",
    "build": "npx vite build",
    "preview": "npx vite preview"
},
```

`npm run build` käsk loob uue kausta nimega `dist`, kuhu ta pakib meie rakenduse kokku.
`npm run preview` käsk loob meile keskkonna, kus me saame kokku pakitud rakendust vaadata ning testida.

Kui need käsud likvideerida, ning uuesti kasutada `npm run dev` käsku, siis ViteJS paneb meie jaoks jällegi püsti arendusserveri,
kus serveeritakse meile jälle mitte-kokkupakitud koodi.

> **NB!** Tasub meeles pidada, et `dist` ja `node_modules` kaustad peavad olema ka `.gitignore` failis.
> Neid kaustasid me ülesse ei lae:
> - kui keegi kloonib meie repo, siis käsuga `npm install` luuakse talle projekt koos meie määratud moodulitega.
> - `npm install` kasutab `package.json` faili, et aru saada meie projektist ning installeerida vajalikud moodulid, mis on ära kirjeldatud `devDependencies` ning `dependecies` sektsioonis.

`package-lock.json` on Node.js projektides automaatselt genereeritav fail, mis fikseerib täpsed versioonid kõigist projekti sõltuvustest (packages) ja nende alam-sõltuvustest. See luuakse `npm install` käsu käivitamisel, kui `node_modules` kaust või `package.json` fail muutub.

**Milleks `package-lock.json` faili vaja on?**
- **Järjepidevus:** Tagab, et kõik arendajad, CI/CD süsteemid ja tootmisserverid (production) installivad täpselt sama versiooni raamatukogudest.
- **Vigade vältimine:** Hoiab ära "minu masinas töötab" probleemi, kus uuemad alammoodulid võivad koodi katki teha.
- **Täpsus:** Kui package.json lubab versioonivahemikke (nt ^1.2.0), siis package-lock.json fikseerib konkreetse versiooni (nt 1.2.3).
- **Kiirus:** NPM-il on kiirem paigaldada sõltuvusi, sest versioone ei pea uuesti lahendama.

**Miks see peab Giti panema (commitima)?**
- **Reproduceeritavad ehitused:** See on ainus viis tagada, et kui keegi teine (või automaatsüsteem) projekti alla laeb ja npm install teeb, saab ta täpselt sama keskkonna, mis sina.
- **Turvalisus:** Fikseerib sõltuvuste terviklikkuse (hashes), mis aitab vältida pahatahtlike pakettide salajast uuendamist.
- **Meeskonnatöö:** Ilma selleta võivad erinevad arendajad saada erinevad node_modules puud, mis tekitab konflikte.
- **Audit:** See annab ülevaate, millised sõltuvused ja alam-sõltuvused muutusid.

**Kokkuvõtteks:** package-lock.json on hädavajalik stabiilsuse tagamiseks ja see tuleb alati Giti lisada.

## Moodulite (pluginate) lisamine meie koodibaasi
[Tailwind dokumentatsioon](https://tailwindcss.com/docs/installation/using-vite)
> Kuna ViteJS on meil juba olemas, siis selle käsu jätame vahele.

1. `npm install tailwindcss @tailwindcss/vite`
> Antud käsk lisab meile moodulid (pluginad) `tailwindcss` ja `@tailwindcss/vite` ning lisab need `dependencies` sektsioonis `package.json` failis.
> Kui me kasutame -D flagi, siis lisatakse need `devDependencies` sektsiooni `package.json` failis.`.

2. Konfigureerime tailwindi enda projekti
> Loome `vite.config.js` faili, mis sisaldab konfiguratsiooni.
``` typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
})
```

3. Loome CSS faili näiteks nimega `style.css` ja lisame selle `index.html` faili päisesse.
> Lisame CSS faili `@import "tailwindcss";` rea.
4. Lisame CSS faili `index.html` faili.
5. Kasutame tailwindi klassides.

#### Produktsioonis kasutamine moodulitega
> Kui soovime nüüd jälle produktsioonis kasutada kasutame `npm run build` ja `npm run preview` käsku.

## Linterite kasutamine
[ESLint dokumentatsioon](https://eslint.org/docs/user-guide/getting-started)

Linterite (näiteks ESLint) kasutamine JavaScripti programmeerimises on tänapäeva arenduses standardpraktika, kuna see aitab parandada koodi kvaliteeti, vältida vigu ja tagada järjepidevuse.

Siin on peamised põhjused, miks linterit kasutatakse:
- **Vigade varajane avastamine:** Linter analüüsib koodi staatiliselt (ilma seda käivitamata) ja leiab potentsiaalsed vead, nagu defineerimata muutujad, süntaksivead või kättesaamatud koodiplokid. See säästab aega, mida muidu kuluks vigade otsimisele testimise faasis.
- **Koodi stiili järjepidevus:** Linter sunnib meeskonda järgima ühtset stiili (nt semikoolonite kasutamine, taande suurus, jutumärkide tüüp). See muudab koodi loetavamaks ja lihtsamini hooldatavaks, eriti suurtes meeskondades.
- **Parimate praktikate järgimine:** Linterid hoiatavad vananenud funktsioonide või ohtlike koodimustrite eest, suunates arendajaid kirjutama turvalisemat ja efektiivsemat JavaScripti.
- **Automaatne parandamine:** Paljud linterid oskavad leitud stiilivead (nt vale taane) automaatselt parandada, mis kiirendab arendusprotsessi. 

Kuna JavaScript on paindlik ja tihti kliendipoolne keel, aitab linter vältida ootamatuid käitumisi brauseris.

#### ESLint lisamine Vite.js projektile on parim viis koodi kvaliteedi tagamiseks. 
Siin on samm-sammuline juhend, kuidas seadistada ESLint JavaScripti projektis:

1. Paigalda ESLint

Kõigepealt paigalda ESLint ja vajalikud sõltuvused oma projekti terminali kaudu:
```
npm install -D eslint
```

2. Initsieeri ESLint seadistus

```
npx eslint --init
```

See käsk küsib sinult mitmeid küsimusi. Siin on soovituslikud valikud:
- **How would you like to use ESLint?** To check syntax, find problems, and enforce code style
- **What type of modules does your project use?** JavaScript modules (import/export)
- **Which framework does your project use?** React / Vue / None (valige vastavalt projektile)
- **Does your project use TypeScript?** No / Yes (valige vastavalt projektile)
- **Where does your code run?** BrowserHow would you like to define a style for your project? Use a popular style guide (nt Standard või Airbnb)
- **What format do you want your config file to be in?** JSON või JavaScript

3. Konfigureeri Vite (valikuline, kuid soovitatav)

Et ESLint töötaks sujuvalt Vite'i arendusserveriga, võite paigaldada `vite-plugin-eslint`
```
npm install -D vite-plugin-eslint
```

Seejärel lisage see `vite.config.js` faili:
``` javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        tailwindcss(),
        eslint()
    ],
})
```

4. Lisa skriptid `package.json`

Lisage `package.json` faili scripts sektsiooni käsud koodi kontrollimiseks ja parandamiseks:
``` json
"scripts": {
    "dev": "vite",
    "build": "npx vite build",
    "preview": "npx vite preview",
    "lint": "eslint . ",
    "lint:fix": "eslint . --fix"
}
```

5. VS Code seadistus (automaatne parandamine)

Selleks, et ESLint parandaks koodi automaatselt salvestamisel, lisage projekti juurelementi `.vscode/settings.json` fail:
``` json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact"]
}
```

See seadistus tagab, et teie Vite+JS projekt on alati puhas ja vigadeta.
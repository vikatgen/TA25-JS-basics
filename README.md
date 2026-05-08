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

## Produktsioonis kasutamine moodulitega
> Kui soovime nüüd jälle produktsioonis kasutada kasutame `npm run build` ja `npm run preview` käsku.
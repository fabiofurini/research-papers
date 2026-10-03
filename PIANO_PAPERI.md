# Piano — Archivio organico dei paper e sito di ricerca

Redatto il 3 ottobre 2026. Ricognizione fatta su tutto il Dropbox; nessun file è stato
spostato, rinominato o modificato. Questo è solo il piano.

---

## 1. In sintesi

L'archivio è **in ordine e quasi completo**: 45 paper di rivista e 12 di conferenza hanno
sorgenti LaTeX, PDF della versione editoriale e PDF della versione post-print. I
**tre paper più recenti** (numeri 46, 47 e 48 del CV) sono arrivati il 3 ottobre: sorgenti
completi per tutti e tre, PDF editoriale per due. Manca solo il PDF pubblicato del #46.

Il lavoro vero non è recuperare materiale: è **ricomporlo**. Oggi sorgenti e PDF stanno in
due alberi paralleli tenuti allineati solo dal numero nel nome. L'obiettivo è una cartella
per paper che contenga tutto, più una versione LaTeX neutra che compili senza le classi
degli editori, più il sito.

Un punto va deciso da te prima di scrivere codice: **quale versione dei PDF va online**.
Ne parlo al §4; la risposta cambia poco il lavoro ma molto il risultato.

---

## 2. Cosa c'è — inventario verificato

### `1_RICERCA/100_PAPERI` (2,6 GB)

| Contenuto | Riviste | Conferenze |
|---|---|---|
| Cartelle sorgente LaTeX | 45 | 12 |
| PDF versione editoriale | 45 | 12 |
| PDF post-print (AAM) | 45 | 12 |

La numerazione `1_…` / `45_…` **combacia esattamente** fra `LATEX/` e `PDF/`: è la chiave
che tiene insieme i due alberi, e la riuso come identificatore.

Gli AAM sono già divisi per editore — `ELSEVIER_OK` (23), `SPRINGER_OK` (8), `INFORMS_OK` (6),
`OPEN_ACCESS` (6), `IEEE_OK` (1), `WILEY_OK` (1). Questa divisione torna utile al §4.

### Altre fonti già individuate

- **`LIST_OF_PUBBLICATIONS/bib_furini.bib`** — 57 voci (45 `@article` + 12 `@inproceedings`):
  corrisponde uno-a-uno all'archivio. È la base dei metadati del sito.
- **`5_CARRIERA/DOC/CV/CV_FabioFurini_ENG.tex`** (24/09/2026) — la lista ufficiale: **48**
  riviste e 12 conferenze, con titolo, autori, anno, rivista ed editore. È la fonte di verità.
- **`1_RICERCA/RESEARCH.md`** — 10 paper sottomessi con link arXiv/SSRN, 7 working paper, 10 piste.
- **`1_RICERCA/01_WORKING`** — 18 temi di ricerca già nominati, utili per la tassonomia del sito.
- **`LATEX/OLD/`** — 27 cartelle con nomi vecchi (`paper_DSATUR`, `paper_WVC`, `TESI_Fabio`…).
  Da trattare come riserva, non come fonte primaria: probabilmente versioni precedenti di
  paper già presenti, più la tesi di dottorato.

### Strumenti sulla macchina

Presenti: `git`, `pdflatex`, `latexmk`, `tex4ht`, `make4ht`, `python3`.
**Mancanti**: `pandoc`, `latexml`, `node`. Servono per la conversione in HTML (§7); li installo io.

---

## 3. Cosa manca — mi serve da te

### 3.1 I tre paper recenti — **ricevuti il 3 ottobre**

Il CV ne elenca 48, l'archivio ne aveva 45. I tre mancanti sono arrivati in `EXTRA/`.
Stato dopo la verifica:

| # | Titolo | Rivista | Sorgente | PDF editoriale |
|---|---|---|---|---|
| **48** | Strength of the Upper Bounds for the Edge-Weighted Maximum Clique Problem | Discrete Applied Mathematics | ✅ `WeightSplitting.zip` → `DAM/REVISION_2/MANUSCRIPT/PAPER_DAM_rev_2.tex` | ✅ DAM **397 (2027) 73–101** |
| **47** | An Exact Approach for the Train Single-Routing Selection Problem | European Journal of Operational Research | ✅ `Train_Single_Routing_Selection_Problem.zip` → `main_rev2_clean.tex` *(da confermare, vedi sotto)* | ✅ in press |
| **46** | Exact Algorithms for Two-Dimensional Knapsack Problems: A Unified Framework with New Benchmark Results | INFORMS Journal on Computing | ✅ `…G2KP_.zip` → `Proof-2026-09/Main-IJOC-Final.tex` + `Online-Supplement-Final.tex` | ❌ **manca** |

**Resta da caricare: il PDF pubblicato del #46 (IJOC).** Nello zip ci sono solo le proofs delle
quattro tornate (`JOC-2025-06-OA-1423.R3_Proof_hi.pdf` è l'ultima, luglio 2026), non la versione
finale impaginata. Se non è ancora uscita online, l'archivio resta con le proofs e si aggiorna dopo.

**Una conferma che mi serve sul #47.** Lo zip ha sette `main*.tex`. Ho confrontato la struttura
delle sezioni con il PDF pubblicato: `main_v4_rev.tex`, `main_v5_rev.tex` e `main_rev2_clean.tex`
coincidono tutti e tre (8 sezioni + 4 appendici). Prendo **`main_rev2_clean.tex`** come versione
accettata perché è la più recente e la "clean"; dimmi se sbaglio.

**Due cose utili trovate strada facendo:**

- `WeightSplitting.zip` contiene già un **`DAM/REVISION_1/arXiv.tex`**: una versione del #48 in
  classe neutra, fatta per arXiv. È esattamente il formato che serve al §6 — la uso come modello
  per il preambolo comune invece di inventarlo.
- Gli zip del #46 e del #48 portano dentro l'intera storia editoriale (submission, revisioni,
  response letter, referee report). Non serve al sito, ma è l'archivio del lavoro: lo conservo in
  una sottocartella `storia/` della cartella del paper, fuori da quello che va online.

**Nota:** `WeightSplitting.zip` è la cartella di progetto completa (`CliSat`, `GAME VARIANT`,
`ExactAlgosComparison`, `COLLATERALI`, `OLD`…), non solo il paper. Prendo la sola `DAM/`; il resto
appartiene a `01_WORKING/04_CLIQUE` e lo lascio dov'è.

### 3.2 I DOI

Il `.bib` ha autori, titolo, rivista, anno, volume e pagine, ma **nessun DOI e nessun URL**,
per tutte e 57 le voci. Per il sito servono: sono il link ufficiale di ogni paper.

Non è lavoro tuo — li recupero io da Crossref interrogando per titolo e autore, e ti do la
lista da controllare. Lo segnalo perché è un passaggio che va verificato a mano: Crossref
sbaglia su titoli simili.

### 3.3 Due dettagli da sistemare

- `25_Benders decomposition…(Case Conflict).pdf` — nome con residuo di conflitto Dropbox.
  Va verificato che sia il file buono prima di rinominarlo.
- 13 cartelle LaTeX su 45 non hanno un `.bib` e diverse non hanno il `.bbl`: alla
  ricompilazione la bibliografia verrebbe vuota. Risolvibile col `bib_furini.bib` più le voci
  mancanti, ma è lavoro paper per paper.

---

## 4. Il nodo da decidere: quale PDF va online

Questo riguarda il sito, non l'archivio locale, e va deciso prima di pubblicare.

Per Elsevier, Springer, Wiley, IEEE e INFORMS la **versione editoriale impaginata** (quella
in `VERSION_JOURNAL`) di norma **non** può essere ripubblicata su un sito personale: il
diritto è ceduto all'editore. Quello che quasi sempre **si può** mettere online è il
**post-print / AAM** — il tuo manoscritto accettato, senza l'impaginazione dell'editore —
spesso dopo un embargo e con un link al DOI.

L'archivio è già pronto per questo: hai **tutti e 45** gli AAM, già ordinati per editore.

**La mia proposta:** l'archivio locale tiene entrambe le versioni; il sito pubblica l'AAM e
la versione LaTeX neutra, con il link al DOI per la versione ufficiale. I 6 paper in
`OPEN_ACCESS` possono avere online anche il PDF editoriale, perché lì il diritto è tuo.

È una proposta, non un veto: decidi tu. Se preferisci pubblicare tutto, lo faccio — ma
volevo che la scelta fosse informata e non implicita.

---

## 5. Struttura proposta per l'archivio

Una cartella per paper, con dentro tutto. Nome: `NN_anno_RIVISTA_titolo-breve`.

```
1_RICERCA/100_PAPERI/
├── PAPERS/
│   ├── 44_2024_IJOC_bin-packing-numericamente-esatto/
│   │   ├── latex/          sorgenti originali, come sono
│   │   ├── open/           versione LaTeX neutra (§6)
│   │   ├── pdf/
│   │   │   ├── journal.pdf    versione editoriale
│   │   │   └── aam.pdf        post-print
│   │   ├── paper.bib       la voce bibliografica, con DOI
│   │   └── meta.yaml       titolo, autori, anno, rivista, DOI, temi, abstract
│   └── … (×48 + 12 conferenze)
├── _INDEX/
│   ├── publications.yaml   l'indice completo, generato
│   └── publications.bib    il .bib unico, con i DOI
└── _ORIGINALE/             LATEX/ e PDF/ di oggi, intatti
```

**Il punto chiave:** costruisco il nuovo albero **copiando**, e lascio `LATEX/` e `PDF/`
dove sono finché non hai verificato il risultato. Niente è irreversibile. Quando dai l'ok,
l'originale si sposta in `_ORIGINALE/` o si cancella — decidi allora, non adesso.

`meta.yaml` è il file che alimenta il sito: scritto una volta, letto da tutto il resto.

---

## 6. La versione LaTeX "open source"

Vale la pena essere precisi su cosa significa, perché ci sono due problemi diversi.

**Com'è oggi.** I 45 sorgenti usano sei classi diverse:

| Classe | Paper | Problema |
|---|---|---|
| `elsarticle` | 15 | Classe Elsevier, liberamente ridistribuibile ma marcata editore |
| `article` | 17 | Nessun problema |
| `svjour3` | 7 | Classe Springer, licenza d'uso legata alla submission |
| `informs3` | 4 | Classe INFORMS, idem |
| `IEEEtran` | 1 | Libera |
| `cas-dc` | 1 | Elsevier, variante recente |

**Cosa faccio.** Una versione `open/` di ogni paper che:

1. usa una sola classe neutra (`article` con un preambolo comune, o `lipics`/`tufte` se
   preferisci un'estetica più curata — da decidere);
2. non dipende da file di classe degli editori, quindi compila ovunque, anche fra dieci anni;
3. include un `Makefile` e un `latexmkrc`, così `make` basta;
4. porta in testa una nota con citazione completa e DOI — è la riga che dice *"questa è la
   versione d'autore, l'originale è qui"*;
5. produce lo stesso contenuto matematico del paper pubblicato.

**Un avvertimento onesto.** Questa conversione **non è automatizzabile al 100%**. Cambiare
classe rompe `\maketitle`, gli ambienti teorema, i riferimenti alle figure e, nei paper
INFORMS, i comandi propri della classe. Per ogni paper serve una compilazione e un controllo
a vista del PDF. Sono 57 paper: realisticamente **una decina al giorno**, i primi più lenti
finché non si stabilizza il preambolo comune. Non ti prometto che parte tutto al primo colpo.

Comincio dai paper in `article` (17, i più facili) per mettere a punto il preambolo, poi
`elsarticle`, poi i casi difficili.

---

## 7. Il sito

**Impianto:** sito statico su GitHub Pages, generato da `_INDEX/publications.yaml`. Nessun
database, nessun backend: i contenuti stanno in file di testo versionati, il sito si
rigenera con un comando quando aggiungi un paper.

**Navigazione per filoni.** I 18 temi di `01_WORKING` sono troppi per un menu. Proposta di
accorpamento in 9 filoni — **da correggere, l'ho dedotta dai titoli**:

| Filone | Paper (circa) |
|---|---|
| Bin packing e cutting stock | 2, 4, 12, 31, 32, 40, 42, 44, 46 |
| Knapsack | 3, 8, 10, 16, 18, 20, 34 |
| Colorazione di grafi | 1, 14, 15, 21, 30, 35 |
| Clique e stable set | 26, 27, 28, 43, 48 |
| Interdiction, blocker e vertex cut | 22, 29, 36, 37, 45 |
| Covering, location e submodularità | 25, 41 |
| Decomposizione e riformulazione | 6, 11, 17 |
| Programmazione quadratica binaria | 23, 24 |
| Ottimizzazione nei trasporti | 7, 9, 13, 19, 47 |

Restano fuori 5 (signal processing) e 39 (CSP). Diversi paper stanno bene in due filoni:
il sito userà **tag multipli**, non un albero rigido — un paper può comparire sotto due temi.

**Cosa ci sarà:** una home con i filoni; una pagina per filone con una presentazione in
prosa della linea di ricerca e i paper in ordine cronologico; una pagina per paper con
abstract, coautori, link al DOI, PDF dell'AAM, sorgente LaTeX, e — dove c'è — link al codice
e alle istanze; ricerca per testo, filtri per anno, coautore e rivista; `.bib` scaricabile
per ogni paper. Moderno, leggibile su telefono, tema chiaro e scuro.

**HTML del paper.** Oltre al PDF posso generare la versione HTML navigabile di ogni paper
(matematica inclusa, via LaTeXML + MathJax), in stile arXiv moderno. È quello che rende il
sito davvero consultabile invece di essere un elenco di link a PDF. Funziona bene, ma non
su tutti i paper: lo faccio dove viene pulito e lascio il PDF dove no.

**Non decido io:** dominio (`fabiofurini.github.io` o un dominio tuo), e se il sito
sostituisce quello Google Sites attuale o gli si affianca.

---

## 8. Fasi di lavoro

| # | Fase | Cosa produce | Serve da te |
|---|---|---|---|
| 1 | **Indice** | `publications.yaml` con le 60 voci dal CV + `.bib`, DOI recuperati da Crossref | Controllare i DOI |
| 2 | **Ricomposizione** | L'albero `PAPERS/` con latex + pdf + meta per i 45+12 già completi. Per copia, originale intatto | Validare a campione |
| 3 | **I tre mancanti** | 46, 47, 48 integrati | ✅ sorgenti ricevuti — manca il PDF IJOC del #46 |
| 4 | **Versione open** | `open/` per ogni paper, compilata e controllata. A blocchi, non tutto insieme | Scegliere la classe |
| 5 | **Sito** | Repo GitHub, generatore, pagine per filone e per paper | Confermare i filoni, scegliere il dominio |
| 6 | **HTML dei paper** | Versione HTML dove viene pulita | — |
| 7 | **Pubblicazione** | Sito online, repo pubblico | L'ok finale sul §4 |

Le fasi 1 e 2 sono le fondamenta e non dipendono da niente: posso partire subito.
La 3 aspetta te. La 4 è la più lunga.

---

## 9. Le domande a cui mi serve risposta

1. **Il PDF pubblicato del #46** (IJOC), se è uscito. E la conferma che per il #47 la
   versione accettata è `main_rev2_clean.tex` — vedi §3.1.
2. **Versione online: AAM o editoriale?** La mia proposta è AAM + link al DOI (§4).
3. **I filoni del §7 sono giusti?** Correggi nomi e assegnazioni: è la struttura portante del sito.
4. **Le conferenze vanno nel sito** o resta solo l'archivio locale?
5. **Dove metto il repo?** Dentro Dropbox o in `~/progetti`? Dropbox e `git` convivono male:
   la sincronizzazione tocca `.git` e ogni tanto lo corrompe. Consiglio fuori da Dropbox,
   con il materiale che resta qui.
6. **Classe LaTeX per la versione open:** `article` sobrio o qualcosa di più curato?
7. **I 10 paper sottomessi** di `RESEARCH.md` (arXiv/SSRN) vanno nel sito come *working papers*?

Rispondi a quello che hai chiaro; sul resto parto con la proposta di default e correggiamo
in corsa. Le fasi 1 e 2 posso cominciarle appena dici via.

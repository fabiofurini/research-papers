# 100_PAPERI — archivio dei paper

Riorganizzata il 3 ottobre 2026. Una cartella per paper, con dentro tutto quello
che lo riguarda. Alimenta la pagina delle pubblicazioni del sito personale.

```
100_PAPERI/
├── PAPERS/        60 paper — 48 di rivista (J01–J48), 12 di conferenza (C01–C12)
├── _COMMON/       furinipaper.sty, il preambolo LaTeX condiviso
├── _INDEX/        indice e temi di ricerca
└── _ORIGINALE/    i vecchi alberi, superati ma conservati
```

## Com'è fatto un paper

```
PAPERS/J22_2019_DISOPT_vertex-k-cut/
├── meta.yaml      autori, rivista, anno, DOI, filone, abstract, link al codice
├── latex/         i sorgenti originali, come erano (classe dell'editore)
├── open/          la versione unificata in classe `article` + il PDF compilato
└── pdf/           PDF della rivista (journal.pdf) e post-print (aam.pdf)
```

Il nome della cartella è `ID_anno_RIVISTA_titolo-breve`. **L'ID segue la
numerazione del CV**, non quella vecchia dell'archivio: le due divergevano per
le conferenze 9 e 10, che erano invertite.

## Le tre versioni di ogni paper

| | Cos'è | Dove |
|---|---|---|
| **Originale** | i sorgenti come sono stati mandati all'editore | `latex/` |
| **Unificata** | ricomposta in classe `article`, senza dipendenze da classi editoriali, con in testa la citazione e il DOI | `open/main.pdf` |
| **Editoriale** | il PDF impaginato dalla rivista | `pdf/journal.pdf` |

Online va la **versione unificata**: è quella d'autore, e il diritto sul PDF
impaginato è dell'editore. Ogni paper rimanda al DOI per la versione ufficiale.

**55 paper su 60 hanno la versione unificata.** I cinque che non ce l'hanno:

- `C08`, `C09`, `C10`, `C11`, `C12` — di questi paper di conferenza **non esiste
  alcun sorgente LaTeX**, da nessuna parte nell'archivio. Solo il PDF.
- `C06` — il sorgente che c'è è una **bozza anteriore**, con un titolo diverso da
  quello pubblicato. Per questo non viene pubblicato: serve il sorgente finale.

Se quei sorgenti saltano fuori, basta metterli in `latex/` e rigenerare.

## Da sapere

- **`_ORIGINALE/` si può cancellare** quando sei sicuro: contiene i vecchi alberi
  `LATEX/`, `PDF/`, `LIST_OF_PUBBLICATIONS/` e gli zip di `EXTRA/`, tutti già
  copiati dentro `PAPERS/`. L'ho verificato confrontando le impronte dei file.
  Unica eccezione: `_ORIGINALE/LATEX/OLD/` contiene 27 cartelle di versioni
  precedenti e la tesi di dottorato, che **non** stanno altrove.
- **`J03`**: il sorgente aveva la bibliografia disattivata. Le 14 voci mancanti
  sono state ricostruite dal PDF pubblicato (`open/extra.bib`) — **da verificare**.
- La cartella è sotto `git`, ma versiona **solo i metadati**: i PDF e i sorgenti
  restano qui in Dropbox e non vengono caricati.

## Il sito

Le pubblicazioni sono pubblicate su <https://fabiofurini.github.io/publications/>,
generato da questi `meta.yaml`. Il generatore sta in `5_CARRIERA/WEBSITE/`:
si modifica il contenuto, si lancia `python3 build.py`, si fa commit.

**Quando esce un paper nuovo:** crea la cartella in `PAPERS/` con il suo
`meta.yaml`, ricompila il sito e compare da solo.

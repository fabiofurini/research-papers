# Fabio Furini — Research Papers Archive

Archivio pubblico dei paper di ricerca di Fabio Furini (Sapienza Università di Roma),
organizzato per filone di ricerca. Alimenta il sito di presentazione della ricerca.

## Struttura

- `PAPERS/` — una cartella per paper (`meta.yaml` + PDF post-print `aam.pdf` +
  versione LaTeX aperta in `open/`, dove disponibile). I sorgenti originali con la
  storia editoriale e i PDF impaginati dall'editore **non** sono qui: sono materiale
  privato/soggetto a copyright, conservati nell'archivio locale.
- `_INDEX/` — `publications.yaml` (indice completo), `themes.yaml` (filoni di ricerca),
  `publications.bib` (bibliografia con DOI).
- `_COMMON/` — `furinipaper.sty`, il preambolo LaTeX condiviso usato per le versioni
  aperte: classe `article`, nessuna dipendenza da classi di editori.

## Perché l'AAM e non il PDF editoriale

Per la maggior parte delle riviste (Elsevier, Springer, Wiley, IEEE, INFORMS) il
copyright transfer agreement cede all'editore i diritti sul PDF impaginato. Quello
che l'autore può ridistribuire è l'**Author Accepted Manuscript** (AAM): il
manoscritto accettato dopo il referaggio, senza l'impaginazione della rivista.
È lo stesso contenuto scientifico — cambia solo la grafica. Ogni paper linka il DOI,
che porta alla versione ufficiale (Version of Record) sul sito dell'editore.

## Licenza

Il codice di questo repository (script, stile LaTeX) è distribuito con licenza MIT.
I paper restano soggetti ai rispettivi copyright editoriali; vedi il DOI di ciascuno.

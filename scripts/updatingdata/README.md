# Cosa fa questo script
`updatingdata.py` è in grado di aggiorare automaticamente i file esportati da Pino in formato `JSON` sulla base di alcuni semplici file di configurazione.

## Come usare questo script
Il corretto funzionamento di questo script è strettamente determinato dalla corretta formattazione dei file di configurazione `toUpdate.yml` e `tablesInfos.yml`, 
i quali non devono essere spostati dalla loro attuale posizione nella directory.

`toUpdate.yml` contiene un elenco dei file da aggiornare, mentre `tablesInfos.yml` contiene le informazioni delle tabelle su Pino cui lo script fa riferimento.

### Installazione
È consigliabile usare un ambiente virtuale per eseguire questo script, dacché potrebbero crearsi conflitti con versioni di Python successive a quella adoperata per programmarlo.

#### Hint: creare un ambiente virtuale (Linux/MacOS)
Aprire una command line e entrare nella cartella dove si desidera creare l'ambiente virtuale.

Usare il comando:
> python<_x_> -m venv <_nomeAmbiente_>

dove:
- `<x>` sono i primi due gradi (`#.#(#)`, es.: `3.11` o `3.8`) della versione dell'interprete Python (presente nel sistema) con cui si vuole creare l'ambiente (es.: `python3.11` or `python3.8`);
- `<nomeAmbiente>` è il nome dell'ambiente virtuale ed è arbitrario.

Nota: _siccome questo script è stato progettato con Python v3.11.1 è consigliabile avere questa versione_.

Creato l'ambiente virtuale, è necessario attivarlo, in questo modo (senza spostarsi dalla directory attuale):

> source <_nomeAmbiente_>/bin/activate

Attivato l'ambiente virtuale, sarà possibile installare tutti i moduli esterni (si veda il paragrafo successivo), senza rischi di creare conflitti.
Per disattivare l'ambiente virtuale, è sufficiente usare:

> deactivate

all'interno dell'ambiente virtuale attivo.

#### Installazione dei requisiti
Lo script richiede alcuni moduli esterni per essere esguito. Per installare tali moduli, è sufficiente usare:  
> pip install -r requirements.txt  

Nota: _qualora si abbia creato un ambiente virtuale, tale comando va eseguito all'interno di tale ambiente (dopo averlo attivato)._

### Modalità di esecuzione
Eseguire lo script usando:
>python<_x_> main.py (es: `python3.11 main.py` o `python3.8 main.py`)

all'interno della cartella dove si trova `main.py`.

Lo script offre due possibilità di esecuzione:
1. **Automatica**: viene usato come riferimento il file `toUpdate.yml` per determinare i file da aggiornare;
2. **Manuale**: l'utente elenca i nomi dei file da aggiornare, in 2 diverse modalità (vedi sotto).

Le opzioni di scelta della modalità sono poste all'inizio dell'esecuzione dello script.

#### Modalità automatica: _toUpdate.yml_
L'esecuzione della modalità automatica è richiesta tramite pressione del tasto INVIO all'interno del menù principale (o qualora lo script lo consenta).
Lo script avvia la procedura automatica facendo riferimento a `toUpdate.yml`, che contiene i nomi dei file da aggiornare.

`toUpdate.yml` è così formattato:

>tables:  
>>– nome_riferimento_tabella#1: "nome_file_da_aggiornare#1"  
>>– nome_riferimento_tabella#2: "nome_file_da_aggiornare#2"  
>>...  

Lo script usa il contenuto attuale della tabella su Pino col nome di riferimento indicato, per aggiornare il file associato; se una riga associata ad un file da aggiornare non viene aggiunta a `toUpdate.yml`, tale file non verrà aggiornato.

Lo script associa, al nome della tabella indicata su `toUpdate.yml`, una tabella su Pino, grazie ai riferimenti indicati su `tablesInfos.yml`.

I nomi di riferimento delle tabelle sono arbitrari; l'unico vincolo è che essi siano i medesimi su entrambi i file di configurazione, per cui ci si riferisce ad una tabella usando **lo stesso** riferimento sia su `toUpdate.yml` che su `tablesInfos.yml`.

Prima di procedere, lo script avvisa l'utente di ciò che verrà eseguito in fase di aggiornamento:
> 1. Crea i file `JSON` qualora non presenti;
> 2. Aggiorna i file `JSON` già presenti.

Si legga attentamente il paragrafo successivo.

##### **Circostanze particolari**
Qualora un file non sia presente all'interno della repository, è possibile lasciare il relativo campo vuoto, come segue:

>`- nome_riferimento_tabella: ""`

Un nuovo file `nome_riferimento_tabella.json` verrà creato _ex novo_ usando la tabella di riferimento indicata (tramite il `nome_riferimento_tabella`).

Qualora il file sia in formato `CSV`, è comunque possibile inserirlo all'interno del relativo campo, come segue:

>`- nome_riferimento_tabella: "nome_file_da_aggiornare.csv"` 

Il file `CSV` verrà, poi, rimosso e sostituito con un file `JSON`.

Che sia vuota oppure contenente il nome di un file, a fianco di ogni nome di riferimento deve esserci una stringa.

Nota: _durante l'esecuzione, lo script cerca eventuali file `CSV` non indicati nel file di configurazione ma che possiedono lo stesso nome. Ad 
esempio, se nel file di configurazione è indicato `file1.json`, lo script cerca anche un eventuale file `file1.csv` e, se lo trova, chiede 
all'utente se rimuoverlo dalla repository._

#### _Auto-modifica_ del file di configurazione
La modifica di `toUpdate.yml` è parzialmente automatizzata: ogni volta che un file viene aggiornato o creato, sia usando la modalità manuale che la modalità automatica, lo script confronta il contenuto attuale del file di configurazione coi nomi dei file aggiornati/creati; se risulta qualche differenza, lo script aggiorna `toUpdate.yml` da sé, senza richiedere l'intervento umano.

Nota: qualora `toUpdate.yml` contenga un elenco di file non aggiornato rispetto al contenuto attuale della repository, lo script si comporta come descritto nel paragrafo successivo (non viene, quindi, compromesso il suo funzionamento), a patto che la sua formattazione (vedi sopra) sia corretta.

##### Gestione degli errori

1. Qualora un file venga indicato come presente ma non lo sia effettivamente nella repository:
> Lo script tenta di reperire comunque il file indicato in `toUpdate.yml`; se tale file non viene trovato, lo script procederà alla creazione di 
> `nome_riferimento_tabella.json`, usando la tabella col nome di riferimento indicato.
2. Qualora un file venga indicato come non presente ma sia, in realtà, presente nella repository:
> Lo script tenta comunque di creare un file `nome_riferimento_tabella.json`; se è già presente un file omonimo, lo script usa il file già presente come file di riferimento.

> Nota: se il file già presente nella repository ha un nome diverso da `nome_riferimento_tabella.json` , verrà ignorato.
3. Qualora sia specificato un file in formato diverso da quello del file presente nella repository:
> Se il formato del file indicato è `CSV`, ma è presente un omonimo file `JSON`, lo script tenta di creare un nuovo file `JSON` ma, accorgendosi del duplicato,
> devia dalla sua creazione per usare semplicemente il file `JSON` già presente all'interno della repository. Se il formato indicato è `JSON` ma, nella repository, 
> è presente un file `CSV` con lo stesso nome, lo script chiede se rimuovere il `CSV` dalla repository e crea un nuovo file `JSON`.
4. Qualora venga usato un `nome_riferimento_tabella` non presente all'interno di `tablesInfos`:
> Il relativo file non viene aggiornato.

#### Modalità manuale

Lo script offre due modalità di aggiornamento manuale:
1. **Lista di nomi**: l'utente indica una lista di file da aggiornare nel formato `nomeRiferimentoTabella#1:nomeFile#1,nomeRiferimentoTabella#2:nomeFile#2,...`;
2. **Lista di numeri**: l'utente visualizza un elenco numerato di file disponibili e indica una lista di numeri, ognuno corrispondente ad un file all'interno 
dell'elenco, nel formato `#1 #2 ...`.

Nessuna delle modalità manuali consente la creazione di file _ex novo_, per cui l'unico modo per creare file è sfruttare la modalità automatica.

##### Lista di nomi - Gestione degli errori e funzionamento
Lo script riconosce la lista di nomi se al suo interno è presente il carattere `:`.

1. Se il `nomeRiferimentoTabella` di un elemento nella lista indicata non esiste, lo script richiede all'utente di scriverne uno esistente (viene mostrata un lista di nomi di riferimento disponibili).
2. Se il `nomeFile` di un elemento della lista non contiene l'estensione (o la contiene, ma non è `.json` o `.csv`), lo script richiede all'utente di riscrivere il nome del file indicando anche la sua estensione.
3. Se la lista indicata non è formattata correttamente (più di un `:` o nessun `:` per elemento della lista, primo e/o secondo argomento di un elemento della lista non specificato), lo script richiede all'utente di riscrivere l'elemento nella formattazione prevista.

Dopo la correzione di eventuali errori, lo script rimuove dalla lista eventuali elementi duplicati (un elemento è duplicato se possiede entrambi gli argomenti uguali ad un altro già presente).

Prima di procedere, lo script chiede all'utente se i file indicati sono corretti; qualora non lo siano, l'utente può eventualmente tornare al menu principale.

Nota: _se un file indicato nella lista non è presente nella repository, lo script ignora quel file e passa al successivo._

#### List di numeri - Gestione degli errori e funzionamento

L'utente indica la volontà di voler inserire una lista di numeri digitando `list` nel menù principale.

Viene mostrata una lista numerata di file JSON e CSV disponibili all'interno della cartella `data`. L'utente può, quindi, indicare una lista di numeri separati da spazi associati ai file da aggiornare.

Se la lista contiene più spazi del necessario, lo sccript li ignora. 
Se un elemento della lista contiene caratteri non numerici, lo script chiede all'utente di riscrivere tale numero (o scrivere `0`) per ignorarlo.
Se un elemento della lista non è presente nell'elenco numerato proposto, oppure se un elemento della lisa è duplicato, lo script lo ignora.

Prima di procedere, lo script mostra all'utente i file che saranno soggetti ad aggiornamento.

La selezione della tabella su Pino cui lo script fa riferimento per aggiornare i file indicati avviene verificando se, nel nome del file in esame, sia presente una sottostringa contenente un nome di riferimento esistente.
Qualora non sia presente alcun nome, oppure l'utente desideri fare riferimento ad un'altra tabella rispetto a quella suggerita, lo script chiede all'utente di indicare il nome di riferimento associato alla tabella desiderata (è visualizzabile una lista di nomi disponibili inviando `list`).

Nota: _l'elenco numerato proposto contiene TUTTI i file JSON e CSV presenti nella cartella `data`; sta all'utente assicurarsi di selezionare correttamente i file desiderati._ 


#### _tablesInfos.yml_

Questo file contiene i riferimenti alle tabelle su Baserow su cui si basa lo script per aggiornare i file.

`tablesInfos` è così formattato:

>tables:
>>nome_riferimento_tabella#1:
>>
>>>name: "_nomeTabellaSuBaserow_" (stringa)
>>>
>>>id: _identificativoTabella_ (intero)
>>>
>>>view_id: _identificativoView_ (intero)
>>>
>>>included: "_lista,Di,Colonne,Della,Tabella,Da,Includere,Nel,File,Aggiornato_" (stringa) **case sensitive**
>>>
>>>filters: "_lista,di,filtri,da,applicare,alle,righe_" (stringa)
>>>
>>nome_riferimento_tabella#2:
>>...

I nomi dei campi _name_, _id_, _view_id_, _included_ e _filters_ **devono rimanere invariati**; l'ordine dei campi è ininfluente, ma devono essere tutti presenti.

L'unico valore obbligatorio è l'ID della tabella di riferimento. 
- Il campo _name_ è personalizzabile (ma è consigliabile usare il nome effettivo della corrispondente tabella su Pino).  
- Il campo _view_id_ può essere lasciato a 0, qualora non sia necessario fare riferimento ad una view;  
- Il campo _included_, se è una stringa vuota, indica che si considereranno tutte le colonne in fase di aggiornamento;  
- Il campo _filters_, come da nome, contiene gli eventuali (ulteriori) filtri da applicare, altrimenti è una stringa vuota.

Nota: _Non è consentito lasciare un campo vuoto omettendone il valore, seppur nullo; in altre parole, per un campo facoltativo, è possibile, al più, indicare `0` se tale campo prevede un valore intero, `""` se, invece, prevede una stringa.

##### Il campo _filters_

Il campo _filters_ contiene ulteriori eventuali filtri da applicare (se non già applicati all'interno della view indicata). Personalmente, sconsiglio di usare 
questo campo (è complicato) e consiglio di applicare tutti i filtri desiderati all'interno di una view creata _ad hoc_ dall'interfaccia di Baserow.

Qualora si desideri usare il campo _filters_, ecco le cose da sapere:
1. Tale campo è una stringa contente uno o più filtri, separati da una virgola.
2. Un filtro è indicato nel formato `filter__{field}__{filtertype}=value` dove:
>- `{field}` è l'identificativo del campo su cui applicare il filtro.
>- `{filtertype}` è il tipo di filtro da applicare.
>- `value` è il valore di riferimento.  

Per conoscere tali informazioni, si faccia riferimento alla [documentazione della API di Pino](https://pino.scambi.org/api-docs/database/61).

Nota: _lo script non è in grado di gestire filtri che coninvolgono matrici o tipi di dato differenti da stringhe o interi._  
Nota: _se il filtro non possiede una sintassi corretta, viene ignorato._

##### Gestione degli errori
1. Qualora uno dei campi _name_, _id_, _view_id_, _included_ e _filters_ dovesse essere omesso nel file di configurazione:
> Il file associato alla tabella di riferimento non verrà aggiornato.
2. Qualora il campo _name_ non corrisponda al nome reale della tabella su Pino:
> Va bene lo stesso, ma serebbe utile per ausiliare l'utente nell'utilizzo dello script.
3. Qualora il campo _id_ contenga un valore errato (non esistente o scorretto):
> Se il valore è inesistente, il file associato a tale tabella non viene aggiornato; se il valore esiste ma appartiene ad un'altra tabella, il file verrà aggiornato 
> ma facendo riferimento ad una tabella errata.
4. Qualora il _view_id_ non sia corretto:
> Non verrà considerato dallo script.
5. Qualora il campo _included_ contenga elementi non esistenti nella tabella su Pino:
> Questi verranno ignorati.

## Funzioni aggiuntive
### Elenco tabelle disponibili
L'utente può richiedere di visualizzare un elenco di nomi disponibili di riferimento delle tabelle digitando `tables` quando concesso.

Dopo aver visionato tale elenco, l'utente può procedere all'indicazione della modalità di aggiornamento desiderata.


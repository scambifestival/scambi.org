# Cosa fa questo script
`updatingdata.py` è in grado di aggiorare automaticamente i file esportati da Pino in formato `JSON` sulla base di alcuni semplici file di configurazione.

## Come usare questo script
Il corretto funzionamento di questo script è strettamente determinato dalla corretta formattazione dei file di configurazione `toUpdate.yml` e `tablesInfos.yml`, 
i quali non devono essere spostati dalla loro attuale posizione nella directory.

`toUpdate.yml` contiene un elenco dei file da aggiornare, mentre `tablesInfos.yml` contiene le informazioni delle tabelle su Pino cui lo script fa riferimento.

## Modalità di esecuzione

Lo script offre due possibilità di esecuzione:
1. **Automatica**: viene usato come riferimento il file `toUpdate.yml` per determinare i file da aggiornare;
2. **Manuale**: l'utente elenca i nomi dei file da aggiornare, in 2 diverse modalità (vedi sotto).

Le opzioni di scelta della modalità sono poste all'inizio dell'esecuzione dello script.

### _toUpdate.yml_
Qualora venga scelta la modalità automatica, lo script farà riferimento a questo file di configurazione, che contiene i nomi dei file da aggiornare.
Lo script usa i nomi dei file indicati in `toUpdate.yml` per operare. Ad ogni file è associata una tabella su Baserow, identificata da un nome di riferimento.

`toUpdate` è così formattato:

>tables:  
>>– nome_riferimento_tabella#1: "nome_file_da_aggiornare#1"  
>>– nome_riferimento_tabella#2: "nome_file_da_aggiornare#2"  
>>...  

Se una riga associata ad un file da aggiornare non viene aggiunta a `toUpdate.yml`, tale file non verrà aggiornato.

I nomi di riferimento delle tabelle sono arbitrari; l'unico vincolo è che essi siano i medesimi su entrambi i file di configurazione, per cui ci si riferisce ad una tabella usando **lo stesso** riferimento sia su `toUpdate.yml` che su `tablesInfos.yml`.

Prima di procedere, lo script avvisa l'utente di ciò che verrà eseguito in fase di aggiornamento:
- se `nome_file_da_aggiornare` è una stringa vuota (`""`), verrà creato un nuovo file `JSON` con la tabella indicata tramite `nome_riferimento_tabella` corrispondente;
- se `nome_file_da_aggiornare` non è una stringa vuota, lo script lavora col file indicato:
> - se esso è in formato `CSV`, lo sostituirà con un omonimo file JSON;
> - se esso è in formato `JSON`, lo aggiornerà.

#### **Circostanze particolari**
Qualora un file non sia presente all'interno della repository, è possibile lasciare il relativo campo vuoto, come segue:

>`- nome_riferimento_tabella: ""`

Un nuovo file `nome_riferimento_tabella.json` verrà creato _ex novo_ usando la tabella di riferimento indicata (tramite il `nome_riferimento_tabella`).

Qualora il file sia in formato `CSV`, è comunque possibile inserirlo all'interno del relativo campo, come segue:

>`- nome_riferimento_tabella: "nome_file_da_aggiornare.csv"` 

Il file `CSV` verrà, poi, rimosso e sostituito con un file `JSON`.

Nota: _durante l'esecuzione, lo script cerca eventuali file `CSV` non indicati nel file di configurazione ma che possiedono lo stesso nome. Ad 
esempio, se nel file di configurazione è indicato `file1.json`, lo script cerca anche un eventuale file `file1.csv` e, se lo trova, chiede 
all'utente se rimuoverlo dalla repository._

### _Auto-modifica_ del file di configurazione
La modifica di `toUpdate.yml` è parzialmente automatizzata: ogni volta che un file viene aggiornato o creato, sia usando la modalità manuale che la modalità automatica, lo script confronta il contenuto attuale del file di configurazione coi nomi dei file aggiornati/creati; se risulta qualche differenza, lo script aggiorna `toUpdate.yml` da sé, senza richiedere l'intervento umano.

Nota: qualora `toUpdate.yml` contenga un elenco di file non aggiornato all'interno della repository, lo script si comporta come descritto nel paragrafo successivo (non viene, quindi, compromesso il suo funzionamento), a patto che la sua formattazione (vedi sopra) sia corretta.

#### Gestione degli errori

1. Qualora un file venga indicato come presente ma non lo sia effettivamente nella repository:
> Lo script tenta di reperire comunque il file indicato in `toUpdate.yml`; se tale file non viene trovato, lo script procederà alla creazione di 
> `nome_riferimento_tabella.JSON`, usando la tabella col nome di riferimento indicato.
2. Qualora un file venga indicato come non presente ma sia, in realtà, presente nella repository:
> Lo script tenta comunque di creare un file `JSON`; se è già presente un file omonimo, lo script usa il file già presente come file di riferimento.
3. Qualora sia specificato un file in formato diverso da quello del file presente nella repository:
> Se il formato del file indicato è `CSV`, ma è presente un omonimo file `JSON`, lo script tenta di creare un nuovo file `JSON` ma, accorgendosi del duplicato,
> devia dalla sua creazione per usare semplicemente il file `JSON` già presente all'interno della repository. Se il formato indicato è `JSON` ma, nella repository, 
> è presente un file `CSV` con lo stesso nome, lo script chiede se rimuovere il `CSV` dalla repository e crea un nuovo file `JSON`.
4. Qualora venga usato un `nome_riferimento_tabella` non presente all'interno di `tablesInfos`:
> Il relativo file non viene aggiornato.

### Modalità manuale

Lo script offre due modalità di aggiornamento manuale:
1. **Lista di nomi**: l'utente indica una lista di file da aggiornare nel formato `nomeRiferimentoTabella#1:nomeFile#1,nomeRiferimentoTabella#1:nomeFile#2,...`;
2. **Lista di numeri**: l'utente visualizza un elenco numerato di file disponibili e indica una lista di numeri, ognuno corrispondente ad un file all'interno 
dell'elenco, nel formato `#1 #2 ...`.

Nessuna delle due modalità manuali consente la creazione di file _ex novo_, per cui l'unico modo per creare file è sfruttare la modalità automatica.

#### Lista di nomi - Gestione degli errori e funzionamento
Lo script riconosce la lista di nomi se al suo interno è presente il carattere `:`.

1. Se il `nomeRiferimentoTabella` non esiste, lo script richiede all'utente di scriverne uno esistente (viene mostrata un lista di nomi di riferimento disponibili).
2. Se `nomeFile` non contiene l'estensione (o la contiene, ma non è corretta), lo script richiede all'utente di riscrivere il nome del file indicando anche la sua estensione.
3. Se la lista indicata non è formattata correttamente (più di un `:` o nessun `:` per elemento della lista, primo e/o secondo argomento di un elemento della lista non specificato), lo script richiede all'utente di riscrivere l'elemento nella formattazione prevista.

Prima di procedere, lo script chiede all'utente se i file indicati sono corretti; qualora non lo siano, l'utente può eventualmente tornare al menu principale.

Nota: _se un file indicato nella lista non è presente nella repository, lo script ignora quel file e passa al successivo._

### _tablesInfos.yml_

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
>>>included: "_lista,Di,Colonne,Della,Tabella,Da,Includere,Nel,File,Aggiornato_" (stringa)
>>>
>>>filters: "_lista,di,filtri,da,applicare,alle,righe_" (stringa)
>>>
>>nome_riferimento_tabella#2:
>>...

I nomi dei campi _name_, _id_, _view_id_, _included_ e _filters_ **devono rimanere invariati**; l'ordine dei campi è ininfluente, ma devono essere tutti presenti.

L'unico valore obbligatorio è l'ID della tabella di riferimento. 
- Il campo _name_ è personalizzabile (ma è consigliabile usare il nome effettivo della corrispondente tabella su Baserow).  
- Il campo _view_id_ può essere lasciato a 0, qualora non sia necessario fare riferimento ad una view;  
- Il campo _included_, se è una stringa vuota, indica che si considereranno tutte le colonne in fase di aggiornamento;  
- Il campo _filters_, come da nome, contiene gli eventuali (ulteriori) filtri da applicare, altrimenti è una stringa vuota.

#### Il campo _filters_

Il campo _filters_ contiene ulteriori eventuali filtri da applicare (se non già applicati all'interno della view indicata). Personalmente, sconsiglio di usare 
questo campo e consiglio di applicare tutti i filtri desiderati all'interno di una view creata _ad hoc_ dall'interfaccia di Baserow.

Qualora di desideri usare il campo _filters_, ecco le cose da sapere:
1. Tale campo è una stringa contente uno o più filtri, separati da una virgola.
2. Un filtro è indicato nel formato `filter__{field}__{filtertype}=value` dove:
>- `{field}` è l'identificativo del campo su cui applicare il filtro.
>- `{filtertype}` è il tipo di filtro da applicare.
>- `value` è il valore di riferimento.  

Per conoscere tali informazioni, si faccia riferimento alla [documentazione della API di Pino](https://pino.scambi.org/api-docs/database/61).

Nota: _lo script non è in grado di gestire filtri che coninvolgono matrici o tipi di dato differenti da stringhe o interi._  
Nota: _se il filtro non possiede una sintassi corretta, viene ignorato._

#### Gestione degli errori
1. Qualora uno dei campi _name_, _id_, _view_id_, _included_ e _filters_ dovesse essere omesso nel file di configurazione:
> Il file associato alla tabella di riferimento non verrà aggiornato.
2. Qualora il campo _name_ non corrisponda al nome reale della tabella su Baserow:
> Va bene lo stesso, ma serebbe utile per ausiliare l'utente nell'utilizzo dello script.
3. Qualora il campo _id_ contenga un valore errato (non esistente o scorretto):
> Se il valore è inesistente, il file associato a tale tabella non viene aggiornato; se il valore esiste ma appartiene ad un'altra tabella, il file verrà aggiornato 
> ma facendo riferimento ad una tabella errata.
4. Qualora il _view_id_ non sia corretto:
> Non verrà considerato dallo script.


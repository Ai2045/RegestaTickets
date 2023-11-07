namespace regestaTickets.db;

entity Tickets
{
    key ID : Integer;
    insertDate : Date;
    utente : String(50);
    IDCliente : Association to Clienti;
    IDCommessa : Association to Commesse;
    areaFunzionale : String(50);
    titolo : String(250);
    testo : LargeString;
    propostoA : String(50);
    giorniStima : Decimal(18,3);
    dataConsegnaRichiesta : Date;
    assegnatoA : String(250);
    giorniCons : Decimal(18,3);
    dataConsegnaSchedulata : Date;
    status : Integer;
    dataChiusura : Date;
    ordinamento : Integer;
    allegato : String(250);
    statusPrev : Integer;
    externalID : String(50);
    flagVisibileCliente : Boolean;
    dataProduzione : Date;
    flagBugFix : Boolean;
    giorniConsCliente : Decimal(18,3);
    chatPubblica : LargeString;
    assegnatoAPrev : String(250);
    flagCR : Boolean;
    flagArxivar : Boolean;
    IDParent : Integer;
    chatPrivata : LargeString;
    dataSpecifiche : Date;
    giorniConsDev : Decimal(18,3);
    giorniStimaDev : Decimal(18,3);
    giorniStimaFunz : Decimal(18,3);
    giorniConsFunz : Decimal(18,3);
    dataSviluppi : Date;
    flagDev : Boolean;
    flagFunz : Boolean;
    criticita : LargeString;
    flagPadre : Boolean;
    flagFiglio : Boolean;
    nRilavorazioni : Integer;
    supportoFunzionale : String(250);
    flagNeedDev : Boolean;
    flagNeedFunz : Boolean;
    flagIngegnerizzabile : Boolean;
    nAllegati : Integer;
    ordineSap : String(40);
    ultimaModifica : Date;
    ultimaModificaUtente : String(50);
    ultimaModificaCliente : Date;
    ultimaModificaUtenteCliente : String(50);
    flagAms : Boolean;
    IDTipologia : Association to Tipologia;
    inoltraA : String(250);
    messageID : String(255);
}

entity Commesse
{
    key ID : Integer;
    IDSocieta : Integer;
    IDCliente : Association to Clienti;
    codice : String(50);
    macroCommessa : String(50);
    descrizione : String(250);
    stato : Integer;
    dataInizio : Date;
    dataFine : Date;
    dataGolive : Date;
    rifCliente : String(250);
    rifProgetto : String(250);
    rifFunzionale : String(250);
    rifTecnico : String(250);
    giorniProgetto : Decimal(18,1);
    giorniFunzionale : Decimal(18,1);
    giorniSviluppo : Decimal(18,1);
    note : LargeString;
    pianificabile : Boolean;
    visibileCliente : Boolean;
    codiceICMS : String(100);
    sapOdv : String(50);
    tipologia : String(50);
    categoria : String(50);
    fixOrTimeMaterial : String(2);
}

entity Clienti
{
    key ID : Integer;
    codice : String(50);
    descrizione : String(250);
    password : LargeString;
    giorniProgettoAnno : Decimal(18,1);
    giorniFunzionaleAnno : Decimal(18,1);
    giorniSviluppoAnno : Decimal(18,1);
    revisione : Boolean;
    sapCodice : String(250);
    logo : String(250);
    scheda : String(250);
    account : String(150);
}

entity ClientiAreeFunzionali
{
    key ID : Integer;
    IDCliente : Association to Clienti;
    IDCommessa : Association to Commesse;
    areaFunzionale : String(50);
    emailList : String(4000);
    flagAms : Boolean;
}

entity ChangeLog
{
    key ID : Integer;
    insertDate : Date;
    utente : String(50);
    IDTicket : Association to Tickets;
    titolo : String(250);
    testo : LargeString;
    propostoA : String(50);
    giorniStima : Decimal(18,3);
    dataConsegnaRichiesta : Date;
    assegnatoA : String(250);
    giorniCons : Decimal(18,3);
    dataConsegnaSchedulata : Date;
    status : Integer;
    dataChiusura : Date;
    ordinamento : Integer;
    allegato : String(250);
    statusPrev : Integer;
    externalID : String(50);
    flagVisibileCliente : Boolean;
    updateDate : Date;
    updateUtente : String(50);
    dataProduzione : Date;
    flagBugFix : Boolean;
    giorniConsCliente : Decimal(18,3);
    chatPubblica : LargeString;
    assegnatoAPrev : String(250);
    flagCR : Boolean;
    chatPrivata : LargeString;
    dataSpecifiche : Date;
    giorniConsDev : Decimal(18,3);
    giorniStimaDev : Decimal(18,3);
    giorniStimaFunz : Decimal(18,3);
    giorniConsFunz : Decimal(18,3);
    dataSviluppi : Date;
    flagDev : Boolean;
    flagFunz : Boolean;
    criticita : String(20);
    flagFiglio : Boolean;
    flagPadre : Boolean;
    nRilavorazioni : Integer;
    supportoFunzionale : String(250);
    flagNeedDev : Boolean;
    flagNeedFunz : Boolean;
    areaFunzionale : String(10);
    IDParent : Integer;
    flagArxivar : Boolean;
    flagIngegnerizzabile : Boolean;
    nAllegati : Integer;
    sentTo : String(2000);
    ordineSap : String(40);
    flagAms : Boolean;
    IDTipologia : Association to Tipologia;
    inoltraA : String(250);
}

entity Status
{
    key ID : Integer;
    status : String(30);
    statusIT : String(30);
    statusEN : String(30);
}

entity Tipologia
{
    key ID : Integer;
    tipologiaCommessa : String(50);
    fixOrTimeMaterial : String(2);
    tipologia : String(50);
    flagMonitorBudget : Boolean;
    flagConfrontoBudget : Boolean;
    IDCliente : Association to Clienti;
    flagDefault : Boolean;
}

entity AssegnatoA
{
    key ID : Integer;
    IDTicket : Association to Tickets;
    assegnatoA : String(50);
    giorniPrev : Decimal(18,3);
    giorniCons : Decimal(18,3);
    status : Integer;
    dataInizio : Date;
    dataFine : Date;
    avanzamento : Integer;
    ruolo : String(50);
    responsabile : Boolean;
    completato : Boolean;
    standby : Boolean;
}

entity Allegati
{
    key ID : Integer;
    IDTicket : Association to Tickets;
    allegato : String(250);
    descrizione : String(250);
    visibileCliente : Boolean;
    fileName : String(50);
    mimeType : String(50);
    utente : String(250);
    insertDate : Date;
    docnumberarx5 : String(50);
    docnumberarxnext : String(50);
}

entity AreeFunzionali
{
    key ID : Integer;
    areaFunzionale : String(10);
    descrizione : String(150);
}

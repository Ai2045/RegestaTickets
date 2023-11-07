namespace regestaTickets.srv;

using { regestaTickets.db as db } from '../db/schema';

service TicketsService {
    entity Tickets as projection on db.Tickets;

    entity Allegati as projection on db.Allegati;
    
    entity AreeFunzionali as projection on db.AreeFunzionali;
    
    entity AssegnatoA as projection on db.AssegnatoA;
    
    entity ChangeLog as projection on db.ChangeLog;
    
    entity Clienti as projection on db.Clienti;
    
    entity ClientiAreeFunzionali as projection on db.ClientiAreeFunzionali;
    
    entity Commesse as projection on db.Commesse;
    
    entity Status as projection on db.Status;
    
    entity Tipologia as projection on db.Tipologia;
}
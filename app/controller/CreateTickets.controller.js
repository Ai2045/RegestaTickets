sap.ui.define([ 
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
 ], 

    function (Controller, MessageToast, JSONModel) {
   "use strict";
    return Controller.extend("regestaTickets.controller.CreateTickets", {

        onInit : async function () {
            var newModel = new sap.ui.model.json.JSONModel()
            newModel.setData({ticket: {
                "ID": 19872,
                "insertDate":"",
                "utente":"",
                "IDCliente_ID": "",
                "IDCommessa_ID": "",
                "areaFunzionale":"",
                "titolo":"",
                "testo":"",
                "propostoA":"",
                "giorniStima": 2,
                "dataConsegnaRichiesta":"",
                "assegnatoA":"",
                "giorniCons":0,
                "dataConsegnaSchedulata":"2023-06-14",
                "status":"",
                "dataChiusura":"2023-06-14",
                "ordinamento":0,
                "allegato":"",
                "statusPrev":0,
                "externalID":"",
                "flagVisibileCliente":true,
                "dataProduzione":"2023-06-14",
                "flagBugFix":true,
                "giorniConsCliente":0,
                "chatPubblica":"",
                "assegnatoAPrev":"",
                "flagCR":true,
                "flagArxivar":true,
                "IDParent":0,
                "chatPrivata":"",
                "dataSpecifiche":"2023-06-14",
                "giorniConsDev":0,
                "giorniStimaDev":0,
                "giorniStimaFunz":0,
                "giorniConsFunz":0,
                "dataSviluppi":"2023-06-14",
                "flagDev":true,
                "flagFunz":true,
                "criticita":"",
                "flagPadre":true,
                "flagFiglio":true,
                "nRilavorazioni":0,
                "supportoFunzionale":"",
                "flagNeedDev":true,
                "flagNeedFunz":true,
                "flagIngegnerizzabile":true,
                "nAllegati":0,
                "ordineSap":"",
                "ultimaModifica":"2023-06-14",
                "ultimaModificaUtente":"",
                "ultimaModificaCliente":"2023-06-14",
                "ultimaModificaUtenteCliente":"",
                "flagAms":true,
                "IDTipologia_ID":"",
                "inoltraA":"",
                "messageID":""
            }});

            // const context = await oModel.bindList('/Tickets').requestContexts();
            // const tickets = context.map(x=> (x.getObject()));
            this.getView().setModel(newModel);
        },
       
        delete: async function() {
        this.getOwnerComponent().getRouter().navTo("Tickets")
        
        },
        

        createTicket: async function () {
            const view=this.getView();
            const oModel = this.getOwnerComponent().getModel()
            view.getModel().setProperty("/ticket/IDCliente_ID", parseInt(view.byId("Select-clienti").getSelectedItem().getKey()))
            view.getModel().setProperty("/ticket/ordineSap", view.byId("Select-ordineSap").getSelectedItem().getKey())
            view.getModel().setProperty("/ticket/IDCommessa_ID", parseInt(view.byId("Select-commessa").getSelectedItem().getKey()))
            view.getModel().setProperty("/ticket/areaFunzionale", view.byId("Select-areaFunzionale").getSelectedItem().getKey())
            view.getModel().setProperty("/ticket/IDTipologia_ID", parseInt(view.byId("Select-tipologia").getSelectedItem().getKey()))
            view.getModel().setProperty("/ticket/status", parseInt(view.byId("Select-status").getSelectedItem().getKey()))
            view.getModel().setProperty("/ticket/criticita", view.byId("Select-urgenza").getSelectedItem().getKey())
            view.getModel().setProperty("/ticket/giorniStima", view.byId("Input-giorniStima").getValue())
            console.log(view.getModel().getProperty("/ticket"));
            await oModel.bindList('/Tickets').create(view.getModel().getProperty("/ticket"))
        }
    });
});
sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
        return Controller.extend("regestaTickets.controller.EditTickets", {

         onInit: function () {   
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.getRoute("EditTickets").attachPatternMatched(this._onObjectMatched, this);

         },
         _onObjectMatched: function (oEvent) {
            const pathID = oEvent.getParameter("arguments").pathID;
            console.log(pathID);
            this.onBindText(pathID);

         },

         onBindText: function (pathID) {
            var oModel = this.getOwnerComponent().getModel();
            var oView = this.getView();
            var oContextBinding = oModel.bindContext("/Tickets("+pathID+")");
            oContextBinding.requestObject().then(function(oData){
               console.log(oData);
               // create JSON model instance
               var newModel = new sap.ui.model.json.JSONModel();
               // set the odata JSON as data of JSON model
               newModel.setData(oData);
               oView.setModel(newModel, "editTicket");
            });
         },

         onSave() {
            const oModel = this.getOwnerComponent().getModel();
            const pathID = this.getView().getModel("editTicket").getProperty("/ID");
            const ticketsBiding = oModel.bindContext("/Tickets("+pathID+")", undefined, {$$updateGroupId: "cmpchange"});
            ticketsBiding.requestObject().then(function(object) {
               console.log("sono in binding")
               if (!object) {
                  console.log(object)
                  object.getBoundContext().setProperty("/utente", "mario rossi")
                  console.log(object)
               }
            })
            
            oContext.execute().then(function(){
               oModel.submitBatch("cmpchange");
            });
            this.onNavBack();
         }
   });
 });
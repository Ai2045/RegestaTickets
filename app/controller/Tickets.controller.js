sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/TablePersoController",
	"./PersoService",
	"sap/m/library",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo'
], function (Controller, TablePersoController, PersoService, mlibrary, Filter, FilterOperator, PersonalizableInfo) {
	"use strict";
	var ResetAllMode = mlibrary.ResetAllMode;

	return Controller.extend("regestaTickets.controller.Tickets", {
		onInit: async function () {
			this._oTPC = new TablePersoController({
				table: this.byId("ticketsTable"),
				componentName: "regestaTickets",
				resetAllMode: ResetAllMode.ServiceReset,
				persoService: PersoService
			}).activate();

			this.applyData = this.applyData.bind(this);
			this.fetchData = this.fetchData.bind(this);
			this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

			this.oSmartVariantManagement = this.getView().byId("svm");
			this.oExpandedLabel = this.getView().byId("expandedLabel");
			this.oSnappedLabel = this.getView().byId("snappedLabel");
			this.oFilterBar = this.getView().byId("filterbar");
			this.oTable = this.getView().byId("ticketsTable");

			this.oFilterBar.registerFetchData(this.fetchData);
			this.oFilterBar.registerApplyData(this.applyData);
			this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

			var oPersInfo = new PersonalizableInfo({
				type: "filterBar",
				keyName: "persistencyKey",
				dataSource: "",
				control: this.oFilterBar
			});
			this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
			this.oSmartVariantManagement.initialise(function () { }, this.oFilterBar);

			// Rimozione duplicati

			const model = this.getOwnerComponent().getModel();
			
			const contextTickets = await model.bindList("/Tickets", undefined, undefined, undefined, { $expand: "IDCliente,IDCommessa,IDTipologia" }).requestContexts();
			const parametersTickets = ["utente", "IDCliente_descrizione", "titolo", "status", "assegnatoA", "IDCommessa_descrizione", "giorniStima", "giorniCons", "flagNeedDev", "flagNeedFunz", "allegato", "flagAms", "areaFunzionale", "flagBugFix", "flagCR", "chatPubblica", "flagDev", "flagFunz", "externalID", "giorniConsCliente", "giorniConsDev", "giorniStimaDev", "giorniStimaFunz", "IDParent", "ordineSap", "criticita", "nRilavorazioni", "supportoFunzionale", "testo", "IDTipologia_tipologia", "flagVisibileCliente"]
			const tickets = contextTickets.map(x => (x.getObject()));
			this.filterMultiComboBox(parametersTickets, tickets)
			
			// const context = await oModel.bindList('/Tickets').requestContexts();
			// const tickets = context.map(x=> (x.getObject()));
		},

		filterMultiComboBox: function (parameters, tickets) {
			parameters.forEach(parameter => {
				var oMultiComboBox = this.getView().byId("idMultiComboBox-" + parameter);
				oMultiComboBox.removeAllItems();
				parameter = parameter.split("_")
				let uniqueItems = []

				if (parameter.length > 1) {
					uniqueItems = [...new Set(tickets.map(x => (
						x[parameter[0]][parameter[1]]
					)))]
				} else {
					uniqueItems = [...new Set(tickets.map(x => (
						x[parameter[0]]
					)))]
				}

				uniqueItems.forEach(item => {
					oMultiComboBox.addItem(new sap.ui.core.Item({
						key: item,
						text: item
					}));
				})
			})
		},

		onEditColumn: function (oEvent) {
			this._oTPC.openDialog()
		},

		onTableRefresh: function () {
			this.getOwnerComponent().getModel().refresh()
		},

		onExit: function () {
			this.oModel = null;
			this.oSmartVariantManagement = null;
			this.oExpandedLabel = null;
			this.oSnappedLabel = null;
			this.oFilterBar = null;
			this.oTable = null;
			this._oTPC.destroy()
		},

		fetchData: function () {
			var aData = this.oFilterBar.getAllFilterItems().reduce(function (aResult, oFilterItem) {
				aResult.push({
					groupName: oFilterItem.getGroupName(),
					fieldName: oFilterItem.getName(),
					fieldData: oFilterItem.getControl().getSelectedKeys()
				});
				return aResult;
			}, []);
			return aData;
		},

		applyData: function (aData) {
			aData.forEach(function (oDataObject) {
				var oControl = this.oFilterBar.determineControlByName(oDataObject.fieldName, oDataObject.groupName);
				oControl.setSelectedKeys(oDataObject.fieldData);
			}, this);
		},

		getFiltersWithValues: function () {
			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl();

				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
					aResult.push(oFilterGroupItem);
				}

				return aResult;
			}, []);
			return aFiltersWithValue;
		},

		onSelectionChange: function (oEvent) {
			this.oSmartVariantManagement.currentVariantSetModified(true);
			this.oFilterBar.fireFilterChange(oEvent);
		},

		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.EQ,
							value1: sSelectedKey
						});
					});
				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);

			this.oTable.getBinding("items").filter(aTableFilters);
			this.oTable.setShowOverlay(false);
		},

		onFilterChange: function () {
			this._updateLabelsAndTable();
		},

		onAfterVariantLoad: function () {
			this._updateLabelsAndTable();
		},

		getFormattedSummaryText: function () {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			if (aFiltersWithValues.length === 1) {
				return aFiltersWithValues.length + " filter active: " + aFiltersWithValues.join(", ");
			}

			return aFiltersWithValues.length + " filters active: " + aFiltersWithValues.join(", ");
		},

		getFormattedSummaryTextExpanded: function () {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			var sText = aFiltersWithValues.length + " filters active",
				aNonVisibleFiltersWithValues = this.oFilterBar.retrieveNonVisibleFiltersWithValues();

			if (aFiltersWithValues.length === 1) {
				sText = aFiltersWithValues.length + " filter active";
			}

			if (aNonVisibleFiltersWithValues && aNonVisibleFiltersWithValues.length > 0) {
				sText += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
			}

			return sText;
		},

		_updateLabelsAndTable: function () {
			this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
			this.oSnappedLabel.setText(this.getFormattedSummaryText());
			this.oTable.setShowOverlay(true);
		},

		openEditTicket: function (oEvent) {
			var oItem = oEvent.getSource();
			var oBindingContext = oItem.getBindingContext();
			var oModel = this.getOwnerComponent().getModel();

			this.getOwnerComponent().getRouter().navTo("EditTickets", { pathID: oBindingContext.getObject().ID })
			// oSettingsModel.setProperty("/navigatedItem", oModel.getProperty("ProductId", oBindingContext));
		},

		onCreateTicket: function () {
			this.getOwnerComponent().getRouter().navTo("CreateTickets")
		}

	});
});
sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";
	new ComponentContainer({
		name: "regestaTickets",
		settings : {
			id : "regestaTickets"
		},
		async: true
	}).placeAt("content");
});
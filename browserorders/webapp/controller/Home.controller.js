sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
    "sap/ui/core/UIComponent"

], function(Controller, ODataModel, JSONModel, Filter, FilterOperator, formatter, UIComponent) {
    "use strict";
    return Controller.extend("com.lab2dev.browserorders.controller.Home", {
        formatter: formatter,
        onInit: function() {
            const oData = new ODataModel("/northwind/northwind.svc/");

            oData.read("/Orders", {
                urlParameters: {
                    "$expand": "Order_Details"
                },
                success: function(data) {
                    console.log(data)
                    const jsonModel = new JSONModel(data);
                    this.getView().setModel(jsonModel, "items");
                }.bind(this),
                error: function(error) {
                    console.error("Erro ao carregar os dados:", error);
                }
            });
        },
        onSearch: function(oEvent) {
            // Obter o valor de pesquisa do evento
            var sSearchValue = oEvent.getParameter("query");

            // Obter a referência à lista
            var oList = this.getView().byId("invoiceList");

            // Obter o binding da lista
            var oBinding = oList.getBinding("items");

            if (oBinding) {
                var aFilters = [];
                if (sSearchValue) {
                    aFilters.push(new Filter("OrderID", FilterOperator.EQ, sSearchValue));
                }
                oBinding.filter(aFilters);
            }
        },
        onPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetail", {
                orderId: oEvent.getSource().getProperty("title")
            });
        }
    })
});
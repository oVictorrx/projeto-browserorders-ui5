sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], function(Controller, ODataModel, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.browserorders.controller.Detail", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function(oEvent) {
            this.getView().setModel(new JSONModel([]), "items");
            this.byId('orderDetailsTable').setBusy(true)

            const orderID = oEvent.getParameter("arguments").orderId

            const oData = new ODataModel("/northwind/northwind.svc/");
            oData
                .read(`/Orders(${orderID})`,{
                    urlParameters: {
                        "$expand": "Order_Details/Product, Shipper",
                    },
                    success: function(data) {
                        const jsonModel = new JSONModel(data.Order_Details.results);
                        this.getView().setModel(jsonModel, "items");
                        this.byId('orderDetailsTable').setBusy(false)
                    }.bind(this),
                    error: function(error) {
                        this.byId('orderDetailsTable').setBusy(false)
                        console.error("Erro ao carregar os dados:", error);
                    }
                });
        }
    });
});
sap.ui.define([], function() {
    "use strict";

    return {
        shipmentStatusText: function(OrderDate, ShippedDate) {

            // Converte as datas em objetos Date
            const dateOrder = new Date(OrderDate);
            const dateShipped = new Date(ShippedDate);

            // Calcula a diferença em milissegundos entre as datas
            const diffMilliseconds = dateShipped - dateOrder;

            // Converte a diferença para dias
            const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24);

            // Define os limites para os status
            const inTimeLimit = 10;
            const urgentLimit = 15;

            // Determina o status com base na diferença em dias
            if (diffDays <= inTimeLimit) {
                return "In time";
            } else if (diffDays <= urgentLimit) {
                return "Urgent";
            } else {
                return "Too Late";
            }
        },
        shipmentStatus: function(OrderDate, ShippedDate) {
            // Converte as datas em objetos Date
            const dateOrder = new Date(OrderDate);
            const dateShipped = new Date(ShippedDate);

            // Calcula a diferença em milissegundos entre as datas
            const diffMilliseconds = dateShipped - dateOrder;

            // Converte a diferença para dias
            const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24);

            // Define os limites para os status
            const inTimeLimit = 10;
            const urgentLimit = 15;

            // Determina o status com base na diferença em dias
            if (diffDays <= inTimeLimit) {
                return "Success";
            } else if (diffDays <= urgentLimit) {
                return "Warning";
            } else {
                return "Error";
            }
        },
        formatDate: function(sDate) {
            if (sDate) {
                var oDate = new Date(sDate);
                var day = oDate.getDate();
                var month = oDate.getMonth() + 1;
                var year = oDate.getFullYear();

                // Formate os valores para ter dois dígitos (por exemplo, 01 em vez de 1)
                var formattedDay = day < 10 ? "0" + day : day;
                var formattedMonth = month < 10 ? "0" + month : month;

                return formattedDay + "/" + formattedMonth + "/" + year;
            }
            return "";
        }
    };
});
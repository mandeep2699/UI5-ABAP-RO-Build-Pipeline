sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.transports.transport.controller.View1", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel, "TestModel");
                this.getCriticalObjectMaintenanceSet();
            },

            getCriticalObjectMaintenanceSet: async function () {

                
                var oModel = this.getOwnerComponent().getModel();
                const info = await $.get(oModel.sServiceUrl + '/CriticalObjectMaintenanceSet');
                if (info && info.value) {
                    this.getView().getModel("TestModel").setProperty("/Projects", info.value);
                }

                oModel.read("/CriticalObjectMaintenanceSet", {
                    success: (data) => {
                        this.getView().getModel("TestModel").setProperty("/Projects", data.results);
                    }
                });
            }
        });
    });

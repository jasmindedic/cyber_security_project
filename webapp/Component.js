/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "cybersecurity/cybersecurity/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("cybersecurity.cybersecurity.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // set model for emails (domain page)
                let oData = {
                    emailsFound: []
                };
                let oModel = new JSONModel(oData);
                this.setModel(oModel, "emails");

                
                
                // set model for EmailCheck
                let oDataMail = {
                    emailsFoundCheck: []
                };
                let oModelMail = new JSONModel(oDataMail);
                this.setModel(oModelMail, "emailsCheck");
            }
        });
    }
);
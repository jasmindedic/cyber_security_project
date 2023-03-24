sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("cybersecurity.cybersecurity.controller.Domain", {
            onInit: function () {
                this.jsonModel = this.getOwnerComponent().getModel("emails");
                this.localData = this.jsonModel.oData;
                this.getView().setModel(this.jsonModel);
            },

            sendDomainRequest: function (input) {

                const apiKey = "45a3296051cc5b5cc710ceba6b076a270c0dc993";

                let url = "https://cors-anywhere.herokuapp.com/https://api.hunter.io/v2/domain-search?domain=" + input + "&api_key=" + apiKey;

                console.log(url);

                return new Promise(function (resolve, reject) {
                    $.ajax({
                        type: 'GET',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                        },
                        success: function (resp) {
                            resolve(resp);
                        },
                        error: function (req, status, err) {
                            console.log('something went wrong', status, err);
                            reject(oError);
                        }
                    });
                });
            },

            onPressButton: function () {
                let inputDomain = this.getView().byId("domainInput").getValue();
                
                if (!inputDomain) {
                    MessageToast.show(`You haven't inserted any domain name`);
                } else {

                    this.sendDomainRequest(inputDomain).then((result) => {
                        console.log(result.data.emails);
                        console.log("localdata=" + this.localData);

                        this.localData["emailsFound"] = result.data.emails;
                        this.jsonModel.setData(this.localData);

                        if (this.localData.emailsFound.length === 0) {

                            MessageToast.show('Please enter valid domain name!');
                        }

                        console.log(this.localData);

                    })
                }
            }
        });
    });
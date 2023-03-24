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

            sendDomainRequest: function () {
                let inputDomain = this.getView().byId("domainInput").getValue();
                console.log(inputDomain);
                
                const apiKey = "45a3296051cc5b5cc710ceba6b076a270c0dc993";
                
                let url = "https://cors-anywhere.herokuapp.com/https://api.hunter.io/v2/domain-search?domain=" + inputDomain + "&api_key=" + apiKey;

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

            onPressButton: function(){
                
                this.sendDomainRequest().then((result) => {
                    console.log(result.data.emails);
                    console.log("localdata=" + this.localData);

                    this.localData["emailsFound"] = result.data.emails;
                    this.jsonModel.setData(this.localData);

                    console.log(this.localData);


                    MessageToast.show("Hallo", {
                        duration: 4000,
                        at: "center center"
                    });
                })
            },

            showResults: function () {
                // anzahl
            },  
        });
    });
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("cybersecurity.cybersecurity.controller.Finder", {
            onInit: function () {
            },

            sendRequest: function (firstName, lastName, domainName) {

                const apiKey = "45a3296051cc5b5cc710ceba6b076a270c0dc993";

                let url = "https://cors-anywhere.herokuapp.com/https://api.hunter.io/v2/email-finder?domain=" + domainName + "&first_name=" + firstName + "&last_name=" + lastName + "&api_key=" + apiKey;

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
                let inputFirstName = this.getView().byId("inputFirstName").getValue();
                let inputLastName = this.getView().byId("inputLastName").getValue();
                let inputDomainName = this.getView().byId("inputDomainName").getValue();

                if (!(inputDomainName && inputFirstName && inputLastName)) {
                    MessageToast.show(`Please fill all fields`);
                } else {
                    this.sendRequest(inputFirstName, inputLastName, inputDomainName).then((result) => {
                        console.log(result.data);
                        let validity = result.data.score;
                        let countSources = result.data.sources.length;

                        if (validity < 90) {
                            this.getView().byId("validityStrip").setType("Warning");
                        } else {
                            this.getView().byId("validityStrip").setType("Success");
                        }
                        this.getView().byId("validityStrip").setText("This Email is valid with a score of " + validity + "%");
                        this.getView().byId("counterStrip").setText("We found your Email " + countSources + " times on the web");
                        this.getView().byId("counterStrip").setVisible(true);
                        this.getView().byId("validityStrip").setVisible(true);
                    })
                }
            },
        });
    });
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(BaseController,MessageToast) {
      "use strict";
  
      return BaseController.extend("cybersecurity.cybersecurity.controller.EmailCheck", {
        onInit() {
          
        },

        onSubmit: function () {
          // collect input controls
          var oView = this.getView(),
            aInputs = oView.byId("emailInput"),
            inputUserValue = aInputs.getValue();
            
            console.log(inputUserValue);
            MessageToast.show("The input is validated. Your form has been submitted." + inputUserValue);
          
            const apiKey = "c54d3543f972a7a05c9107719f99289030a19ab0";
                let url = "https://cors-anywhere.herokuapp.com/https://api.hunter.io/v2/email-verifier?email=" + inputUserValue + "&api_key=" + apiKey;
                console.log(url);
                // send request
                $.ajax({
                    type: 'GET',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                    success: function (resp) {
                        console.log(resp);
                    },
                    error: function (req, status, err) {
                       console.log('something went wrong', status, err);
                    }
       });
        },
      });
    }
  );
  
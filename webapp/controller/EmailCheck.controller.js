sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(BaseController,MessageToast) {
      "use strict";
  
      return BaseController.extend("cybersecurity.cybersecurity.controller.EmailCheck", {
        onInit() {
                this.jsonModel = this.getOwnerComponent().getModel("emailsCheck");
                this.localMails = this.jsonModel.oDataMail;
                this.getView().setModel(this.jsonModel);
        },

        sendDomainRequest: function () {
          var oView = this.getView(),
            aInputs = oView.byId("emailInput"),
            inputUserValue = aInputs.getValue();
          
          const apiKey = "c54d3543f972a7a05c9107719f99289030a19ab0";
          
                let url = "https://cors-anywhere.herokuapp.com/https://api.hunter.io/v2/email-verifier?email=" + inputUserValue + "&api_key=" + apiKey;

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

              let accept_all = result.data.accept_all;
              this.getView().byId("accept_all").setText( "Accepted: " + accept_all );

              let result_data = result.data.result;
              this.getView().byId("result").setText( "Result: " + result_data );
          })
      }
        
      });
    }
  );
  
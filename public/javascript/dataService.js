class DataService {
    static getPets(succesCb, errorCb) {

      HTTP.request("GET", "/pets", succesCb, errorCb);

    }
    static getPet(petID, succesCb) {

      HTTP.request("GET", `/pets/${petID}`, succesCb, errorCb);
    }
  
    static createPet(payload, succesCb, errorCb) {

      HTTP.request("POST", `/pets`, succesCb, errorCb, {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }, payload);
    }
  
    static deletePet(petID, succesCb, errorCb) {

        HTTP.request("DELETE", `/pets/${petID}`, succesCb, errorCb, {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        });
  
    }
  
    static searchPet(paramString, succesCb, errorCb) {

      HTTP.request("GET", `/pets/?name=${paramString}`, succesCb, errorCb);

    }

    static editPet(petID, payload, succesCb, errorCb) {

        HTTP.request("PUT", `/pets/${petID}`, succesCb, errorCb, {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        }, payload);
    }
  }
  
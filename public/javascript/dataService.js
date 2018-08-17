class DataService {
    static getPets(succesCb) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/pets`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
          case 200:
            succesCb(JSON.parse(xhr.response));
            break;
          case 400:
            break;
          default:
            break;
        }
      });
  
      xhr.addEventListener("error", function onError() {});
  
      xhr.send();
    }
    static getPet(petID, succesCb) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/pets/${petID}`);
  
      xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
          case 200:
            succesCb(JSON.parse(xhr.response));
            break;
          case 400:
            break;
          default:
            break;
        }
      });
    }
  
    static createPet(payload, succesCb) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `/pets`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
          case 200:
            succesCb(JSON.parse(xhr.response));
            break;
          case 400:
            break;
          default:
            break;
        }
      });
  
      xhr.addEventListener("error", function onError() {});
  
      xhr.send(JSON.stringify(payload));
    }
  
    static deletePet(petID, succesCb) {
  
        let del = new XMLHttpRequest();
        del.open("DELETE", `/pets/${petID}`);
        del.setRequestHeader("Content-Type", "application/json");
        del.addEventListener("load", function onLoad() {
          switch (del.status) {
            case 200:
              succesCb();
              break;
            case 400:
              break;
            default:
              break;
          }
        });
  
        del.addEventListener("error", function onError() {});
  
        del.send();
  
    }
  
    static searchPet(paramString, succesCb) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/pets/?name=${paramString}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
          case 200:
            succesCb(JSON.parse(xhr.response));
            break;
          case 400:
            break;
          default:
            break;
        }
      });
  
      xhr.addEventListener("error", function onError() {});
  
      xhr.send();
    }

    static editPet(petID, payload, succesCb) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", `/pets/${petID}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function onLoad() {
          switch (xhr.status) {
            case 200:
              succesCb(JSON.parse(xhr.response));
              break;
            case 400:
              break;
            default:
              break;
          }
        });
  
        xhr.addEventListener("error", function onError() {});
  
        xhr.send(JSON.stringify(payload));
    }
  }
  
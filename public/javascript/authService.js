class Auth {

    static login(succesCb) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `/login`);
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

}
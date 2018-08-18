class Auth {

    static login(succesCb, errorCb) {

        HTTP.request("POST", `/login`, function (res, resHead) {
            localStorage.setItem("token", resHead.token);
            succesCb();
        }, errorCb);

    }

    static logout(succesCb, errorCb) {

        HTTP.request("POST", `/logout`, function (res, resHead) {
            localStorage.removeItem("token");
            succesCb();
        }, errorCb, {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            });
    }

}
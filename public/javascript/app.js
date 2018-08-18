(function initIIFE() {
  let petsContainer = document.getElementById("petsContainer");

  petsContainer.addEventListener("click", function onClick(e) {
    if (e.target.tagName === "BUTTON") {
      e.target.parentNode.classList.add("hallow-card");
      let getPet = new XMLHttpRequest();
      getPet.open("GET", `/pets/${e.target.parentNode.dataset.id}`);
      getPet.setRequestHeader("Content-Type", "application/json");
      getPet.addEventListener("load", function onLoad() {
        switch (getPet.status) {
          case 200:
            let petData = JSON.parse(getPet.response);

            switch (e.target.dataset.type) {
              case "edit":
              
                swal({
                  title: "Edit pet",
                  html: createPetCard(
                    {
                      name: petData.name,
                      type: petData.type,
                      created: petData.created
                    },
                    true
                  ),
                  confirmButtonText: "Save",
                  showCancelButton: true,
                  cancelButtonText: "Cancel",
                  width: "50%"
                }).then(result => {
                  
                  let newName = document.querySelector("#swal2-content .pet h1")
                    .innerHTML;
                  let updateDate = document.querySelector(
                    "#swal2-content .pet .age #created-at"
                  ).innerHTML;
                  let newDate = Date.now() - updateDate * 86400000;
                  if (result.value) {
                    let payload = {
                      name: newName,
                      type: petData.type,
                      created: newDate
                    };
                    DataService.editPet(
                      e.target.parentNode.dataset.id,
                      payload,
                      function() {
                        let petCard = document.querySelector(
                          `[data-id='${e.target.parentNode.dataset.id}'`
                        );
                        petCard.querySelector("h1").innerHTML = newName;
                        function getAge(timestamp) {
                          let age = Date.now() - timestamp;
                          let days = Math.floor(age / (1000 * 60 * 60 * 24));

                          return days;
                        }
                        petCard.querySelector(
                          ".age #created-at"
                        ).innerHTML = getAge(newDate);
                        e.target.parentNode.classList.remove("hallow-card");
                        swal("Edited!", "Your Pet has been edited", "success");
                      }
                    );
                  }
                });
                break;
              case "delete":
                /* delete pet */
                DataService.deletePet(
                  e.target.parentNode.dataset.id,
                  function() {
                    document
                      .querySelector(
                        `[data-id='${e.target.parentNode.dataset.id}']`
                      )
                      .remove();
                    swal("Pet Deleted!", "", "success");
                  },
                  function(err) {
                    console.log(err);
                  }
                );
                break;
            }
        }
      });

      getPet.addEventListener("error", function onError() {});

      getPet.send();
    }
  });

  let spinner = `<div class="sk-fading-circle">
                <div class="sk-circle1 sk-circle"></div>
                <div class="sk-circle2 sk-circle"></div>
                <div class="sk-circle3 sk-circle"></div>
                <div class="sk-circle4 sk-circle"></div>
                <div class="sk-circle5 sk-circle"></div>
                <div class="sk-circle6 sk-circle"></div>
                <div class="sk-circle7 sk-circle"></div>
                <div class="sk-circle8 sk-circle"></div>
                <div class="sk-circle9 sk-circle"></div>
                <div class="sk-circle10 sk-circle"></div>
                <div class="sk-circle11 sk-circle"></div>
                <div class="sk-circle12 sk-circle"></div>
              </div>`

  /* get pets */
  document.addEventListener("DOMContentLoaded", () => {
    petsContainer.innerHTML = spinner;
    DataService.getPets(function(res) {
      petsContainer.innerHTML = null;
      res.forEach(pet => {
        petEl = createPetCard(pet);
        petEl.setAttribute("data-id", pet.id);
        petsContainer.appendChild(petEl);
      });
    });
  })


  /* create pet */
  document.getElementById("sbm-form").addEventListener("click", e => {
    e.preventDefault();
    let formData = document.getElementById("createForm").elements;
    let payload = {
      name: formData[0].value,
      type: formData[1].value
    };

    DataService.createPet(payload, function(res) {
      let petEl = createPetCard(res);
      petEl.setAttribute("data-id", res.id);
      petsContainer.appendChild(petEl);
    }, function(err){
      console.log("You must log in to crreate Pets");
      if(localStorage.getItem("token")) {


        swal(
          'Error',
          'Ther is a problem, please try again',
          'error'
        );
      }
      else {
        swal(
          'Error',
          'Please log in!',
          'error'
        );
      }

    });
  });

  /* search pet */
  document.getElementById("searchForm").addEventListener("submit", e => {
    petsContainer.innerHTML = spinner;
    e.preventDefault();

    let formData = document.getElementById("searchForm").elements;
    let name = formData[0].value;

    DataService.searchPet(name, function(res) {
      petsContainer.innerHTML = null;
      if (res.length === 0) {
        swal({
          type: "error",
          title: "No results matching your search"
        });
      }
      res.forEach(pet => {
        let petEl = createPetCard(pet);
        petEl.setAttribute("data-id", pet.id);
        petsContainer.appendChild(petEl);
      });
    });
  });

  /* lazy debouncer */
  let timeoutID;
  document.getElementById("searchForm").addEventListener("input", function(e) {
    let searchParam = e.target.value;
    
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
      petsContainer.innerHTML = spinner;
      DataService.searchPet(searchParam, function(res) {
        petsContainer.innerHTML = null;
        res.forEach(pet => {
          let petEl = createPetCard(pet);
          petEl.setAttribute("data-id", pet.id);
          petsContainer.appendChild(petEl);
        });
      });
    },500)


  });

  /* login */
  document.getElementById("loginBtn").addEventListener("click", (e) =>{
    let el = e.target;
    el.classList.add("hallow");
    Auth.login((res) => {
      swal(
        'Logged In!',
        '',
        'success'
      );
      el.classList.remove("hallow");
    })
  })


  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    let el = e.target;
    el.classList.add("hallow");
    Auth.logout((res) => {

        swal(
          'Logged Out',
          '',
          'success'
        );
        el.classList.remove("hallow");
    }, err => {
      el.classList.remove("hallow");
    })
  })

})();

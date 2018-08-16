(function initIIFE() {
  let petsContainer = document.getElementById("petsContainer");

  petsContainer.addEventListener("click", function onClick(e) {
    if (e.target.tagName === "BUTTON") {
      // let idOfEditedPet = DataService.requestPet(e.target.parentNode.dataset.id);
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
              }).then((result) => {
                if (result.value) {
                  swal(
                    'Edited!',
                    'Your Pet has been edited.',
                    'success'
                  )
                }
              })

          }
        }
      });
    
      getPet.addEventListener("error", function onError() {});
    
      getPet.send();

    }
  });

  /* get pets */
  let getPet = new XMLHttpRequest();
  getPet.open("GET", `/pets`);
  getPet.setRequestHeader("Content-Type", "application/json");
  getPet.addEventListener("load", function onLoad() {
    switch (getPet.status) {
      case 200:
        let pets = JSON.parse(getPet.response);
        pets.forEach(pet => {
          petEl = createPetCard(pet);
          petEl.setAttribute("data-id", pet.id);

          petsContainer.appendChild(petEl);
          /* delete pet */
          DataService.deletePet(petEl, pet.id);
        });
    }
  });

  getPet.addEventListener("error", function onError() {});

  getPet.send();

  /* create pet */
  document.getElementById("sbm-form").addEventListener("click", e => {
    e.preventDefault();
    let formData = document.getElementById("createForm").elements;
    let payload = {
      name: formData[0].value,
      type: formData[1].value
    };

    let createPet = new XMLHttpRequest();

    createPet.open("POST", "/pets");

    createPet.setRequestHeader("Content-Type", "application/json");

    createPet.addEventListener("load", function onLoad() {
      switch (createPet.status) {
        case 200:
          petData = JSON.parse(createPet.response);
          petEl = createPetCard(petData);
          petEl.setAttribute("data-id", petData.id);
          petsContainer.appendChild(petEl);
          DataService.deletePet(petEl, petData.id);
      }
    });

    createPet.addEventListener("error", function onError() {});

    createPet.send(JSON.stringify(payload));
  });

  /* search pet */
  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();

    let formData = document.getElementById("searchForm").elements;
    let name = formData[0].value;
    let search = new XMLHttpRequest();
    search.open("GET", `/pets/?name=${name}`);
    search.setRequestHeader("Content-Type", "application/json");
    search.addEventListener("load", function onLoad() {
      switch (search.status) {
        case 200:
        petsContainer.innerHTML = null;
          let pets = JSON.parse(search.response);
          pets.forEach(pet => {
            petEl = createPetCard(pet);
            petEl.setAttribute("data-id", pet.id);
  
            petsContainer.appendChild(petEl);
            /* delete pet */
            DataService.deletePet(petEl, pet.id);
          });
      }
    });
  
    search.addEventListener("error", function onError() {});
  
    search.send();
  });

  document.getElementById("searchForm").addEventListener("keyup", () => {
    
    

      timeout =  setTimeout(function() {
           
        let formData = document.getElementById("searchForm").elements;
        let name = formData[0].value;
        let search = new XMLHttpRequest();
        search.open("GET", `/pets/?name=${name}`);
        search.setRequestHeader("Content-Type", "application/json");
        search.addEventListener("load", function onLoad() {
          switch (search.status) {
            case 200:
            petsContainer.innerHTML = null;
              let pets = JSON.parse(search.response);
              pets.forEach(pet => {
                petEl = createPetCard(pet);
                petEl.setAttribute("data-id", pet.id);
      
                petsContainer.appendChild(petEl);
                /* delete pet */
                DataService.deletePet(petEl, pet.id);
              });
          }
        });
      
        search.addEventListener("error", function onError() {});
      
        search.send();

    },2000)
  })

  document.getElementById("searchForm").addEventListener("keydown", function(){
    clearTimeout(timeout);
  })


})();

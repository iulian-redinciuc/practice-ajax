(function initIIFE() {
  let petsContainer = document.getElementById("petsContainer");

  petsContainer.addEventListener("click", function onClick(e) {
    if (e.target.tagName === "BUTTON") {
      switch (e.target.dataset.type) {
        case "edit":
          swal({
            title: "Edit pet",
            html: createPetCard(
              {
                name: "Bob",
                type: "cat",
                created: Date.now()
              },
              true
            ),
            confirmButtonText: "Save",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            width: "50%"
          });
          break;
        case "delete":
          break;
        default:
          break;
      }
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
})();

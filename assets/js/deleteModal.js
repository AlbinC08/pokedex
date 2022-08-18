
//me permet d'afficher la modal de suppression
let modal = document.getElementById('modal')
modal.addEventListener('show.bs.modal', function (event) {
  let button = event.relatedTarget
  let pokeId = button.getAttribute('data-bs-pokeId')
  let pokeName = button.getAttribute('data-bs-pokeName')
  let pokeLevel = button.getAttribute('data-bs-pokeLevel')
  let pokeType = button.getAttribute('data-bs-pokeType')
  let modalForm = modal.querySelector('#modal-footer')
  document.querySelector('#pokeName').innerText = `Supprimer le Pokemon ${pokeName}`
  modalForm.action = `/deletePokemon/${pokeId}`

})



//me permet d'afficher la modal de modification d'un pokemon

let update_poke = document.getElementById('update_modal')
update_poke.addEventListener('show.bs.modal', function (event) {
  let button = event.relatedTarget
  let pokeId = button.getAttribute('data-bs-pokeid')
  let pokename = button.getAttribute('data-bs-pokeName')
  let pokelevel = button.getAttribute('data-bs-pokeLevel')
  let poketype = button.getAttribute('data-bs-pokeType')
  let pokeImage = button.getAttribute('data-bs-pokeImage')
  let modalform = document.querySelector('#form_update_poke')
  console.log(modalform);
  document.querySelector('#inputName').value = pokename
  document.querySelector('#inputType').value = poketype
  document.querySelector('#inputLevel').value = pokelevel
  document.querySelector('#inputImage').value = pokeImage
  document.querySelector('#title_up_poke').innerText = `Modifier le Pokemon  ${pokename}`
  modalform.action = `/updatePokemon/${pokeId}`

})

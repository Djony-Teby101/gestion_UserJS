const users = [{
    id: 1, nom: "Teby", prenom: "Lorince", age: 27
}]

const validateButton = document.getElementById('valider');

validateButton.addEventListener('click', addUser)
showAllUser()
updateOrDeleteUser()

function updateOrDeleteUser(){
    const deleteButton=document.querySelectorAll(".Supprimer");
    const editButtons=document.querySelectorAll(".Modifier");

    deleteButton.forEach(button=>{
        button.addEventListener('click', ()=>deleteUser(button.id))
    })

    editButtons.forEach(button=>{
        button.addEventListener('click', ()=>editUser(button.id))
    })
}

function addUser(e) {
    e.preventDefault()

    // Recuperer la DATA du formulaire.
    const enterUsersData = {
        id: users.length !== 0 ? users[users.length - 1].id + 1 : 1,
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        age: document.getElementById('age').value,
    };

    // reset les Inputs
    document.getElementById('nom').value = "";
    document.getElementById('prenom').value = "";
    document.getElementById('age').value = "";

    // Verifier si les champs sont vide.
        if (enterUsersData.nom !== "" &&
            enterUsersData.prenom !== "" &&
            enterUsersData.age != "") {

    // Ajouter la nouvelle data dans le tableau.
            users.push(enterUsersData)
            console.log(users)
            showAllUser();
        }

   
}


function showAllUser(){
    document.getElementById('AllUsers').innerHTML="";

    users.forEach(user=>{
        const newInputs={
            Nom: document.createElement('input'),
            Prenom: document.createElement('input'),
            Age: document.createElement('input')
        };
        const newDiv= document.createElement('div')
        const newButtons={
            Supprimer: document.createElement('input'),
            Modifier: document.createElement('input')
        };

        for(const [key, value] of Object.entries(newInputs)){
            value.setAttribute('type', 'text');
            value.setAttribute('id', `${key}OfUser${user.id}`);

            key=='Nom' && value.setAttribute('value', user.nom);
            key=='Prenom' && value.setAttribute('value', user.prenom);
            key=='Age' && value.setAttribute('value', user.age);

            newDiv.appendChild(value);
            document.getElementById('AllUsers').appendChild(newDiv)
        }

        // BUTTON configuration.
        for(const [key, value] of Object.entries(newButtons)){
            value.setAttribute('type' , 'button');
            value.setAttribute('class', key);
            value.setAttribute('id', user.id);
            value.setAttribute('value', key);

            newDiv.appendChild(value);
        }
    });
    updateOrDeleteUser()
}

function deleteUser(id){
   users.forEach(user=>{
        const userPositionInArray=users.indexOf(user);
        user.id=== parseInt(id) && users.splice(userPositionInArray, 1);
   })
   showAllUser()

}

function editUser(id){
    const newInputs={
        nom: document.getElementById(`NomOfUser${id}`).value,
        prenom: document.getElementById(`PrenomOfUser${id}`).value,
        age: document.getElementById(`AgeOfUser${id}`).value,
    };

    users.forEach(user=>{
        if(user.id === parseInt(id)){
            user.nom= newInputs.nom;
            user.prenom= newInputs.prenom;
            user.age= newInputs.age
        }
    })

}
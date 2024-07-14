//Début du code et récupération des données que j'aurai besoin.
const portefolio2 = document.getElementById("portfolio2");
const div1 = document.createElement("div");
const login = document.getElementById("log");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const gallery = document.querySelector("section .gallery");
const soumission = document.getElementById("btnConnect");
const modale = document.getElementById("modale");
const modale2 = document.getElementById("modale2");
const modifi = document.getElementById('mod');

div1.classList.add("filtre");
div1.classList.add("flex");

//Création du filtre 
const tous = document.createElement("button");
const appartement = document.createElement("button");
const objet = document.createElement("button");
const hotel = document.createElement("button");
tous.textContent = "Tous";
appartement.textContent = "Appartements";
objet.textContent = "Objets";
hotel.textContent = "Hotels & restaurants";
tous.classList.add("btn1");
appartement.classList.add("btn1");
objet.classList.add("btn1");
hotel.classList.add("btn1");
div1.appendChild(tous);
div1.appendChild(appartement);
div1.appendChild(objet);
div1.appendChild(hotel);
portefolio2.appendChild(div1)
//Affichage des données après les avoir récupéré sur l'API.
const affichage = async() =>{
   await fetch("http://localhost:5678/api/works").then(res => res.json()).then((data) =>{
     try{ 
      for(let i = 0; i < data.length; i++){
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const fig = document.createElement("figcaption");
        figure.appendChild(img);
        figure.appendChild(fig);
        figure.classList.add(`${data[i].id}`);
        fig.innerText = data[i].title;
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        gallery.appendChild(figure);
     }}
     catch(err){
      console.log('Il y a une erreur dans l\'affichage')
     }
   });
}
affichage();

//Mise en place du filtre
const filtre = async() =>{
   fetch("http://localhost:5678/api/works").then(response => response.json()).then((data2) => {
      const bouton = document.querySelectorAll(".filtre button");
      const gallery = document.querySelector("section .gallery");
      for(let i = 0; i < bouton.length; i++){
         bouton[i].addEventListener('click', (e) =>{
         const tab = Array.from(data2);
         gallery.innerHTML = "";    
         for(let i = 0; i < tab.length; i++){
            if(e.target.textContent === tab[i].category.name){
               const figure = document.createElement("figure");
               const img = document.createElement("img");
               const fig = document.createElement("figcaption");
               figure.appendChild(img);
               figure.appendChild(fig);
               fig.innerText = tab[i].title;
               img.src = tab[i].imageUrl;
               img.alt = tab[i].title;
               gallery.appendChild(figure);
            }else if(e.target.textContent === "Tous"){
               const figure = document.createElement("figure");
               const img = document.createElement("img");
               const fig = document.createElement("figcaption");
               figure.appendChild(img);
               figure.appendChild(fig);
               fig.innerText = tab[i].title;
               img.src = tab[i].imageUrl;
               img.alt = tab[i].title;
               gallery.appendChild(figure);  
            }
         }
         });
      }
   }).catch(error => console.log(error))
};
filtre();
//Création d'une fonction de rechargement de la page et de l'addEventListener qui déclenche l'action de supression des projets.
function recharge(){ 
   fetch("http://localhost:5678/api/works").then(res => res.json()).then((data) =>{
      const gallery = document.querySelector("section .gallery");
         data.map((item) =>{
            const gallery2 = document.getElementById('gallery2');
            if(gallery2){
               gallery2.innerHTML += `
                <div class="${item.id}">
                 <span class="deleteR">&#x1F5D1;</span>
                 <img src= "${item.imageUrl}" alt= "${item.title}" />
                </div>
                `;
      
            }
         });
      const element1 = document.querySelectorAll(".deleteR");
      for(let i = 0; i < element1.length; i++){
         element1[i].addEventListener("click", delete1);
      }
      
   })
}
//Foction de fermeture de la modale par le clique de l'icon de fermeture.
function fermeture(element){
   element.addEventListener("click", () => {
      const gallery2 = document.getElementById('gallery2');
         modale.classList.toggle('hidden1');
         modale2.classList.toggle('hidden1');
      if(gallery2){
         gallery2.innerHTML = "";  
         }
      });  
    }    

/*AddEventListener pour le login qui indique que si on clique sur le login on est redirigé sur la page de connexion et que localstorage est vidé pour que l'on puisse reçevoir le nouveau token. */     
login.addEventListener('click', () => {
   localStorage.clear();
   if(window.location.href = "index.html"){
      window.location.href = "login.html";
   }else if(window.location.href = "login.html"){
      window.location.href = "index.html";
   }
    });

 /*-------------------Ajout d'éléments pour que l'icon soit présente pour l'ouverture de la modale----------*/
 const modifier = document.createElement("p");
 const icon1 =  document.createElement("i");
 modifi.classList.add("hidden1");
 modifi.appendChild(icon1);
 modifi.appendChild(modifier);
 modifier.innerText = "modifier";
 icon1.classList.add("fa-regular");
 icon1.classList.add("fa-pen-to-square");  
 icon1.classList.add("modif");
 modifier.classList.add("modif");      
/*---------------------------------Information sur le comportement de la page selon que l'on soit connecté ou non-------------*/         
if(localStorage.getItem("token")){
   const login = document.getElementById("log");
   modifi.classList.remove("hidden1");
   login.textContent = "logout";
}else{
   modifi.classList.add("hidden1");
   login.textContent = "login";
      } 
      
/*-----------------------------Création de la modale----------------------------*/
    modale.classList.toggle('hidden1');
    modale2.innerHTML += `
    <div id="modalConteneur1">
    <p id="p1" class="close">&times;</p>
    <p id="p2">Galerie photo</p>
    <div class="gallery2"><div id="gallery2"></div></div>
    <div class="boutonModal"><button id="btn2" onclick="ajoutDePhoto()">Ajouter une photo</button></div>
    </div>
    `
/*Fonction qui permet de voir le formulaire qui ajoute ou efface un projet.*/ 

const ajoutDePhoto = () => {
   const partie1 = document.getElementById("modalConteneur1");
   partie1.remove();
      modale2.innerHTML += `
         <div id="modalConteneur2">  
            <div id="nav1" class="flex">
               <p class="pointeur" id="previous"><i class="fa-solid fa-arrow-left"></i></p>
               <p class="pointeur" id="close">&times;</p>
            </div>
            <form>
               <p id="ajoutPhoto">Ajout photo</p>
               <div id="ajoutImage">
                  <i class="fa-regular fa-image"></i>
                  <label for="update" id="button1">+ Ajouter photo</label>
                  <input type="file" id="update" />
                  <p id="pinfo">jpg, png : 4mo max</p>
               </div>
            
               <label class="label1"for="titleInput">Titre</label>
               <input id="titleInput" type="text" name="titleInput" required /> 
               <label class="label1" for="categoryInput">Catégorie</label>
               <select id="categoryInput">
                  <option value=""></option>
                  <option value="2">Appartements</option>
                  <option value="1">Objets</option>
                  <option value="3">Hotels & restaurants</option>
               </select>
               <button id="button2" type="submit">Valider</button>
            </form>
         </div>
         `
const previous = document.getElementById("previous");
   if(previous !== null && previous !== undefined){
      previous.addEventListener("click", () => {
         const partie2 = document.getElementById("modalConteneur2");
         partie2.remove();
         modale2.innerHTML += `
               <div id="modalConteneur1"> 
                <p id="p1">&times;</p>
                <p id="p2">Galerie photo</p>
                <div class="gallery2"><div id="gallery2"></div></div>
                <div class="boutonModal"><button id="btn2" onclick="ajoutDePhoto()">Ajouter une photo</button></div>
               </div>
              `
         recharge();
         const closeModal = document.getElementById("p1");
         fermeture(closeModal);
      });

//Ces événements addEventListener déclenchent le téléchargement de la photo et la soumission du formulaire.
const form = document.querySelector("form");
   form.addEventListener("submit", ajoutContenu);
const photo = document.getElementById('button1');
   photo.addEventListener('click', photo2)
   }
//Fermeture de la modale quand je clique sur l'icon.
const close = document.getElementById("close");
   if(close !== null && close !== undefined){ 
      fermeture(close);
   }
}
//Un événement qui est provoqué en cliquant et qui permet d'ouvrir la modale.
const modif = document.querySelectorAll(".modif");
   for(let i = 0; i < modif.length; i++){
      modif[i].addEventListener('click', () => {
         modale.classList.remove('hidden1');
         modale2.classList.remove('hidden1');
         recharge()
   });
   }
   
const closeModal = document.getElementById("p1");
   fermeture(closeModal);
//La fonction Delete de l'Api qui sert à effacer les projets. 

async function delete1(e) {
   fetch(`http://localhost:5678/api/works/${e.target.parentElement.className}`, {
       method: "DELETE",
       headers: {
           "Accept": "application/json",
           "Authorization": "Bearer " + localStorage.getItem("token"),
       }
   })
   .then(response => {
       if (!response.ok) {
           throw new Error("La requête a échoué avec le statut : " + response.status)
       }else{
         const figure = document.querySelectorAll("#portfolio .gallery figure");  
            if(figure){
               for(let i = 0; i < figure.length; i++){
                  if(figure[i].className === e.target.parentElement.className){
                     figure[i].remove();
                     break;
                  }
               }
            }
         const figure2 = document.querySelectorAll("#gallery2 > div");
            if(figure2){
               for(let i = 0; i < figure2.length; i++){
                  if(figure2[i].className === e.target.parentElement.className){
                     figure2[i].remove();
                     break;
                  }
               }
            }
         
       }   
   })
   .catch(error => {
       console.log("Une erreur s'est produite lors de la tentative pour effacer le projet");
   })
}

// La fonction photo2 qui permet d'uploader l'image depuis mon pc.     
function photo2(){
   const input = document.getElementById("update");
   input.addEventListener("change", (e) => {
      const fichier = input.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
         const url = reader.result;
         const conteneur = document.getElementById("ajoutImage");
         document.querySelector("#ajoutImage i").remove();
         document.getElementById("pinfo").remove();
         document.querySelector("#ajoutImage label").remove();
         const img = document.createElement("img");
         img.src = url;
         img.alt = "image";
         img.classList.add('imageConteneur');
         conteneur.appendChild(img);
      });
     reader.readAsDataURL(fichier);
});
      
}
//La fonction qui permet de faire un post et ajouter un projet à la gallery.   
async function ajoutContenu(e){
   e.preventDefault();
   let input = document.getElementById("update");
   let inputValue1 = document.getElementById("titleInput").value;
   let inputValue2 = document.querySelector("#categoryInput").value;
   let formData = new FormData();
   formData.append("image", input.files[0]);
   formData.append("title", inputValue1);
   formData.append("category", inputValue2);
      
      await fetch("http://localhost:5678/api/works", {
         method: "POST",
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
         },
         body: formData,
        })
          .then((response) => {
            if(response.ok) {
               return response.json();
            } else {
              console.log("Une erreur s'est produite dans le dépôt du projet");
            }
          })
          .catch((error) => {
            console.log(error);
          });
           
          
             
      };
      
     /* const figure2 = document.querySelectorAll("#gallery2 > div");
      const figure = document.querySelectorAll("#portfolio .gallery figure"); 
      const ajouter = `
      <div>
         <span class="deleteR">&#x1F5D1;</span>
         <img src= "${input.files[0]}" alt= "${inputValue1}" />
      </div>`;
      if(figure2){
         figure2.push(ajouter);
      } 
      const ajouter2 = `
      <figure>
         <img src="${input.files[0]}" alt="k" />
         <figcaption>${inputValue1}</figcaption>
      </figure>
      `
      if(figure){
         figure.push(ajouter2); 
      }*/
         
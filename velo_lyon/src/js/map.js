/*-----------Initiation de la map--------*/


// On initialise la latitude et la longitude (centre de la carte)
var lat = 	45.764043;
var lon = 	4.835659;
var macarte = null;

// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 13);
   
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

}
window.onload = function(){
    initMap(); 
};


/*-----REQUETE AJAX------*/

let xhr = new XMLHttpRequest();
 
xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d740a08727f95149fb0e93946b0dbcb9ccd97d91'); //Avec le GET, on récupère l'api de JCDecaux
 
xhr.addEventListener('load', function() {
 
    if (xhr.status >= 200 && xhr.status < 400) {
        callback(xhr.responseText);
 
    } else {
        callback(xhr.status);
    }
});
 
xhr.addEventListener('error', function() {
 
    console.log("erreur de connexion");
 
});
 
xhr.send(null);

function callback(response) {
  response = JSON.parse(response);
  response.forEach(function (info) {
    
    
    var info_station =                                                                        //Récupération des différentes infos que l'on va placer dans le popup
    '<div>'  +
    '<ul>' +
    '<li>Station : ' + info.address + '</li>' +
    '<li>Nombre de vélos : ' + info.bike_stands + '</li>' +
    '<li>Nombre de vélos disponibles : ' + info.available_bikes + '</li>' +
    '<li>Statut de la station : ' + info.status + '</li>' +
    '</ul>' +
    '<button type="button" class="btn btn-primary">Réserver</button>' + 
    '</div>'


    L.marker(                                                                                  //Ajout des marqueurs
        [info.position.lat, info.position.lng],                               
        {            
          "jcdecauxInfo": info}           // on stocke ici toutes les infos
      ) 
      .addTo(macarte)                     // fonction d'appel 
      .bindPopup(info_station);
  });
};
 
                                                              // On définit ces variables pour rendre plus simple l'écriture
    let address = info.address;
    let bikeStands = info.bike_stands;
    let availableBikes = info.available_bikes;
    let statusStation = info.status;


document.getElementsByClassName("btn").addEventListener("click",Reservation());    // J'ai essayé de rajouter l'affichage du console log(Reservation) mais sans succès

function Reservation(){
  console.log(Réservation); 
}
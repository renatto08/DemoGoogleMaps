// *
// * Add multiple markers
// * 2013 - en.marnoto.com
// *

// necessary variables
var map;
var infoWindow;

      var markersData = [
        {lat: -12.056493,  lng: -76.939639,
      name: "Camping Praia da Barra",
      address1:"Rua Diogo Cão, 125",
      address2: "Praia da Barra",
      postalCode: "3830-772 Gafanha da Nazaré" },
        {lat: -12.063334,  lng: -76.950239,
      name: "Camping Costa Nova",
      address1:"Quinta dos Patos, n.º 2",
      address2: "Praia da Costa Nova",
      postalCode: "3830-453 Gafanha da Encarnação"},
        {lat: -12.066314,  lng: -76.961440,      name: "Camping Gafanha da Nazaré",
      address1:"Rua dos Balneários do Complexo Desportivo",
      address2: "Gafanha da Nazaré",
      postalCode: "3830-225 Gafanha da Nazaré"}
      ];


	  

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(-12.073070,-76.947578),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);


// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var name = markersData[i].name;
      var address1 = markersData[i].address1;
      var address2 = markersData[i].address2;
      var postalCode = markersData[i].postalCode;

      createMarker(latlng, name, address1, address2, postalCode);

      // marker position is added to bounds variable
      bounds.extend(latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
}

// This function creates each marker and it sets their Info Window content
function createMarker(latlng, name, address1, address2, postalCode){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name,
	  animation: google.maps.Animation.DROP,
	  //icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      //shadow: pinShadow
   });


   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
   google.maps.event.addListener(marker, 'click', function() {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      // Creating the content to be inserted in the infowindow
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + address1 + '<br />' +
         address2 + '<br />' +
         postalCode + '</div></div>';
      
      // including content to the Info Window.
      infoWindow.setContent(iwContent);
	  
	  	var circle = new google.maps.Circle({
	  map: map,
	  radius: 1000,  
	  fillColor: '#AA0000'
	});
	circle.bindTo('center', marker, 'position');

      // opening the Info Window in the current map and at the current marker location.
      infoWindow.open(map, marker);
   });
}
// [START maps_js_local_context_home]
let map;
let localContextMapView;
const styles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

function initMap() {
  localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    // [START maps_js_local_context_home_preferences]
    placeTypePreferences: [
      { type: "bakery", weight: 1 },
      { type: "bank", weight: 1 },
      { type: "cafe", weight: 2 },
      { type: "department_store", weight: 1 },
      { type: "drugstore", weight: 1 },
      { type: "park", weight: 3 },
      { type: "restaurant", weight: 2 },
      { type: "primary_school", weight: 3 },
      { type: "secondary_school", weight: 3 },
      { type: "supermarket", weight: 2 },
    ],
    // [END maps_js_local_context_home_preferences]
    maxPlaceCount: 24,
  });
  map = localContextMapView.map;
  map.setOptions({
    center: { lat: 51.507307, lng: -0.08114 },
    zoom: 14,
    styles,
  });

  // [START maps_js_local_context_home_autocomplete]
  // Build and add the Autocomplete search bar
  const input = document.getElementById("input");
  const options = {
    types: ["address"],
    componentRestrictions: {
      country: "us",
    },
    fields: ["address_components", "geometry", "name"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // [END maps_js_local_context_home_autocomplete]
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place || !place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No address available for that input.");
      return;
    }

    // Recenter the map to the selected address
    map.setOptions({
      center: place.geometry.location,
      zoom: 14,
    });
    // Update the localContext directionsOptions origin
    localContextMapView.directionsOptions = {
      origin: place.geometry.location,
    };
    new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAbUlEQVR4Ae3LoQ2AMAAF0TMYPJoV2IApGIJtmIMtmIAVqutraj6IiqZpmyYoCO/08R7bXbOOHSF2Ohr0HCh00EPdwImiTgYqRgxKMowUTFiUyTKRMeNQIcdMYsGjSp6FyIoaWkmoUuLxEPzDh1xIaLFFuTyHMgAAAABJRU5ErkJggg==",
      zIndex: 30,
    });
    // update the results with new places
    localContextMapView.search();
  });
}
// [END maps_js_local_context_home]

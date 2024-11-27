const HtmlGenerator = (uintLayer, unitLocation) => {
  const baseurl = "http://182.18.181.115:8765/mapserver/vscl/wms";

  // Generate the WMS layer scripts
  const layersScript = uintLayer
    .filter(item => item.status === true) // Filter only active layers
    .map(item => `  
      L.tileLayer.wms('${baseurl}', {
        layers: '${item.layer}',
        format: 'image/png',
        transparent: true,
        attribution: 'WMS Layer',
        maxZoom: 18,
        minZoom: 5
      }).addTo(map);
    `).join("");

  // Generate Pointer Information
  const pointerScript = unitLocation.screenInfo && Object.keys(unitLocation.screenInfo).map((key) => {
    return `${key}: ${unitLocation.screenInfo[key]}<br>`;
  }) || ``;

  // Get the active layer names as a comma-separated string
  const layers = uintLayer
    .filter(item => item.status === true)
    .map(item => item.layer)
    .join(",");

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Leaflet Map with WMS Layer</title>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <style>
          #map {
              height: 100vh;
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
          }
          .info-panel {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: rgba(255, 255, 255, 0.9);
              padding: 10px;
              text-align: center;
              font-size: 16px;
              box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.3);
              display: flex;
              justify-content: space-between;
          }
          .info-item {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
          }
          .info-title {
              font-weight: bold;
              margin-bottom: 5px;
          }
          .icon-image {
              width: 30px;
              height: 30px;
              border-radius: 50%;
          }
          .button {
              position: absolute;
              bottom: 100px;
              left: 20px;
              background-color: #fff;
              border: none;
              padding: 10px;
              cursor: pointer;
              z-index: 1000;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .button-crime {
              bottom: 140px;
              left: 20px;
          }
      * {
          padding: 0px;
          margin: 0px;
      }

      #fullscreen-button {
          position: absolute;
          bottom: 10px;
          left: 10px;
          height: 10px;
          width: 10px;
          z-index: 1000;
          background: white;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

      .fullscreen {
          width: 100% !important;
          height: 100% !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 9999 !important;
      }

      .selected {
          border: 2px solid blue;
          /* Change the border color to indicate selection */
      }

      #icon {
          height: 25px;
          width: 25px;
          padding: 10px;
          /* background-color: #d8cfc4; */
          border-radius: 5px;
      }

      #map-style {
          position: absolute;
          bottom: 10px;
          left: 10px;
          z-index: 1000;
          padding: 5px;
          background-color: white;
          border-radius: 10px;
      }

      .leaflet-layer,
      .leaflet-control-zoom-in,
      .leaflet-control-zoom-out,
      .leaflet-control-attribution {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
      }

      #directions-button {
          position: absolute;
          left: 10px;
          bottom: 10px;
          z-index: 1000;
          padding: 10px;
          height: 25px;
          width: 25px;
          background-color: white;
          border-radius: 5px;
          cursor: pointer;
          display: none;
      }


      #loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
      }

      .loader {
          border: 8px solid #f3f3f3;
          border-radius: 50%;
          border-top: 8px solid #3498db;
          width: 50px;
          height: 50px;
          -webkit-animation: spin 1s linear infinite;
          animation: spin 1s linear infinite;
      }

      @-webkit-keyframes spin {
          0% {
              -webkit-transform: rotate(0deg);
          }

          100% {
              -webkit-transform: rotate(360deg);
          }
      }

      @keyframes spin {
          0% {
              transform: rotate(0deg);
          }

          100% {
              transform: rotate(360deg);
          }
      }

      /* Map styles */

      /* Streets style */
      .leaflet-container.streets {
          background-color: #f8f8f8;
      }

      /* Satellite style */
      .leaflet-container.satellite {
          background-color: #000;
      }

      /* Hybrid style */
      .leaflet-container.hybrid {
          background-color: #0a0a0a;
      }

      /* Terrain style */
      .leaflet-container.terrain {
          background-color: #d8cfc4;
      }

      .leaflet-top.leaflet-left {
          top: 10px;
          left: 10px;
      }
  </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <script>
            const map = L.map('map', {
              center: [${unitLocation.latitude || 25.34865733313164}, ${unitLocation.longitude || 82.96733330174689}],
              zoom: 12,
              zoomControl: true,
              maxZoom: 18,
              minZoom: 5
            });

            // Add base map layer
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //   maxZoom: 18,
            //   minZoom: 5
            // }).addTo(map);

            L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                       maxZoom: 20,
                       subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
              }).addTo(map);

            // Marker for the initial unit location
            let marker = L.marker([${unitLocation.latitude || 25.34865733313164}, ${unitLocation.longitude || 82.96733330174689}]).addTo(map);
            marker.bindPopup('<b>Location Information</b><br>Latitude: ${unitLocation.latitude}<br>Longitude:  ${unitLocation.longitude}<br>${pointerScript}');

            // Function to update the marker location dynamically
            function updateLocation(latitude, longitude) {
              marker.setLatLng([latitude, longitude]);
              map.setView([latitude, longitude], 15);
            }

            // Adding WMS layers
            ${layersScript}

            // Variable to store the highlighted feature layer
            let highlightLayer;

            // Event listener for map click to fetch GetFeatureInfo and display in popup
            map.on('click', function(e) {
              const url = \`${baseurl}?service=WMS&version=1.1.1&request=GetFeatureInfo&layers=${layers}&bbox=\${map.getBounds().toBBoxString()}&width=\${map.getSize().x}&height=\${map.getSize().y}&srs=EPSG:4326&query_layers=${layers}&info_format=application/json&x=\${Math.floor(e.containerPoint.x)}&y=\${Math.floor(e.containerPoint.y)}\`;

              fetch(url)
                .then(response => response.json())
                .then(data => {
                  let info = "No information available";
                  if (data.features && data.features.length) {
                    info = data.features.map(feature => JSON.stringify(feature.properties, null, 2)).join("<br><br>");
                    
                    // Highlight the feature on the map
                    if (highlightLayer) {
                      map.removeLayer(highlightLayer);
                    }

                    if (data.features && data.features.length > 0) {
                      const geometry = data.features[0].geometry;
                      highlightLayer = L.geoJSON(geometry, {
                        style: {
                          color: 'red',
                          weight: 3,
                          opacity: 0.7,
                          fillOpacity: 0.2
                        }
                      }).addTo(map);
                    }
                  }
                  
                  // Display the information in a Leaflet popup at the clicked location
                  L.popup()
                    .setLatLng(e.latlng)
                    .setContent(info)
                    .openOn(map);
                })
                .catch(error => {
                  console.error("Error fetching feature info:", error);
                  // L.popup().setLatLng(e.latlng).setContent("Error fetching information.").openOn(map);
                });
            });
          </script>
        </body>
      </html>
    `,
  };
};

export default HtmlGenerator;

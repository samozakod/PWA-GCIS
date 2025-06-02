import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-providers';
import 'leaflet-control-geocoder';
import { antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import * as poiData from 'src/assets/data/pois.json';
import * as sosData from 'src/assets/data/sos.json';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  providers: [Geolocation],
  standalone: false,
})
export class MapModalComponent implements AfterViewInit, OnDestroy {
  @Input() mapType!: string;
  map: any;
  pois: any[] = [];
  sos: any[] = [];
  routeControl: any;

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  initMap() {
    this.map = L.map('leaflet-map').setView([41.6988, 2.844], 20).fitBounds([
      [41.688, 2.8],
      [41.71, 2.9],
    ]);
    this.map.setMaxBounds([
      [41.638, 2.7],
      [41.801, 2.95],
    ]);

    this.map.createPane('pane_Positron').style.zIndex = '100';
    this.map.createPane('pane_GoogleRoad').style.zIndex = '200';
    this.map.createPane('pane_GoogleSatellite').style.zIndex = '300';

    const positronLayer = L.tileLayer(
      'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      {
        pane: 'pane_Positron',
        opacity: 0.95,
        attribution:
          '<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
        minZoom: 13,
        maxZoom: 19,
        minNativeZoom: 0,
        maxNativeZoom: 20,
      }
    );

    const satelliteLayer = L.tileLayer(
      'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        pane: 'pane_GoogleSatellite',
        opacity: 0.95,
        attribution:
          '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
        minZoom: 13,
        maxZoom: 19,
        minNativeZoom: 0,
        maxNativeZoom: 20,
      }
    );

    const roadLayer = L.tileLayer(
      'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        pane: 'pane_GoogleRoad',
        opacity: 0.95,
        attribution:
          '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
        minZoom: 13,
        maxZoom: 19,
        minNativeZoom: 0,
        maxNativeZoom: 20,
      }
    );

    positronLayer.addTo(this.map);


    //perliedman geocoder search plugin implementation
    const geocoder = (L.Control as any).geocoder({
        defaultMarkGeocode: false,
        placeholder: 'Search location...',
        collapsed: true,
        position: 'topleft',
      }).on('markgeocode', (e: any) => {
        const bbox = e.geocode.bbox;
        const bounds = L.latLngBounds(bbox);
        this.map.fitBounds(bounds);
    }).addTo(this.map);


    const baseLayers = {
      'Positron (CartoDB)': positronLayer,
      'Google Road': roadLayer,
      'Google Satellite': satelliteLayer,
    };

    L.control.layers(baseLayers, undefined, { position: 'topright' }).addTo(this.map);

    // --- MapType logic ---
          if (this.mapType === 'Geolocate Me') {
        const userIcon = L.icon({
          iconUrl: 'assets/icon/start.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        this.geolocation.getCurrentPosition().then((resp) => {
          const lat = resp.coords.latitude;
          const lng = resp.coords.longitude;

          this.map.setView([lat, lng], 16);

          L.marker([lat, lng], { icon: userIcon })
            .addTo(this.map)
            .bindPopup('You are here')
            .openPopup();
        }).catch((error) => {
          alert('Unable to retrieve your location.');
          console.error(error);
        });
      }


    else if (this.mapType === 'Points of Interest') {
  const poiDataParsed = (poiData as any).default;

  const icons: any = {
    gold: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    green: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    blue: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    red: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    violet: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  };

  const overlays: any = {};

  for (const category in poiDataParsed) {
    const groupItems = poiDataParsed[category];
    const layerItems: L.Layer[] = [];

    for (const item of groupItems) {
      if (item.type === 'marker') {
        const marker = L.marker([item.lat, item.lng], {
          icon: icons[item.icon] || icons.orange,
        }).bindPopup(item.popup);
        layerItems.push(marker);
      } else if (item.type === 'circle') {
        const circle = L.circle([item.lat, item.lng], {
          radius: item.radius,
          color: item.color,
          fillColor: item.fillColor,
          fillOpacity: 0.5,
        }).bindPopup(item.popup);
        layerItems.push(circle);
      } else if (item.type === 'polygon') {
        const polygon = L.polygon(item.coords, {
          color: item.color,
        }).bindPopup(item.popup);
        layerItems.push(polygon);
      }
    }

    const layerGroup = L.layerGroup(layerItems);
        // Define category colors for labels
    const categoryColors: any = {
      Culture: 'gold',
      Nature: 'green',
      Sports: 'blue',
      Entertainment: 'red',
      Nightlife: 'purple',
    };

    // Create a label with a color square for the control
    const color = categoryColors[category] || 'gray';
    const label = `<span style="display:inline-block;width:12px;height:12px;margin-right:6px;
    background-color:${color};border-radius:50%;"></span>${category}`;

    overlays[label] = layerGroup;
    layerGroup.addTo(this.map);
  }

  L.control.layers(undefined, overlays, {
    position: 'bottomleft',
    collapsed: false,
  }).addTo(this.map);
}

          else if (this.mapType === 'Path Guide') {
            let startPoint: L.LatLng | null = null;
            let endPoint: L.LatLng | null = null;
            let startMarker: L.Marker | null = null;
            let endMarker: L.Marker | null = null;

            this.map.setView([41.6988, 2.844], 13);

            const resetRoute = () => {
              if (this.routeControl) {
                this.routeControl.remove();
                this.routeControl = null;
              }
              if (startMarker) {
                this.map.removeLayer(startMarker);
                startMarker = null;
              }
              if (endMarker) {
                this.map.removeLayer(endMarker);
                endMarker = null;
              }
              startPoint = null;
              endPoint = null;
            };

            this.map.on('click', (e: any) => {
              const clickedLatLng = e.latlng;

              if (startPoint && endPoint) {
                resetRoute();
                return;
              }

              if (!startPoint) {
                startPoint = clickedLatLng;
                startMarker = L.marker(clickedLatLng, {
                  icon: L.icon({
                    iconUrl: 'assets/icon/start.png',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  })
                }).addTo(this.map);

              } else if (!endPoint) {
                endPoint = clickedLatLng;
                endMarker = L.marker(clickedLatLng, {
                  icon: L.icon({
                    iconUrl: 'assets/icon/finish.png',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  })
                }).addTo(this.map);

                if (this.routeControl) {
                  this.routeControl.remove();
                }

                this.routeControl = L.Routing.control({
                  waypoints: [startPoint!, endPoint!],
                  routeWhileDragging: false,
                  addWaypoints: false,
                  lineOptions: {
                    styles: [{ color: 'orangered', opacity: 0.95, weight: 5 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 10,
                  },
                  plan: L.Routing.plan(
                    [startPoint!, endPoint!],
                    {
                      draggableWaypoints: false,
                      createMarker: function (i: number, wp: L.Routing.Waypoint) {
                        return L.marker(wp.latLng, {
                          icon: L.icon({
                            iconUrl: i === 0 ? 'assets/icon/start.png' : 'assets/icon/finish.png',
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                          })
                        });
                      }
                    }
                  )
                }).addTo(this.map);
              }
            });
          }




    else if (this.mapType === 'Safe Points') {
      const sosDataParsed = (sosData as any).default;

      const icons: any = {
        police: new L.Icon({
          iconUrl: 'assets/icon/police.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        fire: new L.Icon({
          iconUrl: 'assets/icon/fire.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        hospital: new L.Icon({
          iconUrl: 'assets/icon/hospital.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        info: new L.Icon({
          iconUrl: 'assets/icon/info.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
      };

      const makeMarkers = (items: any[], iconKey: string) =>
        L.layerGroup(
          items.map((m: any) =>
            L.marker([m.lat, m.lng], {
              icon: icons[m.icon] || icons[iconKey],
            }).bindPopup(m.popup)
          )
        );

      const safetyLayer = makeMarkers(sosDataParsed.safety, 'police');
      const healthLayer = makeMarkers(sosDataParsed.health, 'hospital');
      const fireLayer = makeMarkers(sosDataParsed.firefighters, 'fire');
      const infoLayer = makeMarkers(sosDataParsed.info, 'info');

      // Add all to map by default
      safetyLayer.addTo(this.map);
      healthLayer.addTo(this.map);
      fireLayer.addTo(this.map);
      infoLayer.addTo(this.map);

      const overlays = {
        Safety: safetyLayer,
        Health: healthLayer,
        Firefighters: fireLayer,
        Info: infoLayer,
      };

      L.control.layers(undefined, overlays, {
        position: 'bottomleft',
        collapsed: false,
      }).addTo(this.map);
    }

    this.map.attributionControl.setPrefix(false);
    this.map.invalidateSize();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.off(); // Remove listeners
      this.map.remove();
    }

    if (this.routeControl) {
      this.routeControl.remove();
    }
  }
}

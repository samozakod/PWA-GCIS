import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import 'leaflet-providers';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  standalone: false,
})
export class MapModalComponent implements AfterViewInit, OnDestroy {
  @Input() mapType!: string;
  map: any;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  initMap() {
    const id = 'leaflet-map';
    this.map = Leaflet.map(id).setView([41.6988, 2.844], 15); // Basemap creation

    // Add default map layer
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    // Check map type and load respective layers
    if (this.mapType === 'Geolocate Me') {
      // Locate user position
      this.map.locate({ setView: true, maxZoom: 16 }); // Triggers geolocation

      // When location is found
      this.map.on('locationfound', (event: any) => {
        // Get the user's lat and long
        const { lat, lng } = event.latlng;

        // Set view to the user's location
        this.map.setView([lat, lng], 16); // Adjust zoom level here

        // Add a marker at the user's location
        const userIcon = Leaflet.icon({
          iconUrl: 'assets/icon/marker_geo.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        Leaflet.marker([lat, lng], { icon: userIcon })
          .addTo(this.map)
          .bindPopup('You are here');
      });

      // Handle geolocation error (e.g., user denies location access)
      this.map.on('locationerror', (e: any) => {
        alert('Unable to retrieve your location.');
      });
    } 
    
    else if (this.mapType === 'Points of Interest') {
      // Interest map with default layer and markers
      Leaflet.marker([41.6988, 2.844]).addTo(this.map).bindPopup('Point of Interest');
    } 
    
    else if (this.mapType === 'Path Guide') {
      antPath(
        [
          [41.6988, 2.844],
          [41.6972, 2.844],
        ],
        { color: '#04a71f', weight: 2, opacity: 1 }
      ).addTo(this.map);
    }

    else if (this.mapType === 'Safe Points') {
      // Assistance map with default layer and markers
      Leaflet.marker([41.6888, 2.844]).addTo(this.map).bindPopup('Assistance Point');
    }

    this.map.attributionControl.setPrefix(false);
    this.map.invalidateSize();  // Fix map display issues (e.g., resizing)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}

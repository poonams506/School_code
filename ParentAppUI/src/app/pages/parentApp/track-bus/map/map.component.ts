import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ParentAppServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';


declare var google: any;
interface Coordinates {
  lat: string;
  lng: string;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  directionsService: any;
  directionsRenderer: any;
  busMarker: any;
  @ViewChild('map', {static: true}) mapElementRef!: ElementRef;
  // Coordinates for the bus route (start, stoppages, end)
  busRouteCoordinates : Coordinates[] = [];
  map: any;
  private renderer = inject(Renderer2);
  busInterval: any;
  noActiveTrip : boolean = false;
  constructor(private parentAppService : ParentAppServiceProxy, private userService: UserService,) { }

  ngOnInit() {
    this.getData();
    
  }


 async getData(){

  this.parentAppService.getVehicleTrackListSelect(this.userService.CurrentSiblingId).subscribe(x=>{
    if(x.vehicleTrackList && x.vehicleTrackList.length > 0){
      this.parentAppService.getStoppageTrackListSelect(this.userService.CurrentSiblingId).subscribe(async x=>{
        if(x.stoppageTrackList && x.stoppageTrackList.length > 1){
          x.stoppageTrackList.forEach(element => {
            this.busRouteCoordinates.push({lat : element.lat, lng:element.lng!});
          });
         await  this.loadMap();
         this.trackBus();
        }
        else{
          this.noActiveTrip = true;
        }
      })
    }
    else{
      this.noActiveTrip = true;
    }
  })


   
  }

  async loadMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const mapEl = this.mapElementRef.nativeElement;

    const location = new google.maps.LatLng(this.busRouteCoordinates[0].lat, this.busRouteCoordinates[0].lng);

    this.map = new Map(mapEl, {
      center: location,
      zoom: 14,
      mapId: "4504f8b37365c3d0"
    });

    this.renderer.addClass(mapEl, 'visible');

    const markerIcon = document.createElement('img');
    markerIcon.src = 'assets/icons/bus.png';
    markerIcon.height = 50;
    markerIcon.width = 50;
   

    this.addMarker(location,markerIcon);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.trackBus(); //18.601468, 73.779327

    this.calculateAndDisplayRoute();
  }


  async addMarker(location: any,markerIcon:HTMLImageElement) {

    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

   

    this.busMarker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      gmpDraggable: true,
      content: markerIcon,
      title: 'Bus'
    });


  }

  calculateAndDisplayRoute() {
    const waypoints = this.busRouteCoordinates.slice(1, -1).map(location => {
      return {
        location: new google.maps.LatLng(location.lat, location.lng),
        stopover: true,
      };
    });

    this.directionsService.route(
      {
        origin: new google.maps.LatLng(
          this.busRouteCoordinates[0].lat,
          this.busRouteCoordinates[0].lng
        ),
        destination: new google.maps.LatLng(
          this.busRouteCoordinates[this.busRouteCoordinates.length - 1].lat,
          this.busRouteCoordinates[this.busRouteCoordinates.length - 1].lng
        ),
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  }


  trackBus() {
    // Simulating live updates - replace this with real data
    this.busInterval = setInterval(() => {
      // Fetch the new bus position from your backend (example is simulated)
      // Ensure the marker is defined before updating its position
      if (this.busMarker) {
        this.parentAppService.getVehicleTrackListSelect(this.userService.CurrentSiblingId).subscribe(x=>{
          if(x.vehicleTrackList && x.vehicleTrackList.length > 0){
            this.busMarker.position = new google.maps.LatLng(x.vehicleTrackList[0].lat, x.vehicleTrackList[0].lng);
            // Optionally, pan the map to the new position
            this.map.panTo(new google.maps.LatLng(x.vehicleTrackList[0].lat, x.vehicleTrackList[0].lng));
            this.noActiveTrip = false;
          }
          else{
            this.noActiveTrip = true;
          }
        })
      } else {
        console.error('Bus marker is not properly initialized');
      }
    }, 5000); // Update every 5 seconds
  }

  ionViewDidEnter() {
    this.clearAllMapRelatedObject();
    this.getData();
    this.trackBus();
  }

  ionicViewWillLeave(){
    this.clearAllMapRelatedObject();
  }

  

  ngOnDestroy(): void {
    this.clearAllMapRelatedObject();
  }

  clearAllMapRelatedObject():void{
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }
    if (this.busInterval) {
      clearInterval(this.busInterval);
    }
  }
  

}

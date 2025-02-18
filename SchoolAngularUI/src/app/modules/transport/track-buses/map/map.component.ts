import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forEach } from 'jszip';
import { map, mergeMap } from 'rxjs';
import { ActiveTripDto, ParentAppServiceProxy, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';


declare var google: any;
class Coordinates {
  lat: string;
  lng: string;
  stopName: string;
}
class AllRouteCoordinates {
  routeId: number;
  routeName: string;
  currentLocation: Coordinates;
  stoppageCoordinates: Coordinates[] = [];

}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  directionsService: any;
  directionsRenderer: any;
  busMarker: any[] = [];
  academicYearId: number;
  routeId: number;
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  // Coordinates for the bus route (start, stoppages, end)
  busRouteCoordinates: Coordinates[] = [];
  allRouteCoordinates: AllRouteCoordinates[] = [];
  map: any;
  private renderer = inject(Renderer2);
  busInterval: any;
  noActiveTrip: boolean = false;
  searchRouteForm: FormGroup;
  @Input({ required: false }) routeIds: number[] = [];

  constructor(private transportService: TransportServiceProxy, private userService: UserService, private formBuilder: FormBuilder) {
    this.searchRouteForm = this.formBuilder.group({
      routeId: [[]],
    });
  }

  ngOnInit() {

    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getData();
    });
  }
  ngOnChanges() {
    this.allRouteCoordinates = [];
    this.busMarker = [];
    this.getData();

  }


  getData() {
    this.transportService.getActiveTripForAdminSelect(this.academicYearId).subscribe(x => {
      if (x.activeTripList && x.activeTripList.length > 0) {
        x.activeTripList.forEach(async trip => {
          if (this.routeIds?.length > 0 && !this.routeIds.includes(trip.routeId)) {
            console.log("route not exist");
            return;
          }
          let routeCoordinate = new AllRouteCoordinates();
          routeCoordinate.routeId = trip.routeId;
          routeCoordinate.routeName = trip.routeName;
          let currentLoc = new Coordinates();
          currentLoc.lat = trip.lat;
          currentLoc.lng = trip.long;
          routeCoordinate.currentLocation = currentLoc;
          this.transportService.getStoppageTrackForAdmin(this.academicYearId, trip.routeId).subscribe(y => {
            if (y.stoppageTrackResponseList && y.stoppageTrackResponseList.length > 1) {
              y.stoppageTrackResponseList.forEach(element => {
                routeCoordinate.stoppageCoordinates.push({ lat: element.lat, lng: element.lng!, stopName: element.stopName })
              });
              this.allRouteCoordinates.push(routeCoordinate);
              console.log('inner loop completed')
            }
          })
          console.log('foreach completed');

        });
        setTimeout(() => {
          this.loadMap();
          //this.trackBus();
        }, 5000);
      }
      else {
        this.noActiveTrip = true;
      }
    })
  }
  async loadMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const mapEl = this.mapElementRef.nativeElement;

    const location = new google.maps.LatLng(this.allRouteCoordinates[0].stoppageCoordinates[0].lat, this.allRouteCoordinates[0].stoppageCoordinates[0].lng);

    this.map = new Map(mapEl, {
      center: location,
      zoom: 100,
      mapId: "4504f8b37365c3d0"
    });

    this.renderer.addClass(mapEl, 'visible');



    this.addMarker();
    this.directionsService = new google.maps.DirectionsService();
    // this.directionsRenderer = new google.maps.DirectionsRenderer();
    // this.directionsRenderer.setMap(this.map);
    this.trackBus(); //18.601468, 73.779327

    this.calculateAndDisplayRoute();
  }


  async addMarker() {

    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    this.allRouteCoordinates.forEach((trip, i) => {
      const markerIcon = document.createElement('img');
      markerIcon.src = 'assets/img/bus.png';
      markerIcon.height = 30;
      markerIcon.width = 30;
      const loc = new google.maps.LatLng(trip.stoppageCoordinates[0].lat, trip.stoppageCoordinates[0].lng);
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: loc,
        gmpDraggable: true,
        content: markerIcon,
        title: trip.routeName
      });
      this.busMarker.push(marker);
    })
    const schoolMarkerIcon = document.createElement('img');
    schoolMarkerIcon.src = 'assets/img/school.png';
    schoolMarkerIcon.height = 40;
    schoolMarkerIcon.width = 40;
    const schoolLocation = new google.maps.LatLng(this.allRouteCoordinates[0].stoppageCoordinates[this.allRouteCoordinates[0].stoppageCoordinates.length - 1].lat, this.allRouteCoordinates[0].stoppageCoordinates[this.allRouteCoordinates[0].stoppageCoordinates.length - 1].lng);
    const schoolMarker = new AdvancedMarkerElement({
      map: this.map,
      position: schoolLocation,
      gmpDraggable: false,
      content: schoolMarkerIcon,
      title: 'School'
    });
    this.busMarker.push(schoolMarker);
  }

  calculateAndDisplayRoute() {
    this.allRouteCoordinates.forEach(trip => {
      const waypoints = trip.stoppageCoordinates.slice(1, -1).map(location => {
        return {
          location: new google.maps.LatLng(location.lat, location.lng),
          stopover: true,

        };
      });

      this.directionsService.route(
        {
          origin: new google.maps.LatLng(
            trip.stoppageCoordinates[0].lat,
            trip.stoppageCoordinates[0].lng
          ),
          destination: new google.maps.LatLng(
            trip.stoppageCoordinates[trip.stoppageCoordinates.length - 1].lat,
            trip.stoppageCoordinates[trip.stoppageCoordinates.length - 1].lng
          ),
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response: any, status: string) => {
          if (status === google.maps.DirectionsStatus.OK) {
            const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: { strokeColor: this.randomColor, strokeWeight: 10 } });
            directionsRenderer.setMap(this.map);
            directionsRenderer.setDirections(response);
            //this.directionsRenderer.setDirections(response);

            var route = response.routes[0];
            // start marker
            this.addStopMarker(route.legs[0].start_location, trip.stoppageCoordinates[0].stopName);
            // the rest
            for (var i = 0; i < route.legs.length; i++) {
              this.addStopMarker(route.legs[i].end_location, trip.stoppageCoordinates[i].stopName);
            }

          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    });

  }
  async addStopMarker(position: any, i: string) {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    var markerIcon = {
      url: 'assets/img/stoppageIcon.png',
      scaledSize: new google.maps.Size(40, 40),
      //origin: new google.maps.Point(0, 0),
      //anchor: new google.maps.Point(32,65),
      labelOrigin: new google.maps.Point(80, 33)
    };

    var markerLabel = i;
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: markerIcon,
      label: {
        text: markerLabel,
        color: "#2B4D59",
        fontSize: "16px",
        fontWeight: "bold"
      }

    });

    // const markerIcon = document.createElement('div');
    // const markerImg = document.createElement('img');
    // markerImg.src = 'assets/img/stoppageIcon.png';
    // markerImg.height = 30;
    // markerImg.width = 30;
    // const spanElement = document.createElement('span');
    // spanElement.classList.add('centered'); 
    // spanElement.innerText = i;
    // //markerIcon.textContent = i;
    // markerIcon.appendChild(markerImg);
    // markerIcon.appendChild(spanElement);

    // //const loc = new google.maps.LatLng(trip.stoppageCoordinates[0].lat, trip.stoppageCoordinates[0].lng,trip.stoppageCoordinates[0].stopName);
    // const marker = new AdvancedMarkerElement({
    //   map: this.map,
    //   position: position,
    //   gmpDraggable: true,
    //   content: markerIcon,
    //   //title: trip.routeName
    // });
    // this.busMarker.push(marker);


  }



  trackBus() {
    // Simulating live updates - replace this with real data
    this.busInterval = setInterval(() => {
      // Fetch the new bus position from your backend (example is simulated)
      // Ensure the marker is defined before updating its position
      if (this.busMarker) {
        this.transportService.getActiveTripForAdminSelect(this.academicYearId).subscribe(x => {
          if (x.activeTripList && x.activeTripList.length > 0) {
            x.activeTripList.forEach(trip => {
              if (this.routeIds?.length > 0 && !this.routeIds.includes(trip.routeId)) {
                console.log("route not exist");
                return;
              }
              var index = this.busMarker.findIndex(y => y.title == trip.routeName);
              this.busMarker[index].position = new google.maps.LatLng(trip.lat, trip.long);
              // Optionally, pan the map to the new position
              //this.map.panTo(new google.maps.LatLng(trip.lat, trip.long));
              this.noActiveTrip = false;
            })
          }
          else {
            this.noActiveTrip = true;
          }
        })
      } else {
        console.error('Bus marker is not properly initialized');
      }
    }, 10000); // Update every 10 seconds
  }

  ionViewDidEnter() {
    this.clearAllMapRelatedObject();
    this.getData();
    this.trackBus();
  }

  ionicViewWillLeave() {
    this.clearAllMapRelatedObject();
  }



  ngOnDestroy(): void {
    this.clearAllMapRelatedObject();
  }

  clearAllMapRelatedObject(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }
    if (this.busInterval) {
      clearInterval(this.busInterval);
    }
  }
  public get randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

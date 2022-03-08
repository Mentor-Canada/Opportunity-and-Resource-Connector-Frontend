import InfoWindowContentVue from "./InfoWindowContent.vue"
import Vue from "vue"
import globals from "../../../globals"
import Result from "../Result"
let InfoWindowContent = Vue.extend(InfoWindowContentVue)

declare var google: any

export default class ResultMap {
  private _el: string
  private _lat: number
  private _lng: number
  private _searchId: string
  private _onChange: () => void
  private _onCenterChange: () => void

  public map: any
  private openWindow: any
  private markers: any[] = []

  el(value: string): ResultMap {
    this._el = value
    return this
  }

  searchId(value: string): ResultMap {
    this._searchId = value
    return this
  }

  lat(value: any): ResultMap {
    this._lat = parseFloat(value)
    return this
  }

  lng(value: any): ResultMap {
    this._lng = parseFloat(value)
    return this
  }

  render(): ResultMap {

    const styles = [
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#cbe9c9"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#dce2e8"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b0d9ad"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fff9e5"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffdd99"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#abd4ff"
          }
        ]
      }
    ]

    const options = {
      center: { lat: this._lat, lng: this._lng },
      zoom: 11,
      scaleControl: true,
      styles: styles,
      gestureHandling: "greedy",
      disableDefaultUI: true,
      clickableIcons: false
    }
    this.map = new google.maps.Map(this._el, options)

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      if(this._onChange) {
        this._onChange()
      }
    })

    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      if(this._onChange) {
        this._onChange()
      }
    })

    google.maps.event.addListener(this.map, 'center_changed', () => {
      if(this._onCenterChange) {
        this._onCenterChange()
      }
    })

    google.maps.event.addListener(this.map, 'click', () => {
      this.openWindow?.close()
    })

    return this
  }

  public onChange(ready) {
    this._onChange = ready
    return this
  }

  public onCenterChange(onCenterChange) {
    this._onCenterChange = onCenterChange
    return this
  }

  renderPrograms(programs: Result[]): ResultMap {
    for(const i in programs) {
      for(const j in programs[i].locations) {
        this.addMarker({
          title: programs[i].title,
          location: programs[i].locations[j]
        }, programs[i])
      }
    }
    return this
  }

  clear() {
    for(const marker of this.markers) {
      marker.setMap(null)
    }
    this.markers = []
  }

  getBounds() {
    return this.map.getBounds()
  }

  getCenter() {
    return this.map.getCenter()
  }

  private addMarker(location: any, result: Result) {
    let svg = [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32" height="52" viewBox="0 0 32 52" enable-background="new 0 0 32 52" xml:space="preserve">',
      '<path fill="#FFAD29" d="M17.41,0.56c0.68,1.82,1.06,3.77,1.06,5.82c0,9-7.14,16.35-16.19,17.02c0.71,1.6,1.62,3.17,2.75,4.71c1.98,2.69,3.61,5.2,4.97,7.52c0.42-2.66,1.18-5.2,2.29-7.57c0.91-1.95,2.03-3.79,3.34-5.48c0.44-0.56,0.89-1.11,1.37-1.64c0.95-1.06,1.98-2.05,3.08-2.97c3.17-2.64,6.93-4.63,11.05-5.79c-0.27-1.23-0.68-2.42-1.25-3.55C27.51,3.93,22.91,0.99,17.41,0.56z"/>',
      '<path fill="#D91C1C" d="M18.47,6.38c0-2.05-0.39-4-1.06-5.82C16.94,0.52,16.48,0.5,16,0.5C9.88,0.5,4.69,3.54,2.12,8.62c-2.22,4.39-2.11,9.67,0.16,14.78C11.33,22.73,18.47,15.38,18.47,6.38z"/>',
      '<path fill="#33C2B2" d="M17,20.94c-0.48,0.53-0.93,1.08-1.37,1.64c-1.31,1.69-2.43,3.53-3.34,5.48c-1.1,2.37-1.87,4.91-2.29,7.57c0.53,0.91,1.03,1.8,1.49,2.65c2.34-6.68,8.8-11.49,16.43-11.55c3.09-4.8,4.21-9.96,3.22-14.55c-4.12,1.16-7.88,3.15-11.05,5.79C18.98,18.88,17.95,19.88,17,20.94z"/>',
      '<path fill="#0D5E99" d="M11.48,38.28c2.65,5,3.92,8.87,4.52,11.2c0.95-3.73,3.63-11.41,10.97-21.37c0.33-0.45,0.64-0.91,0.94-1.37C20.28,26.79,13.83,31.6,11.48,38.28z"/>',
      '<circle fill="#FFFFFF" cx="16" cy="16" r="6.69"/>',
      '<path fill="#FFFFFF" d="M16,1c5.93,0,10.95,2.93,13.43,7.85c2.83,5.59,1.75,12.68-2.87,18.96C20.17,36.49,17.28,43.48,16,47.65c-1.28-4.17-4.17-11.16-10.57-19.84c-4.62-6.28-5.7-13.37-2.87-18.96C5.05,3.93,10.07,1,16,1 M16,0C2.43,0-5.6,14.5,4.63,28.4C14.94,42.42,16,52,16,52s1.06-9.58,11.37-23.6C37.6,14.5,29.57,0,16,0L16,0z"/>',
      '</svg>'

    ].join('\n')

    let icon = {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scale: 1,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32 / 2, 52),
      size: new google.maps.Size(32, 52),
      scaledSize: new google.maps.Size(32, 52)
    }

    let marker = new google.maps.Marker({
      map: this.map,
      icon: icon,
      title: location.title,
      position: new google.maps.LatLng(location.location.lat, location.location.lng),
      optimized: false
    })
    this.markers.push(marker)

    let content = new InfoWindowContent()

    content.$data.url = `search/${this._searchId}/apply/${result.UUID}`
    content.$data.result = result
    content.$data.resultTip = result.getTip(location.location.distance)

    content.$mount()

    const infowindow = new google.maps.InfoWindow({
      content: content.$el.innerHTML,
      pixelOffset: new google.maps.Size(0, -10)
    })

    marker.addListener("click", (e) => {
      if(this.openWindow == infowindow) {
        if(infowindow.getMap()) {
          return
        }
      }
      if(this.openWindow) {
        this.openWindow.close()
      }
      infowindow.open(this.map, marker)
      this.openWindow = infowindow
    })

  }

}

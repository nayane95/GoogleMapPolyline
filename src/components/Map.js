import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import Marker from './Map/Marker'
import Polyline from './Map/Polyline'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mapsLoaded: false,
      map: null,
      maps: null
    }
  }

  onMapLoaded (map, maps) {
    this.fitBounds(map, maps)

    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  fitBounds (map, maps) {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  afterMapLoadChanges () {
    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={this.props.markers} />
      </div>
    )
  }

  render () {
    return (
      <GoogleMap
        bootstrapURLKeys={{key: 'Put your key here'}}
        style={{height: '100vh', width: '100%'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}>
        <Marker text={'DUB'} lat={6.014576324881498} lng={80.666642925724067} />
        <Marker text={'YYZ'} lat={7.014576324881498} lng={79.96664292572406} />
        <Marker text={'YZ'} lat={7.014576324881498} lng={80.96664292572406} />
        {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
      </GoogleMap>
    )
  }
}

Map.defaultProps = {
  markers: [
    {lat: 6.014576324881498, lng: 80.66664292572406},
    {lat: 7.014576324881498, lng: 79.96664292572406},
    {lat: 7.014576324881498, lng: 80.96664292572406}
  ],
  center: [47.367347, 8.5500025],
  zoom: 3
}

export default Map

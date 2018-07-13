import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'
import { apiKey } from './config'
import { infoWindowOpen, infoWindowClose } from './actions'

const defaultCenter = {lat: 43.600000, lng: 1.433333}

const mapStateToProps = state => ({
  markerId: state.infoWindow.markerId
})
const mapDispatchToProps = dispatch => ({
  infoWindowOpen: id => dispatch (infoWindowOpen(id)),
  infoWindowClose: () => dispatch (infoWindowClose())
})

const AlamoMapDefault = connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={12}
    center={props.center}
    onClick={props.infoWindowClose}
  >
  {props.markers.map((marker, index) => (
    <Marker 
    position={marker} 
    key={index}
    icon={{url: marker.member ? '/images/alamo.png' : '/images/nonalamo.png'}}
    onClick= {() => props.infoWindowOpen (marker.id)}
    >
      {props.markerId === marker.id && 
        <InfoWindow onCloseClick={props.infoWindowClose}>
        <h4>{marker.clubName}</h4>
        </InfoWindow>}
      
    </Marker>
  ))}
  </GoogleMap>
)))

class AlamoMap extends React.Component {
  render () {
    const center = this.props.city ? this.props.city : defaultCenter
    return (
      <AlamoMapDefault
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&maptype=roadmap&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&size=480x360`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={center}
        markers={this.props.markers}
      />
    )
  }
}

export default AlamoMap

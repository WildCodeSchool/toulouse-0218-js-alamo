import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { apiKey } from './config'

const defaultCenter = {lat: 43.600000, lng: 1.433333}

const AlamoMapDefault = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >
  </GoogleMap>
))

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
      />
    )
  }
}

export default AlamoMap

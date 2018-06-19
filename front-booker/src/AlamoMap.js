import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { apiKey } from './config'

const AlamoMapDefault = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 43.600000, lng: 1.433333}}
  >
  </GoogleMap>
))

class AlamoMap extends React.Component {
  render () {
    return (
      <AlamoMapDefault
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&maptype=roadmap&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&size=480x360`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default AlamoMap

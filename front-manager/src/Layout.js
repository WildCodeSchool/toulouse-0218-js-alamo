import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const Layout = ({component: Component, exact, path, ...rest}) => {
	return(
		<Route exact={exact} path={path} render {matchProps => (
			
		)}
	)
}
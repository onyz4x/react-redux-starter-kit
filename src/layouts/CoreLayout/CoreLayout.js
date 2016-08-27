import React from 'react'
import Header from '../../components/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import classes from './CoreLayout.scss'
// import 'antd/dist/antd.css'
 import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
  <div className='container text-center'>
    <Header />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout

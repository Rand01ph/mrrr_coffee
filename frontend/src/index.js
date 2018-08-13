import React from 'react'
import ReactDom from 'react-dom'

import App from './App.js'

const Hello = () =>
  <div>
    Hello world
  </div>

ReactDom.render(
  <App />,
  document.getElementById('root')
)

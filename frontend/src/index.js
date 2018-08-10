import React from 'react'
import ReactDom from 'react-dom'

const Hello = () =>
  <div>
    Hello world
  </div>

ReactDom.render(
  <Hello />,
  document.getElementById('root')
)

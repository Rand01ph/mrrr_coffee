import React from 'react'
import './CoffeeBeans.scss'

const CoffeeBean = props =>
    <div className="coffee_bean">
        <h2 className="coffee_bean-name">{ props.name }</h2>
        <div className="image-container">
            <img src={ props.image_url } />
        </div>
        <p className="coffee_bean-origin">{ props.origin }</p>
        <div className="processing">
            <span className="processing-label">处理方式: </span>
            <span className="processing-name">{ props.processing }</span>
        </div>
        <div className="roasting">
            <span className="roasting-label">烘焙方式: </span>
            <span className="roasting-name">{ props.roasting }</span>
        </div>
        <div className="buttons">
            <button className="edit"
                    onClick={ props.edit }>Edit</button>
            <button className="delete"
                    onClick={ props.delete }>Delete</button>
        </div>
    </div>

export default CoffeeBean

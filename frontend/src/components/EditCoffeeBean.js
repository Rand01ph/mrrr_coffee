import React from 'react'
import './EditCoffeeBean.scss'

const EditCoffeeBean = props =>
    <div className="edit-coffee_bean">
        <div>
            <input
                className="input"
                type="text"
                defaultValue={props.name}
                onChange={props.updateName}/>
            <label className="label">Name: </label>
        </div>
        <div>
            <input
                className="input"
                type="text"
                defaultValue={props.image_url}
                onChange={props.updateImage}/>
            <label className="label">Image Url: </label>
        </div>
        <div>
            <input
                className="input"
                type="text"
                defaultValue={props.origin}
                onChange={props.updateOrigin}/>
            <label className="label">Origin: </label>
        </div>
        <div>
            <input
                className="input"
                type="text"
                defaultValue={props.processing}
                onChange={props.updateProcessing}/>
            <label className="label">Processing: </label>
        </div>
        <div>
            <input
                className="input"
                type="text"
                defaultValue={props.roasting}
                onChange={props.updateRoasting}/>
            <label className="label">Roasting: </label>
        </div>
        <div className="buttons">
            <button className="edit"
                    onClick={props.saveEdits}>Save Edits
            </button>
        </div>
    </div>
export default EditCoffeeBean

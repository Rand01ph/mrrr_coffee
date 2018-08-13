import React, {Component} from 'react'

import api from './utils/api'
import './App.scss'

import CoffeeBean from './components/CoffeeBeans'
import EditCoffeeBean from './components/EditCoffeeBean'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coffee_beans: [],
            editingCoffeeBean: null,
            isNew: false,
        }
    }

    componentDidMount = () => {
        api.getAllCoffeeBeans()
            .then(coffee_beans => {
                console.log(coffee_beans)
                this.setState({coffee_beans: coffee_beans}
                )
            })
    }

    render = () =>
        <div className="page">
            <h1>MrrrStack Coffee</h1>
            <div className="container">
                <button className="add"
                        onClick={this.addNewCoffeeBean}>Add another coffee bean
                </button>
            </div>
            <div className="container">
                {this.renderCoffeeBeans()}
                <div id="modal" className="modal">
                    <div className="modal-content">
                        {this.state.editingCoffeeBean ? this.renderEditModal() : ''}
                    </div>
                </div>
            </div>
        </div>

    renderCoffeeBeans = () => this.state.coffee_beans.map(coffee_bean =>
        <CoffeeBean key={coffee_bean.id}
                    name={coffee_bean.name}
                    image_url={coffee_bean.image_url}
                    origin={coffee_bean.origin}
                    processing={coffee_bean.processing}
                    roasting={coffee_bean.roasting}
                    edit={e => this.editCoffeeBean(coffee_bean)}
                    delete={e => this.deleteCoffeeBean(coffee_bean)}
        />
    )

    renderEditModal = () =>
        <EditCoffeeBean
            name={this.state.editingCoffeeBean.name}
            image_url={this.state.editingCoffeeBean.image_url}
            origin={this.state.editingCoffeeBean.origin}
            processing={this.state.editingCoffeeBean.processing}
            roasting={this.state.editingCoffeeBean.roasting}
            updateName={this.updateName}
            updateImage={this.updateImage}
            updateOrigin={this.updateOrigin}
            updateProcessing={this.updateProcessing}
            updateRoasting={this.updateRoasting}
            saveEdits={
                this.state.isNew ? this.saveNewCoffeeBean : this.saveEdits
            }
        />

    toggleModal = () => {
        const modal = document.getElementById('modal')
        modal.classList.toggle('show')
    }

    addNewCoffeeBean = () => {
        const coffee_bean = {
            name: "",
            image_url: "",
            origin: "",
            processing: "",
            roasting: ""
        }
        this.setState({editingCoffeeBean: coffee_bean, isNew: true})
        this.toggleModal()
    }

    updateName = e => {
        const coffee_bean = {...this.state.editingCoffeeBean, name: e.target.value}
        this.setState({editingCoffeeBean: coffee_bean})
    }

    updateImage = e => {
        const coffee_bean = {...this.state.editingCoffeeBean, image_url: e.target.value}
        this.setState({editingCoffeeBean: coffee_bean})
    }

    updateOrigin = e => {
        const coffee_bean = {...this.state.editingCoffeeBean, origin: e.target.value}
        this.setState({editingCoffeeBean: coffee_bean})
    }

    updateProcessing = e => {
        const coffee_bean = {...this.state.editingCoffeeBean, processing: e.target.value}
        this.setState({editingCoffeeBean: coffee_bean})
    }

    updateRoasting = e => {
        const coffee_bean = {...this.state.editingCoffeeBean, roasting: e.target.value}
        this.setState({editingCoffeeBean: coffee_bean})
    }

    saveNewCoffeeBean = () => {
        const coffee_bean = {
            name: this.state.editingCoffeeBean.name,
            image_url: this.state.editingCoffeeBean.image_url,
            origin: this.state.editingCoffeeBean.origin,
            processing: this.state.editingCoffeeBean.processing,
            roasting: this.state.editingCoffeeBean.roasting
        }
        api.addCoffeeBean(coffee_bean)
            .then(res => {
                this.setState({coffee_beans: res})
                this.toggleModal()
            })
    }

    editCoffeeBean = coffee_bean => {
        this.setState({editingCoffeeBean: coffee_bean, isNew: false})
        this.toggleModal()
    }


    saveEdits = () => {
        const coffee_bean = {
            name: this.state.editingCoffeeBean.name,
            image_url: this.state.editingCoffeeBean.image_url,
            origin: this.state.editingCoffeeBean.origin,
            processing: this.state.editingCoffeeBean.processing,
            roasting: this.state.editingCoffeeBean.roasting
        }
        api.updateCoffeeBean(coffee_bean, this.state.editingCoffeeBean.id)
            .then(res => {
                this.setState({
                    editingCoffeeBean: null,
                    coffee_beans: res,
                    isNew: false
                })
                this.toggleModal()
            })
    }


    deleteCoffeeBean = (coffee_bean) => {
        api.deleteCoffeeBean(coffee_bean.id)
            .then(res => {
                const coffee_beans = this.state.coffee_beans.filter(c => c.id != coffee_bean.id)
                this.setState({ coffee_beans: coffee_beans })
            })
    }
}


window.onclick = event => {
    if (event.target === modal) {
        modal.classList.toggle('show')
    }
}


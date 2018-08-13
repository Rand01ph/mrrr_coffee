import axios from 'axios'

const base_url = `http://localhost:8000/api/coffee_beans`

export default {
    getAllCoffeeBeans: () => axios.get(`${base_url}`)
        .then(res => {
            if (res.status === 200) {
                return res.data.result
            }
            throw new Error(res.error)
        }),
    addCoffeeBean: (coffee_bean) => axios.post(`${base_url}`, coffee_bean)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return res.data.result
            }
            throw new Error(res.error)
        }),
    updateCoffeeBean: (coffee_bean, coffee_bean_id) => axios.put(`${base_url}/${coffee_bean_id}`, coffee_bean)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return res.data.result
            }
            throw new Error(res.error)
        }),
    deleteCoffeeBean: coffee_bean_id => axios.delete(`${base_url}/${coffee_bean_id}`)
        .then(res => {
            if (res.status === 200 || res.status === 204) {
                return res.data.result
            }
            throw new Error(res.error)
        })
}

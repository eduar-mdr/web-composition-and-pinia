import BaseService from './baseService'

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    //console.log(errors);
                    reject(errors)
                })
        })
    },
}

export default ApiService

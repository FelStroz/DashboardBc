import axios from 'axios';
import config from '../../config.json';

export default {
    getList: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}`, {
                headers: {authorization: `Bearer ${localStorage.getItem("token")}`},
                params: params
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },

    getOne: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}/${params.id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },

    getMany: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}/`, {
                headers: {authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {id: params.ids}
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },

    delete: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${config.backUrl}/${resource}/${params.id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },

    // getManyReference: (resource, params) => {
        // const {page, perPage} = params.pagination;
        // const {field, order} = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        // const url = `${process.env.REACT_APP_API_HOST}${resource}?${stringify(query)}`;
        //
        // return httpClient(process.env.REACT_APP_API_HOST).then(({headers, json}) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    // },

    update: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.put(`${config.backUrl}/${resource}/${params.id}`, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },

    create: (resource, params) => {
        // if (resource.includes("result")) {
        //     let dados = new FormData();
        //     dados.append('file', params.data.file.rawFile);
        //     dados.append('patientId', params.data.patientId);
        //     dados.append('observation', params.data.observation);
        //     return new Promise((resolve, reject) => {
        //         axios.post(process.env.REACT_APP_API_HOST + `/` + resource, dados, {
        //             headers: {
        //                 authorization: `Bearer ${localStorage.getItem("token")}`,
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         })
        //             .then((response) => {
        //                 resolve(response.data);
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             })
        //     })
        // }
        return new Promise((resolve, reject) => {
            axios.post(`${config.backUrl}/${resource}`, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.message) : reject(e.message);
                })
        })
    },
};

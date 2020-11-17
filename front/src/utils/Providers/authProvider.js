import axios from 'axios';
import config from '../../config.json'

if (!localStorage.getItem("token"))
    localStorage.setItem("not_authenticated", true);

export default {
    // called when the user attempts to log in
    login: ({username, password}) => {
        return new Promise((resolve, reject) => {
            axios.post(`${config.backUrl}/auth`, {
                email: username,
                password: password
            }).then((response) => {
                localStorage.setItem("username", username)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("permission", response.data.user.isAdmin);
                localStorage.removeItem("not_authenticated");
                return resolve();
            }).catch((e) => {
                return e.response ? reject(e.response.data.message) : reject('Erro de servidor! Verifique sua conexão com a internet ou fale com um desenvolvedor!');
            })
        });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.setItem("not_authenticated", true);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("permission");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: (data) => {
        console.log(data);
        let {status} = data;
        if (status === 401 || status === 403) {
            return Promise.reject("Não Autorizado");
        }
        if (status === 409) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("not_authenticated")
            ? Promise.reject("Não autorizado! Você não possui autorização para acessar essa informação!")
            : Promise.resolve();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem("permission");
        return role ? Promise.resolve(role) : Promise.reject();
    },
};

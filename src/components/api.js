import axios from "axios";

const client = axios.create({
    baseURL: 'http://127.0.0.1:8081/',
    //baseURL: 'https://myphrplus-backend.nw.r.appspot.com/',
});


/*
*  Api service for interacting with the backend.
*/
export const ApiService = (() => {
    const execute = ({ method, url, data = {}, params = {} }) => {
        return client({
            method,
            url,
            data,
            params
        }).then(response => response.data);
    };
    const controller = {
        registerPatient(name, email, uid) {
            return execute({
                method: "POST", url: "/registerPatient", data: {
                    name,
                    email,
                    uid
                }
            });
        }
    };
    return controller;
})();
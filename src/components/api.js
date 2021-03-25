import axios from "axios";
import firebase from "firebase/app";
import store from "@/store";


const client = axios.create({
    baseURL: 'http://127.0.0.1:8081/',
    //baseURL: 'https://myphrplus-backend.nw.r.appspot.com/',
});

// HTTP interceptor to add the firebase id token to the headers. Used by the api for identification and authentication
client.interceptors.request.use(async (config) => {
    if (!store.state.user.loggedIn) return config;
    const uidToken = await firebase.auth().currentUser?.getIdToken();
    if (!uidToken) return config;
    config.headers['Xx-Firebase-Id-Token'] = uidToken;
    return config;
});

/*
*  Api service for interacting with the backend.
*/
export const ApiService = (() => {
    const execute = ({ method, url, data = {}, params = {}, headers = {}, responseType = '' }) => {
        return client({
            method,
            url,
            data,
            params,
            headers,
            responseType
        });
    };
    const controller = {
        registerPatient(name, email, uid, nhsnum, parent) {
            return execute({
                method: "POST", url: "/registerPatient", data: {
                    name,
                    email,
                    uid,
                    nhsnum,
                    parent
                }
            });
        },
        getUser() {
            return execute({
                method: "GET", url: "/getUser"
            });
        },
        deleteUser() {
            return execute({
                method: "GET", url: "/deleteUser"
            });
        },
        uploadFilePatient(formData) {
            return execute({
                method: "POST", url: "/uploadFilePatient", headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
        },
        getRole() {
            return execute({
                method: "GET", url: '/getUserRole'
            });
        },
        createNewDP(name, email, password) {
            return execute({
                method: "POST", url: "/newDP", data: {
                    name,
                    email,
                    password
                }
            })
        },
        createNewDR(name, email, password) {
            return execute({
                method: "POST", url: "/newDR", data: {
                    name,
                    email,
                    password
                }
            })
        },
        getFiles(){
            return execute({
                method: "GET", url:"/getFiles"
            })
        },
        downloadFile(fileRef){
            return  execute({
                method: "GET", url:"/downloadFile", params: {fileRef}, responseType: 'blob'
            })
        },
        getAllDPs(){
            return execute({
                method: "GET", url:"/getAllDPs"
            })
        },
        getPatients(){
            return execute({
                method: "GET", url:"/getPatients"
            })
        },
        getPatientFiles(nhsNum){
            return execute({
                method: "GET", url:"/getPatientFiles", params: {nhsNum}
            })
        },
        getPatientAttributes(nhsNum){
            return execute({
                method: "GET", url:"/getPatientAttributes", params: {nhsNum}
            })
        },
        addAttribute(nhsNum, attribute){
            return execute({
                method: "POST", url:"/addAttribute", params: {nhsNum, attribute}
            })
        },
        removeAttribute(nhsNum, attribute){
            return execute({
                method: "POST", url:"removeAttribute", params: {nhsNum, attribute}
            })
        }
    };
    return controller;
})();
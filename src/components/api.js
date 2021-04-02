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
        downloadFile(formData){
            return  execute({
                method: "POST", url:"/downloadFile", data: formData, responseType: 'blob'
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
        getPatientFiles(formData){
            return execute({
                method: "POST", url:"/getPatientFiles", data: formData
            })
        },
        getPatientAttributes(formData){
            return execute({
                method: "POST", url:"/getPatientAttributes", data: formData
            })
        },
        addPatientAttribute(formdata){
            return execute({
                method: "POST", url:"/addPatientAttribute", data: formdata
            })
        },
        removePatientAttribute(formdata){
            return execute({
                method: "POST", url:"/removePatientAttribute", data: formdata
            })
        },
        uploadFile(formData){
            return execute({
                method: "POST", url: "/uploadFile", headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
        },
        deleteFile(formData){
            return execute({
                method: "POST", url: "/deleteFile", data: formData
            })
        },
        getAllInBucket(){
            return execute({
                method: "POST", url: "/getAllInBucket"
            })
        },
        getUserAttributes(formdata){
            return execute({
                method: "POST", url: "/getUserAttributes", data: formdata
            })
        },
        addUserAttribute(formdata){
            return execute({
                method: "POST", url: "/addUserAttribute", data: formdata
            })
        },
        removeUserAttribute(formdata){
            return execute({
                method: "POST", url: "/removeUserAttribute", data: formdata
            })
        },
        getReminders(formdata){
            return execute({
                method: "POST", url: "/getReminders", data: formdata
            })
        },
        addReminder(formdata){
            return execute({
                method: "POST", url: "/addReminder", data: formdata
            })
        },
        removeReminder(formdata){
            return execute({
                method:"POST", url:"/removeReminder", data: formdata
            })
        },
        getDashboardInfo(){
            return execute({
                method: "GET", url: "/getDashboardInfo"
            })
        }
    };
    return controller;
})();
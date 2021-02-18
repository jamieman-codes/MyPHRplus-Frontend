/* eslint-disable no-unused-vars */
//Useful scripts that will be used a lot

/**
 * Submits a JSON to backend
 * @param {String} URL URL to API
 * @param {JSON} body Contains information needed for function to complete
 */

function submitMessage(URL, jsonBody) {
    console.log("logging");
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: jsonBody
    }).then((res) => console.log(res));
}
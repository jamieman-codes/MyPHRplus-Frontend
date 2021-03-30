/* eslint-disable no-unused-vars */
//Helper functions :)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseAccessPolicy(policy){
    let res = "";
    var i; 
    for(i = 0; i < policy.numOfAtrs; i++){
        let attribute = policy.attributes[i];
        if(attribute.type == "text"){
            res += attribute.value + " ";
        }
        else if(attribute.type == "sub-policy"){
            var x;
            let subPolicy = attribute.value;
            for(x = 0; x < subPolicy.numOfAtrs; x++){
                res += subPolicy.attributes[x].value + " ";
            }
            res += subPolicy.selected + "of" + subPolicy.numOfAtrs + " ";
        }
    }
    res += policy.selected + "of" + policy.numOfAtrs;
    console.log(res)
    return res;
}

export {sleep, parseAccessPolicy};
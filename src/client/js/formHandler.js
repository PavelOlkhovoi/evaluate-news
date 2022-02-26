/**
* @description Form Handler evokes validate and fetch API functions 
* @param {event} Click - Should be a button 
*/
function formHandler(event){
    event.preventDefault();
    let linkInput = document.getElementById('link');
    let link = linkInput.value;
    let errorBox = document.querySelector('.main__error');
    let testPattern = formValidate(linkInput.value);
    if(testPattern) {
        errorBox.innerHTML = ` `;
        // Get key for API reguest from server
        const key = getKey().then(res => res)
        // Fetch data to api.meaningcloud.com
        .then(res=> {
            hideResult();       
            const test = fetchData('https://api.meaningcloud.com/sentiment-2.1', {
                key: res.key,
                lang:"en",
                url:link
            });
        });
    }else {
        errorBox.innerHTML = `Bed link`;
    }
}
/**
* @description Form validate 
* @param {string} url - The link that should be evaluated
* @returns {boolean} - Tru / false 
*/
function formValidate(linkInput){
    // Simple regexp to check the first part of the link
    let test = /^https{0,1}:\/\/+\w*\.+.*/.test(linkInput);
    return test;
}
/**
* @description The get request to the internal server to get the API key 
* @returns {object} Key - Custom object that will send on server
*/
async function getKey(){
    const response = await fetch('http://localhost:8081/key');
    const data = await response.json();

    return data
}
/**
* @description The post request to API Meaning cloud
* @param {string} url - https://api.meaningcloud.com/sentiment-2.1
* @param {object} data - Params of the Request
*/
async function fetchData(url, data={}){
    fetch(url,
    {
        method: "POST",
        headers: {  
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
          }, 
          body: `key=${data.key}&lang=${data.lang}&url=${data.url}`,
    }).then(response => response.json())
    .then(result => {
        showResult();
        let resultObj = {
            agreement: result.agreement,
            subjectivity: result.subjectivity,
            confidence: result.confidence,
            irony: result.irony
        };
        renderData(resultObj);
    })
    .catch(error => console.log('error', error));
}
/**
* @description Hide the results block 
*/
function hideResult(){
    document.querySelector('.reply').classList.remove('active');
}

/**
* @description Show the results block 
*/
function showResult(){
    document.querySelector('.reply').classList.add('active');
}

/**
* @description Send data from API to APP
* @param {object} - Object with data
*/
function renderData(resultObj){
    for (let key in resultObj){
        document.getElementById(key).innerHTML = `${key}: <em>${resultObj[key]}</em>`;
    }
}

export { formHandler, formValidate, hideResult }
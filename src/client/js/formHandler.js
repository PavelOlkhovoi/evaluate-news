function formHandler(event){
    event.preventDefault();
    let linkInput = document.getElementById('link');
    let link = linkInput.value;

    let errorBox = document.querySelector('.main__error');
    let testPattern = formValidate(linkInput.value);
    console.log(link)
    if(testPattern) {
        errorBox.innerHTML = ` `;
        const key = getKey().then(res => res)
        // Fetch data to api.meaningcloud.com
        .then(res=> {
            const test = fetchData('https://api.meaningcloud.com/sentiment-2.1', {
                key: res.key,
                lang:"en",
                url:link
            });
        });
        return true;
    }else {
        errorBox.innerHTML = `Bed link`;
        return false;
    }
    
}

function formValidate(linkInput){
    // Simple regexp to check the first part of the link
    let test = /^https{0,1}:\/\/+\w*\.+.*/.test(linkInput);
    console.log('Status', test);
    return test;
}
async function getKey(){
    const response = await fetch('http://localhost:8081/key');
    const data = await response.json();

    return data
}
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
        let resultObj = {
            agreement: result.agreement,
            subjectivity: result.subjectivity,
            confidence: result.confidence,
            irony: result.irony
        };
        for (let key in resultObj){
            console.log(key);
            document.getElementById(key).innerHTML = `${key}: ${resultObj[key]}`;
        }
    })
    .catch(error => console.log('error', error));
}

export { formHandler, formValidate }
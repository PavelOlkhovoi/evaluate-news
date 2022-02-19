function formHandler(event){
    event.preventDefault();
    let link = document.getElementById('link');
    formValidate(link);
    console.log(link.value)
    getKey().then(res=> {
        console.log(res);
        const test = fetchData('https://api.meaningcloud.com/sentiment-2.1', {
            key:"a1ac2e770759b299cec39c7489ff5da4&lang=en&ur",
            lang:"en",
            url:"https://www.theguardian.com/world/2022/feb/18/pro-russian-separatist-order-mass-evacuation-eastern-ukraine-fear-moscow-seeking-create-pretext-invasion"
        });
    });
}

function formValidate(link){
    if(link.value === ""){
        link.innerHTML = "Type text";
        console.log("Type text");
    }
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
        // body: "key=a1ac2e770759b299cec39c7489ff5da4&lang=en&url=https://www.theguardian.com/world/2022/feb/18/pro-russian-separatist-order-mass-evacuation-eastern-ukraine-fear-moscow-seeking-create-pretext-invasion",
    }).then(response => response.json())
    //result.agreement
    //result.subjectivity
    //result.confidence
    //result.irony
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export { formHandler }
// const apiCall = async(prompt,apiKey) =>{
//   const response = await fetch('https://api.openai.com/v1/completions',{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`
//     },
//     body: JSON.stringify({
//       "prompt": prompt,
//     "model": "text-davinci-003",

// "temperature": 0.7,
// "max_tokens": 256,
// "top_p": 1,
// "frequency_penalty": 0,
// "presence_penalty": 0
//     })
// });
// return response;
// }
// console.log(chrome)
(() => {
  // async function getActiveTabURL() {
  //   const tabs = await chrome.tabs.query({
  //       currentWindow: true,
  //       active: true
  //   });
  
  //   return tabs[0];
  // }console.log("hello")
  console.log("hello")
const getQuestion = ()=>{
    try {
        var firstQuestion = document.querySelector("#challenge > div > div > section > form > fieldset:nth-child(2)");
        var str = firstQuestion.innerText ;
        var secondQuestion =    document.querySelector("#challenge > div > div > section > form > fieldset:nth-child(3)"); 
        var text = document.querySelector("#th-unit-content > div > article");
           text = text.innerText;
        str+="  <-----Next question----->  "
       str+=secondQuestion.innerText;
       console.log(str)
       return {str,text};
    } catch (error) {
         console.log(error);
    }




}
chrome.runtime.onMessage.addListener(async(obj, sender, response) => {
       var {type, value}= obj;
       if(type=="getQuestions"){
        var string = getQuestion();
        // const activeTab = await getActiveTabURL();
          chrome.runtime.sendMessage( {
            type: "getanswers",
            value: string,
          });
       }
  
   
  });

})();


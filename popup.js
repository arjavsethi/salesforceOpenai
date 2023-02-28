import { getActiveTabURL } from "./utils.js";
// const { Configuration, OpenAIApi } = require("openai");
const onClick = async() =>{
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(activeTab.id, {
        type: "getQuestions",
        value: "NULL",
      });

}
const apiCall = async(prompt,apiKey) =>{
  const response = await fetch('https://api.openai.com/v1/completions',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      "prompt": prompt,
    "model": "text-davinci-003",

"temperature": 0.7,
"max_tokens": 256,
"top_p": 1,
"frequency_penalty": 0,
"presence_penalty": 0
    })
});
return response;
}
document.getElementById("getAnswers").addEventListener("click", onClick);
chrome.runtime.onMessage.addListener(async(obj, sender, response) => {
       var {type, value}= obj;
       if(type=="getanswers"){
        console.log("hello")
           var answer = document.getElementById("answers");
           answer.innerText = value.str;
           var prompt = `The text below is of salesforce trail head i am giving the text which contains the 2 question and options for both question both.Please return only  answer  with option A ,B,C,D.  And question1 and question2 are divided by following   <-----Next question----->  , text = '${value.str}' I am also attaching the content from which you can train to give answer ${value.text} `
           const apiKey = "Your API key"
          console.log("hello")
           
        const response = await apiCall(prompt,apiKey).then(response => response.json())
        .then(data => answer.innerText = data.choices[0].text)
        .catch(error => console.error(error));;
        const data = JSON.parse(response)
        answer.innerText = data.id;
       }
  
   
  });

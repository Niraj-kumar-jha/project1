let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let usermessage = null;
let Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCxhY38F2Dtuc0Fdhae0FSs8EmpLx2HScE";

function createChatbox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text")
  try {
    let response = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {"role":"user",
            "parts":[{ text:usermessage}],
          },
        ],
      }),
    });
    let data =await response.json();
    let apiResponse = data?.candidates[0].content.parts[0].text;
    textElement.innerText= apiResponse
  } catch (error) {
    console.log(error);
  }
  finally{
     aiChatBox.querySelector(".loading").style.display ="none"
  }
}
function showLoading() {
  let html = ` <div class="img">
     <img src="chat.png" alt="" width="50"> 
    </div>
    <p class="text"></p>
   <img class="loading" src="load.gif" alt="loading" height="50">`;
  let aiChatBox = createChatbox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
  usermessage = prompt.value;
  if(usermessage == ""){
     container.style.display = "flex"
  }
  {
     container.style.display = "none"
  }
  if (!usermessage) return;
  let html = ` <div class="img">
  <img src="niraj0.png" alt="" width="50"> 
 </div>
 <p class="text"></p>`;
  let userChatBox = createChatbox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = usermessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});

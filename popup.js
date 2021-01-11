const port = chrome.extension.connect({
  name: "Vearch"
});
port.postMessage("Connected!");

port.onMessage.addListener((message) => {
  console.log(message);
  if (message.msg === "video_source"){
    console.log(message.data.src);
    videoSrc_button_onClick(videoSrc_button.value, message.data.src);
  }
})


window.onload = () =>{
  const input = document.getElementById("videoInput");
  const videoSrc_button = document.getElementById("videoSrc_button");
  videoSrc_button.addEventListener('click', ()=>{
    videoSrc_button_onClick(videoSrc_button.value, input.value);
   }, false);
  }


const videoSrc_button_onClick = (state, text) => {
  const input = document.getElementById("videoInput");
  const videoSrc_button = document.getElementById("videoSrc_button");
  const src_text = document.getElementById("videoSrc");
  const video = document.getElementById("video");
  src_text.innerText = text;

  if(state === "create"){
    input.style.display = "none";
    videoSrc_button.value = "delete";
    videoSrc_button.innerText = "delete";
    src_text.style.display = "inline";

    video.setAttribute('src', text);
    video.setAttribute('controls','controls');

  }
  else{
    input.style.display = "inline-block";
    videoSrc_button.value = "create";
    videoSrc_button.innerText = "create";
    src_text.style.display = "none";
    input.value = "";
    video.removeAttribute('src');
    video.removeAttribute('controls');
    video.load();
  }
}
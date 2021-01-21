window.onload = () =>{
  const input = document.getElementById("videoInput");
  const videoSrc_button = document.getElementById("videoSrc_button");
  const search_button = document.getElementById("search_button");
  
  videoSrc_button.addEventListener('click', ()=>{
    videoSrc_button_onClick(videoSrc_button.value, input.value);
   }, false);
   search_button.addEventListener('click', ()=>{
     search_button_onClick(search_button.value);
    }, false);
  }


const videoSrc_button_onClick = (state, videoSource) => {
  const input = document.getElementById("videoInput");
  const videoSrc_button = document.getElementById("videoSrc_button");
  const videoSrc = document.getElementById("videoSrc");
  const videoSrcText = videoSrc.getElementsByTagName("h4")[0];
  const video = document.getElementById("video");
  

  if(state === "create"){
    const reg = /[a-z0-9A-Z]*(?=\?|$)/;
    const videoID = reg.exec(videoSource)[0];
    let src = `https://youtube.com/${videoID}`;
    let srcEmbed = `https://youtube.com/embed/${videoID}`;
    videoSrcText.innerText = src;

    //pass the src to backend to download

    input.style.display = "none";
    videoSrc_button.value = "delete";
    videoSrc_button.innerText = "delete";
    videoSrc.style.display = "inline";

    video.setAttribute('src', srcEmbed);

  }
  else{
    input.style.display = "inline-block";
    videoSrc_button.value = "create";
    videoSrc_button.innerText = "create";
    videoSrc.style.display = "none";
    input.value = "";
    video.removeAttribute('src');
  }
}

const search_button_onClick = (keyword) => {
  //check video
  //if there's no video, float the message for empty source
  //if not,
  if(keyword === null){
    //total script 
  }
  else {
    //keyword script
  }
}
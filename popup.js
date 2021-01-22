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

    //request and get scripts to server by passing video source or id
    //for test(temporary)
    pass_VideoSource(videoSource)
      .then(()=> get_VideoScript())
      .then((textScripts) => {
        console.log(textScripts);
        //make script list tags
        makeScriptList(textScripts);  
      })
      .catch(alert);

    //original 
    /*    
    getScriptData(videoSource)
      .then((textScripts) => {
        console.log(textScripts);
        //make script list tags
        makeScriptList(textScripts);  
      })
      .catch(alert); 
    */
      
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
    
    let ul = document.getElementById("keywordLists");
    while( ul.hasChildNodes() ){
      ul.removeChild(ul.lastChild);
    }
  }
}


//for test(temporary)
const pass_VideoSource = (videoSource) =>{
  return new Promise((resolve, reject)=>{
    console.log(`pass video source to server : ${videoSource}`);
    setTimeout(() => {
      console.log("passed!");
      resolve("passed!")
    },1000);
  })
}
//for test(temporary)
const get_VideoScript = () => {
  return new Promise((resolve, reject)=>{
    console.log("get video script from server");
    let scriptData = scripts;
    setTimeout(() => {
      if(scriptData !== null) resolve(scriptData);
      else reject(new Error("Couldn't get video script!"));
    }, 1000); 
  })
}

//original 
/* 
//depending on the server, parameter can be video source or video id
const getScriptData = async(videoSource) => {
  let response = await fetch(`/scripts/${videoSource}`);  //request 
  if (response.status === 200){
    let scriptJSON = await response.json();
    return scriptJSON;
  }
  else {
    return new Error("Couldn't get video script!");
  } 
}
*/ 


const makeScriptList = (data) => {
  if(data === null) return new Error("There is no script!");
  let ul = document.getElementById("keywordLists");

  data.forEach( el => {
    let li = document.createElement("li");
    let timestamp = document.createElement("div");
    let keyword = document.createElement("div");
    timestamp.appendChild(document.createTextNode(el.time));
    timestamp.setAttribute("class", "timestamp");
    keyword.appendChild(document.createTextNode(el.script));
    keyword.setAttribute("class", "keyword");

    li.appendChild(timestamp);
    li.appendChild(keyword);
    ul.appendChild(li);
  });
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
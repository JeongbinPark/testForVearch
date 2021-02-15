window.onload = () =>{
  const search_button = document.getElementById("search_button");
  const search_input = document.getElementById("search_input");
  const videoSrcForm = document.getElementById("videoInputBar");
  const keywordSearchForm = document.getElementById("searchBar");

  videoSrcForm.addEventListener('submit', function(e){
    e.preventDefault();

    //parsing video ID
    const reg = /[a-z0-9A-Z]*(?=\?|$)/;
    const videoID = reg.exec(this.link.value)[0];

    //check state and change tags
    changeTags(this.state.value, videoID);    

    //get Script and make 
    (async() => {
      const scriptsJson = await getScriptData(videoID);

      //should save scriptJson into session storage
      //for searching keyword

      //make script list tags
      makeScriptList(scriptsJson.scripts);
    })();
  });

  
  //check keyword value
  //and make a new array to pass for makeScriptList function's parameter

  //choose 'submit' or 'onChange'
  //do not need to submit because there's the script in storage
  keywordSearchForm.addEventListener('submit', function(e){
    e.preventDefault();
    const keyword = this.keyword.value;

    //call the data from session storage
/* 
    let newScriptArray = [];
    //searching string(keyword) with indexOf function
    forEach (el => {
      const time = el.time;
      const script = el.script;
      if(script.indexOf(keyword) != -1){
        newScriptArray.push(
          {
            time: time,
            script : script
          }, 
        )
      }
    })

    makeScriptList(newScriptArray);
     */
  });

/*   search_button.addEventListener('click', ()=>{
    search_button_onClick(search_input.value);
  }, false); */
}

const changeTags = (state, videoID) => {
  const input = document.getElementById("videoInput");
  const videoSrc_button = document.getElementById("videoSrc_button");
  const videoSrc = document.getElementById("videoSrc");
  const videoSrcText = videoSrc.getElementsByTagName("h4")[0];
  const video = document.getElementById("video");

  if(state === "create"){
    let src = `https://youtube.com/${videoID}`;
    let srcEmbed = `https://youtube.com/embed/${videoID}`;
    videoSrcText.innerText = src;
      
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

//fetch json data
const getScriptData = async(videoID) => {
  const response = await fetch('http://192.168.0.6:3002/link', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({videoID: videoID})
  });
  const content = await response.json();
  return content;
}

//make script lists by json data
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

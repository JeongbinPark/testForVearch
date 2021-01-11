chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    'title': "Search Keywords vias Vearch",
    'type':  'normal',
    'id': "video_test",
    'contexts':['video']
  })
});

let video_info = null;

chrome.contextMenus.onClicked.addListener((info)=>{
  const video_src = info.srcUrl;
  video_info = {
    msg: "video_source",
    data: {
      src: video_src
    }
  };
  console.log(video_info);
})

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
    console.log(msg, video_info);
    if(video_info !== null) port.postMessage(video_info);
    video_info = null;
  });
})
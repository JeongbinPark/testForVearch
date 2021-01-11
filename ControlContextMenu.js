chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    'title': "Search Keywords vias Vearch",
    'type':  'normal',
    'id': "video_test",
    'contexts':['video']
  })
});
chrome.contextMenus.onClicked.addListener((info, tab)=>{
  const video_info = info.srcUrl;
  console.log(video_info);
  chrome.runtime.sendMessage({
    msg: "video_source",
    data: {
      src: video_info
    }
  }, console.log("OK")
  )
})

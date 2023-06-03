function main() {

    var accessToken = ScriptApp.getOAuthToken();

  var options = {
    method: "get",
    headers: {"Authorization": "Bearer " + accessToken}
  }


  var srcProjectId = "### project ID ###"; // Source project ID
  var dstGoogleDocsId = "### file ID of Google Docs ###"; // Destination spreadsheet ID

  var baseUrl = "https://script.googleapis.com/v1/projects";


  // Retrieve filename of bound-script project.
  var srcName = JSON.parse(UrlFetchApp.fetch(baseUrl + "/" + srcProjectId, options).getContentText()).title;

  // Retrieve bound-script project.
  var obj = UrlFetchApp.fetch(baseUrl + "/" + srcProjectId + "/content", options).getContentText();

  // Create new bound script and retrieve project ID.
  var dstId = JSON.parse(UrlFetchApp.fetch(baseUrl, {
    method: "post",
    contentType: 'application/json',
    headers: {"Authorization": "Bearer " + accessToken},
    payload: JSON.stringify({"title": srcName, "parentId": dstGoogleDocsId})
  }).getContentText()).scriptId;

  // Upload a project to bound-script project.
  var res = JSON.parse(UrlFetchApp.fetch(baseUrl + "/" + dstId + "/content", {
    method: "put",
    contentType: 'application/json',
    headers: {"Authorization": "Bearer " + accessToken},
    payload: obj
  }).getContentText());
}



function test() {

  var key =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2wqlXn/xVio5A\nv7GCv8tIu4wWvbGPF8v2Rs71Bmq49LlzXeimjRNY0Id9Qv6jryWCc2Y222Od5iYn\n4dAuP2NtGAufvqxaC0Y9PWWHkWWt5EtA2Ebr1i5G27vryjtlYrKdFhJ8rvpCTaqd\ne7z/8sVE9XH0VZxm74wen9SXCGjv2blZVqgstql5dCC2J23D30G51HN83zKKwM+6\nkfwW8GzXIxURxTl3CgUeGV2DMDrX+XeFc52XTvg7sV/8G3BX4I4ng9AFc5zDUBT4\nuSGqHcfclAFeA7ZXSQUDKXgfSpKEesvtr28192uTyrpXtaXgI/R0X97vrEmUh38D\n7jUWS7kbAgMBAAECggEAFhn9a6zb0aZzZI4qE+NI3K9dliRzlBfvIQXYIlaX0m05\n/iMlrvqRk+SH9hSDgdz8/sUg39JxPhemlp0e1XDx/6/wO+3NnwgNAvvpStdBAiIB\nHcLp9LxOlWAeXjnzK+QfMJMKQkzQ0/Lbhrb/mL5Nr/S0xrURuHsQqWVvyqIIOrUX\n9AjlbY038lJjUbHfI97vZnqPQtJ+B0nQZ+Rz9Nu3K3xtOwbFfkeot0vTMWEAdMLm\norAEJd8tSXezPuUed0dZZrOa2yH0NrICGDDzCIPas/OdJU4c8kC958K8e7cE8yl8\nBPvYop1wYrxK+XQJBhgtB8k/LuoAah/f72ZnPFDprQKBgQDgpSJ6GSSAT6/YIGYf\nhox+7nhQqcd3dNt6JuKySquMzfUeIoatLnEVfFXRcLtjS0z/Wjn9ZSNBMuXYWwN7\n7QQNb2L+8WrjEZ3S7esySENwMgXUDXCo3A0QYEjQ/YxN+Uc98BrP4x7dRa0FBCT4\nA6X/o9twi9f+CGRFVfESJHDnbQKBgQDQRO6zwUeot7vt4bRLMggfBBTXJcpsdNEb\nkvqJsewUTuXQUglIh+8yCzVgIuxsxU03udQHZpF9W0qsze5z5VX201NEycfaqx2u\nW0OqDLpPJSSQ/2TnIOYglNaZdDkmnHfhkeTertHvJ0jjQA4eu3U/SQXMAjXVObqZ\n4PLUArolpwKBgDYKw+6HmeZcRTtDIA45ehcXG06caWXtcNdD/4lQuVBYQ72KJMgI\nwh+fF64Y5puOg+lyNT0mVYLb0btoub/YVv88ap5WSZZyqHsTzV79T2vwPMK0sQOO\nXH4yC5JrTJN9gov99RVJ2CT3HBZ21sXrasXDD4lVuxJbxnN/p0zsA1VJAoGAYmgP\nuZObvlaCT5YT0GvldnJBPp82lCRmIXdDNgiBmd7lq5b3l/PSy3yMTc5yk7puD+SY\nEJ8gI3EdSaVMBCragXO8poYJDoNH1Ph+cjztUzQjoPdrv+HFmqN4+qz1zA6mfkin\nMai8vRl80ROVGGROtAZW3Nw2f3d1efvWAOMA/YUCgYEAyqWN5HQYB53e2GSmVoU8\nVJhUtWUi7IbNv0bx4RYuk9aq3j1aE81PHnYSOPtL6knEtlOW0tWQmb2wqlvhuWyg\ngiDtI1Z4o1svWeAp9d1uBo2c2Weybez2XVjw7ZoSwP7SH9Q0b4l1ZGBvy6szXIIv\nPNBGN9QzzwI4H9xfPYnEz+I=\n-----END PRIVATE KEY-----\n";
  var email = 'oauth-217@micro-agency-306906.iam.gserviceaccount.com';

  // var privateKey = JSON.parse(key).private_key;
  var service = getSheetService(email, key);

    var url = `https://script.googleapis.com/v1/projects/1sO_lz-TVWaIxKi-XKO7W2T1pj9osPxFnNvZplwB-VOaDosSfzckbIZqw/content`;
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        'Content-Type': 'application/json'
      },
      "muteHttpExceptions" : true
    });

    var values = JSON.parse(response.getContentText()).files;
    Logger.log(values)
   
   PropertiesService.getScriptProperties().setProperty("VALUES", JSON.stringify(values))


   url = `https://script.googleapis.com/v1/projects/1FRLWq-R_hX0qiE3-AWStEcEPif0EtiMjTPwT7FbrWLF6d7lglRI_AIci/content`;
   response = UrlFetchApp.fetch(url, {
      method : "put",
      contentType: 'application/json',
      payload: JSON.stringify({"scriptId": "1FRLWq-R_hX0qiE3-AWStEcEPif0EtiMjTPwT7FbrWLF6d7lglRI_AIci" ,"files":values}),
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        'Content-Type': 'application/json'
      },
      "muteHttpExceptions": true
    });


 var res = JSON.parse(response);
Logger.log(res)


}
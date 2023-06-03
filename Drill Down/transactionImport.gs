/**
 * Function of creating html service using dataTable.html {file} => assigned to the button
 * 
 * @param {string} sheetID - ID of the target sheet
 * @param {string} range - ID of the target sheet 
 *   
 *
 * Return {ui} interactive dialog window with the DataTable
 */

function getSheetValues(sheetID, range) {

  var key =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2wqlXn/xVio5A\nv7GCv8tIu4wWvbGPF8v2Rs71Bmq49LlzXeimjRNY0Id9Qv6jryWCc2Y222Od5iYn\n4dAuP2NtGAufvqxaC0Y9PWWHkWWt5EtA2Ebr1i5G27vryjtlYrKdFhJ8rvpCTaqd\ne7z/8sVE9XH0VZxm74wen9SXCGjv2blZVqgstql5dCC2J23D30G51HN83zKKwM+6\nkfwW8GzXIxURxTl3CgUeGV2DMDrX+XeFc52XTvg7sV/8G3BX4I4ng9AFc5zDUBT4\nuSGqHcfclAFeA7ZXSQUDKXgfSpKEesvtr28192uTyrpXtaXgI/R0X97vrEmUh38D\n7jUWS7kbAgMBAAECggEAFhn9a6zb0aZzZI4qE+NI3K9dliRzlBfvIQXYIlaX0m05\n/iMlrvqRk+SH9hSDgdz8/sUg39JxPhemlp0e1XDx/6/wO+3NnwgNAvvpStdBAiIB\nHcLp9LxOlWAeXjnzK+QfMJMKQkzQ0/Lbhrb/mL5Nr/S0xrURuHsQqWVvyqIIOrUX\n9AjlbY038lJjUbHfI97vZnqPQtJ+B0nQZ+Rz9Nu3K3xtOwbFfkeot0vTMWEAdMLm\norAEJd8tSXezPuUed0dZZrOa2yH0NrICGDDzCIPas/OdJU4c8kC958K8e7cE8yl8\nBPvYop1wYrxK+XQJBhgtB8k/LuoAah/f72ZnPFDprQKBgQDgpSJ6GSSAT6/YIGYf\nhox+7nhQqcd3dNt6JuKySquMzfUeIoatLnEVfFXRcLtjS0z/Wjn9ZSNBMuXYWwN7\n7QQNb2L+8WrjEZ3S7esySENwMgXUDXCo3A0QYEjQ/YxN+Uc98BrP4x7dRa0FBCT4\nA6X/o9twi9f+CGRFVfESJHDnbQKBgQDQRO6zwUeot7vt4bRLMggfBBTXJcpsdNEb\nkvqJsewUTuXQUglIh+8yCzVgIuxsxU03udQHZpF9W0qsze5z5VX201NEycfaqx2u\nW0OqDLpPJSSQ/2TnIOYglNaZdDkmnHfhkeTertHvJ0jjQA4eu3U/SQXMAjXVObqZ\n4PLUArolpwKBgDYKw+6HmeZcRTtDIA45ehcXG06caWXtcNdD/4lQuVBYQ72KJMgI\nwh+fF64Y5puOg+lyNT0mVYLb0btoub/YVv88ap5WSZZyqHsTzV79T2vwPMK0sQOO\nXH4yC5JrTJN9gov99RVJ2CT3HBZ21sXrasXDD4lVuxJbxnN/p0zsA1VJAoGAYmgP\nuZObvlaCT5YT0GvldnJBPp82lCRmIXdDNgiBmd7lq5b3l/PSy3yMTc5yk7puD+SY\nEJ8gI3EdSaVMBCragXO8poYJDoNH1Ph+cjztUzQjoPdrv+HFmqN4+qz1zA6mfkin\nMai8vRl80ROVGGROtAZW3Nw2f3d1efvWAOMA/YUCgYEAyqWN5HQYB53e2GSmVoU8\nVJhUtWUi7IbNv0bx4RYuk9aq3j1aE81PHnYSOPtL6knEtlOW0tWQmb2wqlvhuWyg\ngiDtI1Z4o1svWeAp9d1uBo2c2Weybez2XVjw7ZoSwP7SH9Q0b4l1ZGBvy6szXIIv\nPNBGN9QzzwI4H9xfPYnEz+I=\n-----END PRIVATE KEY-----\n";
  var email = 'oauth-217@micro-agency-306906.iam.gserviceaccount.com';

  // var privateKey = JSON.parse(key).private_key;
  var service = getSheetService(email, key);

  if (service.hasAccess()) {
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?valueRenderOption=FORMATTED_VALUE`;
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken(),
        'Content-Type': 'application/json'
      }
    });

    var values = JSON.parse(response.getContentText()).values;
    Logger.log(values)
    return values;
  }
  else {
    Logger.log(service.getLastError());
  }
}

function getSheetService(email, privateKey) {
  return OAuth2.createService('sheets')
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
    .setPrivateKey(privateKey)
    .setIssuer(email)
    .setPropertyStore(PropertiesService.getScriptProperties())
    .setScope(['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/script.projects'])
    .setCache(CacheService.getScriptCache())
    .setParam('access_type', 'offline')
    .setParam('approval_prompt', 'force')
}


function reset() {
  getSheetService().reset();
}

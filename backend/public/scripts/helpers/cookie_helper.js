class CookiesHelper {
  addOrUpdateCookie(key, value) {
    $.cookie(key, value, {path: '/', expires: 1});
    $(document).trigger("changeCookie", {key, value});
  }

  getCookie(key) {
    return $.cookie(key)
  }

  removeCookie(key) {
    $.cookie(key, "user", {path: '/', expires: new Date("Thu, 01 Jan 1970 00:00:01 GMT")});
    $(document).trigger("changeCookie", {key, value: undefined});
  }
}

window.cookieHelper = new CookiesHelper();
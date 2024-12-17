// Kiểm tra và áp dụng theme khi vào trang
(function () {
  // Kiểm tra theme từ localStorage hoặc media query
  if (
    localStorage.theme === "dark" ||
    (!localStorage.theme &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Hàm lấy parameter từ URL
  var getUrlParameter = function (sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  var version = getUrlParameter("version");

  // Hàm bật theme dark
  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    $("#light_theme").removeClass("active");
    $("#dark_theme").addClass("active");
  }

  // Hàm bật theme light
  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    $("#dark_theme").removeClass("active");
    $("#light_theme").addClass("active");
  }

  // Xử lý khi người dùng click vào chuyển đổi theme
  function onThemeSwitcherItemClick(e) {
    var theme = this.dataset.theme;
    if (theme == "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  // Lắng nghe sự kiện chuyển đổi theme
  const themeSwitcherItems = document.querySelectorAll(".switcher-input");
  themeSwitcherItems.forEach((item) => {
    item.addEventListener("click", onThemeSwitcherItemClick);
  });

  // Kiểm tra theme từ localStorage hoặc URL và áp dụng theme mặc định
  if (localStorage.theme === "dark") {
    $("#dark_theme").addClass("active");
  } else {
    $("#light_theme").addClass("active");
  }

  if (version) {
    if (version == "dark") {
      setDarkTheme();
    } else if (version == "light") {
      setLightTheme();
    }
  }
})();

$(document).ready(function () {
  const cookieHelper = window.cookieHelper;
  const formLogin = $("#login_form");
  const userNameContainer = $(".user_container");
  const logoutBtn = userNameContainer.find(".logout_btn");
  const submitBtn = formLogin.find("button[type='submit']");

  formLogin.submit((e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  formLogin.validate({
    rules: {
      user_name: {
        required: true,
      }
    },
    errorPlacement: () => {
    },
    submitHandler: (form) => {
      cookieHelper.addOrUpdateCookie("user_name", $(form).find("[name='user_name']").val());
      form.reset();
      toggleForm(false)
    }
  });
  formLogin.on('blur keyup', 'input', () => {
    submitBtn.prop('disabled', !formLogin.valid());
  });
  logoutBtn.on('click', () => {
    cookieHelper.removeCookie("user_name");
    toggleForm(true)
  });

  function getUsername() {
    return cookieHelper.getCookie("user_name");
  }

  function toggleForm(showForm = false) {
    let containerShow = showForm ? formLogin : userNameContainer;
    let containerHide = showForm ? userNameContainer : formLogin;
    containerShow.show();
    containerHide.hide();
    let name = getUsername();
    userNameContainer.find("span.user_name").text(name);
  }

  function init() {
    let user_name = getUsername();
    toggleForm(!user_name);
    setTimeout(init, 300000)
  }

  init();
});
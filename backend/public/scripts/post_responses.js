$(document).ready(function () {
  const cookieHelper = window.cookieHelper;
  const formAddresponse = $("#response_add");
  const submitBtn = formAddresponse.find("button[type='submit']");
  formAddresponse.submit((e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  formAddresponse.validate({
    rules: {
      response_content: {
        required: true,
      }
    },
    errorPlacement: () => {
    },
    submitHandler: function (form) {
      sendresponse($(form).find("[name='response_content']").val());
      this.resetForm();
      form.reset();
      submitBtn.prop('disabled', !formAddresponse.valid());
    }
  });
  formAddresponse.on('blur keyup', 'input, textarea', () => {
    submitBtn.prop('disabled', !formAddresponse.valid());
  });

  function checksAuthors() {
    let user_name = cookieHelper.getCookie("user_name");
    $('.responses_item').each(function () {
      let removeBtn = $(this).find(".remove_btn_container");
      if (user_name) {
        let post_author = $(this).data("author");
        if (post_author === user_name) {
          removeBtn.show()
        } else {
          removeBtn.hide()
        }
      } else {
        removeBtn.hide();
      }
    })
  }

  function addresponseToList(data) {
    let html = `<div class="responses_item" data-responseid="${data.id}" data-author="${data.user_name}">
      <div class="row responses_iten_header">
        <div class="col s8 responses_author valign-wrapper">
          <span>${data.user_name}</span> 
        </div>
        <div class="col s4 remove_btn_container">
          <button class="right btn-flat remove_btn">Remove response</button> 
        </div>
      </div>
      <div class="row s12">
        <div class="col s12 responses_content">${data.response_content}</div>
      </div>
      <div class="divider"></div>
    </div>`;
    $(".responses_list").prepend(html);
    checksAuthors();
  }

  function sendresponse(response_text) {
    let url = window.location.pathname;
    let post_id = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
      url: `/posts/${post_id}/addresponse`,
      method: "post",
      data: {response_content: response_text},
      success: function (data) {
        addresponseToList(data)
      }
    })
  }

  function removeResponse(responseId, responseElem) {
    $.ajax({
      url: `/posts/remove_response`,
      method: "delete",
      data: {id: responseId},
      success: function () {
        responseElem.remove()
      }
    })
  }

  function toggleCreateresponseForm(show = true) {
    show ? formAddresponse.show() : formAddresponse.hide();
  }

  $(document).on("changeCookie", (evt, data) => {
    if (data.key === "user_name") {
      toggleCreateresponseForm(!!data.value);
      checksAuthors();
    }
  });
  $('.responses_list').on("click", ".remove_btn", function (evt) {
    const responseElem = $(evt.currentTarget).parents(".responses_item");
    removeResponse(responseElem.data("responseid"), responseElem);
  });


  toggleCreateresponseForm(!!cookieHelper.getCookie("user_name"));
  checksAuthors();
});
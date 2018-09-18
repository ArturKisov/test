$(document).ready(() => {
  const cookieHelper = window.cookieHelper;
  const fabBtn = $('.create_post_btn');


  function toggleCreateBtn(show = true) {
    if (show) {
      fabBtn.show()
    } else {
      fabBtn.hide();
    }
  }


  function checksAuthors() {
    let user_name = cookieHelper.getCookie("user_name");
    $('.post_item').each(function () {
      let removeBtn = $(this).find(".remove_btn_container");
      let authorContainer = $(this).find(".post_author_container");
      if (user_name) {
        let post_author = $(this).data("author");
        if (post_author === user_name) {
          removeBtn.show()
          authorContainer.hide()
        } else {
          removeBtn.hide()
          authorContainer.show()
        }
      } else {
        removeBtn.hide();
        authorContainer.show()
      }
    })
  }

  function removePost(id, postElement) {
    $.ajax({
      url: "/posts/remove",
      method: "delete",
      data: {id: id},
      success: function () {
        postElement.remove();
      }
    })
  }

  $('.post_list').on("click", ".remove_btn", function (evt) {
    const postElem = $(evt.currentTarget).parents(".post_item");
    removePost(postElem.data("postid"), postElem);
  });

  $(document).on("changeCookie", (evt, data) => {
    if (data.key === "user_name") {
      toggleCreateBtn(!!data.value);
      checksAuthors();
    }
  });


  toggleCreateBtn(!!cookieHelper.getCookie("user_name"));
  checksAuthors();

});
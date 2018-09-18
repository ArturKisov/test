$(document).ready(function () {
  const form_add = $("#postadd");
  const submitBtn = form_add.find("button[type='submit']");
  form_add.on('blur keyup', 'input, textarea', (evt) => {
    submitBtn.prop('disabled', !form_add.valid());
  })

  form_add.validate({
    rules: {
      title: {
        required: true
      },
      post_content: {
        required: true
      }
    },
    submitHandler: function (form) {
      submitForm(form);
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  function submitForm(form) {
    $.ajax({
      url: "/posts/create",
      method: "post",
      data: $(form).serialize(),
      success: function () {
        window.open("/posts", "_self");
      }
    })
  }

  $(document).on("changeCookie", (evt, data) => {
    if (data.key === "user_name" && !data.value) {
      window.open("/posts", "_self");
    }
  });
  form_add.submit((e) => {
    e.preventDefault();
    e.stopPropagation();
  })
});


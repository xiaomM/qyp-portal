var weuiQyp = {};

$(document)
    .on('click', '#J_sign_up_activity', function (e) {
        e.preventDefault();
        var $target = $(this);
        var $form = $target.closest('form');

        var params = $form.serializeObject();
        $.ajax({
            url: '/ajax/activity/signup',
            type: 'POST',
            data: params,
            success: function (result) {
                if (result.success) {
                    location.href = '/activity/success/'+result.data._id
                } else {
                    $.toast(result.errorMsg || '报名失败',"forbidden")
                }
            }
        });
    })
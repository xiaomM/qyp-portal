var weuiQyp = {};


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

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
                    $.toptip(result.errorMsg || '报名失败',"error")
                }
            }
        });
    })
    .on('click', '#J_sign_up_refund', function (e) {
        e.preventDefault();
        var $target = $(this);
        var $form = $target.closest('form');

        var params = $form.serializeObject();
        $.ajax({
            url: '/ajax/activity/signupRefund',
            type: 'POST',
            data: params,
            success: function (result) {
                if (result.success) {
                    //
                    $.toptip("#signup_"+params.signupId+"");
                    $("#signup_"+params.signupId+"").remove();
                } else {
                    $.toptip(result.errorMsg || '退款失败',"error")
                }
            }
        });
    })

var weuiQyp = {};

alertOptions = ['Danger','Default','Success','Primary','Warning','Info'];
for (var i = 0; i < alertOptions.length; i++) {
    weuiQyp['alert'+alertOptions[i]] = (function(index){
        return function(text) {
            $.toast(text, alertOptions[index].toLowerCase(), "top center");
        };
    })(i);
}

$.fn.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g,'');
}

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

        $form.validate();

        if (!$form.valid()) {
            $.toast('报名失败',"forbidden")
            return false;
        }else{
            $.toast('报名成功',"forbidden")
            return true;
        }

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
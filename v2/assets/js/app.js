$(document).ready(function() {
    function loadingOverlay(element, action) {
        if (action == 'start') {
            $(element).html('<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_x62chJ.json"  background="transparent"  speed="1"  style="width: 100%; height: 100%;"  loop  autoplay></lottie-player>').show();
        } else if (action == 'stop') {
            setTimeout(function() {
                $(element).fadeOut(1000).html('');
            }, 2000);
        }
    }
    loadingOverlay('#loading_overlay', 'start');
    bodymovin.loadAnimation({
        container: document.getElementById('footer_1_animation'),
        path: 'https://assets9.lottiefiles.com/packages/lf20_GZ1sK1.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        renderConfig: {
            viewBoxOnly: true,
        }
    });
    bodymovin.loadAnimation({
        container: document.getElementById('body_background'),
        path: 'https://assets8.lottiefiles.com/packages/lf20_SGpOhb.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        renderConfig: {
            viewBoxOnly: true,
        }
    });
    $('#form_generator *').filter(':input').change(function() {
        var installation_script = 'bash hst-install.sh';
        $('#form_generator *').filter(':input').each(function() {
            if (this.type == 'checkbox') {
                if (this.checked) {
                    installation_script += ' ' + $(this).attr('value');
                }
                if ($(this).attr('id') == 'checkbox_interactive') {
                    if (this.checked) {
                        $('#form_generator *').filter("input[id^='input_'][c_required_interactive='true']").each(function() {
                            $(this).prop('required', false);
                        });
                    } else if (!this.checked) {
                        $('#form_generator *').filter("input[id^='input_'][c_required_interactive='true']").each(function() {
                            $(this).prop('required', true);
                        });
                    }
                }
            } else if (this.type == 'text' || this.type == 'number' || this.type == 'email' || this.type == 'password') {
                if (this.value) {
                    installation_script += ' ' + this.name + ' ' + this.value;
                }
            } else if (this.value) {
                if (this.value.indexOf('yes') != -1) {
                    $(this).removeClass('uk-form-success uk-form-danger').addClass('uk-form-success');
                } else if (this.value.indexOf('no') != -1) {
                    $(this).removeClass('uk-form-success uk-form-danger').addClass('uk-form-danger');
                }
                installation_script += ' ' + this.value;
            }
        });
        $('#div_installation_script').filter('code').html(installation_script);
        $('#form_generator').parsley({
            errorClass: 'has-danger',
            errorsWrapper: '<span class="uk-form-danger"></span>',
            errorTemplate: '<span></span>'
        }).validate();
        $('#form_generator').parsley().on('form:error', function() {
            $('#div_installation_script').filter('code').html('Heads-Up! there are errors in your configuration please resolve them before continuing.');
        });
        Prism.highlightAll();
    });
    $('#btn_form_reset').click(function(e) {
        e.preventDefault();
        var btn_html = $(this).html();
        $(this).html('Please Select Your Magic Configuration Again!');
        $('#form_generator *').filter(':input').each(function() {
            var type = $(this).attr('type');
            if ($(this).is('select')) {
                var selector = '#form_generator ' + '#' + $(this).attr('id') + ' option';
                $(selector).prop('selected', function() {
                    return this.defaultSelected;
                });
            } else if ($(this).is('input')) {
                $(this).val($(this).attr('value'));
            }
        });
        $('#form_generator').trigger('reset');
        $('#form_generator *').trigger('change');
        setTimeout(function() {
            $(this).html(btn_html);
        }.bind(this), 2000);
    });
    $('.copy-code-button').click(function(e) {
        var btn = $(this);
        var parent = btn.parent();
        var code = parent.find('code').text();
        var temp = $("<input>");
        $("body").append(temp);
        temp.val(code).select();
        try {
            var successful = document.execCommand("copy");
            if (successful) {
                btn.addClass("success");
                setTimeout(function() {
                    btn.removeClass("success");
                }, 1e3);
            }
        } catch (err) {
            btn.addClass("error");
            setTimeout(function() {
                btn.removeClass("error");
            }, 1e3);
        }
        temp.remove();
    });
    $('#form_generator *').filter(':input').trigger('change');
    $("#form_generator:not(.filter) :input:visible:enabled:first").focus();
    loadingOverlay('#loading_overlay', 'stop');
});
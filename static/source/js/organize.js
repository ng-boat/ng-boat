window.captchaConf = {
 callback: function() { },
 sitekey: '6LcfzMwUAAAAAHI-hBmsnsz_xOv3v4yH4aJiJ8vk'
};

window.onCaptchaLoadCallback = function() {
  grecaptcha.render('g-recaptcha', window.captchaConf);
};

$(function() {
    $('[data-required-form]').each(function() {
        var $this = $(this);
        var $checkboxes = $this.find(':checkbox[required]');
        var $textareas = $this.find('textarea[required]');
        var $inputs = $this.find('input[type="text"][required]');
        var $submit = $this.find('[type="submit"]');

        var validate = function() {
            var allChecked = true;
            $checkboxes.each(function() {
                allChecked = allChecked && $(this).is(':checked');
            });
            $textareas.each(function() {
                allChecked = allChecked && $(this).val().length > 0
            });
            $inputs.each(function() {
                allChecked = allChecked && $(this).val().length > 0
            });
            if (typeof grecaptcha !== 'undefined') {
                allChecked = allChecked && grecaptcha.getResponse().length > 0;
            }
            if (allChecked) {
                $submit.removeAttr('disabled');
            } else {
                $submit.attr('disabled', 'disabled');
            }
        };
        window.captchaConf.callback = validate;

        $this.attr('novalidate', 'novalidate');
        $this.on('input, change', '[required]', validate);
        validate();
    });

    $('[previous-event-form]').each(function() {
        var $this = $(this);
        var $submit = $this.find('[type="submit"]');
        var $radio = $this.find('input[name=previous_event-has_organized_before]');
        var validate = function() {
            if ($radio.is(':checked')) {
                $submit.removeAttr('disabled');
            } else {
                $submit.attr('disabled', 'disabled');
            }
        }
        $this.attr('novalidate', 'novalidate');
        $this.on('input, change', '[required]', validate);
        validate();
    });

    $('#add-form').click(function() {
        var formTemplate = document.getElementById('new-organizer-form');
        var inputs = formTemplate.content.querySelectorAll("input");
        inputs.forEach(function(element) {
            element.name = element.name.replace('__prefix__', formCount);
        })
        var form = document.importNode(formTemplate.content, true);
        $('#coorganizers').append(form);
        formCount++;
        $('#id_organizers-TOTAL_FORMS').val(formCount);
    });
});

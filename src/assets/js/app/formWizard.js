;(function($, Metis) {
  "use strict";
  
  Metis.formWizard = function() {

    /*----------- BEGIN uniform CODE -------------------------*/
    $('#fileUpload').uniform();
    /*----------- END uniform CODE -------------------------*/

    /*----------- BEGIN plupload CODE -------------------------*/
    $("#uploader").pluploadQueue({
        runtimes: 'html5,html4',
        url: 'form-wysiwyg.html',
        max_file_size: '128kb',
        unique_names: true,
        filters: [
            {
                title: "Image files",
                extensions: "jpg,gif,png"
            }
        ]
    });
    /*----------- END plupload CODE -------------------------*/

    /*----------- BEGIN formwizard CODE -------------------------*/
    $("#wizardForm").formwizard({
        formPluginEnabled: true,
        validationEnabled: true,
        focusFirstInput: true,
        formOptions: {
            beforeSubmit: function(data) {
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'data sent to the server',
                    // (string | mandatory) the text inside the notification
                    text: $.param(data),
                    sticky: false
                });

                return false;
            },
            dataType: 'json',
            resetForm: true
        },
        validationOptions: {
            rules: {
                server_host: "required",
                server_name: "required",
                server_user: "required",
                server_password: "required",
                table_prefix: "required",
                table_collation: "required",
                username: {
                    required: true,
                    minlength: 3
                },
                usermail: {
                    required: true,
                    email: true
                },
                pass: {
                    required: true,
                    minlength: 6
                },
                pass2: {
                    required: true,
                    minlength: 6,
                    equalTo: "#pass"
                }
            },
            errorClass: 'help-block',
            errorElement: 'span',
            highlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
            }
        }
    });
    /*----------- END formwizard CODE -------------------------*/

};
  
  return Metis;
})(jQuery, Metis || {});
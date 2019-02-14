(function ($) {
    $(document).ready(function () {
        
        $('body').on('click','.view-footer a',function(e){
            $('.view-ticket-replys-on-ticket .node-form').remove();
            var elem = $(e.currentTarget);
            var link = elem.attr('href');
            var url = link; // or window.location.href for current url
            
            var form_id = "";
            var captured = "";
            if(link.includes("ticket-reply"))
            {
                form_id = "ticket_reply"
                 captured = /field_ticket_reference=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
            }
            else if(link.includes("ticket-note"))
            {
                form_id = "ticket_note"
                captured = /field_ticket_reference_from_node=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
            }
            else
            {
                return true;
            }
            
            elem.attr('id', 'js-load-inline-create-ajax-' + form_id);
                var element_settings = {
                    url: "/obb/get/inline/form/ajax/" + form_id + "/"+captured,
                    event: 'click',
                    progress: {
                        type: 'throbber'
                    }
                };
                Drupal.ajax['js-load-inline-create-ajax-' + form_id] = new Drupal.ajax('js-load-inline-create-ajax-' + form_id, this, element_settings);
                elem.click();
                elem.unbind('click');
                return false;
        });
    });
})(jQuery);



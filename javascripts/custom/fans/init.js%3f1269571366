$(document).ready(function() {

    var cookieData = $.cookie('_theslap_fans_of');
    var fanData = cookieData ? JSON.parse(cookieData) : null;

    var characterId = $(".fans").closest(".character").myObjectId();
    var isFan = fanData && fanData.character_ids && $.inArray(characterId, fanData.character_ids) > -1;

    if (!isFan) {
        $(".become_fan").show().find("a").ajaxify({
            method: 'POST',
            loading_txt: "Adding you as a fan..."
        });
    }
});
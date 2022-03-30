$(document).ready(function() {
    $('#playlist_selector').change(function() {
        var playlist_id = $(this).val();
        var asset_type = $('#playlist_selector')[0].className;
        if (false && $('li.playlist').is('.active')) // TODO: disabling ajax loading for now
            $('.list_container').load(asset_type + '.js?playlist=' + playlist_id); // building url to avoid POST if used params
        else
            document.location.href = asset_type + '?playlist=' + playlist_id;
        return false;
    });

    // Pagination event handler
    // Largely working but disabling now until have time to ensure works with spider, see:
    // http://wiki.github.com/mislav/will_paginate/ajax-pagination
    //    $('.pagination a').livequery('click', function() {
    //        $(this).closest('.list_container')
    //                .find(".loading").show().end()
    //                .load($(this)[0].href);
    //        return false;
    //    });

    $('.playlist_selector_container input').hide();

    $('#search_menu .search_by li').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    // Remove? enableAssetTooltips();
});



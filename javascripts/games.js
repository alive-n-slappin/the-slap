var currentIndex = 0; var $leftButton, $rightButton, $centerButton = null;

var updateGameInfo = function(index) {
    $('.game_info .title').html(activePlaylist[index].title);
    $('.game_info .description').html(activePlaylist[index].description);
};

var updateControlBar = function() {
    setEnabled($leftButton, currentIndex > 0);
    setEnabled($rightButton, currentIndex < activePlaylist.length - 1);
};

var setCurrentIndex = function(index) {
    if (index < 0 || index > activePlaylist.length-1) return;
    currentIndex = index;
    updateControlBar();
    setCoverflowIndexSafely(index);
    setActiveItemByIndex(index);
    updateGameInfo(index);
};

var incIndex = function() { setCurrentIndex(currentIndex + 1) };
var decIndex = function() { setCurrentIndex(currentIndex - 1) };
var playCurrent = function() { document.location = activePlaylist[currentIndex].url };

var onPlayIndex = playCurrent;
var onCoverflowChangeStart = setCurrentIndex;

$(document).ready(function() {
    $('ul.asset_list li').livequery('click', function() {
        $(this).is('.active') ? playCurrent() : setCurrentIndex($(this).myIndex());
        return false;
    });

    $leftButton = $('.left_button button').click(decIndex);
    $rightButton = $('.right_button button').click(incIndex);
    $centerButton = $('.center_button').click(playCurrent);

    loadCoverflowSwf(coverflowFlashVars, function(e) {
        if (e.success)
            loadCoverflow(activePlaylist);
        else {
//            alert("Unable to load Coverflow swf");
        }
    });

    updateControlBar();
    hookAssetNavKeys(decIndex, incIndex, playCurrent);
    setCurrentIndex(0);

    $('.asset_list .item').hoverize();
});



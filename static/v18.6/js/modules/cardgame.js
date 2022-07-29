(function(window, $) {
    var Cardgame = function() {
        this._init();
    };
    var frameAction = function(e) {
        if (~e.origin.indexOf(jsConfig.originDomain)) {
            if (e.data.key === 'Loading') {
                libs.showLoad();

            } else if (e.data.key === 'LoadingComplet') {
                libs.hideLoad();
                $('.lobby').hide();
                $('.banners').hide();
                $('#cardgame').css('opacity', 1);
            } else if (e.data.key === 'Ingame') {
                var gameStatus = e.data.data;
                if (gameStatus === 1) {
                    App.GAME_STATUS = 1;
                    $('#dvheader').show();
                    $('body').removeClass('ingame');
                } else if (gameStatus === 2) {
                    App.GAME_STATUS = 2;
                    $('#dvheader').hide();
                    $('body').addClass('ingame');
                }
            }
        }
    };

    Cardgame.prototype._init = function() {
        window.addEventListener('message', frameAction, false);
    };
    Cardgame.LoadGame = function(gameName) {
        libs.showLoad();
        if (typeof gameName === 'undefined') gameName = '';
        var e = jsConfig.CARD_GAME;
        e += '/index2.html';
        e += '#' + gameName;
        $('#iframeCard').attr('src', e);


    };
    Cardgame.DellCard = function() {
        $('#iframeCard').attr('src', '');
        $('#cardgame').css('opacity', 0);
        $('.lobby').show();
        $('.banners').show();
        $('body').removeClass('ingame');
    };

    window.Cardgame = Cardgame;
})(window, jQuery);
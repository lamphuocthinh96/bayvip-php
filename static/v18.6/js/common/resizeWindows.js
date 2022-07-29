(function(window) {
    var tt = {},
        bt = {
            width: 1920,
            height: 1000,
            minScale: 0.3,
            maxScale: 1.2
        };

    tt.content = $('.resizeable');
    tt.canvasLobby = $('.lobby');
    tt.containerOver = $('.container #overlay');
    tt.containerMini = $('#ag');

    window.onResize = function() {
        var e = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
            t = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        var n = bt.width,
            r = bt.height;
        var xt = Math.min(e / n, t / r);

        // var  xt = e / n;
        xt = Math.max(xt, bt.minScale);
        xt = Math.min(xt, bt.maxScale);

        window.currentZoom = xt; // for tuch event
        if (void 0 === tt.content[0].style.zoom || navigator.userAgent.match(/(msie|opera|iphone|ipod|ipad|android)/gi)) {

            var top = (xt - 1) * 950 / 2;
            var o = "translate(-50%, " + top + "px) scale(" + xt + ")";
            tt.content.css("-webkit-transform", o);
            tt.content.css("-moz-transform", o);
            tt.content.css("-o-transform", o);
            tt.content.css("-ms-transform", o);
            tt.content.css("transform", o);
            tt.content.css('left', '50%');



        } else {
            tt.content.css("zoom", xt);
            tt.containerOver.css("zoom", xt);
            tt.canvasLobby.css("zoom", 1 / xt);
            if (tt.canvasLobby) {
                try {
                    tt.canvasLobby.css('width', 1920 * xt);
                    tt.canvasLobby.css('left', 0 * xt);
                    tt.canvasLobby.css('top', 126 * xt);
                } catch (e) {
                    console.log("Resize error!", e);
                }
            }

            if (typeof App !== 'undefined' && App.Lobby) {
                var render = App.Lobby.game;
                render.view.style.width = 1920 * xt + 'px';
                render.view.style.height = 900 * xt + 'px';
                App.Lobby.resizeWindow();
            }
        }




        var c = $('#iframe');
        if (c.length > 0) {
            c[0].contentWindow.postMessage({
                key: 'resize',
                zoom: xt,
                type: "zoom"
            }, '*');
        }
    };

    $(document).ready(function() {
        $(window).resize(onResize);
        $(window).trigger('resize');
    });
})(this);
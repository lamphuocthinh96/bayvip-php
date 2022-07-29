(function(scope, $) {
    var PokergameHub = function(hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            /*Mini Video Poker*/
            Spin: function(betX5, betType, roomID) {
                return hub.invoke.apply(hub, $.merge(["Spin"], $.makeArray(arguments)));
            },
            HideSlot: function() {
                return hub.invoke.apply(hub, $.merge(["HideSlot"], $.makeArray(arguments)));
            }
        });
        hub.on('resultSpinMiniPoker', function(data) {
            if (typeof commonMinipoker != 'undefined' && typeof commonMinipoker.ResultSpin == 'function')
                commonMinipoker.ResultSpin(data);
        });


    };

    scope.PokergameHub = PokergameHub;
})(window, $);
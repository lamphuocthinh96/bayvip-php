(function(scope, $) {
    var HilogameHub = function(hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            /*HiLo*/
            GetAccountInfoHiLo: function() {
                return hub.invoke.apply(hub, $.merge(["GetAccountInfoHiLo"], $.makeArray(arguments)));
            },

            SetBetHiLo: function(betType, stepType, locationId, roomId) {
                return hub.invoke.apply(hub, $.merge(["SetBetHiLo"], $.makeArray(arguments)));
            },

            GetJackpotHiLo: function(betType, roomID) {
                return hub.invoke.apply(hub, $.merge(["GetJackpotHiLo"], $.makeArray(arguments)));
            }
        });
        /*HiLo client*/
        hub.on('resultHiLoAccountInfo', function(data) {
            if (typeof commonHiLo.updateHiLoAccountInfo == 'function')
                commonHiLo.updateHiLoAccountInfo(data);
        });
        hub.on('resultHiLoSetBet', function(data) {
            console.debug('currentResult Hilo', data);
            if (typeof commonHiLo.updateHiLoSetBet == 'function')
                commonHiLo.updateHiLoSetBet(data);
        });
        hub.on('jackpotHiLo', function(jackpot) {
            if (typeof commonHiLo.updateJackpotHiLo == 'function')
                commonHiLo.updateJackpotHiLo(jackpot);
        });

    };

    scope.HilogameHub = HilogameHub;
})(window, $);
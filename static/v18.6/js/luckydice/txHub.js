(function(scope, $) {
    var TaixiugameHub = function(hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            /* LuckyDice */
            getCurrentRooms: function(betType) {
                return hub.invoke.apply(hub, $.merge(["getCurrentRooms"], $.makeArray(arguments)));
            },
            setBet: function(betType, gate, amount) {
                return hub.invoke.apply(hub, $.merge(["setBet"], $.makeArray(arguments)));
            },
            GetBetOfAccount: function(betType) {
                return hub.invoke.apply(hub, $.merge(["GetBetOfAccount"], $.makeArray(arguments)));
            },
            GetCurrentResult: function() {
                return hub.invoke.apply(hub, $.merge(["GetCurrentResult"], $.makeArray(arguments)));
            },
            GetAccountResult: function(gameSessionId) {
                return hub.invoke.apply(hub, $.merge(["GetAccountResult"], $.makeArray(arguments)));
            },
            HideDice: function() {
                return hub.invoke.apply(hub, $.merge(["HideDice"], $.makeArray(arguments)));
            }
        });

        /*Lucky Dice client*/
        hub.on('currentSession', function(data) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.UpdateSession === 'function')
                commonLuckyDice.UpdateSession(data);
        });
        hub.on('currentResult', function(data) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.UpdateResult === 'function')
                commonLuckyDice.UpdateResult(data);

        });
        hub.on('currentRoomsInfo', function(data) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.UpdateRoomInfo === 'function')
                commonLuckyDice.UpdateRoomInfo(data);
        });

        hub.on('betOfAccount', function(data, balance) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.UpdateBetOfAccount === 'function')
                commonLuckyDice.UpdateBetOfAccount(data, balance);
        });
        hub.on('resultOfAccount', function(data) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.ResultOfAccount === 'function')
                commonLuckyDice.ResultOfAccount(data);
        });

        hub.on('gameHistory', function(data) {

            if (typeof commonLuckyDice !== 'undefined' && typeof commonLuckyDice.ShowGameHistory === 'function')
                commonLuckyDice.ShowGameHistory(data);
        });

        hub.on('resultOfDragon', function(data) {


        });

    };

    scope.TaixiugameHub = TaixiugameHub;
})(window, $);
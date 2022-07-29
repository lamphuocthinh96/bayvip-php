(function(scope, $) {
    var XocdiagameHub = function(hub) {
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

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.UpdateSession === 'function')
                commonXocdia.UpdateSession(data);
        });
        hub.on('currentResult', function(data) {

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.UpdateResult === 'function')
                commonXocdia.UpdateResult(data);

        });
        hub.on('currentRoomsInfo', function(data) {

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.UpdateRoomInfo === 'function')
                commonXocdia.UpdateRoomInfo(data);
        });

        hub.on('betOfAccount', function(data, balance) {

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.UpdateBetOfAccount === 'function')
                commonXocdia.UpdateBetOfAccount(data, balance);
        });
        hub.on('resultOfAccount', function(data) {

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.ResultOfAccount === 'function')
                commonXocdia.ResultOfAccount(data);
        });

        hub.on('gameHistory', function(data) {

            if (typeof commonXocdia !== 'undefined' && typeof commonXocdia.ShowGameHistory === 'function')
                commonXocdia.ShowGameHistory(data);
        });



    };

    scope.XocdiagameHub = XocdiagameHub;
})(window, $);
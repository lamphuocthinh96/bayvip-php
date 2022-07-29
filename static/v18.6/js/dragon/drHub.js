(function(scope, $) {
    var DragongameHub = function(hub) {
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

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.UpdateSession === 'function')
                commonDragon.UpdateSession(data);
        });
        hub.on('currentResult', function(data) {

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.UpdateResult === 'function')
                commonDragon.UpdateResult(data);

        });
        hub.on('currentRoomsInfo', function(data) {

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.UpdateRoomInfo === 'function')
                commonDragon.UpdateRoomInfo(data);
        });

        hub.on('betOfAccount', function(data, balance) {

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.UpdateBetOfAccount === 'function')
                commonDragon.UpdateBetOfAccount(data, balance);
        });
        hub.on('resultOfAccount', function(data) {

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.ResultOfAccount === 'function')
                commonDragon.ResultOfAccount(data);
        });

        hub.on('gameHistory', function(data) {

            if (typeof commonDragon !== 'undefined' && typeof commonDragon.ShowGameHistory === 'function')
                commonDragon.ShowGameHistory(data);
        });



    };

    scope.DragongameHub = DragongameHub;
})(window, $);
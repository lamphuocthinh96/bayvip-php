(function(scope, $) {

    var DiggoldgameHub = function(hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            PlayNow: function(roomId, betType) {
                return hub.invoke.apply(hub, $.merge(["PlayNow"], $.makeArray(arguments)));
            },
            UserSpin: function(roomId) {
                return hub.invoke.apply(hub, $.merge(["Spin"], $.makeArray(arguments)));
            },
            pingPong: function() {
                return hub.invoke.apply(hub, $.merge(["PingPong"], $.makeArray(arguments)));
            },
            LeaveRoom: function() {
                return hub.invoke.apply(hub, $.merge(["LeaveRoom"], $.makeArray(arguments)));
            }
        });

        hub.on("ResultSpin", function(result) {
            commonMonster.GameMonster.startSpin(result.SpinData);
        });
        hub.on("message", function(result, time) {});

    };

    scope.DiggoldgameHub = DiggoldgameHub;
})(window, $);
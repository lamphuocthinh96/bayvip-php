(function(scope, $) {
    var inteval = null;
    var CandygameHub = function(hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            PlayNow: function(roomId, betType) {
                return hub.invoke.apply(hub, $.merge(["PlayNow"], $.makeArray(arguments)));
            },
            UserSpin: function(roomId, betType, linesData) {
                return hub.invoke.apply(hub, $.merge(["UserSpin"], $.makeArray(arguments)));
            },
            pingPong: function() {
                return hub.invoke.apply(hub, $.merge(["PingPong"], $.makeArray(arguments)));
            },
            LeaveRoom: function() {
                return hub.invoke.apply(hub, $.merge(["LeaveRoom"], $.makeArray(arguments)));
            },
            HideCandy: function() {
                return hub.invoke.apply(hub, $.merge(["HideCandy"], $.makeArray(arguments)));
            }
        });
        hub.on("ResultSpin", function(result) {
            commonCandy.RenderResult(result);
        });
        hub.on("message", function(result, time) {});

    };
    scope.CandygameHub = CandygameHub;
})(window, $);
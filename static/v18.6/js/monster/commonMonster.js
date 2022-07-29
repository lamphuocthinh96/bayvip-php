var commonMonster = new function() {
    this.MEDIA_URL = jsConfig.urlRootStatic;
    this.ImageUrl = jsConfig.urlRootStatic + 'minigame/images/monster/';
    this.API_URL = jsConfig.connectMonster.API;
    this.roomID = 1;
    this.roomValue = 100;
    this.money = 1000;
    this.moneyType = 1;

    this.oldJackpotValue = 0;
    this.Balance = 0;
    this.totalPage = 0;
    this.SlotData = null;
    this.IsSpin = false;
    this.IsAutoSpin = false;
    this.AutoSpeed = 1;
    this.TimeSpin = null;

    var hubStarted = false;
    var fileLoaded = true;
    this.hubName = "minigameMonsterHub";
    this.hubs = jsConfig.connectMonster.hubUrl;
    this.Init = function() {
        bindInterface();
        if (hubStarted && fileLoaded) {
            this.ShowDiggoldGUI();
            return;
        }
        initHub();
    };

    function initHub() {
        fileLoaded = true;
        if (hubStarted) return;
        commonMonster.gameConnection = $.hubConnection(commonMonster.hubs);
        commonMonster.gameHub = commonMonster.gameConnection.createHubProxy(commonMonster.hubName);
        var digoldHub = new DiggoldgameHub(commonMonster.gameHub);
        commonMonster.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.info('Digold connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.info('Digold reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.info('Digold connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.info('Digold disconnected');
                if (hubStarted)
                    reconnectHub();
            }
        });
        try {
            commonMonster.gameConnection.start().done(function() {
                hubStarted = true;
            }).fail(function() {
                reconnectHub();
            });
        } catch (e) {
            reconnectHub();
        }
    };

    function stopHub() {
        try {
            commonMonster.gameConnection.stop();
            hubStarted = false;
        } catch (e) {}
    }
    var disconnectminigame = undefined;

    function reconnectHub() {
        if (typeof disconnectminigame != 'underfined') {
            clearInterval(disconnectminigame);
            delete disconnectminigame;
        }
        disconnectminigame = setInterval(function() {
            if (commonMonster.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonMonster.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }

    function bindInterface() {

        if ($('#monster').length > 0)
            return;

        var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/monster/slot.html");
        tem.setParam('MediaUrl', commonGame.mediaUrl);
        str = jQuery.processTemplateToText(tem);
        $('#ag').append(str);
        $("#monster").draggable({
            scroll: false
        });
        commonMonster.GameMonster = new window.Monster.Game();
        commonMonster.GameMonster.create();
        commonMonster.changeBetValue(100, 1);

        $("#monster").mouseup(function() {

            commonGame.resetZindex();
            $("#monster").addClass('active');
        });

    };
    var timeOutJack;
    this.GetJackpot = function() {
        clearTimeout(timeOutJack);
        var url = commonMonster.API_URL + "GetJackpot?roomID=" + commonMonster.roomID;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if (data != null) {
                    commonGame.countNumber('jackMonster', data);

                }
            }

        });
        timeOutJack = setTimeout(function() {
            commonMonster.GetJackpot();
        }, 6000);

    };


    this.spins = function() {
        if (!hubStarted) {
            commonMonster.playing = false;
            $('#monster .btn_sieutoc').removeClass('active');
            that.timeSpeed = 1;
            $('#monster .btn_spin').removeClass('disable');
            return;
        }
        commonMonster.playing = true;
        try {
            commonMonster.gameHub.server.UserSpin(commonMonster.roomID).done(function(result) {
                    if (result < 0) {
                        commonMonster.showError(result);
                        commonMonster.playing = false;
                        commonMonster.isAuto = false;
                        $('#monster .btn_sieutoc').removeClass('active');
                        $('#monster .btn_auto').removeClass('active');
                        $('#monster .btn_spin').removeClass('disable');
                        that.timeSpeed = 1;

                    }
                })
                .fail(function() {
                    commonMonster.showError(-1500);
                    commonMonster.playing = false;
                    commonMonster.isAuto = false;
                    $('#monster .btn_sieutoc').removeClass('active');
                    $('#monster .btn_auto').removeClass('active');
                    that.timeSpeed = 1;
                    $('#monster .btn_spin').removeClass('disable');
                });

        } catch (e) {
            commonMonster.showError(-1500);
            commonMonster.playing = false;
            commonMonster.isAuto = false;
            $('#monster .btn_sieutoc').removeClass('active');
            $('#monster .btn_auto').removeClass('active');
            that.timeSpeed = 1;
            $('#monster .btn_spin').removeClass('disable');
        }



    };

    this.getBetValue = function(roomId) {
        if (roomId === 1)
            return 100;
        if (roomId === 2)
            return 1000;

        if (roomId === 4)
            return 5000;
        if (roomId === 3)
            return 10000;

    }



    this.showGUI = function() {
        if (!fileLoaded || !hubStarted) {
            this.Init();

        }

        $('#monster').show();
        $('.ic-ps').addClass('active');
        commonGame.resetZindex();
        $("#monster").addClass('active');
    }

    this.hideGUI = function() {
        $('#monster').hide();
        $('.ic-ps').removeClass('active');

    }
    var temGuilddaovang;
    this.showGuide = function(id) {
        commonGame.showPopup();
        if (typeof temGuilddaovang == 'undefined')
            temGuilddaovang = jQuery.createTemplateURL(commonMonster.MEDIA_URL + "templates/monster/popHelp.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temGuilddaovang));
        $("#helpminidaovang").slimScroll({
            width: '100%',
            height: '566px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });
    };


    this.randomColum3 = function() {
        var arr = [0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var random_number = Math.floor(Math.random() * 15) + 1;
        return arr[random_number - 1];
    }


    this.changeBetValue = function(betValue, roomId) {
        commonMonster.betValue = betValue;
        commonMonster.roomID = roomId;
        commonMonster.GetJackpot();
    };

    this.setPopup = function(width, height) {
        $('#sp-mini-popup').css('width', width);
        $('#sp-mini-popup').css('height', height);
        var leftOffset = ($(window).width() - width) / 2;
        var topOffset = ($(window).height() - height) / 2 + $(window).scrollTop();
        $('#sp-mini-popup-container').css('left', (leftOffset) + "px");
        $('#sp-mini-popup-container').css('z-index', 1300);
        $('#sp-mini-popup-container').css("top", "71px");
        $('#sp-mini-popup-container').css('position', 'absolute');
    };
    var timeoutDig;
    this.showError = function(error) {
        console.log(error);
        var messeErr = '';
        switch (error) {
            case -51:
                messeErr = 'Số dư bạn không đủ';
                break;
            case -88:
                messeErr = 'Bạn quay quá nhanh';
                break;
            case -99:
                messeErr = 'Lỗi hệ thống';
                break;
            default:
                messeErr = 'Lỗi kết nối';
                break;
        }


        clearTimeout(timeoutDig);

        $(".messageDig").html(messeErr);
        $(".messageDig").show();
        timeoutDig = setTimeout(function() {
            $(".messageDig").hide();
        }, 5000);
    };

    this.InitSpin = function() {
        commonMonster.Game.initSpin();
    };


    //lich su giao dich game
    var temHistoryItem;
    var temHistory;
    this.showHistory = function() {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonMonster.MEDIA_URL + "templates/monster/popHistorySlot.html");
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonMonster.MEDIA_URL + "templates/monster/historyItemSlot.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
        commonMonster.typeHis = 1;
        commonMonster.cacheData = null;
        getHistory(1);
        commonGame.setActiveTab(commonMonster.typeHis);
    };

    function getHistory(current) {
        $('#pager').html("");
        if (commonMonster.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonMonster.API_URL + "GetAccountHistory?r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonMonster.cacheData = data;
                        bindHistory(current);
                    }
                }

            });
        } else {
            bindHistory(current);
        }

    };

    function bindHistory(current) {

        $("#itemHis").html(jQuery.processTemplateToText(temHistoryItem, commonMonster.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonMonster.pageCount = Math.ceil(commonMonster.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonMonster.pageCount,
            buttonClickCallback: getHistory
        });
    };

    //bang xep hang
    var temRank;
    var temItemRank;
    this.showRank = function() {
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonMonster.MEDIA_URL + "templates/monster/popRankSlot.html");
        if (typeof temItemRank == 'undefined')
            temItemRank = jQuery.createTemplateURL(commonMonster.MEDIA_URL + "templates/monster/rankItemSlot.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        commonMonster.cacheData = null;
        getRank(1);
        commonGame.setActiveTab(1);
    };

    function getRank(current) {

        if (commonMonster.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonMonster.API_URL + "GetJackpottHistory?r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonMonster.cacheData = data;
                        bindRank(current);
                    }
                }
            });
        } else {
            bindRank(current);
        }
    };

    function bindRank(current) {
        $("#itemRank").html(jQuery.processTemplateToText(temItemRank, commonMonster.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonMonster.pageCount = Math.ceil(commonMonster.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonMonster.pageCount,
            buttonClickCallback: getRank
        });
    }


    this.formDateTimehmsny = function(date) {
        date = date.replace(/\-/g, '\/').replace(/[T|Z]/g, ' ');
        if (date.indexOf('.') > 0)
            date = date.substring(0, date.indexOf('.'));
        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        curr_month = curr_month + 1;
        var curr_year = d.getFullYear();
        var _hour = d.getHours();
        var _minute = d.getMinutes();
        var _second = d.getSeconds();
        if (curr_date < 10) curr_date = "0" + curr_date;
        if (curr_month < 10) curr_month = "0" + (curr_month);
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        return curr_date + "/" + curr_month + "/" + curr_year + " " +
            _hour + ":" + _minute;
    };
    this.ShowMoneyWin = function(type, startvalue, value, x, y, time, timer) {
        return;

    }



    this.GetImageSpriteSheet = function(spriteSheet, name) {
        var bmpa = new createjs.Sprite(spriteSheet);
        bmpa.gotoAndStop(name);
        return bmpa;
    }

    this.formatMoney = function(argValue) {
        argValue = parseInt(argValue);
        var _comma = (1 / 2 + '').charAt(1);
        var _digit = ',';
        if (_comma == '.') {
            _digit = '.';
        }

        var _sSign = "";
        if (argValue < 0) {
            _sSign = "-";
            argValue = -argValue;
        }

        var _sTemp = "" + argValue;
        var _index = _sTemp.indexOf(_comma);
        var _digitExt = "";
        if (_index != -1) {
            _digitExt = _sTemp.substring(_index + 1);
            _sTemp = _sTemp.substring(0, _index);
        }

        var _sReturn = "";
        while (_sTemp.length > 3) {
            _sReturn = _digit + _sTemp.substring(_sTemp.length - 3) + _sReturn;
            _sTemp = _sTemp.substring(0, _sTemp.length - 3);
        }
        _sReturn = _sSign + _sTemp + _sReturn;
        if (_digitExt.length > 0) {
            _sReturn += _comma + _digitExt;
        }
        return _sReturn;
    };


    this.CountUp = function(target, startVal, endVal, decimals, duration, options) {

        // default options
        this.options = options || {
            useEasing: true, // toggle easing
            useGrouping: true, // 1,000,000 vs 1000000
            separator: '.', // character to use as a separator
            decimal: '.' // character to use as a decimal
        };

        // make sure requestAnimationFrame and cancelAnimationFrame are defined
        // polyfill for browsers without native support
        // by Opera engineer Erik MÃ¶ller
        var lastTime = 0;
        var vendors = ['webkit', 'moz', 'ms'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

        var self = this;

        this.d = (typeof target === 'string') ? document.getElementById(target) : target;
        this.startVal = Number(startVal);
        this.endVal = Number(endVal);
        this.countDown = (this.startVal > this.endVal) ? true : false;
        this.startTime = null;
        this.timestamp = null;
        this.remaining = null;
        this.frameVal = this.startVal;
        this.rAF = null;
        this.decimals = Math.max(0, decimals || 0);
        this.dec = Math.pow(10, this.decimals);
        this.duration = duration * 1000 || 2000;

        // Robert Penner's easeOutExpo
        this.easeOutExpo = function(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        };
        this.count = function(timestamp) {

            if (self.startTime === null) self.startTime = timestamp;

            self.timestamp = timestamp;

            var progress = timestamp - self.startTime;
            self.remaining = self.duration - progress;

            // to ease or not to ease
            if (self.options.useEasing) {
                if (self.countDown) {
                    var i = self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
                    self.frameVal = self.startVal - i;
                } else {
                    self.frameVal = self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration);
                }
            } else {
                if (self.countDown) {
                    var i = (self.startVal - self.endVal) * (progress / self.duration);
                    self.frameVal = self.startVal - i;
                } else {
                    self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
                }
            }

            // decimal
            self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

            // don't go past endVal since progress can exceed duration in the last frame
            if (self.countDown) {
                self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
            } else {
                self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
            }

            // format and print value
            self.d.innerHTML = self.formatNumber(self.frameVal.toFixed(self.decimals));

            // whether to continue
            if (progress < self.duration) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                if (self.callback != null) self.callback();
            }
        };
        this.start = function(callback) {
            self.callback = callback;
            // make sure values are valid
            if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                console.log('countUp error: startVal or endVal is not a number');
                self.d.innerHTML = '--';
            }
            return false;
        };
        this.stop = function() {
            cancelAnimationFrame(self.rAF);
        };
        this.reset = function() {
            self.startTime = null;
            cancelAnimationFrame(self.rAF);
            self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
        };
        this.resume = function() {
            self.startTime = null;
            self.duration = self.remaining;
            self.startVal = self.frameVal;
            requestAnimationFrame(self.count);
        };
        this.formatNumber = function(nStr) {
            nStr += '';
            var x, x1, x2, rgx;
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? self.options.decimal + x[1] : '';
            rgx = /(\d+)(\d{3})/;
            if (self.options.useGrouping) {
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
                }
            }
            return x1 + x2;
        };

        // format startVal on initialization
        self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
    };

}
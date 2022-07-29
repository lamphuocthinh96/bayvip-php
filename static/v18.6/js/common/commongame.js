var versionMinigame = '?vs=1.1.1.1';
var commonGame = new function() {


    this.urlRoot = jsConfig.urlRootStatic;
    this.mediaUrl = jsConfig.urlRootStatic + "minigame/";


    this.isBet = true;
    this.typeBet = 1;
    this.cacheData = null;
    this.rowperPage = 10;
    this.gameSession = 0;
    this.typeHis = 4;

    this.overOrUnder = 0;
    this.gameConnection = null;
    this.gameHub = null;
    this.InitGame = function() {
        commonGame.typeBet = 1;
        if (window.location.hostname == 'bayvip.app')
            return;
        bindInterface();


    };
    this.GameCicrleArray = [{
        gameID: 1,
        GameName: 'Tai xiu',
        Circle: 1
    }, {
        gameID: 2,
        GameName: 'Rong ho',
        Circle: 2
    }, {
        gameID: 3,
        GameName: 'Xoc dia',
        Circle: 3
    }]


    this.countNumber = function(target, newValue) {
        if ($('#' + target).length > 0) {
            var currentValue = $('#' + target).html().replace(/\./g, '');
            if (isNaN(currentValue) === false) {
                var s = new this.CountUp(target, currentValue, newValue, 0, 1);
                s.start();
            }
        }
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
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            }
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
        }
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
        }
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
        }
        this.stop = function() {
            cancelAnimationFrame(self.rAF);
        }
        this.reset = function() {
            self.startTime = null;
            cancelAnimationFrame(self.rAF);
            self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
        }
        this.resume = function() {
            self.startTime = null;
            self.duration = self.remaining;
            self.startVal = self.frameVal;
            requestAnimationFrame(self.count);
        }
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
        }

        // format startVal on initialization
        self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
    };


    this.showhide = function(type) {
        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            libAccount.Login();

            return;
        }
        if (type === 1 || type === 8 || type === 9) {
            if (typeof commonLuckyDice === 'undefined')
                return;
            if ($('#gameCicle').css('display') === 'none' || $('#lucky').length === 0) {

                commonLuckyDice.ShowDiceGUI();
                commonXocdia.ShowDiceGUI();
                commonDragon.ShowDiceGUI();
                if (type === 1) {
                    commonGame.showGameCircle(1);
                }
                if (type === 8) {
                    commonGame.showGameCircle(2);
                }
                if (type === 9) {
                    commonGame.showGameCircle(3);
                }

            } else {
                var gameId = 0;

                if (type === 1) {
                    gameId = 1;

                }
                if (type === 8) {
                    gameId = 2;

                }
                if (type === 9) {
                    gameId = 3;

                }

                var focus = $.grep(this.GameCicrleArray, function(v) {
                    return v.gameID === gameId;
                });

                if (focus.length > 0 && focus[0].Circle === 1) {
                    commonLuckyDice.HideDiceGUI();
                    commonXocdia.HideDiceGUI();
                    commonDragon.HideDiceGUI();
                }
                if (type === 1) {
                    commonGame.showGameCircle(1);
                }
                if (type === 8) {
                    commonGame.showGameCircle(2);
                }
                if (type === 9) {
                    commonGame.showGameCircle(3);
                }


            }

        } else if (type === 2) {
            if (typeof commonCandy === 'undefined')
                return;

            if ($('#Candy').length === 0 || $('#Candy').css('display') === 'none') {

                commonCandy.showGUI();
            } else {
                commonCandy.hideGUI();
            }
        } else if (type === 6) {
            if (typeof commonKubo === 'undefined')
                return;

            if ($('#Kubo').length === 0 || $('#Kubo').css('display') === 'none') {

                commonKubo.showGUI();
            } else {
                commonKubo.hideGUI();
            }
        } else if (type === 3) {
            if (typeof commonHiLo === 'undefined')
                return;
            if ($('#HiLo').length === 0 || $('#HiLo').css('display') === 'none') {
                commonHiLo.showHiLoGUI();
            } else {
                commonHiLo.hideHiLoGUI();
            }

        } else if (type === 4) {
            if (typeof commonMinipoker === 'undefined')
                return;
            if ($('#wrap_minipoker').length === 0 || $('#wrap_minipoker').css('display') === 'none') {

                commonMinipoker.showMinipokerGUI();
            } else {
                commonMinipoker.hideMinipokerGUI();
            }
        } else if (type === 5) {
            if (typeof commonMonster === 'undefined')
                return;

            if ($('#monster').length === 0 || $('#monster').css('display') === 'none') {

                commonMonster.showGUI();
            } else {
                commonMonster.hideGUI();
            }



        } else if (type === 11) {
            if (typeof commonXoso === 'undefined')
                return;

            if ($('#playxoso').length === 0 || $('#playxoso').css('display') === 'none') {

                commonXoso.showGUI();
            } else {
                commonXoso.hideGUI();
            }



        }


    };

    this.setActiveTab = function(a) {
        if (a == 1) {
            $("#t2, #t2rank").removeClass("active");
            $("#t1, #t1rank").addClass("active");
            $('.popup-guide').removeClass('popup-money-2');
            $('.popup-guide').addClass('popup-money-1');
        } else {
            $("#t1, #t1rank").removeClass("active");
            $("#t2, #t2rank").addClass("active");
            $('.popup-guide').removeClass('popup-money-1');
            $('.popup-guide').addClass('popup-money-2');
        }
    };
    this.displayCard = function(a) {
        a = "," + a + ",";
        a = a.replace(/ /g, "");
        for (var i = 0; i < 52; i++) {
            if (i < 8) {
                a = a.replace("," + (i) + ",", "," + (i + 2) + "♠,")
            }
            if (i > 12 && i <= 20) {
                a = a.replace("," + (i) + ",", "," + (i - 11) + "♣,")
            }
            if (i > 25 && i <= 33) {
                a = a.replace("," + (i) + ",", "," + (i - 24) + "♦,")
            }
            if (i > 38 && i <= 46) {
                a = a.replace("," + (i) + ",", "," + (i - 37) + "♥,")
            }
            switch (i) {
                case 8:
                    a = a.replace(",8,", ",10♠,");
                case 9:
                    a = a.replace(",9,", ",J♠,");
                case 10:
                    a = a.replace(",10,", ",Q♠,");
                case 11:
                    a = a.replace(",11,", ",K♠,");
                case 12:
                    a = a.replace(",12,", ",A♠,");
                case 21:
                    a = a.replace(",21,", ",10♣,");
                case 22:
                    a = a.replace(",22,", ",J♣,");
                case 23:
                    a = a.replace(",23,", ",Q♣,");
                case 24:
                    a = a.replace(",24,", ",K♣,");
                case 25:
                    a = a.replace(",25,", ",A♣,");
                case 34:
                    a = a.replace(",34,", ",10♦,");
                case 35:
                    a = a.replace(",35,", ",J♦,");
                case 36:
                    a = a.replace(",36,", ",Q♦,");
                case 37:
                    a = a.replace(",37,", ",K♦,");
                case 38:
                    a = a.replace(",38,", ",A♦,");
                case 47:
                    a = a.replace(",47,", ",10♥,");
                case 48:
                    a = a.replace(",48,", ",J♥,");
                case 49:
                    a = a.replace(",49,", ",Q♥,");
                case 50:
                    a = a.replace(",50,", ",K♥,");
                case 51:
                    a = a.replace(",51,", ",A♥,");
            }
        }
        return a.replace(/,/g, "");
    };
    this.bindPopupContent = function(a, b) {
        $("#Popup_Container").html(a);
        var c = '#scrollidxx';
        if (typeof b != 'undefined' && b.scrollId) c = b.scrollId;
        if ($(c).length > 0 && typeof $(c).slimScroll == 'function') {
            if (typeof b == 'undefined') b = {
                height: '340px'
            };
            $.extend(b, {
                color: '#fff',
            });
            $(c).slimScroll(b);
        }


    };

    this.showPopup = function(a) {
        if ($("#Popup_Container").css('display') == 'block')
            return;
        if ($("#Popup_Container").length <= 0) {
            var b = '<div id="Popup_Container"></div>' + '<div onclick="commonGame.closePopupParent();" id="overlayxx" class="overlay"></div>';
            $('#ag').append(b);
            $("#Popup_Container").draggable({
                scroll: false
            });
        }
        var c = '<div class="spinner"">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '<div class="bounce4"></div>' + '<div class="bounce5"></div>' + '</div>';
        $('#Popup_Container').html(c);
        $('#Popup_Container').slideToggle();
        $('#overlayxx').show();
    };

    this.closePopupParent = function() {
        $('#Popup_Container').css('height', '');
        $('#Popup_Container').slideToggle();
        $('#overlayxx').hide();
        this.cacheData = null;

    };
    this.closeHideAll = function() {
        $('#Popup_Container').css('height', '');
        $('#Popup_Container').hide();
        $('#overlayxx').hide();
        this.cacheData = null;

    };
    this.setPopup = function(width, height) {
        $('#popup_nd').css('width', width);
        $('#popup_nd').css('height', height);
        var leftOffset = ($(window).width() - width) / 2;
        var topOffset = ($(window).height() - height) / 2 + $(window).scrollTop();
        $('#Popup_Container').css('left', "-790px");
        $('#Popup_Container').css('z-index', 1300);
        $('#Popup_Container').css("top", "71px");

        $('#Popup_Container').css('position', 'absolute');
        $('#overlayxx').css('height', $(document).height());
        $('#overlayxx').show();
    };

    this.formatTime = function(inputTime) {
        var secNumb = parseInt(inputTime);
        var hours = Math.floor((secNumb) / 3600);
        var minutes = Math.floor((secNumb - hours * 3600) / 60);
        var seconds = secNumb - (minutes * 60);

        if (hours < 10)
            hours = "0" + hours;

        if (minutes < 10)
            minutes = "0" + minutes;

        if (seconds < 10)
            seconds = "0" + seconds;
        return minutes + ':' + seconds;
    };
    this.FormatNumber = function(p_sStringNumber) {
        p_sStringNumber += '';
        x = p_sStringNumber.split(',');
        x1 = x[0];
        x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + '.' + '$2');

        return x1 + x2;
    };

    this.showVqJackpot = function(target, gameId, name, jack, rate, jackRate) {
        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            return;
        }
        if (commonGame.VQjackpot === null || commonGame.VQjackpot === undefined) {
            commonGame.VQjackpot = new window.VQjackpot.Game();
            commonGame.VQjackpot.create();
        }
        commonGame.VQjackpot.addJack(target, gameId, name, jack, rate, jackRate);
    };
    this.showVqmm = function() {
        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            libAccount.Login();

            return;
        }
        if (commonGame.VQMM === null || commonGame.VQMM === undefined) {
            commonGame.VQMM = new window.VQMM.Game();
            commonGame.VQMM.create();
        }

    };
    this.showMapEvent = function() {
        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            libAccount.Login();

            return;
        }
        if (commonGame.MAPEVENT === null || commonGame.MAPEVENT === undefined) {
            commonGame.MAPEVENT = new window.MAPEVENT.Game();
            commonGame.MAPEVENT.create();
        }

    };

    this.showvqIsland = function(countSpin) {
        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            libAccount.Login();

            return;
        }
        if (commonGame.VQisLand === null || commonGame.VQisLand === undefined) {
            commonGame.VQisLand = new window.VQisLand.Game();
            commonGame.VQisLand.create();
            commonGame.VQisLand.updateSpin(countSpin);
        }

    };

    this.showGameCircle = function(gameId) {

        var focus = $.grep(this.GameCicrleArray, function(v) {
            return v.gameID === gameId;
        });

        if (gameId === 1) {
            commonLuckyDice.ShowButton();
            commonXocdia.HideButton();
            commonDragon.HideButton();
        }

        if (gameId === 2) {
            commonLuckyDice.HideButton();
            commonXocdia.HideButton();
            commonDragon.ShowButton();
        }

        if (gameId === 3) {
            commonLuckyDice.HideButton();
            commonXocdia.ShowButton();
            commonDragon.HideButton();
        }


        if (focus.length === 0)
            return;
        var objFocus = focus[0];
        if (objFocus.Circle === 1)
            return;
        commonGame.closeHideAll();
        var listGame = [];

        if (objFocus.Circle === 2) {

            listGame = $.grep(this.GameCicrleArray, function(v) {
                return v.gameID !== gameId;
            });
            objFocus.Circle = 1;
            for (var i = 0; i < listGame.length; i++) {
                if (listGame[i].Circle === 3) {
                    listGame[i].Circle = 2;
                } else {
                    listGame[i].Circle = 3;
                }

            }
            listGame.push(objFocus);
            console.log(listGame);
            this.GameCicrleArray = listGame;

        }


        if (objFocus.Circle === 3) {

            listGame = $.grep(this.GameCicrleArray, function(v) {
                return v.gameID !== gameId;
            });
            objFocus.Circle = 1;
            for (var i = 0; i < listGame.length; i++) {
                if (listGame[i].Circle === 1) {
                    listGame[i].Circle = 2;
                } else {
                    listGame[i].Circle = 3;
                }

            }
            listGame.push(objFocus);
            this.GameCicrleArray = listGame;

        }


        $('#txCircle').removeClass('Circle1').removeClass('Circle2').removeClass('Circle3');
        $('#drCircle').removeClass('Circle1').removeClass('Circle2').removeClass('Circle3');
        $('#xdCircle').removeClass('Circle1').removeClass('Circle2').removeClass('Circle3');
        for (var j = 0; j < this.GameCicrleArray.length; j++) {
            if (this.GameCicrleArray[j].gameID === 1) {
                $('#txCircle').addClass('Circle' + this.GameCicrleArray[j].Circle);
            }
            if (this.GameCicrleArray[j].gameID === 2) {
                $('#drCircle').addClass('Circle' + this.GameCicrleArray[j].Circle);
            }
            if (this.GameCicrleArray[j].gameID === 3) {
                $('#xdCircle').addClass('Circle' + this.GameCicrleArray[j].Circle);
            }

        }



    };


    this.resetZindex = function() {
        $('#HiLo').removeClass('active');
        $('#Candy').removeClass('active');
        $('#Kubo').removeClass('active');
        $('#gameCicle').removeClass('active');
        $('#wrap_minipoker').removeClass('active');
        $('#monster').removeClass('active');
    };

    this.formDateTimehms = function(date) {
        date = date.replace(/\-/g, '\/').replace(/[T|Z]/g, ' ');
        if (date.indexOf('.') > 0)
            date = date.substring(0, date.indexOf('.'));
        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var _hour = d.getHours();
        var _minute = d.getMinutes();
        var _second = d.getSeconds();
        if (curr_date < 10) curr_date = "0" + curr_date;
        if (curr_month < 10) curr_month = "0" + curr_month;
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        return curr_date + "/" + curr_month +
            "/" + curr_year + " " + _hour + ":" + _minute;
    };
    this.formDateTimehmsType = function(a, b) {
        if (typeof b == 'undefined') b = 0;
        var d = a;
        if (typeof a == 'string') {
            a = a.replace(/\-/g, '\/').replace(/[T|Z]/g, ' ');
            if (a.indexOf('.') > 0) a = a.substring(0, a.indexOf('.'));
            d = new Date(a)
        }
        var c = d.getDate();
        var e = d.getMonth() + 1;
        var f = d.getFullYear();
        var g = d.getHours();
        var h = d.getMinutes();
        var i = d.getSeconds();
        if (c < 10) c = "0" + c;
        if (e < 10) e = "0" + e;
        if (g < 10) g = "0" + g;
        if (h < 10) h = "0" + h;
        if (i < 10) i = "0" + i;
        if (b == 2) {
            return g + ":" + h + ":" + i
        } else if (b == 1) {
            return c + "/" + e + "/" + f
        } else if (b == 3) {
            return f + "/" + e + "/" + c + " " + g + ":" + h + ":" + i
        }
        if (b == 4) {
            return f + "/" + e + "/" + c
        } else {
            return c + "/" + e + "/" + f + " " + g + ":" + h + ":" + i
        }
    };


    var indexMinipoker = 0,
        indexTx = 0,
        indexCandy = 0,
        indexMonster = 0;
    this.showNotify = function(id, noty) {
        var span = '';
        if (id === 1 && $('#lucky').css('display') === 'block') {
            return;
        }
        if (id === 2 && $('#wrap_minipoker').css('display') === 'block') {
            return;
        }

        if (id === 3 && $('#Candy').css('display') === 'block') {
            return;
        }

        if (id === 4 && $('#monster').css('display') === 'block') {
            return;
        }
        if (id === 5 && $('#Kubo').css('display') === 'block') {
            return;
        }

        if ($('.minigame-expand').hasClass('show')) {


            if (id === 1) {
                indexTx++;
                span = '<span id="q-luckydice' + indexTx + '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">+' + noty + '</span>';
                $('#q-luckydice').append(span);
                $('#q-luckydice span#q-luckydice' + indexTx).animate({
                        top: '-150px',
                        opacity: 0
                    },
                    5000,
                    function() {
                        this.remove();
                    });
            }
            if (id === 2) {

                for (var i = 0; i < noty.length; i++) {
                    indexMinipoker++;
                    span = '<span id="q-minipoker' +
                        indexMinipoker +
                        '" style="margin-left: -43px;position: absolute;top: -30px;opacity: 1;">+' + commonGame.FormatNumber(noty[i]) +
                        '</span>';
                    $('#q-minipoker').append(span);
                    $('#q-minipoker span#q-minipoker' + indexMinipoker).delay(i * 300).animate({
                            top: '-150px',
                            opacity: 0
                        },
                        3000,
                        function() {
                            this.remove();
                        });
                }
            }

            if (id === 3 || id === 5) {

                indexCandy++;
                span = '<span id="q-candy' + indexCandy + '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">+' + commonGame.FormatNumber(noty) + '</span>';
                $('#q-candy').append(span);
                $('#q-candy span#q-candy' + indexCandy).animate({
                        top: '-150px',
                        opacity: 0
                    },
                    5000,
                    function() {
                        this.remove();
                    });

            }
            if (id === 4) {

                indexMonster++;
                span = '<span id="q-monster' +
                    indexMonster +
                    '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">+' + commonGame.FormatNumber(noty) +
                    '</span>';
                $('#q-monster').append(span);
                $('#q-monster span#q-monster' + indexMonster).animate({
                        top: '-150px',
                        opacity: 0
                    },
                    5000,
                    function() {
                        this.remove();
                    });

            }
        } else {

            if (id === 1) {
                indexTx++;
                span = '<span id="q-luckydice-n' + indexTx + '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">' + noty + '</span>';
                $('#q-luckydice-n').append(span);
                $('#q-luckydice-n span#q-luckydice-n' + indexTx).animate({
                        top: '-150px',
                        opacity: 0
                    }, 5000,
                    function() {
                        this.remove();
                    });
            }
            if (id === 2) {

                for (var i = 0; i < noty.length; i++) {
                    indexMinipoker++;
                    span = '<span id="q-minipoker-n' + indexMinipoker + '" style="margin-left: -43px;position: absolute;top: -30px;opacity: 1;">+' + commonGame.FormatNumber(noty[i]) + '</span>';
                    $('#q-minipoker-n').append(span);
                    $('#q-minipoker-n span#q-minipoker-n' + indexMinipoker).delay(i * 300).animate({
                            top: '-150px',
                            opacity: 0
                        },
                        5000,
                        function() {
                            this.remove();
                        });

                }
            }

            if (id === 3 || id == 5) {

                indexCandy++;
                span = '<span id="q-candy-n' + indexCandy + '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">+' + commonGame.FormatNumber(noty) + '</span>';
                $('#q-candy-n').append(span);
                $('#q-candy-n span#q-candy-n' + indexCandy).animate({
                        top: '-150px',
                        opacity: 0
                    },
                    5000,
                    function() {
                        this.remove();
                    });

            }
            if (id === 4) {

                indexMonster++;
                span = '<span id="q-monster-n' + indexMonster + '" style="margin-left: -43px;position: absolute;top: -50px;opacity: 1;">+' + commonGame.FormatNumber(noty) + '</span>';
                $('#q-monster-n').append(span);
                $('#q-monster-n span#q-monster-n' + indexMonster).animate({
                        top: '-150px',
                        opacity: 0
                    },
                    5000,
                    function() {
                        this.remove();
                    });

            }
        }

    }

    function bindInterface() {

        var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/minigame/mini-game.html" + version);
        tem.setParam('MediaUrl', commonGame.mediaUrl);
        var str1 = jQuery.processTemplateToText(tem);
        $('.app').append(str1);


        var str = '<div id="ag"><div id="gameCicle"> <div class="chat-section"> <div class="chat-content"> <div class="messages"> <ul class="list-msg"></ul> </div> <div class="input-msg"> <input type="text" placeholder="Nhập nội dung" id="txtinput" autocomplete="off"> <div class="send"></div> </div> </div> </div> <div id="txCircle" class="Circle1"></div><div id="drCircle" class="Circle2"></div><div id="xdCircle" class="Circle3"></div></div></div>';
        if ($('#ag').length <= 0)
            $('.app').append(str);
        $("#ag").show();
        $("#gameCicle").draggable({
            scroll: false
        });

        $('.button-toggle-minigame').draggable({
            scroll: false
        });



        $('.minigame-expand .button-back').unbind('click').click(function() {
            $('.minigame-expand').removeClass('show');
        });
        $('.button-toggle-minigame').unbind('click').click(function() {

            if ($('.minigame-expand').hasClass('show')) {
                $('.minigame-expand').removeClass('show');
            } else {
                $('.minigame-expand').addClass('show');
            }

        });

        $('.minigame-expand div:nth-child(2)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showVqmm();

        });

        $('.minigame-expand div:nth-child(3)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(4);

        });

        $('.minigame-expand div:nth-child(4)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(1);

        });



        $('.minigame-expand div:nth-child(5)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(3);

        });

        $('.minigame-expand div:nth-child(6)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(2);

        });

        $('.minigame-expand div:nth-child(7)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(6);

        });


        $('.minigame-expand div:nth-child(8)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(5);

        });


        $('.minigame-expand div:nth-child(9)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showhide(11);

        });




        $('.minigame-expand div:nth-child(10)').click(function() {
            $('.minigame-expand').removeClass('show');
            commonGame.showMapEvent();

        });

        try {
            $(window).trigger('resize');
        } catch (err) {
            console.log(err);
        }
    };



};
(function(window, $) {
    var treasure = function() {
        this._init();
    };
    treasure.prototype.OldValue = [];
    treasure.prototype.GameJackActive = [];

    var temlistJackpot;
    var pageCount;
    var rowperPage = 11;
    var cacheJackHistory = null;
    var emitterFire = null;
    var elapsed;
    var jackCanvas = null;


    treasure.prototype.animPay = null;

    treasure.prototype._init = function() {
        var that = this;
        that.GetListJackPot();
        that.GetListNotyfi();
        that.initTimeEventSlot();

        var tem = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/jackpot.html");
        tem.setParam('MediaUrl', commonGame.mediaUrl);
        var str1 = jQuery.processTemplateToText(tem);
        $('.app').append(str1);


        jackCanvas = new PIXI.Application(1920, 1000, {
            antialias: false,
            transparent: true,
            resolution: 1
        });
        $(".app").append(jackCanvas.view);

        if (window.location.hostname == 'bayvip.app') {

            $('.app').hide();

        }


        $(".button-jackpot").unbind('click').click(function() {
            if (window.location.hostname == 'bayvip.app')
                return;
            that.showJackpot(0);
        });

        $(".button-eventSlot .icon-eventSlot").unbind('click').click(function() {

            if ($('.button-eventSlot .infoGameSession').css("display") == 'block') {
                $('.button-eventSlot .contenRewardEventSlot').hide();
                $('.button-eventSlot .infoGameSession').hide();
            } else {
                $('.button-eventSlot .infoGameSession').show();
            }



        });



        $(".button-eventSlot .contenRewardEventSlot .close_reward").unbind('click').click(function() {
            $('.button-eventSlot .contenRewardEventSlot').hide();
        });
        $(".button-eventSlot .infoGameSession .his_eventSlot").unbind('click').click(function() {
            $('.button-eventSlot .contenRewardEventSlot').show();
        });

        $(".button-eventSlot .infoGameSession .close_eventSlot").unbind('click').click(function() {
            $('.button-eventSlot .contenRewardEventSlot').hide();
            $('.button-eventSlot .infoGameSession').hide();
        });

        $('.button-eventSlot .infoGameSession .Usertable').slimScroll({
            height: '399px'
        });

        $('.button-jackpot').draggable({
            scroll: false
        });
        $('.button-eventSlot').draggable({
            scroll: false
        });


        $(".button-eventSlot .infoGameSession .contentWaitTop .helpEventSlot").click(function() {
            App.treasure.showJackpot(4);
        });

    };




    treasure.prototype.showSpinButton = function() {
        var that = this;


        var eventChuadao = new PIXI.spine.Spine(resources['icon_eventchuadao'].spineData);
        eventChuadao.x = 1650;
        eventChuadao.y = 200;
        eventChuadao.scale.set(0.6);
        eventChuadao.state.setAnimation(0, 'animation', true);
        eventChuadao.state.timeScale = 0.6;

        var eventx3 = new PIXI.spine.Spine(resources['icon_x3'].spineData);
        eventx3.x = 180;
        eventx3.y = 820;
        eventx3.scale.set(0.5);
        eventx3.state.setAnimation(0, 'animation', true);
        eventx3.state.timeScale = 0.4;

        that.animPay = new PIXI.spine.Spine(resources['animZalo'].spineData);
        that.animPay.x = 950;
        that.animPay.y = 50;
        that.animPay.scale.set(1);
        that.animPay.visible = false;
        that.animPay.state.setAnimation(0, 'animation', true);
        that.animPay.state.timeScale = 1;

        jackCanvas.stage.addChild(eventChuadao, eventx3, that.animPay);
        $('.event-napx3').show();
        $('.event-chuadao').show();

        $(".event-chuadao").unbind('click').click(function() {

            libprofile.sukientet();
        });


        $(".event-napx3").unbind('click').click(function() {
            libs.ShowGame(55);
        });

    };
    treasure.prototype.showJackpot = function(tab) {
        var that = this;
        if (typeof temlistJackpot === 'undefined')
            temlistJackpot = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/listJackpot.html?v=12");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(temlistJackpot));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });
        that.bindingNameJackPopup();
        $(".rulesIsland").slimScroll({
            height: '580px'
        });

        $('.jackpot-body').slimScroll({
            height: '610px'
        });




        $('#list-events-id div').click(function() {
            $('#list-events-id div').removeClass('active');
            $(this).addClass('active');
            var id = parseInt($(this).attr('data-id'));

            if (id === 0) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helpIsland.html?v=12");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesIsland").slimScroll({
                    height: '580px'
                });

            }
            if (id === 1) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helpDragon.html");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesDragon").slimScroll({
                    height: '580px'
                });
                $(".rankDragon").slimScroll({
                    height: '555px'
                });

                $('.tab_Dragon.tap1').unbind('click').click(function() {
                    $('.tap_txDragon .tab_Dragon').removeClass('active');
                    $('.tab_Dragon.tap1').addClass('active');
                    $('#rulesDragonId').show();
                    $('#rankDragonId').hide();
                });


                $('.tab_Dragon.tap2').unbind('click').click(function() {
                    $('.tap_txDragon .tab_Dragon').removeClass('active');
                    $('.tab_Dragon.tap2').addClass('active');
                    $('#rulesDragonId').hide();
                    $('#rankDragonId').show();
                    bindingTopTx();
                });
            }

            if (id === 2) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helpHilo.html");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesDragon").slimScroll({
                    height: '580px'
                });
                $(".rankDragon").slimScroll({
                    height: '555px'
                });

                $('.tab_Dragon.tap1').unbind('click').click(function() {
                    $('.tap_txDragon .tab_Dragon').removeClass('active');
                    $('.tab_Dragon.tap1').addClass('active');
                    $('#rulesDragonId').show();
                    $('#rankDragonId').hide();
                });


                $('.tab_Dragon.tap2').unbind('click').click(function() {
                    $('.tap_txDragon .tab_Dragon').removeClass('active');
                    $('.tab_Dragon.tap2').addClass('active');
                    $('#rulesDragonId').hide();
                    $('#rankDragonId').show();
                    bindingTopHilo();
                });
            }
            if (id === 3) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helpvqxhu.html");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesxhu").slimScroll({
                    height: '580px'
                });

            }
            if (id === 4) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helpeventSlot.html");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesEventslot").slimScroll({
                    height: '580px'
                });

            }

            if (id === 5) {
                var tm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/jackpot/helplixi.html");
                $(".box-scroll").html(jQuery.processTemplateToText(tm));
                $(".rulesLixi").slimScroll({
                    height: '580px'
                });

            }


        });


        $('.jackpot-tab-controllers .button ').click(function() {
            $('.jackpot-tab-controllers .button').removeClass('active');
            $(this).addClass('active');
            $('.jackpot-tabs .tab').removeClass('active');
            var index = parseInt($(this).attr('data-index'));
            $(".jackpot-tabs .tab").eq(index).addClass('active');

            if (index === 2) {
                cacheJackHistory = null;
                that.getJackHistory();
            }
            if (index === 3) {
                cacheJackHistory = null;
                that.getUserJackHistory();
            }
        });

        if (tab === 1) {
            $('.jackpot-tab-controllers .button').eq(1).click();
            $('#list-events-id div').eq(1).click();
        } else if (tab === 2) {
            $('.jackpot-tab-controllers .button').eq(1).click();
            $('#list-events-id div').eq(2).click();
        } else if (tab === 4) {
            $('.jackpot-tab-controllers .button').eq(1).click();
            $('#list-events-id div').eq(4).click();
        } else if (tab === 5) {
            $('.jackpot-tab-controllers .button').eq(1).click();
            $('#list-events-id div').eq(5).click();
        }


        function bindingTopTx() {
            var m = {};
            libs.GetData(jsConfig.urlRootDailyevent + 'api/EventApi/GetEventDice', m, function(data) {

                var htmloption = '';
                $('#dragonId').html('');
                for (var i = 0; i < data.TopDragon.length; i++) {
                    if (i === 0) {
                        htmloption += '<option value="' + i + '" selected="selected">' + data.TopDragon[i].Description + '</option>';
                    } else {
                        htmloption += '<option value="' + i + '" >' + data.TopDragon[i].Description + '</option>';
                    }
                }
                $('#dragonId').html(htmloption);

                if (data.TopDragon.length > 0) {
                    var html = '';
                    var obj = data.TopDragon[0].DragonHistories;
                    for (var i = 0; i < obj.length; i++) {

                        html += ' <tr class="top' + (i + 1) + '">';
                        html += '    <td align= "center" >' + obj[i].RankTop + ' </td >';
                        html += ' <td align="center">' + obj[i].NickName + '</td>';
                        html += ' <td align="center">' + obj[i].Amount + '</td>';
                        html += ' <td align="center" class="money-gold">' + util.ParseMoney(obj[i].Award) + '</td>';
                        html += ' </tr >';
                    }

                    $('#rankDragonUserId').html('Hạng của bạn :' + userTxCurrent(obj, App.currentAccount.nickName));
                    $('#table_bodyRankDragon').html(html);
                }

                $('#dragonId').change(function(e) {

                    var index = $('#dragonId').val();
                    $('#table_bodyRankDragon').html('');
                    var html = '';
                    var obj = data.TopDragon[index].DragonHistories;
                    for (var i = 0; i < obj.length; i++) {

                        html += ' <tr class="top' + (i + 1) + '">';
                        html += '    <td align= "center" >' + obj[i].RankTop + ' </td >';
                        html += ' <td align="center">' + obj[i].NickName + '</td>';
                        html += ' <td align="center">' + obj[i].Amount + '</td>';
                        html += ' <td align="center" class="money-gold">' + util.ParseMoney(obj[i].Award) + '</td>';

                        html += ' </tr >';

                    }
                    $('#table_bodyRankDragon').html(html);
                    $('#rankDragonUserId').html('Hạng của bạn :' + userTxCurrent(obj, App.currentAccount.nickName));


                });


            }, function(a) {

            });

            function userTxCurrent(topDragonTx, nick) {

                for (var i = 0; i < topDragonTx.length; i++) {

                    if (topDragonTx[i].NickName === nick)
                        return topDragonTx[i].RankTop;
                }
                return '>' + 999;
            }
        }

        function bindingTopHilo() {
            var m = {};
            libs.GetData(jsConfig.urlRootDailyevent + 'api/EventApi/GetEventHilo', m, function(data) {

                updateRankHilo(data.Today);
                $('#dragonId').change(function() {
                    var current = $(this).val();
                    if (current === '1') {
                        updateRankHilo(data.Today);
                    } else {
                        updateRankHilo(data.Yesterday);
                    }

                });



            }, function(a) {

            });

            function updateRankHilo(data) {

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var css = '';
                    if (i == 0)
                        css = 'top1';
                    if (i == 1)
                        css = 'top2';
                    if (i == 2)
                        css = 'top3';
                    html += '<tr class="' + css + '">';
                    html += '<td align="center">' + data[i].Rank + '</td>';
                    html += '<td align="center">' + data[i].NickName + '</td> ';
                    html += '<td align="center">' + data[i].Cardsort + '</td> ';
                    html += '<td align="center" class="money-gold">' + util.ParseMoney(data[i].Win) + '</td>  ';
                    html += '<td align="center" class="money-gold">' + util.ParseMoney(data[i].Award) + '</td>  ';
                    html += '</tr>';
                }

                $('#table_bodyRankDragon').html(html);
            }


        }

    };



    treasure.prototype.addUserJack = function(accountName, jackFun, gameName, roomId, gameId) {
        var that = this;
        if (that.hasJackNoti) {
            that.arrayJackNoti.push({
                accountName: accountName,
                jackFun: jackFun,
                gameName: gameName,
                roomId: roomId,
                gameId: gameId
            });
            return;
        }

        $('#ljp-' + gameId + '-room-' + roomId).parent().addClass('fxJL');

        that.hasJackNoti = true;
        that.destroyJack();
        that.jackNotiContainer = new Container();
        that.jackNotiContainer.y = 400;
        that.jackNotiContainer.alpha = 0;
        that.jackNoti.stage.addChild(that.jackNotiContainer);
        var spine1 = new PIXI.spine.Spine(resources['BaoDanh-nohu'].spineData);
        spine1.x = 105;
        spine1.y = 100;
        spine1.state.setAnimation(0, 'Idle', false);
        spine1.state.timeScale = 4;
        spine1.scale.set(1.4);

        var txtjac = new Text(util.ParseMoney(jackFun),
            new PIXI.TextStyle({
                fontFamily: "Conv_UTM_Swiss_Condensed",
                fontSize: 18,

                fill: ["#f7f59b", "#ff9905"],
                stroke: "#000",
                strokeThickness: 2,
                dropShadow: true,
                dropShadowColor: "#000",
                dropShadowAlpha: 0.5,
                dropShadowBlur: 0,
                dropShadowAngle: Math.PI / 2,
                dropShadowDistance: 1
            }));
        txtjac.anchor.set(0.5);
        txtjac.position.set(100, 162);

        var txtGamename = new Text(gameName,
            new PIXI.TextStyle({
                fontFamily: "Conv_UTM_Swiss_Condensed",
                fontSize: 18,

                fill: ["#19ff19"]

            }));
        txtGamename.anchor.set(0.5);
        txtGamename.position.set(100, 182);

        var txtuserName = new Text(accountName, {
            fontFamily: 'Conv_UTM_Swiss_Condensed',
            fontSize: 18,
            fill: '#19ff19'

        });

        var txtnotijack = new Text('vừa nổ hũ', {
            fontFamily: 'Conv_UTM_Swiss_Condensed',
            fontSize: 18,
            fill: '#ffffff'

        });

        TweenMax.to(that.jackNotiContainer, 0.2, {
            y: 130,
            delay: 0,
            alpha: 1
        });
        var w = (190 - txtuserName.width - txtnotijack.width) / 2;
        txtuserName.position.set(w, 130);
        txtnotijack.position.set(w + txtuserName.width + 8, 130);
        that.jackNotiContainer.addChild(spine1, txtjac, txtGamename, txtuserName, txtnotijack);
        emitterFire = new PIXI.particles.Emitter(spine1, TextureCache["particle-5.png"], resources.fireEmitter1.data);
        emitterFire.emit = true;
        TweenMax.to(txtnotijack, 5, {
            alpha: 1,
            delay: 0,
            ease: Back.easeOut,
            onComplete: function() {
                that.destroyJack();
                that.hasJackNoti = false;
                $('.jackpot-body .room').removeClass('fxJL');
                if (that.arrayJackNoti.length > 0) {
                    var obj = that.arrayJackNoti[0];
                    that.arrayJackNoti.splice(0, 1);
                    that.addUserJack(obj.accountName, obj.jackFun, obj.gameName, obj.roomId, obj.gameId);
                }

            }
        });
    };

    treasure.prototype.destroyJack = function() {
        var that = this;

        if (that.jackNotiContainer !== undefined) {
            that.jackNotiContainer.destroy();
        }

        if (emitterFire !== null) {
            emitterFire.destroy();
        }
        emitterFire = null;
    };

    treasure.prototype.update = function() {
        var now = Date.now();
        if (emitterFire)
            emitterFire.update((now - elapsed) * 0.001);
        elapsed = now;
    };

    treasure.prototype.bindingNameJackPopup = function() {
        var that = this;
        var sort = that.OldValue.filter((word => word.RoomID === 3)).sort();
        if (sort.length === 0)
            return;
        var html = '';
        for (var i = 0; i < sort.length; i++) {
            var fun = 'libs.ShowGame(' + sort[i].GameID + ')';
            html += '<li class="jackpot-row">';
            html += '<div class="name">';
            html += '<a href="javascript:' + fun + ';"><span class="icon"><i class="jackpot-slot-' + sort[i].GameID + '"></i></span><span class="game">' + sort[i].GameName + '</span></a>';
            html += '</div >';
            html += '<span class="room">';
            html += '<span class="room-align-right" id="ljp-' + sort[i].GameID + '-room-3">0</span>';
            html += '</span>';
            html += '<span class="room">';
            html += '<span class="room-align-right" id="ljp-' + sort[i].GameID + '-room-4">0</span>';
            html += '</span>';
            html += '<span class="room">';
            html += '<span class="room-align-right" id="ljp-' + sort[i].GameID + '-room-2">0</span>';
            html += '</span>';
            html += '<span class="room">';
            html += '<span class="room-align-right" id="ljp-' + sort[i].GameID + '-room-1">0</span>';
            html += '</span>';
            html += '</li >';
        }
        $('.jackpot-body').html(html);

        that.binderJackPot(that.OldValue, true);

    };


    treasure.prototype.getJackHistory = function() {
        var that = this;
        if (cacheJackHistory === null || cacheJackHistory === undefined) {
            var m = {};
            libs.GetData(jsConfig.urlRootJackpot + 'api/JackPot/GetJackpotHistory', m, function(data) {
                cacheJackHistory = data;
                bindingHistoryJackpot(1);
            }, function(a) {

            });

        } else {
            bindingHistoryJackpot(1);
        }


    };


    treasure.prototype.getUserJackHistory = function() {
        var that = this;
        if (cacheJackHistory === null || cacheJackHistory === undefined) {
            var m = {};
            libs.GetData(jsConfig.urlRootJackpot + 'api/JackPot/GetUserJackpot', m, function(data) {
                cacheJackHistory = data;
                bindingUserHistoryJackpot(1);
            }, function(a) {

            });

        } else {
            bindingUserHistoryJackpot(1);
        }


    };




    function bindingUserHistoryJackpot(current) {
        var that = this;
        var html = '';
        var pages = cacheJackHistory.slice((current - 1) * rowperPage, current * rowperPage);
        for (var i = 0; i < pages.length; i++) {
            html += '<tr>';
            html += '<td width="20%">' + util.FormatDatetime(pages[i].TimeWin) + '</td>';
            html += '<td width="20%">' + pages[i].GameName + '</td>';
            html += '<td width="20%"><span class="t-pink2">' + util.ParseMoney(roomBetvalue(pages[i].RoomID)) + '</span></td>';
            html += '<td width="20%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + roomTypeJack(pages[i].TypeJack, pages[i].NumberJack) + '</td>';
            html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].Jackpot) + '</span></td>';
            html += '</tr>';
        }
        $("#table_bodyUserJack").html(html);
        pageCount = Math.ceil(cacheJackHistory.length / rowperPage);
        $("#pager_UserJack").pager({
            pagenumber: current,
            pagecount: pageCount,
            buttonClickCallback: bindingUserHistoryJackpot
        });


    }

    function bindingHistoryJackpot(current) {
        var that = this;
        var html = '';
        var pages = cacheJackHistory.slice((current - 1) * rowperPage, current * rowperPage);
        for (var i = 0; i < pages.length; i++) {
            html += '<tr>';
            html += '<td width="15%">' + pages[i].GameName + '</td>';
            html += '<td width="15%">' + util.FormatDatetime(pages[i].TimeWin) + '</td>';
            html += '<td width="20%">' + pages[i].NickName + '</td>';
            html += '<td width="20%"><span class="t-pink2">' + util.ParseMoney(roomBetvalue(pages[i].RoomID)) + '</span></td>';
            html += '<td width="15%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + roomTypeJack(pages[i].TypeJack, pages[i].NumberJack) + '</td>';
            html += '<td width="15%"><span class="t-pink">' + util.ParseMoney(pages[i].Jackpot) + '</span></td>';
            html += '</tr>';
        }
        $("#table_bodyHistoryJack").html(html);
        pageCount = Math.ceil(cacheJackHistory.length / rowperPage);
        $("#pager_historyJack").pager({
            pagenumber: current,
            pagecount: pageCount,
            buttonClickCallback: bindingHistoryJackpot
        });


    }

    function roomBetvalue(roomId) {

        if (roomId === 1)
            return 100;
        if (roomId === 2)
            return 1000;
        if (roomId === 3)
            return 10000;
        if (roomId === 4)
            return 5000;
        return roomId;
    }

    function roomTypeJack(typeJack, number) {

        if (typeJack === 1)
            return number;
        if (typeJack === 2)
            return 'Supper Jackpot';

        return number + '%';


    }


    treasure.prototype.binderJackPot = function(listJack, firt) {

        if ($('.jackpot-body').length <= 0)
            return;

        var gameID, roomid, target, that = this;
        var h = 0;
        var i = false,
            useEasing = true,
            useGrouping = true,
            options = {
                useEasing: useEasing,
                useGrouping: useGrouping,
                separator: '.',
                decimal: '.'
            };
        $.each(listJack, function(a, b) {
            gameID = this.GameID;
            roomid = this.RoomID;
            target = 'ljp-' + gameID + '-room-' + roomid;
            if (that.OldValue !== null && that.OldValue.length > 0 && !firt)
                h = that.OldValue.find(function(v) {
                    return (v.GameID === gameID && v.RoomID === roomid);
                }).JackpotFund;

            var c = b.JackpotFund;
            var d = new XCountUp.Init(target, h, c, 0, 5, options);
            d.start();
        });

        var sort = that.OldValue.filter((word => word.RoomID === 3)).sort();

    };

    treasure.prototype.GetListNotyfi = function() {
        if (window.location.hostname == 'bayvip.app')
            return;
        var e = this;
        util.PostData(jsConfig.urlRootJackpot + '/api/JackPot/ListGameTopNotyfi', {}, function(a) {
            var html = ' <marquee behavior="" direction=""> <ul id="ulNotify">';
            if (jsConfig.hostConfig.linkPort !== undefined && jsConfig.hostConfig.linkPort.NotifyMessage !== '') {
                html += '<li><span style="font-size: 20px;"> ' + jsConfig.hostConfig.linkPort.NotifyMessage + ' </span></li>';
            }
            for (var i = 0; i < a.TopNotyfi.length; i++) {
                html += '<li><span class="game">(' + a.TopNotyfi[i].GameName + ')</span> <span class="name">' + a.TopNotyfi[i].NickName + '</span> Thắng <span class="money">' + util.ParseMoney(a.TopNotyfi[i].WinMoney) + '</span></li>';
            }
            html += '</ul>   </marquee>';
            $('.winners').html(html);

        }, function(a) {
            console.log(a);
        });
        e.NotyfiTimer = setTimeout(function() {
            e.GetListNotyfi();
        }, 1000 * 45);
    };
    treasure.prototype.GetListJackPot = function() {
        var d = jsConfig.urlRootJackpot + '/api/JackPot/ListGameJackpotInfo';
        var that = this;
        util.PostData(d, {}, function(data) {
            bindingEventSlot(data.EventSlotSession);
            that.binderJackPot(data.ListJacks, false);
            that.OldValue = data.ListJacks;
            if (App && App.Lobby) {
                App.Lobby.bindingLobby(data);
            }



        }, function(a) {
            console.log(a);
        });
        that.TreasureTimer = setTimeout(function() {
            that.GetListJackPot();
        }, 1000 * 6);
    };
    treasure.prototype.GetAccountInfoMap = function() {
        var that = this;

        if (App.currentAccount && App.currentAccount.AccountID > 0) {
            var m = {};
            libs.GetData2(jsConfig.urlRootIsLand + 'api/IsLand/GetAccountIsland',
                m,
                function(data) {
                    $('.event-chuadao .e_oil').show();
                    $('.event-chuadao .e_rank').show();
                    $('.event-chuadao .e_oil').html(util.ParseMoney(data.UserMap.OilLP));
                    $('.event-chuadao .e_rank').html(data.UserMap.Rank > 0 ? data.UserMap.Rank : 9999);
                },
                function(a) {});
        }
        clearTimeout(that.NotyfiIsLand);
        that.NotyfiIsLand = setTimeout(function() {
            that.GetAccountInfoMap();
        }, 1000 * 45);
    };

    var timeEventSlot = 0;
    var intervalSlotRemain;
    treasure.prototype.initTimeEventSlot = function() {
        if (intervalSlotRemain)
            clearInterval(intervalSlotRemain);
        intervalSlotRemain = setInterval(remainTimeEventSlot, 1000);
    }

    function remainTimeEventSlot() {
        timeEventSlot -= 1;
        if (timeEventSlot < 0)
            timeEventSlot = 0;

        $('.button-eventSlot .bgTimeEvent span').html(formatTime(timeEventSlot, false));
        $('.button-eventSlot .infoGameSession .timeslot').html(formatTime(timeEventSlot, true));
        $('.button-eventSlot .infoGameSession .contentWaitTop .textTimeWait').html(formatTime(timeEventSlot, true));

    }

    function bindingEventSlot(data) {

        if (data == null)
            return;
        if (data.EventSlotSessionCurrent.GameStatus == 2) {
            $('.button-eventSlot').removeClass('active');
            $('.button-eventSlot .infoGameSession .contentTopEventSlot').hide();
            $('.button-eventSlot .infoGameSession .contentWaitTop').show();

            timeEventSlot = data.EventSlotSessionCurrent.RemainWaiting;
        } else {
            $('.button-eventSlot').addClass('active');
            $('.button-eventSlot .infoGameSession .contentTopEventSlot').show();
            $('.button-eventSlot .infoGameSession .contentWaitTop').hide();
            timeEventSlot = data.EventSlotSessionCurrent.RemainBetting;
        }


        $('.button-eventSlot .infoGameSession .userRank span').html(data.Rank);
        $('.button-eventSlot .infoActive .eventSession').html('#' + data.Rank);
        $('.button-eventSlot .infoGameSession .jckpotslot').html(util.ParseMoney(data.FunBank));
        var html_Aw = '';
        for (var i = 0; i < data.EventSlotRateGroups.length; i++) {
            html_Aw += '<li> <span class="rankreward">#' + data.EventSlotRateGroups[i].Rank + '</span> <span class="amountreward">' + util.ParseMoney(data.EventSlotRateGroups[i].Amount) + '</span> </li>';
        }
        $('.button-eventSlot .contenRewardEventSlot ul').html(html_Aw);



        var html_top = '';

        for (var i = 0; i < data.EventSlotTops.length; i++) {
            var className = '';
            if (data.EventSlotTops[i].Username == App.currentAccount.Nickname) {
                className = 'active';
            }
            var avatarUrl = jsConfig.urlRootStatic + '/assets/avatars/' + data.EventSlotTops[i].Avartar + '.png';
            html_top += '<li class="' + className + '"> <span class="nickname_ev">' + data.EventSlotTops[i].Username + '</span> <span class="avartar_ev"><img src="' + avatarUrl + '"/></span> <span class="rank_ev">#' + data.EventSlotTops[i].TopRank + '</span> <span class="award_ev">' + util.ParseMoney(data.EventSlotTops[i].PrizeValue) + '</span> </li>';
        }
        $('.button-eventSlot .infoGameSession .Usertable ul').html(html_top);

    }

    function formatTime(totalSeconds, ishours) {



        var hours = Math.floor((totalSeconds) / 3600);
        var minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
        var seconds = ((totalSeconds % 86400) % 3600) % 60;


        if (hours < 10)
            hours = "0" + hours;

        if (minutes < 10)
            minutes = "0" + minutes;

        if (seconds < 10)
            seconds = "0" + seconds;

        if (ishours) {
            return hours + ':' + minutes + ':' + seconds;
        } else {
            return (minutes) + ':' + seconds;
        }

    };

    window.Treasure = treasure;
})(window, jQuery);

var XCountUp = new function() {
    this.Init = function(f, g, h, j, k, l) {
        this.options = l || {
            useEasing: true,
            useGrouping: true,
            separator: '.',
            decimal: '.'
        };
        var m = 0;
        var n = ['webkit', 'moz', 'ms'];
        for (var x = 0; x < n.length && !window.requestAnimationFrame;
            ++x) {
            window.requestAnimationFrame = window[n[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[n[x] + 'CancelAnimationFrame'] ||
                window[n[x] + 'CancelRequestAnimationFrame']
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(a, b) {
                var c = new Date().getTime();
                var d = Math.max(0, 16 - (c - m));
                var e = window.setTimeout(function() {
                        a(c + d)
                    },
                    d);
                m = c + d;
                return e;
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(a) {
                clearTimeout(a);
            }
        }
        var o = this;
        this.d = (typeof f === 'string') ? document.getElementById(f) : f;
        this.startVal = Number(g);
        this.endVal = Number(h);
        this.countDown = (this.startVal > this.endVal) ? true : false;
        this.startTime = null;
        this.timestamp = null;
        this.remaining = null;
        this.frameVal = this.startVal;
        this.rAF = null;
        this.decimals = Math.max(0, j || 0);
        this.dec = Math.pow(10, this.decimals);
        this.duration = k * 1000 || 2000;
        this.easeOutExpo = function(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
        };
        this.count = function(a) {
            if (o.startTime === null) o.startTime = a;
            o.timestamp = a;
            var b = a - o.startTime;
            o.remaining = o.duration - b;
            if (o.options.useEasing) {
                if (o.countDown) {
                    var i = o.easeOutExpo(b, 0, o.startVal - o.endVal, o.duration);
                    o.frameVal = o.startVal - i
                } else {
                    o.frameVal = o.easeOutExpo(b, o.startVal, o.endVal - o.startVal, o.duration)
                }
            } else {
                if (o.countDown) {
                    var i = (o.startVal - o.endVal) * (b / o.duration);
                    o.frameVal = o.startVal - i
                } else {
                    o.frameVal = o.startVal + (o.endVal - o.startVal) * (b / o.duration)
                }
            }
            o.frameVal = Math.round(o.frameVal * o.dec) / o.dec;
            if (o.countDown) {
                o.frameVal = (o.frameVal < o.endVal) ? o.endVal : o.frameVal
            } else {
                o.frameVal = (o.frameVal > o.endVal) ? o.endVal : o.frameVal
            }
            o.d.innerHTML = o.formatNumber(o.frameVal.toFixed(o.decimals));
            if (b < o.duration) {
                o.rAF = requestAnimationFrame(o.count);
            } else {
                if (o.callback != null) o.callback()
            }
        };
        this.start = function(a) {
            o.callback = a;
            if (!isNaN(o.endVal) && !isNaN(o.startVal)) {
                o.rAF = requestAnimationFrame(o.count)
            } else {
                o.d.innerHTML = '--';
            }
            return false
        };
        this.stop = function() {
            cancelAnimationFrame(o.rAF)
        };
        this.reset = function() {
            o.startTime = null;
            cancelAnimationFrame(o.rAF);
            o.d.innerHTML = o.formatNumber(o.startVal.toFixed(o.decimals))
        };
        this.resume = function() {
            o.startTime = null;
            o.duration = o.remaining;
            o.startVal = o.frameVal;
            requestAnimationFrame(o.count);
        };
        this.formatNumber = function(a) {
            a += '';
            var x, x1, x2, rgx;
            x = a.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? o.options.decimal + x[1] : '';
            rgx = /(\d+)(\d{3})/;
            if (o.options.useGrouping) {
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + o.options.separator + '$2');
                }
            }
            return x1 + x2;
        };
        o.d.innerHTML = o.formatNumber(o.startVal.toFixed(o.decimals));
    };
};
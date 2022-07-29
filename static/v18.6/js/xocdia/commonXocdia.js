var stage;

(function(window) {
    var commonXocdia = {};
    var hubStarted = false;
    var fileLoaded = true;
    commonXocdia.hubName = "miniGameXocXocHub";
    commonXocdia.urlApi = jsConfig.connectXocdia.API;
    commonXocdia.hubs = jsConfig.connectXocdia.hubUrl;
    commonXocdia.Init = function() {
        bindInterface();
        if (hubStarted) {
            this.ShowDiceGUI();
            return;
        }
        initHub();
    };

    function initHub() {
        commonXocdia.gameConnection = $.hubConnection(commonXocdia.hubs);
        commonXocdia.gameHub = commonXocdia.gameConnection.createHubProxy(commonXocdia.hubName);
        var minitxHub = new XocdiagameHub(commonXocdia.gameHub);
        commonXocdia.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.log('Xd connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.log('Xd reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.log('Xd connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.log('Xd disconnected');
                if (hubStarted && App.currentAccount.AccountID > 0)
                    reconnectHub();
            }
        });
        try {
            commonXocdia.gameConnection.start().done(function() {
                hubStarted = true;
                luckyDiceConnect();
            }).fail(function() {
                reconnectHub();
            });
        } catch (e) {
            reconnectHub();
        }
    };

    function stopHub() {
        try {
            commonXocdia.gameConnection.stop();
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
            if (commonXocdia.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonXocdia.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }



    var temLuckyDice;

    function bindInterface() {
        if ($('#xocdia').length > 0)
            return;
        var str = '';
        if (typeof temLuckyDice == 'undefined')
            temLuckyDice = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/play.html" + version);
        temLuckyDice.setParam('MediaUrl', commonGame.mediaUrl);
        var str = jQuery.processTemplateToText(temLuckyDice);
        $('#xdCircle').append(str);
        $("#xdCircle").click(function() {
            commonGame.showGameCircle(3);
        });

        $('#xdbetpersonOver').on('keypress', function(event) {
            if (event.which === '13') {
                commonXocdia.postBet();
            }
        });
        $('#xdbetpersonUnder').on('keypress', function(event) {
            if (event.which === '13') {
                commonXocdia.postBet();
            }
        });


        commonXocdia.GameXocdia = new window.Xocdia.Game();
        commonXocdia.GameXocdia.create();
        commonXocdia.useCoinStar(commonGame.typeBet);
        $("#xocdia").mouseup(function() {
            commonGame.resetZindex();
            $("#gameCicle").addClass('active');
        });



    }

    function luckyDiceConnect() {
        try {
            commonXocdia.useCoinStar(commonGame.typeBet);
            commonXocdia.gameHub.server.GetCurrentResult().done(function() {}).fail();
        } catch (e) {}
    }

    commonXocdia.setAllowbet = function(bool) {
        commonXocdia.isBet = bool;
        if (bool == true) {
            $("#xdbetpersonOver").removeAttr('disabled');
            $("#xdbetpersonUnder").removeAttr('disabled');
        } else {
            $("#xdbetpersonOver").attr('disabled', 'disabled');
            $("#xdbetpersonUnder").attr('disabled', 'disabled');
        }
    };

    commonXocdia.showTextResult = function(sumStar, refunStar, bool) {

        var ord = "";
        if ($("#xocdia").css('display') == 'none') {
            ord = '.circle ';
            $(ord + '#prizeTaixiu').css('top', '200px');
            $(ord + '#prizeTaixiu').css('left', '200px');

            $(ord + '#prizeTaixiu').css('opacity', '1');
            $(ord + '#prizeTaixiu').show();
            if (bool === true) {
                if (sumStar > 0) {
                    var html = ' <p style="color:#ff256e"> +' + commonGame.FormatNumber(sumStar) + '</p>';
                    $(ord + '#prizeTaixiu').html(commonGame.overOrUnder >= 11 ? ("Tài " + html) : ("Xỉu " + html));
                }

            } else $(ord + '#prizeTaixiu').text(commonGame.overOrUnder >= 11 ? "Tài" : "Xỉu");
            $(ord + '#prizeTaixiu').animate({
                top: '100px',
                opacity: 0
            }, 6000);

        } else {
            commonXocdia.GameXocdia.updateAccountResult(sumStar, refunStar);
        }

    };
    commonXocdia.setTotal = function(total, istotal) {
        commonGame.overOrUnder = total;
        commonXocdia.GameXocdia.setTotal(total, istotal);


    };
    commonXocdia.reset = function() {
        $(".xd_timewaiting").hide();
        $("#totalresult").hide();
        $('#xd_totalcountBetOver').text(0);
        $('#xd_totalcountBetUnder').text(0);
        $("#xd_totalbetOver").text(0);
        $("#xd_totalbetUnder").text(0);
        $("#xd_betpersonOver").text(0);
        $("#xd_betpersonUnder").text(0);
        $("#xdbetpersonOver").val(0);
        $("#xdbetpersonUnder").val(0);
        $('.xocdia-game-block .location').removeClass('active');

        $('#xocdia .tips').hide();
        console.log('Reset');
    };

    var timeMessTx;
    commonXocdia.showMessage = function(message) {

        var msg = $(".messageXd");
        msg.show();
        msg.html(message);
        clearTimeout(timeMessTx);
        timeMessTx = setTimeout(function() {
            msg.hide();
        }, 5000);
    };
    commonXocdia.postBet = function() {

        var valuesOver = $("#xdbetpersonOver").val().split('.');
        var numIntOver = '';
        for (var i = 0; i < valuesOver.length; i++) {
            numIntOver += '' + valuesOver[i];
        }

        var valuesUnder = $("#xdbetpersonUnder").val().split('.');
        var numIntUnder = '';
        for (var i = 0; i < valuesUnder.length; i++) {
            numIntUnder += '' + valuesUnder[i];
        }



        var betOver = parseInt(numIntOver) || 0;
        var betUnder = parseInt(numIntUnder) || 0;
        if ((betOver === 0 && betUnder === 0)) {
            commonXocdia.showMessage("Vui lòng đặt cửa");
            return;
        }
        if ((betOver > 0 && betUnder > 0)) {
            commonXocdia.showMessage("Không đặt 2 cửa một phiên");
            return;
        }
        var betType = commonGame.typeBet;
        var locationId = (betOver > 0 ? 2 : 1);
        var betValue = (betOver > 0 ? betOver : betUnder);
        if (betType === 2) {
            try {
                var sumBet = betValue;
                if (sumBet > 100000000) {
                    commonXocdia.showMessage("Giá trị đặt cửa không hợp lệ");
                    return;
                }
            } catch (e) {}
        }

        commonXocdia.gameHub.server.setBet(betType, locationId, betValue).done(function(responseStatus) {
            if (responseStatus >= 0) {
                $("#xdbetpersonOver").val('');
                $("#xdbetpersonUnder").val('');
            } else {
                switch (responseStatus) {
                    case -207:
                        commonXocdia.showMessage("Hết thời gian đặt cửa");
                        return;
                    case -208:
                        commonXocdia.showMessage("Không đặt 2 cửa một phiên");
                        console.log('dat 2 cua trong mot phong');
                        return;
                    case -212:
                        commonXocdia.showMessage("Giá trị đặt cửa không hợp lệ");
                        console.log('gia tri dat cua khong hop le <0 > 2tr');
                        return;
                    case -232:
                        commonXocdia.showMessage("Cửa đăt không hợp lệ");
                        return;
                    case -99:
                        commonXocdia.showMessage("Hệ thống gián đoạn");
                        return;
                    case -51:
                        commonXocdia.showMessage("Số dư không đủ");
                        return;
                    case -102:
                        commonXocdia.showMessage("Hệ thống gián đoạn");
                        return;
                    case -88:
                        return;
                    default:
                        commonXocdia.showMessage("Hệ thống gián đoạn");
                        return;
                }
            }

        }).fail(function() {});
    };

    commonXocdia.ShowDiceGUI = function() {
        if (!fileLoaded || !hubStarted) {
            commonXocdia.Init();

        }
        $('#gameCicle').show();
        $('.ic-tx').addClass('active');
        commonGame.resetZindex();
        $("#gameCicle").addClass('active');

    };
    commonXocdia.HideDiceGUI = function() {
        $('#gameCicle').hide();
        $('.ic-tx').removeClass('active');

    };
    commonXocdia.HideButton = function() {
        $('#xocdia .mini_close').hide();
        $('#xocdia .mini_help').hide();
        $('#xocdia .mini_rank').hide();
        $('#xocdia .mini_history').hide();
        $('#xocdia .mini_static').hide();
        $('#xocdia .mini_nan').hide();
        $('#xocdia .mini_chat').hide();
        commonXocdia.GameXocdia.title.visible = false;
        $('#xocdiasetfastID').hide();
        showHideStatistics(0);


    }
    commonXocdia.ShowButton = function() {
        $('#xocdia .mini_close').show();
        $('#xocdia .mini_help').show();
        $('#xocdia .mini_rank').show();
        $('#xocdia .mini_history').show();
        $('#xocdia .mini_static').show();
        $('#xocdia .mini_nan').show();
        $('#xocdia .mini_chat').show();
        commonXocdia.GameXocdia.title.visible = true;
    }


    commonXocdia.useCoinStar = function(type) {
        commonGame.typeBet = type;
        GetCurrentRooms();


    };
    commonXocdia.UpdateRoomInfo = function(data) {

        if (data.length > 0 && data != null && data[0] != '' && data[0] != undefined && data[0].BetType == commonGame.typeBet) {
            var over = 0,
                under = 0;
            over = data[0].TotalBetValue2;
            under = data[0].TotalBetValue1;

            $('#xd_totalcountBetOver').html(data[0].TotalAccount2);
            $("#xd_totalbetOver").html(commonGame.FormatNumber(over));

            $('#xd_totalcountBetUnder').html(data[0].TotalAccount1);
            $("#xd_totalbetUnder").html(commonGame.FormatNumber(under));



        }
    };
    commonXocdia.UpdateSession = function(data) {
        if (data != null) {
            commonXocdia.currentSession = data;
            commonXocdia.gameSession = data.GameSessionID;
            $('.sessionXocdia').html('#' + data.GameSessionID);

        }
    };
    commonXocdia.UpdateResult = function(data) {
        if (data != null && data.Chip1 > 0) {
            commonXocdia.GameXocdia.showResult(data);
        } else {
            try {
                commonXocdia.gameHub.server.GetCurrentResult().done(function() {}).fail();
            } catch (e) {

            }
        }
    }
    commonXocdia.UpdateBetOfAccount = function(data, balance) {
        var betUnder = 0,
            betOver = 0;
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].LocationID == 1) //xiu
                    betUnder += parseInt(data[i].BetValue);
                else
                    betOver += parseInt(data[i].BetValue);
            }
        }

        $('#xd_betpersonOver').html(util.ParseMoney(betOver));
        $('#xd_betpersonUnder').html(util.ParseMoney(betUnder));


        if (balance > -1 && App && App.currentAccount) {
            libAccount.UpdateBalance(2, balance);

        }

    };
    commonXocdia.ResultOfAccount = function(data) {
        var sumGold = 0;
        var refundvalueGold = 0;
        var winner = false;
        if (data.length > 0 && data != null && data[0] != '' && data[0] != undefined) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].BetType == 1) {
                    sumGold = data[i].PrizeValue;
                    refundvalueGold += data[i].RefundValue;
                }

            }
            if (sumGold > 0)
                winner = true;
        }
        commonXocdia.showTextResult(sumGold, refundvalueGold, winner);
        if (App && App.currentAccount) {
            libAccount.UpdateBalance(2, sumGold + refundvalueGold, 2);
        }

    };



    commonXocdia.ShowGameHistory = function(data) {
        if (data != null) {
            commonXocdia.gameHistory = data;
            if (commonXocdia.isShowStatitics) updateStatitics();
            var s = '';
            for (var i = data.length - 1; i >= 0; i--) {
                var c = '';
                if (data[i].LocationIDWin == 2) //tai
                {
                    c = 'tai';

                } else {

                    c = 'xiu';


                }
                if (i == 0) c += ' active select';
                s += ' <li class="' + c + ' ' + data[i].GameSessionID + '"    data-value="' + encodeURIComponent(JSON.stringify(data[i])) + '"></li>';

            }
            $("#xd_gamehisId").html(s);
            $("#xd_gamehisId li").click(function() {
                commonXocdia.sessionData = JSON.parse(decodeURIComponent($(this).data('value')));
                commonXocdia.showSessionDetail(commonGame.typeBet);

            });
            if (commonXocdia.sessionData && commonXocdia.sessionData.GameSessionID) {
                if ($('#xd_gamehisId li.' + commonXocdia.sessionData.GameSessionID).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
                else $('#txSessionPrev').attr('disabled', false);
                if ($('#xd_gamehisId li.' + commonXocdia.sessionData.GameSessionID).is(':last-child')) $('#txSessionNext').attr('disabled', true);
                else $('#txSessionNext').attr('disabled', false);
            }
        }
    };

    function GetCurrentRooms() {
        try {
            commonXocdia.gameHub.server.getCurrentRooms(commonGame.typeBet).done(function() {}).fail();
        } catch (e) {}
    };

    var temSessionDetail;
    commonXocdia.showSessionDetail = function(type) {
        commonGame.showPopup();
        if (typeof temSessionDetail == 'undefined') temSessionDetail = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/sessionDetail.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temSessionDetail));
        commonXocdia.type = type;
        commonGame.cacheData = null;
        getSessionDetail();
        commonGame.setActiveTab(commonXocdia.type);

    }

    function getSessionDetail() {
        var b = commonXocdia.sessionData.GameSessionID;
        $('#xdSessionID').text(b);
        $('#xdResultChip1').removeClass();
        $('#xdResultChip1').addClass('num-' + commonXocdia.sessionData.Chip1);
        $('#xdResultChip2').removeClass();
        $('#xdResultChip2').addClass('num-' + commonXocdia.sessionData.Chip2);
        $('#xdResultChip3').removeClass();
        $('#xdResultChip3').addClass('num-' + commonXocdia.sessionData.Chip3);
        $('#xdResultChip4').removeClass();
        $('#xdResultChip4').addClass('num-' + commonXocdia.sessionData.Chip4);


        $("#xd_gamehisId li").removeClass('select');
        $('#xd_gamehisId li.' + b).addClass('select');
        if ($('#xd_gamehisId li.' + b).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
        else $('#txSessionPrev').attr('disabled', false);
        if ($('#xd_gamehisId li.' + b).is(':last-child')) $('#txSessionNext').attr('disabled', true);
        else $('#txSessionNext').attr('disabled', false);
        $('#xdDetails .location').removeClass('active');
        if (commonXocdia.sessionData.LocationIDWin == 1) $('#xdDetails .location.xiu').addClass('active');
        else $('#xdDetails .location.tai').addClass('active');


        libs.PostData(commonXocdia.urlApi + "GetBetDetails/?SessionID=" + b + "&BetType=" + commonXocdia.type + "&r=" + Math.random(), {},
            function(data) {
                if (data != null) {
                    commonGame.cacheData = data;
                    bindSessionDetail(1);
                    console.log(data);
                }
            },
            function(xhr, ajaxOptions, thrownError) {

            });



    }

    function bindSessionDetail(current) {
        var data = commonGame.cacheData;
        var dataTai = [],
            dataXiu = [];
        var tongDatTai = 0,
            tongDatXiu = 0,
            tongHoanTai = 0,
            tongHoanXiu = 0;
        $.each(data, function(i, a) {
            if (a.LocationID == 1) {
                dataXiu.push(a);
                tongDatXiu += a.BetValue;
                tongHoanXiu += a.RefundValue;
            } else {
                dataTai.push(a);
                tongDatTai += a.BetValue;
                tongHoanTai += a.RefundValue;
            }
        });

        var lengmax = dataTai.length > dataXiu.length ? dataTai.length : dataXiu.length;

        var rowperPageSession = 8;
        var itemTaidataBind = dataTai.slice((current - 1) * rowperPageSession, current * rowperPageSession);
        var itemXiudataBind = dataXiu.slice((current - 1) * rowperPageSession, current * rowperPageSession);

        var htmlXiu = '';
        htmlXiu += '<tr>';
        htmlXiu += '<td align= "left"  width="30%"> Đặt</td >';
        htmlXiu += '<td align="center"  width="30%">Hoàn</td>';
        htmlXiu += '<td align="center">Tên</td>';
        htmlXiu += '<td align="center">TG</td>';
        htmlXiu += '</tr >';

        for (var j = 0; j < itemXiudataBind.length; j++) {
            htmlXiu += '<tr>';
            htmlXiu += '<td align="left"  width="30%" class="t-pink"> ' + commonGame.FormatNumber(itemXiudataBind[j].BetValue) + '</td >';
            htmlXiu += '<td align="center"  width="30%" class="t-pink3">' + commonGame.FormatNumber(itemXiudataBind[j].RefundValue) + '</td>';
            htmlXiu += '<td align="center">' + itemXiudataBind[j].Nickname + '</td>';
            htmlXiu += '<td align="center">' + commonGame.formDateTimehmsType(itemXiudataBind[j].CreatedTime, 2) + '</td>';
            htmlXiu += '</tr >';
        }

        var lengXiu = 8 - itemXiudataBind.length;

        for (var k = 0; k < lengXiu; k++) {

            htmlXiu += '<tr>';
            htmlXiu += '<td align= "left"  width="30%"> </td >';
            htmlXiu += '<td align="center"  width="30%"> </td>';
            htmlXiu += '<td align="center"></td>';
            htmlXiu += '<td align="center"></td>';
            htmlXiu += '</tr >';
        }


        htmlXiu += '<tr>';
        htmlXiu += '<td align= "left" class="t-pink"  width="30%"> ' + commonGame.FormatNumber(tongDatXiu) + '</td >';
        htmlXiu += '<td align="center" class="t-pink3"  width="30%"> ' + commonGame.FormatNumber(tongHoanXiu) + '</td>';
        htmlXiu += '<td align="center"></td>';
        htmlXiu += '<td align="center"></td>';
        htmlXiu += '</tr >';
        $('#itemXiu').html(htmlXiu);

        var htmlTai = '';
        htmlTai += '<tr>';
        htmlTai += '<td align= "center" > TG</td >';
        htmlTai += '<td align="center">Tên</td>';
        htmlTai += '<td align="center"  width="30%">Hoàn</td>';
        htmlTai += '<td align="right"  width="30%">Đặt</td>';
        htmlTai += '</tr >';

        for (var j = 0; j < itemTaidataBind.length; j++) {
            htmlTai += '<tr>';
            htmlTai += '<td align="center"> ' + commonGame.formDateTimehmsType(itemTaidataBind[j].CreatedTime, 2) + '</td >';
            htmlTai += '<td align="center">' + itemTaidataBind[j].Nickname + '</td>';
            htmlTai += '<td align="center"  class="t-pink3"  width="30%">' + commonGame.FormatNumber(itemTaidataBind[j].RefundValue) + '</td>';
            htmlTai += '<td align="right" class="t-pink"  width="30%">' + commonGame.FormatNumber(itemTaidataBind[j].BetValue) + '</td>';
            htmlTai += '</tr >';
        }

        var lengTai = 8 - itemTaidataBind.length;

        for (var k = 0; k < lengTai; k++) {

            htmlTai += '<tr>';
            htmlTai += '<td align="center" > </td >';
            htmlTai += '<td align="center"></td>';
            htmlTai += '<td align="center"  width="30%"></td>';
            htmlTai += '<td align="right"  width="30%"></td>';
            htmlTai += '</tr >';
        }

        htmlTai += '<tr>';
        htmlTai += '<td align="center"> </td >';
        htmlTai += '<td align="center"></td>';
        htmlTai += '<td align="center"  class="t-pink3"  width="30%">' + commonGame.FormatNumber(tongHoanTai) + '</td>';
        htmlTai += '<td align="right" class="t-pink"  width="30%">' + commonGame.FormatNumber(tongDatTai) + '</td>';
        htmlTai += '</tr >';
        $('#itemTai').html(htmlTai);

        commonGame.pageCount = Math.ceil(lengmax / rowperPageSession);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonGame.pageCount,
            buttonClickCallback: bindSessionDetail
        });






    }
    //Statitics
    var tempStatitics;
    commonXocdia.showStatitics = function() {
        if (typeof tempStatitics == 'undefined') tempStatitics = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/statitics.html" + version);
        if ($('.xocdia-game-block .left-statistic-tx').hasClass('active') || $('.xocdia-game-block .right-statistic-tx').hasClass('active')) {
            showHideStatistics(0);
            return;
        }
        updateStatitics();
    }

    function showHideStatistics(type) {
        if (type == 1) {
            commonXocdia.isShowStatitics = true;
            $('.xocdia-game-block .left-statistic-tx').addClass('active');
            $('.xocdia-game-block .right-statistic-tx').removeClass('active');
        } else if (type == 2) {
            commonXocdia.isShowStatitics = true;
            $('.xocdia-game-block .left-statistic-tx').removeClass('active');
            $('.xocdia-game-block .right-statistic-tx').addClass('active');
        } else {
            $('.xocdia-game-block .left-statistic-tx').removeClass('active');
            $('.xocdia-game-block .right-statistic-tx').removeClass('active');
            commonXocdia.isShowStatitics = false;
        }
    }

    var chart1, chart2;

    function updateStatitics() {

        $.ajax({
            type: "POST",
            url: commonXocdia.urlApi + "GetStatitics/?r=" + Math.random(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(result) {

                result.LastSession = commonXocdia.gameHistory != null ? commonXocdia.gameHistory[0] : {};
                $('.xocdia-game-block .statistic-tx').html(jQuery.processTemplateToText(tempStatitics, result));
                $('.xocdia-game-block .statistic-tx .close-statistic-tx').click(function() {
                    showHideStatistics(0);
                });
                $('.xocdia-game-block .statistic-tx .arrow-left').click(function() {
                    showHideStatistics(1);
                });
                $('.xocdia-game-block .statistic-tx .arrow-right').click(function() {
                    showHideStatistics(2);
                });
                $('.xocdia-game-block .statistic-tx .tabright-statistic-tx input').change(function() {
                    var p = parseInt($(this).data('value'));
                    if (p == 0 && chart1) {
                        chart1.options.data[p].visible = $(this).prop('checked');
                        chart1.render();
                    } else if (chart2) {
                        chart2.options.data[p].visible = $(this).prop('checked');
                        chart2.render();
                    }
                });

            }
        });


    }

    var temhelpTX;
    commonXocdia.showGuide = function() {
        commonGame.showPopup();
        if (typeof temhelpTX == 'undefined')
            temhelpTX = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/popHelp.html" + version);
        //temhelpTX.setParam('MediaUrl', commonGame.mediaUrl);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temhelpTX));
        $("#helpcommonXoc").slimScroll({
            width: '100%',
            height: '566px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });
    };



    var temHistoryItem;
    var temHistory;
    commonXocdia.showHisCusStar = function(type) {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/popHistory.html" + version);
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/historyItem.html" + version);
        temHistory.setParam('MediaUrl', commonGame.mediaUrl);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));

        commonGame.typeHis = type;
        commonGame.cacheData = null;
        getHistory(1);
        commonGame.setActiveTab(commonGame.typeHis);

    };

    function getHistory(current) {
        if (commonGame.cacheData == null && commonGame.cacheData != '') {
            libs.GetData(commonXocdia.urlApi + "GetAccountHistory/?BetType=" + commonGame.typeHis + "&TopCount=500&r=" + Math.random(), {},
                function(data) {
                    if (data != null) {
                        commonGame.cacheData = data;
                        bindHistory(current);
                    }
                },
                function(xhr, ajaxOptions, thrownError) {

                });

        } else {
            bindHistory(current);
        }
    };

    function bindHistory(current) {
        $("#itemHis").html(jQuery.processTemplateToText(temHistoryItem, commonGame.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonGame.pageCount = Math.ceil(commonGame.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonGame.pageCount,
            buttonClickCallback: bindHistory
        });
    };

    var temRank;

    commonXocdia.showRank = function() { //1xu2g
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xocdia/popRank.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        bindRank(1);
        commonGame.setActiveTab(1);

    };

    function bindRank(type) {
        libs.GetData(commonXocdia.urlApi + "GetTopDailyWinners?BetType=" + type + "&TopCount=10&r=" + Math.random(), {},
            function(data) {
                if (data != null) {


                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<tr>';

                        var classTop = 'topRankTx';
                        if (i < 3) {
                            classTop = 'topRankTx' + (i + 1);
                            html += '<td align= "center" width= "30%" > <span class=' + classTop + '></span></td >';
                        } else {
                            html += '<td align= "center" width= "30%" > <span class=' + classTop + '>' + (i + 1) + '</span></td >';
                        }
                        html += '<td align="center" width="30%" style="font-size: 28px;">' + data[i].Username + '</td>';
                        html += '<td align="center" width="30%" class="money-1" style="font-size: 28px;">' + commonGame.FormatNumber(data[i].PrizeValue) + '</td>';
                        html += '</tr >';
                    }
                    $("#itemRank").html(html);
                }
            },
            function(xhr, ajaxOptions, thrownError) {

            });



    };





    commonXocdia.onChangeInputValidate = function(e) {
        e.value = e.value.replace(/[^0-9\.]/g, '');
        if (e.value == '') {
            // $('.tipBet').text('0');
        } else {
            //$('.tipBet').text(commonGame.FormatNumber(e.value));
        }

        var values = e.value.split('.');
        var value = '';
        for (var i = 0; i < values.length; i++) {
            value += '' + values[i];
        }


        var onkeyvalue = parseInt(value);
        if (onkeyvalue > 0) {
            e.value = commonGame.FormatNumber(onkeyvalue);
        } else {

        }

        if (e.id == 'xdbetpersonOver')
            $('#xdbetpersonUnder').val(0);
        else if (e.id == 'xdbetpersonUnder')
            $('#xdbetpersonOver').val(0);
    };

    var locationOverUnder = 0;

    commonXocdia.onFocus = function(e) {
        commonXocdia.clickAll();
        if (e.value == '0' || e.value == '') {
            e.value = '';
        }

        $('#xocdiasetfastID').show();

        if (e.id == 'xdbetpersonOver') {
            locationOverUnder = 2;
            $('#xdbetpersonUnder').val(0);
        } else if (e.id == 'xdbetpersonUnder') {
            locationOverUnder = 1;
            $('#xdbetpersonOver').val(0);
        }

    };
    commonXocdia.onBlur = function(e) {
        if (e.value == '') {
            e.value = '0';
        }

    };

    commonXocdia.onClickTabfast = function() {
        if ($('.bt_shortcutkey').hasClass('active')) {
            $('.bt_shortcutkey').removeClass('active');
            $('#xocdiasetfastID .numfast').show();
            $('#xocdiasetfastID .numfast_other').hide();

        } else {
            $('.bt_shortcutkey').addClass('active');
            $('#xocdiasetfastID .numfast').hide();
            $('#xocdiasetfastID .numfast_other').show();
        }
    };

    commonXocdia.onClickBetfast = function(value) {

        if (locationOverUnder === 1) {


            if (value === -1) {
                $("#xdbetpersonUnder").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }


            var values = $("#xdbetpersonUnder").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betUnder = parseInt(numInt) || 0;
            betUnder += value;
            if (betUnder > 100000000)
                betUnder = 100000000;
            $("#xdbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {
            if (value === -1) {
                $("#xdbetpersonOver").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }

            var values = $("#xdbetpersonOver").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betOver = parseInt(numInt) || 0;
            betOver += value;
            if (betOver > 100000000)
                betOver = 100000000;

            $("#xdbetpersonOver").val(commonGame.FormatNumber(betOver));

        }

    }

    commonXocdia.onClickBetfastOther = function(value) {

        if (locationOverUnder === 1) {




            var values = $("#xdbetpersonUnder").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            if (value === -1) {
                numInt = numInt.slice(0, -1);
            } else if (value === -2) {
                numInt += '000';
            } else {
                numInt += '' + value;
            }

            var betUnder = parseInt(numInt) || 0;
            if (betUnder > 100000000)
                betUnder = 100000000;
            $("#xdbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {

            var values = $("#xdbetpersonOver").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            if (value === -1) {
                numInt = numInt.slice(0, -1);
            } else if (value === -2) {
                numInt += '000';
            } else {
                numInt += '' + value;
            }

            var betUnder = parseInt(numInt) || 0;
            if (betUnder > 100000000)
                betUnder = 100000000;
            $("#xdbetpersonOver").val(commonGame.FormatNumber(betUnder));

        }
    };

    commonXocdia.onClickcancelfast = function() {
        $("#xdbetpersonUnder").val(0);
        $("#xdbetpersonOver").val(0);
        $('#xocdiasetfastID').hide();
        $("#xdbetpersonUnder").blur();
        $("#xdbetpersonOver").blur();

    };

    commonXocdia.blink = function(id, type, time, interval) {
        var timer = window.setInterval(function() {
            $("#" + id).css("background", "url(" + commonGame.mediaUrl + "images/dice-icon-star.png) no-repeat");
            $("#" + id).css("opacity", "1");
            window.setTimeout(function() {
                $("#" + id).css("background", "url(" + commonGame.mediaUrl + "images/dice-icon-normal.png) no-repeat");
            }, 700);
        }, interval);
        window.setTimeout(function() {
            clearInterval(timer);
            $("#" + id).css("opacity", ".2");
        }, time);
    };

    commonXocdia.clickAll = function() {

    };
    window.commonXocdia = commonXocdia;
})(window);
var stage;

(function(window) {
    var commonDragon = {};
    var hubStarted = false;
    var fileLoaded = true;
    commonDragon.hubName = "miniGameDragonHub";
    commonDragon.urlApi = jsConfig.connectDragon.API;
    commonDragon.hubs = jsConfig.connectDragon.hubUrl;
    commonDragon.Init = function() {
        bindInterface();
        if (hubStarted) {
            this.ShowDiceGUI();
            return;
        }
        initHub();
    };

    function initHub() {
        commonDragon.gameConnection = $.hubConnection(commonDragon.hubs);
        commonDragon.gameHub = commonDragon.gameConnection.createHubProxy(commonDragon.hubName);
        var minidragonHub = new DragongameHub(commonDragon.gameHub);
        commonDragon.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.log('Dragon connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.log('Dragon reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.log('Dragon connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.log('Dragon disconnected');
                if (hubStarted && App.currentAccount.AccountID > 0)
                    reconnectHub();
            }
        });
        try {
            commonDragon.gameConnection.start().done(function() {
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
            commonDragon.gameConnection.stop();
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
            if (commonDragon.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonDragon.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }



    var temLuckyDice;

    function bindInterface() {
        if ($('#dragon').length > 0)
            return;
        var str = '';
        if (typeof temLuckyDice == 'undefined')
            temLuckyDice = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/play.html" + version);
        temLuckyDice.setParam('MediaUrl', commonGame.mediaUrl);
        var str = jQuery.processTemplateToText(temLuckyDice);
        $('#drCircle').append(str);

        $("#dragon").click(function() {
            commonGame.showGameCircle(2);
        });


        $('#drbetpersonOver').on('keypress', function(event) {
            if (event.which === '13') {
                commonDragon.postBet();
            }
        });
        $('#drbetpersonUnder').on('keypress', function(event) {
            if (event.which === '13') {
                commonDragon.postBet();
            }
        });


        commonDragon.GameDragon = new window.Dragon.Game();
        commonDragon.GameDragon.create();
        commonDragon.useCoinStar(commonGame.typeBet);
        $("#dragon").mouseup(function() {
            commonGame.resetZindex();
            $("#gameCicle").addClass('active');
        });




    }

    function luckyDiceConnect() {
        try {
            commonDragon.useCoinStar(commonGame.typeBet);
            commonDragon.gameHub.server.GetCurrentResult().done(function() {}).fail();
        } catch (e) {}
    }

    commonDragon.setAllowbet = function(bool) {
        commonDragon.isBet = bool;
        if (bool == true) {
            $("#drbetpersonOver").removeAttr('disabled');
            $("#drbetpersonUnder").removeAttr('disabled');
        } else {
            $("#drbetpersonOver").attr('disabled', 'disabled');
            $("#drbetpersonUnder").attr('disabled', 'disabled');
        }
    };

    commonDragon.showTextResult = function(sumStar, refunStar, bool) {

        var ord = "";
        if ($("#dragon").css('display') == 'none') {
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
            commonDragon.GameDragon.updateAccountResult(sumStar, refunStar);
        }

    };
    commonDragon.setTotal = function(cardvalue1, cardvalue2, locationId) {
        commonGame.overOrUnder = locationId;
        commonDragon.GameDragon.setTotal(cardvalue1, cardvalue2, locationId);


    };
    commonDragon.displayCard = function(id) {
        id = "," + id + ",";
        id = id.replace(/ /g, "");
        for (var i = 0; i < 52; i++) {
            if (i < 8) {
                id = id.replace("," + (i) + ",", "," + (i + 2) + "♠,");
            }

            if (i > 12 && i <= 20) {
                id = id.replace("," + (i) + ",", "," + (i - 11) + "♣,");
            }

            if (i > 25 && i <= 33) {
                id = id.replace("," + (i) + ",", "," + (i - 24) + "♦,");
            }

            if (i > 38 && i <= 46) {
                id = id.replace("," + (i) + ",", "," + (i - 37) + "♥,");
            }
            switch (i) {
                case 8:
                    id = id.replace(",8,", ",10♠,");
                case 9:
                    id = id.replace(",9,", ",J♠,");
                case 10:
                    id = id.replace(",10,", ",Q♠,");
                case 11:
                    id = id.replace(",11,", ",K♠,");
                case 12:
                    id = id.replace(",12,", ",A♠,");
                case 21:
                    id = id.replace(",21,", ",10♣,");
                case 22:
                    id = id.replace(",22,", ",J♣,");
                case 23:
                    id = id.replace(",23,", ",Q♣,");
                case 24:
                    id = id.replace(",24,", ",K♣,");
                case 25:
                    id = id.replace(",25,", ",A♣,");
                case 34:
                    id = id.replace(",34,", ",10♦,");
                case 35:
                    id = id.replace(",35,", ",J♦,");
                case 36:
                    id = id.replace(",36,", ",Q♦,");
                case 37:
                    id = id.replace(",37,", ",K♦,");
                case 38:
                    id = id.replace(",38,", ",A♦,");
                case 47:
                    id = id.replace(",47,", ",10♥,");
                case 48:
                    id = id.replace(",48,", ",J♥,");
                case 49:
                    id = id.replace(",49,", ",Q♥,");
                case 50:
                    id = id.replace(",50,", ",K♥,");
                case 51:
                    id = id.replace(",51,", ",A♥,");
            }
        }

        return id.replace(/,/g, "");
    };


    commonDragon.reset = function() {
        $(".dr_timewaiting").hide();
        $("#totalresult").hide();
        $('#dr_totalcountBetOver').text(0);
        $('#dr_totalcountBetUnder').text(0);
        $("#dr_totalbetOver").text(0);
        $("#dr_totalbetUnder").text(0);
        $("#dr_betpersonOver").text(0);
        $("#dr_betpersonUnder").text(0);
        $("#drbetpersonOver").val(0);
        $("#drbetpersonUnder").val(0);
        $('.dragon-game-block .location').removeClass('active');
        $('.drcardvalue').hide();
        $('#dragon .tips').hide();
        console.log('Reset');
        $('#dragon .tipsoverlayCard1').show();
        $('#dragon .tipsoverlayCard2').show();
    };

    var timeMessTx;
    commonDragon.showMessage = function(message) {

        var msg = $(".messageDr");
        msg.show();
        msg.html(message);
        clearTimeout(timeMessTx);
        timeMessTx = setTimeout(function() {
            msg.hide();
        }, 5000);
    };
    commonDragon.postBet = function() {

        var valuesOver = $("#drbetpersonOver").val().split('.');
        var numIntOver = '';
        for (var i = 0; i < valuesOver.length; i++) {
            numIntOver += '' + valuesOver[i];
        }

        var valuesUnder = $("#drbetpersonUnder").val().split('.');
        var numIntUnder = '';
        for (var i = 0; i < valuesUnder.length; i++) {
            numIntUnder += '' + valuesUnder[i];
        }



        var betOver = parseInt(numIntOver) || 0;
        var betUnder = parseInt(numIntUnder) || 0;
        if ((betOver === 0 && betUnder === 0)) {
            commonDragon.showMessage("Vui lòng đặt cửa");
            return;
        }
        if ((betOver > 0 && betUnder > 0)) {
            commonDragon.showMessage("Không đặt 2 cửa một phiên");
            return;
        }
        var betType = commonGame.typeBet;
        var locationId = (betOver > 0 ? 2 : 1);
        var betValue = (betOver > 0 ? betOver : betUnder);
        if (betType === 2) {
            try {
                var sumBet = betValue;
                if (sumBet > 100000000) {
                    commonDragon.showMessage("Giá trị đặt cửa không hợp lệ");
                    return;
                }
            } catch (e) {}
        }

        commonDragon.gameHub.server.setBet(betType, locationId, betValue).done(function(responseStatus) {
            if (responseStatus >= 0) {
                $("#drbetpersonOver").val('');
                $("#drbetpersonUnder").val('');
            } else {
                switch (responseStatus) {
                    case -207:
                        commonDragon.showMessage("Hết thời gian đặt cửa");
                        return;
                    case -208:
                        commonDragon.showMessage("Không đặt 2 cửa một phiên");
                        console.log('dat 2 cua trong mot phong');
                        return;
                    case -212:
                        commonDragon.showMessage("Giá trị đặt cửa không hợp lệ");
                        console.log('gia tri dat cua khong hop le <0 > 2tr');
                        return;
                    case -232:
                        commonDragon.showMessage("Cửa đăt không hợp lệ");
                        return;
                    case -99:
                        commonDragon.showMessage("Hệ thống gián đoạn");
                        return;
                    case -51:
                        commonDragon.showMessage("Số dư không đủ");
                        return;
                    case -102:
                        commonDragon.showMessage("Hệ thống gián đoạn");
                        return;
                    case -88:
                        return;
                    default:
                        commonDragon.showMessage("Hệ thống gián đoạn");
                        return;
                }
            }

        }).fail(function() {});
    };

    commonDragon.ShowDiceGUI = function() {
        if (!fileLoaded || !hubStarted) {
            commonDragon.Init();

        }
        $('#gameCicle').show();
        $('.ic-tx').addClass('active');
        commonGame.resetZindex();
        $("#gameCicle").addClass('active');

    };
    commonDragon.HideDiceGUI = function() {
        $('#gameCicle').hide();
        $('.ic-tx').removeClass('active');

    };
    commonDragon.HideButton = function() {
        $('#dragon .mini_close').hide();
        $('#dragon .mini_help').hide();
        $('#dragon .mini_rank').hide();
        $('#dragon .mini_history').hide();
        $('#dragon .mini_static').hide();
        $('#dragon .mini_nan').hide();
        $('#dragon .mini_chat').hide();
        commonDragon.GameDragon.title.visible = false;
        $('#dragonsetfastID').hide();
        showHideStatistics(0);


    }
    commonDragon.ShowButton = function() {
        $('#dragon .mini_close').show();
        $('#dragon .mini_help').show();
        $('#dragon .mini_rank').show();
        $('#dragon .mini_history').show();
        $('#dragon .mini_static').show();
        $('#dragon .mini_nan').show();
        $('#dragon .mini_chat').show();
        commonDragon.GameDragon.title.visible = true;
    }






    commonDragon.useCoinStar = function(type) {
        commonGame.typeBet = type;
        GetCurrentRooms();


    };
    commonDragon.UpdateRoomInfo = function(data) {

        if (data.length > 0 && data != null && data[0] != '' && data[0] != undefined && data[0].BetType == commonGame.typeBet) {
            var over = 0,
                under = 0;
            over = data[0].TotalBetValue2;
            under = data[0].TotalBetValue1;

            $('#dr_totalcountBetOver').html(data[0].TotalAccount2);
            $("#dr_totalbetOver").html(commonGame.FormatNumber(over));

            $('#dr_totalcountBetUnder').html(data[0].TotalAccount1);
            $("#dr_totalbetUnder").html(commonGame.FormatNumber(under));



        }
    };
    commonDragon.UpdateSession = function(data) {
        if (data != null) {
            commonDragon.currentSession = data;
            commonDragon.gameSession = data.GameSessionID;
            $('.sessionDragon').html('#' + data.GameSessionID);

        }
    };
    commonDragon.UpdateResult = function(data) {
        if (data != null && data.CardValue1 > 0) {
            commonDragon.GameDragon.showResult(data);
        } else {
            try {
                commonDragon.gameHub.server.GetCurrentResult().done(function() {}).fail();
            } catch (e) {

            }
        }
    }
    commonDragon.UpdateBetOfAccount = function(data, balance) {
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

        $('#dr_betpersonOver').html(util.ParseMoney(betOver));
        $('#dr_betpersonUnder').html(util.ParseMoney(betUnder));


        if (balance > -1 && App && App.currentAccount) {
            libAccount.UpdateBalance(2, balance);

        }

    };
    commonDragon.ResultOfAccount = function(data) {
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
        commonDragon.showTextResult(sumGold, refundvalueGold, winner);
        if (App && App.currentAccount) {
            libAccount.UpdateBalance(2, sumGold + refundvalueGold, 2);
        }

    };



    commonDragon.ShowGameHistory = function(data) {
        if (data != null) {
            commonDragon.gameHistory = data;
            if (commonDragon.isShowStatitics) updateStatitics();
            var s = '';
            for (var i = data.length - 1; i >= 0; i--) {
                var c = '';
                if (data[i].LocationIDWin == 2) //tai
                {
                    c = 'tai';

                } else if (data[i].LocationIDWin === 1) {

                    c = 'xiu';


                } else {
                    c = 'hoa';
                }
                if (i == 0) c += ' active select';
                s += ' <li class="' + c + ' ' + data[i].GameSessionID + '"    data-value="' + encodeURIComponent(JSON.stringify(data[i])) + '"></li>';

            }
            $("#dr_gamehisId").html(s);
            $("#dr_gamehisId li").click(function() {
                commonDragon.sessionData = JSON.parse(decodeURIComponent($(this).data('value')));
                commonDragon.showSessionDetail(commonGame.typeBet);

            });
            if (commonDragon.sessionData && commonDragon.sessionData.GameSessionID) {
                if ($('#dr_gamehisId li.' + commonDragon.sessionData.GameSessionID).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
                else $('#txSessionPrev').attr('disabled', false);
                if ($('#dr_gamehisId li.' + commonDragon.sessionData.GameSessionID).is(':last-child')) $('#txSessionNext').attr('disabled', true);
                else $('#txSessionNext').attr('disabled', false);
            }
        }
    };

    function GetCurrentRooms() {
        try {
            commonDragon.gameHub.server.getCurrentRooms(commonGame.typeBet).done(function() {}).fail();
        } catch (e) {}
    };

    var temSessionDetail;
    commonDragon.showSessionDetail = function(type) {
        commonGame.showPopup();
        if (typeof temSessionDetail == 'undefined') temSessionDetail = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/sessionDetail.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temSessionDetail));
        commonDragon.type = type;
        commonGame.cacheData = null;
        getSessionDetail();
        commonGame.setActiveTab(commonDragon.type);

    }

    function getSessionDetail() {
        var b = commonDragon.sessionData.GameSessionID;
        $('#xdSessionID').text(b);

        $('#drResultChip1').html(commonDragon.displayCard(commonDragon.sessionData.Card1));
        $('#drResultChip2').html(commonDragon.displayCard(commonDragon.sessionData.Card2));


        $("#dr_gamehisId li").removeClass('select');
        $('#dr_gamehisId li.' + b).addClass('select');
        if ($('#dr_gamehisId li.' + b).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
        else $('#txSessionPrev').attr('disabled', false);
        if ($('#dr_gamehisId li.' + b).is(':last-child')) $('#txSessionNext').attr('disabled', true);
        else $('#txSessionNext').attr('disabled', false);
        $('#drDetails .location').removeClass('active');

        if (commonDragon.sessionData.LocationIDWin == 1)
            $('#drDetails .location.xiu').addClass('active');
        else if (commonDragon.sessionData.LocationIDWin == 2)
            $('#drDetails .location.tai').addClass('active');
        else {
            $('#drResultChip0').html('Hòa');
        }


        libs.PostData(commonDragon.urlApi + "GetBetDetails/?SessionID=" + b + "&BetType=" + commonDragon.type + "&r=" + Math.random(), {},
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
    commonDragon.showStatitics = function() {
        if (typeof tempStatitics == 'undefined') tempStatitics = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/statitics.html" + version);
        if ($('.dragon-game-block .left-statistic-tx').hasClass('active') || $('.dragon-game-block .right-statistic-tx').hasClass('active')) {
            showHideStatistics(0);
            return;
        }
        updateStatitics();
    }

    function showHideStatistics(type) {
        if (type == 1) {
            commonDragon.isShowStatitics = true;
            $('.dragon-game-block .left-statistic-tx').addClass('active');
            $('.dragon-game-block .right-statistic-tx').removeClass('active');
        } else if (type == 2) {
            commonDragon.isShowStatitics = true;
            $('.dragon-game-block .left-statistic-tx').removeClass('active');
            $('.dragon-game-block .right-statistic-tx').addClass('active');
        } else {
            $('.dragon-game-block .left-statistic-tx').removeClass('active');
            $('.dragon-game-block .right-statistic-tx').removeClass('active');
            commonDragon.isShowStatitics = false;
        }
    }

    var chart1, chart2;

    function updateStatitics() {

        $.ajax({
            type: "POST",
            url: commonDragon.urlApi + "GetStatitics/?r=" + Math.random(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(result) {

                result.LastSession = commonDragon.gameHistory != null ? commonDragon.gameHistory[0] : {};
                $('.dragon-game-block .statistic-tx').html(jQuery.processTemplateToText(tempStatitics, result));
                $('.dragon-game-block .statistic-tx .close-statistic-tx').click(function() {
                    showHideStatistics(0);
                });
                $('.dragon-game-block .statistic-tx .arrow-left').click(function() {
                    showHideStatistics(1);
                });
                $('.dragon-game-block .statistic-tx .arrow-right').click(function() {
                    showHideStatistics(2);
                });
                $('.dragon-game-block .statistic-tx .tabright-statistic-tx input').change(function() {
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
    commonDragon.showGuide = function() {
        commonGame.showPopup();
        if (typeof temhelpTX == 'undefined')
            temhelpTX = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/popHelp.html" + version);
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
    commonDragon.showHisCusStar = function(type) {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/popHistory.html" + version);
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/historyItem.html" + version);
        temHistory.setParam('MediaUrl', commonGame.mediaUrl);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));

        commonGame.typeHis = type;
        commonGame.cacheData = null;
        getHistory(1);
        commonGame.setActiveTab(commonGame.typeHis);

    };

    function getHistory(current) {
        if (commonGame.cacheData == null && commonGame.cacheData != '') {
            libs.GetData(commonDragon.urlApi + "GetAccountHistory/?BetType=" + commonGame.typeHis + "&TopCount=500&r=" + Math.random(), {},
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

    commonDragon.showRank = function() { //1xu2g
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/dragon/popRank.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        bindRank(1);
        commonGame.setActiveTab(1);

    };

    function bindRank(type) {
        libs.GetData(commonDragon.urlApi + "GetTopDailyWinners?BetType=" + type + "&TopCount=10&r=" + Math.random(), {},
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





    commonDragon.onChangeInputValidate = function(e) {
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

        if (e.id == 'drbetpersonOver')
            $('#drbetpersonUnder').val(0);
        else if (e.id == 'drbetpersonUnder')
            $('#drbetpersonOver').val(0);
    };

    var locationOverUnder = 0;

    commonDragon.onFocus = function(e) {
        commonDragon.clickAll();
        if (e.value == '0' || e.value == '') {
            e.value = '';
        }

        $('#dragonsetfastID').show();

        if (e.id == 'drbetpersonOver') {
            locationOverUnder = 2;
            $('#drbetpersonUnder').val(0);
        } else if (e.id == 'drbetpersonUnder') {
            locationOverUnder = 1;
            $('#drbetpersonOver').val(0);
        }

    };
    commonDragon.onBlur = function(e) {
        if (e.value == '') {
            e.value = '0';
        }

    };

    commonDragon.onClickTabfast = function() {
        if ($('.bt_shortcutkey').hasClass('active')) {
            $('.bt_shortcutkey').removeClass('active');
            $('#dragonsetfastID .numfast').show();
            $('#dragonsetfastID .numfast_other').hide();

        } else {
            $('.bt_shortcutkey').addClass('active');
            $('#dragonsetfastID .numfast').hide();
            $('#dragonsetfastID .numfast_other').show();
        }
    };

    commonDragon.onClickBetfast = function(value) {

        if (locationOverUnder === 1) {


            if (value === -1) {
                $("#drbetpersonUnder").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }


            var values = $("#drbetpersonUnder").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betUnder = parseInt(numInt) || 0;
            betUnder += value;
            if (betUnder > 100000000)
                betUnder = 100000000;
            $("#drbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {
            if (value === -1) {
                $("#drbetpersonOver").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }

            var values = $("#drbetpersonOver").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betOver = parseInt(numInt) || 0;
            betOver += value;
            if (betOver > 100000000)
                betOver = 100000000;

            $("#drbetpersonOver").val(commonGame.FormatNumber(betOver));

        }

    }

    commonDragon.onClickBetfastOther = function(value) {

        if (locationOverUnder === 1) {




            var values = $("#drbetpersonUnder").val().split('.');
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
            $("#drbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {

            var values = $("#drbetpersonOver").val().split('.');
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
            $("#drbetpersonOver").val(commonGame.FormatNumber(betUnder));

        }
    };

    commonDragon.onClickcancelfast = function() {
        $("#drbetpersonUnder").val(0);
        $("#drbetpersonOver").val(0);
        $('#dragonsetfastID').hide();
        $("#drbetpersonUnder").blur();
        $("#drbetpersonOver").blur();

    };

    commonDragon.blink = function(id, type, time, interval) {
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

    commonDragon.clickAll = function() {

    };
    window.commonDragon = commonDragon;
})(window);
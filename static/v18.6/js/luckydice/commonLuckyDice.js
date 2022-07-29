var stage;

(function(window) {
    var commonLuckyDice = {};
    var hubStarted = false;
    var fileLoaded = true;
    commonLuckyDice.hubName = "miniGameTXHub";
    commonLuckyDice.urlApi = jsConfig.connectLucky.API;
    commonLuckyDice.hubs = jsConfig.connectLucky.hubUrl;
    commonLuckyDice.Init = function() {
        bindInterface();
        if (hubStarted) {
            this.ShowDiceGUI();
            return;
        }
        initHub();
    };

    function initHub() {
        commonLuckyDice.gameConnection = $.hubConnection(commonLuckyDice.hubs);
        commonLuckyDice.gameHub = commonLuckyDice.gameConnection.createHubProxy(commonLuckyDice.hubName);
        var minitxHub = new TaixiugameHub(commonLuckyDice.gameHub);
        commonLuckyDice.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.log('Tx connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.log('Tx reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.log('Tx connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.log('Tx disconnected');
                if (hubStarted && App.currentAccount.AccountID > 0)
                    reconnectHub();
            }
        });
        try {
            commonLuckyDice.gameConnection.start().done(function() {
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
            commonLuckyDice.gameConnection.stop();
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
            if (commonLuckyDice.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonLuckyDice.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }



    var temLuckyDice;

    function bindInterface() {
        if ($('#lucky').length > 0)
            return;
        var str = '';
        if (typeof temLuckyDice == 'undefined')
            temLuckyDice = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/play.html" + version);
        temLuckyDice.setParam('MediaUrl', commonGame.mediaUrl);
        var str = jQuery.processTemplateToText(temLuckyDice);
        $('#txCircle').append(str);

        $("#txCircle").click(function() {
            commonGame.showGameCircle(1);
        });

        $('#txtbetpersonOver').on('keypress', function(event) {
            if (event.which === '13') {
                commonLuckyDice.postBet();
            }
        });
        $('#txtbetpersonUnder').on('keypress', function(event) {
            if (event.which === '13') {
                commonLuckyDice.postBet();
            }
        });


        commonLuckyDice.ChatTx = new ChatTx();


        commonLuckyDice.GameTx = new window.Taixiu.Game();
        commonLuckyDice.GameTx.create();
        commonLuckyDice.useCoinStar(commonGame.typeBet);
        $("#lucky").mouseup(function() {
            commonGame.resetZindex();
            $("#gameCicle").addClass('active');
        });

        $("#lucky .lucky_rect .rect1").click(function() {
            App.treasure.showJackpot(1);
        });
        $("#lucky .lucky_rect .rect2").click(function() {
            App.treasure.showJackpot(1);
        });

    }

    function luckyDiceConnect() {
        try {
            commonLuckyDice.useCoinStar(commonGame.typeBet);
            commonLuckyDice.gameHub.server.GetCurrentResult().done(function() {}).fail();
        } catch (e) {}
    }

    commonLuckyDice.setAllowbet = function(bool) {
        commonLuckyDice.isBet = bool;
        if (bool == true) {
            $("#txtbetpersonOver").removeAttr('disabled');
            $("#txtbetpersonUnder").removeAttr('disabled');
        } else {
            $("#txtbetpersonOver").attr('disabled', 'disabled');
            $("#txtbetpersonUnder").attr('disabled', 'disabled');
        }

    };

    commonLuckyDice.showTextResult = function(sumStar, refunStar, bool) {

        var ord = "";
        if ($("#lucky").css('display') == 'none') {
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
            commonLuckyDice.GameTx.updateAccountResult(sumStar, refunStar);
        }

    };
    commonLuckyDice.setTotal = function(total, istotal) {
        commonGame.overOrUnder = total;
        commonLuckyDice.GameTx.setTotal(total, istotal);


    };
    commonLuckyDice.reset = function() {
        $(".timewaiting").hide();
        $("#totalresult").hide();
        $('#totalcountBetOver').text(0);
        $('#totalcountBetUnder').text(0);
        $("#totalbetOver").text(0);
        $("#totalbetUnder").text(0);
        $("#betpersonOver").text(0);
        $("#betpersonUnder").text(0);
        $("#txtbetpersonOver").val(0);
        $("#txtbetpersonUnder").val(0);
        $('.dice-game-block .location').removeClass('active');

        $('#lucky .tips').hide();
        console.log('Reset');
    };

    var timeMessTx;
    commonLuckyDice.showMessage = function(message) {

        var msg = $(".messageTx");
        msg.show();
        msg.html(message);
        clearTimeout(timeMessTx);
        timeMessTx = setTimeout(function() {
            msg.hide();
        }, 5000);
    };
    commonLuckyDice.postBet = function() {

        var valuesOver = $("#txtbetpersonOver").val().split('.');
        var numIntOver = '';
        for (var i = 0; i < valuesOver.length; i++) {
            numIntOver += '' + valuesOver[i];
        }

        var valuesUnder = $("#txtbetpersonUnder").val().split('.');
        var numIntUnder = '';
        for (var i = 0; i < valuesUnder.length; i++) {
            numIntUnder += '' + valuesUnder[i];
        }



        var betOver = parseInt(numIntOver) || 0;
        var betUnder = parseInt(numIntUnder) || 0;
        if ((betOver === 0 && betUnder === 0)) {
            commonLuckyDice.showMessage("Vui lòng đặt cửa");
            return;
        }
        if ((betOver > 0 && betUnder > 0)) {
            commonLuckyDice.showMessage("Không đặt 2 cửa một phiên");
            return;
        }
        var betType = commonGame.typeBet;
        var locationId = (betOver > 0 ? 2 : 1);
        var betValue = (betOver > 0 ? betOver : betUnder);
        if (betType === 2) {
            try {
                var sumBet = betValue;
                if (sumBet > 100000000) {
                    commonLuckyDice.showMessage("Giá trị đặt cửa không hợp lệ");
                    return;
                }
            } catch (e) {}
        }

        commonLuckyDice.gameHub.server.setBet(betType, locationId, betValue).done(function(responseStatus) {
            if (responseStatus >= 0) {
                $("#txtbetpersonOver").val('');
                $("#txtbetpersonUnder").val('');
            } else {
                switch (responseStatus) {
                    case -207:
                        commonLuckyDice.showMessage("Hết thời gian đặt cửa");
                        return;
                    case -208:
                        commonLuckyDice.showMessage("Không đặt 2 cửa một phiên");
                        console.log('dat 2 cua trong mot phong');
                        return;
                    case -212:
                        commonLuckyDice.showMessage("Giá trị đặt cửa không hợp lệ");
                        console.log('gia tri dat cua khong hop le <0 > 2tr');
                        return;
                    case -232:
                        commonLuckyDice.showMessage("Cửa đăt không hợp lệ");
                        return;
                    case -99:
                        commonLuckyDice.showMessage("Hệ thống gián đoạn");
                        return;
                    case -51:
                        commonLuckyDice.showMessage("Số dư không đủ");
                        return;
                    case -102:
                        commonLuckyDice.showMessage("Hệ thống gián đoạn");
                        return;
                    case -88:
                        return;
                    default:
                        commonLuckyDice.showMessage("Hệ thống gián đoạn");
                        return;
                }
            }

        }).fail(function() {});
    };

    commonLuckyDice.ShowDiceGUI = function() {
        if (!fileLoaded || !hubStarted) {
            commonLuckyDice.Init();

        }
        $('#gameCicle').show();
        $('.ic-tx').addClass('active');
        commonGame.resetZindex();
        $("#gameCicle").addClass('active');

    };
    commonLuckyDice.HideDiceGUI = function() {
        $('#gameCicle').hide();
        $('.ic-tx').removeClass('active');

    };

    commonLuckyDice.HideButton = function() {
        $('#lucky .mini_close').hide();
        $('#lucky .mini_help').hide();
        $('#lucky .mini_rank').hide();
        $('#lucky .mini_history').hide();
        $('#lucky .mini_static').hide();
        $('#lucky .mini_nan').hide();
        $('#lucky .mini_chat').hide();
        commonLuckyDice.GameTx.title.visible = false;
        $('#setfastID').hide();
        showHideStatistics(0);


    }
    commonLuckyDice.ShowButton = function() {
        $('#lucky .mini_close').show();
        $('#lucky .mini_help').show();
        $('#lucky .mini_rank').show();
        $('#lucky .mini_history').show();
        $('#lucky .mini_static').show();
        $('#lucky .mini_nan').show();
        $('#lucky .mini_chat').show();
        commonLuckyDice.GameTx.title.visible = true;
    }






    commonLuckyDice.useCoinStar = function(type) {
        commonGame.typeBet = type;
        GetCurrentRooms();


    };
    commonLuckyDice.UpdateRoomInfo = function(data) {

        if (data.length > 0 && data != null && data[0] != '' && data[0] != undefined && data[0].BetType == commonGame.typeBet) {
            var over = 0,
                under = 0;
            over = data[0].TotalBetValue2;
            under = data[0].TotalBetValue1;

            $('#totalcountBetOver').html(data[0].TotalAccount2);
            $("#totalbetOver").html(commonGame.FormatNumber(over));

            $('#totalcountBetUnder').html(data[0].TotalAccount1);
            $("#totalbetUnder").html(commonGame.FormatNumber(under));



        }
    };
    commonLuckyDice.UpdateSession = function(data) {
        if (data != null) {
            commonLuckyDice.currentSession = data;
            commonLuckyDice.gameSession = data.GameSessionID;
            $('.sessionLucky').html('#' + data.GameSessionID);

        }
    };
    commonLuckyDice.UpdateResult = function(data) {
        if (data != null && data.Dice1 > 0) {
            commonLuckyDice.GameTx.showResult(data);
        } else {
            try {
                commonLuckyDice.gameHub.server.GetCurrentResult().done(function() {}).fail();
            } catch (e) {

            }
        }
    }
    commonLuckyDice.UpdateBetOfAccount = function(data, balance) {
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

        $('#betpersonOver').html(util.ParseMoney(betOver));
        $('#betpersonUnder').html(util.ParseMoney(betUnder));


        if (balance > -1 && App && App.currentAccount) {
            libAccount.UpdateBalance(2, balance);

        }

    };
    commonLuckyDice.ResultOfAccount = function(data) {
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
        commonLuckyDice.showTextResult(sumGold, refundvalueGold, winner);
        if (App && App.currentAccount) {
            libAccount.UpdateBalance(2, sumGold + refundvalueGold, 2);
        }

    };



    commonLuckyDice.ShowGameHistory = function(data) {
        if (data != null) {
            commonLuckyDice.gameHistory = data;
            if (commonLuckyDice.isShowStatitics) updateStatitics();
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
            $("#gamehisId").html(s);
            $("#gamehisId li").click(function() {
                commonLuckyDice.sessionData = JSON.parse(decodeURIComponent($(this).data('value')));
                commonLuckyDice.showSessionDetail(commonGame.typeBet);

            });
            if (commonLuckyDice.sessionData && commonLuckyDice.sessionData.GameSessionID) {
                if ($('#gamehisId li.' + commonLuckyDice.sessionData.GameSessionID).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
                else $('#txSessionPrev').attr('disabled', false);
                if ($('#gamehisId li.' + commonLuckyDice.sessionData.GameSessionID).is(':last-child')) $('#txSessionNext').attr('disabled', true);
                else $('#txSessionNext').attr('disabled', false);
            }
        }
    };

    function GetCurrentRooms() {
        try {
            commonLuckyDice.gameHub.server.getCurrentRooms(commonGame.typeBet).done(function() {}).fail();
        } catch (e) {}
    };

    var temSessionDetail;
    commonLuckyDice.showSessionDetail = function(type) {
        commonGame.showPopup();
        if (typeof temSessionDetail == 'undefined') temSessionDetail = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/sessionDetail.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temSessionDetail));
        commonLuckyDice.type = type;
        commonGame.cacheData = null;
        getSessionDetail();
        commonGame.setActiveTab(commonLuckyDice.type);

    }

    function getSessionDetail() {
        var b = commonLuckyDice.sessionData.GameSessionID;
        $('#txSessionID').text(b);
        $('#txResultDice1').removeClass();
        $('#txResultDice1').addClass('num-' + commonLuckyDice.sessionData.Dice1);
        $('#txResultDice2').removeClass();
        $('#txResultDice2').addClass('num-' + commonLuckyDice.sessionData.Dice2);
        $('#txResultDice3').removeClass();
        $('#txResultDice3').addClass('num-' + commonLuckyDice.sessionData.Dice3);
        $('#txResultDiceSum').text(commonLuckyDice.sessionData.DiceSum);
        $("#gamehisId li").removeClass('select');
        $('#gamehisId li.' + b).addClass('select');
        if ($('#gamehisId li.' + b).is(':first-child')) $('#txSessionPrev').attr('disabled', true);
        else $('#txSessionPrev').attr('disabled', false);
        if ($('#gamehisId li.' + b).is(':last-child')) $('#txSessionNext').attr('disabled', true);
        else $('#txSessionNext').attr('disabled', false);
        $('#txDetails .location').removeClass('active');
        if (commonLuckyDice.sessionData.LocationIDWin == 1) $('#txDetails .location.xiu').addClass('active');
        else $('#txDetails .location.tai').addClass('active');


        libs.PostData(commonLuckyDice.urlApi + "GetBetDetails/?SessionID=" + b + "&BetType=" + commonLuckyDice.type + "&r=" + Math.random(), {},
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



        //$('#txTongHoanTai').text(commonGame.FormatNumber(tongHoanTai));
        //$('#txTongDatTai').text(commonGame.FormatNumber(tongDatTai));
        //$('#txTongHoanXiu').text(commonGame.FormatNumber(tongHoanXiu));
        //$('#txTongDatXiu').text(commonGame.FormatNumber(tongDatXiu));

        //$("#itemsTai").html(jQuery.processTemplateToText(temSessionBetDetailsTai, dataTai));
        //$("#itemsXiu").html(jQuery.processTemplateToText(temSessionBetDetailsXiu, dataXiu));


    }
    //Statitics
    var tempStatitics;
    commonLuckyDice.showStatitics = function() {
        if (typeof tempStatitics == 'undefined') tempStatitics = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/statitics.html" + version);
        if ($('.dice-game-block .left-statistic-tx').hasClass('active') || $('.dice-game-block .right-statistic-tx').hasClass('active')) {
            showHideStatistics(0);
            return;
        }
        updateStatitics();
    }

    function showHideStatistics(type) {
        if (type == 1) {
            commonLuckyDice.isShowStatitics = true;
            $('.dice-game-block .left-statistic-tx').addClass('active');
            $('.dice-game-block .right-statistic-tx').removeClass('active');
        } else if (type == 2) {
            commonLuckyDice.isShowStatitics = true;
            $('.dice-game-block .left-statistic-tx').removeClass('active');
            $('.dice-game-block .right-statistic-tx').addClass('active');
        } else {
            $('.dice-game-block .left-statistic-tx').removeClass('active');
            $('.dice-game-block .right-statistic-tx').removeClass('active');
            commonLuckyDice.isShowStatitics = false;
        }
    }

    var chart1, chart2;

    function updateStatitics() {

        $.ajax({
            type: "POST",
            url: commonLuckyDice.urlApi + "GetStatitics/?r=" + Math.random(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(result) {

                result.LastSession = commonLuckyDice.gameHistory != null ? commonLuckyDice.gameHistory[0] : {};
                $('.dice-game-block .statistic-tx').html(jQuery.processTemplateToText(tempStatitics, result));
                $('.dice-game-block .statistic-tx .close-statistic-tx').click(function() {
                    showHideStatistics(0);
                });
                $('.dice-game-block .statistic-tx .arrow-left').click(function() {
                    showHideStatistics(1);
                });
                $('.dice-game-block .statistic-tx .arrow-right').click(function() {
                    showHideStatistics(2);
                });
                $('.dice-game-block .statistic-tx .tabright-statistic-tx input').change(function() {
                    var p = parseInt($(this).data('value'));
                    if (p == 0 && chart1) {
                        chart1.options.data[p].visible = $(this).prop('checked');
                        chart1.render();
                    } else if (chart2) {
                        chart2.options.data[p].visible = $(this).prop('checked');
                        chart2.render();
                    }
                });
                renderHistoryChart();
            }
        });


    }

    function renderHistoryChart() {
        var b = [
            [],
            [],
            [],
            []
        ];
        $.each(commonLuckyDice.gameHistory, function() {
            b[0].push({
                x: this.GameSessionID,
                y: this.DiceSum,
                markerColor: this.DiceSum > 10 ? "#000" : "#FFF",
            });
            b[1].push({
                x: this.GameSessionID,
                y: this.Dice1
            });
            b[2].push({
                x: this.GameSessionID,
                y: this.Dice2
            });
            b[3].push({
                x: this.GameSessionID,
                y: this.Dice3
            });
        });
        chart1 = new CanvasJS.Chart("chart-tx1", {
            highlightEnabled: true,
            width: 610,
            height: 190,
            backgroundColor: 'transparent',
            axisX: {
                lineColor: "#3a4d79",
                gridColor: "#3f5fa6",
                labelFontSize: 0,
                labelFontColor: '#fff',
                gridThickness: 0.4,
                interval: 1,
                tickLength: 0,
                includeZero: false,
                labelFormatter: function(e) {
                    return ''
                },
                margin: -11
            },
            axisY: {
                lineColor: "#31426d",
                gridColor: "#3f5fa6",
                labelFontSize: 20,
                labelFontColor: '#e7b52d',
                labelMaxWidth: 25,
                gridThickness: 0.4,
                interval: 3,
                tickLength: 0,
                includeZero: false,
                minimum: 2,
                maximum: 19
            },
            toolTip: {
                enabled: false
            },
            data: [{
                    type: "line",
                    color: "#ffc324",
                    markerSize: 20,
                    markerType: "circle",
                    markerColor: "#ffc324",
                    dataPoints: b[0]
                },
                {
                    name: "Xúc xắc 1",
                    visible: false,
                    dataPoints: b[1]
                },
                {
                    name: "Xúc xắc 2",
                    visible: false,
                    dataPoints: b[2]
                },
                {
                    name: "Xúc xắc 3",
                    visible: false,
                    dataPoints: b[3]
                }
            ]
        });
        chart1.render();
        chart2 = new CanvasJS.Chart("chart-tx2", {
            highlightEnabled: true,
            width: 610,
            height: 190,
            backgroundColor: 'transparent',
            title: {
                text: ""
            },
            axisX: {
                lineColor: "#3a4d79",
                gridColor: "#3f5fa6",
                labelFontSize: 0,
                labelFontColor: '#fff',
                gridThickness: 0.4,
                interval: 1,
                tickLength: 0,
                includeZero: false,
                labelFormatter: function(e) {
                    return ''
                },
                margin: -11
            },
            axisY: {
                lineColor: "#3a4d79",
                lineThickness: 0,
                gridColor: "#3f5fa6",
                labelFontSize: 20,
                labelFontColor: '#e7b52d',
                labelMaxWidth: 25,
                margin: 10,
                gridThickness: 0.4,
                interval: 1,
                tickLength: 0,
                includeZero: false,
                minimum: 0,
                maximum: 7
            },
            toolTip: {
                enabled: false
            },
            data: [{
                    name: "Tổng",
                    visible: false,
                    dataPoints: b[0]
                },
                {
                    name: "Xúc xắc 1",
                    type: "line",
                    lineThickness: 2,
                    color: "#fff200",
                    markerSize: 12,
                    markerType: "circle",
                    markerColor: "#fff200",
                    dataPoints: b[1]
                },
                {
                    name: "Xúc xắc 2",
                    type: "line",
                    lineThickness: 2,
                    color: "#fd4383",
                    markerSize: 12,
                    markerType: "circle",
                    markerColor: "#fd4383",
                    dataPoints: b[2]
                },
                {
                    name: "Xúc xắc 3",
                    type: "line",
                    lineThickness: 2,
                    color: "#00ffff",
                    markerSize: 12,
                    markerType: "circle",
                    markerColor: "#00ffff",
                    dataPoints: b[3]
                }
            ]
        });
        chart2.render();
    }

    var temhelpTX;
    commonLuckyDice.showGuide = function() {
        commonGame.showPopup();
        if (typeof temhelpTX == 'undefined')
            temhelpTX = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/popHelp.html" + version);
        //temhelpTX.setParam('MediaUrl', commonGame.mediaUrl);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temhelpTX));
    };



    var temHistoryItem;
    var temHistory;
    commonLuckyDice.showHisCusStar = function(type) {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/popHistory.html" + version);
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/historyItem.html" + version);
        temHistory.setParam('MediaUrl', commonGame.mediaUrl);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));

        commonGame.typeHis = type;
        commonGame.cacheData = null;
        getHistory(1);
        commonGame.setActiveTab(commonGame.typeHis);

    };

    function getHistory(current) {
        if (commonGame.cacheData == null && commonGame.cacheData != '') {
            libs.GetData(commonLuckyDice.urlApi + "GetAccountHistory/?BetType=" + commonGame.typeHis + "&TopCount=500&r=" + Math.random(), {},
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

    commonLuckyDice.showRank = function() { //1xu2g
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/luckydice/popRank.html" + version);

        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        bindRank(1);
        commonGame.setActiveTab(1);

    };

    function bindRank(type) {
        libs.GetData(commonLuckyDice.urlApi + "GetTopDailyWinners?BetType=" + type + "&TopCount=10&r=" + Math.random(), {},
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





    commonLuckyDice.onChangeInputValidate = function(e) {
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

        if (e.id == 'txtbetpersonOver')
            $('#txtbetpersonUnder').val(0);
        else if (e.id == 'txtbetpersonUnder')
            $('#txtbetpersonOver').val(0);
    };

    var locationOverUnder = 0;

    commonLuckyDice.onFocus = function(e) {
        commonLuckyDice.clickAll();
        if (e.value == '0' || e.value == '') {
            e.value = '';
        }

        $('#setfastID').show();

        if (e.id == 'txtbetpersonOver') {
            locationOverUnder = 2;
            $('#txtbetpersonUnder').val(0);
        } else if (e.id == 'txtbetpersonUnder') {
            locationOverUnder = 1;
            $('#txtbetpersonOver').val(0);
        }

    };
    commonLuckyDice.onBlur = function(e) {
        if (e.value == '') {
            e.value = '0';
        }

    };

    commonLuckyDice.onClickTabfast = function() {
        if ($('.bt_shortcutkey').hasClass('active')) {
            $('.bt_shortcutkey').removeClass('active');
            $('#setfastID .numfast').show();
            $('#setfastID .numfast_other').hide();

        } else {
            $('.bt_shortcutkey').addClass('active');
            $('#setfastID .numfast').hide();
            $('#setfastID .numfast_other').show();
        }
    };

    commonLuckyDice.onClickBetfast = function(value) {

        if (locationOverUnder === 1) {


            if (value === -1) {
                $("#txtbetpersonUnder").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }


            var values = $("#txtbetpersonUnder").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betUnder = parseInt(numInt) || 0;
            betUnder += value;
            if (betUnder > 100000000)
                betUnder = 100000000;
            $("#txtbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {
            if (value === -1) {
                $("#txtbetpersonOver").val(commonGame.FormatNumber(App.currentAccount.TotalGold > 100000000 ? 100000000 : App.currentAccount.TotalGold));
                return;
            }

            var values = $("#txtbetpersonOver").val().split('.');
            var numInt = '';
            for (var i = 0; i < values.length; i++) {
                numInt += '' + values[i];
            }


            var betOver = parseInt(numInt) || 0;
            betOver += value;
            if (betOver > 100000000)
                betOver = 100000000;

            $("#txtbetpersonOver").val(commonGame.FormatNumber(betOver));

        }


    }

    commonLuckyDice.onClickBetfastOther = function(value) {

        if (locationOverUnder === 1) {




            var values = $("#txtbetpersonUnder").val().split('.');
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
            $("#txtbetpersonUnder").val(commonGame.FormatNumber(betUnder));




        } else {

            var values = $("#txtbetpersonOver").val().split('.');
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
            $("#txtbetpersonOver").val(commonGame.FormatNumber(betUnder));

        }
    };

    commonLuckyDice.onClickcancelfast = function() {
        $("#txtbetpersonUnder").val(0);
        $("#txtbetpersonOver").val(0);
        $('#setfastID').hide();
        $("#txtbetpersonUnder").blur();
        $("#txtbetpersonOver").blur();

    };

    commonLuckyDice.blink = function(id, type, time, interval) {
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

    commonLuckyDice.clickAll = function() {

    };
    window.commonLuckyDice = commonLuckyDice;
})(window);



(function() {
    var ChatHubTX = function(hubUrl) {
        var connection = $.hubConnection(hubUrl);
        var hub = connection.createHubProxy('chatHub');

        hub.server = {};
        hub.client = {};

        $.extend(hub.server, {
            pingPong: function() {
                return hub.invoke.apply(hub, $.merge(["PingPong"], $.makeArray(arguments)));
            },

            registerChat: function(channel) {
                return hub.invoke.apply(hub, $.merge(["RegisterChat"], $.makeArray(arguments)));
            },

            unregisterChat: function(channel) {
                return hub.invoke.apply(hub, $.merge(["UnregisterChat"], $.makeArray(arguments)));
            },

            sendMessage: function(message, channel) {
                return hub.invoke.apply(hub, $.merge(["SendMessage"], $.makeArray(arguments)));
            }
        });


        hub.on('listLastMessages', function(lastMessages) {
            if (typeof lastMessages == 'string')
                lastMessages = $.parseJSON(lastMessages);

            if (typeof hub.client.listLastMessages == 'function')
                hub.client.listLastMessages(lastMessages);
        });
        hub.on('receiveMessage', function(chatMessage) {
            if (typeof hub.client.receiveMessage == 'function')
                hub.client.receiveMessage(chatMessage);
        });

        hub.on('notifyMessage', function(messages) {
            if (typeof hub.client.notification == 'function')
                hub.client.notification(messages);
        });

        return hub;
    };

    window.ChatHubTX = ChatHubTX;
})();

(function(window, $) {
    var ChatTx = function() {
        this._init();
    };


    ChatTx.prototype._init = function() {
        if (this.isInit)
            return;
        ChatTx.ui = {
            $content: $('#gameCicle .chat-section .chat-content .messages'),
            $chatInput: $('input#txtinput'),
            $showEmoticon: $('#showEmoticon'),
            $emoticon: $('div.emoticon'),
            $restore: $('.ten2')
        };
        var that = this;
        this.isInit = true;

        ChatTx.ui.$chatInput.keypress(function(e) {
            if (e.keyCode === 13)
                sendMessage(that);
        });
        $('#gameCicle .chat-section .chat-content .input-msg .send').click(function() {
            sendMessage(that);
        });


        if (ChatTx.ui.$emoticon.emotions)
            $('div.emoticon label').emotions();
        $('div.emoticon label').click(function() {
            ChatTx.ui.$emoticon.hide();
            if (ChatTx.channel)
                ChatHubTX.server.sendMessage($(this).data('value'), ChatTx.channel);
        });
        ChatTx.ui.$content.slimScroll({
            width: '328px',
            height: '390px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });
        ChatTx.initChat();
    }


    ChatTx.initHub = function() {
        var chatUrl = jsConfig.CHAT_SERVER_URL;

        if (!ChatHubTX || ChatHubTX.hubName !== 'chathub') {
            ChatHubTX = new ChatHubTX(chatUrl);

            ChatHubTX.client = {
                listUserOnlines: function(userOnlines) {},

                listLastMessages: function(lastMessages) {
                    ChatTx.ui.$content.html('');

                    if (lastMessages) {
                        $.each(lastMessages, function(k, v) {
                            ChatHubTX.client.receiveMessage(v);
                        });
                    }
                },
                receiveMessage: function(chatMessage) {
                    if (typeof(chatMessage) !== "undefined" && chatMessage !== null) {
                        chatMessage.ChannelId = chatMessage.i || chatMessage.ChannelId;
                        chatMessage.AccountID = chatMessage.a || chatMessage.AccountID;
                        chatMessage.NickName = chatMessage.n || chatMessage.AccountID;
                        chatMessage.Content = chatMessage.c || chatMessage.Content;

                        receiveMessage(chatMessage);
                    }
                },

                systemMessage: function(message, type) {

                    if (typeof(message) !== "undefined" && message !== null) {
                        var sMessage = $('<p/>');
                        sMessage.addClass('system');
                        sMessage.text(message);
                        ChatTx.ui.$content.append(sMessage);

                        sMessage.delay(5000).fadeOut(function() {
                            this.remove();
                        });


                    }
                }
            };

            ChatHubTX.connection.stateChanged(function(change) {
                if (change.newState === $.signalR.connectionState.connecting) {
                    ChatTx.ui.$chatInput.attr('placeholder', 'Đang kết nối...');
                    ChatTx.ui.$chatInput.attr('disabled', true);
                    console.log('Chat connecting');
                } else if (change.newState === $.signalR.connectionState.reconnecting) {
                    ChatTx.ui.$chatInput.attr('placeholder', 'Đang kết nối...');
                    ChatTx.ui.$chatInput.attr('disabled', true);
                    console.log('Chat reconnecting');
                } else if (change.newState === $.signalR.connectionState.connected) {
                    ChatTx.ui.$chatInput.attr('placeholder', 'Nhập nội dung...');
                    ChatTx.ui.$chatInput.attr('disabled', false);
                    console.log('Chat connected');
                    if (!ChatTx.pingChatTimeout) {
                        ChatTx.pingChatTimeout = setInterval(function() {
                            try {
                                ChatHubTX.server.pingPong();
                            } catch (e) {}
                        }, 60000); //ping 60s
                    }
                } else if (change.newState === $.signalR.connectionState.disconnected) {
                    ChatTx.ui.$chatInput.attr('placeholder', 'Mất kết nối...');
                    ChatTx.ui.$chatInput.attr('disabled', true);
                    console.log('Chat disconnected');
                    if (ChatTx.pingChatTimeout) {
                        clearInterval(ChatTx.pingChatTimeout);
                        delete ChatTx.pingChatTimeout;
                    }
                }
            });
        }
    };

    ChatTx.startHub = function(cb) {
        try {
            ChatHubTX.connection.start({
                transport: ["webSockets", "longPolling"],
                jsonp: true
            }).done(cb);
        } catch (e) {console.error(e);}
    };

    ChatTx.registerChat = function(game, channel) {
        ChatTx.ui.$chatInput.focus();

        ChatTx.channel = game + '_' + channel;
        ChatTx.ui.$content.html('Loading...');

        ChatTx.initHub();

        function register() {
            try {
                ChatHubTX.server.registerChat(game + '_' + channel).done(function(result) {
                    if (result) {
                        if ((App && App.currentAccount && App.currentAccount.TotalGold >= 10000)) {
                            ChatTx.ui.$chatInput.attr('placeholder', 'Nhập nội dung...');
                            ChatTx.ui.$chatInput.attr('disabled', false);
                        } else {
                            ChatTx.ui.$chatInput.attr('placeholder', 'Bạn cần tối thiểu 10.000... ');
                            ChatTx.ui.$chatInput.attr('disabled', true);
                        }
                    } else {
                        ChatTx.ui.$chatInput.attr('placeholder', 'Đăng nhập để chat...');
                        ChatTx.ui.$chatInput.attr('disabled', true);
                    }
                });
            } catch (e) {}
        }
        if (ChatHubTX.connection.state === $.signalR.connectionState.connected) {
            register();
        } else {
            ChatTx.startHub(register);
        }
    }

    ChatTx.unregisterChat = function(game, channel, callback) {
        if (ChatHubTX && ChatHubTX.connection && ChatHubTX.connection.state == 1) {
            try {

                ChatTx.ui.$chatInput.attr('disabled', true);
                ChatHubTX.server.unregisterChat(game + '_' + channel).done(function() {
                    if (typeof callback == 'function')
                        callback();
                });
            } catch (e) {}
        } else {
            if (typeof callback == 'function')
                callback();
        }
    }

    ChatTx.initChat = function() {
        var chatContentHeight = ChatTx.ui.$content.prop('scrollHeight');
        ChatTx.ui.$content.animate({
            scrollTop: chatContentHeight
        }, 0);

        var gameName, channelId;
        gameName = '802972a5-8428-d8ba-2047-84221b7d2211';
        channelId = 'game';
        ChatTx.registerChat(gameName, channelId);
    }

    function bindingPlayerName(accountId, playerName) {
        var pName = $('<span data-type="player" data-value="' + accountId + '">' + playerName + ':</span>');
        return pName;
    }

    function bindingRoomName(roomData) {
        var pRoom = $('<span class="line1 room" data-type="room">' + roomData.Name + '</span>');

        return pRoom;
    }

    function send(msg, channel) {
        try {
            ChatHubTX.server.sendMessage(msg, channel).done(function(success) {
                afterSendMessage(success);
            });
        } catch (e) {}
    }

    function afterSendMessage(success) {
        if (success) {
            ChatTx.ui.$chatInput.val('');
        }
    }

    function sendMessage(that) {
        var msg = $('input#txtinput').val();
        if (msg && msg != '' && msg.length <= 512) {
            if (ChatHubTX && ChatHubTX.connection && (ChatHubTX.connection.state === $.signalR.connectionState.connected)) {
                send(msg, ChatTx.channel);
            } else {
                that.initHub();
                that.startHub(function() {
                    try {
                        ChatHubTX.server.registerChat(ChatTx.channel).done(function() {
                            send(msg, ChatTx.channel);
                        });
                    } catch (e) {}
                });
            }
        }
    }

    function receiveMessage(chatMessage) {
        if (chatMessage.ChannelId !== ChatTx.channel)
            return;


        var className = '';
        if (chatMessage.v >= 4) {
            className += 'System';
        }

        if (typeof(chatMessage.NickName) !== "undefined" && chatMessage.NickName !== null && chatMessage.NickName !== '') {
            var pEle = $('<p class="' + className + '"></p>');
            var pName = bindingPlayerName(chatMessage.AccountID, chatMessage.NickName);
            pEle.append(pName);


            var message = (chatMessage.v >= 4) ? $('<label/>').html(chatMessage.Content) : $('<label/>').text(chatMessage.Content);
            pEle.append(' ');
            pEle.append(message);
            ChatTx.ui.$content.append(pEle.clone(true));
            ChatTx.ui.$content.slimScroll({
                scrollTo: ChatTx.ui.$content.prop('scrollHeight') + 'px'
            });

        }
    }



    window.ChatTx = ChatTx;
})(window, jQuery);
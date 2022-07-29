commonMinipoker = new function() {
    this.urlApi = jsConfig.connectMinipoker.API;
    this.urlRoot = jsConfig.urlRootStatic;
    this.isBet = true;
    this.typeBet = 1;
    this.priceBet = 100;
    this.cacheData = null;
    this.rowperPage = 10;
    this.rowperPage = 10;
    this.roomtype = 1;
    this.roomId = 1;
    this.typeHis = 4;
    var hubStarted = false;
    var fileLoaded = true;
    this.hubName = "miniGamePokerHub";
    this.hubs = jsConfig.connectMinipoker.hubUrl;
    this.Init = function() {
        bindInterface();
        if (hubStarted && fileLoaded) {
            this.showMinipokerGUI();
        }
        initHub();
    };

    function initHub() {
        fileLoaded = true;
        if (hubStarted) return;
        commonMinipoker.gameConnection = $.hubConnection(commonMinipoker.hubs);
        commonMinipoker.gameHub = commonMinipoker.gameConnection.createHubProxy(commonMinipoker.hubName);
        var minipokerHub = new PokergameHub(commonMinipoker.gameHub);
        commonMinipoker.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.info('poker connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.info('poker reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.info('poker connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.info('poker disconnected');
                if (hubStarted && App.currentAccount.AccountID > 0)
                    reconnectHub();
            }
        });
        try {
            commonMinipoker.gameConnection.start().done(function() {
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
            commonMinipoker.gameConnection.stop();
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
            if (commonMinipoker.gameConnection.state === $.signalR.connectionState.disconnected) {
                commonMinipoker.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }

    function bindInterface() {


        if ($("#wrap_minipoker").length > 0)
            return;
        var str = '';
        var tem = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/minipoker.html");
        tem.setParam('MediaUrl', commonMinipoker.urlRoot);
        str = jQuery.processTemplateToText(tem);
        $('#ag').append(str);
        try {
            $("#wrap_minipoker").draggable({
                scroll: false
            });
            commonMinipoker.GamePoker = new window.MiniPoker.Game();
            commonMinipoker.GamePoker.create();
            commonMinipoker.GameX5Poker = new window.MiniPoker.GameX5();
            commonMinipoker.GameX5Poker.create();
            commonMinipoker.useCoinStar(commonMinipoker.typeBet);
            $("#wrap_minipoker").mouseup(function() {

                commonGame.resetZindex();
                $("#wrap_minipoker").addClass('active');
            });
        } catch (err) {}



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

    this.closePopup = function() {
        $('#popup_container_pk').remove();
        $('#overlayPopup_pk').remove();
    };

    this.useCoinStar = function(type) {
        if (commonMinipoker.playing === true) {
            commonMinipoker.showMsg("Bạn phải dừng quay để thực hiện", true);
            return;
        }
        commonMinipoker.typeBet = type;
        commonMinipoker.betX5 = 1;
        commonMinipoker.isAuto = false;
        commonMinipoker.timeSpeed = 2;
        commonMinipoker.setPriceBet(1, 100);
    };

    this.showMinipokerGUI = function() {
        if (!hubStarted || !fileLoaded) {
            commonMinipoker.Init();
        }
        $('#wrap_minipoker').show();
        $('.ic-mp').addClass('active');
        commonGame.resetZindex();
        $("#wrap_minipoker").addClass('active');

    };
    this.hideMinipokerGUI = function() {
        $('#wrap_minipoker').hide();
        $('.ic-mp').removeClass('active');
    };


    var timoutMini;
    this.showMsg = function(msg, error) {


        $('.error_msg').show();
        $('.error_msg').html(msg);

        clearTimeout(timoutMini);
        timoutMini = setTimeout(function() {
            $('.error_msg').hide();

        }, 4000);
    };



    this.setPriceBet = function(roomId, betValue) {
        if (commonMinipoker.playing) {
            commonMinipoker.showMsg("Bạn phải dừng quay để thực hiện", true);
            return;
        }
        commonMinipoker.roomId = roomId;
        commonMinipoker.priceBet = betValue;
        commonMinipoker.GetJackpot();
    };




    this.displayRoom = function(id) {
        switch (commonMinipoker.typeHis) {
            case 1:
                return "Sao";
            case 2:
                return "Đá";
        }
        return "";
    };

    this.displayBet = function(id) {
        switch (id) {
            case 1:
                return "100";
            case 2:
                return "1k";
            case 3:
                return "10k";
            default:
                return "";
        }
    };

    this.displayCard = function(id) {
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

    this.displayBai = function(id) {
        switch (id) {
            case 1:
                return "Nổ quỹ thưởng";
                break;
                //Thùng phá sảnh đại
            case 2:
                return "Thùng phá sảnh";
                break;
                //Thùng phá sảnh
            case 3:
                return "Tứ quý";
                break;
                //Tứ quý
            case 4:
                return "Cù lũ";
                break;
                //Cù lũ
            case 5:
                return "Thùng";
                break;
                //Thùng
            case 6:
                return "";
                break;
        }
    };


    this.HideSlot = function() {
        try {
            commonMinipoker.gameHub.server.HideSlot().done(function() {}).fail(function() {});
        } catch (e) {}
    };
    var timeOutJack;
    this.GetJackpot = function() {
        clearTimeout(timeOutJack);
        $.ajax({
            type: "GET",
            url: commonMinipoker.urlApi + "GetJackpot?betType=" + commonMinipoker.typeBet + "&roomID=" + commonMinipoker.roomId + '&r=' + Math.random() + '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if (data != null) {
                    commonGame.countNumber('jackMinipoker', data);

                }
            }

        });

        timeOutJack = setTimeout(function() {
            commonMinipoker.GetJackpot();
        }, 5000);

    };
    this.DoSpin = function() {
        try {
            commonMinipoker.gameHub.server.Spin(commonMinipoker.betX5, commonMinipoker.typeBet, commonMinipoker.roomId).done(function(result) {
                if (result < 0) {
                    commonMinipoker.playing = false;
                    commonMinipoker.timeSpeed = 2;
                    $('#wrap_minipoker .btn_sieutoc').removeClass('active');
                    commonMinipoker.isAuto = false;
                    $('#wrap_minipoker .btn_checkAuto').removeClass('active');

                    switch (result) {
                        case -51:
                            commonMinipoker.showMsg('Bạn không đủ số dư', true);
                            break;
                        case -50:
                            commonMinipoker.showMsg('Tài khoản không tồn tại', true);
                            break;
                        case -88:
                            break;
                        case -99:
                            commonMinipoker.showMsg('Lỗi hệ thống', true);
                            break;
                        default:
                            commonMinipoker.showMsg('Lỗi hệ thống', true);
                            break;
                    }
                }
            }).fail(function() {
                commonMinipoker.playing = false;
                commonMinipoker.timeSpeed = 2;
                $('#wrap_minipoker .btn_sieutoc').removeClass('active');
                commonMinipoker.isAuto = false;
                $('#wrap_minipoker .btn_checkAuto').removeClass('active');
                return commonMinipoker.showMsg('Không thể kết nối đến máy chủ', true);

            });
        } catch (e) {
            commonMinipoker.playing = false;
            commonMinipoker.timeSpeed = 2;
            $('#wrap_minipoker .btn_sieutoc').removeClass('active');
            commonMinipoker.isAuto = false;
            $('#wrap_minipoker .btn_checkAuto').removeClass('active');
            commonMinipoker.showMsg('Không thể kết nối đến máy chủ', true);
        }
    };
    this.ResultSpin = function(responseData) {
        console.log(responseData);
        if (responseData.ResponseStatus < 0)
            return;
        var noti = [];
        for (var i = 0; i < responseData.Cards.length; i++) {
            libAccount.UpdateBalance(2, -responseData.BetValue, 2);

            if (i === 0) {
                commonMinipoker.GamePoker.startSpin(responseData.Cards[i], responseData.PrizeValue1, responseData);
                if (responseData.PrizeValue1 > 0)
                    noti.push(responseData.PrizeValue1);
            }
            if (i === 1) {
                commonMinipoker.GameX5Poker.startSpin(responseData.Cards[i], responseData.PrizeValue2, 1);
                if (responseData.PrizeValue2 > 0)
                    noti.push(responseData.PrizeValue2);
            }

            if (i === 2) {
                commonMinipoker.GameX5Poker.startSpin(responseData.Cards[i], responseData.PrizeValue3, 2);
                if (responseData.PrizeValue3 > 0)
                    noti.push(responseData.PrizeValue3);

            }
            if (i === 3) {
                commonMinipoker.GameX5Poker.startSpin(responseData.Cards[i], responseData.PrizeValue4, 3);
                if (responseData.PrizeValue4 > 0)
                    noti.push(responseData.PrizeValue4);

            }
            if (i === 4) {
                commonMinipoker.GameX5Poker.startSpin(responseData.Cards[i], responseData.PrizeValue5, 4);
                if (responseData.PrizeValue5 > 0)
                    noti.push(responseData.PrizeValue5);
            }


        }

        if (noti.length > 0) {
            commonGame.showNotify(2, noti);
        }
    };

    //Huong dan choi
    var temGuildPoker;
    this.showGuide = function(id) {
        commonGame.showPopup();
        if (typeof temGuildPoker == 'undefined')
            temGuildPoker = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/popHelp.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temGuildPoker));
        $("#helpminiPokerSc").slimScroll({
            width: '100%',
            height: '566px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });
    };

    //lich su giao dich game
    var temHistoryItem;
    var temHistory;
    this.showHistory = function(type) {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/popHistorySlot.html");
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/historyItemSlot.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
        commonMinipoker.typeHis = type;
        commonMinipoker.cacheData = null;
        getHistory(1);

        commonGame.setActiveTab(commonMinipoker.typeHis);
    };

    function getHistory(current) {
        $('#pager').html("");
        if (commonMinipoker.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonMinipoker.urlApi + "GetAccountHistory?betType=" + commonMinipoker.typeHis + "&TopCount=500&r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonMinipoker.cacheData = data;
                        bindHistory(current);
                    }
                }

            });
        } else {
            bindHistory(current);
        }

    };

    function bindHistory(current) {

        $("#itemHis").html(jQuery.processTemplateToText(temHistoryItem, commonMinipoker.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonMinipoker.pageCount = Math.ceil(commonMinipoker.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonMinipoker.pageCount,
            buttonClickCallback: getHistory
        });
    };
    //bang xep hang
    var temRank;
    var temItemRank;

    this.showRank = function(type) { //1xu2sao
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/popRankSlot.html");
        if (typeof temItemRank == 'undefined')
            temItemRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/videopoker/rankItemSlot.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        commonMinipoker.cacheData = null;
        commonMinipoker.typeHis = type;
        getRank(1);
        commonGame.setActiveTab(commonMinipoker.typeHis);
    };


    function getRank(current) {
        var type = commonMinipoker.typeHis;
        if (commonMinipoker.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonMinipoker.urlApi + "GetTopWinners?BetType=" + type + "&TopCount=100&r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonMinipoker.cacheData = data;
                        bindRank(current);
                    }
                }
            });
        } else {
            bindRank(current);
        }
    };

    function bindRank(current) {
        $("#itemRank").html(jQuery.processTemplateToText(temItemRank, commonMinipoker.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonMinipoker.pageCount = Math.ceil(commonMinipoker.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonMinipoker.pageCount,
            buttonClickCallback: getRank
        });
    }



    this.blink = function(id, type, time, interval) {
        if ($('#slotmachine').css('display') == 'none') {
            var timer = window.setInterval(function() {
                $("#" + id + " img").attr("src", commonGame.mediaUrl + "images/slot-icon-star1.png?v=1.1");
                $("#" + id).css("opacity", "1");
                window.setTimeout(function() {
                    $("#" + id + " img").attr("src", commonGame.mediaUrl + "images/slot-icon-nomal1.png");
                }, 700);
            }, interval);
            window.setTimeout(function() {
                clearInterval(timer);
                $("#" + id).css("opacity", "1");
            }, time);
        };
    };

    var intervalcloseSlot;
    var timeautoCloseSlot = 120;
    this.autoClose = function() {
        if (timeautoCloseSlot == 0) {
            if (minipoker.isAuto() == false) {
                commonMinipoker.hideMinipokerGUI();
                clearInterval(intervalcloseSlot);
            } else {
                timeautoCloseSlot = 120;
            }
        } else {
            timeautoCloseSlot--;
        }
    };
    this.setAutoClose = function() {
        clearInterval(intervalcloseSlot);
        timeautoCloseSlot = 120;
        intervalcloseSlot = setInterval('commonMinipoker.autoClose()', 1000);
    };
};
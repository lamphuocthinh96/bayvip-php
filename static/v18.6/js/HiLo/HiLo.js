var preloadHiLo;

var commonHiLo = new function() {
    this.urlApi = jsConfig.connectHilo.API;
    this.playing = false;
    this.betType = 1;
    this.stepType = 1;
    this.locationId = 1;
    this.roomId = 1;
    this.currStep = 0;
    this.currPrize = 0;
    this.currBetValue = 0;
    this.currBalance = 0;
    this.jackpotValue = 0;
    this.isJackpot = 0;
    this.acesCount = 0;
    var cardArray = [];

    var hubStarted = false;
    var fileLoaded = true;
    this.hubName = "hiloGameHub";
    this.hubs = jsConfig.connectHilo.hubUrl;

    this.Init = function() {
        bindInterface();
        if (hubStarted && fileLoaded) {
            this.showHiLoGUI();
            return;
        }
        initHub();
    };

    function initHub() {

        if (hubStarted) return;
        commonHiLo.gameConnection = $.hubConnection(commonHiLo.hubs);
        commonHiLo.gameHub = commonHiLo.gameConnection.createHubProxy(commonHiLo.hubName);
        var hiloHub = new HilogameHub(commonHiLo.gameHub);
        commonHiLo.gameConnection.stateChanged(function(change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.info('Hilo connecting');
            } else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.info('Hilo reconnecting');
            } else if (change.newState === $.signalR.connectionState.connected) {
                console.info('Hilo connected');
            } else if (change.newState === $.signalR.connectionState.disconnected) {
                console.info('Hilo disconnected');
                if (hubStarted && App.currentAccount.AccountID > 0)
                    reconnectHub();
            }
        });
        try {
            commonHiLo.gameConnection.start().done(function() {
                hubStarted = true;
                hiloConnect();
            }).fail(function() {
                reconnectHub();
            });
        } catch (e) {
            reconnectHub();
        }
    };

    function stopHub() {
        try {
            commonHiLo.gameConnection.stop();
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
            if (commonHiLo.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonHiLo.gameConnection.start().done(function() {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }

    function hiloConnect() {
        GetAccountInfo();
    }


    function bindInterface() {
        if ($('#HiLo').length > 0)
            return;

        var str = '';
        var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/HiLo.html" + version);
        tem.setParam('MediaUrl', commonGame.mediaUrl);
        str = jQuery.processTemplateToText(tem);
        $('#ag').append(str);

        $('#HiLo').draggable({
            scroll: false
        });

        $('#HiLoCanvas').bind("click touchstart", commonHiLo.startPlay);

        commonHiLo.GameHilo = new window.Hilo.Game();
        commonHiLo.GameHilo.create();
        createCardArray();
        $("#HiLo").mouseup(function() {

            commonGame.resetZindex();
            $("#HiLo").addClass('active');
        });

        $("#HiLo .HiLo_rect .rect1").click(function() {
            App.treasure.showJackpot(2);
        });

    }

    this.changeBetType = function(betType) {

        if (commonHiLo.playing === true) {
            showMessage('Chờ hết lượt để đổi loại tiền');
            return;
        }
        commonHiLo.betType = betType;
        commonHiLo.changeBetValue(100, 1);
    }
    this.changeBetValue = function(betValue, roomId) {

        commonHiLo.betValue = betValue;
        commonHiLo.roomId = roomId;
        commonHiLo.GameHilo.updatePriceAward(commonHiLo.betValue);
        commonHiLo.GetJackpotHiLo(commonHiLo.betType, commonHiLo.roomId);
    }

    function createCardArray() {
        cardArray = [];
        bizicCardArray = [];
        tezicCardArray = [];
        zoicCardArray = [];
        cozicCardArray = [];

        for (var i = 1; i < 13; i++) { // bich
            var card = {

                number: null,
                type: null
            };

            card.number = setCardNumber(i);
            card.type = setCardType(2);
            bizicCardArray.push(card);
        }

        for (var i = 1; i < 13; i++) { // tep
            var card = {

                number: null,
                type: null
            }

            card.number = setCardNumber(i);
            card.type = setCardType(3);
            tezicCardArray.push(card);
        }

        for (var i = 1; i < 13; i++) { // ro
            var card = {

                number: null,
                type: null
            }

            card.number = setCardNumber(i);
            card.type = setCardType(1);
            zoicCardArray.push(card);
        }

        for (var i = 1; i < 13; i++) { // co
            var card = {

                number: null,
                type: null
            }

            card.number = setCardNumber(i);
            card.type = setCardType(0);
            cozicCardArray.push(card);
        }

        var A_bizic = {

            number: setCardNumber(0),
            type: setCardType(2)
        };
        var A_tezic = {

            number: setCardNumber(0),
            type: setCardType(3)
        };
        var A_zoic = {

            number: setCardNumber(0),
            type: setCardType(1)
        };
        var A_cozic = {

            number: setCardNumber(0),
            type: setCardType(0)
        };

        if (bizicCardArray.length == 12 && tezicCardArray.length == 12 && zoicCardArray.length == 12 && cozicCardArray.length == 12) {
            cardArray = bizicCardArray.concat(A_bizic).concat(tezicCardArray).concat(A_tezic).concat(zoicCardArray).concat(A_zoic).concat(cozicCardArray).concat(A_cozic);
        }

    }

    // set Number
    function setCardNumber(coordX) {
        if (coordX == 0) return 14; // A
        if (coordX == 1) return 2;
        if (coordX == 2) return 3;
        if (coordX == 3) return 4;
        if (coordX == 4) return 5;
        if (coordX == 5) return 6;
        if (coordX == 6) return 7;
        if (coordX == 7) return 8;
        if (coordX == 8) return 9;
        if (coordX == 9) return 10;
        if (coordX == 10) return 11; // J
        if (coordX == 11) return 12; // Q
        if (coordX == 12) return 13; // K
    };

    //set Type
    function setCardType(coordY) {
        if (coordY === 0) return 'coz-ic';
        if (coordY === 1) return 'zo-ic';
        if (coordY === 2) return 'biz-ic';
        if (coordY === 3) return 'tez-ic';
    };





    function resetMoney() {
        commonHiLo.GameHilo.updateMoneyUpDow('', '');
        commonHiLo.GameHilo.updatePriceAward(commonHiLo.betValue);

    }

    function setMoney(rateUpMoney, rateDownMoney, prizeValue) {

        commonHiLo.GameHilo.updateMoneyUpDow(rateUpMoney, rateDownMoney);
        commonHiLo.GameHilo.updatePriceAward(prizeValue);

    }

    //click nut play
    this.startPlay = function() {
        if (commonHiLo.playing === true) {
            return;
        }

        $('.list-card ul').html('');
        commonHiLo.playing = true;
        console.log('startPlay');
        commonHiLo.stepType = 0;
        commonHiLo.locationId = 1;
        SetBetHiLo(commonHiLo.betType, commonHiLo.stepType, commonHiLo.locationId, commonHiLo.roomId);

    };
    // button tren-duoi _onClick
    this.btn_up_onClick = function() {



        enableButtonUpDown(false);
        enableButtonNew(false);

        // Huy dem nguoc, reset thoi gian
        this.countdown(0);

        commonHiLo.locationId = 1;
        commonHiLo.stepType = 1;
        SetBetHiLo(commonHiLo.betType, commonHiLo.stepType, commonHiLo.locationId, commonHiLo.roomId);
    };

    this.btn_down_onClick = function() {


        enableButtonUpDown(false);
        enableButtonNew(false);

        // Huy dem nguoc, reset thoi gian
        this.countdown(0);

        commonHiLo.locationId = 0;
        commonHiLo.stepType = 1;
        SetBetHiLo(commonHiLo.betType, commonHiLo.stepType, commonHiLo.locationId, commonHiLo.roomId);
    };


    this.newTurn = function() {



        if (commonHiLo.isJackpot === 1) {
            $('#HiLo .list-card ul').html(' ');
            resetTurn();
        } else
        if (commonHiLo.playing === true) {
            SetBetHiLo(commonHiLo.betType, 2, Math.floor(Math.random() * 1.9999), commonHiLo.roomId);
            $('#HiLo .list-card ul').html(' ');
            resetTurn();
        }
    }

    function resetTurn() {

        commonHiLo.acesCount = 0;

        commonHiLo.countdown(0);
        resetMoney();
        showSessionId(0);

        enableButtonNew(false);
        enableButtonUpDown(false);
        commonHiLo.playing = false;
        $('#HiLo .list-card ul').html('<li>Click Chơi để bắt</li>');
        commonHiLo.GameHilo.resetAll();
    }
    this.showGameHistory = function(cardData) {
        if (!cardData)
            return;

        var IDArray = cardData.split(',');
        // arr: mang bmpRoot chua ID quan bai ma server tra ve
        var arr = []; // mang chua cac con bai thuc su, lay tu ID server tra ve
        for (var m = 0; m < IDArray.length; m++) {
            arr.push(cardArray[parseInt(IDArray[m])]);
        }

        var html = '';
        var count = (arr.length > 10 ? arr.length - 10 : 0);
        if (arr.length > 0) {
            for (var i = count; i < arr.length; i++) {
                html += renderHistoryCard(arr[i].number, arr[i].type);
            }
            showCard(arr[arr.length - 1]);

        }
        commonHiLo.GameHilo.updateCardCurrent(parseInt(IDArray[IDArray.length - 1]));
        $('#HiLo .list-card ul').html(html);
    };

    function renderHistoryCard(number, type) {
        console.log('number:' + number + 'type:' + type);
        var tempLetter = '';
        if (number == 11) {
            tempLetter = 'J';
        } else if (number == 12) {
            tempLetter = 'Q';
        } else if (number == 13) {
            tempLetter = 'K';
        } else if (number == 14) {
            tempLetter = 'A';
        } else(tempLetter = number);

        return '<li style="color: #FFFF00">' + tempLetter + '<span class="' + type + '"></span>' + '</li>';
    }

    var timeoutHhilo;

    function showMessage(msg) {

        $('#HiLo .message').show();
        $('#HiLo .message').html(msg);

        clearTimeout(timeoutHhilo);
        timeoutHhilo = setTimeout(function() {

            $('#HiLo .message').hide();
        }, 4000);
    }

    function updateAccountBalance(balance) {
        if (App && App.currentAccount) {
            libAccount.UpdateBalance(2, balance);
        }


    }





    function changeMoney(prizeValue) {
        commonHiLo.GameHilo.updateAccountResult(prizeValue);
    }

    // Hieu ung 
    this.cardSlide = function(cardId, callback) {
        enableButtonUpDown(false);
        enableButtonNew(false);

        commonHiLo.GameHilo.showResult(cardId, function() {
            if (commonHiLo.currPrize > 0) {
                enableButtonUpDown(true);
            } else {
                enableButtonUpDown(false);
            }
            if (commonHiLo.currStep > 1 && commonHiLo.currPrize !== 0) {
                enableButtonNew(true);
            }
            var resultCard = cardArray[cardId];
            //hien thi quan bai tai o play
            showCard(resultCard, true);
            //them vao history
            $('#HiLo .list-card ul').append(renderHistoryCard(resultCard.number, resultCard.type));
            if (callback != null)
                callback();
        });
    }

    function showCard(resultCard, current) {
        if (!resultCard)
            return;

        if (resultCard.number === 2) {
            commonHiLo.GameHilo.buttonDown(false);
        } else if (resultCard.number === 14) {
            commonHiLo.GameHilo.buttonUp(false);

            if (current) {
                commonHiLo.acesCount++;
                commonHiLo.GameHilo.updateAcesCount(commonHiLo.acesCount);

            }
        }

    }

    function showSessionId(sessionId) {

        commonHiLo.GameHilo.updateSession(sessionId);
    }

    function enableButtonUpDown(enabled) {
        commonHiLo.GameHilo.enableButtonUpDown(enabled);

    }

    function enableButtonNew(enabled) {

        commonHiLo.GameHilo.enableButtonNew(enabled);

    }

    // No jackpot
    this.jackpot = function() {
        var getJackpotValue = Math.floor(commonHiLo.currPrize);
        enableButtonUpDown(false);
        enableButtonNew(false);
        setTimeout(function() {
            commonHiLo.newTurn();
        }, 300000);
    }

    // timer
    var countInterval;
    this.countdown = function(time) {
        if (countInterval) {
            clearInterval(countInterval);
            delete countInterval;
        }

        if (time < 1) {
            commonHiLo.GameHilo.updateTime('02:00');
            return;
        }

        countInterval = setInterval(function() {
            if (time > 0)
                time--;
            if (time === 0) {
                clearInterval(countInterval);
                delete countInterval;
                if (commonHiLo.setBetData && commonHiLo.setBetData.step === 1) {
                    // Dat cua ngau nhien
                    if (commonHiLo.GameHilo.stateUp() && !commonHiLo.GameHilo.stateDown()) {
                        // Dat cua duoi (trg hop con bai dau tien la A thi chon thap hon)
                        SetBetHiLo(commonHiLo.betType, 1, 0, commonHiLo.roomId);
                    } else if (!commonHiLo.GameHilo.stateUp() && commonHiLo.GameHilo.stateDown()) {
                        // Dat cua tren (trg hop con bai dau tien la 2 thi chon cao hon)
                        SetBetHiLo(commonHiLo.betType, 1, 1, commonHiLo.roomId);
                    } else {
                        // Khac 2 va A o con bai dau tien
                        SetBetHiLo(commonHiLo.betType, 1, Math.floor(Math.random() * 1.9999), commonHiLo.roomId);
                    }
                } else {
                    //dung van choi
                    SetBetHiLo(commonHiLo.betType, 2, Math.floor(Math.random() * 1.9999), commonHiLo.roomId);
                    $('#HiLo .list-card ul').html('');
                    resetTurn();
                }
            }
            commonHiLo.GameHilo.updateTime(commonGame.formatTime(time));
        }, 1000);
    };

    /* Call server*/
    function GetAccountInfo() {
        try {
            commonHiLo.gameHub.server.GetAccountInfoHiLo().done(function() {}).fail(function() {});
        } catch (e) {}
    }

    function SetBetHiLo(betType, stepType, locationId, roomId) {
        try {
            commonHiLo.playing = true;

            commonHiLo.gameHub.server.SetBetHiLo(betType, stepType, locationId, roomId).done(function(status) {

                if (status < 0) {
                    commonHiLo.playing = false;
                    return;
                }


            }).fail(function() {
                commonHiLo.playing = false;
            });
        } catch (e) {
            commonHiLo.playing = false;
        }
    }
    this.GetJackpotHiLo = function(betType, roomId) {
        try {
            commonHiLo.gameHub.server.GetJackpotHiLo(betType, roomId).done(function() {}).fail(function() {});
        } catch (e) {}
    }

    /* Client xu ly returnData*/
    this.updateHiLoAccountInfo = function(returnData) {
        var turnId = returnData.currentTurnId;
        var step = returnData.currentStep;
        var response = returnData.responseStatus;
        if (response < 0) return;
        showSessionId(turnId);
        this.changeBetType(returnData.currentBetType > 0 ? returnData.currentBetType : commonHiLo.betType);

        if (turnId > 0) {
            commonHiLo.playing = true;
            console.log('updateHiLoAccountInfo');
            enableButtonUpDown(true);
            if (step === 1)
                enableButtonNew(false);
            else
                enableButtonNew(true);
        } else {
            enableButtonUpDown(false);
            enableButtonNew(false);
            commonHiLo.playing = false;
        }
        commonHiLo.acesCount = returnData.acesCount;

        if (returnData.currentRoomId > 0)
            commonHiLo.changeBetValue(returnData.currentBetValue, returnData.currentRoomId);

        // Show cac con bai trong turn
        commonHiLo.showGameHistory(returnData.currentCardData);
        commonHiLo.GameHilo.updateAcesCount(returnData.acesCount);
        if (returnData.acesCount == 3) {
            commonHiLo.jackpot();
        }

        var currentBetValue = returnData.currentBetValue;
        // Hien thi so tien co the an dc theo BetRateDown-Up
        var rateUpMoney = (currentBetValue * returnData.betRateUp).toFixed(0);
        var rateDownMoney = (currentBetValue * returnData.betRateDown).toFixed(0);
        // Neu currentTurnId = 0 (khoi tao) thi ko hien thi rateUp-DownMoney
        // BetValue = gia tri dat cua ban dau
        if (turnId === 0) {
            resetMoney();
        } else if (turnId > 0) { // Hien thi moneyForHigher-Lower va BetValue hien tai
            setMoney(rateUpMoney, rateDownMoney, currentBetValue);

            // Neu remaintime = 0 va currentStep = 2 thi thanh toan + sang Luot Moi.
            // Neu remaintime = 0 va currentStep = 1 thi dat cua ngau nhien va quay.
            if (returnData.remainTime == 0) {
                if (step > 1) {
                    // Stop turn + Payment
                    setTimeout(commonHiLo.newTurn, 2000);
                } else if (step == 1) {
                    // Dat cua ngau nhien
                    //SetBetHiLo(commonHiLo.betType, 1, Math.floor(Math.random() * 1.9999), commonHiLo.roomId);
                    if (commonHiLo.GameHilo.stateUp() && !commonHiLo.GameHilo.stateDown()) {
                        // Dat cua duoi (trg hop con bai dau tien la A thi chon thap hon)
                        SetBetHiLo(commonHiLo.betType, 1, 0, commonHiLo.roomId);
                    } else if (!commonHiLo.GameHilo.stateUp() && commonHiLo.GameHilo.stateDown()) {
                        // Dat cua tren (trg hop con bai dau tien la 2 thi chon cao hon)
                        SetBetHiLo(commonHiLo.betType, 1, 1, commonHiLo.roomId);
                    } else {
                        // Khac 2 va A o con bai dau tien
                        SetBetHiLo(commonHiLo.betType, 1, Math.floor(Math.random() * 1.9999), commonHiLo.roomId);
                    }
                }
            } else if (returnData.remainTime > 0) {
                // Dem nguoc tu thoi gian server tra ve
                commonHiLo.countdown(returnData.remainTime);
            }
        }
    };

    this.updateHiLoSetBet = function(returnData) {
        if (returnData.responseStatus < 0) {
            commonHiLo.playing = false;
            switch (returnData.responseStatus) {
                case -51:
                    showMessage('Bạn không đủ tiền  ');
                    return;
                case -212:
                    showMessage('Cửa đặt không đúng  ');
                    return;
                case -213:
                    showMessage('Loại tiền đặt không đúng  ');
                    return;
                case -214:
                    showMessage('Phòng không đúng  ');
                    return;
                case -215:
                    showMessage('Lượt đang chơi không thế khởi tạo  ');
                    return;
                case -216:
                    if (returnData.prizeValue == 0) {
                        showMessage(' ');
                    } else {
                        showMessage('Bước không phù hợp  ');
                    }
                    return;
                case -207:
                    showMessage('Hết thời gian đặt cược  ');
                    return;
                default:
                    showMessage('Lỗi hệ thống');
                    break;
            }
            return;
        }

        if (returnData.balance > 0) {
            updateAccountBalance(returnData.balance, returnData.prizeValue, returnData.step);
        }

        if (returnData.betValue > 0)
            commonHiLo.betValue = returnData.betValue;

        var turnId = returnData.turnId;
        commonHiLo.currStep = returnData.step;
        commonHiLo.currPrize = returnData.prizeValue;
        commonHiLo.isJackpot = returnData.isJackpot;

        //neu new turn
        if (turnId > 0 && returnData.prizeValue == 0 && returnData.betValue == 0) {
            changeMoney(this.setBetData.prizeValue);
            commonHiLo.playing = false;
            $('#HiLo .list-card ul').css('color', '#FFFF00');
        } else if (turnId > 0) {
            this.setBetData = returnData;
            showSessionId(turnId);

            if (commonHiLo.currStep === 1)
                enableButtonNew(false);
            else
                enableButtonNew(true);
            commonHiLo.cardSlide(returnData.cardId, function() {

                if (returnData.isJackpot === 1) {
                    commonHiLo.jackpot();

                }
                commonHiLo.currBetValue = returnData.prizeValue;
                var rateUpMoney = (commonHiLo.currBetValue * returnData.betRateUp).toFixed(0);
                var rateDownMoney = (commonHiLo.currBetValue * returnData.betRateDown).toFixed(0);

                if (commonHiLo.currStep === 0) {
                    resetMoney();
                } else {
                    commonHiLo.countdown(120);
                    setMoney(rateUpMoney, rateDownMoney, commonHiLo.currBetValue);
                }
                if (returnData.prizeValue === 0 && returnData.betValue > 0) {
                    setTimeout(function() {
                        showMessage('Bạn đã thua');
                        $('#HiLo .list-card ul').css('color', '#FF3030');
                        $('#HiLo .list-card ul').html(' ');
                        enableButtonUpDown(false);
                        enableButtonNew(false);
                        resetTurn();

                    }, 2000);

                }
            });





        } else {
            enableButtonUpDown(false);
            enableButtonNew(false);
            commonHiLo.playing = false;
        }
    };


    this.updateJackpotHiLo = function(returnData) {

        commonGame.countNumber('jackHilo', returnData.Jackpot);


    };


    var temguildHilo;
    this.showGuide = function() {
        commonGame.showPopup();
        if (typeof temguildHilo == 'undefined')
            temguildHilo = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/popHelp.html" + version);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temguildHilo));
    };


    //lich su giao dich game
    var temHistoryItem;
    var temHistory;
    this.showHistory = function(type) {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/popHistoryHiLo.html" + version);
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/historyItemHiLo.html" + version);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
        commonHiLo.typeHis = type;
        commonHiLo.cacheData = null;
        getHistory(1);

        commonGame.setActiveTab(commonHiLo.typeHis);
    };

    function getHistory(current) {
        $('#pager').html("");
        if (commonHiLo.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonHiLo.urlApi + "GetAccountHistory?betType=" + commonHiLo.typeHis + "&TopCount=500&r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonHiLo.cacheData = data;
                        bindHistory(current);
                    }
                }

            });
        } else {
            bindHistory(current);
        }

    };

    function bindHistory(current) {

        $("#itemHis").html(jQuery.processTemplateToText(temHistoryItem, commonHiLo.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonHiLo.pageCount = Math.ceil(commonHiLo.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonHiLo.pageCount,
            buttonClickCallback: getHistory
        });
    };
    //bang xep hang
    var temRank;
    var temItemRank;
    this.showRank = function(type) { //1xu2g
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/popRankHiLo.html" + version);
        if (typeof temItemRank == 'undefined')
            temItemRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/HiLo/rankItemHiLo.html" + version);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        commonHiLo.cacheData = null;
        commonHiLo.typeHis = type;
        getRank(1);

        commonGame.setActiveTab(commonHiLo.typeHis);

    };

    function getRank(current) {
        var type = commonHiLo.typeHis;
        if (commonHiLo.cacheData == null) {
            $.ajax({
                type: "GET",
                url: commonHiLo.urlApi + "GetTopWinners?BetType=" + type + "&TopCount=100&r=" + Math.random(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data != null) {
                        commonHiLo.cacheData = data;
                        bindRank(current);
                    }
                }
            });
        } else {
            bindRank(current);
        }
    };

    function bindRank(current) {
        $("#itemRank").html(jQuery.processTemplateToText(temItemRank, commonHiLo.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonHiLo.pageCount = Math.ceil(commonHiLo.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonHiLo.pageCount,
            buttonClickCallback: getRank
        });
    }


    this.showHiLoGUI = function() {

        if (!hubStarted || !fileLoaded) {
            commonHiLo.Init();

        }
        $('#HiLo').show();
        $('.ic-hl').addClass('active');
        commonGame.resetZindex();
        $("#HiLo").addClass('active');

    };
    this.hideHiLoGUI = function() {

        $('#HiLo').hide();
        $('.ic-hl').removeClass('active');
    };



    this.roomIdToBetValue = function(roomId) {
        var starBetValue = ['1.000', '10.000', '50.000', '100.000', '500.000'];
        return starBetValue[roomId - 1];
    };


}
 var tilenhan = ['Jackpot', 85, 40, 20, 8, 0.8, 3, 0.4, 1.2];
 var versionVua = '?t=42.130';

 var commonKubo = new function() {
     this.rootUrl = jsConfig.urlRootStatic;
     this.MediaUrl = jsConfig.urlRootStatic;
     this.urlApi = jsConfig.connectKubo.API;
     this.imageUrl = jsConfig.urlRootStatic + 'minigame/images/kubo/';
     this.slotGodHub = "";
     this.isRun = false;
     this.version = '1.120';
     this.pageSize = 10;
     this.page = 1;
     this.currentPage = 0;
     this.pageData = [];
     this.History = [];


     this.tiencuoc = 100;
     this.oldJackpotValue = 0;
     this.gold = 1;
     this.timeIntervalJackpot = 0;
     this.positionMaingame = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
     this.numberPacketMainGame = 1;
     this.justCancelAutoMainGame = false;
     this.isAutoMainGame = false;
     this.roomID = 1;
     this.countQuay = 0;
     this.GameConnection = null;

     var hubStarted = false;
     var fileLoaded = true;
     this.hubName = "minicandyHub";
     this.hubs = jsConfig.connectKubo.hubUrl;

     this.Init = function() {
         bindInterface();
         if (hubStarted && fileLoaded) {
             commonKubo.showGoldGUI();
             return;
         }

         initHub();
     };


     function initHub() {
         fileLoaded = true;
         if (hubStarted) return;
         commonKubo.gameConnection = $.hubConnection(commonKubo.hubs);
         commonKubo.gameHub = commonKubo.gameConnection.createHubProxy(commonKubo.hubName);
         var kubogameHub = new KubogameHub(commonKubo.gameHub);
         commonKubo.gameConnection.stateChanged(function(change) {
             if (change.newState === $.signalR.connectionState.connecting) {
                 console.info('kubo connecting');
             } else if (change.newState === $.signalR.connectionState.reconnecting) {
                 console.info('kubo reconnecting');
             } else if (change.newState === $.signalR.connectionState.connected) {
                 console.info('kubo connected');
             } else if (change.newState === $.signalR.connectionState.disconnected) {
                 console.info('kubo disconnected');
                 if (hubStarted && App.currentAccount.AccountID > 0)
                     reconnectHub();
             }
         });
         try {
             commonKubo.gameConnection.start().done(function() {
                 hubStarted = true;
                 bindInterface();
             }).fail(function() {
                 reconnectHub();
             });
         } catch (e) {
             reconnectHub();
         }
     };

     function stopHub() {
         try {
             commonKubo.gameConnection.stop();
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
             if (commonKubo.gameConnection.state == $.signalR.connectionState.disconnected) {
                 commonKubo.gameConnection.start().done(function() {
                     clearInterval(disconnectminigame);
                     delete disconnectminigame;
                 });
             }
         }, 5000);
     }


     function bindInterface() {
         if ($('#Kubo').length > 0)
             return;
         var str = '';
         var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/kubo/slot.html" + version);
         tem.setParam('MediaUrl', commonGame.mediaUrl);
         str = jQuery.processTemplateToText(tem);
         $('#ag').append(str);

         $("#Kubo").draggable({
             scroll: false
         });
         $("#Kubo").mouseup(function() {

             commonGame.resetZindex();
             $("#Kubo").addClass('active');
         });
         commonKubo.GameKubo = new window.Kubo.Game();
         commonKubo.GameKubo.create();
         commonKubo.ChangeBetValue(100, 1);
         commonKubo.GetJackpot();

         $('.number_line').click(function() {
             if (commonKubo.playing)
                 return;
             commonKubo.chondong();

         });
         commonKubo.onClickInPacketAll();
     };


     var timeOutJack;
     this.GetJackpot = function() {
         clearTimeout(timeOutJack);
         var url = commonKubo.urlApi + "GetJackPot?roomID=" + commonKubo.roomID;
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

                     commonGame.countNumber('jackKubo', data);

                 }
             }

         });

         timeOutJack = setTimeout(function() {
             commonKubo.GetJackpot();
         }, 5000);

     };

     this.spins = function() {

         var lineData = "";
         for (var i = 0; i < commonKubo.positionMaingame.length; i++) {
             if (commonKubo.positionMaingame[i] === 1) {
                 lineData += i + 1;
                 lineData += ",";
             }
         }
         lineData = lineData.substring(0, lineData.length - 1);

         if (lineData.length > 0) {
             commonKubo.playing = true;
             try {

                 commonKubo.gameHub.server.UserSpin(commonKubo.roomID, commonKubo.gold, lineData).done(function(result) {
                     if (result < 0) {
                         if (result === -999) {
                             commonKubo.ShowMessage("Bạn chưa đăng nhập");
                         } else if (result === -3000) {
                             commonKubo.ShowMessage("Bạn chưa chọn dòng cược");
                         } else if (result === -3001) {
                             commonKubo.ShowMessage("Bạn chưa chọn phòng chơi");
                         } else if (result === -232) {
                             commonKubo.ShowMessage("Đặt cược không hợp lệ");
                         } else if (result === -51) {
                             commonKubo.ShowMessage("Số dư không đủ");
                         } else {
                             commonKubo.ShowMessage("Lượt quay thất bại");
                         }
                         commonKubo.playing = false;
                         commonKubo.GameKubo.enableButton();
                     }
                 }).fail(function() {
                     commonKubo.ShowMessage("'Lỗi kết nối");
                     commonKubo.playing = false;
                     commonKubo.GameKubo.enableButton();
                 });

             } catch (e) {
                 commonKubo.ShowMessage("'Lỗi kết nối");
                 commonKubo.playing = false;
                 commonKubo.GameKubo.enableButton();
             }



         } else {
             commonKubo.ShowMessage("Bạn chưa chọn dòng nào!");
             commonKubo.playing = false;
             commonKubo.GameKubo.enableButton();
         }
     };
     var timeoutSlotgold;
     this.ShowMessage = function(message) {

         $(".kubo-notice").show();
         $(".kubo-notice").html(message);
         clearTimeout(timeoutSlotgold);
         timeoutSlotgold = setTimeout(function() {
             $(".kubo-notice").hide();
         }, 5000);

     };
     this.RenderResult = function(result) {
         console.log(result);
         if (result.ResponseStatus >= 0) {
             commonKubo.GameKubo.startSpin(result);
         }

     };
     this.showError = function(error) {
         var htmlerror = '';
         switch (error) {
             case -3000:
                 htmlerror = 'Bạn chưa chọn dòng cược';
                 break;
             case -3001:
                 htmlerror = 'Bạn chưa chọn phòng chơi';
                 break;
             case -232:
                 htmlerror = 'Đặt cược không hợp lệ';
                 break;
             case -999:
                 htmlerror = 'Bạn vui lòng đăng nhập</span>';
                 break;
             default:
                 htmlerror = 'Hệ thống bận. Vui lòng thử lại sau';
                 break;
         }
         $(".kubo-notice").show();
         $(".kubo-notice").html(htmlerror);
         setTimeout(function() {
             $(".kubo-notice").hide();
         }, 2000);

     };

     this.FormatNumber = function(p_sStringNumber) {
         p_sStringNumber += '';
         var x = p_sStringNumber.split(',');
         var x1 = x[0];
         var x2 = x.length > 1 ? ',' + x[1] : '';
         var rgx = /(\d+)(\d{3})/;
         while (rgx.test(x1))
             x1 = x1.replace(rgx, '$1' + '.' + '$2');

         return x1 + x2;
     };

     this.timeIntervalSangline = 0;
     this.countSangline = 0;

     this.chondong = function() {
         $(".kubo-lines").show();
     };

     this.confirmChondong = function() {
         $(".kubo-lines").hide();

     };

     this.onClickInPacket = function(stringNumber) {
         var arrayParse = JSON.parse("[" + stringNumber + "]");
         for (var i = 0; i < arrayParse.length; i++) {
             if (commonKubo.positionMaingame[arrayParse[i] - 1] == 1) {
                 commonKubo.positionMaingame[arrayParse[i] - 1] = 0;
                 $(".kubo #so" + arrayParse[i]).removeClass("active");
                 commonKubo.numberPacketMainGame--;
             } else {
                 commonKubo.positionMaingame[arrayParse[i] - 1] = 1;
                 $(".kubo #so" + arrayParse[i]).removeClass("active");
                 $(".kubo #so" + arrayParse[i]).addClass("active");
                 commonKubo.numberPacketMainGame++;
             }
         }
         $('.number_line').html(commonKubo.numberPacketMainGame);
     };

     this.ChangeBetValue = function(betValue, roomId) {
         if (commonKubo.playing)
             return;
         clearTimeout(timeOutJack);
         commonKubo.betvalue = betValue;
         commonKubo.roomID = roomId;
         commonKubo.GetJackpot();
     };


     //Onclick button tui chan
     this.onClickInPacketChan = function() {
         for (var i = 0; i < commonKubo.positionMaingame.length; i++) {
             if (i % 2 != 0) {
                 commonKubo.positionMaingame[i] = 1;
                 $(".kubo #so" + (i + 1)).removeClass("active");
                 $(".kubo #so" + (i + 1)).addClass("active");

             } else {
                 commonKubo.positionMaingame[i] = 0;
                 $(".kubo #so" + (i + 1)).removeClass("active");

             }
         }
         commonKubo.numberPacketMainGame = 10;
         $('.number_line').html(commonKubo.numberPacketMainGame);
     };

     //Onclick button tui le
     this.onClickInPacketLe = function() {
         for (var i = 0; i < commonKubo.positionMaingame.length; i++) {
             if (i % 2 == 0) {
                 commonKubo.positionMaingame[i] = 1;
                 $(".kubo #so" + (i + 1)).removeClass("active");
                 $(".kubo #so" + (i + 1)).addClass("active");

             } else {
                 commonKubo.positionMaingame[i] = 0;
                 $(".kubo #so" + (i + 1)).removeClass("active");

             }
         }
         commonKubo.numberPacketMainGame = 10;
         $('.number_line').html(commonKubo.numberPacketMainGame);

     };

     //Onclick button All
     this.onClickInPacketAll = function() {
         for (var i = 0; i < commonKubo.positionMaingame.length; i++) {
             commonKubo.positionMaingame[i] = 1;
             $(".kubo #so" + (i + 1)).removeClass("active");
             $(".kubo #so" + (i + 1)).addClass("active");

         }
         commonKubo.numberPacketMainGame = 20;
         $('.number_line').html(commonKubo.numberPacketMainGame);
     };

     //Bo lua chon tui loc da chon
     this.onClickRemoveSelectionpacket = function() {
         for (var i = 0; i < commonKubo.positionMaingame.length; i++) {
             if (commonKubo.positionMaingame[i] == 1) {
                 $(".kubo #so" + (i + 1)).removeClass("active");
                 commonKubo.positionMaingame[i] = 0;
             }
         }
         commonKubo.numberPacketMainGame = 0;
         $('.number_line').html(commonKubo.numberPacketMainGame);
     };

     this.showGUI = function() {
         if (!fileLoaded || !hubStarted) {
             commonKubo.Init();

         }
         $('#Kubo').show();
         $('.ic-kb').addClass('active');
         commonGame.resetZindex();
         $("#Kubo").addClass('active');

     };
     this.hideGUI = function() {
         $('#Kubo').hide();
         $('.ic-kb').removeClass('active');
         commonKubo.gameHub.server.HideCandy().done(function(result) {}).fail(function() {
             return;
         });
     };



     var temGuildslotgold;
     this.showGuide = function(id) {
         commonGame.showPopup();
         if (typeof temGuildPoker == 'undefined')
             temGuildslotgold = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/kubo/popHelp.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temGuildslotgold));
         $("#helpcommonKubo").slimScroll({
             width: '100%',
             height: '566px',
             railVisible: false,
             color: '#fff',
             allowPageScroll: false,
             touchScrollStep: 100,
             alwaysVisible: false
         });
     };


     this.historyType = 1;
     var temHistory;
     var temHistoryItem;
     this.showHistory = function() {
         commonGame.showPopup();
         if (typeof temHistory == 'undefined')
             temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/kubo/popHistory.html" + version);

         if (typeof temHistoryItem == 'undefined')
             temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/kubo/historyItem.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
         commonGame.cacheData = null;
         getHistory(1);
         commonGame.setActiveTab(1);

     };

     function getHistory(current) {
         if (commonGame.cacheData == null && commonGame.cacheData != '') {
             libs.GetData(commonKubo.urlApi + "GetHistory/?r=" + Math.random(), {},
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
     var temItemRank;

     this.showRank = function(type) { //1xu2sao
         commonGame.showPopup();
         if (typeof temRank == 'undefined')
             temRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/kubo/popRankSlot.html" + version);
         if (typeof temItemRank == 'undefined')
             temItemRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/kubo/rankItemSlot.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
         commonGame.cacheData = null;

         getRank(1);
         commonGame.setActiveTab(1);
     };

     function getRank(current) {

         if (commonGame.cacheData == null) {
             $.ajax({
                 type: "GET",
                 url: commonKubo.urlApi + "GetNotification?r=" + Math.random(),
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 crossDomain: true,
                 xhrFields: {
                     withCredentials: true
                 },
                 success: function(data) {
                     if (data != null) {
                         commonGame.cacheData = data;
                         bindRank(current);
                     }
                 }
             });
         } else {
             bindRank(current);
         }
     };


     function bindRank(current) {
         $("#itemRank").html(jQuery.processTemplateToText(temItemRank, commonGame.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
         commonGame.pageCount = Math.ceil(commonGame.cacheData.length / commonGame.rowperPage);
         $("#pager").pager({
             pagenumber: current,
             pagecount: commonGame.pageCount,
             buttonClickCallback: getRank
         });
     }







     this.tinhtile = function(id) {
         return tilenhan[id - 1];
     };
     this.itemIdChoose = 0;
     this.prizeValueChoose = 0;
     this.accPrizeID = 0;
     this.prizeIDMulti = function(prizeId) {
         switch (prizeId) {
             case 1:
                 return "Nổ hũ";
                 break;
             case 2:
                 return "Hiện vật";
                 break;
             case 3:
                 return "Tích lũy";
                 break;
             case 4:
                 return "x500";
                 break;
             case 5:
                 return "x100";
                 break;
             case 6:
                 return "x40";
                 break;
             case 7:
                 return "x10";
                 break;
             case 8:
                 return "x3";
                 break;
             case 9:
                 return "x1";
                 break;
             case 10:
                 return "x0.5";
                 break;
             case 11:
                 return "0";
                 break;
             default:
                 return "";
                 break;
         }
     };
     this.setPopup = function(width, height) {
         $('#mini_popup').css('width', width);
         $('#mini_popup').css('height', height);
         var leftOffset = ($(window).width() - width) / 2;
         var topOffset = ($(window).height() - height) / 2 + $(window).scrollTop();
         $('#mini_popup_Container').css('left', leftOffset + "px");
         $('#mini_popup_Container').css('z-index', 1300);
         $('#mini_popup_Container').css("top", "71px");
         $('#mini_popup_Container').css('position', 'absolute');
     };
     this.closePopupParent = function() {
         $('#mini_popup_Container').remove();
         $('#mini_overlay').remove();
     };
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
         return curr_date + "/" + curr_month + "/" + curr_year + " <br> " +
             _hour + ":" + _minute;
     };


     this.getObjects = function(obj, key, val) {
         var objects = [];
         for (var i in obj) {

             var spinID = obj[i].SpinID;
             if (spinID == val) {
                 objects.push(obj[i]);
             }
         }
         return objects;
     };
 };
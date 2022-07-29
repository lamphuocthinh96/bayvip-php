 var tilenhan = ['Jackpot', 85, 40, 20, 8, 0.8, 3, 0.4, 1.2];
 var versionVua = '?t=42.130';

 var commonCandy = new function() {
     this.rootUrl = jsConfig.urlRootStatic;
     this.MediaUrl = jsConfig.urlRootStatic;
     this.urlApi = jsConfig.connectCandy.API;
     this.imageUrl = jsConfig.urlRootStatic + 'minigame/images/candy/';
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
     this.hubs = jsConfig.connectCandy.hubUrl;

     this.Init = function() {
         bindInterface();
         if (hubStarted && fileLoaded) {
             commonCandy.showGoldGUI();
             return;
         }

         initHub();
     };


     function initHub() {
         fileLoaded = true;
         if (hubStarted) return;
         commonCandy.gameConnection = $.hubConnection(commonCandy.hubs);
         commonCandy.gameHub = commonCandy.gameConnection.createHubProxy(commonCandy.hubName);
         var candygameHub = new CandygameHub(commonCandy.gameHub);
         commonCandy.gameConnection.stateChanged(function(change) {
             if (change.newState === $.signalR.connectionState.connecting) {
                 console.info('candy connecting');
             } else if (change.newState === $.signalR.connectionState.reconnecting) {
                 console.info('candy reconnecting');
             } else if (change.newState === $.signalR.connectionState.connected) {
                 console.info('candy connected');
             } else if (change.newState === $.signalR.connectionState.disconnected) {
                 console.info('candy disconnected');
                 if (hubStarted && App.currentAccount.AccountID > 0)
                     reconnectHub();
             }
         });
         try {
             commonCandy.gameConnection.start().done(function() {
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
             commonCandy.gameConnection.stop();
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
             if (commonCandy.gameConnection.state == $.signalR.connectionState.disconnected) {
                 commonCandy.gameConnection.start().done(function() {
                     clearInterval(disconnectminigame);
                     delete disconnectminigame;
                 });
             }
         }, 5000);
     }


     function bindInterface() {
         if ($('#Candy').length > 0)
             return;
         var str = '';
         var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/candy/slot.html" + version);
         tem.setParam('MediaUrl', commonGame.mediaUrl);
         str = jQuery.processTemplateToText(tem);
         $('#ag').append(str);

         $("#Candy").draggable({
             scroll: false
         });
         $("#Candy").mouseup(function() {

             commonGame.resetZindex();
             $("#Candy").addClass('active');
         });
         commonCandy.GameCandy = new window.Candy.Game();
         commonCandy.GameCandy.create();
         commonCandy.ChangeBetValue(100, 1);
         commonCandy.GetJackpot();

         $('.number_line').click(function() {
             if (commonCandy.playing)
                 return;
             commonCandy.chondong();

         });
         commonCandy.onClickInPacketAll();
     };


     var timeOutJack;
     this.GetJackpot = function() {
         clearTimeout(timeOutJack);
         var url = commonCandy.urlApi + "GetJackPot?roomID=" + commonCandy.roomID;
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

                     commonGame.countNumber('jackCandy', data);

                 }
             }

         });

         timeOutJack = setTimeout(function() {
             commonCandy.GetJackpot();
         }, 5000);

     };

     this.spins = function() {

         var lineData = "";
         for (var i = 0; i < commonCandy.positionMaingame.length; i++) {
             if (commonCandy.positionMaingame[i] === 1) {
                 lineData += i + 1;
                 lineData += ",";
             }
         }
         lineData = lineData.substring(0, lineData.length - 1);

         if (lineData.length > 0) {
             commonCandy.playing = true;
             try {

                 commonCandy.gameHub.server.UserSpin(commonCandy.roomID, commonCandy.gold, lineData).done(function(result) {
                     if (result < 0) {
                         if (result === -999) {
                             commonCandy.ShowMessage("Bạn chưa đăng nhập");
                         } else if (result === -3000) {
                             commonCandy.ShowMessage("Bạn chưa chọn dòng cược");
                         } else if (result === -3001) {
                             commonCandy.ShowMessage("Bạn chưa chọn phòng chơi");
                         } else if (result === -232) {
                             commonCandy.ShowMessage("Đặt cược không hợp lệ");
                         } else if (result === -51) {
                             commonCandy.ShowMessage("Số dư không đủ");
                         } else {
                             commonCandy.ShowMessage("Lượt quay thất bại");
                         }
                         commonCandy.playing = false;
                         commonCandy.GameCandy.enableButton();
                     }
                 }).fail(function() {
                     commonCandy.ShowMessage("'Lỗi kết nối");
                     commonCandy.playing = false;
                     commonCandy.GameCandy.enableButton();
                 });

             } catch (e) {
                 commonCandy.ShowMessage("'Lỗi kết nối");
                 commonCandy.playing = false;
                 commonCandy.GameCandy.enableButton();
             }



         } else {
             commonCandy.ShowMessage("Bạn chưa chọn dòng nào!");
             commonCandy.playing = false;
             commonCandy.GameCandy.enableButton();
         }
     };
     var timeoutSlotgold;
     this.ShowMessage = function(message) {

         $(".candy-notice").show();
         $(".candy-notice").html(message);
         clearTimeout(timeoutSlotgold);
         timeoutSlotgold = setTimeout(function() {
             $(".candy-notice").hide();
         }, 5000);

     };
     this.RenderResult = function(result) {
         console.log(result);
         if (result.ResponseStatus >= 0) {
             commonCandy.GameCandy.startSpin(result);
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
         $(".candy-notice").show();
         $(".candy-notice").html(htmlerror);
         setTimeout(function() {
             $(".candy-notice").hide();
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
         $(".candy-lines").show();
     };

     this.confirmChondong = function() {
         $(".candy-lines").hide();

     };

     this.onClickInPacket = function(stringNumber) {
         var arrayParse = JSON.parse("[" + stringNumber + "]");
         for (var i = 0; i < arrayParse.length; i++) {
             if (commonCandy.positionMaingame[arrayParse[i] - 1] == 1) {
                 commonCandy.positionMaingame[arrayParse[i] - 1] = 0;
                 $(".candy #so" + arrayParse[i]).removeClass("active");
                 commonCandy.numberPacketMainGame--;
             } else {
                 commonCandy.positionMaingame[arrayParse[i] - 1] = 1;
                 $(".candy #so" + arrayParse[i]).removeClass("active");
                 $(".candy #so" + arrayParse[i]).addClass("active");
                 commonCandy.numberPacketMainGame++;
             }
         }
         $('.number_line').html(commonCandy.numberPacketMainGame);
     };

     this.ChangeBetValue = function(betValue, roomId) {
         if (commonCandy.playing)
             return;
         clearTimeout(timeOutJack);
         commonCandy.betvalue = betValue;
         commonCandy.roomID = roomId;
         commonCandy.GetJackpot();
     };


     //Onclick button tui chan
     this.onClickInPacketChan = function() {
         for (var i = 0; i < commonCandy.positionMaingame.length; i++) {
             if (i % 2 != 0) {
                 commonCandy.positionMaingame[i] = 1;
                 $(".candy #so" + (i + 1)).removeClass("active");
                 $(".candy #so" + (i + 1)).addClass("active");

             } else {
                 commonCandy.positionMaingame[i] = 0;
                 $(".candy #so" + (i + 1)).removeClass("active");

             }
         }
         commonCandy.numberPacketMainGame = 10;
         $('.number_line').html(commonCandy.numberPacketMainGame);
     };

     //Onclick button tui le
     this.onClickInPacketLe = function() {
         for (var i = 0; i < commonCandy.positionMaingame.length; i++) {
             if (i % 2 == 0) {
                 commonCandy.positionMaingame[i] = 1;
                 $(".candy #so" + (i + 1)).removeClass("active");
                 $(".candy #so" + (i + 1)).addClass("active");

             } else {
                 commonCandy.positionMaingame[i] = 0;
                 $(".candy #so" + (i + 1)).removeClass("active");

             }
         }
         commonCandy.numberPacketMainGame = 10;
         $('.number_line').html(commonCandy.numberPacketMainGame);

     };

     //Onclick button All
     this.onClickInPacketAll = function() {
         for (var i = 0; i < commonCandy.positionMaingame.length; i++) {
             commonCandy.positionMaingame[i] = 1;
             $(".candy #so" + (i + 1)).removeClass("active");
             $(".candy #so" + (i + 1)).addClass("active");

         }
         commonCandy.numberPacketMainGame = 20;
         $('.number_line').html(commonCandy.numberPacketMainGame);
     };

     //Bo lua chon tui loc da chon
     this.onClickRemoveSelectionpacket = function() {
         for (var i = 0; i < commonCandy.positionMaingame.length; i++) {
             if (commonCandy.positionMaingame[i] === 1) {
                 $(".candy #so" + (i + 1)).removeClass("active");
                 commonCandy.positionMaingame[i] = 0;
             }
         }
         commonCandy.numberPacketMainGame = 0;
         $('.number_line').html(commonCandy.numberPacketMainGame);
     };

     this.showGUI = function() {
         if (!fileLoaded || !hubStarted) {
             commonCandy.Init();

         }
         $('#Candy').show();
         $('.ic-bc').addClass('active');
         commonGame.resetZindex();
         $("#Candy").addClass('active');

     };
     this.hideGUI = function() {
         $('#Candy').hide();
         $('.ic-bc').removeClass('active');
         commonCandy.gameHub.server.HideCandy().done(function(result) {}).fail(function() {
             return;
         });
     };



     var temGuildslotgold;
     this.showGuide = function(id) {
         commonGame.showPopup();
         if (typeof temGuildPoker == 'undefined')
             temGuildslotgold = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/candy/popHelp.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temGuildslotgold));
         $("#helpcommonCandy").slimScroll({
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
             temHistory = jQuery.createTemplateURL(commonGame.urlRoot + "templates/candy/popHistory.html" + version);

         if (typeof temHistoryItem == 'undefined')
             temHistoryItem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/candy/historyItem.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
         commonGame.cacheData = null;
         getHistory(1);
         commonGame.setActiveTab(1);

     };

     function getHistory(current) {
         if (commonGame.cacheData == null && commonGame.cacheData != '') {
             libs.GetData(commonCandy.urlApi + "GetHistory/?r=" + Math.random(), {},
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
             temRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/candy/popRankSlot.html" + version);
         if (typeof temItemRank == 'undefined')
             temItemRank = jQuery.createTemplateURL(commonMinipoker.urlRoot + "templates/candy/rankItemSlot.html" + version);
         commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
         commonGame.cacheData = null;

         getRank(1);
         commonGame.setActiveTab(1);
     };

     function getRank(current) {

         if (commonGame.cacheData == null) {
             $.ajax({
                 type: "GET",
                 url: commonCandy.urlApi + "GetNotification?r=" + Math.random(),
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
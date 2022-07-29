var commonXoso = new function() {
    this.MEDIA_URL = jsConfig.urlRootStatic;
    this.urlApi = jsConfig.connectXoso.API;
    this.LocationID = 0;
    this.pageResult = [];
    this.arrBet = [];
    this.sessionData = null;
    this.freeTicket = 0;

    this.configRate = [{
            LocationID: 1,
            MinBet: 1000,
            MaxBet: 10000000
        },
        {
            LocationID: 2,
            MinBet: 1000,
            MaxBet: 100000000
        },
        {
            LocationID: 3,
            MinBet: 1000,
            MaxBet: 100000000
        },
        {
            LocationID: 4,
            MinBet: 1000,
            MaxBet: 1000000
        },
        {
            LocationID: 5,
            MinBet: 1000,
            MaxBet: 50000000
        },
        {
            LocationID: 6,
            MinBet: 1000,
            MaxBet: 2000000
        },
        {
            LocationID: 7,
            MinBet: 1000,
            MaxBet: 50000000
        },
        {
            LocationID: 8,
            MinBet: 1000,
            MaxBet: 25000000
        },
        {
            LocationID: 9,
            MinBet: 1000,
            MaxBet: 5000000
        }
    ]

    this.Init = function() {
        bindInterface();
    };

    function bindInterface() {
        if ($('#playxoso').length > 0)
            return;

        var tem = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xoso/play.html");
        tem.setParam('MediaUrl', commonGame.mediaUrl);
        var str = jQuery.processTemplateToText(tem);
        $('#ag').append(str);
        $("#playxoso").draggable({
            scroll: false
        });
        $("#playxoso").mouseup(function() {
            commonGame.resetZindex();
            $("#playxoso").addClass('active');
        });

        var htmlbet = '';
        for (var i = 0; i <= 99; i++) {
            var num = i < 10 ? 0 + '' + i : i;
            htmlbet += '<li class="numberbetxoso' + i + '"  ref ="' + i + '">' + num + '</li>';


        }
        $('.popupbetxoso .supportBet ul').html(htmlbet);

        $(".contentnotify").slimScroll({
            height: '220px'
        });
        $('.backbetXoso').unbind('click').click(function() {
            $('.popupbetxoso').hide();
            $('.popupbetxoso .supportBet').hide();
            $('.popupbetxoso .supportBetmoney').hide();
            $('.popupbetxoso .txtamounts').val('');
            $('.popupbetxoso .sumtotalbetxoso').html('0');

            $('#ct_betxoso .freemoneylabel span').html('0');
            commonXoso.freeTicket = 0;
            commonXoso.arrBet = [];
            bindingBetinput();


        });
        $('.ulbtxoso .datxoso').unbind('click').click(function() {
            var id = parseInt($(this).attr('data-id'));
            commonXoso.showBet(id);
        });

        $('.infoketquaxoso .btbackxoso').unbind('click').click(function() {

            if (commonXoso.pageCurrent > 0)
                commonXoso.pageCurrent += -1;
            bindingResult();

        });
        $('.infoketquaxoso .btnextxoso').unbind('click').click(function() {
            if (commonXoso.pageCurrent < commonXoso.pageResult.length - 1)
                commonXoso.pageCurrent += 1;
            bindingResult();
        });

        $('#closesupportBetId').unbind('click').click(function() {
            $('.popupbetxoso .supportBet').hide();
            sumAmount();

        });

        $('.popupbetxoso .supportBet li').unbind('click').click(function(event) {
            var ref = parseInt($(this).attr('ref'));
            commonXoso.selectbeffast(ref);
        });


        $('#unAllselectBetid').unbind('click').click(function() {
            commonXoso.arrBet = [];
            bindingBetinput();
        });

        $('#oddselectBetid').unbind('click').click(function() {
            commonXoso.arrBet = [];
            for (i = 0; i <= 99; i++) {
                if (i % 2 != 0) {
                    commonXoso.arrBet.push(i)
                }

            }
            bindingBetinput();
        });

        $('#eventselectBetid').unbind('click').click(function() {
            commonXoso.arrBet = [];
            for (i = 0; i <= 99; i++) {
                if (i % 2 == 0) {
                    commonXoso.arrBet.push(i)
                }
            }
            bindingBetinput();
        });

        $('.popupbetxoso .betXoso').unbind('click').click(function(event) {

            if (commonXoso.sessionData == null || commonXoso.RemainBetting <= 0) {
                showMessage('Chờ đặt cửa');
                return;
            }
            $('.popupbetxoso .supportBet').hide();
            $('.popupbetxoso .supportBetmoney').hide();
            $('.popupbetxoso .msg_xoso').hide();
            var erro = checkBet();
            if (erro.length > 0) {
                showMessage(erro)
                return;
            }
            $('#ct_betxosook').show();
            $('.popupbetxoso .textbetxacnhan').html($('.popupbetxoso .txtbetxs').val());
            $('.popupbetxoso .amountbetxoso_xacnhan span').html(commonGame.FormatNumber(parseInt($('.popupbetxoso .txtamounts').val())));
            $('.popupbetxoso .sum_xacnhan span').html($('.popupbetxoso .sumtotalbetxoso').html());

            $('.popupbetxoso .typebetxoso_xacnhan').html('Bạn đã chọn ' + $('.popupbetxoso .title').html() + ',ngày ' + commonGame.formDateTimehmsType(commonXoso.sessionData.DayCurrent, 1));

        });



        $('#ct_betxoso .btfree1k').unbind('click').click(function(event) {
            commonXoso.freeTicket = 1000;
            $('#ct_betxoso .freemoneylabel span').html('1.000');
            $('.popupbetxoso .txtamounts').val(1000);
            $('.popupbetxoso .supportBetmoney').hide();
            sumAmount();
        });
        $('#ct_betxoso .btfree10k').unbind('click').click(function(event) {
            commonXoso.freeTicket = 10000;
            $('#ct_betxoso .freemoneylabel span').html('10.000');
            $('.popupbetxoso .txtamounts').val(10000);
            $('.popupbetxoso .supportBetmoney').hide();
            sumAmount();
        });
        $('#ct_betxoso .btfree5k').unbind('click').click(function(event) {
            commonXoso.freeTicket = 5000;
            $('#ct_betxoso .freemoneylabel span').html('5.000');
            $('.popupbetxoso .txtamounts').val(5000);
            $('.popupbetxoso .supportBetmoney').hide();
            sumAmount();


        });





        $('.popupbetxoso').unbind('click').click(function(event) {

            var target = event.target || event.srcElement;
            if (target.className == 'popupbetxoso') {
                $('.popupbetxoso .supportBet').hide();
                $('.popupbetxoso .supportBetmoney').hide();

            }


        });


        $('.popupbetxoso .back_xacnhan').unbind('click').click(function(event) {
            $('#ct_betxosook').hide();



        });

        $('.popupbetxoso .bt_xacnhan').unbind('click').click(function(event) {
            commonXoso.setBetxoso();
        });


        $('#playxoso .mini_close').unbind('click').click(function() {
            commonXoso.hideGUI();
        });
        $('#playxoso .mini_help').unbind('click').click(function() {
            commonXoso.showGuide();
        });
        $('#playxoso .mini_rank').unbind('click').click(function() {
            commonXoso.showRank(1);
        });
        $('#playxoso .mini_history').unbind('click').click(function() {
            commonXoso.showHistory(1);
        });
        $('#playxoso .btxosotickUser').unbind('click').click(function() {
            commonXoso.showHistory(1);
        });

    };

    this.setBetxoso = function() {
        var amount = parseInt($('.popupbetxoso .txtamounts').val());
        var txtbets = $('.popupbetxoso .txtbetxs').val();
        var datapost = {
            gameSessionID: commonXoso.sessionData.GameSessionID,
            locationID: commonXoso.LocationID,
            betValue: amount,
            freeTicket: commonXoso.freeTicket,
            databet: txtbets
        };

        libs.PostData3(commonXoso.urlApi + 'SetBet', datapost,
            function(data) {

                $('#ct_betxosook').hide();
                showMessage('Đặt cửa thành công', 1);
                if (!data.IsTick) {
                    libAccount.UpdateBalance(2, data.Balance);
                } else {
                    commonXoso.getAccountInfotick();
                }
            },
            function(xhr, ajaxOptions, thrownError) {
                var err = xhr.responseText;
                $('#ct_betxosook').hide();
                showMessage(err);
            });
    }

    this.getResult = function() {
        libs.GetData2(commonXoso.urlApi + 'GetLotteryResults', {},
            function(data) {
                if (data != null) {

                    commonXoso.pageResult = data;
                    commonXoso.pageCurrent = data.length - 1;

                    bindingResult();
                }
            },
            function(xhr, ajaxOptions, thrownError) {});
    }

    var timeoutGetSessiondata;
    this.getSessionData = function() {
        clearTimeout(timeoutGetSessiondata);

        libs.GetData2(commonXoso.urlApi + 'GetSessionData', {},
            function(data) {
                if (data != null) {
                    commonXoso.sessionData = data.SessionData;
                    commonXoso.notifyData = data.NotifyData;

                    bindingSessionData();
                }
            },
            function(xhr, ajaxOptions, thrownError) {});

        timeoutGetSessiondata = setTimeout(function() {
            commonXoso.getSessionData();
        }, 5000);
    }
    var intervaxosoRemain;

    function bindingSessionData() {
        clearInterval(intervaxosoRemain);
        intervaxosoRemain = setInterval(function() {
            if (commonXoso.sessionData != null) {
                commonXoso.sessionData.RemainBetting += -1;
                commonXoso.sessionData.RemainWaiting += -1;
                if (commonXoso.sessionData.RemainBetting > 0) {
                    $('#xososessionData').html('Đặt cửa,Thời gian đợi còn :  <span style="color: #ffff00; font-weight: bold;">' + secondsTohhmmss(commonXoso.sessionData.RemainBetting) + '</span> ');
                }

                if (commonXoso.sessionData.RemainWaiting > 0) {
                    $('#xososessionData').html('Chờ đặt cửa,Thời gian đợi còn :  <span style="color: #ffff00; font-weight: bold;">' + secondsTohhmmss(commonXoso.sessionData.RemainWaiting) + '</span> ');
                }
            }

        }, 1000);

        if (commonXoso.notifyData == null || commonXoso.notifyData === undefined)
            return;

        var html = '';
        for (var i = 0; i < commonXoso.notifyData.length; i++) {
            html += '<li><span class="userxoso">' + commonXoso.notifyData[i].NickName + '</span> đặt <span class="usermoney">' + commonGame.FormatNumber(commonXoso.notifyData[i].BetPrize) + '</span> ' + commonXoso.notifyData[i].Description + ' <span class="userbetinfo">(' + commonXoso.notifyData[i].NumberData + ')</span>- ' + commonXoso.notifyData[i].DateString + '</li>'
        }
        $('.notifyxoso .contentnotify').html(html);

    }
    this.changePage = function() {

        $('.infoketquaxoso .btnextxoso').removeClass('disable');
        $('.infoketquaxoso .btbackxoso').removeClass('disable');

        if (commonXoso.pageCurrent >= commonXoso.pageResult.length - 1) {
            $('.infoketquaxoso .btnextxoso').addClass('disable');
            $('.infoketquaxoso .btbackxoso').removeClass('disable');

        }

        if (commonXoso.pageCurrent <= 0) {
            $('.infoketquaxoso .btnextxoso').removeClass('disable');
            $('.infoketquaxoso .btbackxoso').addClass('disable');

        }


    }

    function bindingResult() {
        commonXoso.changePage();
        try {
            var data = commonXoso.pageResult[commonXoso.pageCurrent];
            $('.infoketquaxoso .dayxoso').html(data.CrDate);
            for (var i = 0; i < data.lotteryResults.length; i++) {
                var result = data.lotteryResults[i];
                var number = result.Number.split(',');
                for (var j = 0; j < number.length; j++) {
                    $('.ulketquaxoso .prizeId' + result.PrizeID + '' + j).html(number[j])
                }

            }


        } catch (err) {


        }





    }

    this.selectbeffast = function(numbet) {

        var result = commonXoso.arrBet.filter(function(elem) {
            return elem == numbet;
        });

        if (result.length > 0) {

            var newBet = jQuery.grep(commonXoso.arrBet, function(value) {
                return value != numbet;
            });
            commonXoso.arrBet = newBet;
        } else {

            commonXoso.arrBet.push(numbet);

        }
        bindingBetinput();
    }

    function bindingBetinput() {

        $('.popupbetxoso .supportBet li').removeClass('active');
        var textResult = '';
        for (var i = 0; i < commonXoso.arrBet.length; i++) {
            $('.numberbetxoso' + commonXoso.arrBet[i]).addClass('active');
            if (commonXoso.arrBet[i] < 10) {
                textResult += '0' + commonXoso.arrBet[i];
            } else {
                textResult += commonXoso.arrBet[i];
            }
            if (i < commonXoso.arrBet.length - 1) {
                textResult += ',';
            }

        }
        console.log(textResult);
        $('.popupbetxoso .txtbetxs').val(textResult);
        $('.popupbetxoso .supportBet .resultChonse').html(textResult);
    }
    this.showBet = function(id) {
        if (commonXoso.sessionData == null)
            return;
        $('.popupbetxoso').show();
        var title = '';
        var label = '';
        var labelamount = '';
        var placehol = '';
        var placeholAmount = '';

        var configrates = commonXoso.configRate.filter(function(item) {
            return item.LocationID == id;
        });


        if (configrates.length > 0) {
            placeholAmount = commonGame.FormatNumber(configrates[0].MinBet) + ' - ' + commonGame.FormatNumber(configrates[0].MaxBet);
            var htmamountBet = '';
            if (configrates[0].MaxBet >= 10000000) {

                htmamountBet += ' <li ref ="50000">50.000 </li>';
                htmamountBet += ' <li ref ="100000">100.000 </li>';
                htmamountBet += ' <li ref ="200000">200.000 </li>';
                htmamountBet += ' <li ref ="500000">500.000 </li>';
                htmamountBet += ' <li ref ="1000000">1.000.000 </li>';
                htmamountBet += ' <li ref ="5000000">5.000.000 </li>';
            } else {

                htmamountBet += ' <li ref ="10000">10.000 </li>';
                htmamountBet += ' <li ref ="50000">50.000 </li>';
                htmamountBet += ' <li ref ="100000">100.000 </li>';
                htmamountBet += ' <li ref ="200000">200.000 </li>';
                htmamountBet += ' <li ref ="300000">300.000 </li>';
                htmamountBet += ' <li ref ="500000">500.000 </li>';

            }

            $('.popupbetxoso .supportBetmoney ul').html(htmamountBet);

            $('.popupbetxoso .supportBetmoney li').unbind('click').click(function(event) {
                var ref = parseInt($(this).attr('ref'));

                $('.popupbetxoso .txtamounts').val(ref);
                $('.popupbetxoso .supportBetmoney').hide();

                commonXoso.freeTicket = 0;
                $('#ct_betxoso .freemoneylabel span').html('0');


                sumAmount();

            });
        }
        commonXoso.LocationID = id;
        switch (id) {
            case 1:
                title = 'Đề';
                label = 'Nhập số cược ,phân cách các số bằng dấu ","'
                placehol = '15,66,88';
                labelamount = 'Nhập tiền cược mỗi số';

                break;
            case 2:
                title = 'Đề đầu';
                label = 'Chọn một chữ số'
                placehol = '0-9';
                labelamount = 'Nhập tiền cược';
                break;
            case 3:

                title = 'Đề cuối';
                label = 'Chọn một chữ số'
                placehol = '0-9';
                labelamount = 'Nhập tiền cược';
                break;
            case 4:
                title = 'Đề 3 càng';
                label = 'Nhập số cược ,phân cách các số bằng dấu ","'
                placehol = '156,668,868';
                labelamount = 'Nhập tiền cược mỗi số';
                break;
            case 5:
                title = 'Lô 2 số';
                label = 'Nhập số cược ,phân cách các số bằng dấu ","'
                placehol = '15,66,86';
                labelamount = 'Nhập tiền cược mỗi số';
                break;
            case 6:
                title = 'Lô 3 số';
                label = 'Nhập số cược ,phân cách các số bằng dấu ","'
                placehol = '156,668,868';
                labelamount = 'Nhập tiền cược mỗi số';
                break;

            case 7:
                title = 'Xiên 2';
                label = 'Chọn 2 cặp số khác nhau ,phân cách các số bằng dấu ","'
                placehol = '16,68';
                labelamount = 'Nhập tiền cược';
                break;


            case 8:
                title = 'Xiên 3';
                label = 'Chọn 3 cặp số khác nhau ,phân cách các số bằng dấu ","'
                placehol = '16,68,88';
                labelamount = 'Nhập tiền cược';
                break;

            case 9:
                title = 'Xiên 4';
                label = 'Chọn 4 cặp số khác nhau ,phân cách các số bằng dấu ","'
                placehol = '16,68,88,99';
                labelamount = 'Nhập tiền cược';
                break;
            default:
                break;
        }
        $('.popupbetxoso .title').html(title);
        $('.popupbetxoso .desctipLabel').html(label);
        $('.popupbetxoso .desctipLabelAmount').html(labelamount);
        $(".popupbetxoso .txtbetxs").val('');
        $(".popupbetxoso .txtbetxs").attr("placeholder", placehol);
        $(".popupbetxoso .txtamounts").attr("placeholder", placeholAmount);


    }

    function secondsTohhmmss(totalSeconds) {
        var hours = Math.floor((totalSeconds) / 3600);
        var minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
        var seconds = ((totalSeconds % 86400) % 3600) % 60;
        seconds = Math.round(seconds * 100) / 100;

        var hh = (hours < 10 ? "0" + hours : hours);
        var mm = (minutes < 10 ? "0" + minutes : minutes);
        var ss = (seconds < 10 ? "0" + seconds : seconds);

        return hh + ':' + mm + ':' + ss

    };

    this.getAccountInfotick = function() {
        libs.GetData2(commonXoso.urlApi + 'GetAccountInfo', {},
            function(data) {
                if (data != null) {
                    $('.ultickbt .userFree').html(data.TotalFree);

                    $('#ct_betxoso .btfree1k').removeClass('active');
                    $('#ct_betxoso .btfree10k').removeClass('active');
                    $('#ct_betxoso .btfree5k').removeClass('active');

                    $('#ct_betxoso .btfree1k .countTick').html(data.FreeTicket1k);
                    $('#ct_betxoso .btfree10k .countTick').html(data.FreeTicket10k);
                    $('#ct_betxoso .btfree5k .countTick').html(data.FreeTicket5k);


                    if (data.FreeTicket1k > 0) {
                        $('#ct_betxoso .btfree1k').addClass('active');
                    }
                    if (data.FreeTicket10k > 0) {
                        $('#ct_betxoso .btfree10k').addClass('active');
                    }
                    if (data.FreeTicket5k > 0) {
                        $('#ct_betxoso .btfree5k').addClass('active');
                    }


                }
            },
            function(xhr, ajaxOptions, thrownError) {});
    }


    this.showGUI = function() {
        this.Init();
        $('#playxoso').show();
        $('.ic-lwi').addClass('active');
        commonGame.resetZindex();
        $("#monster").addClass('active');
        commonXoso.getResult();
        commonXoso.getSessionData();
        commonXoso.getAccountInfotick();
        bindingSessionData();




    };

    this.hideGUI = function() {
        $('#playxoso').hide();
        $('.ic-lwi').removeClass('active');
        clearTimeout(timeoutGetSessiondata);
        clearInterval(intervaxosoRemain);

    };

    this.onFocusBet = function(e) {
        $('.popupbetxoso .supportBetmoney').hide();
        if (commonXoso.LocationID == 1 || commonXoso.LocationID == 5) {
            $('.popupbetxoso .supportBet').show();
        }
    };

    this.onFocusAmount = function(e) {
        $('.popupbetxoso .supportBet').hide();
        $('.popupbetxoso .supportBetmoney').show();

        commonXoso.freeTicket = 0;
        $('#ct_betxoso .freemoneylabel span').html('0');

    };
    this.onChangeInputBetValidate = function(e) {

        if (commonXoso.LocationID == 1 || commonXoso.LocationID == 5) {
            e.value = e.value.replace(/[^0-9\,]/g, '');
            var t = e.value.split(',');
            commonXoso.arrBet = [];
            for (var i = 0; i < t.length; i++) {

                var isFilter = commonXoso.arrBet.filter(function(elem) {
                    return elem == parseInt(t[i]);
                });
                if (!isNaN(parseInt(t[i])) && parseInt(t[i]) <= 99 && isFilter.length == 0) {
                    commonXoso.arrBet.push(parseInt(t[i]));
                }
            }
            console.log(commonXoso.arrBet);
            bindingBetinput();
        }
        sumAmount();


    };
    this.onChangeInputAmountValidate = function(e) {


        sumAmount();

    };

    function sumAmount() {
        var amount = parseInt($('.popupbetxoso .txtamounts').val());
        var txtbets = $('.popupbetxoso .txtbetxs').val();
        if (isNaN(amount) || txtbets.length == 0) {
            amount = 0;
            $('.popupbetxoso .sumtotalbetxoso').html('0');
            return;
        }


        var sum = 0;
        var placehol;
        var title;
        switch (commonXoso.LocationID) {
            case 1:
                title = 'Đề';
                placehol = '15,66,88';
                var bets = txtbets.split(',');
                sum = amount * bets.length;
                break;
            case 2:
                title = 'Đề đầu';
                placehol = '0-9';
                sum = amount;
                break;
            case 3:
                title = 'Đề cuối';
                placehol = '0-9';
                sum = amount;
                break;
            case 4:
                title = 'Đề 3 càng';
                placehol = '156,668,868';
                var bets = txtbets.split(',');
                sum = amount * bets.length;



                break;
            case 5:
                title = 'Lô 2 số';
                placehol = '15,66,86';
                var bets = txtbets.split(',');
                sum = amount * bets.length;

                break;
            case 6:
                title = 'Lô 3 số';
                placehol = '156,668,868';
                var bets = txtbets.split(',');
                sum = amount * bets.length;
                break;

            case 7:
                title = 'Xiên 2';
                placehol = '16,68';
                sum = amount;

                break;


            case 8:
                title = 'Xiên 3';
                placehol = '16,68,88';
                sum = amount;
                break;

            case 9:
                title = 'Xiên 4';
                placehol = '16,68,88,99';
                sum = amount;

                break;
            default:
                break;
        }
        $('.popupbetxoso .sumtotalbetxoso').html(commonGame.FormatNumber(sum));

    }

    function checkBet() {

        var amount = parseInt($('.popupbetxoso .txtamounts').val());
        var txtbets = $('.popupbetxoso .txtbetxs').val();
        var err = '';

        if (isNaN(amount)) {
            err = 'Vui lòng nhập tiền cược';
            return err;
        }
        if (amount < 1000) {
            err = 'Tiền cược tối thiểu 1.000';
            return err;
        }

        if (txtbets.length == 0) {
            err = 'Vui lòng nhập số cược';
            return err;
        }
        var bets = txtbets.split(',');
        var arrbet = []
        for (var i = 0; i < bets.length; i++) {
            if (isNaN(parseInt(bets[i])) || bets[i] < 0) {
                err = 'Số cược không đúng';
                return err;
            }
            var isFilter = arrbet.filter(function(elem) {
                return elem == parseInt(bets[i]);
            });

            if (isFilter.length > 0) {
                err = 'Số cược không được trùng nhau';
                return err;
            }
            arrbet.push(bets[i]);
        }


        switch (commonXoso.LocationID) {
            case 1:
                title = 'Đề';
                placehol = '15,66,88';

                for (var i = 0; i < arrbet.length; i++) {
                    if (arrbet[i] > 99 || arrbet[i] < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }
                }
                break;

            case 2:
                title = 'Đề đầu';
                placehol = '0-9';

                if (txtbets.length > 1) {
                    err = 'Số cược không đúng';
                    return err;
                }
                if (isNaN(parseInt(txtbets)) || parseInt(txtbets) > 9 || parseInt(txtbets) < 0) {
                    err = 'Số cược không đúng';
                    return err;
                }
                break;
            case 3:
                title = 'Đề cuối';
                placehol = '0-9';
                if (txtbets.length > 1) {
                    err = 'Số cược không đúng';
                    return err;
                }
                if (isNaN(parseInt(txtbets)) || parseInt(txtbets) > 9 || parseInt(txtbets) < 0) {
                    err = 'Số cược không đúng';
                    return err;
                }


                break;
            case 4:
                title = 'Đề 3 càng';
                placehol = '156,668,868';

                var debacang = txtbets.split(',');

                for (var i = 0; i < debacang.length; i++) {
                    if (debacang[i].length != 3) {
                        err = 'Số cược không đúng';
                        return err;
                    }

                    if (parseInt(debacang[i]) < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }

                }
                break;
            case 5:
                title = 'Lô 2 số';
                placehol = '15,66,86';

                for (var i = 0; i < arrbet.length; i++) {
                    if (arrbet[i] > 99 || arrbet[i] < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }
                }

                break;
            case 6:
                title = 'Lô 3 số';
                placehol = '156,668,868';

                var lo3so = txtbets.split(',');

                for (var i = 0; i < lo3so.length; i++) {
                    if (lo3so[i].length != 3) {
                        err = 'Số cược không đúng';
                        return err;
                    }

                    if (parseInt(lo3so[i]) < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }

                }

                break;

            case 7:
                title = 'Xiên 2';
                placehol = '16,68';
                var xien2 = txtbets.split(',');
                if (xien2.length != 2) {
                    err = 'Số cược không đúng';
                    return err;
                }

                for (var i = 0; i < arrbet.length; i++) {
                    if (arrbet[i] > 99 || arrbet[i] < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }
                }

                break;


            case 8:
                title = 'Xiên 3';
                placehol = '16,68,88';

                var xien3 = txtbets.split(',');
                if (xien3.length != 3) {
                    err = 'Số cược không đúng';
                    return err;
                }

                for (var i = 0; i < arrbet.length; i++) {
                    if (arrbet[i] > 99 || arrbet[i] < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }
                }

                break;

            case 9:
                title = 'Xiên 4';
                placehol = '16,68,88,99';
                var xien4 = txtbets.split(',');
                if (xien4.length != 4) {
                    err = 'Số cược không đúng';
                    return err;
                }

                for (var i = 0; i < arrbet.length; i++) {
                    if (arrbet[i] > 99 || arrbet[i] < 0) {
                        err = 'Số cược không đúng';
                        return err;
                    }
                }
                break;
            default:
                break;
        }
        return err;

    }
    var timeoutMessage;

    function showMessage(erro, complet) {
        $('.popupbetxoso .msg_xoso').show();
        $('.popupbetxoso .msg_xoso').html(erro);

        if (complet) {
            $('.popupbetxoso .msg_xoso').css({
                'color': '#3bc774'
            })


        } else {
            $('.popupbetxoso .msg_xoso').css({
                'color': '#ff1100'
            })
        }


        clearTimeout(timeoutMessage);
        timeoutMessage = setTimeout(function() {
            $('.popupbetxoso .msg_xoso').hide()
        }, 6000);

    }


    //lich su giao dich game
    var temHistoryItem;
    var temHistory;
    this.showHistory = function() {
        commonGame.showPopup();
        if (typeof temHistory == 'undefined')
            temHistory = jQuery.createTemplateURL(commonXoso.MEDIA_URL + "templates/xoso/popHistory.html");
        if (typeof temHistoryItem == 'undefined')
            temHistoryItem = jQuery.createTemplateURL(commonXoso.MEDIA_URL + "templates/xoso/historyItem.html");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temHistory));
        commonXoso.typeHis = 1;
        commonXoso.cacheData = null;
        getHistory(1);
        commonGame.setActiveTab(commonXoso.typeHis);
    };

    function getHistory(current) {
        $('#pager').html("");
        if (commonXoso.cacheData == null) {

            libs.GetData2(commonXoso.urlApi + 'GetAccountHistory', {},
                function(data) {
                    if (data != null) {
                        commonXoso.cacheData = data;
                        console.log(commonXoso.cacheData);
                        bindHistory(current);
                    }
                },
                function(xhr, ajaxOptions, thrownError) {});

        } else {
            bindHistory(current);
        }

    };

    function bindHistory(current) {

        $("#itemHis").html(jQuery.processTemplateToText(temHistoryItem, commonXoso.cacheData.slice((current - 1) * commonGame.rowperPage, current * commonGame.rowperPage)));
        commonXoso.pageCount = Math.ceil(commonXoso.cacheData.length / commonGame.rowperPage);
        $("#pager").pager({
            pagenumber: current,
            pagecount: commonXoso.pageCount,
            buttonClickCallback: getHistory
        });
    };



    var temGuildxoso;
    this.showGuide = function() {
        commonGame.showPopup();
        if (typeof temGuildxoso == 'undefined')
            temGuildxoso = jQuery.createTemplateURL(commonXoso.MEDIA_URL + "templates/xoso/popHelp.html?v=1");
        commonGame.bindPopupContent(jQuery.processTemplateToText(temGuildxoso));
        $("#helpxoso").slimScroll({
            width: '100%',
            height: '566px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });
    };


    var temRank;

    this.showRank = function() {
        commonGame.showPopup();
        if (typeof temRank == 'undefined')
            temRank = jQuery.createTemplateURL(commonGame.urlRoot + "templates/xoso/popRank.html" + version);
        commonGame.bindPopupContent(jQuery.processTemplateToText(temRank));
        commonXoso.bindRank(2);
        commonGame.setActiveTab(1);
    };

    this.bindRank = function(type) {
        $('.rankxoso1').removeClass('active');
        $('.rankxoso2').removeClass('active');
        $('.rankxoso3').removeClass('active');

        if (type == 1) {
            $('.rankxoso1').addClass('active');
        }
        if (type == 2) {
            $('.rankxoso2').addClass('active');
        }
        if (type == 3) {
            $('.rankxoso3').addClass('active');
        }
        var json = {
            type: type
        };
        libs.PostData3(commonXoso.urlApi + "GetTopDaily", json,
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
                        html += '<td align="center" width="30%" style="font-size: 28px;">' + data[i].NickName + '</td>';
                        html += '<td align="center" width="30%" class="money-1" style="font-size: 28px;">' + commonGame.FormatNumber(data[i].TotalPrize) + '</td>';
                        html += '</tr >';
                    }
                    $("#itemRank").html(html);
                }
            },
            function(xhr, ajaxOptions, thrownError) {});
    };

};
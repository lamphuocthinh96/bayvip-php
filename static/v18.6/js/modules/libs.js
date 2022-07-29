var libs = new function() {
    $(function() {

    });
    this.PostData = function(url, param, callBack, failCallback) {
        libs.showLoad();
        try {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    libs.hideLoad();
                    if (typeof callBack === 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    libs.hideLoad();
                    if (xhr.status === 200) {
                        if (typeof callBack === 'function')
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback === 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {
            libs.hideLoad();
        }
    };
    this.PostData3 = function(url, param, callBack, failCallback) {

        try {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {

                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {

                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {

        }
    };
    this.PostData2 = function(url, param, _beforeSend, callBack, failCallback) {
        try {
            $.ajax({
                beforeSend: _beforeSend,
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {}
    };
    this.GetData = function(url, param, callBack, failCallback) {
        libs.showLoad();
        try {
            $.ajax({
                type: "GET",
                url: url,
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    libs.hideLoad();
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    libs.hideLoad();
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {
            libs.hideLoad();
        }
    };

    this.GetData2 = function(url, param, callBack, failCallback) {

        try {
            $.ajax({
                type: "GET",
                url: url,
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    libs.hideLoad();
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    libs.hideLoad();
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {

        }
    };
    this.ValidateUserName = function(_text) {
        var filter = /^[a-zA-Z0-9._]+$/;
        return filter.test(_text);
    };
    this.ValidateLetterPassword = function(_text) {
        var filter = /^(?=.*\d)(?=.*[a-z]).{6,16}$/;
        return filter.test(_text);
    };
    this.validateNumberOnly = function(a) {
            var b = /^[0-9]+$/;
            return b.test(a);
        },
        this.checkOnlyNumber = function(a, b) {
            var c = b.keyCode ? b.keyCode : b.which ? b.which : b.charCode;
            if (c == 46 ||
                c == 8 ||
                c == 9 ||
                c == 27 ||
                c == 13 ||
                (c == 65 && b.ctrlKey === true) ||
                (c >= 35 && c <= 39)) {
                return true;
            } else {
                if (!b.shiftKey && c >= 48 && c <= 57) {
                    return true;
                }
                if (b.shiftKey && c == 51) return false;
                return false;
            }
        },
        this.showLoad = function() {
            $('.spinner').show();
        };
    this.hideLoad = function() {
        $('.spinner').hide();
    };
    var tempPopup;
    this.showPopup = function(content, button, callback) {
        if (typeof tempPopup === 'undefined')
            tempPopup = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/popup/popup.html" + version);
        $(".over_poup").show();
        $(".over_poup").append(jQuery.processTemplateToText(tempPopup));
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });
        $('.popup_normal .note_message').html(content);
        if (button) {
            $('.popup_normal .btn_Cancel').click(function() {
                libs.CloseAll($('.btn-close_popupmini').parent());
            });
            $('.popup_normal .btn_Ok').click(function() {
                libs.CloseAll($('.btn-close_popupmini').parent());
                if (callback) {
                    callback();
                }
            });
        } else {
            $('.popup_normal .btn_Ok').hide();
            $('.popup_normal .btn_Cancel').hide();
        }
    };
    this.CloseAll = function(btn) {
        if (btn === undefined) {
            $('.over_poup_child').remove();
            $('.over_poup').hide();
            return;
        }
        btn.parent().remove();
        if ($('.over_poup').children().length === 0) {
            $('.over_poup').hide();
        }
    };

    this.ShowGame = function(gameId) {

        if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
            libAccount.Login();
            return;
        }
        this.CloseAll();
        if (gameId === 1) {
            commonGame.showhide(1);
            return;
        }
        if (gameId === 2) {
            commonGame.showMapEvent();
            return;
        }
        if (gameId === 3) {
            location.href = jsConfig.connectFish.root;
            return;
        }
        if (gameId === 4) {
            commonGame.showVqmm();
            return;
        }

        if (gameId === 5) {
            commonGame.showhide(8);
            return;
        }
        if (gameId === 6) {
            commonGame.showhide(9);
            return;
        }


        if (gameId === 218) {
            commonGame.showhide(2);
            return;
        }

        if (gameId === 115) {
            commonGame.showhide(4);
            return;
        }
        if (gameId === 226) {
            commonGame.showhide(5);
            return;
        }

        if (gameId === 111) {
            commonGame.showhide(3);
            return;
        }

        if (gameId === 112) {
            commonGame.showhide(6);
            return;
        }
        if (gameId === 116) {
            location.href = jsConfig.connectMermaid.root;
            return;
        }
        if (gameId === 221) {
            location.href = jsConfig.connectKong.root;
            return;
        }
        if (gameId === 118) {
            location.href = jsConfig.connectFruit.root;
            return;
        }
        if (gameId === 219) {
            location.href = jsConfig.connectGold.root;
            return;
        }

        if (gameId === 55) {
            libprofile.eventX3();
            return;
        }

        if (gameId === 222) {

            commonGame.showhide(11);
            return;
        }


        //cardgame

        Cardgame.LoadGame(gameId);

    };

}();

var App = App || {};
App.currentAccount = {};

var libAccount = new function() {

    var timeOutSpinInbox;
    var timeMessage;
    this.init = function() {



        $('.non_login_header .btn-facebook').click(function(e) {
            e.preventDefault();
            e.stopPropagation();


            if (window.location.hostname === jsConfig.HostNamePort1) {
                location.href = jsConfig.urlFacebook.facebook1;
            } else if (window.location.hostname === jsConfig.HostNamePort2) {
                location.href = jsConfig.urlFacebook.facebook2;
            } else {
                location.href = jsConfig.urlFacebook.facebook3;
            }


        });


        $('.non_login_header .btn-login').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            libAccount.Login();

        });
        $('.non_login_header .btn-register').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            libAccount.Register();

        });


        $('.backingame').click(function(e) {
            if (App.GAME_STATUS === 2)
                return;
            if (App.GAME_STATUS === 1) {
                App.GAME_STATUS = 0;
                Cardgame.DellCard();
                return;
            }
            libs.showPopup('Bạn muốn thoát tài khoản?', true, function() {
                libAccount.Logout();
            });
        });
    };

    this.showMessage = function(msg, color) {
        $('.over_poup .message').html(msg);
        $('.over_poup .message').show();

        if (color == undefined) {
            $('.over_poup .message').css("color", "#ff0000");
        } else {
            $('.over_poup .message').css("color", "#ffffff");
        }
        clearTimeout(timeMessage);
        timeMessage = setTimeout(function() {
                $('.over_poup .message').hide();
            },
            5000);

    };
    this.bindAccountInfo = function(userData) {

        App.currentAccount = userData;
        if (!App.currentAccount.Nickname)
            return;
        $('.non_login_header').remove();
        $('.login_header').show();
        if (App.treasure.animPay !== null && App.treasure.animPay !== undefined) {
            App.treasure.animPay.visible = true;
        }
        libs.CloseAll();
        $('#NicknameId').html(App.currentAccount.Nickname);
        $('#goldLabel').html(util.ParseMoney(App.currentAccount.TotalGold));
        $('#VPId').html('LP:' + util.ParseMoney(App.currentAccount.TotalVP));
        var avatarUrl = jsConfig.urlRootStatic + '/assets/avatars/' + App.currentAccount.AvartarID + '.png';
        $('.bgava .ava').css('background-image', 'url("' + avatarUrl + '")');
        if (typeof commonGame !== 'undefined')
            try {
                commonGame.InitGame();
            } catch (err) {
                console.log('commonGame.InitGame');
            }
        App.treasure.GetAccountInfoMap();
        libAccount.notyfiSpinInbox();
        $(window).trigger('loggedIn');
    };
    this.CheckAuthencation = function(callback) {
        var url = jsConfig.urlRootAccountApi + 'Authen/CheckAuthenticated';
        try {
            libs.GetData(url, {},
                function(data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                },
                function(xhr, ajaxOptions, thrownError) {
                    if (typeof callback != "undefined")
                        callback({
                            "c": 0
                        });
                });
        } catch (err) {}
    };

    this.GetAccountInfor = function(callback) {
        var url = jsConfig.urlRootAccountApi + 'Authen/GetAccountInfo';
        try {
            libs.GetData(url, {},
                function(data) {
                    if (typeof callback != "undefined")
                        callback(data);
                },
                function(xhr, ajaxOptions, thrownError) {
                    if (typeof callback != "undefined")
                        callback(App.currentAccount);
                });
        } catch (err) {

        }
    };
    this.Login = function() {
        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/account/login.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {

            libs.CloseAll($('.btn-close_popupmini').parent());
        });

        $('.popup_normal .bt_login_form').click(function() {
            var username = $('#txtUserName').val(),
                password = $('#txtPass').val();

            if (username === null || username === '') {
                libAccount.showMessage('Bạn cần nhập tên tài khoản');
                return;
            }
            if (username.length <= 3) {
                libAccount.showMessage('Độ dài tên tài khoản cần tối thiểu 4 kí tự');
                return;
            }
            if (password == null || password == '') {
                libAccount.showMessage('Bạn cần nhập mật khẩu');
                return;
            }
            if (password.length < 6) {
                libAccount.showMessage('Mật khẩu phải dài ít nhất 6 ký tự. Mời bạn nhập lại');
                return;
            }
            username = username.toLowerCase();
            //md5-password
            var md5password = md5($('#txtPass').val());
            var dataPost = {
                username: username,
                password: password,
                passwordMD5: md5password
            };

            var url = jsConfig.urlRoot + '/api/login.php';
            try {
                libs.PostData(url, dataPost, function(userData) {

                        if (userData && userData.AccountID > 0) {
                            libs.CloseAll();
                            if (userData.IsOtp === 1) {
                                libAccount.showOTP(userData.OtpToken);
                            } else {
                                libAccount.bindAccountInfo(userData);
                                if (userData.Nickname === undefined || userData.Nickname === '') {
                                    libAccount.createUsernick(userData);
                                    return;
                                }
                            }
                        } else {

                            var errMsg = 'Đăng nhập thất bại.';
                            if (typeof userData === 'string')
                                errMsg = userData;
                            libAccount.showMessage(errMsg);
                        }
                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);
                    });
            } catch (err) {
                console.log('');
            }
        });

        $('.popup_normal .bt_loginfb_form').click(function() {



            if (window.location.hostname === jsConfig.HostNamePort1) {
                location.href = jsConfig.urlFacebook.facebook1;
            } else if (window.location.hostname === jsConfig.HostNamePort2) {
                location.href = jsConfig.urlFacebook.facebook2;
            } else {
                location.href = jsConfig.urlFacebook.facebook3;
            }




        });

        $('.popup_normal .text_register_new').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
            libAccount.Register();

        });

        $('.popup_normal .text_forget_pass').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
            libAccount.ChangePassword();
        });
        $('.formlogin input').unbind('keydown');
        $('.formlogin input').keydown(function(event) {
            if (event.which === 13) {
                event.preventDefault();
                event.stopPropagation();
                $('.popup_normal .bt_login_form').click();

            }
        });


    };

    this.Logout = function() {
        var dataPost = {}
        var url = jsConfig.urlRootAccountApi + '/Authen/logout';
        try {
            libs.GetData(url, dataPost, function(userData) {
                    location.reload();
                    clearTimeout(timeOutSpinInbox);
                },
                function(xhr, ajaxOptions, thrownError) {
                    location.reload();
                });
        } catch (err) {}

    };

    this.Register = function() {
        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/account/register.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });

        $('.captra .refesh').click(function(e) {
            $('.captra #txtCaptra').val('');
            var verify = $('.captra #txtCaptra').val();
            $.ajax({
                cache: false,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                url: jsConfig.urlRootAccountApi + '/Captcha/Get?length=3&height=60&width=120&verify=' + verify,
                success: function(data) {
                    if (data) {
                        $('#captcha_verify_register').val(data[0]);
                        $('#captcha_image_register')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }
                }
            });
        });
        $('.captra .refesh').click();


        $('.bt_rigister_form').click(function() {

            var username = $('#username').val(),
                pass = $('#password').val(),
                pass2 = $('#rePassword').val(),
                verify = $('#captcha_verify_register').val(),
                captcha = $('#txtCaptra').val();

            if (username == null || username == '') {
                libAccount.showMessage('Bạn cần nhập vào tên tài khoản');
                return;
            }
            if (username.length <= 3) {
                libAccount.showMessage('Độ dài tên tài khoản cần tối thiểu 4 kí tự.');
                return;
            }
            if (!libs.ValidateUserName(username)) {
                libAccount.showMessage('Tên tài khoản không được chứa ký tự đặc biệt.');
                return;
            }


            if (pass == null || pass == '') {
                libAccount.showMessage('Bạn cần nhập vào mật khẩu');
                return;
            }
            if (pass.length < 6 || pass.length > 18) {
                libAccount.showMessage('Mật khẩu có độ dài 6-18 ký tự.');
                return;

            }
            if (!libs.ValidateLetterPassword(pass)) {
                libAccount.showMessage('Mật khẩu có độ dài 6-18 ký tự,chữ thường và số');
                return;
            }

            if (pass !== pass2) {
                libAccount.showMessage('Nhập lại mật khẩu chưa chính xác. Vui lòng thử lại.');
                return;
            }

            if (captcha == null || captcha == '') {
                libAccount.showMessage('Bạn chưa nhập mã xác nhận');
                return;
            }
            username = username.toLowerCase();


            var dataPost = {
                username: username,
                password: pass,
                verify: verify,
                captcha: captcha
            }

            var url = jsConfig.urlRootAccountApi + '/Authen/quickRegister';
            try {
                libs.PostData(url, dataPost, function(userData) {
                        if (userData && userData.AccountID > 0) {
                            libs.CloseAll($('.btn-close_popupmini').parent());

                            if (userData.Nickname === undefined || userData.Nickname == '') {
                                libAccount.createUsernick(userData);
                            }

                        } else {
                            libAccount.showMessage('Đăng ký không thành công.');
                            $('.captra .refesh').click();
                        }

                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);
                        $('.captra .refesh').click();
                    });
            } catch (err) {}
        });



    };
    this.createUsernick = function(userData) {
        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/account/registernick.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });

        $('.info_user #username').html(userData.UserName);


        $('.bt_rigister_nick').click(function() {
            var nickname = $('#nickname').val();
            if (nickname === null || nickname === '') {
                libAccount.showMessage('Bạn cần nhập tên nhân vật');
                return;
            }
            if (nickname.length <= 3) {
                libAccount.showMessage('Độ dài tên nhân vật cần tối thiểu 4 kí tự.');
                return;
            }
            if (!libs.ValidateUserName(nickname)) {
                libAccount.showMessage('Tên nhân vật không được chứa ký tự đặc biệt.');
                return;
            }

            var dataPost = {
                nickName: nickname
            };

            var url = jsConfig.urlRootAccountApi + '/Account/UpdateNickName';
            try {
                libs.PostData(url,
                    dataPost,
                    function(data) {
                        if (data.responseStatus > 0) {
                            libs.CloseAll($('.btn-close_popupmini').parent());
                            userData.Nickname = data.nickName;
                            libAccount.bindAccountInfo(userData);

                        } else {
                            var errMsg = '';
                            if (data.responseStatus == -1) {
                                errMsg = 'Tên nhân vật đã tồn tại.';
                                libAccount.showMessage(errMsg);
                            }
                            if (data.responseStatus == -2) {
                                errMsg = 'Tên nhân vật không được phép trùng tên tài khoản.';
                                libAccount.showMessage(errMsg);
                            }
                        }
                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);

                    });
            } catch (err) {}


        });


    };
    this.ChangePassword = function() {
        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/account/resetPassword.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });
        $('.captra .refesh').click(function(e) {
            $('.captra #txtCaptra').val('');
            var verify = $('.captra #txtCaptra').val();
            $.ajax({
                cache: false,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                url: jsConfig.urlRootAccountApi + '/Captcha/Get?length=3&height=60&width=120&verify=' + verify,
                success: function(data) {
                    if (data) {
                        $('#captcha_verify_register').val(data[0]);
                        $('#captcha_image_register')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }
                }
            });
        });
        $('.captra .refesh').click();


        $('.bt_resetpass_form').click(function() {

            var username = $('#username').val(),
                pass = $('#password').val(),
                otpReset = $('#txt_otp').val(),
                verify = $('#captcha_verify_register').val(),
                captcha = $('#txtCaptra').val();

            if (username === null || username === '') {
                libAccount.showMessage('Vui lòng nhập tên tài khoản.');
                return;
            }
            if (username.length <= 3) {
                libAccount.showMessage('Độ dài tên tài khoản cần tối thiểu 4 kí tự.');
                return;
            }
            if (!libs.ValidateUserName(username)) {
                libAccount.showMessage('Tên tài khoản không được chứa ký tự đặc biệt.');
                return;
            }


            if (pass === null || pass === '') {
                libAccount.showMessage('Vui lòng nhập mật khẩu.');
                return;
            }
            if (pass.length < 6 || pass.length > 18) {
                libAccount.showMessage('Mật khẩu có độ dài 6-18 ký tự.');
                return;

            }
            if (!libs.ValidateLetterPassword(pass)) {
                libAccount.showMessage('Mật khẩu có độ dài 8-18 ký tự, bao gồm chữ thường và số');
                return;
            }



            if (otpReset === null || otpReset === '') {
                libAccount.showMessage('Vui lòng nhập mã OTP.');
                return;
            }

            if (captcha === null || captcha === '') {
                libAccount.showMessage('Vui lòng nhập mã Captra');
                return;
            }

            username = username.toLowerCase();
            var dataPost = {
                username: username,
                password: pass,
                otp: otpReset,
                verify: verify,
                captcha: captcha
            };

            var url = jsConfig.urlRootAccountApi + '/Account/ConfirmResetPassword';
            try {
                libs.PostData(url, dataPost, function(data) {
                        libAccount.showMessage("Chúc mừng bạn lấy lại mật khẩu thành công ");
                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);
                        $('.captra .refesh').click();
                    });
            } catch (err) {}
        });

        $('#sendOtp').click(function() {

            sendOtp();


        });

        function sendOtp() {
            var type = parseInt($('#otptype').val());
            if (type === 1) {

                var username = $('#username').val();

                if (username === null || username === '') {
                    libAccount.showMessage('Vui lòng nhập tên tài khoản.');
                    return;
                }
                if (username.length <= 3) {
                    libAccount.showMessage('Độ dài tên tài khoản cần tối thiểu 4 kí tự.');
                    return;
                }
                if (!libs.ValidateUserName(username)) {
                    libAccount.showMessage('Tên tài khoản không được chứa ký tự đặc biệt.');
                    return;
                }
                username = username.toLowerCase();
                var dataPost = {
                    username: username
                };
                var url = jsConfig.urlRootAccountApi + '/Account/ReceiveOTPRestPass';
                try {
                    libs.PostData(url, dataPost, function(data) {
                            libAccount.showMessage("Nhận SMS thành công", 1);
                        },
                        function(xhr, ajaxOptions, thrownError) {
                            libAccount.showMessage(xhr.responseText);
                            $('.captra .refesh').click();
                        });
                } catch (err) {
                    console.log('');
                }
                return;
            }

            if (type === 3) {
                window.open(jsConfig.hostConfig.linkPort.LinkTele1);


                return;
            }
            if (type === 2) {
                window.open(jsConfig.urlDownloadAPP, '_blank');
                return;
            }
        }

        libAccount.bindOTP();
    };
    this.setAccountInfo = function(data) {
        App.currentAccount = data;
    };
    this.UpdateBalance = function(moneyType, balance, option) {
        var acc = App.currentAccount;
        if (!option) {
            option = 1;
        }
        if (option === 1) {
            if (moneyType === 1) {
                acc.TotalVP = balance;
            }
            if (moneyType === 2) {
                acc.TotalGold = balance;
            }
        } else if (option === 2) {
            if (moneyType === 1) {
                acc.TotalVP += balance;
            }
            if (moneyType === 2) {
                acc.TotalGold += balance;
            }
        }

        if (acc.TotalGold < 0)
            acc.TotalGold = 0;
        if (moneyType === 2) {
            libAccount.changeMoney(moneyType, acc.TotalGold);
        } else {
            libAccount.changeMoney(moneyType, acc.TotalVP);
        }
        if (typeof AppGold !== 'undefined' && AppGold.Game)
            AppGold.Game.txtBalance.text = util.ParseMoney(acc.TotalGold);
        if (typeof AppKong !== 'undefined' && AppKong.Game)
            AppKong.Game.txtBalance.text = util.ParseMoney(acc.TotalGold);
        if (typeof AppMermaid !== 'undefined' && AppMermaid.Game)
            AppMermaid.Game.txtBalance.text = util.ParseMoney(acc.TotalGold);
        if (typeof AppFruit !== 'undefined' && AppFruit.Game)
            AppFruit.Game.txtBalance.text = util.ParseMoney(acc.TotalGold);
    };
    this.changeMoney = function(moneyType, newValue) {
        if (moneyType === 2) {
            $('#goldLabel').html(util.ParseMoney(newValue));
        } else {
            $('#VPId').html(util.ParseMoney(newValue));
        }
    };
    this.GetAccountInfoClient = function() {
        return App.currentAccount;

    };

    this.SenOTPSMS = function() {

        libs.PostData(jsConfig.urlRootProfile + 'Payment/Profile', {},
            function() {
                libAccount.showMessage('Nhận OTP SMS thành công', 1);
            },
            function(a) {

                libAccount.showMessage(a.responseText !== '' ?
                    a.responseText :
                    'Hệ thống đang bận vui lòng thử lại sau');
            });

    };

    this.notyfiSpinInbox = function() {
        libs.PostData3(jsConfig.urlRootVQMM + 'CircleSpin/Turn_GetAPI', {},
            function(data) {

                if (data != null) {
                    $('.btn-mail .count').hide();
                    $('.minigame-expand .count').hide();
                    if (data.InboxCount > 0) {
                        $('.btn-mail .count').html(data.InboxCount);
                        $('.btn-mail .count').show();
                    }

                    if (data.SpinCount > 0) {
                        $('.minigame-expand .count').html(data.SpinCount);
                        $('.minigame-expand .count').show();
                    }
                }


            },
            function(a) {});
        timeOutSpinInbox = setTimeout(function() {
                libAccount.notyfiSpinInbox();
            },
            jsConfig.TimeGetUnreadInbox);
    };

    this.giftCode = function() {
        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/giftcode/giftcode.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });
        $('.captra .refesh').click(function(e) {

            $('.captra #txtCaptra').val('');
            var verify = $('.captra #txtCaptra').val();
            libs.GetData2(jsConfig.urlRootProfile + '/captcha/Get?length=3&height=60&width=120&verify=' + verify, {}, function(data) {
                if (data) {
                    $('#captcha_verify_register').val(data[0]);
                    $('#captcha_image_register')[0].src = 'data:image/jpeg;base64,' + data[1];
                }

            }, function(a) {

            });

        });
        $('.captra .refesh').click();
        $('.btn_gift').click(function() {

            var gift = $('#giftcode').val(),

                verify = $('#captcha_verify_register').val(),
                captcha = $('#txtCaptra').val();

            if (gift === null || gift === '') {
                libAccount.showMessage('Bạn chưa nhập GIFTCODE.');
                return;
            }
            if (gift.length <= 4) {
                libAccount.showMessage('GIFTCODE không đúng.');
                return;
            }

            if (captcha === null || captcha === '') {
                libAccount.showMessage('Vui lòng nhập mã');
                return;
            }
            var dataPost = {
                giftcode: gift,
                verify: verify,
                captcha: captcha
            };
            var url = jsConfig.urlRootProfile + '/Giftcode/usingGifttCode';
            try {
                libs.PostData(url, dataPost, function(data) {
                        libAccount.showMessage("Chúc mừng bạn nhận được giftcode " + data.increaBalance);
                        libAccount.UpdateBalance(2, data.increaBalance, 2);
                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);
                        $('.captra .refesh').click();
                    });
            } catch (err) {
                console.log('erro');
            }
        });
    };
    this.showOTP = function(otpToken) {

        $(".over_poup").show();
        $(".over_poup").setTemplateURL(jsConfig.urlRootStatic + "templates/account/otpToken.html");
        $(".over_poup").processTemplate();
        $('.btn-close_popupmini').click(function() {
            libs.CloseAll($('.btn-close_popupmini').parent());
        });
        libAccount.bindOTP();


        $('#btnotpToken').click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            var d = $('#otptype').val(),
                otp = $('#txt_otp').val();
            if (otp.length <= 0) {
                libAccount.showMessage('Bạn cần nhập vào mã OTP');
                return;
            }
            var dataPost = {
                otp: otp,
                otpType: d,
                otpToken: otpToken
            };
            var url = jsConfig.urlRootAccountApi + '/Authen/CheckOTPByAccountID';
            try {
                libs.PostData(url, dataPost, function(userData) {

                        if (userData && userData.AccountID > 0) {
                            libs.CloseAll();
                            libAccount.bindAccountInfo(userData);


                        } else {
                            var errMsg = 'Đăng nhập thất bại.';
                            if (typeof userData === 'string')
                                errMsg = userData;
                            libAccount.showMessage(errMsg);
                        }
                    },
                    function(xhr, ajaxOptions, thrownError) {
                        libAccount.showMessage(xhr.responseText);
                    });
            } catch (err) {}

        });
        $('#sendOtp').click(function() {

            sendOtp();


        });

        function sendOtp() {
            var type = parseInt($('#otptype').val());
            if (type === 1) {



                var dataPost = {
                    otpToken: otpToken
                };
                var url = jsConfig.urlRootAccountApi + '/Account/ReceiveOTPLogin';
                try {
                    libs.PostData(url, dataPost, function(data) {
                            libAccount.showMessage("Nhận SMS thành công", 1);
                        },
                        function(xhr, ajaxOptions, thrownError) {
                            libAccount.showMessage(xhr.responseText);
                            $('.captra .refesh').click();
                        });
                } catch (err) {}
                return;
            }

            if (type === 3) {
                window.open(jsConfig.hostConfig.linkPort.LinkTele1);
                return;
            }
            if (type === 2) {
                window.open(jsConfig.urlDownloadAPP, '_blank');
                return;
            }
        }


    };
    this.bindOTP = function() {

        $('#otptype').change(function(e) {
            changeOtp();
        });


        function changeOtp() {
            var type = parseInt($('#otptype').val());

            if (type === 1) {
                $('.note-smsotp')
                    .html('<p>Lưu ý : phí mỗi lần lấy mã OTP là <span>500 B</span>. Mỗi mã OTP có giá trị 5 phút tính từ thời điểm hệ thống gửi đến số điện thoại của bạn.</p>');
                return;
            }

            if (type === 3) {
                $('.note-smsotp').html('<p>Vui lòng nhấn "Lấy mã OTP" sau đó vào mục <span>share contact</span> nếu lần đầu xác thực telegram, nhắn tin cú pháp <span>/otp</span>  để lấy mã OTP TELEGRAM miễn phí</p>');

                return;
            }

            if (type === 2) {

                $('.note-smsotp').html(
                    '  <p>Vui lòng nhấn "Lấy mã OTP" để tải OTP APP hoặc nhấn vào đây<span> <a href="' +
                    jsConfig.urlDownloadAPP +
                    '" target=_blank style="color: #ff0;text-decoration: underline;">Tải OTP APP</a></span> để nhận OTP APP miễn phí  </p>')

                return;

            }
        }


    };



}();

var libprofile = new function() {

    this.init = function() {
        $('.bgava').click(function() {
            libprofile.profie();
        });

        $('#rechargewinId').click(function() {
            libprofile.chargewin();
        });

        $('.animZalo').click(function() {
            libprofile.chargemomo();
        });


        $('.btn-mail').click(function() {
            libprofile.mail();
        });

        $('.btn-dongbang').click(function() {
            libprofile.safe();
        });


        $('.btn-cardBlock').click(function() {
            libprofile.security();
        });

        $('.btn-menu').click(function(e) {
            if (e !== null && typeof e.stopPropagation === 'function')
                e.stopPropagation();
            $('.setting-board').addClass('active');

        });

        $('.btn-history').click(function() {
            libprofile.history();
        });
        $('.btn-exit').click(function() {
            libs.showPopup('Bạn muốn thoát tài khoản?', true, function() {

                libAccount.Logout();
            });
        });

        $(document).click(function(e) {

            $('.setting-board').removeClass('active');

        });



    };

    this.bindOTP = function() {

        $('#otptype').change(function(e) {
            changeOtp();
        });
        $('#sendOtp').click(function() {
            sendOtp();
        });

        function changeOtp() {
            var type = parseInt($('#otptype').val());

            if (type === 1) {
                $('.note-smsotp')
                    .html('<p>Lưu ý : phí mỗi lần lấy mã OTP là <span>500 B</span>. Mỗi mã OTP có giá trị 5 phút tính từ thời điểm hệ thống gửi đến số điện thoại của bạn.</p>');
                return;
            }

            if (type === 3) {
                $('.note-smsotp').html('<p>Vui lòng nhấn "Lấy mã OTP" sau đó vào mục <span>share contact</span> nếu lần đầu xác thực telegram, nhắn tin cú pháp <span>/otp</span>  để lấy mã OTP TELEGRAM miễn phí</p>');

                return;
            }

            if (type === 2) {

                $('.note-smsotp').html(
                    '  <p>Vui lòng nhấn "Lấy mã OTP" để tải OTP APP hoặc nhấn vào đây<span> <a href="' +
                    jsConfig.urlDownloadAPP +
                    '" target=_blank style="color: #ff0;text-decoration: underline;">Tải OTP APP</a></span> để nhận OTP APP miễn phí  </p>')

                return;

            }
        }

        function sendOtp() {

            var type = parseInt($('#otptype').val());

            if (type === 1) {

                libprofile.SenOTPSMS();
                return;
            }

            if (type === 3) {
                window.open(jsConfig.hostConfig.linkPort.LinkTele1);
                return;
            }
            if (type === 2) {
                window.open(jsConfig.urlDownloadAPP, '_blank');
                return;
            }
        }
    };

    this.SenOTPSMS = function() {

        libs.PostData(jsConfig.urlRootProfile + '/Profile/ReiceveOTP', {},
            function() {
                libAccount.showMessage('Nhận OTP SMS thành công', 1);
            },
            function(a) {

                libAccount.showMessage(a.responseText !== '' ?
                    a.responseText :
                    'Hệ thống đang bận vui lòng thử lại sau');
            });

    };

    var pageCount;
    var rowperPage = 11;

    var temHistory;
    var cacheHistory;
    this.history = function() {

        if (typeof temHistory === 'undefined')
            temHistory = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/history.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(temHistory));

        $('.btn-close_popuplare').click(function() {

            cacheHistory = null;
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {

            $('.charge-tab-controllers .button').removeClass('active');
            $(this).addClass('active');
            var index = parseInt($(this).attr('data-index'));

            cacheHistory = null;
            getHistory(index);


        });

        getHistory(0);

        function getHistory(historyType) {
            if (cacheHistory === null || cacheHistory === undefined) {
                var m = {
                    historyType: historyType
                };
                libs.GetData(jsConfig.urlRootProfile + 'account/getTransactionLogs',
                    m,
                    function(data) {
                        cacheHistory = data.pages;
                        bindHistory(1);
                    },
                    function(a) {});

            } else {
                bindHistory(1);
            }
        };

        function bindHistory(current) {

            var html = '';
            var pages = cacheHistory.slice((current - 1) * rowperPage, current * rowperPage);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="20%">' + util.FormatDatetime(pages[i].CreatedTime) + '</td>';
                html +=
                    '<td width="20%" style="max-width:15%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' +
                    pages[i].ServiceName +
                    '</td>';
                html += '<td width="15%"><span class="t-pink2">' +
                    pages[i].Service +
                    util.ParseMoney(pages[i].Amount) +
                    '</span></td>';
                html += '<td width="15%"><span class="t-pink">' + util.ParseMoney(pages[i].Balance) + '</span></td>';
                html +=
                    '<td width="30%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' +
                    pages[i].Descrip +
                    '</td>';

                html += '</tr>';

            }

            $("#table_body").html(html);
            pageCount = Math.ceil(cacheHistory.length / rowperPage);
            $("#pager_history").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindHistory
            });

        }

    };

    var tempchargewin;
    var cachePriceList;
    this.chargewin = function() {

        if (typeof tempchargewin == 'undefined')
            tempchargewin = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/chargewin.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempchargewin));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();



            if (index === 1) {
                libprofile.chargewin();
                return;
            }

            if (index === 2) {
                libprofile.chargemomo();
                return;
            }

            if (index === 5) {
                libprofile.chargeviettelPay();
                return;
            }
            if (index === 6) {
                libprofile.chargezaloPay();
                return;
            }




            if (index === 3) {
                libprofile.listAgent();
                return;
            }
            if (index === 4) {
                libprofile.buycard();
                return;
            }



        });


        $('.content_complet .bt_cancel').click(function() {
            $('.popup_complet').hide();
        });

        $('.content_complet .bt_ok').click(function() {

            $('.popup_complet').hide();

            var seriCode = $('#cardseri').val(),
                cardcode = $('#cardcode').val(),
                captcha = $('#cardcaptra').val(),
                cardtype = $('#cardtype').val();

            var amount = $('#cardAmount').val();
            var verify = $('#captcha_verify_nap').val();

            var i = {
                'cardType': cardtype,
                'seriCode': seriCode,
                'cardCode': cardcode,
                'verify': verify,
                'captcha': captcha,
                'amount': amount
            };

            libs.PostData(jsConfig.urlRootProfile + '/Payment/Topup',
                i,
                function(data) {

                    libAccount.showMessage('Hệ thống đang xử lý,Vui lòng kiểm tra lại tài khoản', 1);
                    $('.napcaptra .refesh').click();

                },
                function(a) {

                    libAccount.showMessage(a.responseText);
                    $('.napcaptra .refesh').click();
                });

        });

        $('.bt_charge_nap').click(function() {

            var cardtype = $('#cardtype').val(),
                cardAmount = $('#cardAmount').val(),
                cardseri = $('#cardseri').val(),
                cardcode = $('#cardcode').val(),
                gift = $('#cardcaptra').val();


            if (cardAmount === 0 || cardAmount === '0') {
                libAccount.showMessage('Bạn chưa chọn mệnh giá thẻ');
                return;
            }

            if (cardseri === '') {
                libAccount.showMessage('Bạn chưa nhập mã seri');
                return;
            }

            if (cardcode === '') {
                libAccount.showMessage('Bạn chưa nhập mã thẻ');
                return;
            }

            if (gift === '') {
                libAccount.showMessage('Bạn chưa nhập mã captra');
                return;
            }

            $('.popup_complet').show();
            $('#lbseri').html(cardseri);
            $('#lbcartype').html(cardtype);
            $('#lbamount').html(util.ParseMoney(cardAmount));


        });


        $('#cardtype').change(function(e) {
            bindPriceList();
        });

        $('.napcaptra .refesh').click(function(e) {

            $('.captra #txtCaptra').val('');
            var verify = $('.captra #txtCaptra').val();
            libs.GetData(jsConfig.urlRootProfile + '/captcha/Get?length=3&height=60&width=120&verify=' + verify, {},
                function(data) {
                    if (data) {
                        $('#captcha_verify_nap').val(data[0]);
                        $('#captcha_image')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }

                },
                function(a) {});
        });
        $('.napcaptra .refesh').click();


        getPriceList();

        function getPriceList() {

            if (cachePriceList == null && cachePriceList != '') {
                var m = {};
                libs.GetData(jsConfig.urlRootProfile + 'Payment/GetPriceList',
                    m,
                    function(data) {

                        cachePriceList = data;
                        bindPriceList();

                    },
                    function(a) {});

            } else {
                bindPriceList();
            }
        };

        function bindPriceList() {

            var html = '';
            var cardtype = $('#cardtype').val().toLowerCase();
            var filer = cachePriceList.filter(function(obj) {
                return (obj.TelcoName.toLowerCase() === cardtype);
            });


            var htmlAmount = '';

            htmlAmount += '<option selected="selected" value="0">Chọn mệnh giá thẻ</option>';

            for (var i = 0; i < filer.length; i++) {
                html += '<tr>';
                html += '<td width="30%">' + util.ParseMoney(filer[i].CardAmount) + '</td>';

                var rate = filer[i].Multiplier * 100 - 100;
                html += '<td width="30%">' + util.ParseMoney(rate) + '%</td>';
                html += '<td width="35%"><span class="t-pink">' + util.ParseMoney(filer[i].TotalMoney) + '</span></td>';
                html += '</tr>';
                htmlAmount += '<option value="' +
                    filer[i].CardAmount +
                    '">' +
                    util.ParseMoney(filer[i].CardAmount) +
                    '</option>';
            }
            $('#cardAmount').html(htmlAmount);
            $("#table_body").html(html);
        }


    };


    var tempmomo;
    this.chargemomo = function() {
        if (typeof tempmomo == 'undefined')
            tempmomo = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/momo.html?v=1");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempmomo));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();

            if (index === 1) {
                libprofile.chargewin();
                return;
            }

            if (index === 2) {
                libprofile.chargemomo();
                return;
            }


            if (index === 5) {
                libprofile.chargeviettelPay();
                return;
            }
            if (index === 6) {
                libprofile.chargezaloPay();
                return;
            }



            if (index === 3) {
                libprofile.listAgent();
                return;
            }
            if (index === 4) {
                libprofile.buycard();
                return;
            }
        });


        getInfoMomo();

        function getInfoMomo() {
            var m = {};
            libs.PostData(jsConfig.urlRootProfile + 'Payment/GetInfoMomo',
                m,
                function(data) {

                    $('#txt_sdt').html(data.Phone);
                    $('#txt_tentk').html(data.Name);
                    $('#txt_content').html(data.Content);
                },
                function(a) {});
        }
    };

    var tempviettelPay;
    this.chargeviettelPay = function() {
        if (typeof tempviettelPay === 'undefined')
            tempviettelPay = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/viettelpay.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempviettelPay));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();

            if (index === 1) {
                libprofile.chargewin();
                return;
            }
            if (index === 5) {
                libprofile.chargeviettelPay();
                return;
            }
            if (index === 6) {
                libprofile.chargezaloPay();
                return;
            }

            if (index === 2) {
                libprofile.chargemomo();
                return;
            }


            if (index === 3) {
                libprofile.listAgent();
                return;
            }
            if (index === 4) {
                libprofile.buycard();
                return;
            }
        });


        getInfoVietPay();

        function getInfoVietPay() {
            var m = {};
            libs.PostData(jsConfig.urlRootProfile + 'Payment/GetInfoViettelPay',
                m,
                function(data) {

                    $('#txt_sdt').html(data.Phone);
                    $('#txt_tentk').html(data.Name);
                    $('#txt_content').html(data.Content);
                },
                function(a) {});
        }
    };



    var tempzaloPay;
    this.chargezaloPay = function() {
        if (typeof tempzaloPay === 'undefined')
            tempzaloPay = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/zalopay.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempzaloPay));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();

            if (index === 1) {
                libprofile.chargewin();
                return;
            }
            if (index === 5) {
                libprofile.chargeviettelPay();
                return;
            }
            if (index === 6) {
                libprofile.chargezaloPay();
                return;
            }

            if (index === 2) {
                libprofile.chargemomo();
                return;
            }


            if (index === 3) {
                libprofile.listAgent();
                return;
            }
            if (index === 4) {
                libprofile.buycard();
                return;
            }
        });

        $('.bt_charge_nap').click(function() {
            var amount = parseInt($('#txtAmountzalo').val());

            if (isNaN(amount)) {
                libAccount.showMessage('Dữ liệu không đúng');
                return;
            }
            if (amount < 10000) {
                libAccount.showMessage('Mệnh giá tối thiểu 10.000');
                return;
            }
            if (amount > 10000000) {
                libAccount.showMessage('Mệnh giá tối đa 10.000.000');
                return;
            }
            getInfozaloPay(amount);
        });
        $('.bt_charge_nap_back').click(function() {
            $('#zaloInputId').show();
            $('#zaloInfoId').hide();
        });


        function getInfozaloPay(amount) {
            var m = {
                amount: amount
            };
            libs.PostData(jsConfig.urlRootProfile + 'Payment/GetInfoZaloPay',
                m,
                function(data) {
                    $('#zaloInputId').hide();
                    $('#zaloInfoId').show();
                    $('#txt_sdt').html(data.phoneNumber);
                    $('#txt_tentk').html(data.phoneName);
                    $('#txt_content').html(data.content);
                    $('#txt_amount').html(util.ParseMoney(amount));

                },
                function(erro) {
                    libAccount.showMessage(erro.responseText);
                });
        }
    };


    var tempdaily;
    this.listAgent = function() {
        if (typeof tempdaily === 'undefined')
            tempdaily = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/listagent.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempdaily));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();

            if (index === 1) {
                libprofile.chargewin();
                return;
            }

            if (index === 3) {
                libprofile.listAgent();
                return;
            }


            if (index === 5) {
                libprofile.chargeviettelPay();
                return;
            }
            if (index === 6) {
                libprofile.chargezaloPay();
                return;
            }

            if (index === 2) {
                libprofile.chargemomo();
                return;
            }
            if (index === 4) {
                libprofile.buycard();
                return;
            }

        });


        getlistAgent();

        function getlistAgent() {
            var m = {};
            libs.PostData(jsConfig.urlRootProfile + 'AllAgency/GetallAgency',
                m,
                function(data) {
                    bindingAgent(data);
                },
                function(a) {});


        }

        function bindingAgent(data) {

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td width="5%">' + (i + 1) + '</td>';
                html += '<td width="15%">' + data[i].AgencyName + '</td>';
                html += '<td width="15%"><span class="t-pink">' + data[i].NickName + '</span></td>';
                html += '<td width="15%"><span>' + data[i].Mobile + '</span></td>';
                html += '<td width="20%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + data[i].Address + '</td>';

                html += '<td width="46px"><a href=' + data[i].Zalo + ' target="_blank" class="iconZalo"></a> </td>';
                html += '<td width="46px"><a href=' + data[i].Telegram + ' target="_blank" class="iconTele"></a> </td>';
                html += '<td width="46px"><a href=' + data[i].Facebook + ' target="_blank" class="iconFb"></a> </td>';
                html += '<td width="10%"><span rel=' + data[i].NickName + ' class="icon_Ck quickToCk">Chuyển</span></td>';
                html += '</tr>';


            }



            $("#table_body").html(html);
            $('.icon_Ck.quickToCk').unbind('click');
            $('.icon_Ck.quickToCk').click(function() {
                var nickname = $(this).attr('rel');
                if (typeof nickname === 'undefined' || nickname === '')
                    return;
                libprofile.transfer(nickname);
            });
            $("#contentDaily").slimScroll({
                height: '645px'
            });
        }

    };

    var temptransfer;
    var checknickname;
    this.transfer = function(tonickname) {

        if (typeof temptransfer === 'undefined')
            temptransfer = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/transfer.html?v=1");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(temptransfer));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });

        getListAgent();
        changeOtp();


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();
            if (index === 0) {
                libprofile.transfer();
                return;
            }

            if (index === 1) {
                libprofile.buycard();
                return;
            }
            if (index === 2) {
                libprofile.chargewin();
                return;
            }

        });


        $('.tap_polidaili .tab_daily.tap1').click(function() {
            $('.tap_polidaili .tab_daily').removeClass('active');
            $('.tap_polidaili .tab_daily.tap1').addClass('active');

            $('.note_tranfer').show();
            $('.list_daily').hide();
        });

        $('.tap_polidaili .tab_daily.tap2').click(function() {
            $('.tap_polidaili .tab_daily').removeClass('active');
            $('.tap_polidaili .tab_daily.tap2').addClass('active');
            $('.note_tranfer').hide();
            $('.list_daily').show();
            getListAgent();
        });

        $('#total_bank').html(util.ParseMoney(App.currentAccount.TotalGold));

        $('.tranfercaptra .refesh').click(function(e) {

            var verify = $('.tranfercaptra #tranfercaptra').val();
            libs.GetData(jsConfig.urlRootProfile + '/captcha/Get?length=3&height=60&width=120&verify=' + verify, {},
                function(data) {
                    if (data) {
                        $('#captcha_verify_tranfer').val(data[0]);
                        $('#captcha_image')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }

                },
                function(a) {});
        });
        $('.tranfercaptra .refesh').click();

        $('#txttranfer_amount').keyup(function() {
            changeAmount();
        });

        $('#txttranfer_nick').change(function() {
            checkAccountExist();

            var userName = $('#txttranfer_nick').val(),
                reUserName = $('#txttranfer_renick').val();

            if (reUserName.length > 0) {
                if (reUserName !== userName) {

                    $('.check_renick').removeClass('checked');
                    $('.check_renick').addClass('none');
                } else {
                    $('.check_renick').removeClass('none');
                    $('.check_renick').addClass('checked');
                }
            }
        });

        $('#txttranfer_renick').change(function() {
            var userName = $('#txttranfer_nick').val(),
                reUserName = $('#txttranfer_renick').val();
            if (reUserName !== userName) {
                $('.check_renick').removeClass('checked');
                $('.check_renick').addClass('none');
            } else {
                $('.check_renick').removeClass('none');
                $('.check_renick').addClass('checked');
            }
        });

        $('#otptype').change(function(e) {
            changeOtp();
        });


        $('.boxtranfer .sendOtp').click(function() {
            sendOtp();
        });


        $('.bt_tranfer_back').click(function() {
            backtranfer();
        });
        $('.bt_tranfer_confirm').click(function() {
            confirm();
        });
        $('.bt_tranfer_continue').click(function() {
            payment();
        });






        function getListAgent() {
            var m = {};

            libs.PostData(jsConfig.urlRootProfile + 'AllAgency/GetallAgency',
                m,
                function(data) {

                    bindingAgent(data);
                },
                function(a) {});


        }

        function bindingAgent(data) {

            var html = '';


            for (var i = 0; i < data.length; i++) {
                html += '<tr  rel="' + data[i].NickName + '">';
                html += '<td width="3%">' + (i + 1) + '</td>';
                html += '<td width="15%">' + data[i].AgencyName + '</td>';
                html += '<td width="15%"><span class="t-pink">' + data[i].NickName + '</span></td>';
                html += '<td width="20%"><span>' + data[i].Mobile + '</span></td>';
                html += '<td width="15%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + data[i].Address + '</td>';
                html += '<td width="45px"><a href=' + data[i].Zalo + ' target="_blank" class="iconZalo"></a> </td>';
                html += '<td width="45px"><a href=' + data[i].Telegram + ' target="_blank" class="iconTele"></a> </td>';
                html += '<td width="45px"><a href=' + data[i].Facebook + ' target="_blank" class="iconFb"></a> </td>';
                html += '<td width="10%"><span class="icon_Ck bt_quick"  rel="' + data[i].NickName + '" > Chuyển </span></td>';
                html += '</tr>';


            }

            $("#table_body").html(html);
            $(".list_daily").slimScroll({
                height: '578px'
            });


            $('.list_daily .icon_Ck.bt_quick').unbind('click');
            $('.list_daily .icon_Ck.bt_quick').click(function() {
                var nickname = $(this).attr('rel');
                if (typeof nickname === 'undefined' || nickname === '' || $('#step1').css('display') === 'none')
                    return;
                checknickname = true;
                $('#txttranfer_nick,#txttranfer_renick').val(nickname);

                $('.list_daily #table_body tr').removeClass('active');
                $('.list_daily #table_body tr[rel^=' + nickname + ']').addClass('active');


                $('.check_nick').removeClass('none');
                $('.check_nick').addClass('checked');
                $('.check_renick').removeClass('none');
                $('.check_renick').addClass('checked');

            });
            bindtoNick(tonickname);
        }

        function changeAmount() {

            var zo = parseInt($('#txttranfer_amount').val());
            if (!zo > 0) zo = 0;
            var zorate = parseInt(zo - (zo * 2 / 100));
            $('#lblTotalReice').html(util.ParseMoney(zorate));
            $('#lblTotalReice2').html(util.ParseMoney(zorate));
            $('#lblTotalReice3').html(util.ParseMoney(zorate));
        };

        function checkAccountExist() {
            var that = this;
            var nickname = $('#txttranfer_nick').val();
            if (nickname.length < 4) {
                $('.check_nick').removeClass('checked');
                $('.check_nick').addClass('none');
                return;
            }


            libs.PostData(jsConfig.urlRootProfile + 'account/CheckAccountExisted', {
                    UserName: nickname
                },
                function(data) {

                    var accountId = data.AccountID;
                    if (accountId > 0) {
                        checknickname = true;
                        $('.check_nick').removeClass('none');
                        $('.check_nick').addClass('checked');
                        $('.list_daily #table_body tr').removeClass('active');
                        $('.list_daily #table_body tr[rel^=' + nickname + ']').addClass('active');



                        return;
                    } else {
                        $('.check_nick').removeClass('checked');
                        $('.check_nick').addClass('none');
                        checknickname = false;
                    }



                },
                function(data) {});
        }

        function bindtoNick(tonickname) {
            var nickname = tonickname;
            if (typeof nickname === 'undefined' || nickname === '' || $('#step1').css('display') === 'none')
                return;
            checknickname = true;
            $('#txttranfer_nick,#txttranfer_renick').val(nickname);

            $('.list_daily #table_body tr').removeClass('active');
            $('.list_daily #table_body tr[rel^=' + nickname + ']').addClass('active');


            $('.check_nick').removeClass('none');
            $('.check_nick').addClass('checked');
            $('.check_renick').removeClass('none');
            $('.check_renick').addClass('checked');
        }

        function changeOtp() {
            var type = parseInt($('#otptype').val());

            if (type === 1) {
                $('.note-smsotp')
                    .html(
                        '<p>Lưu ý : phí mỗi lần lấy mã OTP là <span>500 B</span>. Mỗi mã OTP có giá trị 5 phút tính từ thời điểm hệ thống gửi đến số điện thoại của bạn.</p>');
                return;
            }

            if (type === 3) {
                $('.note-smsotp')
                    .html(
                        '<p>Vui lòng nhấn "Lấy mã OTP" sau đó vào mục <span>share contact</span> nếu lần đầu xác thực telegram, nhắn tin cú pháp <span>/otp</span>  để lấy mã OTP TELEGRAM miễn phí</p>');

                return;
            }


        }

        function sendOtp() {

            var type = parseInt($('#otptype').val());

            if (type === 1) {

                libprofile.SenOTPSMS();
                return;
            }

            if (type === 3) {
                window.open(jsConfig.hostConfig.linkPort.LinkTele1);
                return;
            }

        }

        function backtranfer() {
            $('#step1').show();
            $('#step2').hide();
            $('#step3').hide();
            $('.tranfercaptra .refesh').click();
            $('#txttranfer_nick').val('');
            $('#txttranfer_renick').val('');
            $('#txttranfer_amount').val('');
            $('#txttranfer_note').val('');
            $('#total_bank').html(util.ParseMoney(App.currentAccount.TotalGold));

            $('.check_nick').removeClass('none').removeClass('checked');
            $('.check_renick').removeClass('none').removeClass('checked');


        }

        var tokenPayment;

        function payment() {

            var userName = $('#txttranfer_nick').val(),
                reUserName = $('#txttranfer_renick').val(),
                amount = $('#txttranfer_amount').val(),
                reason = $('#txttranfer_note').val(),
                verify = $('#captcha_verify_tranfer').val(),
                captcha = $('#tranfercaptra').val();


            var errText = '';
            if (userName.length < 4) {
                errText = 'Bạn chưa điền đầy đủ thông tin!';
                libAccount.showMessage(errText);
                return;
            }
            if (userName !== reUserName) {
                errText = 'nhập lại nhân vật không đúng';
                libAccount.showMessage(errText);
                return;
            }

            if (!checknickname) {
                errText = 'Tên nhận vật không tồn tại';
                libAccount.showMessage(errText);
                return;
            }


            if (amount.length <= 0) {
                errText = 'Bạn chưa điền đầy đủ thông tin!';
                libAccount.showMessage(errText);
                return;
            }
            if (parseInt(amount) > App.currentAccount.TotalGold) {
                errText = 'Số dư không đủ';
                libAccount.showMessage(errText);
                return;

            }
            if (parseInt(amount) < 10000) {
                errText = 'Giá trị chuyển khoản không hợp lệ';
                libAccount.showMessage(errText);
                return;

            }
            if (reason.length <= 5) {
                errText = 'Lý do chuyển khoản tối thiểu 6 ký tự';
                libAccount.showMessage(errText);
                return;

            }
            reason = detectCsrf(reason);

            if (captcha.length === 0) {
                errText = 'Bạn chưa điền đầy đủ thông tin!';
                libAccount.showMessage(errText);
                return;
            }


            var data = {
                'userName': userName,
                'amount': amount,
                'reason': reason,
                'captcha': captcha,
                'verify': verify
            };
            libs.PostData(jsConfig.urlRootProfile + 'Payment/TranferAccount2',
                data,
                function(data) {
                    if (data.ResponseStatus >= 0) {
                        tokenPayment = data.token;
                        showConfirm();
                        console.log('tokenPayment:' + tokenPayment);
                    }
                },
                function(err) {
                    errText = err.responseText;
                    libAccount.showMessage(errText);

                });

        }

        function showConfirm() {

            $('#step1').hide();
            $('#step2').show();
            $('#total_bankstep2').html(util.ParseMoney(App.currentAccount.TotalGold));
            $('#lblnicknamereice').html($('#txttranfer_nick').val());
            $('#lblnicknamereice3').html($('#txttranfer_nick').val());


        }

        function confirm() {
            var that = this;
            var errText = '';
            var otp = $('#txt_otp').val(),
                otpType = $('#otptype').val();

            if (otp === '') {
                errText = 'Bạn chưa nhập mã OTP!';
                libAccount.showMessage(errText);

                return;
            }
            if (tokenPayment === undefined || tokenPayment === '') {
                errText = 'Dữ liệu không đúng vui lòng thoát ra vào lại !';
                libAccount.showMessage(errText);
                return;
            }

            var data = {
                'otp': otp,
                'OtpType': otpType,
                'token': tokenPayment
            };
            libs.PostData(jsConfig.urlRootProfile + 'Payment/TranferAccountConfirm2',
                data,
                function(data) {

                    $('#total_bankstep3').html(util.ParseMoney(data.Balance));
                    $('#step3').show();
                    $('#step2').hide();
                    libAccount.UpdateBalance(2, data.Balance);


                },
                function(err) {
                    libAccount.showMessage(err.responseText);

                });
        };

        function detectCsrf(reason) {
            var c = reason;
            c = c.replaceAll('<', '').replaceAll('>', '');
            var a = [
                "script", "alert", "promt", "javascript", "onclick", "onblur", "ondblclick", "onkeydown", "onkeypress",
                "onkeyup", "onmousedown",
                "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onfocus", "cookie"
            ];
            var b = [
                "select", "from", "union", "1=1", "delete", "drop", "exec", "information_schema", "xp_cmdshell",
                "database", "user", "--", "'"
            ];

            $.each(a,
                function(i, k) {
                    c = c.replaceAll(k, '');
                });
            $.each(b,
                function(i, k) {
                    c = c.replaceAll(k, '');
                });
            return c;
        };

        String.prototype.replaceAll = function(find, replace) {
            var str = this;
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        };
    };


    var tempbuycard;
    this.buycard = function() {

        if (typeof tempbuycard == 'undefined')
            tempbuycard = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/bycard.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempbuycard));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });

        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();
            if (index === 0) {
                libprofile.transfer();
                return;
            }

            if (index === 1) {
                libprofile.buycard();
                return;
            }
            if (index === 2) {
                libprofile.chargewin();
                return;
            }

        });


        $('.buycardtab .momobuy').click(function() {
            $('#tabBuycard').hide();
            $('#contentBuymomo').show();
        });

        $('.tranfercaptra .refesh').click(function(e) {

            var verify = $('.tranfercaptra #tranfercaptra').val();
            libs.GetData(jsConfig.urlRootProfile + '/captcha/Get?length=3&height=60&width=120&verify=' + verify, {},
                function(data) {
                    if (data) {
                        $('#captcha_verify_tranfer').val(data[0]);
                        $('#captcha_image')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }

                },
                function(a) {});
        });
        $('.tranfercaptra .refesh').click();

        $('#otptype').change(function(e) {
            changeOtp();
        });


        $('.boxtranfer .sendOtp').click(function() {
            sendOtp();
        });

        $('.bt_tranfer_continue').click(function() {

            var momoAmount = parseInt($('#momoAmount').val()),
                txtnumMomo = $('#txtnumMomo').val(),
                verify = $('#captcha_verify_tranfer').val(),
                captcha = $('#tranfercaptra').val();
            if (momoAmount === 0) {
                libAccount.showMessage('Bạn chưa chọn số tiền');
                return;
            }

            if (txtnumMomo === '') {
                libAccount.showMessage('Bạn chưa nhập tài khoản momo');
                return;
            }
            if (captcha === '') {
                libAccount.showMessage('Bạn chưa nhập mã captra');
                return;
            }




            var i = {
                'verify': verify,
                'captcha': captcha,
                'amount': momoAmount,
                'numbermomo': txtnumMomo
            };

            libs.PostData(jsConfig.urlRootProfile + '/Payment/tranferMomo',
                i,
                function(data) {
                    showConfirm(data);


                },
                function(a) {

                    libAccount.showMessage(a.responseText);
                    $('.napcaptra .refesh').click();
                });


        });


        $('.bt_tranfer_back').click(function() {
            backtranfer();
        });
        $('.bt_tranfer_confirm').click(function() {
            confirm();
        });

        function showConfirm(data) {

            $('#step1').hide();
            $('#step2').show();
            $('#mobiMomo').html(data.accountCheck);
            $('#nicknameMomo').html(data.name);
            $('.napcaptra .refesh').click();

            $('#total_bankstep2').html(util.ParseMoney(App.currentAccount.TotalGold));
            $('#lblTotalReice2').html($('#momoAmount').val());


        }

        function backtranfer() {
            $('#step1').show();
            $('#step2').hide();
            $('#step3').hide();
            $('.tranfercaptra .refesh').click();



        }

        function confirm() {
            var that = this;
            var errText = '';
            var txtnumMomo = $('#txtnumMomo').val(),
                otp = $('#txt_otp').val(),
                otpType = $('#otptype').val();

            if (otp === '') {
                errText = 'Bạn chưa nhập mã OTP!';
                libAccount.showMessage(errText);
                return;
            }

            var data = {
                'otp': otp,
                'OtpType': otpType,
                numbermomo: txtnumMomo
            };
            libs.PostData(jsConfig.urlRootProfile + 'Payment/ConfirmTranferMomo',
                data,
                function(data) {
                    $('#total_bankstep3').html(util.ParseMoney(data.balance));
                    $('#step3').show();
                    $('#step2').hide();
                    libAccount.UpdateBalance(2, data.balance);
                },
                function(err) {
                    libAccount.showMessage(err.responseText);

                });
        };


        changeOtp();
        getListMomovalue();

        function getListMomovalue() {

            var m = {};
            libs.GetData(jsConfig.urlRootProfile + 'Payment/GetListMomoValue',
                m,
                function(data) {

                    bindListMomovalue(data.ListMomo);

                },
                function(a) {});
        };

        function bindListMomovalue(filer) {

            var html = '';


            var htmlAmount = '';

            htmlAmount += '<option selected="selected" value="0">Chọn số tiền</option>';

            for (var i = 0; i < filer.length; i++) {
                html += '<tr>';
                html += '<td width="30%" style="font-size: 22px">' + util.ParseMoney(filer[i].ProductValue) + '</td>';
                html += '<td width="35%" style="font-size: 22px"><span class="t-pink">' + util.ParseMoney(filer[i].ProductPartnerValue) + '</span></td>';
                html += '</tr>';
                htmlAmount += '<option value="' +
                    filer[i].ProductValue +
                    '">' +
                    util.ParseMoney(filer[i].ProductValue) +
                    '</option>';
            }
            $('#momoAmount').html(htmlAmount);
            $("#table_body").html(html);
        }

        function changeOtp() {
            var type = parseInt($('#otptype').val());

            if (type === 1) {
                $('.note-smsotp')
                    .html(
                        '<p>Lưu ý : phí mỗi lần lấy mã OTP là <span>500 B</span>. Mỗi mã OTP có giá trị 5 phút tính từ thời điểm hệ thống gửi đến số điện thoại của bạn.</p>');
                return;
            }

            if (type === 3) {
                $('.note-smsotp')
                    .html(
                        '<p>Vui lòng nhấn "Lấy mã OTP" sau đó vào mục <span>share contact</span> nếu lần đầu xác thực telegram, nhắn tin cú pháp <span>/otp</span>  để lấy mã OTP TELEGRAM miễn phí</p>');

                return;
            }


        }

        function sendOtp() {

            var type = parseInt($('#otptype').val());

            if (type === 1) {

                libprofile.SenOTPSMS();
                return;
            }

            if (type === 3) {
                window.open(jsConfig.hostConfig.linkPort.LinkTele1);
                return;
            }

        }

    };



    var tempprofile;
    this.profie = function() {

        if (typeof tempprofile == 'undefined')
            tempprofile = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/profile.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempprofile));

        $('.btn-close_popuplare').click(function() {

            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            if (index === 1) {
                libprofile.profie();
                return;
            }

            if (index === 2) {
                libprofile.history();
                return;
            }

            if (index === 3) {
                libprofile.safe();
                return;
            }

            if (index === 4) {
                libprofile.security();
                return;
            }

            if (index === 5) {
                libprofile.mail();
                return;
            }

        });


        $('.profi_security .bt_nap').click(function() {
            libprofile.chargewin();
        });

        $('.profi_security .bt_chuyenkhoan').click(function() {
            libprofile.transfer();
        });

        $('.contenthoso .bt_change_pass').click(function() {
            libprofile.changePass();
        });

        var avatarUrl = jsConfig.urlRootStatic + '/assets/avatars/' + App.currentAccount.AvartarID + '.png';
        $('.profi_avartar .avar_id').css('background-image', 'url("' + avatarUrl + '")');


        $('#profi_nickID').html(App.currentAccount.Nickname);
        $('#profi_usernameID').html(App.currentAccount.UserName);

        $('.profi_balance .star').html(util.ParseMoney(App.currentAccount.TotalGold));
        $('.profi_balance .vippoint').html(util.ParseMoney(App.currentAccount.TotalVP));

        if (App.currentAccount.MerchantID === 2) {
            $('#profi_active').html('Đã xác thực');
        } else {
            $('#profi_active').html('Chưa xác thực');
        }
    };
    var tempchangePass;
    this.changePass = function() {
        if (typeof tempchangePass == 'undefined')
            tempchangePass = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/changpass.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempchangePass));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.popup_lagre').remove();
            $(".over_poup").hide();
            if (index === 0) {
                libprofile.profie();
                return;
            }

            if (index === 1) {
                libprofile.changePass();
                return;
            }


        });


        $('.contentchangepass .bt_changepass').click(function() {

            var pass = $('#txt_pass').val(),
                newPassWord = $('#txt_pass_new').val(),
                rePassWord = $('#txt_pass_renew').val(),
                very = $('#captcha_verify_change').val(),
                captcha = $('#cardcaptra').val();

            var f = '';
            if (pass.length < 6) {
                f = 'Mật khẩu có độ dài từ 6 đến 18 ký tự, gồm chữ cái, chữ số';
                libAccount.showMessage(f);

                return;
            }
            if (newPassWord.length < 6) {
                f = 'Mật khẩu có độ dài từ 6 đến 18 ký tự, gồm chữ cái, chữ số';
                libAccount.showMessage(f);

                return;
            }

            if (!libs.ValidateLetterPassword(newPassWord)) {

                libAccount.showMessage('Mật khẩu có ký tự đặc biệt');

                return;
            }
            if (rePassWord !== newPassWord) {
                f = 'Nhập lại mật khẩu không chính xác';
                libAccount.showMessage(f);

                return;
            }
            if (captcha.length < 3) {
                f = 'Mã xác nhận không chính xác';
                libAccount.showMessage(f);
                return;
            }
            var h = {
                'Password': pass,
                'NewPassword': newPassWord,
                'captcha': captcha,
                'verify': very
            };

            libs.PostData(jsConfig.urlRootProfile + 'Account/ChangePassword',
                h,
                function(a) {
                    libAccount.showMessage("Đổi mật khẩu thành công!", 1);

                },
                function(a) {
                    var c = a.responseText;
                    libAccount.showMessage(c);
                    $('.changecaptra .refesh').click();
                });

        });

        $('.changecaptra .refesh').click(function(e) {

            $('.changecaptra #cardcaptra').val('');
            var verify = $('.changecaptra #cardcaptra').val();
            libs.GetData(jsConfig.urlRootProfile + '/captcha/Get?length=3&height=60&width=120&verify=' + verify, {},
                function(data) {
                    if (data) {
                        $('#captcha_verify_change').val(data[0]);
                        $('#captcha_image')[0].src = 'data:image/jpeg;base64,' + data[1];
                    }

                },
                function(a) {});
        });
        $('.changecaptra .refesh').click();


    };

    var tempsecurity;
    this.security = function() {
        if (typeof tempsecurity == 'undefined')
            tempsecurity = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/security.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempsecurity));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });


        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            if (index === 1) {
                libprofile.profie();
                return;
            }

            if (index === 2) {
                libprofile.history();
                return;
            }

            if (index === 3) {
                libprofile.safe();
                return;
            }

            if (index === 4) {
                libprofile.security();
                return;
            }

            if (index === 5) {
                libprofile.mail();
                return;
            }

        });


        bindingSecurity();
        libprofile.bindOTP();
        $('#content_security_mobi').show();
        $('#content_security_login').hide();

        $('.tab_sercurity .sercurity_sdt,.register_sms').click(function() {

            libprofile.security();
        });


        $('.tab_sercurity .sercurity_authen').click(function() {

            $('#content_security_mobi').hide();
            $('#content_security_login').show();
            $('.tab_sercurity div').removeClass('active');
            $('.tab_sercurity .sercurity_authen').addClass('active');
            bindingSecurityAuthen();
        });


        $('#bt_updateSecurity').click(function() {
            var mobi = $('#txt_mobi').val();

            if (mobi.length === 0) {

                libAccount.showMessage('Bạn chưa nhập số điện thoại');

                return;
            }
            if (!libs.validateNumberOnly(mobi)) {
                libAccount.showMessage('Số điện thoại không hợp lệ');
                return;
            }
            if (mobi.length > 0 && mobi.length > 11) {
                libAccount.showMessage('Số điện thoại không hợp lệ');

                return;
            }
            if (mobi.length > 0 && mobi.substr(0, 1) != '0') {
                libAccount.showMessage('Số điện thoại không hợp lệ');
                return;
            }
            var datapost = {
                'mobile': mobi
            };

            libs.PostData(jsConfig.urlRootProfile + 'Profile/UpdateProfile',
                datapost,
                function(data) {
                    $('#step_2').show();
                    $('#content_otp').show();
                    $('#step_1').hide();
                },
                function(erro) {
                    libAccount.showMessage(erro.responseText);
                });
        });
        $('.bt_cancelSecurity').click(function() {
            $('#txt_mobi').val('');
            $('#step_1').show();
            $('#step_2').hide();
        });

        $('#bt_updateSecurity2').click(function() {

            var otp = $('#txt_otp').val();
            if (otp.length <= 0) {
                libAccount.showMessage('Bạn cần nhập vào mã OTP');
                return;
            }
            var datapost = {
                'Otp': otp
            };
            libs.PostData(jsConfig.urlRootProfile + 'Profile/ConfirmMobile',
                datapost,
                function(data) {

                    App.currentAccount.MerchantID = data.ResponseStatus;
                    checksdtactive(App.currentAccount.MerchantID);
                    libprofile.security();

                },
                function(a) {
                    libAccount.showMessage(a.responseTex);
                });
        });


        $('#bt_securitycanel1').click(function() {
            $('#bt_securitycanel2').show();
            $('#content_otp').show();
            $('#bt_securitycanel3').show();
            $('#bt_securitycanel1').hide();
        });

        $('#bt_securitycanel2').click(function() {
            $('#bt_securitycanel2').hide();
            $('#content_otp').hide();
            $('#bt_securitycanel3').hide();
            $('#bt_securitycanel1').show();
        });


        $('#bt_securitycanel3').click(function() {
            var otp = $('#txt_otp').val();

            var otpType = $('#otptype').val();
            if (otp.length <= 0) {
                libAccount.showMessage('Bạn cần nhập vào mã OTP');
                return;
            }
            var dataPost = {
                'Otp': otp,
                'OtpType': otpType
            };
            libs.PostData(jsConfig.urlRootProfile + 'Profile/CancelMobile',
                dataPost,
                function(data) {
                    App.currentAccount.MerchantID = data.ResponseStatus;
                    checksdtactive(App.currentAccount.MerchantID);
                    libprofile.security();
                },
                function(a) {
                    libAccount.showMessage(a.responseTex);
                });
        });


        $('.bt_authenOtp').click(function() {

            if ($('.bt_authenOtp').hasClass('active')) {


                var otpType = $('#otptype').val(),
                    otp = $('#txt_otp').val();


                var f;
                if (otp.length <= 0) {
                    f = 'Bạn cần nhập vào mã xác OTP';
                    libAccount.showMessage(f);
                    return;
                }
                var datapost = {
                    'otp': otp,
                    'OtpType': otpType
                };

                libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusCancelService',
                    datapost,
                    function(data) {
                        App.currentAccount.IsOtp = data.Response;
                        bindingSecurityAuthen();
                    },
                    function(erro) {
                        libAccount.showMessage(erro.responseTex);
                    });


            } else {
                libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusCreateService', {},
                    function(data) {
                        App.currentAccount.IsOtp = data.Response;
                        bindingSecurityAuthen();
                    },
                    function(erro) {
                        libAccount.showMessage(erro.responseTex);

                    });
            }


        });


        function bindingSecurity() {

            checksdtactive(App.currentAccount.MerchantID);
            libs.GetData(jsConfig.urlRootProfile + 'Profile/GetSecurityInfo', {},
                function(data) {

                    App.currentAccount.MerchantID = data.Account.ConfirmCode;
                    if (data.Account.ConfirmCode >= 2) {
                        $("#userMobiId").html(" " + data.Account.MobileDisplay);
                    }

                    checksdtactive(data.Account.ConfirmCode);

                },
                function() {
                    checksdtactive(-1);
                });
        }

        function checksdtactive(code) {
            if (code < 2) {
                $('#step_1').show();
                $('#content_otp').hide();
                $('#step_2').hide();
                $('#step_3').hide();
                $("#userMobiId").html(" Chưa cập nhật");
            } else {
                $('#step_1').hide();
                $('#content_otp').hide();
                $('#step_2').hide();
                $('#step_3').show();

            }
        }


        function bindingSecurityAuthen() {
            if (App.currentAccount.MerchantID < 2) {
                $('#notSMS').show();
                $('#okSms').hide();
            } else {
                $('#notSMS').hide();
                $('#okSms').show();
                libs.GetData(jsConfig.urlRootProfile + 'Profile/GetSMSInfo', {},
                    function(data) {
                        App.currentAccount.IsOtp = data.isOtp;
                        if (App.currentAccount.IsOtp === 0) {
                            $('.bt_cancelauthenOtp').removeClass('active');
                            $('.bt_authenOtp').removeClass('active');
                            $('#note_smsAuthen').show();
                            $('#content_otp').hide();
                            $('#stateAuthen').css('color', '#f00');
                            $('#stateAuthen').html(" Tắt");

                        } else {
                            $('#note_smsAuthen').hide();
                            $('.bt_cancelauthenOtp').addClass('active');
                            $('.bt_authenOtp').addClass('active');
                            $('#content_otp').show();

                            $('#stateAuthen').css('color', '#00ff1b');
                            $('#stateAuthen').html(" Bật");
                        }

                    },
                    function() {});


            }
        }

    };


    var tempsafe;
    this.safe = function() {

        if (typeof tempsafe == 'undefined')
            tempsafe = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/safe.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempsafe));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });

        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            if (index === 1) {
                libprofile.profie();
                return;
            }

            if (index === 2) {
                libprofile.history();
                return;
            }

            if (index === 3) {
                libprofile.safe();
                return;
            }

            if (index === 4) {
                libprofile.security();
                return;
            }

            if (index === 5) {
                libprofile.mail();
                return;
            }

        });


        $('.contentsafe .register_sms').click(function() {
            libprofile.security();
        });
        $('.tap_safebank .tap_safe.tap1').click(function() {
            $('.tap_safebank .tap_safe').removeClass('active');
            $('.tap_safebank .tap_safe.tap1').addClass('active');
            $('.statefreez').html('Gửi tiền');
            $('.otp_safe').removeClass('active');
            $('.bt_freezsafe').removeClass('active');
            $('.bt_freezsafeall ').removeClass('active');
        });

        $('.tap_safebank .tap_safe.tap2').click(function() {
            $('.tap_safebank .tap_safe').removeClass('active');
            $('.tap_safebank .tap_safe.tap2').addClass('active');
            $('.statefreez').html('Rút tiền');
            $('.otp_safe').addClass('active');
            $('.bt_freezsafe').addClass('active');
            $('.bt_freezsafeall ').addClass('active');


        });

        $('.bt_freezsafe').click(function() {
            var type = 1;
            var amount = parseInt($('#txt_amount_free').val());
            if (amount <= 0 || $('#txt_amount_free').val() === '') {
                libAccount.showMessage("Bạn cần nhập số tiền");
                return;
            }
            if ($('.bt_freezsafe').hasClass('active')) {
                type = 2;
                if (App.currentAccount.BalanceFreeze < amount) {
                    libAccount.showMessage("Số dư trong két không đủ");
                    return;
                }

            } else {
                type = 1;
                if (App.currentAccount.TotalGold < amount) {
                    libAccount.showMessage("Số dư không đủ");
                    return;
                }

                if (amount < 10000) {
                    libAccount.showMessage("Gửi tiền tối thiểu 10.000");
                    return;
                }
            }


            var otpType = $('#otptype').val(),
                otp = $('#txt_otp').val();

            var datapost = {
                'Otp': otp,
                'OtpType': otpType,
                'goldFreeze': amount,
                Freezetype: type
            };
            libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusUpdateFreeze',
                datapost,
                function(data) {
                    libAccount.showMessage(data.Freezetype === 1 ? "Gửi tiền thành công" : "Rút tiền thành công", 1);
                    bindingsafe();
                    $('#txt_amount_free').val('');
                    $('#txt_otp').val('');
                },
                function(erro) {
                    libAccount.showMessage(erro.responseText);
                });

        });

        $('.bt_freezsafeall').click(function() {

            var type = 1;
            if ($('.bt_freezsafeall').hasClass('active')) {
                type = 2;
                if (App.currentAccount.BalanceFreeze <= 0) {
                    libAccount.showMessage("Số dư trong két không đủ");
                    return;
                }

            } else {
                type = 1;
                if (App.currentAccount.TotalGold < 10000) {
                    libAccount.showMessage("Gửi tiền tối thiểu 10.000");
                    return;
                }
            }

            var otpType = $('#otptype').val(),
                otp = $('#txt_otp').val();

            var datapost = {
                'Otp': otp,
                'OtpType': otpType,
                'goldFreeze': 0,
                Freezetype: type
            };
            libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusUpdateFreeze',
                datapost,
                function(data) {
                    libAccount.showMessage(data.Freezetype === 1 ? "Gửi tiền thành công" : "Rút tiền thành công", 1);
                    bindingsafe();
                    $('#txt_amount_free').val('');
                    $('#txt_otp').val('');
                },
                function(erro) {
                    libAccount.showMessage(erro.responseText);
                });
        });


        var avatarUrl = jsConfig.urlRootStatic + '/assets/avatars/' + App.currentAccount.AvartarID + '.png';
        $('.profi_avartar .avar_id').css('background-image', 'url("' + avatarUrl + '")');

        $('.contentsafe .profi_nick span').html(App.currentAccount.Nickname);
        $('.contentsafe .profi_user span').html(App.currentAccount.UserName);
        bindingsafe();
        libprofile.bindOTP();

        function bindingsafe() {

            if (App.currentAccount.MerchantID < 2) {
                $('.contentsafe #step1').show();
                $('.contentsafe #step2').hide();
            } else {
                $('.contentsafe #step1').hide();
                $('.contentsafe #step2').show();
                libs.GetData(jsConfig.urlRootProfile + 'Profile/GetFreezeInfo', {},
                    function(data) {
                        App.currentAccount.TotalGold = data.Freeze.BalanceTotal;
                        App.currentAccount.BalanceFreeze = data.Freeze.BalanceFreeze;
                        $('.boxsafe .totalbalane').html(util.ParseMoney(App.currentAccount.TotalGold));
                        $('.boxsafe .totalfreeze').html(util.ParseMoney(data.Freeze.BalanceFreeze));
                        libAccount.UpdateBalance(2, data.Freeze.BalanceTotal);
                    },
                    function(erro) {
                        libAccount.showMessage(erro.responseText);
                    });
            }


        }


    };


    var tempmail;
    this.mail = function() {
        if (typeof tempmail === 'undefined')
            tempmail = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/profile/mail.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempmail));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });
        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            if (index === 1) {
                libprofile.profie();
                return;
            }

            if (index === 2) {
                libprofile.history();
                return;
            }

            if (index === 3) {
                libprofile.safe();
                return;
            }

            if (index === 4) {
                libprofile.security();
                return;
            }

            if (index === 5) {
                libprofile.mail();
                return;
            }

        });

        bindingmail();

        function bindingmail() {
            libs.PostData(jsConfig.urlRootInbox + 'CircleSpin/getInbox', {},
                function(data) {
                    $('.btn-mail .count').html(0);
                    $('.btn-mail .count').hide();

                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var classRe = '';
                        if (data[i].ConfirmStatus === 1)
                            classRe = 'ready';
                        html += '  <div class="e_new e_old">';
                        html += ' <div class="e_icon" ></div >';
                        html += '  <div class="e_nd">';
                        html += '  <p class="e_name">' + data[i].Title + '</p>';
                        html += '  <p class="e_to">Người gửi: ' +
                            data[i].CreatedByName +
                            ' - Thời gian:  ' +
                            util.FormatDatetime(data[i].CreatedDate) +
                            '</p></div>';
                        html += '   <div class="e_nut">';
                        html += '   <button class="csRead ' + classRe + '"></button>';

                        html += '   </div>';
                        html += '    <div class="clear"></div>';
                        html += '<div class="e_doc" >' + data[i].Message + '<br></div>';
                        html += '</div>';
                    }


                    $('.email').html(html);

                    $('.csRead').click(function() {
                        var index = $(".csRead").index(this);
                        var mailfocus = $(".e_new ").eq(index);
                        mailfocus.removeClass('e_old');
                        $(".e_new ").hide();
                        mailfocus.show();
                        $('#backmail').show();

                        if (!$(".csRead").eq(index).hasClass('ready')) {
                            $(".csRead").eq(index).addClass('ready');
                        }


                    });

                    $('#backmail').click(function() {
                        $(".e_new ").show();
                        $(".e_new ").removeClass('e_old');
                        $(".e_new ").addClass('e_old');
                        $('#backmail').hide();

                    });
                },
                function(erro) {
                    libAccount.showMessage("Lấy dữ liệu thất bại");
                });
        }

    };


    var tempMapevent;
    this.mapevent = function(tabId) {
        if (typeof tempMapevent === 'undefined')
            tempMapevent = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/chuadao/toprank.html?v=12");
        $(".over_poup").show();
        $(".over_poup").append(jQuery.processTemplateToText(tempMapevent));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });
        $('.charge-tab-controllers .button ').click(function() {

            $('.charge-tab-controllers .button').removeClass('active');
            $(this).addClass('active');
            $('.jackpot-tabs .tab').removeClass('active');
            var index = parseInt($(this).attr('data-index'));

            $(".jackpot-tabs .tab").eq(index).addClass('active');

            if (index === 0) {
                $('#list-rankWeek-id div').removeClass('active');
                $('#list-rankWeek-id div').eq(3).addClass('active');
                getToprank(4);

            }
            if (index === 1) {
                getAccountHistory();
            }



        });

        $('#list-rankWeek-id div').click(function() {

            $('#list-rankWeek-id div').removeClass('active');
            $(this).addClass('active');
            var id = parseInt($(this).attr('data-id'));
            getToprank(id);

        });

        $("#helIland").slimScroll({
            height: '640px'
        });

        $('.charge-tab-controllers .button').eq(tabId).click();

        var cacheToprank = null;
        var cacheRankUser = null;

        function getToprank(weekid) {
            cacheToprank = null;
            libs.PostData(jsConfig.urlRootIsLand + 'api/IsLand/GetTopRankWeek', {
                    weekid: weekid
                }, function(data) {
                    cacheToprank = data.TopWeeks;
                    cacheRankUser = data.UserRank;
                    var weeks = data.Weeks;
                    for (var i = 0; i < weeks.length; i++) {
                        $('#list-rankWeek-id div').eq(i).html('<ul><li> ' + weeks[i].Description + '</li ><li>' + util.FormatMonthDay(weeks[i].FromDate) + ' - ' + util.FormatMonthDay(weeks[i].ToDate) + '</li></ul>');
                    }
                    bindToprank(1);
                },
                function(erro) {});
        }

        function bindToprank(current) {

            var html = '';
            var pages = cacheToprank.slice((current - 1) * 10, current * 10);
            pages.push(cacheRankUser);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="15%">' + pages[i].Rank + '</td>';
                html += '<td width="25%"><span class="t-pink2">' + util.ParseMoney(pages[i].Reward) + '</span></td>';
                html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].Gold) + '</span></td>';
                html += '<td width="25%">' + pages[i].NickName + '</td>';
                if (pages[i].OilLP === 0 && i < 5) {
                    html += '<td width="20%">***</td>';
                } else {
                    html += '<td width="20%">' + util.ParseMoney(pages[i].OilLP) + '</td>';
                }

                html += '</tr>';
            }

            $("#table_bodyToprank").html(html);
            pageCount = Math.ceil(cacheToprank.length / 10);
            $("#pager_topRank").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindToprank
            });

        }

        var cacheAccountHisLand;

        function getAccountHistory() {
            cacheToprank = null;
            libs.GetData(jsConfig.urlRootIsLand + 'api/IsLand/GetAccountHistoryLand', {}, function(data) {
                    cacheAccountHisLand = data;
                    bindAccountHisLand(1);
                },
                function(erro) {});
        }

        function bindAccountHisLand(current) {

            var html = '';
            var pages = cacheAccountHisLand.slice((current - 1) * rowperPage, current * rowperPage);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="20%">' + util.FormatDatetime(pages[i].CreatedDate) + '</td>';
                html += '<td width="40%">' + pages[i].Description + '</td>';
                html += '<td width="20%"><span class="t-pink2">' + util.ParseMoney(pages[i].Oil) + '</span></td>';
                html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].OilBank) + '</span></td>';
                html += '</tr>';
            }

            $("#table_bodyAccountLand").html(html);
            pageCount = Math.ceil(cacheAccountHisLand.length / rowperPage);
            $("#pager_AccountLand").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindAccountHisLand
            });

        }

    };

    var tempSlot;
    var cacheDataHistory;
    this.showSlotRank = function(gameId, tab) {

        if (typeof tempSlot === 'undefined')
            tempSlot = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/slot/rankSlot.html");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempSlot));

        $('.btn-close_popuplare').click(function() {
            cacheHistory = null;
            libs.CloseAll($('.popup_lagre'));
        });
        var urlSlot = '';
        if (gameId === 221)
            urlSlot = jsConfig.connectKong.hubUrl + '/api/KongAPI/';
        if (gameId === 219)
            urlSlot = jsConfig.connectGold.hubUrl + '/api/GoldAPI/';
        if (gameId === 116)
            urlSlot = jsConfig.connectMermaid.hubUrl + '/api/MermaidAPI/';
        if (gameId === 118)
            urlSlot = jsConfig.connectFruit.hubUrl + '/api/FruitApi/';

        $('.charge-tab-controllers .button ').click(function() {

            $('.charge-tab-controllers .button').removeClass('active');
            $(this).addClass('active');
            var index = parseInt($(this).attr('data-index'));
            cacheDataHistory = null;
            if (index === 0) {
                getRank();
            }
            if (index === 1) {
                getNotify();
            }
            if (index === 2) {
                getHistory();
            }
        });
        if (tab === 0) {
            $('.charge-tab-controllers .button').eq(0).click();

        } else {
            $('.charge-tab-controllers .button').eq(2).click();
        }




        function getRank() {
            var m = {};
            libs.GetData(urlSlot + 'ListJack_GetAPI', m, function(data) {
                cacheDataHistory = data;
                bindingRank(1);
            }, function(a) {

            });
        };

        function bindingRank(current) {
            var htmlhead = '<tr><th width="20%"> Thời gian</th><th width="20%">Tài khoản</th><th width="10%">Phòng</th><th width="10%">Jackpot</th><th width="20%">Thắng</th><th width="20%">Mô tả</th></tr >';
            var html = '';
            var pages = cacheDataHistory.slice((current - 1) * rowperPage, current * rowperPage);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="20%">' + util.FormatDatetime(pages[i].TimeWin) + '</td>';
                html += '<td width="20%">' + pages[i].NickName + '</td>';
                html += '<td width="10%"><span class="t-pink2">' + util.ParseMoney(roomBetvalue(pages[i].RoomID)) + '</span></td>';
                html += '<td width="10%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + roomTypeJack(pages[i].TypeJack, pages[i].NumberJack) + '</td>';
                html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].Jackpot) + '</span></td>';
                html += '<td width="20%">Nổ hũ</td>';
                html += '</tr>';


            }
            $("#table_thead").html(htmlhead);
            $("#table_body").html(html);
            pageCount = Math.ceil(cacheDataHistory.length / rowperPage);
            $("#pager_history").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindingRank
            });

        }


        function getHistory() {
            var m = {};
            libs.GetData(urlSlot + 'LogSpinAccount_GetAPI', m, function(data) {
                cacheDataHistory = data;
                bindingHistory(1);
            }, function(a) {

            });
        };

        function bindingHistory(current) {
            var htmlhead = '<tr><th width="10%">#Phiên</th><th width="20%"> Thời gian</th><th width="10%">Phòng</th><th width="10%">Số dòng</th><th width="20%">Tổng Đặt</th><th width="20%">Thắng</th><th width="20%">Mô tả</th></tr >';
            var html = '';
            var pages = cacheDataHistory.slice((current - 1) * rowperPage, current * rowperPage);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="10%">' + pages[i].SessionID + '</td>';
                html += '<td width="20%">' + util.FormatDatetime(pages[i].CreatedDate) + '</td>';


                html += '<td width="10%"><span class="t-pink2">' + util.ParseMoney(roomBetvalue(pages[i].RoomID)) + '</span></td>';
                html += '<td width="10%">' + pages[i].TotalLines + '</td>';
                html += '<td width="20%" style="max-width:218px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + util.ParseMoney(pages[i].TotalBetValue) + '</td>';
                html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].TotalPrizeValue) + '</span></td>';
                html += '<td width="20%"><span>' + pages[i].Description + '</span></td>';
                html += '</tr>';

            }
            $("#table_thead").html(htmlhead);
            $("#table_body").html(html);
            pageCount = Math.ceil(cacheDataHistory.length / rowperPage);
            $("#pager_history").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindingHistory
            });

        }


        function getNotify() {
            var m = {};
            libs.GetData(urlSlot + 'ListNotify_GetAPI', m, function(data) {
                cacheDataHistory = data;
                bindingNotify(1);
            }, function(a) {

            });
        };

        function bindingNotify(current) {
            var htmlhead = '<tr><th width="20%">Thời gian</th><th width="20%">Tài khoản</th><th width="20%">Phòng</th><th width="20%">Thắng</th><th width="20%">Mô tả</th></tr >';
            var html = '';
            var pages = cacheDataHistory.slice((current - 1) * rowperPage, current * rowperPage);
            for (var i = 0; i < pages.length; i++) {
                html += '<tr>';
                html += '<td width="20%">' + util.FormatDatetime(pages[i].CreatedDate) + '</td>';
                html += '<td width="20%">' + pages[i].NickName + '</td>';
                html += '<td width="20%"><span class="t-pink2">' + util.ParseMoney(roomBetvalue(pages[i].RoomID)) + '</span></td>';
                html += '<td width="20%"><span class="t-pink">' + util.ParseMoney(pages[i].TotalPrizeValue) + '</span></td>';
                html += '<td width="20%">Thắng lớn</td>';
                html += '</tr>';

            }
            $("#table_thead").html(htmlhead);
            $("#table_body").html(html);
            pageCount = Math.ceil(cacheDataHistory.length / rowperPage);
            $("#pager_history").pager({
                pagenumber: current,
                pagecount: pageCount,
                buttonClickCallback: bindingNotify
            });

        }




        function roomTypeJack(typeJack, number) {

            if (typeJack === 1)
                return number;
            if (typeJack === 2)
                return 'Supper Jackpot';
            return number + '%';

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

            if (roomId === 100 || roomId === 1000 || roomId === 5000 || roomId === 10000)
                return roomId;
            return 0;
        }

    };

    this.getCard = function(gameId) {

        var post = {
            'gameId': gameId
        };
        libs.PostData(jsConfig.urlRootProfile + 'Profile/GetSecurityCard',
            post,
            function(data) {
                console.log(data);
            },
            function(erro) {});
    };

    this.UnCard = function(gameId, otp) {

        var post = {
            'gameId': gameId,
            'otp': otp
        };
        libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusCardUnblock',
            post,
            function(data) {
                console.log(data);
            },
            function(erro) {});
    };
    this.blockCard = function(gameId) {

        var post = {
            'gameId': gameId
        };
        libs.PostData(jsConfig.urlRootProfile + 'Profile/SMSPlusCardblock',
            post,
            function(data) {
                console.log(data);
            },
            function(erro) {});
    };

    var tempeventX3;
    this.eventX3 = function() {
        if (typeof tempeventX3 === 'undefined')
            tempeventX3 = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/x3/eventX3.html?v=1");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempeventX3));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });
        $('.charge-tab-controllers .button ').click(function() {
            var index = parseInt($(this).attr('data-index'));
            $('.charge-tab-controllers .button ').removeClass('active');
            $(this).addClass('active');
            if (index === 0) {
                $('.bodyX3').show();
                $('.helpeventX3').hide();

                return;
            }
            if (index === 1) {
                $('.bodyX3').hide();
                $('.helpeventX3').show();
                return;
            }

        });

        $('.x3napthe .bt_napngay').click(function() {
            libprofile.chargewin();
        });
        $('.x3daily .bt_napngay').click(function() {
            libprofile.listAgent();
        });
        $('.x3momo .bt_napngay').click(function() {
            libprofile.chargemomo();
        });
        $('.x3vietpay .bt_napngay').click(function() {
            libprofile.chargeviettelPay();
        });

        $('.x3zalopay .bt_napngay').click(function() {
            libprofile.chargezaloPay();
        });

        $('.bodyX3').slimScroll({
            height: '630px'
        });
        geteventX3();


        var cacheDataEvent = null;

        function geteventX3() {
            var m = {};
            libs.GetData(jsConfig.urlRootEventX3 + '/api/EventX3/GetEvetX2X3',
                m,
                function(data) {
                    cacheDataEvent = data;
                    for (var i = 0; i < data.length; i++) {
                        var classParent = '';
                        if (data[i].TopupType === 1) {
                            classParent = '.x3napthe';
                        } else if (data[i].TopupType === 2) {
                            classParent = '.x3momo';
                        } else if (data[i].TopupType === 3) {
                            classParent = '.x3daily';
                        } else if (data[i].TopupType === 4) {
                            classParent = '.x3vietpay';
                        } else if (data[i].TopupType === 5) {
                            classParent = '.x3zalopay';
                        }

                        $(classParent).addClass('active');
                        $(classParent + ' .value1').html(util.ParseMoney(data[i].Amount));
                        $(classParent + ' .value2').html(util.ParseMoney(data[i].Amount * data[i].AwardRate));

                        var process = 581 * data[i].FinishRate / 100;
                        if (process > 0 && process < 25) {
                            process = 25;
                        }
                        $(classParent + ' .processCurrent').css('width', process + 'px');

                        if (data[i].IsFinish === 0) {
                            if (data[i].IsCancel) {
                                $(classParent + ' .stateText').html('Tiến trình đã hết thời gian');
                            } else {
                                $(classParent + ' .stateText').html('Thời gian nhận thưởng: ' + util.FormatDatetime(data[i].EndDate));
                            }

                        } else if (data[i].IsFinish === 1) {
                            $(classParent + ' .stateText').html('Vui lòng "Click" vào rương để nhận thưởng');
                            $(classParent + ' .stateRuongto').attr('eventId', data[i].TopupType);
                            $(classParent + ' .stateRuongto').click(function() {
                                $(this).unbind('click');
                                var topupType = parseInt($(this).attr('eventId'));
                                var ls = $.grep(cacheDataEvent, function(v) {
                                    return v.TopupType === topupType;
                                });

                                if (ls.length === 0)
                                    return;
                                var objData = ls[0];
                                var jsonData = {
                                    eventId: objData.EventID,
                                    topuptypet: topupType
                                };
                                var parent = $(this).parent();
                                libs.PostData(jsConfig.urlRootEventX3 + '/api/EventX3/EventX2X3_Award',
                                    jsonData,
                                    function(balanceCurrent) {
                                        parent.parent().find('.stateRuongto').addClass('active');

                                        parent.parent().find('.stateText').html('Bạn đã nhận thưởng:' + util.ParseMoney(objData.Amount * objData.AwardRate));
                                        parent.parent().find('.moneyX3').html('+' + util.ParseMoney(objData.Amount * objData.AwardRate));
                                        parent.parent().find('.moneyX3').animate({
                                                top: '0px',
                                                opacity: 0
                                            },
                                            5000,
                                            function() {

                                            });

                                        libAccount.UpdateBalance(2, balanceCurrent, 1);
                                    },
                                    function(err) {
                                        showMessage(err.responseText);
                                    });

                            });


                        } else if (data[i].IsFinish === 2) {
                            $(classParent + ' .stateText').html('Bạn đã nhận thưởng:' + util.ParseMoney(data[i].Amount * data[i].AwardRate));
                            $(classParent + ' .stateRuongto').addClass('active');

                        }



                    }
                },
                function(a) {});
        }

        var timeoutMessage;

        function showMessage(message) {
            $('.contentX3 .message').html(message);
            $('.contentX3 .message').show();
            clearTimeout(timeoutMessage);
            timeoutMessage = setTimeout(function() {
                $('.contentX3 .message').hide();
            }, 5000);
        }




    };


    var tempSukientet;
    this.sukientet = function() {
        if (typeof tempSukientet === 'undefined')
            tempSukientet = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/sukientet/sukientet.html?v=1");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(tempSukientet));

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));
        });

        $('.btduangay_event').unbind('click').click(function() {
            libs.ShowGame(2);
        });

        $('.btchitietSlot_event').unbind('click').click(function() {
            App.treasure.showJackpot(4);
        });

        $('.btchitietlixi_event').unbind('click').click(function() {
            libprofile.lixitet();
        });
    };

    var templixitet;
    this.lixitet = function() {
        if (typeof templixitet === 'undefined')
            templixitet = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/sukientet/lixi.html?v=1");
        $(".over_poup").show();
        $(".over_poup").html(jQuery.processTemplateToText(templixitet));

        $('.contentLixitet .notify_lixi .scroll_lixi').slimScroll({
            height: '311px'
        });

        $('.btn-close_popuplare').click(function() {
            libs.CloseAll($('.popup_lagre'));

        });
        var boxId = 0;
        var arrBox = [];
        var isAuto = false;
        $('.contentLixitet .content_qua li').unbind('click').click(function() {

            if (isAuto)
                return;
            boxId = parseInt($(this).attr('ref'));
            $(this).addClass('active');
            spinLixi();

        });

        $('.contentLixitet .help_lixi').unbind('click').click(function() {
            App.treasure.showJackpot(5);

        });

        $('.contentLixitet .btAuto_lixi').unbind('click').click(function() {
            boxId = randomLixi();
            isAuto = true;
            $('.contentLixitet .btAuto_lixi').addClass('disable');
            $('.contentLixitet .btAuto_lixi').removeClass('active');
            spinLixi();
        });

        getNotify();
        getAccountLixi();

        function getNotify() {

            var m = {};
            libs.GetData(jsConfig.urlRootIsLand + '/api/Lixitet2022/ListTopNotify', m,
                function(data) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {

                        html += '<li> <span class="nickLixi">' + data[i].NickName + ' </span> được lì xì <span class="dmotalixi"> ' + data[i].Description + '</span></li>';
                    }
                    $('.contentLixitet .notify_lixi ul').html(html);

                },
                function(a) {});
        }


        function getAccountLixi() {
            var m = {};
            libs.GetData2(jsConfig.urlRootIsLand + '/api/Lixitet2022/GetAccountLixi', m,
                function(data) {
                    console.log(data);
                    $('.contentLixitet .count_lixi').html(data.SpinCount);
                    if (data.SpinCount > 0) {
                        $('.contentLixitet .btAuto_lixi').addClass('active');
                        $('.contentLixitet .btAuto_lixi').removeClass('disable');
                    } else {
                        $('.contentLixitet .btAuto_lixi').addClass('disable');
                        $('.contentLixitet .btAuto_lixi').removeClass('active');
                    }
                    var process = data.ProcessBar * 155 / 100;
                    if (process < 10)
                        process = 6;
                    $('.contentLixitet .barprocess_lixi').css('width', process + 'px');
                },
                function(a) {});
        }

        function spinLixi() {
            var m = {};
            libs.PostData3(jsConfig.urlRootIsLand + '/api/Lixitet2022/Spin', m,
                function(data) {

                    arrBox.push(boxId);
                    console.log(data);
                    console.log(boxId);
                    $('.contentLixitet .content_qua li.quatet' + boxId + ' .flip-card').addClass('active');
                    $('.contentLixitet .content_qua li.quatet' + boxId + ' span').html(data.DecriptionItem);
                    $('.contentLixitet .content_qua li.quatet' + boxId + ' .flip-card-back').addClass('item' + data.Type);

                    if (data.Type == 4 || data.Type == 1 || data.Type == 2) {
                        libAccount.UpdateBalance(2, data.Balance, 1);
                    }

                    if (isAuto && data.SpinCount > 0) {
                        boxId = randomLixi();
                        spinLixi();

                    } else {
                        getAccountLixi();
                    }
                },
                function(a) {
                    showMessage(a.responseText);
                    $('.contentLixitet .content_qua li.quatet' + boxId).removeClass('active');
                });
        }
        var timeMessage;

        function showMessage(err) {
            $('.contentLixitet .erro_lixi').html(err);
            $('.contentLixitet .erro_lixi').show();
            clearTimeout(timeMessage);
            timeMessage = setTimeout(function() {
                $('.contentLixitet .erro_lixi').hide();
            }, 6000);


        }

        function randomLixi() {
            var rd = [];

            for (var i = 1; i < 10; i++) {
                var result = arrBox.filter(function(value) {
                    return (value == i);
                });
                if (result.length == 0) {
                    rd.push(i);
                }
            }
            return rd[Math.floor(Math.random() * rd.length)]

        }

    };
}();
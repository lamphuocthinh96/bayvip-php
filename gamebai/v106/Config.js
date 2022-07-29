var gameGlobal = gameGlobal || {};
gameGlobal.BOT_OTP = "https://telegram.me/Fan888OtpBot";
gameGlobal.SERVER_DOMAIN = 'https://' + window.location.hostname;

var tableValue = [{
    "id": 1,
    "star": null,
    "stone": null,
    "gameId": 11,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, 2000, 5000, 10000, 20000, 50000, -100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 2,
    "star": null,
    "stone": null,
    "gameId": 10,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [1000, -2000, 5000, 10000, -20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 3,
    "star": null,
    "stone": null,
    "gameId": 1,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, 50000, 100000, -200000, -500000],
    "stones": [1000, -2000, 5000, -10000, -20000, 50000, 100000, 200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 4,
    "star": null,
    "stone": null,
    "gameId": 3,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, -2000, 5000, 10000, 20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 5,
    "star": null,
    "stone": null,
    "gameId": 7,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [1000, 2000, 5000, 10000, -20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 6,
    "star": null,
    "stone": null,
    "gameId": 8,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [1000, 2000, -5000, 10000, -20000, -50000, -100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 7,
    "star": null,
    "stone": null,
    "gameId": 6,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, 2000, 5000, 10000, -20000, 50000, 100000, 200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 8,
    "star": null,
    "stone": null,
    "gameId": 9,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, -2000, 5000, 10000, 20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 9,
    "star": null,
    "stone": null,
    "gameId": 2,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, 2000, -5000, 10000, -20000, 50000, -100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 10,
    "star": null,
    "stone": null,
    "gameId": 5,
    "stars": [100, 1000],
    "stones": [5000, 50000, 500000]
}, {
    "id": 11,
    "star": null,
    "stone": null,
    "gameId": 4,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, -2000, 5000, 10000, 20000, -50000, 100000, 200000, -500000, -1000000, 2000000, -5000000]
}, {
    "id": 12,
    "star": null,
    "stone": null,
    "gameId": 14,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, 20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, 2000, 5000, -10000, -20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 13,
    "star": null,
    "stone": null,
    "gameId": 22,
    "stars": [1000, 10000, 50000],
    "stones": [10000, 100000, 500000]
}, {
    "id": 14,
    "star": null,
    "stone": null,
    "gameId": 26,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, -2000, 5000, 10000, 20000, 50000, 100000, -200000, -500000, -1000000, -2000000, -5000000]
}, {
    "id": 15,
    "star": null,
    "stone": null,
    "gameId": 27,
    "stars": [100, -200, 500, 1000, -2000, 5000, 10000, -20000, -50000, -100000, -200000, -500000],
    "stones": [-1000, 2000, 5000, 10000, -20000, 50000, 100000, 200000, -500000, -1000000, -2000000, -5000000]
}];
// var tableValue = [{"id":1,"star":null,"stone":null,"gameId":11,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,20000,50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":2,"star":null,"stone":null,"gameId":10,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,-2000,5000,10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":3,"star":null,"stone":null,"gameId":1,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,50000,100000,-200000,-500000],"stones":[1000,-2000,5000,-10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]},{"id":4,"star":null,"stone":null,"gameId":3,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":5,"star":null,"stone":null,"gameId":7,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,2000,5000,10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":6,"star":null,"stone":null,"gameId":8,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,2000,-5000,10000,-20000,-50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":7,"star":null,"stone":null,"gameId":6,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]},{"id":8,"star":null,"stone":null,"gameId":9,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":9,"star":null,"stone":null,"gameId":2,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,-5000,10000,-20000,50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":10,"star":null,"stone":null,"gameId":5,"stars":[100,1000],"stones":[5000,50000,500000]},{"id":11,"star":null,"stone":null,"gameId":4,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,-50000,100000,200000,-500000,-1000000,2000000,-5000000]},{"id":12,"star":null,"stone":null,"gameId":14,"stars":[100,-200,500,1000,-2000,5000,10000,20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,-10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":13,"star":null,"stone":null,"gameId":22,"stars":[1000,10000,50000],"stones":[10000,100000,500000]},{"id":14,"star":null,"stone":null,"gameId":26,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":15,"star":null,"stone":null,"gameId":27,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]}];
var gameApi = [{

        "id": 1,
        "game_id": 0,
        "name": "global",
        "domain": "" + window.location.hostname + "",
        "hubName": "",
        "hub": "",
        "ext": "{\"getLeaderBoard\":\"https://" + window.location.hostname + "/s1profile/api/Profile/getLeaderBoard\",\"SMSPlusCardUnblock\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusCardUnblock\",\"SMSPlusCardblock\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusCardblock\",\"GetSecurityCard\":\"https://" + window.location.hostname + "/s1profile/api/Profile/GetSecurityCard\",\"CheckAccountExisted\":\"https://" + window.location.hostname + "/s1profile/api/account/CheckAccountExisted\",\"getTransactionLogTopups\":\"https://" + window.location.hostname + "/s1profile/api/account/getTransactionLogTopups\",\"GetMessage\":\"https://" + window.location.hostname + "/app/notify.json\",\"ReceiveOTPLogin\":\"https://" + window.location.hostname + "/id/api/Account/ReceiveOTPLogin\",\"ReceiveOTPRestPass\":\"https://" + window.location.hostname + "/id/api/Account/ReceiveOTPRestPass\",\"ConfirmGiftcode\":\"https://" + window.location.hostname + "/s1profile/api/Giftcode/ConfirmGiftcode\",\"CreateGiftcode\":\"https://" + window.location.hostname + "/s1profile/api/Giftcode/CreateGiftcode\",\"getTransactionGiftcode\":\"https://" + window.location.hostname + "/s1profile/api/Giftcode/getTransactionGiftcode\",\"ReiceveOTP\":\"https://" + window.location.hostname + "/s1profile/api/Profile/ReiceveOTP\",\"GoogleConfig\":\"https://" + window.location.hostname + "/report/api/data/Report\",\"ListGameTopNotyfi\":\"https://" + window.location.hostname + "/jackpot/api/JackPot/ListGameTopNotyfi\",\"TopVippoint_GetAPI\":\"https://" + window.location.hostname + "/bum1/api/Vippoint/TopVippoint_GetAPI\",\"checkOTPByAccountID\":\"https://" + window.location.hostname + "/id/api/Authen/checkOTPByAccountID\",\"SMSPlusUpdateCardConfig\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusUpdateCardConfig\",\"GetSecurityCardInfo\":\"https://" + window.location.hostname + "/s1profile/api/Profile/GetSecurityCardInfo\",\"SMSPlusUpdateFreeze\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusUpdateFreeze\",\"GetFreezeInfo\":\"https://" + window.location.hostname + "/s1profile/api/Profile/GetFreezeInfo\",\"SMSPlusUpdateService\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusUpdateService\",\"SMSPlusCancelService\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusCancelService\",\"SMSPlusCreateService\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SMSPlusCreateService\",\"GetSMSInfo\":\"https://" + window.location.hostname + "/s1profile/api/Profile/GetSMSInfo\",\"ConfirmCancelMobile\":\"https://" + window.location.hostname + "/s1profile/api/Profile/ConfirmCancelMobile\",\"ChangeMobile\":\"https://" + window.location.hostname + "/s1profile/api/Profile/ChangeMobile\",\"BannerLobby\":\"_#https://" + window.location.hostname + "/app/banner1.png\",\"BannerLobbyFull\":\"\",\"EventCaptcha\":\"https://" + window.location.hostname + "/event/api/Captcha/Get\",\"GetallAgency\":\"https://" + window.location.hostname + "/s1profile/api/AllAgency/GetallAgency\",\"UpdateMobile\":\"https://" + window.location.hostname + "/s1profile/api/Profile/UpdateMobile\",\"UpdateEmail\":\"https://" + window.location.hostname + "/s1profile/api/Profile/UpdateEmail\",\"ConfirmMobile\":\"https://" + window.location.hostname + "/s1profile/api/Profile/ConfirmMobile\",\"SendMailConfirm\":\"https://" + window.location.hostname + "/s1profile/api/Profile/SendMailConfirm\",\"GetSecurityInfo\":\"https://" + window.location.hostname + "/s1profile/api/Profile/GetSecurityInfo\",\"UpdateProfile\":\"https://" + window.location.hostname + "/s1profile/api/Profile/UpdateProfile\",\"usingGifttCode\":\"https://" + window.location.hostname + "/s1profile/api/Giftcode/UsingGifttCode\",\"getTransactionLogs\":\"https://" + window.location.hostname + "/s1profile/api/account/getTransactionLogs\",\"getTransactionDetail\":\"https://" + window.location.hostname + "/s1profile/api/account/getTransactionDetail\",\"ChangePassword\":\"https://" + window.location.hostname + "/s1profile/api/account/ChangePassword\",\"ResetPassword\":\"https://" + window.location.hostname + "/id/api/Account/ConfirmResetPassword\",\"GetProfileCaptcha\":\"https://" + window.location.hostname + "/s1profile/api/Captcha/Get\",\"GetPortalCaptcha\":\"https://" + window.location.hostname + "/api/Captcha/Get\",\"GetCaptcha\":\"https://" + window.location.hostname + "/id/api/Captcha/Get\",\"loginGoogleMobile\":\"https://" + window.location.hostname + "/id/api/Authen/loginGoogleMobile\",\"loginFacebookMobile\":\"https://" + window.location.hostname + "/id/api/Authen/loginFacebookMobile\",\"ListGameJackPotInfo\":\"https://" + window.location.hostname + "/jackpot/api/JackPot/ListGameJackPotInfo\",\"UpdateNickName\":\"https://" + window.location.hostname + "/id/api/Account/UpdateNickName\",\"ConfirmBuyItem\":\"https://" + window.location.hostname + "/s1profile/api/Payment/ConfirmBuyItem\",\"BuyItem\":\"https://" + window.location.hostname + "/s1profile/api/Payment/BuyItem\",\"TranferAccountConfirm\":\"https://" + window.location.hostname + "/s1profile/api/Payment/TranferAccountConfirm\",\"TranferAccount\":\"https://" + window.location.hostname + "/s1profile/api/Payment/TranferAccount\",\"TransferGoldToCoin\":\"https://" + window.location.hostname + "/s1profile/api/Payment/TransferGoldToCoin\",\"GetProductLists\":\"https://" + window.location.hostname + "/s1profile/api/Payment/GetProductList\",\"GetPriceList\":\"https://" + window.location.hostname + "/s1profile/api/Payment/GetPriceList\",\"GetListTelco\":\"https://" + window.location.hostname + "/s1profile/api/Payment/GetListTelco\",\"IAP\":\"https://" + window.location.hostname + "/s1profile/api/Payment/iap\",\"Topup\":\"https://" + window.location.hostname + "/s1profile/api/Payment/Topup\",\"CLoginScene_quickRegister\":\"https://" + window.location.hostname + "/id/api/Authen/quickRegister\",\"GetUserProfile\":\"https://" + window.location.hostname + "/id/api/Authen/GetAccountInfo\",\"GetAccountInfo\":\"https://" + window.location.hostname + "/id/api/Authen/GetAccountInfo\",\"loginMobile\":\"https://" + window.location.hostname + "/id/api/Authen/loginMobile\",\"LMK\":\"d\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 24,
        "game_id": 24,
        "name": "event",
        "domain": "" + window.location.hostname + "",
        "hubName": "",
        "hub": "",
        "ext": "{}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 50,
        "game_id": 12,
        "name": "chat",
        "domain": "",
        "hubName": "chathub",
        "hub": "https://" + window.location.hostname + ":443/chat1/signalr/negotiate",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/chat1/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/chat1/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 56,
        "game_id": 15,
        "name": "tai xiu mini",
        "domain": "",
        "hubName": "miniGameTXHub",
        "hub": "https://" + window.location.hostname + ":443/tx/signalr",
        "ext": "{\"GetStatitics\":\"https://" + window.location.hostname + "/tx/api/luckydice/GetStatitics\",\"TaiXiu_GetAccountHistory\":\"https://" + window.location.hostname + "/tx/api/luckydice/GetAccountHistory\",\"TaiXiu_GetTopDailyWinners\":\"https://" + window.location.hostname + "/tx/api/luckydice/GetTopDailyWinners\",\"negotiate\":\"https://" + window.location.hostname + ":443/tx/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/tx/signalr/reconnect\",\"TaiXiu_GetSessionDetailsTX\":\"https://" + window.location.hostname + "/tx/api/luckydice/GetBetDetails/\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 95,
        "game_id": 25,
        "name": "hilo mini",
        "domain": "",
        "hubName": "hiloGameHub",
        "hub": "https://" + window.location.hostname + ":443/hilo/signalr",
        "ext": "{\"GetTopWinners\":\"https://" + window.location.hostname + "/hilo/api/HiLo/GetTopWinners\",\"GetAccountHistory\":\"https://" + window.location.hostname + "/hilo/api/HiLo/GetAccountHistory\",\"negotiate\":\"https://" + window.location.hostname + ":443/hilo/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/hilo/signalr/reconnect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 131,
        "game_id": 28,
        "name": "phuc sinh",
        "domain": "",
        "hubName": "minicandyHub",
        "hub": "https://" + window.location.hostname + ":443/slotgold/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/slotgold/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/slotgold/signalr/reconnect\",\"GetHistory\":\"https://" + window.location.hostname + "/slotgold/api/CandyApi/GetHistory/\",\"GetNotification\":\"https://" + window.location.hostname + "/slotgold/api/CandyApi/GetNotification/\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 132,
        "game_id": 29,
        "name": "gold mini",
        "domain": "",
        "hubName": "minigameGoldHub",
        "hub": "https://" + window.location.hostname + ":443/angrybirds/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/angrybirds/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/angrybirds/signalr/reconnect\",\"GetAccountHistory\":\"https://" + window.location.hostname + "/angrybirds/api/diggold/GetAccountHistory\",\"GetJackpottHistory\":\"https://" + window.location.hostname + "/angrybirds/api/diggold/GetJackpottHistory\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 59,
        "game_id": 16,
        "name": "poker mini",
        "domain": "" + window.location.hostname + "",
        "hubName": "miniGamePokerHub",
        "hub": "https://" + window.location.hostname + ":443/minipoker/signalr",
        "ext": "{\"MiniVideoPoker_GetAccountHistory\":\"https://" + window.location.hostname + "/minipoker/api/VideoPoker/GetAccountHistory\",\"MiniVideoPoker_GetTopWinners\":\"https://" + window.location.hostname + "/minipoker/api/VideoPoker/GetTopWinners\",\"negotiate\":\"https://" + window.location.hostname + ":443/minipoker/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/minipoker/signalr/reconnect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 118,
        "game_id": 118,
        "name": "vuong quoc",
        "domain": "" + window.location.hostname + "",
        "hubName": "gameHub",
        "hub": "https://" + window.location.hostname + "/kingdom/signalr",
        "ext": "{\"JackpotGetAll\":\"https://" + window.location.hostname + "/kingdom/api/game/JackpotGetAll\",\"GetBigWin\":\"https://" + window.location.hostname + "/kingdom/api/game/GetBigWin\",\"GetHistoryJack\":\"https://" + window.location.hostname + "/kingdom/api/game/GetHistoryJack/\",\"GetAccountHistory\":\"https://" + window.location.hostname + "/kingdom/api/game/GetAccountHistory\",\"negotiate\":\"https://" + window.location.hostname + ":443/kingdom/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/kingdom/signalr\",\"chat_negotiate\":\"https://" + window.location.hostname + "/chat/\",\"chat_ws\":\"chat_negotiate\"}",
        "type": 2,
        "maintain": false
    },
    {
        "id": 116,
        "game_id": 116,
        "name": "thuy cung",
        "domain": "" + window.location.hostname + "",
        "hubName": "gameHub",
        "hub": "https://" + window.location.hostname + "/ocean/signalr",
        "ext": "{\"JackpotGetAll\":\"https://" + window.location.hostname + "/ocean/api/game/JackpotGetAll\",\"GetBigWin\":\"https://" + window.location.hostname + "/ocean/api/game/GetBigWin\",\"GetHistoryJack\":\"https://" + window.location.hostname + "/ocean/api/game/GetHistoryJack/\",\"GetAccountHistory\":\"https://" + window.location.hostname + "/ocean/api/game/GetAccountHistory\",\"negotiate\":\"https://" + window.location.hostname + ":443/ocean/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/ocean/signalr\",\"chat_negotiate\":\"https://" + window.location.hostname + "/chat/\",\"chat_ws\":\"chat_negotiate\"}",
        "type": 2,
        "maintain": false
    },
    {
        "id": 1006,
        "game_id": 1006,
        "name": "Vong quay",
        "domain": "",
        "hubName": "",
        "hub": "",
        "ext": "{\"ApiUrl\":\"https://" + window.location.hostname + "/event/api/CircleSpin/\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 219,
        "game_id": 219,
        "name": "Sam truyen",
        "domain": "" + window.location.hostname + "",
        "hubName": "gamehub",
        "hub": "https://" + window.location.hostname + "/oracle/signalr",
        "ext": "{\"GetJackpot\":\"https://" + window.location.hostname + "/oracle/api/game/GetJackpot/\",\"LogSession_GetAPI\":\"https://" + window.location.hostname + "/oracle/api/game/LogSession_GetAPI/\",\"LogSpinAccount_GetAPI\":\"https://" + window.location.hostname + "/oracle/api/game/LogSpinAccount_GetAPI/\",\"LogAllSpin_GetAPI\":\"https://" + window.location.hostname + "/oracle/api/game/LogAllSpin_GetAPI/\",\"ListJack_GetAPI\":\"https://" + window.location.hostname + "/oracle/api/game/ListJack_GetAPI/\",\"negotiate\":\"https://" + window.location.hostname + ":443/oracle/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/oracle/signalr\"}",
        "type": 4,
        "maintain": false
    },
    {
        "id": 221,
        "game_id": 221,
        "name": "Dancing",
        "domain": "" + window.location.hostname + "",
        "hubName": "gamehub",
        "hub": "https://" + window.location.hostname + "/dancing/signalr",
        "ext": "{\"GetJackpot\":\"https://" + window.location.hostname + "/dancing/api/game/GetJackpot/\",\"LogSession_GetAPI\":\"https://" + window.location.hostname + "/dancing/api/game/LogSession_GetAPI/\",\"LogSpinAccount_GetAPI\":\"https://" + window.location.hostname + "/dancing/api/game/LogSpinAccount_GetAPI/\",\"LogAllSpin_GetAPI\":\"https://" + window.location.hostname + "/dancing/api/game/LogAllSpin_GetAPI/\",\"ListJack_GetAPI\":\"https://" + window.location.hostname + "/dancing/api/game/ListJack_GetAPI/\",\"negotiate\":\"https://" + window.location.hostname + ":443/dancing/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/dancing/signalr\"}",
        "type": 4,
        "maintain": false
    },
    {
        "id": 11,
        "game_id": 1,
        "name": "ba cay",
        "domain": "",
        "hubName": "bacayhub",
        "hub": "https://" + window.location.hostname + ":443/bacay/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/bacay/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/bacay/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 19,
        "game_id": 2,
        "name": "ta la",
        "domain": "" + window.location.hostname + "",
        "hubName": "talahub",
        "hub": "https://" + window.location.hostname + ":443/tala/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/tala/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/tala/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 22,
        "game_id": 3,
        "name": "tlmn dl",
        "domain": "" + window.location.hostname + "",
        "hubName": "tienlenhub",
        "hub": "https://" + window.location.hostname + ":443/tlmn_demla/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/tlmn_demla/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/tlmn_demla/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 120,
        "game_id": 26,
        "name": "tlmn dl solo",
        "domain": "" + window.location.hostname + "",
        "hubName": "tienlenhub",
        "hub": "https://" + window.location.hostname + ":443/tlmn-demla-solo/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/tlmn-demla-solo/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/tlmn-demla-solo/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 46,
        "game_id": 11,
        "name": "poker",
        "domain": "" + window.location.hostname + "",
        "hubName": "pokerhub",
        "hub": "https://" + window.location.hostname + ":443/poker/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/poker/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/poker/signalr/connect\",\"rate_chip\":20}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 43,
        "game_id": 10,
        "name": "xoc xoc",
        "domain": "" + window.location.hostname + "",
        "hubName": "sediehub",
        "hub": "https://" + window.location.hostname + ":443/xocdia/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/xocdia/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/xocdia/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 34,
        "game_id": 7,
        "name": "mau binh",
        "domain": "",
        "hubName": "maubinhhub",
        "hub": "https://" + window.location.hostname + ":443/maubinh/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/maubinh/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/maubinh/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 30,
        "game_id": 6,
        "name": "sam loc",
        "domain": "",
        "hubName": "samlochub",
        "hub": "https://" + window.location.hostname + ":443/samloc/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/samloc/signalr/negotiate\", \"ws_url\":\"wss://" + window.location.hostname + ":443/samloc/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 126,
        "game_id": 27,
        "name": "sam loc Solo",
        "domain": "" + window.location.hostname + "",
        "hubName": "samlochub",
        "hub": "https://" + window.location.hostname + ":443/samloc-solo/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/samloc-solo/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/samloc-solo/signalr/connect\"}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 37,
        "game_id": 8,
        "name": "xi to",
        "domain": "",
        "hubName": "studpokerhub",
        "hub": "https://" + window.location.hostname + ":443/xito/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/xito/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/xito/signalr/connect\",\"rate_chip\":10}",
        "type": 0,
        "maintain": false
    },
    {
        "id": 40,
        "game_id": 9,
        "name": "lieng",
        "domain": "",
        "hubName": "lienghub",
        "hub": "https://" + window.location.hostname + ":443/lieng/signalr",
        "ext": "{\"negotiate\":\"https://" + window.location.hostname + ":443/lieng/signalr/negotiate\",\"ws_url\":\"wss://" + window.location.hostname + ":443/lieng/signalr/connect\",\"rate_chip\":10}",
        "type": 0,
        "maintain": false
    }
];

// var gameGlobal = gameGlobal || {};
// gameGlobal.SERVER_DOMAIN = 'https://fanvip.win';
// var tableValue = [{"id":1,"star":null,"stone":null,"gameId":11,"stars":[100,-200,500,1000,-2000,5000,-10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,20000,50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":2,"star":null,"stone":null,"gameId":10,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,-2000,5000,10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":3,"star":null,"stone":null,"gameId":1,"stars":[100,-200,-500,1000,-2000,5000,10000,-20000,50000,100000,-200000,-500000],"stones":[1000,-2000,5000,-10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]},{"id":4,"star":null,"stone":null,"gameId":3,"stars":[-100,200,-500,1000,2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":5,"star":null,"stone":null,"gameId":7,"stars":[100,-200,500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,2000,5000,10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":6,"star":null,"stone":null,"gameId":8,"stars":[100,-200,500,1000,2000,-5000,-10000,-20000,-50000,-100000,-200000,-500000],"stones":[1000,2000,-5000,10000,-20000,-50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":7,"star":null,"stone":null,"gameId":6,"stars":[100,-200,500,1000,2000,5000,-10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]},{"id":8,"star":null,"stone":null,"gameId":9,"stars":[100,-200,500,1000,2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":9,"star":null,"stone":null,"gameId":2,"stars":[100,-200,-500,1000,-2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,-5000,10000,20000,50000,-100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":10,"star":null,"stone":null,"gameId":5,"stars":[100,1000],"stones":[5000,50000,500000]},{"id":11,"star":null,"stone":null,"gameId":4,"stars":[-100,200,-500,1000,-2000,5000,-10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,-50000,100000,200000,-500000,-1000000,2000000,-5000000]},{"id":12,"star":null,"stone":null,"gameId":14,"stars":[100,-200,500,1000,-2000,5000,10000,20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,-10000,-20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":13,"star":null,"stone":null,"gameId":22,"stars":[1000,10000,50000],"stones":[10000,100000,500000]},{"id":14,"star":null,"stone":null,"gameId":26,"stars":[-100,200,-500,1000,2000,5000,10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,-2000,5000,10000,20000,50000,100000,-200000,-500000,-1000000,-2000000,-5000000]},{"id":15,"star":null,"stone":null,"gameId":27,"stars":[100,-200,500,1000,2000,5000,-10000,-20000,-50000,-100000,-200000,-500000],"stones":[-1000,2000,5000,10000,-20000,50000,100000,200000,-500000,-1000000,-2000000,-5000000]}];
// var gameApi = [
//     {
//         "id": 1,
//         "game_id": 0,
//         "name": "global",
//         "domain": "fanvip.win",
//         "hubName": "",
//         "hub": "",
//         "ext": "{\"CheckAccountExisted\":\"https://fanvip.win/s1profile/api/account/CheckAccountExisted\",\"getTransactionLogTopups\":\"https://fanvip.win/s1profile/api/account/getTransactionLogTopups\",\"GetMessage\":\"https://fanvip.win/app/notify.json\",\"ReceiveOTPLogin\":\"https://fanvip.win/id/api/Account/ReceiveOTPLogin\",\"ReceiveOTPRestPass\":\"https://fanvip.win/id/api/Account/ReceiveOTPRestPass\",\"ConfirmGiftcode\":\"https://fanvip.win/s1profile/api/Giftcode/ConfirmGiftcode\",\"CreateGiftcode\":\"https://fanvip.win/s1profile/api/Giftcode/CreateGiftcode\",\"getTransactionGiftcode\":\"https://fanvip.win/s1profile/api/Giftcode/getTransactionGiftcode\",\"ReiceveOTP\":\"https://fanvip.win/s1profile/api/Profile/ReiceveOTP\",\"GoogleConfig\":\"https://fanvip.win/report/api/data/Report\",\"ListGameTopNotyfi\":\"https://fanvip.win/jackpot/api/JackPot/ListGameTopNotyfi\",\"TopVippoint_GetAPI\":\"https://fanvip.win/bum1/api/Vippoint/TopVippoint_GetAPI\",\"checkOTPByAccountID\":\"https://fanvip.win/id/api/Authen/checkOTPByAccountID\",\"SMSPlusUpdateCardConfig\":\"https://fanvip.win/s1profile/api/Profile/SMSPlusUpdateCardConfig\",\"GetSecurityCardInfo\":\"https://fanvip.win/s1profile/api/Profile/GetSecurityCardInfo\",\"SMSPlusUpdateFreeze\":\"https://fanvip.win/s1profile/api/Profile/SMSPlusUpdateFreeze\",\"GetFreezeInfo\":\"https://fanvip.win/s1profile/api/Profile/GetFreezeInfo\",\"SMSPlusUpdateService\":\"https://fanvip.win/s1profile/api/Profile/SMSPlusUpdateService\",\"SMSPlusCancelService\":\"https://fanvip.win/s1profile/api/Profile/SMSPlusCancelService\",\"SMSPlusCreateService\":\"https://fanvip.win/s1profile/api/Profile/SMSPlusCreateService\",\"GetSMSInfo\":\"https://fanvip.win/s1profile/api/Profile/GetSMSInfo\",\"ConfirmCancelMobile\":\"https://fanvip.win/s1profile/api/Profile/ConfirmCancelMobile\",\"ChangeMobile\":\"https://fanvip.win/s1profile/api/Profile/ChangeMobile\",\"BannerLobby\":\"_#https://fanvip.win/app/banner1.png\",\"BannerLobbyFull\":\"\",\"EventCaptcha\":\"https://fanvip.win/event/api/Captcha/Get\",\"GetallAgency\":\"https://fanvip.win/s1profile/api/AllAgency/GetallAgency\",\"UpdateMobile\":\"https://fanvip.win/s1profile/api/Profile/UpdateMobile\",\"UpdateEmail\":\"https://fanvip.win/s1profile/api/Profile/UpdateEmail\",\"ConfirmMobile\":\"https://fanvip.win/s1profile/api/Profile/ConfirmMobile\",\"SendMailConfirm\":\"https://fanvip.win/s1profile/api/Profile/SendMailConfirm\",\"GetSecurityInfo\":\"https://fanvip.win/s1profile/api/Profile/GetSecurityInfo\",\"UpdateProfile\":\"https://fanvip.win/s1profile/api/Profile/UpdateProfile\",\"usingGifttCode\":\"https://fanvip.win/s1profile/api/Giftcode/UsingGifttCode\",\"getTransactionLogs\":\"https://fanvip.win/s1profile/api/account/getTransactionLogs\",\"getTransactionDetail\":\"https://fanvip.win/s1profile/api/account/getTransactionDetail\",\"ChangePassword\":\"https://fanvip.win/s1profile/api/account/ChangePassword\",\"ResetPassword\":\"https://fanvip.win/id/api/Account/ConfirmResetPassword\",\"GetProfileCaptcha\":\"https://fanvip.win/s1profile/api/Captcha/Get\",\"GetPortalCaptcha\":\"https://fanvip.win/api/Captcha/Get\",\"GetCaptcha\":\"https://fanvip.win/id/api/Captcha/Get\",\"loginGoogleMobile\":\"https://fanvip.win/id/api/Authen/loginGoogleMobile\",\"loginFacebookMobile\":\"https://fanvip.win/id/api/Authen/loginFacebookMobile\",\"ListGameJackPotInfo\":\"https://fanvip.win/jackpot/api/JackPot/ListGameJackPotInfo\",\"UpdateNickName\":\"https://fanvip.win/id/api/Account/UpdateNickName\",\"ConfirmBuyItem\":\"https://fanvip.win/s1profile/api/Payment/ConfirmBuyItem\",\"BuyItem\":\"https://fanvip.win/s1profile/api/Payment/BuyItem\",\"TranferAccountConfirm\":\"https://fanvip.win/s1profile/api/Payment/TranferAccountConfirm\",\"TranferAccount\":\"https://fanvip.win/s1profile/api/Payment/TranferAccount\",\"TransferGoldToCoin\":\"https://fanvip.win/s1profile/api/Payment/TransferGoldToCoin\",\"GetProductLists\":\"https://fanvip.win/s1profile/api/Payment/GetProductList\",\"GetPriceList\":\"https://fanvip.win/s1profile/api/Payment/GetPriceList\",\"GetListTelco\":\"https://fanvip.win/s1profile/api/Payment/GetListTelco\",\"IAP\":\"https://fanvip.win/s1profile/api/Payment/iap\",\"Topup\":\"https://fanvip.win/s1profile/api/Payment/Topup\",\"CLoginScene_quickRegister\":\"https://fanvip.win/id/api/Authen/quickRegister\",\"GetUserProfile\":\"https://fanvip.win/id/api/Authen/GetAccountInfo\",\"GetAccountInfo\":\"https://fanvip.win/id/api/Authen/GetAccountInfo\",\"loginMobile\":\"https://fanvip.win/id/api/Authen/loginMobile\",\"LMK\":\"d\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 24,
//         "game_id": 24,
//         "name": "event",
//         "domain": "fanvip.win",
//         "hubName": "",
//         "hub": "",
//         "ext": "{}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 50,
//         "game_id": 12,
//         "name": "chat",
//         "domain": "",
//         "hubName": "chathub",
//         "hub": "https://fanvip.win:443/chat1/signalr/negotiate",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/chat1/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/chat1/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 56,
//         "game_id": 15,
//         "name": "tai xiu mini",
//         "domain": "",
//         "hubName": "miniGameTXHub",
//         "hub": "https://fanvip.win:443/tx/signalr",
//         "ext": "{\"GetStatitics\":\"https://fanvip.win/tx/api/luckydice/GetStatitics\",\"TaiXiu_GetAccountHistory\":\"https://fanvip.win/tx/api/luckydice/GetAccountHistory\",\"TaiXiu_GetTopDailyWinners\":\"https://fanvip.win/tx/api/luckydice/GetTopDailyWinners\",\"negotiate\":\"https://fanvip.win:443/tx/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/tx/signalr/reconnect\",\"TaiXiu_GetSessionDetailsTX\":\"https://fanvip.win/tx/api/luckydice/GetBetDetails/\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 95,
//         "game_id": 25,
//         "name": "hilo mini",
//         "domain": "",
//         "hubName": "hiloGameHub",
//         "hub": "https://fanvip.win:443/hilo/signalr",
//         "ext": "{\"GetTopWinners\":\"https://fanvip.win/hilo/api/HiLo/GetTopWinners\",\"GetAccountHistory\":\"https://fanvip.win/hilo/api/HiLo/GetAccountHistory\",\"negotiate\":\"https://fanvip.win:443/hilo/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/hilo/signalr/reconnect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 131,
//         "game_id": 28,
//         "name": "phuc sinh",
//         "domain": "",
//         "hubName": "minicandyHub",
//         "hub": "https://fanvip.win:443/slotgold/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/slotgold/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/slotgold/signalr/reconnect\",\"GetHistory\":\"https://fanvip.win/slotgold/api/CandyApi/GetHistory/\",\"GetNotification\":\"https://fanvip.win/slotgold/api/CandyApi/GetNotification/\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 132,
//         "game_id": 29,
//         "name": "gold mini",
//         "domain": "",
//         "hubName": "minigameGoldHub",
//         "hub": "https://fanvip.win:443/angrybirds/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/angrybirds/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/angrybirds/signalr/reconnect\",\"GetAccountHistory\":\"https://fanvip.win/angrybirds/api/diggold/GetAccountHistory\",\"GetJackpottHistory\":\"https://fanvip.win/angrybirds/api/diggold/GetJackpottHistory\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 59,
//         "game_id": 16,
//         "name": "poker mini",
//         "domain": "fanvip.win",
//         "hubName": "miniGamePokerHub",
//         "hub": "https://fanvip.win:443/minipoker/signalr",
//         "ext": "{\"MiniVideoPoker_GetAccountHistory\":\"https://fanvip.win/minipoker/api/VideoPoker/GetAccountHistory\",\"MiniVideoPoker_GetTopWinners\":\"https://fanvip.win/minipoker/api/VideoPoker/GetTopWinners\",\"negotiate\":\"https://fanvip.win:443/minipoker/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/minipoker/signalr/reconnect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 118,
//         "game_id": 118,
//         "name": "vuong quoc",
//         "domain": "fanvip.win",
//         "hubName": "gameHub",
//         "hub": "https://fanvip.win/kingdom/signalr",
//         "ext": "{\"JackpotGetAll\":\"https://fanvip.win/kingdom/api/game/JackpotGetAll\",\"GetBigWin\":\"https://fanvip.win/kingdom/api/game/GetBigWin\",\"GetHistoryJack\":\"https://fanvip.win/kingdom/api/game/GetHistoryJack/\",\"GetAccountHistory\":\"https://fanvip.win/kingdom/api/game/GetAccountHistory\",\"negotiate\":\"https://fanvip.win:443/kingdom/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/kingdom/signalr\",\"chat_negotiate\":\"https://fanvip.win/chat/\",\"chat_ws\":\"chat_negotiate\"}",
//         "type": 2,
//         "maintain": false
//     },
//     {
//         "id": 116,
//         "game_id": 116,
//         "name": "thuy cung",
//         "domain": "fanvip.win",
//         "hubName": "gameHub",
//         "hub": "https://fanvip.win/ocean/signalr",
//         "ext": "{\"JackpotGetAll\":\"https://fanvip.win/ocean/api/game/JackpotGetAll\",\"GetBigWin\":\"https://fanvip.win/ocean/api/game/GetBigWin\",\"GetHistoryJack\":\"https://fanvip.win/ocean/api/game/GetHistoryJack/\",\"GetAccountHistory\":\"https://fanvip.win/ocean/api/game/GetAccountHistory\",\"negotiate\":\"https://fanvip.win:443/ocean/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/ocean/signalr\",\"chat_negotiate\":\"https://fanvip.win/chat/\",\"chat_ws\":\"chat_negotiate\"}",
//         "type": 2,
//         "maintain": false
//     },
//     {
//         "id": 1006,
//         "game_id": 1006,
//         "name": "Vong quay",
//         "domain": "",
//         "hubName": "",
//         "hub": "",
//         "ext": "{\"ApiUrl\":\"https://fanvip.win/event/api/CircleSpin/\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 219,
//         "game_id": 219,
//         "name": "Sam truyen",
//         "domain": "fanvip.win",
//         "hubName": "gamehub",
//         "hub": "https://fanvip.win/oracle/signalr",
//         "ext": "{\"GetJackpot\":\"https://fanvip.win/oracle/api/game/GetJackpot/\",\"LogSession_GetAPI\":\"https://fanvip.win/oracle/api/game/LogSession_GetAPI/\",\"LogSpinAccount_GetAPI\":\"https://fanvip.win/oracle/api/game/LogSpinAccount_GetAPI/\",\"LogAllSpin_GetAPI\":\"https://fanvip.win/oracle/api/game/LogAllSpin_GetAPI/\",\"ListJack_GetAPI\":\"https://fanvip.win/oracle/api/game/ListJack_GetAPI/\",\"negotiate\":\"https://fanvip.win:443/oracle/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/oracle/signalr\"}",
//         "type": 4,
//         "maintain": false
//     },
//     {
//         "id": 221,
//         "game_id": 221,
//         "name": "Dancing",
//         "domain": "fanvip.win",
//         "hubName": "gamehub",
//         "hub": "https://fanvip.win/dancing/signalr",
//         "ext": "{\"GetJackpot\":\"https://fanvip.win/dancing/api/game/GetJackpot/\",\"LogSession_GetAPI\":\"https://fanvip.win/dancing/api/game/LogSession_GetAPI/\",\"LogSpinAccount_GetAPI\":\"https://fanvip.win/dancing/api/game/LogSpinAccount_GetAPI/\",\"LogAllSpin_GetAPI\":\"https://fanvip.win/dancing/api/game/LogAllSpin_GetAPI/\",\"ListJack_GetAPI\":\"https://fanvip.win/dancing/api/game/ListJack_GetAPI/\",\"negotiate\":\"https://fanvip.win:443/dancing/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/dancing/signalr\"}",
//         "type": 4,
//         "maintain": false
//     },
//     {
//         "id": 11,
//         "game_id": 1,
//         "name": "ba cay",
//         "domain": "",
//         "hubName": "bacayhub",
//         "hub": "https://fanvip.win:443/bacay/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/bacay/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/bacay/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 19,
//         "game_id": 2,
//         "name": "ta la",
//         "domain": "fanvip.win",
//         "hubName": "talahub",
//         "hub": "https://fanvip.win:443/tala/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/tala/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/tala/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 22,
//         "game_id": 3,
//         "name": "tlmn dl",
//         "domain": "fanvip.win",
//         "hubName": "tienlenhub",
//         "hub": "https://fanvip.win:443/tlmn_demla/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/tlmn_demla/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/tlmn_demla/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 120,
//         "game_id": 26,
//         "name": "tlmn dl solo",
//         "domain": "fanvip.win",
//         "hubName": "tienlenhub",
//         "hub": "https://fanvip.win:443/tlmn-demla-solo/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/tlmn-demla-solo/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/tlmn-demla-solo/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 46,
//         "game_id": 11,
//         "name": "poker",
//         "domain": "fanvip.win",
//         "hubName": "pokerhub",
//         "hub": "https://fanvip.win:443/poker/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/poker/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/poker/signalr/connect\",\"rate_chip\":20}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 43,
//         "game_id": 10,
//         "name": "xoc xoc",
//         "domain": "fanvip.win",
//         "hubName": "sediehub",
//         "hub": "https://fanvip.win:443/xocdia/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/xocdia/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/xocdia/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 34,
//         "game_id": 7,
//         "name": "mau binh",
//         "domain": "",
//         "hubName": "maubinhhub",
//         "hub": "https://fanvip.win:443/maubinh/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/maubinh/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/maubinh/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 30,
//         "game_id": 6,
//         "name": "sam loc",
//         "domain": "",
//         "hubName": "samlochub",
//         "hub": "https://fanvip.win:443/samloc/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/samloc/signalr/negotiate\", \"ws_url\":\"wss://fanvip.win:443/samloc/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 126,
//         "game_id": 27,
//         "name": "sam loc Solo",
//         "domain": "fanvip.win",
//         "hubName": "samlochub",
//         "hub": "https://fanvip.win:443/samloc-solo/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/samloc-solo/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/samloc-solo/signalr/connect\"}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 37,
//         "game_id": 8,
//         "name": "xi to",
//         "domain": "",
//         "hubName": "studpokerhub",
//         "hub": "https://fanvip.win:443/xito/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/xito/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/xito/signalr/connect\",\"rate_chip\":10}",
//         "type": 0,
//         "maintain": false
//     },
//     {
//         "id": 40,
//         "game_id": 9,
//         "name": "lieng",
//         "domain": "",
//         "hubName": "lienghub",
//         "hub": "https://fanvip.win:443/lieng/signalr",
//         "ext": "{\"negotiate\":\"https://fanvip.win:443/lieng/signalr/negotiate\",\"ws_url\":\"wss://fanvip.win:443/lieng/signalr/connect\",\"rate_chip\":10}",
//         "type": 0,
//         "maintain": false
//     }
// ];
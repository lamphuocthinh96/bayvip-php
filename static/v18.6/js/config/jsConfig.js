var version = '?v=1.123452';
console.info = console.log = console.warn = console.error = function() {};
var jsConfig = new function() {
    this.isTest = false;
    this.hostConfig = {


    };
    this.originDomain = '//' + window.location.hostname;
    this.urlRootPortal = '//' + window.location.hostname + '/static/';
    this.urlRootMedia = '//' + window.location.hostname + '/static/';
    this.urlRootStatic = '//' + window.location.hostname + '/static/v18.6/';

    this.urlRoot = '//' + window.location.hostname;
    this.urlRootAccountApi = '//' + window.location.hostname + '/id/api/';
    this.logoutReload = true;
    this.urlRootProfile = '//' + window.location.hostname + '/s1profile/api/';

    this.urlRootDailyevent = '//' + window.location.hostname + '/dailyevent/';



    this.urlRootEventX3 = '//' + window.location.hostname + '/island/';
    this.urlRootInbox = '//' + window.location.hostname + '/event/api/';
    this.urlRootJackpot = '//' + window.location.hostname + '/s1jackpot/';
    this.urlRootVQMM = '//' + window.location.hostname + '/event/api/';
    this.urlRootIsLand = '//' + window.location.hostname + '/island/';
    this.CHAT_SERVER_URL = '//' + window.location.hostname + '/chat1/';
    this.CARD_GAME = '//' + window.location.hostname + '/gamebai/';




    this.TimeGetEXPAuto = 1 * 60 * 1000;
    this.TimeGetUnreadInbox = 1 * 60 * 1000;
    this.TimeGetTimeBonus = 10 * 60 * 1000;
    this.TimeGetJackpot = 5 * 1000;
    this.TimeGetEventData = 2 * 60 * 1000;

    this.HostNamePort1 = 'bayvip.fun';
    this.HostNamePort22 = 'bay247.vip'
    this.HostNamePort2 = 'bay247.fun';
    this.HostNamePort3 = 'loc79.fun';



    this.urlDownloadAPP = 'https://download.' + window.location.hostname + '/download.htm';



    this.connectFish = {
        hubUrl: ['//' + window.location.hostname + '/fish/v2/'],
        root: '//' + window.location.hostname + '/fish/v2/'
    };
    this.connectFruit = {
        hubUrl: ['//' + window.location.hostname + '/fruit/'],
        root: '//' + window.location.hostname + '/fruit/'
    };
    this.connectKong = {
        hubUrl: ['//' + window.location.hostname + '/kong/'],
        root: '//' + window.location.hostname + '/kong/'
    };
    this.connectGold = {
        hubUrl: ['//' + window.location.hostname + '/gold/'],
        root: '//' + window.location.hostname + '/gold/'
    };
    this.connectMermaid = {
        hubUrl: ['//' + window.location.hostname + '/mermaid/'],
        root: '//' + window.location.hostname + '/mermaid/'
    };


    this.connectMinipoker = {
        hubUrl: ['//' + window.location.hostname + '/videopoker/'],
        API: '//' + window.location.hostname + '/videopoker/api/VideoPoker/'
    };
    this.connectLucky = {
        hubUrl: ['//' + window.location.hostname + '/tx/'],
        API: '//' + window.location.hostname + '/tx/api/luckydice/'
    };

    this.connectXocdia = {
        hubUrl: ['//' + window.location.hostname + '/xocxoc/'],
        API: '//' + window.location.hostname + '/xocxoc/api/XocXoc/'
    };
    this.connectDragon = {
        hubUrl: ['//' + window.location.hostname + '/rongho/'],
        API: '//' + window.location.hostname + '/rongho/api/dragon/'
    };


    this.connectCandy = {
        hubUrl: ['//' + window.location.hostname + '/candy/'],
        API: '//' + window.location.hostname + '/candy/api/CandyApi/'
    };
    this.connectHilo = {
        hubUrl: ['//' + window.location.hostname + '/hilo/'],
        API: '//' + window.location.hostname + '/hilo/api/HiLo/'
    };
    this.connectMonster = {
        hubUrl: ['//' + window.location.hostname + '/monster/'],
        API: '//' + window.location.hostname + '/monster/api/Diggold/'
    };
    this.connectKubo = {
        hubUrl: ['//' + window.location.hostname + '/kubo/'],
        API: '//' + window.location.hostname + '/kubo/api/CandyApi/'
    };

    this.connectNotify = {
        hubUrl: ['//' + window.location.hostname + '/notification/'],
        API: '//' + window.location.hostname + '/notification/api/'
    };

    this.connectXoso = {
        hubUrl: ['//' + window.location.hostname + '/xoso/'],
        API: '//' + window.location.hostname + '/xoso/api/Lottery/'
    };








    this.totalBetConfig = {
        BigWin: 10,
        SuperWin: 50,
        MegaWin: 100
    };
    this.FBApp = typeof getParameterByName === 'function' ? getParameterByName('FBApp') : false;
    this.loadCommon = {
        'cards_ct': this.urlRootStatic + 'assets/cards_ct.json',
        'cards_ct_blur': this.urlRootStatic + 'assets/cards_ct_blur.json',
        'mini_nohu': this.urlRootStatic + 'assets/mini_nohu.json',
        'fire_jack.png': this.urlRootStatic + 'assets/fire_jack.png.json',
        'vq_jack': this.urlRootStatic + 'assets/vq_jack.json',

        'fontXjact': this.urlRootStatic + 'assets/fontXjact.xml',
        'Bangketqua': this.urlRootStatic + 'assets/Bangketqua.json',
        'fontCandy': this.urlRootStatic + 'assets/fontCandy-export.xml',
        'candy_asset': this.urlRootStatic + 'assets/candy_asset.json',

        'icon_jackpot': this.urlRootStatic + 'assets/jackpot/icon_jackpot.json',
        'Icon-MiniGame': this.urlRootStatic + 'assets/Icon-MiniGame.json',
        'icon_x3': this.urlRootStatic + 'assets/jackpot/icon_x3.json',
        'icon_eventchuadao': this.urlRootStatic + 'assets/jackpot/event_chuadao.json',
        'animZalo': this.urlRootStatic + 'assets/jackpot/zalopay.json',
        'kubo_item': this.urlRootStatic + 'assets/kubo_item.json',

        'candy_item': this.urlRootStatic + 'assets/candy_item.json',
        'candy_item_blur': this.urlRootStatic + 'assets/candy_item_blur.json',

        'minipoker_asset': this.urlRootStatic + 'assets/minipoker_asset.json',


        'monster_asset': this.urlRootStatic + 'assets/monster_asset.json',

        'monster_item': this.urlRootStatic + 'assets/monster_item.json',
        'monster_item_blur': this.urlRootStatic + 'assets/monster_item_blur.json',
        'monster_cao': this.urlRootStatic + 'assets/monster_cao.json',


        'taixiu_asset': this.urlRootStatic + 'assets/taixiu_asset.json',
        'dices': this.urlRootStatic + 'assets/dices.json',
        'dices_result': this.urlRootStatic + 'assets/dices_result.json',
        'dice_num': this.urlRootStatic + 'assets/dice_num.json',
        'sukien_taixiu': this.urlRootStatic + 'assets/sukien_taixiu.json',

        'xocdia_asset': this.urlRootStatic + 'assets/xocdia_asset.json',
        'xocxoc_Bat': this.urlRootStatic + 'assets/xocxoc_Bat.json',
        'title_xocxoc': this.urlRootStatic + 'assets/title_xocxoc.json',

        'dragon_asset': this.urlRootStatic + 'assets/dragon_asset.json',
        'title_rongho': this.urlRootStatic + 'assets/title_rongho.json',

        'mapEvent1': this.urlRootStatic + 'minigame/images/chuadao/map1.json',
        'mapEvent2': this.urlRootStatic + 'minigame/images/chuadao/map2.json',
        'mapEvent3': this.urlRootStatic + 'minigame/images/chuadao/map3.json',
        'mapEvent4': this.urlRootStatic + 'minigame/images/chuadao/map4.json',
        'cuopbienEvent': this.urlRootStatic + 'minigame/images/chuadao/cuopbien.json',
        'mapLogo': this.urlRootStatic + 'minigame/images/chuadao/chuadao.json',
        'mapisland_asset': this.urlRootStatic + 'minigame/images/chuadao/map_asset.json',
        'girlisland': this.urlRootStatic + 'minigame/images/chuadao/girl.json',
        'itemisland': this.urlRootStatic + 'minigame/images/chuadao/items.json',
        'asset_vqmm': this.urlRootStatic + 'assets/asset_vqmm.json'


    };










    this.urlFacebook = {
        facebook1: 'https://checkinfb88.com/',
        facebook2: 'https://checkinfb66.com/',
        facebook3: 'https://checkinfb88.com/'
    };
    this.EventChuadao = {
        week1: '',
        week2: '',
        week3: '',
        week4: ''
    };

    var timeoutHostConfig;
    this.GetRegion = function() {
        if (window.location.hostname === jsConfig.HostNamePort1) {
            return 0;
        }
        if (window.location.hostname === jsConfig.HostNamePort2 || window.location.hostname === jsConfig.HostNamePort22) {
            return 1;
        }
        if (window.location.hostname === jsConfig.HostNamePort3) {
            return 3;
        }
        return 0;
    };
    this.GetHostConfig = function(callback) {
        clearTimeout(timeoutHostConfig);
        var regionId = jsConfig.GetRegion();
        libs.GetData2(jsConfig.connectNotify.API + 'Config/GetHostConfig?&port=' + regionId, {}, function(data) {
            jsConfig.hostConfig = data;
            console.log(jsConfig.hostConfig);
            if (callback !== undefined) {
                callback();
            }

            jsConfig.loadBanner();
            jsConfig.loadIsLands();
            timeoutHostConfig = setTimeout(jsConfig.GetHostConfig, 18000000);

        }, function(err) {

            jsConfig.hostConfig = {
                InfoIsLands: {},
                bannerPort: {},
                linkPort: {}
            };
            jsConfig.loadBanner(null);
            timeoutHostConfig = setTimeout(jsConfig.GetHostConfig, 5000);
        });
    };
    this.loadBanner = function() {
        var data = jsConfig.hostConfig;
        if (App === undefined || App.MainGame !== true)
            return;
        $('.banners').remove();
        $('#wrapper').append('<div class="banners"></div>');
        if (data === null || data === undefined || data.bannerPort === undefined || data.bannerPort.length === 0) {
            if ($('.banners').length > 0) {
                $('.banners').html('<a href="javascript:;"><img src="' + jsConfig.urlRootStatic + '/banner/default.png" alt="" /></a>');
                $('.banners').slick({
                    dots: false,
                    slidesToShow: 1,
                    arrows: false,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 8000,
                    fade: false
                });
            }
            return;
        }
        var html = '';
        for (var i = 0; i < data.bannerPort.length; i++) {
            if (data.bannerPort[i].Type === 0) {
                var link = 'javascript:;';
                if (data.bannerPort[i].Link.length > 0) {
                    link = data.bannerPort[i].Link;
                }
                html += '<a href="' + link + '"><img src="' + data.UrlStatic + '' + data.bannerPort[i].FileName + '" alt="" /></a>';
            }
        }

        if ($('.banners').length > 0) {
            $('.banners').html(html);
            $('.banners').slick({
                dots: false,
                slidesToShow: 1,
                arrows: false,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                fade: false
            });
        }
    };

    this.loadIsLands = function() {
        var data = jsConfig.hostConfig;

        if (data === null || data === undefined || data.InfoIsLands === undefined || data.InfoIsLands.WeekIsLands.length === 0) {
            return;
        }
        try {

            jsConfig.EventChuadao.EventID = data.InfoIsLands.EventID;
            for (var i = 0; i < data.InfoIsLands.WeekIsLands.length; i++) {

                if (data.InfoIsLands.WeekIsLands[i].WeekID === 1) {

                    jsConfig.EventChuadao.week1 = util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].FromDate) +
                        '-' +
                        util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].ToDate);
                }
                if (data.InfoIsLands.WeekIsLands[i].WeekID === 2) {

                    jsConfig.EventChuadao.week2 = util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].FromDate) +
                        '-' +
                        util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].ToDate);
                }

                if (data.InfoIsLands.WeekIsLands[i].WeekID === 3) {

                    jsConfig.EventChuadao.week3 = util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].FromDate) +
                        '-' +
                        util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].ToDate);
                }
                if (data.InfoIsLands.WeekIsLands[i].WeekID === 4) {

                    jsConfig.EventChuadao.week4 = util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].FromDate) +
                        '-' +
                        util.FormatMonthDay(data.InfoIsLands.WeekIsLands[i].ToDate);
                }



            }


        } catch (e) {
            console.log(e);
        }


    };



}();
loadFileAll();

function loadFileAll() {
    util.AddReFerence(jsConfig.urlRootStatic + "js/common/resizeWindows.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/modules/treasure.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/modules/cardgame.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/common/commongame.js" + version, 'js');


    util.AddReFerence(jsConfig.urlRootStatic + "js/luckydice/commonLuckyDice.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/luckydice/txHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/luckydice/games.js" + version, 'js');


    util.AddReFerence(jsConfig.urlRootStatic + "js/xocdia/commonXocdia.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/xocdia/xdHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/xocdia/games.js" + version, 'js');

    util.AddReFerence(jsConfig.urlRootStatic + "js/dragon/commonDragon.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/dragon/drHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/dragon/games.js" + version, 'js');



    util.AddReFerence(jsConfig.urlRootStatic + "js/HiLo/HiLo.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/HiLo/hiloHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/HiLo/gamehilo.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/videopoker/commonMinipoker.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/videopoker/pokerHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/videopoker/gamepoker.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/videopoker/gamecolum.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/candy/candyHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/candy/commonCandy.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/candy/gamecandy.js" + version, 'js');

    util.AddReFerence(jsConfig.urlRootStatic + "js/kubo/kuboHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/kubo/commonKubo.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/kubo/gameKubo.js" + version, 'js');



    util.AddReFerence(jsConfig.urlRootStatic + "js/monster/commonMonster.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/monster/GameHub.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/monster/gamemonster.js" + version, 'js');

    util.AddReFerence(jsConfig.urlRootStatic + "js/xoso/commonXoso.js" + version, 'js');





    util.AddReFerence(jsConfig.urlRootStatic + "js/vq/vqxhu.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/vqmm/vqmm.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/chuadao/mapEvent.js" + version, 'js');
    util.AddReFerence(jsConfig.urlRootStatic + "js/chuadao/vqisLand.js" + version, 'js');


    util.AddReFerence(jsConfig.urlRootStatic + "css/popup.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "css/jackpot.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/Minigame.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/taixiu.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/xocdia.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/dragon.css" + version, 'css');





    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/xoso.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/HiLo.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/minipoker.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/candy.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/kubo.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/monster.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/vqxhu.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/vqmm.css" + version, 'css');
    util.AddReFerence(jsConfig.urlRootStatic + "minigame/css/map.css" + version, 'css');
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.href);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
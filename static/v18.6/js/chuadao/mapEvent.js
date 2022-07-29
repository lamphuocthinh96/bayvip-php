window.MAPEVENT = window.MAPEVENT || {};
var tempMap;

window.MAPEVENT.Game = function() {};
window.MAPEVENT.Game.prototype = {
    game: null,
    stage: null,
    renderer: null,
    mask: null,
    create: function() {
        this.initMap();
    },
    initMap: function() {
        var that = this;
        this.game = new PIXI.Application(1920, 1000, {
            antialias: false,
            transparent: true,
            resolution: 1
        });
        if (typeof tempMap === 'undefined')
            tempMap = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/chuadao/island.html" + version);
        $(".over_poup").show();
        $(".over_poup").append(jQuery.processTemplateToText(tempMap));
        $(".gameMapEvent").append(this.game.view);
        this.mainContainer = new Container();
        this.game.stage.addChild(this.mainContainer);
        that.serconMap = 0;
        that.serconMapStart = 0;


        that.MapID = 1;
        that.ConfigUserMap = [{
                Level: 1,
                Point: [{
                    left: 110,
                    top: 430
                }, {
                    left: 118,
                    top: 380
                }, {
                    left: 159,
                    top: 324
                }]
            },
            {
                Level: 2,
                Point: [{
                    left: 300,
                    top: 220
                }, {
                    left: 419,
                    top: 217
                }, {
                    left: 529,
                    top: 204
                }]
            },
            {
                Level: 3,
                Point: [{
                    left: 711,
                    top: 221
                }, {
                    left: 813,
                    top: 331
                }, {
                    left: 713,
                    top: 411
                }]
            },
            {
                Level: 4,
                Point: [{
                    left: 553,
                    top: 491
                }, {
                    left: 423,
                    top: 601
                }, {
                    left: 573,
                    top: 681
                }]
            },
            {
                Level: 5,
                Point: [{
                    left: 793,
                    top: 645
                }, {
                    left: 923,
                    top: 595
                }, {
                    left: 963,
                    top: 545
                }]
            },
            {
                Level: 6,
                Point: [{
                    left: 1003,
                    top: 403
                }, {
                    left: 1043,
                    top: 313
                }, {
                    left: 1113,
                    top: 273
                }]
            },
            {
                Level: 7,
                Point: [{
                    left: 1273,
                    top: 253
                }, {
                    left: 1433,
                    top: 353
                }, {
                    left: 1393,
                    top: 463
                }]
            },
            {
                Level: 8,
                Point: [{
                    left: 1263,
                    top: 593
                }, {
                    left: 1413,
                    top: 683
                }, {
                    left: 1523,
                    top: 653
                }]
            },
            {
                Level: 9,
                Point: [{
                    left: 1643,
                    top: 533
                }, {
                    left: 103,
                    top: 433
                }, {
                    left: 253,
                    top: 223
                }]
            },
            {
                Level: 10,
                Point: [{
                    left: 350,
                    top: 163
                }, {
                    left: 420,
                    top: 325
                }, {
                    left: 320,
                    top: 445
                }]
            },
            {
                Level: 11,
                Point: [{
                    left: 470,
                    top: 555
                }, {
                    left: 630,
                    top: 415
                }, {
                    left: 690,
                    top: 295
                }]
            },
            {
                Level: 12,
                Point: [{
                    left: 860,
                    top: 225
                }, {
                    left: 1040,
                    top: 205
                }, {
                    left: 930,
                    top: 395
                }]
            },
            {
                Level: 13,
                Point: [{
                    left: 1120,
                    top: 535
                }, {
                    left: 1310,
                    top: 485
                }, {
                    left: 1360,
                    top: 379
                }]
            },
            {
                Level: 14,
                Point: [{
                    left: 1370,
                    top: 239
                }, {
                    left: 1554,
                    top: 289
                }, {
                    left: 1634,
                    top: 439
                }]
            },
            {
                Level: 15,
                Point: [{
                    left: 1564,
                    top: 549
                }, {
                    left: -0,
                    top: 278
                }, {
                    left: 201,
                    top: 368
                }]
            },
            {
                Level: 16,
                Point: [{
                    left: 304,
                    top: 499
                }, {
                    left: 454,
                    top: 449
                }, {
                    left: 564,
                    top: 369
                }]
            },
            {
                Level: 17,
                Point: [{
                    left: 574,
                    top: 229
                }, {
                    left: 874,
                    top: 219
                }, {
                    left: 884,
                    top: 339
                }]
            },
            {
                Level: 18,
                Point: [{
                    left: 834,
                    top: 489
                }, {
                    left: 1051,
                    top: 502
                }, {
                    left: 1103,
                    top: 322
                }]
            },
            {
                Level: 19,
                Point: [{
                    left: 1243,
                    top: 222
                }, {
                    left: 1423,
                    top: 212
                }, {
                    top: 312,
                    left: 1513
                }]
            },
            {
                Level: 20,
                Point: [{
                    left: 1513,
                    top: 522
                }, {
                    left: 0,
                    top: 522
                }, {
                    left: 80,
                    top: 433
                }]
            },
            {
                Level: 21,
                Point: [{
                    left: 144,
                    top: 339
                }, {
                    left: 384,
                    top: 309
                }, {
                    left: 424,
                    top: 439
                }]
            },
            {
                Level: 22,
                Point: [{
                    left: 344,
                    top: 619
                }, {
                    left: 524,
                    top: 649
                }, {
                    left: 754,
                    top: 539
                }]
            },
            {
                Level: 23,
                Point: [{
                    left: 764,
                    top: 309
                }, {
                    left: 994,
                    top: 309
                }, {
                    left: 1124,
                    top: 439
                }]
            },
            {
                Level: 24,
                Point: [{
                    left: 1004,
                    top: 649
                }, {
                    left: 1174,
                    top: 759
                }, {
                    left: 1334,
                    top: 719
                }]
            },
            {
                Level: 25,
                Point: [{
                    left: 1534,
                    top: 569
                }, {
                    left: 1534,
                    top: 569
                }, {
                    left: 1534,
                    top: 569
                }]
            }

        ];

        that.initAssets();
        $('.gameMapEvent .bird').click(function() {
            if ($('.gameMapEvent .notify').hasClass('active')) {

                $('.gameMapEvent .notify').removeClass('active');
            } else {
                $('.gameMapEvent .notify').addClass('active');
            }
        });
        that.getMapTopNotify();
        that.intervalMapRemain = setInterval(function() {
            that.serconMap += -1;
            that.serconMapStart += -1;
            that.secondsTohhmmss(that.serconMap);
            convertTime(that.serconMapStart);

        }, 1000);

        $('.gameMapEvent .mapbtnClose').unbind('click').click(function() {
            libs.CloseAll($('.gameMapEvent .mapbtnClose').parent());
            clearInterval(that.intervalMapRemain);
            clearTimeout(that.timoutTopRank);
            that.deleteGame();
            that.deleteTweens();

        });

        $('.gameMapEvent .mapbtnrank').unbind('click').click(function() {
            libprofile.mapevent(0);
        });

        $('.gameMapEvent .mapbtnhitory').unbind('click').click(function() {
            libprofile.mapevent(1);
        });

        $('.gameMapEvent .mapbtnhelp').unbind('click').click(function() {
            libprofile.mapevent(2);
        });

        function convertTime(totalSeconds) {
            var hours = Math.floor((totalSeconds) / 3600);
            var minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
            var seconds = ((totalSeconds % 86400) % 3600) % 60;

            // round seconds
            seconds = Math.round(seconds * 100) / 100;


            var hh = (hours > 10 ? hours : "0" + hours);
            var mm = (minutes < 10 ? "0" + minutes : minutes);
            var ss = (seconds < 10 ? "0" + seconds : seconds);
            if (totalSeconds > 0) {
                $('.isLandtimebg').show();
                $('.isLandtimebg .txtTimeCount').html(hh + ':' + mm + ':' + ss);
            } else {
                $('.isLandtimebg').hide();
            }


        }
    },
    initAssets: function() {
        var that = this;
        var map1 = new PIXI.spine.Spine(resources['mapEvent1'].spineData);
        map1.x = 940;
        map1.y = 583;
        map1.scale.set(0.96);
        map1.state.setAnimation(0, 'animation', true);
        map1.state.timeScale = 0.3;
        map1.visible = false;

        var map2 = new PIXI.spine.Spine(resources['mapEvent2'].spineData);
        map2.x = 914;
        map2.y = 365;
        map2.scale.set(0.96);
        map2.state.setAnimation(0, 'animation', true);
        map2.state.timeScale = 0.3;
        map2.visible = false;


        var map3 = new PIXI.spine.Spine(resources['mapEvent3'].spineData);
        map3.x = 894;
        map3.y = 386;
        map3.scale.set(0.96);
        map3.state.setAnimation(0, 'animation', true);
        map3.state.timeScale = 0.3;
        map3.visible = false;

        var map4 = new PIXI.spine.Spine(resources['mapEvent4'].spineData);
        map4.x = 817;
        map4.y = 471;
        map4.scale.set(0.96);
        map4.state.setAnimation(0, 'animation', true);
        map4.state.timeScale = 0.3;
        map4.visible = false;


        var spine2 = new PIXI.spine.Spine(resources['cuopbienEvent'].spineData);
        spine2.x = 0;
        spine2.y = 75;
        spine2.scale.set(0.96);
        spine2.state.setAnimation(0, 'animation', true);
        spine2.state.timeScale = 0.5;

        var bgCuopbien = new Sprite(TextureCache["map_slotbg.png"]);
        bgCuopbien.anchor.set(0.5);
        bgCuopbien.scale.set(1);
        bgCuopbien.position.set(990, 940);
        bgCuopbien.addChild(spine2);


        var spine3 = new PIXI.spine.Spine(resources['mapLogo'].spineData);
        spine3.x = 970;
        spine3.y = 80;
        spine3.scale.set(1);
        spine3.state.setAnimation(0, 'animation', true);
        spine3.state.timeScale = 0.6;

        that.bgtitle = new Sprite(TextureCache["map_title1.png"]);
        that.bgtitle.anchor.set(0.5);
        that.bgtitle.scale.set(1.2);
        that.bgtitle.position.set(0, 110);
        spine3.addChild(that.bgtitle);

        that.mainContainer.addChild(map1, map2, map3, map4, bgCuopbien, spine3);

        $("#topMapId").slimScroll({
            height: '310px'
        });
        $("#topNotiId").slimScroll({
            height: '154px'
        });
        that.showMap(that.MapID);
        that.getMapAccountInfo();

        $('.gameMapEvent .btPre').click(function() {
            that.MapID -= 1;
            if (that.MapID <= 1) {
                that.MapID = 1;
            }
            that.showMap(that.MapID);

        });

        $('.gameMapEvent .btNext').click(function() {
            that.MapID += 1;
            if (that.MapID >= 4) {
                that.MapID = 4;
            }
            that.showMap(that.MapID);

        });

    },
    showMap: function(mapId) {

        var that = this;
        that.mainContainer.getChildAt(0).visible = false;
        that.mainContainer.getChildAt(1).visible = false;
        that.mainContainer.getChildAt(2).visible = false;
        that.mainContainer.getChildAt(3).visible = false;
        that.bgtitle.texture = TextureCache['map_title' + mapId + '.png'];
        $('.gameMapEvent .btPre').show();
        $('.gameMapEvent .btNext').show();
        if (mapId === 1) {
            $('.gameMapEvent .btPre').hide();
        }
        if (mapId === 4) {
            $('.gameMapEvent .btNext').hide();
        }
        that.mainContainer.getChildAt(mapId - 1).visible = true;
        $('.clorMap').removeClass('map1').removeClass('map2').removeClass('map3').removeClass('map4');
        $('.clorMap').addClass('map' + mapId);
        $('.Maptooltip .tipMap1').hide();
        $('.Maptooltip .tipMap2').hide();
        $('.Maptooltip .tipMap3').hide();
        $('.Maptooltip .tipMap4').hide();
        $('.Maptooltip .tipMap' + mapId).show();

        that.MapID = mapId;

        if (that.UserMap === undefined || that.MapID !== that.UserMap.MapID) {
            $('.userCurrenMap').hide();
        } else if (that.MapID === that.UserMap.MapID) {
            $('.userCurrenMap').show();
        }

        if (that.Top3UserMap !== undefined) {
            for (var i = 0; i < that.Top3UserMap.length; i++) {
                $('.userTopMap.top' + (i + 1)).hide();
                if (that.Top3UserMap[i].MapID === that.MapID) {
                    $('.userTopMap.top' + (i + 1)).show();
                }
            }
        }

    },
    getMapTopNotify: function() {
        var that = this;

        var m = {};
        libs.GetData2(jsConfig.urlRootIsLand + 'api/IsLand/ListTopNotify', m, function(data) {
            var html = '';

            for (var i = 0; i < data.length; i++) {

                html += '<li><span class="nickname">' + data[i].NickName + ' </span>' + data[i].Description + '</li>';
            }
            $('#topNotiId ul').html(html);
        }, function(a) {

        });

        that.timoutTopRank = setTimeout(function() {
            that.getMapTopNotify();
        }, 30000);

    },
    secondsTohhmmss: function(totalSeconds) {
        var hours = Math.floor((totalSeconds) / 3600);
        var minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
        var seconds = ((totalSeconds % 86400) % 3600) % 60;

        seconds = Math.round(seconds * 100) / 100;
        if (hours > 0 || totalSeconds <= 0 || minutes > 30) {
            $('.gameMapEvent .timeNoti').hide();
        } else {
            $('.gameMapEvent .timeNoti').show();
        }
        var mm = (minutes < 10 ? "0" + minutes : minutes);
        var ss = (seconds < 10 ? "0" + seconds : seconds);
        $('.gameMapEvent .timeNoti .time').html(mm + ':' + ss);

    },
    getMapAccountInfo: function(callback) {
        var that = this;
        var m = {};
        libs.GetData(jsConfig.urlRootIsLand + 'api/IsLand/GetAccountIsland', m, function(data) {
            that.UserMap = data.UserMap;
            that.Top3UserMap = data.Top3UserMap;
            that.serconMap = data.TimeSecond;
            that.serconMapStart = data.SecondStart;
            $('.mapUserinfo .nickname').html(data.UserMap.NickName);
            $('.mapUserinfo .infoOil').html('Nhiên liệu:' + util.ParseMoney(data.UserMap.OilLP));
            $('.mapUserinfo .userrank').html('Xếp hạng:' + (data.UserMap.Rank > 0 ? data.UserMap.Rank : 9999));
            $('.mapCountSpin').html('Lượt quay:' + data.UserMap.SpinCount);
            var html = '';
            var i;
            var topRank = data.TopRankLand;
            for (i = 0; i < topRank.length; i++) {
                var top = 'top';
                var rank = '';
                if (i < 3) {
                    top += i + 1;

                } else {
                    rank = i + 1;
                }
                html += '<li>';
                html += '<span class="top ' + top + '" >' + rank + '</span>';
                html += '<span class="nickname">' + topRank[i].NickName + '</span>';
                html += '</li >';
            }
            $('#topMapId ul').html(html);
            console.log(data.MapRank);

            var htmlMapRank = '';
            var mapRank = data.MapRank;
            for (i = 0; i < mapRank.length; i++) {
                for (var j = 0; j < mapRank[i].length; j++) {
                    var obj = mapRank[i][j];
                    var treasu = obj.SpinCount;
                    htmlMapRank += '<div class="tipMap' + obj.MapID + ' pos' + (j + 1) + '"><div class="infoToltip" ><span class="islandName">' + obj.Insland + '</span><div class="islandOil"><span> Nhiên liệu: <span class="requiOil">' + util.ParseMoney(obj.Oil) + '</span> </span>';
                    htmlMapRank += '<span class="oilIcon"></span>';
                    htmlMapRank += '</div>';
                    htmlMapRank += '<div class="extraturn">Lượt quay: <span>' + treasu + '</span></div>';
                    htmlMapRank += '<div class="visitUser"><span>' + util.ParseMoney(obj.AccountCount) + '</span> lượt ghé thăm</div>';
                    htmlMapRank += '</div >';
                    htmlMapRank += '</div >';
                }
            }



            $('.Maptooltip').html(htmlMapRank);

            $('.Maptooltip .tipMap1').hide();
            $('.Maptooltip .tipMap2').hide();
            $('.Maptooltip .tipMap3').hide();
            $('.Maptooltip .tipMap4').hide();
            $('.Maptooltip .tipMap' + that.MapID).show();

            that.showMap(data.UserMap.MapID);
            that.moveAvartar(data.UserMap, data.Top3UserMap);

            $('.gameMapEvent .spinvqisLand').unbind('click').click(function() {
                var countSpin = that.UserMap.SpinCount;
                commonGame.showvqIsland(countSpin);
            });
        }, function(a) {});
    },
    moveAvartar: function(userMap, top3UserMap) {


        var that = this;

        var level = userMap.Level + 1;
        var percent = userMap.Percent;

        var objAvatar = that.ConfigUserMap.filter(t => t.Level === level);
        if (objAvatar.length > 0) {
            var move = objAvatar[0].Point[percent];
            $('.userCurrenMap').animate({
                top: move.top,
                left: move.left
            }, 1000, function() {});

        }

        if (top3UserMap.length === 0) {
            $('.userTopMap.top1').hide();
            $('.userTopMap.top2').hide();
            $('.userTopMap.top3').hide();
        }

        for (var i = 0; i < top3UserMap.length; i++) {
            var levelTop = top3UserMap[i].Level + 1;
            var percentTop = top3UserMap[i].Percent;
            var objTop = that.ConfigUserMap.filter(t => t.Level === levelTop);
            if (objTop.length > 0) {
                var moveTop = objTop[0].Point[percentTop];

                $('.userTopMap.top' + (i + 1)).animate({
                    top: moveTop.top,
                    left: moveTop.left
                }, 1000, function() {});
            }
        }

    },
    subscribe: function(obj) {
        obj.interactive = true;
        obj.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);



    },
    deleteGame: function() {
        try {
            commonGame.MAPEVENT.game.view.remove();
            commonGame.MAPEVENT.game.destroy(true);
            if (commonGame.MAPEVENT)
                delete commonGame.MAPEVENT;
        } catch (e) {
            console.log('deleteMap Erro');
        }
    },
    onDragStart: function(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
    },

    onDragEnd: function() {
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    },

    onDragMove: function() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
            console.log("x :" + newPosition.x + "y:" + newPosition.y);
        }
    },
    deleteTweens: function() {
        var all = TweenMax.getAllTweens();
        for (var i = 0; i < all.length; i++) {
            if (all[i].data === "mapEvent-effect" || all[i].data === "mapEvent-scale" || all[i].data === "mapEvent-move")
                all[i].kill();
        }
    }
};
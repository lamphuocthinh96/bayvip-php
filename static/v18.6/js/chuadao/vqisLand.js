window.VQisLand = window.VQisLand || {};
var tempvqisland;

window.VQisLand.Game = function() {};
window.VQisLand.Game.prototype = {
    game: null,
    stage: null,
    column1: {},
    column2: {},
    column3: {},
    renderer: null,
    mask: null,
    timeSpeed: 1,
    timeTween: 1.5,
    timeBack: 0.3,
    timeDelay: 0.1,
    create: function() {
        this.initGame();
    },
    initGame: function() {
        var that = this;
        this.game = new PIXI.Application(1000, 500, {
            antialias: false,
            transparent: true,
            resolution: 1
        });
        if (typeof tempvqisland === 'undefined')
            tempvqisland = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/chuadao/vqisland.html" + version);
        $(".over_poup").show();
        $(".over_poup").append(jQuery.processTemplateToText(tempvqisland));
        $(".gameVqIslandCanvas").append(this.game.view);
        this.mainContainer = new Container();


        this.column1 = {};
        this.column2 = {};
        this.column3 = {};
        this.containerColumn1 = new Container();
        this.containerColumn1.name = "Col1";
        this.containerColumn2 = new Container();
        this.containerColumn2.name = "Col2";
        this.containerColumn3 = new Container();
        this.containerColumn3.name = "Col3";
        this.columnContainer = new Container();
        this.columnContainer.name = "columnContainer";

        this.columnContainer.addChild(this.containerColumn1,
            this.containerColumn2,
            this.containerColumn3);

        this.isSpin = false;
        this.mainContainer.addChild(this.columnContainer);
        this.game.stage.addChild(this.mainContainer);

        that.initAssets();

        $('.gameVqIsland .closevqisland').unbind('click').click(function() {
            libs.CloseAll($('.gameVqIsland .closevqisland').parent());
            that.deleteGame();
            that.deleteTweens();

        });

        $('.gameVqIsland .closeHisvq').unbind('click').click(function() {
            $('.tableHistoryIsland').hide();
        });
        $('.gameVqIsland .hisvqisland').unbind('click').click(function() {
            $('.tableHistoryIsland').show();

            var m = {};
            libs.GetData2(jsConfig.urlRootIsLand + 'api/IsLand/GetAccountHistorySpin', m, function(data) {
                console.log(data);
                var html = '<li><span> Phiên</span><span>Thời gian</span><span>Thắng</span><span>Mô tả</span></li >';
                for (var i = 0; i < data.length; i++) {
                    var slotdata = data[i].SlotData.split(',');

                    html += '<li><span> ' + data[i].SpinID + '</span ><span>' + util.FormatDatetime(data[i].CreateTime) + '</span><span>' + data[i].PrizeData + '</span><span><i class="hisItem' + slotdata[0] + '"></i><i class="hisItem' + slotdata[1] + '"></i><i class="hisItem' + slotdata[2] + '"></i></span></li >';
                }
                $('#tableHistoryIsland').html(html);
            }, function(a) {

            });


        });

        $("#scrollhisvqIsland").slimScroll({
            height: '414px'
        });


    },
    initAssets: function() {
        var that = this;
        var girl = new PIXI.spine.Spine(resources['girlisland'].spineData);
        girl.x = 185;
        girl.y = 253;
        girl.scale.set(1);
        girl.state.setAnimation(0, 'animation', true);
        girl.state.timeScale = 0.5;

        that.mainContainer.addChild(girl);
        that.initMask();
        that.initSlots();
        $('.gameVqIsland .spinisLand').unbind('click').click(function() {
            if (that.isSpin)
                return;
            that.isSpin = true;
            libs.PostData(jsConfig.urlRootIsLand + 'api/IsLand/Spin2', {}, function(data) {
                    if (data.Response < 0) {
                        if (data.Response === -51) {
                            $('.gameVqIsland .messgeVqIsland').html('Lượt quay không đủ');
                        } else {
                            $('.gameVqIsland .messgeVqIsland').html('Lỗi hệ thống');
                        }
                        $('.gameVqIsland .messgeVqIsland').css('color', 'red');
                        that.isSpin = false;
                        return;
                    }
                    that.startSpin(data);
                },
                function() {
                    that.isSpin = false;
                });
        });





    },
    initMask: function() {
        var that = this;
        var mask = new Graphics();
        mask.beginFill('f0220b', 0.2);
        mask.drawRect(0, 0, 500, 165);
        mask.position.set(-100, -358);
        that.columnContainer.addChild(mask);
        that.columnContainer.mask = mask;


    },
    updateSpin: function(countSpin) {
        that.CountSpin = countSpin;
        $('.gameVqIsland .vqCountSpin').html('Lượt quay:' + countSpin);
        $('.gameMapEvent .mapCountSpin').html('Lượt quay:' + countSpin);

    },


    initSlots: function() {
        var that = this;
        var rand, itemSpine;
        that.columnContainer.position.set(402, 530);


        that.startPosition = 0;
        that.totalItems = 20;

        var j = 0;
        for (var i = that.totalItems - 1; i >= 0; i--) {
            rand = Math.floor(Math.random() * 5) + 1;
            that.column1[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
            that.column1[i].anchor.set(0.5);
            that.column1[i].x = 0;
            that.column1[i].y = that.startPosition - j * 140;


            that.containerColumn1.addChild(that.column1[i]);

            rand = Math.floor(Math.random() * 5) + 1;
            that.column2[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
            that.column2[i].anchor.set(0.5);

            that.column2[i].x = 160;
            that.column2[i].y = that.startPosition - j * 140;


            that.containerColumn2.addChild(that.column2[i]);

            rand = Math.floor(Math.random() * 5) + 1;
            that.column3[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
            that.column3[i].anchor.set(0.5);


            that.column3[i].x = 160 * 2;
            that.column3[i].y = that.startPosition - j * 140;


            that.containerColumn3.addChild(that.column3[i]);
            j++;
        }

        that.startHeight = that.column1[0].y;

    },

    getItem: function(id, isblur) {

        if (isblur) {
            return 'islanditem' + id + '_blur' + '.png';
        } else {
            return 'islanditem' + id + '.png';
        }
    },
    changeSlots: function() {
        var that = this;
        var rand;
        for (var i = 0; i < that.totalItems - 3; i++) {
            rand = Math.floor(Math.random() * 5) + 1;
            that.column1[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
            rand = Math.floor(Math.random() * 5) + 1;
            that.column2[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
            rand = Math.floor(Math.random() * 5) + 1;
            that.column3[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];

        }
    },
    beforeSpin: function() {
        var that = this;
        var objeffect = that.mainContainer.getChildByName('effect_spinIsland');
        if (objeffect !== null) {
            objeffect.destroy();
        }
    },

    startSpin: function(result) {
        var that = this;
        console.log(result);
        that.beforeSpin();
        that.changeSlots();
        var arraySlotData = result.SlotData.split(',');


        that.column1[1].texture = TextureCache[that.getItem(arraySlotData[0], false)];
        that.column1[1].inx = parseInt(arraySlotData[0]);


        that.column2[1].texture = TextureCache[that.getItem(arraySlotData[1], false)];
        that.column2[1].inx = parseInt(arraySlotData[1]);



        that.column3[1].texture = TextureCache[that.getItem(arraySlotData[2], false)];
        that.column3[1].inx = parseInt(arraySlotData[2]);
        that.containerColumn1.y = 0;
        that.containerColumn2.y = 0;
        that.containerColumn3.y = 0;

        that.updateSpin(result.SpinCount);

        that.spin(result);
    },
    spin: function(result) {
        var that = this;
        that.pointNext = -380;
        that.pointBack = -420;
        TweenMax.to(that.containerColumn1,
            that.timeTween * that.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0,
                data: "vqIsland-move",
                ease: Power0.easeNone,
                onComplete: function() {
                    TweenMax.to(that.containerColumn1,
                        that.timeBack * that.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * that.timeSpeed,
                            data: "vqIsland-move",
                            ease: Back.easeOut,
                            onComplete: function() {

                                that.column1[that.totalItems - 3].texture = that.column1[1].texture;


                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn2,
            that.timeTween * that.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.3 * that.timeSpeed,
                data: "vqIsland-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn2,
                        that.timeBack * that.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * that.timeSpeed,
                            data: "vqIsland-move",
                            ease: Back.easeOut,
                            onComplete: function() {
                                that.column2[that.totalItems - 3].texture = that.column2[1].texture;




                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn3,
            that.timeTween * that.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.6 * that.timeSpeed,
                data: "vqIsland-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn3,
                        that.timeBack * that.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * that.timeSpeed,
                            data: "vqIsland-move",
                            ease: Back.easeOut,
                            onComplete: function() {
                                that.column3[that.totalItems - 3].texture = that.column3[1].texture;


                                that.completSpin(result);
                            }
                        });
                }
            });
    },
    completSpin: function(result) {
        var that = this;
        that.isSpin = false;

        if (result.Type === 1) {
            $('.gameVqIsland .messgeVqIsland').html(util.ParseMoney(result.PrizeValue) + ' oil');

        } else if (result.Type === 0) {
            $('.gameVqIsland .messgeVqIsland').html(util.ParseMoney(result.PrizeValue) + ' B');
            libAccount.UpdateBalance(2, result.PrizeValue, 2);
        } else if (result.Type === 2) {
            $('.gameVqIsland .messgeVqIsland').html(result.TickCount + ' Vé miễn phí ' + util.ParseMoney(result.PrizeValue));

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
            commonGame.VQisLand.game.view.remove();
            commonGame.VQisLand.game.destroy(true);
            if (commonGame.VQisLand)
                delete commonGame.VQisLand;
        } catch (e) {
            console.log('deleteGame');
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
            if (all[i].data === "vqIsland-effect" || all[i].data === "vqIsland-scale" || all[i].data === "vqIsland-move")
                all[i].kill();
        }
    }
};
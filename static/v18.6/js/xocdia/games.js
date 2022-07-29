var intervalXocdiaRemain;
window.Xocdia = window.Xocdia || {};
window.Xocdia.Game = function() {};
window.Xocdia.Game.prototype = {
    game: null,
    stage: null,
    renderer: null,
    mask: null,
    create: function() {

        this.initGame();

    },
    initGame: function() {
        var that = this;
        this.game = new PIXI.Application(850, 580, {
            antialias: false,
            transparent: true,
            resolution: 1
        });
        $(".xocdia_game_v2").append(this.game.view);
        this.filter = new PIXI.filters.ColorMatrixFilter();
        this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
        this.filterGray = new PIXI.filters.ColorMatrixFilter();
        this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];

        this.mainContainer = new Container();
        this.mainContainer.y = 20;
        this.title = new Container();
        this.mainContainer.addChild(this.title);


        this.game.stage.addChild(this.mainContainer);


        that.initAsset();
        if (intervalXocdiaRemain)
            clearInterval(intervalXocdiaRemain);
        intervalXocdiaRemain = setInterval(commonXocdia.GameXocdia.fnRemain, 1000);

    },

    initAsset: function() {

        var spine = new PIXI.spine.Spine(loader.resources['title_xocxoc'].spineData);
        spine.x = 400;
        spine.y = 102;
        spine.scale.set(0.65);
        spine.state.setAnimation(0, 'animation', true);
        spine.state.timeScale = 0.6;
        this.title.addChild(spine);

        $('#xocdia .mini_close').unbind('click').click(function() {
            commonXocdia.HideDiceGUI();
        });

        $('#xocdia .mini_help').unbind('click').click(function() {
            commonXocdia.showGuide();
        });


        $('#xocdia .mini_rank').unbind('click').click(function() {
            commonXocdia.showRank();
        });


        $('#xocdia .mini_history').unbind('click').click(function() {
            commonXocdia.showHisCusStar(commonGame.typeBet);
        });






        $('#xocdia .mini_static').unbind('click').click(function() {
            commonXocdia.showStatitics();
        });

        $('#xocdia .mini_nan').unbind('click').click(function() {
            if (!commonXocdia.enableTips) {
                commonXocdia.enableTips = true;
                $('#xocdia .mini_nan').addClass('active');
            } else {
                commonXocdia.enableTips = false;
                $('#xocdia .mini_nan').removeClass('active');
            }
        });

        $('#xocdia .mini_chat').unbind('click').click(function() {
            if ($('#gameCicle .chat-section').hasClass('active')) {
                $('#gameCicle .chat-section').removeClass('active');
                return;
            } else {
                $('#gameCicle .chat-section').addClass('active');
            }
        });









        this.bgdia = new Sprite(TextureCache["xocdia_dia.png"]);
        this.bgdia.anchor.set(0.5);
        this.bgdia.position.set(411, 310);



        this.bgbat = new Sprite(TextureCache["xocdia_bat.png"]);
        this.bgbat.anchor.set(0.5);
        this.bgbat.position.set(409, 311);
        var circlebat = new Sprite(TextureCache["xocdia_circle.png"]);
        circlebat.anchor.set(0.5);
        circlebat.position.set(0, 0);
        this.bgbat.addChild(circlebat);
        TweenMax.to(circlebat, 250, {
            rotation: 360,
            ease: Linear.easeNone,
            repeat: -1
        });




        this.bgTime = new Sprite();
        var time1 = new Sprite(TextureCache["dice_num_red_0.png"]);
        time1.anchor.set(0.5);
        time1.position.set(0, 0);
        time1.scale.set(0.6);

        var time2 = new Sprite(TextureCache["dice_num_red_1.png"]);
        time2.anchor.set(0.5);
        time2.position.set(76, 0);
        time2.scale.set(0.6);

        this.bgTime.anchor.set(0.5);
        this.bgTime.position.set(369, 314);
        this.bgTime.visible = false;
        this.bgTime.addChild(time1, time2);
        this.mainContainer.addChild(this.bgdia, this.bgbat, this.bgTime);




    },
    showStart: function() {
        var that = commonXocdia.GameXocdia;
        that.bgdia.visible = false;
        that.bgbat.visible = false;
        $('#xocdia .tips').hide();

        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }



        var startContainer = new Sprite();
        startContainer.name = 'startContainer';
        var spriteEffect = new Sprite();
        var effect = new PIXI.spine.Spine(resources["xocxoc_Bat"].spineData);
        effect.scale.set(0.73);
        effect.alpha = 1;
        effect.state.setAnimation(0, 'animation', false);
        effect.position.set(417, 311);
        effect.state.timeScale = 1;

        effect.state.onComplete = function() {
            console.log('Show Start');
            startContainer.removeChild(spriteEffect);
            that.bgdia.visible = true;
            that.bgbat.visible = true;
        };
        spriteEffect.addChild(effect);
        startContainer.addChild(spriteEffect);

        this.mainContainer.addChild(startContainer);
    },
    showResult: function(data) {
        var that = commonXocdia.GameXocdia;
        if (commonXocdia.enableTips) {
            commonXocdia.hideResult = true;
        } else {
            commonXocdia.hideResult = false;
            $('#xocdia .tips').show();
            $('#xocdia .tipsoverlayXd').css('left', '0px');
            $('#xocdia .tipsoverlayXd').css('top', '0px');


            TweenMax.to(".tipsoverlayXd", 3, {
                left: '80px',
                top: '80px',
                delay: 0,
                ease: "power3.inOut",
                onComplete: function() {

                    TweenMax.to(".tipsoverlayXd", 0.5, {
                        left: '230px',
                        top: '230px',
                        delay: 0,
                        ease: "power2.inOut",
                        onComplete: function() {
                            $('#xocdia .tips').hide();
                            commonXocdia.setTotal(data.ChipNumber, data.LocationIDWin);
                        }
                    });


                }
            });




        }
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }


        var diceContainer = new Sprite();
        diceContainer.name = 'diceContainer';
        this.mainContainer.addChild(diceContainer);
        that.showDice(data.Chip1, data.Chip2, data.Chip3, data.Chip4, data.ChipNumber, data.LocationIDWin);

        if (commonXocdia.hideResult) {

            clearTimeout(that.finishTimeout);
            that.finishTimeout = setTimeout(function() {
                $('#xocdia .tips').hide();
                commonXocdia.setTotal(data.ChipNumber, data.LocationIDWin);
                console.log('commonXocdia finishTimeout');
            }, 13000);
            $('#xocdia .tipsoverlayXd').draggable({
                scroll: false,
                top: 0,
                start: function(a, b) {},
                stop: function(a, b) {

                },
                drag: function(a, b) {

                    $('#xocdia .tipsoverlayXd').css('top', (b.position.top) + 'px');
                    $('#xocdia .tipsoverlayXd').css('left', (b.position.left) + 'px');
                }
            });
        }

        var tickwait = commonXocdia.currentSession.RemainWaiting;
        var wait1 = tickwait - 1 > 0 ? tickwait - 1 : 0.5;
        var wait2 = tickwait - wait1;

        TweenMax.to(that.mainContainer, wait1, {
            alpha: 1,
            ease: Linear.easeNone,
            onComplete: function() {
                if (commonXocdia.gameSession !== 0) {
                    commonXocdia.gameHub.server.GetAccountResult(commonXocdia.gameSession).done(function() {}).fail(function() {});
                }
                TweenMax.to(that.mainContainer, wait2, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        commonXocdia.GameXocdia.resetStartGame();
                    }
                });
            }
        });



    },
    showDice: function(chip1, chip2, chip3, chip4, chipNumber, LocationIDWin) {

        var that = commonXocdia.GameXocdia;

        that.bgdia.visible = true;
        that.bgbat.visible = false;

        var objStart = that.mainContainer.getChildByName('startContainer');
        if (objStart !== undefined && objStart !== null) {
            objStart.destroy();
        }


        if (commonXocdia.hideResult) {

            $('#xocdia .tips').show();
            $('#xocdia .tipsoverlayXd').css('top', '0px');
            $('#xocdia .tipsoverlayXd').css('left', '0px');
        }


        var txtChip1 = new Sprite(TextureCache["xocdia_chip" + chip1 + ".png"]);
        txtChip1.anchor.set(0.5);


        var rdx1 = Math.floor((Math.random() * 40) - 20);
        var rdy1 = Math.floor((Math.random() * 40) - 20);

        txtChip1.position.set(375 + rdx1, 285 + rdy1);


        var txtChip2 = new Sprite(TextureCache["xocdia_chip" + chip2 + ".png"]);
        txtChip2.anchor.set(0.5);

        var rdx2 = Math.floor((Math.random() * 40) - 20);
        var rdy2 = Math.floor((Math.random() * 40) - 20);





        txtChip2.position.set(440 + rdx2, 285 + rdy2);

        var txtChip3 = new Sprite(TextureCache["xocdia_chip" + chip3 + ".png"]);
        txtChip3.anchor.set(0.5);

        var rdx3 = Math.floor((Math.random() * 40) - 20);
        var rdy3 = Math.floor((Math.random() * 40) - 20);
        txtChip3.position.set(375 + rdx3, 330 + rdy3);

        var txtChip4 = new Sprite(TextureCache["xocdia_chip" + chip4 + ".png"]);
        txtChip4.anchor.set(0.5);
        var rdx4 = Math.floor((Math.random() * 40) - 20);
        var rdy4 = Math.floor((Math.random() * 40) - 20);

        txtChip4.position.set(440 + rdx4, 330 + rdy4);
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.addChild(txtChip1, txtChip2, txtChip3, txtChip4);
        }
    },

    setTotal: function(total, isshow) {
        $('.xocdia-game-block .location').removeClass('active');
        if (isshow === 2) {
            commonGame.showNotify(1, 'Chẵn');
            $('.xocdia-game-block .location.tai').addClass('active');
        } else {
            commonGame.showNotify(1, 'Lẻ');
            $('.xocdia-game-block .location.xiu').addClass('active');
        }



    },
    updateDragon: function(data) {

    },

    fnRemain: function() {
        var that = commonXocdia.GameXocdia;
        if (typeof commonXocdia.currentSession === 'undefined')
            return;
        var tickWait = commonXocdia.currentSession.RemainWaiting;
        var tickBet = commonXocdia.currentSession.RemainBetting;

        if (tickWait > 0) {
            tickWait--;
            commonXocdia.currentSession.RemainWaiting = tickWait;
            commonXocdia.setAllowbet(false);
            that.updateTime(0);
            if (tickWait > 0)
                $(".xd_timewaiting").show();

            $(".xd_timewaiting").html(commonGame.formatTime(tickWait));
            $('#xd_totalcountBetOver').removeClass('bussTxScale');
            $("#xd_totalbetOver").removeClass('bussTxScale');
            $('#xd_totalcountBetUnder').removeClass('bussTxScale');
            $("#xd_totalbetUnder").removeClass('bussTxScale');

            if (tickWait === 1) {
                that.showStart();
                $(".xd_timewaiting").hide();
            }
        } else {
            commonXocdia.GameXocdia.resetBetAmimation();

            if (tickBet > 0) {
                tickBet--;
                commonXocdia.currentSession.RemainBetting = tickBet;
            }

            that.updateTime(tickBet);

            if (tickBet > 5) {
                commonXocdia.setAllowbet(true);
                $('#xd_totalcountBetOver').addClass('bussTxScale');
                $("#xd_totalbetOver").addClass('bussTxScale');
                $('#xd_totalcountBetUnder').addClass('bussTxScale');
                $("#xd_totalbetUnder").addClass('bussTxScale');

            } else {
                commonXocdia.setAllowbet(false);
                $('#xd_totalcountBetOver').removeClass('bussTxScale');
                $("#xd_totalbetOver").removeClass('bussTxScale');
                $('#xd_totalcountBetUnder').removeClass('bussTxScale');
                $("#xd_totalbetUnder").removeClass('bussTxScale');

            }
            if (tickBet === 0) {
                commonXocdia.isBet = false;
            }
        }
    },
    updateTime: function(tickBet) {

        if (tickBet === 0) {
            this.bgTime.visible = false;
            return;
        }

        this.bgTime.visible = true;
        var str = tickBet < 10 ? '0' + tickBet : '' + tickBet;

        var color = '';
        if (tickBet > 5) {
            color = 'whi';
        } else {
            color = 'red';
            $('#xocdiasetfastID').hide();
        }

        for (var i = 0; i < str.length; i++) {

            this.bgTime.getChildAt(0).texture = TextureCache['dice_num_' + color + '_' + str[0] + '.png'];
            if (str[0] !== this.bgTime.getChildAt(0).valueTime) {

                this.bgTime.getChildAt(0).position.set(0, -40);
                this.bgTime.getChildAt(0).alpha = 0;
                TweenMax.to(this.bgTime.getChildAt(0), 0.1, {
                    y: 0,
                    alpha: 1,
                    ease: "bounce.out",
                    repeat: 0
                });
                this.bgTime.getChildAt(0).valueTime = str[0];
            }

            this.bgTime.getChildAt(1).texture = TextureCache['dice_num_' + color + '_' + str[1] + '.png'];
            if (str[1] !== this.bgTime.getChildAt(1).valueTime) {
                this.bgTime.getChildAt(1).position.set(76, -40);
                this.bgTime.getChildAt(1).alpha = 0;
                TweenMax.to(this.bgTime.getChildAt(1), 0.1, {
                    y: 0,
                    alpha: 1,
                    ease: "bounce.out",
                    repeat: 0
                });
                this.bgTime.getChildAt(1).valueTime = str[1];
            }



        }


    },
    updateAccountResult: function(sumGold, refunGold) {

        if (sumGold > 0) {
            var sum = new Text('+' + commonGame.FormatNumber(sumGold),
                new PIXI.TextStyle({
                    fontFamily: "Conv_UTM_Swiss",
                    fontSize: 40,
                    fill: ["#ff0", "#ff0"]
                }));
            sum.anchor.set(0.5);
            sum.position.set(330, 330);

            this.mainContainer.addChild(sum);

            TweenMax.to(sum, 5, {
                y: 130,
                alpha: 0.3,
                ease: Linear.easeNone,
                onComplete: function() {
                    sum.destroy();
                }
            });


        }

        if (refunGold > 0) {
            var refun = new Text('+' + commonGame.FormatNumber(refunGold),
                new PIXI.TextStyle({
                    fontFamily: "Conv_UTM_Swiss",
                    fontSize: 40,
                    fill: ["#fff", "#fff"]
                }));
            refun.anchor.set(0.5);
            refun.position.set(330, 279);
            this.subscribe(refun);;
            this.mainContainer.addChild(refun);
            TweenMax.to(refun, 5, {
                y: 79,
                alpha: 0.3,
                ease: Linear.easeNone,
                onComplete: function() {
                    refun.destroy();
                }
            });
        }




    },
    resetStartGame: function() {
        var that = commonXocdia.GameXocdia;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }

        commonXocdia.reset();

        console.log("finish Xocdia:" + commonXocdia.gameSession);
        that.deleteTweens();

    },
    resetBetAmimation: function() {
        var that = commonXocdia.GameXocdia;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }
        $('.xocdia-game-block .location').removeClass('active');

        $('#xocdia .tips').hide();
        $(".xd_timewaiting").hide();
        that.deleteTweens();
    },
    btnTintOver: function() {
        this.filters = [commonXocdia.GameXocdia.filter];
    },
    btnTintOut: function() {
        this.filters = null;
    },

    btnActive: function(obj) {
        var that = commonXocdia.GameXocdia;
        obj.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
            .on("pointerupoutside", that.btnTintOut).on("pointerup", that.btnTintOut);;
        obj.interactive = true;
        obj.buttonMode = true;

    },

    subscribe: function(obj) {
        obj.interactive = true;
        obj.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);;


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
            if (all[i].data === "xd-effect" || all[i].data === "xd-scale" || all[i].data === "xd-move")
                all[i].kill();
        }
    },
};
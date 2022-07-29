var intervalTxRemain;
window.Taixiu = window.Taixiu || {};
window.Taixiu.Game = function() {};
window.Taixiu.Game.prototype = {
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
        $(".dice_game_v2").append(this.game.view);
        this.filter = new PIXI.filters.ColorMatrixFilter();
        this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
        this.filterGray = new PIXI.filters.ColorMatrixFilter();
        this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];

        this.mainContainer = new Container();
        this.mainContainer.y = 20;
        this.title = new Container();
        this.mainContainer.addChild(this.title);
        this.game.stage.addChild(this.mainContainer);


        that.initFrames();
        that.initAsset();
        if (intervalTxRemain)
            clearInterval(intervalTxRemain);
        intervalTxRemain = setInterval(commonLuckyDice.GameTx.fnRemain, 1000);

    },
    initFrames: function() {

        this.framesItems = [];
        for (var i = 1; i <= 19; i++) {
            this.framesItems.push(TextureCache["animation" + (i < 10 ? "0" : "") + i + ".png"]);
        }
    },
    initAsset: function() {

        var spine = new PIXI.spine.Spine(loader.resources['sukien_taixiu'].spineData);
        spine.x = 328;
        spine.y = 102;
        spine.scale.set(0.65);
        spine.state.setAnimation(0, 'animation', true);
        spine.state.timeScale = 0.3;
        this.title.addChild(spine);



        $('#lucky .mini_close').unbind('click').click(function() {
            commonLuckyDice.HideDiceGUI();
        });


        $('#lucky .mini_help').unbind('click').click(function() {
            commonLuckyDice.showGuide();
        });


        $('#lucky .mini_rank').unbind('click').click(function() {
            commonLuckyDice.showRank();
        });


        $('#lucky .mini_history').unbind('click').click(function() {
            commonLuckyDice.showHisCusStar(commonGame.typeBet);
        });






        $('#lucky .mini_static').unbind('click').click(function() {
            commonLuckyDice.showStatitics();
        });

        $('#lucky .mini_nan').unbind('click').click(function() {
            if (!commonLuckyDice.enableTips) {
                commonLuckyDice.enableTips = true;
                $('#lucky .mini_nan').addClass('active');
            } else {
                commonLuckyDice.enableTips = false;
                $('#lucky .mini_nan').removeClass('active');
            }
        });

        $('#lucky .mini_chat').unbind('click').click(function() {
            if ($('#gameCicle .chat-section').hasClass('active')) {
                $('#gameCicle .chat-section').removeClass('active');
                return;
            } else {
                $('#gameCicle .chat-section').addClass('active');
            }
        });





        this.bgResult = new Sprite(TextureCache["mini_taixiu_bg_time.png"]);
        this.bgResult.anchor.set(0.5);
        this.bgResult.scale.set(0.85);

        this.bgResult.position.set(479, 209);
        var numResult = new Text("0",
            new PIXI.TextStyle({
                fontFamily: "Conv_UTM_Swiss",
                fontSize: 40,

                fill: ["#ff0", "#ff0"],
                stroke: "#000",
                strokeThickness: 1

            }));
        numResult.anchor.set(0.5);
        this.bgResult.addChild(numResult);
        this.bgResult.visible = false;




        var circle1 = new Sprite(TextureCache["rong.png"]);
        circle1.anchor.set(0.5);
        circle1.position.set(409, 311);



        var circle2 = new Sprite(TextureCache["vongsang.png"]);
        circle2.anchor.set(0.5);
        circle2.position.set(409, 311);

        TweenMax.to(circle2, 100, {
            rotation: 360,
            ease: Linear.easeNone,
            repeat: -1
        });
        TweenMax.to(circle1, 1000, {
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






        this.mainContainer.addChild(circle1, circle2, this.bgResult, this.bgTime);



    },
    showResult: function(data) {
        var that = commonLuckyDice.GameTx;
        if (commonLuckyDice.enableTips) {
            commonLuckyDice.hideResult = true;
        } else {
            commonLuckyDice.hideResult = false;
            $('#lucky .tips').hide();
        }


        var diceContainer = new Sprite();
        diceContainer.name = 'diceContainer';
        var effect = new AnimatedSprite(this.framesItems);
        effect.anchor.set(0.5);
        effect.animationSpeed = 0.6;
        effect.loop = false;
        effect.play();
        effect.position.set(407, 302);

        effect.onComplete = function() {
            effect.destroy();
            that.showDice(data.Dice1, data.Dice2, data.Dice3);
        };
        diceContainer.addChild(effect);
        this.mainContainer.addChild(diceContainer);

        if (commonLuckyDice.hideResult) {

            clearTimeout(that.finishTimeout);
            that.finishTimeout = setTimeout(function() {
                $('#lucky .tips').hide();
                var total = parseInt(data.Dice1) + parseInt(data.Dice2) + parseInt(data.Dice3);
                commonLuckyDice.setTotal(total, true);
                console.log('End finishTimeout');
            }, 13000);
            $('#lucky .tipsoverlay').draggable({
                scroll: false,
                top: 0,
                start: function(a, b) {},
                stop: function(a, b) {
                    if (b.position.top < -230 || b.position.top > 230 || Math.abs(b.position.left) > 220 || Math.abs(b.position.top) + Math.abs(b.position.left) > 300) {
                        var total = parseInt(data.Dice1) + parseInt(data.Dice2) + parseInt(data.Dice3);
                        commonLuckyDice.setTotal(total);
                        $('#lucky .tipsoverlay').unbind('draggable');
                    }
                },
                drag: function(a, b) {

                    $('#lucky .tipsoverlay').css('top', (b.position.top) + 'px');
                    $('#lucky .tipsoverlay').css('left', (b.position.left) + 'px');
                }
            });
        }

        var tickwait = commonLuckyDice.currentSession.RemainWaiting;
        var wait1 = tickwait - 1 > 0 ? tickwait - 1 : 0.5;
        var wait2 = tickwait - wait1;

        TweenMax.to(that.mainContainer, wait1, {
            alpha: 1,
            ease: Linear.easeNone,
            onComplete: function() {
                if (commonLuckyDice.gameSession !== 0) {
                    commonLuckyDice.gameHub.server.GetAccountResult(commonLuckyDice.gameSession).done(function() {}).fail(function() {});
                }
                TweenMax.to(that.mainContainer, wait2, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        commonLuckyDice.GameTx.resetStartGame();
                    }
                });
            }
        });




    },
    showDice: function(dice1, dice2, dice3) {
        if (!commonLuckyDice.hideResult) {
            var total = parseInt(dice1) + parseInt(dice2) + parseInt(dice3);
            commonLuckyDice.setTotal(total);
        } else {
            $('#lucky .tips').show();
            $('#lucky .tipsoverlay').css('top', '0px');
            $('#lucky .tipsoverlay').css('left', '0px');
        }

        var txtDice1 = new Sprite(TextureCache["mini_taixiu_xucxac" + dice1 + ".png"]);
        txtDice1.anchor.set(0.5);
        txtDice1.position.set(412, 251);

        var txtDice2 = new Sprite(TextureCache["mini_taixiu_xucxac" + dice2 + ".png"]);
        txtDice2.anchor.set(0.5);
        txtDice2.position.set(357, 343);

        var txtDice3 = new Sprite(TextureCache["mini_taixiu_xucxac" + dice3 + ".png"]);
        txtDice3.anchor.set(0.5);
        txtDice3.position.set(459, 339);

        var that = commonLuckyDice.GameTx;

        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.addChild(txtDice1, txtDice2, txtDice3);
        }

    },

    setTotal: function(total, isshow) {
        $('.dice-game-block .location').removeClass('active');
        if (total >= 11) {
            commonGame.showNotify(1, 'Tài');
            $('.dice-game-block .location.tai').addClass('active');
        } else {
            commonGame.showNotify(1, 'Xỉu');
            $('.dice-game-block .location.xiu').addClass('active');

        }
        console.log('location active');
        this.bgResult.visible = true;
        this.bgResult.getChildAt(0).text = total;

    },
    updateDragon: function(data) {

    },

    fnRemain: function() {
        var that = commonLuckyDice.GameTx;
        if (typeof commonLuckyDice.currentSession === 'undefined')
            return;
        var tickWait = commonLuckyDice.currentSession.RemainWaiting;
        var tickBet = commonLuckyDice.currentSession.RemainBetting;

        if (tickWait > 0) {
            tickWait--;
            commonLuckyDice.currentSession.RemainWaiting = tickWait;
            commonLuckyDice.setAllowbet(false);
            that.updateTime(0);
            if (tickWait > 0)
                $(".timewaiting").show();


            $(".timewaiting").html(commonGame.formatTime(tickWait));

            $('#totalcountBetOver').removeClass('bussTxScale');
            $("#totalbetOver").removeClass('bussTxScale');
            $('#totalcountBetUnder').removeClass('bussTxScale');
            $("#totalbetUnder").removeClass('bussTxScale');


        } else {
            commonLuckyDice.GameTx.resetBetAmimation();
            that.bgResult.visible = false;
            if (tickBet > 0) {
                tickBet--;
                commonLuckyDice.currentSession.RemainBetting = tickBet;
            }

            that.updateTime(tickBet);

            if (tickBet > 5) {
                commonLuckyDice.setAllowbet(true);
                $('#totalcountBetOver').addClass('bussTxScale');
                $("#totalbetOver").addClass('bussTxScale');
                $('#totalcountBetUnder').addClass('bussTxScale');
                $("#totalbetUnder").addClass('bussTxScale');

            } else {
                commonLuckyDice.setAllowbet(false);
                $('#totalcountBetOver').removeClass('bussTxScale');
                $("#totalbetOver").removeClass('bussTxScale');
                $('#totalcountBetUnder').removeClass('bussTxScale');
                $("#totalbetUnder").removeClass('bussTxScale');

            }
            if (tickBet === 0) {
                commonLuckyDice.isBet = false;
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
            $('#setfastID').hide();
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
        var that = commonLuckyDice.GameTx;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }
        that.bgResult.visible = false;
        commonLuckyDice.reset();

        console.log("finish:" + commonLuckyDice.gameSession);
        that.deleteTweens();

    },
    resetBetAmimation: function() {
        var that = commonLuckyDice.GameTx;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }
        $('.dice-game-block .location').removeClass('active');
        that.bgResult.visible = false;
        $('#lucky .tips').hide();
        $(".timewaiting").hide();
        that.deleteTweens();
    },
    btnTintOver: function() {
        this.filters = [commonLuckyDice.GameTx.filter];
    },
    btnTintOut: function() {
        this.filters = null;
    },

    btnActive: function(obj) {
        var that = commonLuckyDice.GameTx;
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
            if (all[i].data === "tx-effect" || all[i].data === "tx-scale" || all[i].data === "tx-move")
                all[i].kill();
        }
    },
};
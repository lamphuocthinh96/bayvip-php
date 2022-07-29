var intervalDragonRemain;
window.Dragon = window.Dragon || {};
window.Dragon.Game = function() {};
window.Dragon.Game.prototype = {
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
        $(".dragon_game_v2").append(this.game.view);
        this.filter = new PIXI.filters.ColorMatrixFilter();
        this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
        this.filterGray = new PIXI.filters.ColorMatrixFilter();
        this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];

        this.mainContainer = new Container();
        this.title = new Container();
        this.mainContainer.y = 20;
        this.mainContainer.addChild(this.title);
        this.game.stage.addChild(this.mainContainer);




        that.initAsset();
        if (intervalDragonRemain)
            clearInterval(intervalDragonRemain);
        intervalDragonRemain = setInterval(commonDragon.GameDragon.fnRemain, 1000);




    },

    initAsset: function() {

        var spine = new PIXI.spine.Spine(loader.resources['title_rongho'].spineData);
        spine.x = 400;
        spine.y = 102;
        spine.scale.set(0.65);
        spine.state.setAnimation(0, 'animation', true);
        spine.state.timeScale = 0.6;
        this.title.addChild(spine);

        $('#dragon .mini_close').unbind('click').click(function() {
            commonDragon.HideDiceGUI();
        });

        $('#dragon .mini_help').unbind('click').click(function() {
            commonDragon.showGuide();
        });


        $('#dragon .mini_rank').unbind('click').click(function() {
            commonDragon.showRank();
        });


        $('#dragon .mini_history').unbind('click').click(function() {
            commonDragon.showHisCusStar(commonGame.typeBet);
        });






        $('#dragon .mini_static').unbind('click').click(function() {
            commonDragon.showStatitics();
        });

        $('#dragon .mini_nan').unbind('click').click(function() {
            if (!commonDragon.enableTips) {
                commonDragon.enableTips = true;
                $('#dragon .mini_nan').addClass('active');
            } else {
                commonDragon.enableTips = false;
                $('#dragon .mini_nan').removeClass('active');
            }
        });

        $('#dragon .mini_chat').unbind('click').click(function() {
            if ($('#gameCicle .chat-section').hasClass('active')) {
                $('#gameCicle .chat-section').removeClass('active');
                return;
            } else {
                $('#gameCicle .chat-section').addClass('active');
            }
        });

        this.bgCard = new Sprite();
        this.bgCard.anchor.set(0.5);


        var card1 = new Sprite(TextureCache["dr_card.png"]);
        card1.anchor.set(0.5);
        card1.position.set(327, 292);



        var card2 = new Sprite(TextureCache["dr_card.png"]);
        card2.anchor.set(0.5);
        card2.position.set(486, 292);
        this.bgCard.addChild(card2, card1);





        this.bgTime = new Sprite();
        var bgOver = new Sprite(TextureCache["dr_bgtime.png"]);
        bgOver.anchor.set(0.5);
        bgOver.position.set(38, -0);






        var time1 = new Sprite(TextureCache["dice_num_red_0.png"]);
        time1.anchor.set(0.5);
        time1.position.set(0, 0);
        time1.scale.set(0.6);

        var time2 = new Sprite(TextureCache["dice_num_red_1.png"]);
        time2.anchor.set(0.5);
        time2.position.set(76, 0);
        time2.scale.set(0.6);

        this.bgTime.anchor.set(0.5);
        this.bgTime.position.set(369, 293);
        this.bgTime.visible = false;
        this.bgTime.addChild(bgOver, time1, time2);


        this.mainContainer.addChild(this.bgCard, this.bgTime);

    },
    showStart: function() {
        var that = commonDragon.GameDragon;
        $('#dragon .tips').hide();
        $('.drcardvalue').hide();
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }


        that.bgCard.visible = true;
        that.bgCard.getChildAt(1).anchor.set(0.5);
        that.bgCard.getChildAt(1).position.set(405, 168);

        that.bgCard.getChildAt(0).anchor.set(0.5);
        that.bgCard.getChildAt(0).position.set(405, 168);

        TweenMax.to(that.bgCard.getChildAt(1), 0.2, {
            y: 292,
            x: 327,
            delay: 0,
            scaleX: 1,
            scaleY: 1,
            data: "dragon-move",
            ease: Power0.easeNone,
            onComplete: function() {

            }
        });


        TweenMax.to(that.bgCard.getChildAt(0), 0.2, {
            y: 292,
            x: 486,
            delay: 0.2,
            data: "dragon-move",
            ease: Power0.easeNone,
            onComplete: function() {

            }
        });

        TweenMax.to(that.bgCard.getChildAt(1).scale, 0.2, {
            x: 1,
            y: 1
        });
        TweenMax.to(that.bgCard.getChildAt(0).scale, 0.2, {
            x: 1,
            y: 1,
            delay: 0.2
        });

    },
    showResult: function(data) {
        console.log('showResult');
        console.log(data);

        var that = commonDragon.GameDragon;

        if (commonDragon.enableTips) {
            commonDragon.hideResult = true;
        } else {
            commonDragon.hideResult = false;
            $('#dragon .tips').show();
            $('#dragon .tipsoverlayCard1').css('top', '237px');
            $('#dragon .tipsoverlayCard1').css('left', '275px');


            $('#dragon .tipsoverlayCard2').css('top', '237px');
            $('#dragon .tipsoverlayCard2').css('left', '433px');



            TweenMax.to(".tipsoverlayCard1", 3, {
                top: '260px',
                delay: 0,
                ease: "power3.inOut",
                onComplete: function() {

                    TweenMax.to(".tipsoverlayCard1", 0.5, {
                        top: '380px',
                        delay: 0,
                        ease: "power2.inOut",
                        onComplete: function() {
                            $('#dragon .tipsoverlayCard1').hide();


                        }
                    });


                }
            });

            TweenMax.to(".tipsoverlayCard2", 3, {
                top: '260px',
                delay: 3.5,
                ease: "power3.inOut",
                onComplete: function() {

                    TweenMax.to(".tipsoverlayCard2", 0.5, {
                        top: '380px',
                        delay: 0,
                        ease: "power2.inOut",
                        onComplete: function() {

                            $('#dragon .tips').hide();
                            commonDragon.setTotal(data.CardValue1, data.CardValue2, data.LocationIDWin);
                        }
                    });


                }
            });





        }



        var diceContainer = new Sprite();
        diceContainer.name = 'diceContainer';
        this.mainContainer.addChild(diceContainer);
        that.showDice(data.Card1, data.Card2, data.CardValue1, data.CardValue2, data.LocationIDWin);




        if (commonDragon.hideResult) {

            clearTimeout(that.finishTimeout);
            that.finishTimeout = setTimeout(function() {

                $('#dragon .tips').hide();
                commonDragon.setTotal(data.CardValue1, data.CardValue2, data.LocationIDWin);

                console.log('End finishTimeout');
            }, 13000);
            $('#dragon .tipsoverlayCard1').draggable({
                scroll: false,
                top: 0,
                start: function(a, b) {},
                stop: function(a, b) {

                },
                drag: function(a, b) {

                    $('#dragon .tipsoverlayCard1').css('top', (b.position.top) + 'px');
                    $('#dragon .tipsoverlayCard1').css('left', (b.position.left) + 'px');
                }
            });


            $('#dragon .tipsoverlayCard2').draggable({
                scroll: false,
                top: 0,
                start: function(a, b) {},
                stop: function(a, b) {

                },
                drag: function(a, b) {

                    $('#dragon .tipsoverlayCard2').css('top', (b.position.top) + 'px');
                    $('#dragon .tipsoverlayCard2').css('left', (b.position.left) + 'px');
                }
            });
        }

        var tickwait = commonDragon.currentSession.RemainWaiting;
        var wait1 = tickwait - 1 > 0 ? tickwait - 1 : 0.5;
        var wait2 = tickwait - wait1;

        TweenMax.to(that.mainContainer, wait1, {
            alpha: 1,
            ease: Linear.easeNone,
            onComplete: function() {
                if (commonDragon.gameSession !== 0) {
                    commonDragon.gameHub.server.GetAccountResult(commonDragon.gameSession).done(function() {}).fail(function() {});
                }
                TweenMax.to(that.mainContainer, wait2, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        commonDragon.GameDragon.resetStartGame();
                    }
                });
            }
        });
    },
    showDice: function(card1, card2, cardvalue1, cardvalue2, LocationIDWin) {

        var that = commonDragon.GameDragon;
        that.bgCard.visible = false;



        var txtChip1 = new Sprite(TextureCache[that.getCard(card1) + ".png"]);
        txtChip1.anchor.set(0.5);
        txtChip1.scale.set(0.9);
        txtChip1.position.set(327, 292);





        var txtChip2 = new Sprite(TextureCache[that.getCard(card2) + ".png"]);
        txtChip2.anchor.set(0.5);
        txtChip2.scale.set(0.9);
        txtChip2.position.set(486, 292);



        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.addChild(txtChip1, txtChip2);
        }

        if (commonDragon.hideResult) {


            $('#dragon .tips').show();
            $('#dragon .tipsoverlayCard1').css('top', '237px');
            $('#dragon .tipsoverlayCard1').css('left', '275px');


            $('#dragon .tipsoverlayCard2').css('top', '237px');
            $('#dragon .tipsoverlayCard2').css('left', '433px');


        }

    },

    getCard: function(i) {

        var type = '';


        if (i < 8) {
            type = 'spade-' + (i + 2);
            return type;
        }

        if (i > 12 && i <= 20) {
            type = 'club-' + (i - 11);
            return type;

        }

        if (i > 25 && i <= 33) {
            type = 'diamond-' + (i - 24);
            return type;
        }

        if (i > 38 && i <= 46) {
            type = 'heart-' + (i - 37);
            return type;

        }
        switch (i) {
            case 8:
                type = 'spade-' + 10;
                break;
            case 9:
                type = 'spade-' + 'J';
                break;
            case 10:
                type = 'spade-' + 'Q';
                break;

            case 11:
                type = 'spade-' + 'K';
                break;
            case 12:
                type = 'spade-' + 'A';
                break;
            case 21:
                type = 'club-' + '10';
                break;
            case 22:
                type = 'club-' + 'J';
                break;
            case 23:
                type = 'club-' + 'Q';
                break;
            case 24:
                type = 'club-' + 'K';
                break;
            case 25:
                type = 'club-' + 'A';
                break;

            case 34:
                type = 'diamond-' + '10';
                break;
            case 35:
                type = 'diamond-' + 'J';
                break;

            case 36:
                type = 'diamond-' + 'Q';
                break;
            case 37:
                type = 'diamond-' + 'K';
                break;

            case 38:
                type = 'diamond-' + 'A';
                break;
            case 47:
                type = 'heart-' + '10';
                break;
            case 48:
                type = 'heart-' + 'J';
                break;
            case 49:
                type = 'heart-' + 'Q';
                break;
            case 50:
                type = 'heart-' + 'K';
                break;
            case 51:
                type = 'heart-' + 'A';
                break;
        }


        return type;

    },
    setTotal: function(cardvalue1, cardvalue2, location) {

        var that = commonDragon.GameDragon;
        $('.dragon-game-block .location').removeClass('active');
        if (location === 2) {
            commonGame.showNotify(1, 'Rồng');
            $('.dragon-game-block .location.tai').addClass('active');
        } else if ((location === 1)) {
            commonGame.showNotify(1, 'Hổ');
            $('.dragon-game-block .location.xiu').addClass('active');
        } else {
            var txtHoa = new Sprite(TextureCache["dr_hoa.png"]);
            txtHoa.anchor.set(0.5);
            txtHoa.scale.set(0.8);
            txtHoa.position.set(404, 298);
            that.subscribe(txtHoa);
            var objDice = that.mainContainer.getChildByName('diceContainer');
            if (objDice !== undefined && objDice !== null) {
                objDice.addChild(txtHoa);
            }
        }
        $('#dr_Cardvalue1').html(cardvalue1);
        $('#dr_Cardvalue2').html(cardvalue2);
        $('.drcardvalue').show();


    },
    fnRemain: function() {
        var that = commonDragon.GameDragon;
        if (typeof commonDragon.currentSession === 'undefined')
            return;
        var tickWait = commonDragon.currentSession.RemainWaiting;
        var tickBet = commonDragon.currentSession.RemainBetting;

        if (tickWait > 0) {
            tickWait--;
            commonDragon.currentSession.RemainWaiting = tickWait;
            commonDragon.setAllowbet(false);
            that.updateTime(0);
            if (tickWait > 0)
                $(".dr_timewaiting").show();

            $(".dr_timewaiting").html(commonGame.formatTime(tickWait));
            $('#dr_totalcountBetOver').removeClass('bussTxScale');
            $("#dr_totalbetOver").removeClass('bussTxScale');
            $('#dr_totalcountBetUnder').removeClass('bussTxScale');
            $("#dr_totalbetUnder").removeClass('bussTxScale');

            if (tickWait === 1) {
                that.showStart();
                $(".dr_timewaiting").hide();
            }
        } else {
            commonDragon.GameDragon.resetBetAmimation();

            if (tickBet > 0) {
                tickBet--;
                commonDragon.currentSession.RemainBetting = tickBet;
            }

            that.updateTime(tickBet);

            if (tickBet > 5) {
                commonDragon.setAllowbet(true);
                $('#dr_totalcountBetOver').addClass('bussTxScale');
                $("#dr_totalbetOver").addClass('bussTxScale');
                $('#dr_totalcountBetUnder').addClass('bussTxScale');
                $("#dr_totalbetUnder").addClass('bussTxScale');

            } else {
                commonDragon.setAllowbet(false);
                $('#dr_totalcountBetOver').removeClass('bussTxScale');
                $("#dr_totalbetOver").removeClass('bussTxScale');
                $('#dr_totalcountBetUnder').removeClass('bussTxScale');
                $("#dr_totalbetUnder").removeClass('bussTxScale');

            }
            if (tickBet === 0) {
                commonDragon.isBet = false;
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
            $('#dragonsetfastID').hide();
        }

        for (var i = 0; i < str.length; i++) {

            this.bgTime.getChildAt(1).texture = TextureCache['dice_num_' + color + '_' + str[0] + '.png'];
            if (str[0] !== this.bgTime.getChildAt(1).valueTime) {

                this.bgTime.getChildAt(1).position.set(0, -40);
                this.bgTime.getChildAt(1).alpha = 0;
                TweenMax.to(this.bgTime.getChildAt(1), 0.1, {
                    y: 0,
                    alpha: 1,
                    ease: "bounce.out",
                    repeat: 0
                });
                this.bgTime.getChildAt(1).valueTime = str[0];
            }

            this.bgTime.getChildAt(2).texture = TextureCache['dice_num_' + color + '_' + str[1] + '.png'];
            if (str[1] !== this.bgTime.getChildAt(2).valueTime) {
                this.bgTime.getChildAt(2).position.set(76, -40);
                this.bgTime.getChildAt(2).alpha = 0;
                TweenMax.to(this.bgTime.getChildAt(2), 0.1, {
                    y: 0,
                    alpha: 1,
                    ease: "bounce.out",
                    repeat: 0
                });
                this.bgTime.getChildAt(2).valueTime = str[1];
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
        var that = commonDragon.GameDragon;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }

        commonDragon.reset();

        console.log("finish Xocdia:" + commonDragon.gameSession);
        that.deleteTweens();

    },
    resetBetAmimation: function() {
        var that = commonDragon.GameDragon;
        var objDice = that.mainContainer.getChildByName('diceContainer');
        if (objDice !== undefined && objDice !== null) {
            objDice.destroy();
        }
        $('.dragon-game-block .location').removeClass('active');

        $('#dragon .tips').hide();
        $(".dr_timewaiting").hide();
        $('.drcardvalue').hide();
        that.deleteTweens();
    },
    btnTintOver: function() {
        this.filters = [commonDragon.GameDragon.filter];
    },
    btnTintOut: function() {
        this.filters = null;
    },

    btnActive: function(obj) {
        var that = commonDragon.GameDragon;
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
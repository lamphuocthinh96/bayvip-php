window.MiniPoker = window.MiniPoker || {};
window.MiniPoker.MainColum = function() {};
window.MiniPoker.MainColum.prototype = {
    column1: {},
    column2: {},
    column3: {},
    column4: {},
    column5: {},

    timeTween: 0.5,
    timeBack: 0,
    timeDelay: 0,
    mask: null,
    init: function(main) {
        this.column1 = {};
        this.column2 = {};
        this.column3 = {};
        this.column4 = {};
        this.column5 = {};
        this.containerColumn1 = new Container();
        this.containerColumn1.name = "Col1";
        this.containerColumn2 = new Container();
        this.containerColumn2.name = "Col2";
        this.containerColumn3 = new Container();
        this.containerColumn3.name = "Col3";
        this.containerColumn4 = new Container();
        this.containerColumn4.name = "Col4";
        this.containerColumn5 = new Container();
        this.containerColumn5.name = "Col5";
        this.columnContainer = new Container();
        this.columnContainer.name = "columnContainer";

        var opacityMask = new Sprite(TextureCache["minipoker_bgBlur.png"]);
        opacityMask.anchor.set(0.5);
        opacityMask.position.set(400, 229);

        this.mainColum = new Container();

        this.columnContainer.addChild(this.containerColumn1,
            this.containerColumn2,
            this.containerColumn3,
            this.containerColumn4,
            this.containerColumn5);

        this.mainColum.addChild(this.columnContainer, opacityMask);
        main.addChild(this.mainColum);

        this.InitMask();
        this.initSlots();

    },
    InitMask: function() {
        var that = this;
        var mask = new Graphics();
        mask.beginFill('f0220b', 0.2);
        mask.drawRect(0, 0, 661, 172);
        mask.position.set(-72, -86);
        that.columnContainer.addChild(mask);
        that.columnContainer.mask = mask;

    },
    initSlots: function() {
        var that = this;
        var rand;
        that.columnContainer.position.set(142, 230);
        commonMinipoker.useBlur = true;
        that.startPosition = 0;
        that.totalItems = 10;

        var fixRandom = that.getRandomCards();
        var j = 0;
        for (var i = that.totalItems - 1; i >= 0; i--) {
            rand = Math.floor(Math.random() * 51) + 0;
            that.column1[i] = new Sprite(TextureCache[that.getCard(i === that.totalItems - 1 ? fixRandom[0] : rand) +
                (((i > 3 && i < that.totalItems - 3) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"]);
            that.column1[i].anchor.set(0.5);
            that.column1[i].scale.set(1.1);
            that.column1[i].x = 0;
            that.column1[i].y = that.startPosition - j * 172;
            that.containerColumn1.addChild(that.column1[i]);

            rand = Math.floor(Math.random() * 51) + 0;
            that.column2[i] = new Sprite(TextureCache[that.getCard(i === that.totalItems - 1 ? fixRandom[1] : rand) +
                (((i > 3 && i < that.totalItems - 3) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"]);
            that.column2[i].anchor.set(0.5);
            that.column2[i].scale.set(1.1);
            that.column2[i].x = 128;
            that.column2[i].y = that.startPosition - j * 172;

            that.containerColumn2.addChild(that.column2[i]);

            rand = Math.floor(Math.random() * 51) + 0;
            that.column3[i] = new Sprite(TextureCache[that.getCard(i === that.totalItems - 1 ? fixRandom[2] : rand) +
                (((i > 3 && i < that.totalItems - 3) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"]);
            that.column3[i].anchor.set(0.5);
            that.column3[i].scale.set(1.1);

            that.column3[i].x = 128 * 2;
            that.column3[i].y = that.startPosition - j * 172;
            that.containerColumn3.addChild(that.column3[i]);

            rand = Math.floor(Math.random() * 51) + 0;
            that.column4[i] = new Sprite(TextureCache[that.getCard(i === that.totalItems - 1 ? fixRandom[3] : rand) +
                (((i > 3 && i < that.totalItems - 3) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"]);
            that.column4[i].anchor.set(0.5);
            that.column4[i].scale.set(1.1);

            that.column4[i].x = 128 * 3;
            that.column4[i].y = that.startPosition - j * 172;
            that.containerColumn4.addChild(that.column4[i]);

            rand = Math.floor(Math.random() * 51) + 0;
            that.column5[i] = new Sprite(TextureCache[that.getCard(i === that.totalItems - 1 ? fixRandom[4] : rand) +
                (((i > 3 && i < that.totalItems - 3) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"]);
            that.column5[i].anchor.set(0.5);
            that.column5[i].scale.set(1.1);
            that.column5[i].x = 128 * 4;
            that.column5[i].y = that.startPosition - j * 172;
            that.containerColumn5.addChild(that.column5[i]);
            j++;
        }
        that.startHeight = that.column1[0].y;


    },

    changeSlots: function() {
        var that = this;
        var rand;
        that.column1[that.totalItems - 1].alpha = 1;
        that.column2[that.totalItems - 1].alpha = 1;
        that.column3[that.totalItems - 1].alpha = 1;
        that.column4[that.totalItems - 1].alpha = 1;
        that.column5[that.totalItems - 1].alpha = 1;

        for (var i = 0; i < that.totalItems - 1; i++) {
            rand = Math.floor(Math.random() * 51) + 0;
            that.column1[i].texture = TextureCache[that.getCard(rand) +
                (((i > 3 || i === 0) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"];
            rand = Math.floor(Math.random() * 51) + 0;
            that.column2[i].texture = TextureCache[that.getCard(rand) +
                (((i > 3 || i === 0) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"];
            rand = Math.floor(Math.random() * 51) + 0;
            that.column3[i].texture = TextureCache[that.getCard(rand) +
                (((i > 3 || i === 0) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"];
            rand = Math.floor(Math.random() * 51) + 0;
            that.column4[i].texture = TextureCache[that.getCard(rand) +
                (((i > 3 || i === 0) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"];
            rand = Math.floor(Math.random() * 51) + 0;
            that.column5[i].texture = TextureCache[that.getCard(rand) +
                (((i > 3 || i === 0) && commonMinipoker.useBlur) ? "-blur" : "") +
                ".png"];
        }
    },
    startSpin: function(cards, prize, callback) {


        var that = this;
        that.befoSpin();
        that.changeSlots();
        that.column1[1].texture = TextureCache[that.getCard(cards.CardID1) + ".png"];
        that.column2[1].texture = TextureCache[that.getCard(cards.CardID2) + ".png"];
        that.column3[1].texture = TextureCache[that.getCard(cards.CardID3) + ".png"];
        that.column4[1].texture = TextureCache[that.getCard(cards.CardID4) + ".png"];
        that.column5[1].texture = TextureCache[that.getCard(cards.CardID5) + ".png"];
        that.spin(cards, prize, callback);

    },
    befoSpin: function() {
        var that = this;
        var objnoty = that.mainColum.getChildByName('notyfi');
        if (objnoty != null) {
            objnoty.destroy();
        }
    },

    spin: function(cards, prize, callback) {
        var that = this;
        that.pointNext = -170;
        that.pointBack = -172;
        TweenMax.to(that.containerColumn1,
            that.timeTween * commonMinipoker.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0,
                data: "minipoker-move",
                ease: Power0.easeNone,

                onComplete: function() {
                    TweenMax.to(that.containerColumn1,
                        that.timeBack * commonMinipoker.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * commonMinipoker.timeSpeed,
                            data: "minipoker-move",
                            ease: Back.easeOut,
                            onComplete: function() {

                                that.column1[that.totalItems - 1].texture = that.column1[1].texture;
                                that.containerColumn1.y = 0;

                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn2,
            that.timeTween * commonMinipoker.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.1 * commonMinipoker.timeSpeed,
                data: "minipoker-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn2,
                        that.timeBack * commonMinipoker.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * commonMinipoker.timeSpeed,
                            data: "minipoker-move",
                            ease: Back.easeOut,
                            onComplete: function() {

                                that.column2[that.totalItems - 1].texture = that.column2[1].texture;
                                that.containerColumn2.y = 0;

                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn3,
            that.timeTween * commonMinipoker.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.2 * commonMinipoker.timeSpeed,
                data: "minipoker-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn3,
                        that.timeBack * commonMinipoker.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * commonMinipoker.timeSpeed,
                            data: "minipoker-move",
                            ease: Back.easeOut,
                            onComplete: function() {
                                that.column3[that.totalItems - 1].texture = that.column3[1].texture;
                                that.containerColumn3.y = 0;
                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn4,
            that.timeTween * commonMinipoker.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.3 * commonMinipoker.timeSpeed,
                data: "minipoker-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn4,
                        that.timeBack * commonMinipoker.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * commonMinipoker.timeSpeed,
                            data: "minipoker-move",
                            ease: Back.easeOut,
                            onComplete: function() {
                                that.column4[that.totalItems - 1].texture = that.column4[1].texture;
                                that.containerColumn4.y = 0;

                            }
                        });
                }
            });
        TweenMax.to(that.containerColumn5,
            that.timeTween * commonMinipoker.timeSpeed, {
                y: -that.startHeight + that.pointNext,
                delay: 0.4 * commonMinipoker.timeSpeed,
                data: "minipoker-move",
                ease: Power0.easeNone,
                onComplete: function() {

                    TweenMax.to(that.containerColumn5,
                        that.timeBack * commonMinipoker.timeSpeed, {
                            y: -that.startHeight + that.pointBack,
                            delay: that.timeDelay * commonMinipoker.timeSpeed,
                            data: "minipoker-move",
                            ease: Back.easeOut,
                            onComplete: function() {
                                that.column5[that.totalItems - 1].texture = that.column5[1].texture;
                                that.containerColumn5.y = 0;
                                that.completSpin(cards, prize);
                                if (callback != null) {
                                    callback();
                                }
                            }
                        });
                }
            });
    },
    completSpin: function(cards, prize) {


        var that = this;
        var cardTypeId = cards.CardTypeID;
        if (cardTypeId === 13)
            cardTypeId = 2;
        if (cardTypeId === 12)
            cardTypeId = 1;


        if (cardTypeId === 1) {
            var notify = new Container();
            notify.name = 'notyfi';
            var bgNotify = new Sprite(TextureCache["poker_mini_bg_notify.png"]);
            bgNotify.anchor.set(0.5);
            bgNotify.position.set(400, 229);

            var spine = new PIXI.spine.Spine(resources['mini_nohu'].spineData);
            spine.x = 401;
            spine.y = 231;

            spine.scale.set(0.7);
            spine.state.setAnimation(0, 'animation', true);

            var txtJack = new BitmapText('0', {
                font: '50px fontXjact'
            });
            txtJack.name = 'txtJackMinipoker';
            txtJack.anchor.set(0.5);
            txtJack.position.set(397, 298);
            txtJack.visible = false;

            notify.addChild(bgNotify, spine, txtJack);
            that.mainColum.addChild(notify);

            commonMinipoker.playing = true;
            TweenMax.to(txtJack, 2, {
                alpha: 1,
                ease: Linear.easeNone,
                onComplete: function() {
                    commonGame.showVqJackpot(that, 115, 'MiniPoker', cards.CardP1, cards.CardRA, cards.CardPR1);
                }
            });
        } else if (cardTypeId > 1 && cardTypeId < 10) {

            var texture = '';
            switch (cardTypeId) {
                case 2:
                    texture = 'poker_mini_thungphasanh.png';
                    break;
                case 3:
                    texture = 'poker_mini_TUQUY.png';
                    break;
                case 4:
                    texture = 'poker_mini_Culu.png';
                    break;
                case 5:
                    texture = 'poker_mini_THUNG.png';
                    break;
                case 6:
                    texture = 'poker_mini_SANH.png';
                    break;
                case 7:
                    texture = 'poker_mini_XAMCHI.png';
                    break;
                case 8:
                    texture = 'poker_mini_HAIDOI.png';
                    break;
                case 9:
                    texture = 'poker_mini_DOIJ.png';
                    break;
            }

            var notify = new Container();
            notify.name = 'notyfi';
            var bgNotify = new Sprite(TextureCache["poker_mini_bg_notify.png"]);
            bgNotify.anchor.set(0.5);
            bgNotify.position.set(400, 229);

            var lbWin = new Sprite(TextureCache[texture]);
            lbWin.anchor.set(0.5);
            lbWin.position.set(400, 229);
            that.subscribe(lbWin);
            notify.addChild(bgNotify, lbWin);

            var texwin = new Text('+' + commonGame.FormatNumber(prize),
                new PIXI.TextStyle({
                    fontFamily: "Conv_UTM_Swiss",
                    fontSize: 40,
                    fill: ["#ff0", "#ff0"]
                }));
            texwin.anchor.set(0.5);
            texwin.position.set(400, 180);
            that.subscribe(texwin);;

            TweenMax.to(texwin,
                3, {
                    y: 130,

                    ease: Linear.easeNone,
                    onComplete: function() {
                        TweenMax.to(texwin,
                            1, {
                                alpha: 0.3,
                                ease: Linear.easeNone,
                                onComplete: function() {
                                    texwin.destroy();
                                    notify.destroy();
                                }
                            });


                    }
                });
            that.mainColum.addChild(notify, texwin);

        }


    },
    updateTextJack: function(jack) {
        var that = this;

        var obj1 = that.mainColum.getChildByName('notyfi');
        if (obj1 != null) {
            var obj = obj1.getChildByName('txtJackMinipoker');
            if (obj != null) {
                obj.text = commonGame.FormatNumber(jack);
                obj.visible = true;
            }
        }
        commonMinipoker.playing = false;
        libAccount.UpdateBalance(2, jack, 2);
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
    getRandomCards: function() {
        var arr = [];
        for (var i = 0; i < 52; i++) {
            arr.push(i);
        }
        var rand;
        rand = Math.floor(Math.random() * (arr.length - 1));
        var card1 = arr[rand];

        var list;
        list = $.grep(arr, function(v) {
            return v !== card1;
        });

        rand = Math.floor(Math.random() * (list.length - 1));
        var card2 = list[rand];

        list = $.grep(arr, function(v) {
            return v !== card1 && v !== card2;
        });

        rand = Math.floor(Math.random() * (list.length - 1));
        var card3 = list[rand];

        list = $.grep(arr, function(v) {
            return v !== card1 && v !== card2 && v !== card3;
        });

        rand = Math.floor(Math.random() * (list.length - 1));
        var card4 = list[rand];

        list = $.grep(arr, function(v) {
            return v !== card1 && v !== card2 && v !== card3 && v !== card4;
        });

        rand = Math.floor(Math.random() * (list.length - 1));
        var card5 = list[rand];


        return [card1, card2, card3, card4, card5];

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
    }

};




window.MiniPoker.GameX5 = function() {};
window.MiniPoker.GameX5.prototype = {
    game: null,
    stage: null,
    renderer: null,
    create: function() {
        this.initGame();
    },
    initGame: function() {
        this.game = new PIXI.Application(550, 620, {
            antialias: false,
            transparent: true,
            resolution: 1
        });
        $(".minipoker_game_v2x5").append(this.game.view);
        this.mainContainer = new Container();




        this.game.stage.addChild(this.mainContainer);
        this.initColum();


    },

    initColum: function() {

        var container1 = new Container();
        container1.position.set(7, -40);
        container1.scale.set(0.67);
        this.GameX1 = new window.MiniPoker.MainColum();
        this.GameX1.init(container1);



        var container2 = new Container();
        container2.position.set(7, 98);
        container2.scale.set(0.67);
        this.GameX2 = new window.MiniPoker.MainColum();
        this.GameX2.init(container2);


        var container3 = new Container();
        container3.position.set(7, 234);
        container3.scale.set(0.67);
        this.GameX3 = new window.MiniPoker.MainColum();
        this.GameX3.init(container3);


        var container4 = new Container();
        container4.position.set(7, 368);
        container4.scale.set(0.67);
        this.GameX4 = new window.MiniPoker.MainColum();
        this.GameX4.init(container4);

        this.mainContainer.addChild(container1, container2, container3, container4);
    },

    startSpin: function(cards, prize, index) {
        var that = this;

        if (index === 1) {
            this.GameX1.startSpin(cards, prize);
        }
        if (index === 2) {
            this.GameX2.startSpin(cards, prize);
        }
        if (index === 3) {
            this.GameX3.startSpin(cards, prize);
        }
        if (index === 4) {
            this.GameX4.startSpin(cards, prize);
        }
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
    }
};
 window.Kubo = window.Kubo || {};

 window.Kubo.Game = function() {};
 window.Kubo.Game.prototype = {
     game: null,
     stage: null,
     renderer: null,
     column1: {},
     column2: {},
     column3: {},
     lines: [],
     timeSpeed: 1,
     timeTween: 1,
     timeBack: 0.3,
     timeDelay: 0.1,
     create: function() {
         this.initGame();
     },
     initGame: function() {
         var that = this;
         this.game = new PIXI.Application(730, 550, {
             antialias: false,
             transparent: true,
             resolution: 1
         });
         $(".minikubo_game_v2").append(this.game.view);





         this.filter = new PIXI.filters.ColorMatrixFilter();
         this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
         this.filterGray = new PIXI.filters.ColorMatrixFilter();
         this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1.2, 0];



         this.column1 = {};
         this.column2 = {};
         this.column3 = {};
         this.lines = [];
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


         this.mainContainer = new Container();
         this.mainContainer.y = 40;
         this.mainContainer.x = -40;
         this.mainLine = new Container();
         this.mainContainer.addChild(this.mainLine, this.columnContainer);
         this.game.stage.addChild(this.mainContainer);


         this.initLine();
         this.initAsset();
         this.initFrames();
         this.initSlots();
         this.initMask();
     },
     initLine: function() {
         var that = this;
         var lineConfig = [{
                 id: 1,
                 x: 240,
                 y: 142,
                 leftright: 1,
                 left: 161,
                 row: 0
             },
             {
                 id: 2,
                 x: 240,
                 y: 16,
                 leftright: 1,
                 left: 161,
                 row: 4
             },
             {
                 id: 3,
                 x: 240,
                 y: 142,
                 leftright: 1,
                 left: 161,
                 row: 8
             },
             {
                 id: 4,
                 x: -252,
                 y: 162,
                 leftright: 2,
                 left: 655,
                 row: 0
             },
             {
                 id: 5,
                 x: -206,
                 y: -112,
                 leftright: 2,
                 left: 655,
                 row: 8
             },
             {
                 id: 6,
                 x: 240,
                 y: 57,
                 leftright: 1,
                 left: 161,
                 row: 1
             },
             {
                 id: 7,
                 x: -206,
                 y: -83,
                 leftright: 2,
                 left: 655,
                 row: 7
             },
             {
                 id: 8,
                 x: -206,
                 y: 112,
                 leftright: 2,
                 left: 655,
                 row: 1
             },
             {
                 id: 9,
                 x: 240,
                 y: -1,
                 leftright: 1,
                 left: 161,
                 row: 6
             },
             {
                 id: 10,
                 x: -206,
                 y: -61,
                 leftright: 2,
                 left: 655,
                 row: 5
             },
             {
                 id: 11,
                 x: 240,
                 y: -32,
                 leftright: 1,
                 left: 161,
                 row: 7
             },
             {
                 id: 12,
                 x: 240,
                 y: 28,
                 leftright: 1,
                 left: 161,
                 row: 2
             },
             {
                 id: 13,
                 x: 240,
                 y: 35,
                 leftright: 1,
                 left: 161,
                 row: 5
             },
             {
                 id: 14,
                 x: 240,
                 y: 2,
                 leftright: 1,
                 left: 161,
                 row: 3
             },
             {
                 id: 15,
                 x: -206,
                 y: 80,
                 leftright: 2,
                 left: 655,
                 row: 3
             },
             {
                 id: 16,
                 x: -206,
                 y: 27,
                 leftright: 2,
                 left: 655,
                 row: 2
             },
             {
                 id: 17,
                 x: 240,
                 y: -80,
                 leftright: 1,
                 left: 161,
                 row: 9
             },
             {
                 id: 18,
                 x: -206,
                 y: -81,
                 leftright: 2,
                 left: 655,
                 row: 6
             },
             {
                 id: 19,
                 x: -206,
                 y: -85,
                 leftright: 2,
                 left: 655,
                 row: 9
             },
             {
                 id: 20,
                 x: -206,
                 y: 17,
                 leftright: 2,
                 left: 655,
                 row: 4
             }

         ];
         var i;
         for (i = 0; i < lineConfig.length; i++) {
             var containLine = new Container();
             var line = new Sprite(TextureCache['mini_candy_line_normal' + lineConfig[i].leftright + '.png']);
             line.name = lineConfig[i].leftright;
             line.lineID = lineConfig[i].id;
             line.anchor.set(0.5);
             line.position.set(lineConfig[i].left, 115 + lineConfig[i].row * 34);
             var number = new Text(lineConfig[i].id,
                 new PIXI.TextStyle({
                     fontFamily: "Conv_UTM_Swiss_Condensed",
                     fontSize: 18,
                     fill: ["#ffffff", "#ffffff"]
                 }));
             number.anchor.set(0.5);
             number.position.set(0, 0);
             line.addChild(number);
             var obj = new Sprite(TextureCache['mini_candy_l' + lineConfig[i].id + '.png']);
             obj.anchor.set(0.5);

             obj.position.set(400, 270);
             obj.visible = false;
             containLine.addChild(line, obj);
             that.lines.push(containLine);
             that.mainLine.addChild(containLine);
             that.subscribe(obj);

         }
         that.mainLine.scale.set(0.9);
         that.mainLine.position.set(50, 22);


     },
     initMask: function() {
         var that = this;
         var mask = new Graphics();
         mask.beginFill('f0220b', 0.2);
         mask.drawRect(0, 0, 500, 312);
         mask.position.set(-77, -266);
         that.columnContainer.addChild(mask);
         that.columnContainer.mask = mask;


     },
     initSlots: function() {
         var that = this;
         var rand, itemSpine;
         that.columnContainer.position.set(285, 376);


         that.startPosition = 0;
         that.totalItems = 20;

         var j = 0;
         for (var i = that.totalItems - 1; i >= 0; i--) {
             rand = Math.floor(Math.random() * 6) + 1;
             that.column1[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column1[i].anchor.set(0.5);
             that.column1[i].x = 0;
             that.column1[i].y = that.startPosition - j * 106;
             that.getItemSpine(that.column1[i], rand, (i > 3 && i < that.totalItems - 3));

             that.containerColumn1.addChild(that.column1[i]);

             rand = Math.floor(Math.random() * 6) + 1;
             that.column2[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column2[i].anchor.set(0.5);

             that.column2[i].x = 130;
             that.column2[i].y = that.startPosition - j * 106;
             that.getItemSpine(that.column2[i], rand, (i > 3 && i < that.totalItems - 3));

             that.containerColumn2.addChild(that.column2[i]);

             rand = Math.floor(Math.random() * 6) + 1;
             that.column3[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column3[i].anchor.set(0.5);


             that.column3[i].x = 130 * 2;
             that.column3[i].y = that.startPosition - j * 106;

             that.getItemSpine(that.column3[i], rand, (i > 3 && i < that.totalItems - 3));
             that.containerColumn3.addChild(that.column3[i]);
             j++;
         }

         that.startHeight = that.column1[0].y;
         that.subscribe(that.containerColumn2);

     },
     changeSlots: function() {
         var that = this;
         var rand;
         var item;
         for (var i = 0; i < that.totalItems - 3; i++) {
             rand = Math.floor(Math.random() * 6) + 1;
             that.column1[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column1[i], rand, (i > 3 || i === 0));


             rand = Math.floor(Math.random() * 6) + 1;
             that.column2[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column2[i], rand, (i > 3 || i === 0));


             rand = Math.floor(Math.random() * 6) + 1;
             that.column3[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column3[i], rand, (i > 3 || i === 0));
         }


     },
     getItem: function(id, isblur) {

         if (isblur) {
             return 'mini_kubo_item_' + id + '_blur' + '.png';
         } else {
             if (id === 0 || id === '0') {
                 return 'mini_kubo_item_bg_item.png';
             } else {

                 return 'mini_kubo_item_' + id + '.png';
             }
         }
     },
     getItemSpine: function(obj, id, isblur) {
         if (!isblur) {
             if (obj.children.length > 0) {
                 obj.getChildAt(0).destroy();
             }
             if (id === 0 || id === '0') {
                 var spine = new PIXI.spine.Spine(resources['item_wild_' + id].spineData);
                 spine.x = 0;
                 spine.y = 0;
                 spine.scale.set(0.75);
                 spine.state.setAnimation(0, 'animation', true);
                 obj.addChild(spine);
             }
         }

     },

     initAsset: function() {
         var that = this;

         $('#Kubo .mini_close').unbind('click').click(function() {
             commonKubo.hideGUI();
         });


         $('#Kubo .mini_help').unbind('click').click(function() {
             commonKubo.showGuide();
         });


         $('#Kubo .mini_rank').unbind('click').click(function() {
             commonKubo.showRank();
         });


         $('#Kubo .mini_history').unbind('click').click(function() {
             commonKubo.showHistory();
         });





         $('#Kubo .room100').unbind('click').click(function() {
             if (commonKubo.playing)
                 return;
             $('#kubo_room div').removeClass('active');
             $('#kubo .room100').addClass('active');
             commonKubo.ChangeBetValue(100, 1);

         });



         $('#Kubo .room1K').unbind('click').click(function() {
             if (commonKubo.playing)
                 return;
             $('#kubo_room div').removeClass('active');
             $('#Kubo .room1K').addClass('active');
             commonKubo.ChangeBetValue(1000, 2);
         });

         $('#Kubo .room10K').unbind('click').click(function() {
             if (commonKubo.playing)
                 return;
             $('#kubo_room div').removeClass('active');
             $('#Kubo .room10K').addClass('active');
             commonKubo.ChangeBetValue(10000, 3);
         });


         $('#Kubo .room5K').unbind('click').click(function() {
             if (commonKubo.playing)
                 return;
             $('#kubo_room div').removeClass('active');
             $('#kubo .room5K').addClass('active');
             commonKubo.ChangeBetValue(5000, 4);
         });











         $('#Kubo .btn_auto').unbind('click').click(function() {
             if (commonKubo.isAuto) {
                 commonKubo.isAuto = false;
                 $('#Kubo .btn_auto').removeClass('active');
             } else {
                 $('#Kubo .btn_auto').addClass('active');
                 commonKubo.isAuto = true;

                 if (commonKubo.playing)
                     return;
                 commonKubo.spins();
                 that.disableButton();
             }
         });

         $('#Kubo .btn_sieutoc').unbind('click').click(function() {
             that.mouseDonwSpinSpeed();
         });



         $('#Kubo .btn_spin').unbind('click').click(function() {
             that.mouseDonwSpin();
         });

         $('#Kubo .btn_line').unbind('click').click(function() {
             commonKubo.chondong();
         });






     },
     initFrames: function() {

         this.framesItems = [];



     },
     mouseDonwSpin: function() {
         var that = commonKubo.GameKubo;
         if (commonKubo.playing)
             return;
         that.disableButton();
         commonKubo.spins();

     },
     mouseDonwSpinSpeed: function() {
         var that = commonKubo.GameKubo;

         if (that.timeSpeed === 1) {
             $('#Kubo .btn_sieutoc').addClass('active');
             that.timeSpeed = 0.5;
             if (commonKubo.playing)
                 return;
             commonKubo.spins();
             that.disableButton();
         } else {
             $('#Kubo .btn_sieutoc').removeClass('active');
             that.timeSpeed = 1;
         }


     },


     beforeSpin: function() {
         var that = this;
         var objeffect = that.mainContainer.getChildByName('effect_kubo');
         if (objeffect != null) {
             objeffect.destroy();
         }
         that.resetLines();
         clearTimeout(commonKubo.timeOutEachLine);
         clearTimeout(commonKubo.timeIntEachLine);
         clearTimeout(commonKubo.timeSpin);
     },

     startSpin: function(result) {
         var that = this;
         libAccount.UpdateBalance(2, -result.TotalBetValue, 2);
         that.beforeSpin();
         that.changeSlots();
         var arraySlotData = result.SlotData.split(',');
         that.column1[1].texture = TextureCache[that.getItem(arraySlotData[0], false)];
         that.column1[1].inx = parseInt(arraySlotData[0]);
         that.column1[2].texture = TextureCache[that.getItem(arraySlotData[3], false)];
         that.column1[2].inx = parseInt(arraySlotData[3]);
         that.column1[3].texture = TextureCache[that.getItem(arraySlotData[6], false)];
         that.column1[3].inx = parseInt(arraySlotData[6]);
         that.getItemSpine(that.column1[1], arraySlotData[0], false);
         that.getItemSpine(that.column1[2], arraySlotData[3], false);
         that.getItemSpine(that.column1[3], arraySlotData[6], false);

         that.column2[1].texture = TextureCache[that.getItem(arraySlotData[1], false)];
         that.column2[1].inx = parseInt(arraySlotData[1]);
         that.column2[2].texture = TextureCache[that.getItem(arraySlotData[4], false)];
         that.column2[2].inx = parseInt(arraySlotData[4]);
         that.column2[3].texture = TextureCache[that.getItem(arraySlotData[7], false)];
         that.column2[3].inx = parseInt(arraySlotData[7]);

         that.getItemSpine(that.column2[2], arraySlotData[4], false);
         that.getItemSpine(that.column2[1], arraySlotData[1], false);
         that.getItemSpine(that.column2[3], arraySlotData[7], false);

         that.column3[1].texture = TextureCache[that.getItem(arraySlotData[2], false)];
         that.column3[1].inx = parseInt(arraySlotData[2]);
         that.column3[2].texture = TextureCache[that.getItem(arraySlotData[5], false)];
         that.column3[2].inx = parseInt(arraySlotData[5]);
         that.column3[3].texture = TextureCache[that.getItem(arraySlotData[8], false)];
         that.column3[3].inx = parseInt(arraySlotData[8]);

         that.getItemSpine(that.column3[2], arraySlotData[5], false);
         that.getItemSpine(that.column3[1], arraySlotData[2], false);
         that.getItemSpine(that.column3[3], arraySlotData[8], false);

         that.containerColumn1.y = 0;
         that.containerColumn2.y = 0;
         that.containerColumn3.y = 0;


         var listPrizeData = [];
         commonKubo.listLine = [];
         if (result.PrizesData != '') {
             listPrizeData = result.PrizesData.split(";");
         }

         if (listPrizeData.length > 0) {
             for (var i = 0; i < listPrizeData.length; i++) {
                 commonKubo.listLine.push(parseInt(listPrizeData[i].split(",")[0]));
             }
         }


         that.spin(result);
     },
     spin: function(result) {
         var that = this;
         that.pointNext = -300;
         that.pointBack = -318;
         TweenMax.to(that.containerColumn1,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0,
                 data: "kubo-move",
                 ease: Power0.easeNone,
                 onComplete: function() {
                     TweenMax.to(that.containerColumn1,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "kubo-move",
                             ease: Back.easeOut,
                             onComplete: function() {

                                 that.column1[that.totalItems - 3].texture = that.column1[1].texture;
                                 that.column1[that.totalItems - 2].texture = that.column1[2].texture;
                                 that.column1[that.totalItems - 1].texture = that.column1[3].texture;

                                 that.getItemSpine(that.column1[that.totalItems - 3], that.column1[1].inx, false);
                                 that.getItemSpine(that.column1[that.totalItems - 2], that.column1[2].inx, false);
                                 that.getItemSpine(that.column1[that.totalItems - 1], that.column1[3].inx, false);


                             }
                         });
                 }
             });
         TweenMax.to(that.containerColumn2,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0.3 * that.timeSpeed,
                 data: "kubo-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn2,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "kubo-move",
                             ease: Back.easeOut,
                             onComplete: function() {
                                 that.column2[that.totalItems - 3].texture = that.column2[1].texture;
                                 that.column2[that.totalItems - 2].texture = that.column2[2].texture;
                                 that.column2[that.totalItems - 1].texture = that.column2[3].texture;

                                 that.getItemSpine(that.column2[that.totalItems - 3], that.column2[1].inx, false);
                                 that.getItemSpine(that.column2[that.totalItems - 2], that.column2[2].inx, false);
                                 that.getItemSpine(that.column2[that.totalItems - 1], that.column2[3].inx, false);

                             }
                         });
                 }
             });
         TweenMax.to(that.containerColumn3,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0.6 * that.timeSpeed,
                 data: "kubo-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn3,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "kubo-move",
                             ease: Back.easeOut,
                             onComplete: function() {
                                 that.column3[that.totalItems - 3].texture = that.column3[1].texture;
                                 that.column3[that.totalItems - 2].texture = that.column3[2].texture;
                                 that.column3[that.totalItems - 1].texture = that.column3[3].texture;

                                 that.getItemSpine(that.column3[that.totalItems - 3], that.column3[1].inx, false);
                                 that.getItemSpine(that.column3[that.totalItems - 2], that.column3[2].inx, false);
                                 that.getItemSpine(that.column3[that.totalItems - 1], that.column3[3].inx, false);
                                 that.completSpin(result);
                             }
                         });
                 }
             });


     },
     completSpin: function(result) {
         var that = this;
         commonKubo.playing = false;
         that.normalWinOrJackPotOrBigWin(result);
     },

     effect: function(id, result) {
         var that = this;
         var containerEffect = new Container();
         that.mainContainer.addChild(containerEffect);
         containerEffect.name = 'effect_kubo';
         if (id === 1) {

             var spine = new PIXI.spine.Spine(resources['mini_nohu'].spineData);
             spine.x = 413;
             spine.y = 270;
             spine.scale.set(0.7);
             spine.state.setAnimation(0, 'animation', true);


             var txtJack = new BitmapText('0', {
                 font: '50px fontXjact'
             });
             txtJack.name = 'txtJackKubo';
             txtJack.anchor.set(0.5);
             txtJack.position.set(397, 338);
             txtJack.visible = false;
             containerEffect.addChild(spine, txtJack);



             TweenMax.to(txtJack, 2, {
                 alpha: 1,
                 ease: Linear.easeNone,
                 onComplete: function() {
                     commonGame.showVqJackpot(that, 225, 'Kubo', result.JackpotPrizeCurr, result.JackpotRateCurr, result.JackpotPrizeRateCurr);
                 }
             });



         } else if (id === 2) {

             var text_bigwin = new Sprite(TextureCache["mini_candy_bigwin.png"]);
             text_bigwin.anchor.set(0.5);
             text_bigwin.position.set(407, 254);

             var moneybig = new BitmapText('0', {
                 font: '50px fontCandy'
             });

             moneybig.anchor.set(0.5);
             moneybig.position.set(404, 322);
             that.countNumber(moneybig, true, false, 0, result.TotalPrizeValue, 0, 1);

             new TimelineMax().to(text_bigwin.scale, 0.5, {
                     x: 1.2,
                     y: 1.2
                 })
                 .to(text_bigwin.scale, 0.5, {
                     x: 1,
                     y: 1
                 })
                 .repeat(-1);

             that.subscribe(text_bigwin);
             containerEffect.addChild(text_bigwin, moneybig);


         } else {
             var moneyNormal = new BitmapText('0', {
                 font: '45px fontCandy'
             });
             moneyNormal.anchor.set(0.5);
             moneyNormal.position.set(404, 322);
             that.countNumber(moneyNormal, true, false, 0, result.TotalPrizeValue, 0, 1);
             TweenMax.to(moneyNormal, 1, {
                 ease: Linear.easeNone,
                 onComplete: function() {
                     TweenMax.to(moneyNormal, 1, {
                         y: 300,
                         alpha: 0.3,
                         ease: Linear.easeNone,
                         onComplete: function() {
                             containerEffect.destroy();
                         }
                     });
                 }
             });
             containerEffect.addChild(moneyNormal);

         }
     },
     updateTextJack: function(jack) {
         var that = this;
         var obj1 = that.mainContainer.getChildByName('effect_kubo');
         if (obj1 != null) {
             var obj = obj1.getChildByName('txtJackKubo');
             if (obj != null) {
                 obj.text = commonGame.FormatNumber(jack);
                 obj.visible = true;
             }
         }
         commonKubo.playing = false;
         libAccount.UpdateBalance(2, jack, 2);
     },
     normalWinOrJackPotOrBigWin: function(result) {
         var that = this;
         if (result.TotalPrizeValue > 0) {
             commonGame.showNotify(3, result.TotalPrizeValue);

             that.resetLines();
             for (var i = 0; i < commonKubo.listLine.length; i++) {
                 that.showLineId(commonKubo.listLine[i]);
             }
             if (result.IsJackpot) {
                 commonKubo.playing = true;
                 that.effect(1, result);
                 that.enableButton();
                 that.resetLines();

             } else if (result.TotalPrizeValue >= 10 * result.TotalBetValue) {
                 that.effect(2, result);
                 commonKubo.timeSpin = setTimeout(function() {
                     if (commonKubo.isAuto) {
                         if (commonKubo.playing)
                             return;
                         that.disableButton();
                         commonKubo.spins();

                         return;
                     }

                     that.enableButton();
                 }, 2500);
                 commonKubo.timeOutEachLine = setTimeout(that.showEachLine, 1000);
             } else {
                 that.effect(3, result);
                 commonKubo.timeSpin = setTimeout(function() {
                     if (commonKubo.isAuto) {
                         if (commonKubo.playing)
                             return;
                         that.disableButton();
                         commonKubo.spins();

                         return;
                     }

                     that.enableButton();
                 }, 1000);
                 commonKubo.timeOutEachLine = setTimeout(that.showEachLine, 1000);
             }


         } else {
             if (commonKubo.isAuto) {
                 if (commonKubo.playing)
                     return;
                 that.disableButton();
                 commonKubo.spins();

                 return;
             }


             that.enableButton();
         }

         if (!result.IsJackpot) {
             libAccount.UpdateBalance(2, result.Balance);
         }
     },

     showEachLine: function() {
         var that = commonKubo.GameKubo;
         clearTimeout(commonKubo.timeOutEachLine);
         var lineCount = commonKubo.listLine.length;
         var i = 0;
         if (lineCount === 0) {
             clearTimeout(commonKubo.timeIntEachLine);
             return;
         }
         commonKubo.timeIntEachLine = setInterval(function() {
             if (commonKubo.playing) {
                 clearTimeout(commonKubo.timeIntEachLine);
                 return;
             }

             that.resetLines();
             that.showLineId(commonKubo.listLine[i]);
             i++;
             if (i === lineCount) {
                 clearTimeout(commonKubo.timeIntEachLine);
                 setTimeout(function() {
                         that.resetLines();
                     },
                     1000);
             }
         }, 1000);
     },
     disableButton: function() {
         var that = this;
         $('#Kubo .btn_spin').addClass('disable');
     },

     enableButton: function() {
         var that = this;
         $('#Kubo .btn_spin').removeClass('disable');
         $('#Kubo .btn_sieutoc').removeClass('active');
         that.timeSpeed = 1;
     },
     resetLines: function() {
         var that = this;
         for (var i = 0; i < that.lines.length; i++) {
             var line = that.lines[i];

             line.getChildAt(0).texture = TextureCache['mini_candy_line_normal' + line.getChildAt(0).name + '.png'];
             line.getChildAt(1).visible = false;

         }
     },

     showLineId: function(id) {
         var that = this;
         var line = that.lines[id - 1];
         line.getChildAt(0).texture = TextureCache['mini_candy_line_active' + line.getChildAt(0).name + '.png'];
         line.getChildAt(1).visible = true;
     },




     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },
     btnTintOver: function() {
         this.filters = [commonKubo.GameKubo.filter];
     },
     btnTintOut: function() {
         this.filters = null;
     },
     btnActive: function(obj) {
         var that = commonKubo.GameKubo;
         obj.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerupoutside", that.btnTintOut).on("pointerup", that.btnTintOut);;
         obj.interactive = true;
         obj.buttonMode = true;

     },
     btnMouseLine: function(obj) {

         obj.interactive = true;
         obj.on('pointerup', function() {
                 obj.texture = TextureCache['mini_candy_line_normal' + obj.name + '.png'];
                 obj.getChildAt(1).visible = false;
             })
             .on('pointerout', function() {
                 obj.texture = TextureCache['mini_candy_line_normal' + obj.name + '.png'];
                 obj.getChildAt(1).visible = false;
             })
             .on('pointerupoutside', function() {
                 obj.texture = TextureCache['mini_candy_line_normal' + obj.name + '.png'];
                 obj.getChildAt(1).visible = false;
             })
             .on('pointerover', function() {
                 obj.texture = TextureCache['mini_candy_line_active' + obj.name + '.png'];
                 obj.getChildAt(1).visible = true;
             });



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
             if (all[i].data === "kubo-effect" || all[i].data === "kubo-scale" || all[i].data === "kubo-move")
                 all[i].kill();
         }
     },
 };
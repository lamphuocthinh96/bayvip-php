 window.Monster = window.Monster || {};

 window.Monster.Game = function() {};
 window.Monster.Game.prototype = {
     game: null,
     stage: null,
     renderer: null,
     column1: {},
     column2: {},
     column3: {},
     column4: {},
     column5: {},
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
         this.game = new PIXI.Application(760, 470, {
             antialias: false,
             transparent: true,
             resolution: 1
         });
         $(".minimonster_game_v2").append(this.game.view);



         this.filter = new PIXI.filters.ColorMatrixFilter();
         this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
         this.filterGray = new PIXI.filters.ColorMatrixFilter();
         this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1.2, 0];



         this.column1 = {};
         this.column2 = {};
         this.column3 = {};
         this.column4 = {};
         this.column5 = {};

         this.lines = [];
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

         this.columnContainerRight = new Container();
         this.columnContainerRight.name = "columnContainerRight";


         this.columnContainer.addChild(this.containerColumn1,
             this.containerColumn2,
             this.containerColumn3);


         this.columnContainerRight.addChild(this.containerColumn4, this.containerColumn5);
         this.mainContainer = new Container();
         this.mainContainer.y = -20;
         this.mainContainer.x = -20;
         this.mainLine = new Container();
         this.mainContainer.addChild(this.columnContainer, this.columnContainerRight, this.mainLine);
         this.game.stage.addChild(this.mainContainer);



         that.initLine();
         that.initAsset();

         that.initSlots();
         that.initMask();







     },
     initLine: function() {
         var that = this;

         that.lines = [];

         var i;
         for (i = 1; i < 28; i++) {
             var line = new Sprite(TextureCache['mini_monster_line' + i + '.png']);
             line.lineID = i;
             line.anchor.set(0.5);
             line.position.set(325, 265);

             line.visible = false;
             that.lines.push(line);
             that.mainLine.addChild(line);

         }


     },
     initMask: function() {


         var that = this;
         var mask = new Graphics();
         mask.beginFill('f0220b', 0.2);
         mask.drawRect(0, 0, 500, 269);
         mask.position.set(-63, -224);
         that.columnContainer.addChild(mask);
         that.columnContainer.mask = mask;
         that.subscribe(mask);
         var mask1 = new Graphics();
         mask1.beginFill(0x650A5A, 0.25);
         mask1.drawRoundedRect(50, 400, 155, 223, 30);
         mask1.endFill();
         mask1.position.set(22, -604);
         that.columnContainerRight.addChild(mask1);
         that.columnContainerRight.mask = mask1;



     },
     initSlots: function() {
         var that = this;
         var rand;
         that.columnContainer.position.set(220, 353);
         that.columnContainerRight.position.set(425, 353);

         that.startPosition = 0;
         that.totalItems = 20;

         var j = 0;
         for (var i = that.totalItems - 1; i >= 0; i--) {
             rand = Math.floor(Math.random() * 5) + 6;
             that.column1[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column1[i].anchor.set(0.5);
             that.column1[i].x = 0;
             that.column1[i].y = that.startPosition - j * 92;
             that.getItemSpine(that.column1[i], rand, (i > 3 && i < that.totalItems - 3));

             that.containerColumn1.addChild(that.column1[i]);



             rand = Math.floor(Math.random() * 5) + 6;
             that.column2[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column2[i].anchor.set(0.5);
             that.column2[i].x = 110;
             that.column2[i].y = that.startPosition - j * 92;
             that.getItemSpine(that.column2[i], rand, (i > 3 && i < that.totalItems - 3));
             that.containerColumn2.addChild(that.column2[i]);

             rand = Math.floor(Math.random() * 5) + 6;
             that.column3[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column3[i].anchor.set(0.5);
             that.column3[i].x = 218;
             that.column3[i].y = that.startPosition - j * 92;
             that.getItemSpine(that.column3[i], rand, (i > 3 && i < that.totalItems - 3));
             that.containerColumn3.addChild(that.column3[i]);



             rand = that.randomX();
             that.column4[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column4[i].anchor.set(0.5);
             that.column4[i].x = 110;
             that.column4[i].y = that.startPosition - j * 92;
             that.getItemSpine(that.column4[i], rand, (i > 3 && i < that.totalItems - 3));
             that.containerColumn4.addChild(that.column4[i]);

             rand = that.randomX();
             that.column5[i] = new Sprite(TextureCache[that.getItem(rand, (i > 3 && i < that.totalItems - 3))]);
             that.column5[i].anchor.set(0.5);
             that.column5[i].x = 191;
             that.column5[i].y = that.startPosition - j * 92;
             that.getItemSpine(that.column5[i], rand, (i > 3 && i < that.totalItems - 3));
             that.containerColumn5.addChild(that.column5[i]);




             j++;
         }

         that.startHeight = that.column1[0].y;


     },
     changeSlots: function() {
         var that = this;
         var rand;
         var item;
         for (var i = 0; i < that.totalItems - 3; i++) {
             rand = Math.floor(Math.random() * 5) + 6;
             that.column1[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column1[i], rand, (i > 3 || i === 0));


             rand = Math.floor(Math.random() * 5) + 6;
             that.column2[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column2[i], rand, (i > 3 || i === 0));


             rand = Math.floor(Math.random() * 5) + 6;
             that.column3[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column3[i], rand, (i > 3 || i === 0));



             rand = that.randomX();
             that.column4[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column4[i], rand, (i > 3 || i === 0));


             rand = that.randomX();
             that.column5[i].texture = TextureCache[that.getItem(rand, (i > 3 || i === 0))];
             that.getItemSpine(that.column5[i], rand, (i > 3 || i === 0));
         }


     },
     randomX: function() {
         var arr = [0, 3, 4, 5, 0, 0, 5, 0, 5, 3, 4, 5, 0, 0, 5, 4, 4, 3];
         var random_number = Math.floor(Math.random() * 15) + 1;

         if (arr[random_number - 1] === 0)
             return 10;
         return arr[random_number - 1];
     },
     getItem: function(id, isblur) {
         id = parseInt(id);

         if (id === 0)
             id = 10;


         if (isblur) {
             return 'mini_monster_item_' + id + '_blur' + '.png';
         } else {
             if (id === 7 || id === '7') {
                 return 'mini_monster_item_bg_item.png';
             } else {

                 return 'mini_monster_item_' + id + '.png';
             }
         }
     },
     getItemSpine: function(obj, id, isblur) {

         id = parseInt(id);

         if (id === 0)
             id = 10;

         if (!isblur) {
             if (obj.children.length > 0) {
                 obj.getChildAt(0).destroy();
             }
             if (id === 7 || id === '7') {
                 var spine = new PIXI.spine.Spine(resources['monster_cao'].spineData);
                 spine.x = 0;
                 spine.y = 0;
                 spine.scale.set(0.7);
                 spine.timeScale = 0.5;
                 spine.state.setAnimation(0, 'animation', true);
                 obj.addChild(spine);
             }
         }

     },

     initAsset: function() {
         var that = this;


         $('#monster .mini_close').unbind('click').click(function() {
             commonMonster.hideGUI();
         });


         $('#monster .mini_help').unbind('click').click(function() {
             commonMonster.showGuide();
         });


         $('#monster .mini_rank').unbind('click').click(function() {
             commonMonster.showRank();
         });


         $('#monster .mini_history').unbind('click').click(function() {
             commonMonster.showHistory();
         });







         $('#monster .room100').unbind('click').click(function() {

             if (commonMonster.playing)
                 return;
             $('#monster_room div').removeClass('active');
             $('#monster .room100').addClass('active');
             commonMonster.changeBetValue(100, 1);

         });



         $('#monster .room1K').unbind('click').click(function() {

             if (commonMonster.playing)
                 return;
             $('#monster_room div').removeClass('active');
             $('#monster .room1K').addClass('active');
             commonMonster.changeBetValue(1000, 2);
         });

         $('#monster .room10K').unbind('click').click(function() {

             if (commonMonster.playing)
                 return;
             $('#monster_room div').removeClass('active');
             $('#monster .room10K').addClass('active');
             commonMonster.changeBetValue(10000, 3);
         });


         $('#monster .room5K').unbind('click').click(function() {

             if (commonMonster.playing)
                 return;
             $('#monster_room div').removeClass('active');
             $('#monster .room5K').addClass('active');
             commonMonster.changeBetValue(5000, 4);
         });




         $('#monster .btn_auto').unbind('click').click(function() {
             if (commonMonster.isAuto) {
                 commonMonster.isAuto = false;
                 $('#monster .btn_auto').removeClass('active');
             } else {
                 $('#monster .btn_auto').addClass('active');
                 commonMonster.isAuto = true;

                 if (commonMonster.playing)
                     return;
                 that.disableButton();
                 commonMonster.spins();


             }
         });



         $('#monster .btn_sieutoc').unbind('click').click(function() {
             that.mouseDonwSpinSpeed();
         });



         $('#monster .btn_spin').unbind('click').click(function() {
             that.mouseDonwSpin();
         });





         var bgclip = new Sprite(TextureCache["mini_monster__clip.png"]);
         bgclip.anchor.set(0.5);
         bgclip.position.set(575, 259);

         this.mainContainer.addChild(bgclip);
     },
     initFrames: function() {

         this.framesItems = [];



     },
     mouseDonwSpin: function(obj) {
         var that = commonMonster.GameMonster;
         if (commonMonster.playing)
             return;
         that.timeSpeed = 1;
         that.disableButton();
         commonMonster.spins();

     },
     mouseDonwSpinSpeed: function(obj) {
         var that = commonMonster.GameMonster;
         if (that.timeSpeed === 1) {
             $('#monster .btn_sieutoc').addClass('active');
             that.timeSpeed = 0.5;
             if (commonMonster.playing)
                 return;
             that.disableButton();
             commonMonster.spins();


         } else {
             $('#monster .btn_sieutoc').removeClass('active');
             that.timeSpeed = 1;
         }




     },



     beforeSpin: function() {
         var that = this;
         var objeffect = that.mainContainer.getChildByName('effect_monster');
         if (objeffect != null) {
             objeffect.destroy();
         }
         that.resetLines();
         clearTimeout(commonMonster.timeOutEachLine);
         clearTimeout(commonMonster.timeIntEachLine);
         clearTimeout(commonMonster.timeSpin);

     },
     startSpin: function(result) {

         libAccount.UpdateBalance(2, -result.TotalBetValue, 2);

         var that = this;
         that.beforeSpin();
         that.changeSlots();
         var arraySlotData = result.SlotsData.split(',');
         that.column1[1].texture = TextureCache[that.getItem(arraySlotData[0], false)];
         that.column1[1].inx = parseInt(arraySlotData[0]);
         that.column1[2].texture = TextureCache[that.getItem(arraySlotData[1], false)];
         that.column1[2].inx = parseInt(arraySlotData[1]);
         that.column1[3].texture = TextureCache[that.getItem(arraySlotData[2], false)];
         that.column1[3].inx = parseInt(arraySlotData[2]);
         that.getItemSpine(that.column1[1], arraySlotData[0], false);
         that.getItemSpine(that.column1[2], arraySlotData[1], false);
         that.getItemSpine(that.column1[3], arraySlotData[2], false);

         that.column2[1].texture = TextureCache[that.getItem(arraySlotData[3], false)];
         that.column2[1].inx = parseInt(arraySlotData[3]);
         that.column2[2].texture = TextureCache[that.getItem(arraySlotData[4], false)];
         that.column2[2].inx = parseInt(arraySlotData[4]);
         that.column2[3].texture = TextureCache[that.getItem(arraySlotData[5], false)];
         that.column2[3].inx = parseInt(arraySlotData[5]);

         that.getItemSpine(that.column2[1], arraySlotData[3], false);
         that.getItemSpine(that.column2[2], arraySlotData[4], false);
         that.getItemSpine(that.column2[3], arraySlotData[5], false);

         that.column3[1].texture = TextureCache[that.getItem(arraySlotData[6], false)];
         that.column3[1].inx = parseInt(arraySlotData[6]);
         that.column3[2].texture = TextureCache[that.getItem(arraySlotData[7], false)];
         that.column3[2].inx = parseInt(arraySlotData[7]);
         that.column3[3].texture = TextureCache[that.getItem(arraySlotData[8], false)];
         that.column3[3].inx = parseInt(arraySlotData[8]);

         that.getItemSpine(that.column3[1], arraySlotData[6], false);
         that.getItemSpine(that.column3[2], arraySlotData[7], false);
         that.getItemSpine(that.column3[3], arraySlotData[8], false);


         that.column4[1].texture = TextureCache[that.getItem(arraySlotData[9], false)];
         that.column4[1].inx = parseInt(arraySlotData[9]);
         that.column4[2].texture = TextureCache[that.getItem(arraySlotData[10], false)];
         that.column4[2].inx = parseInt(arraySlotData[10]);
         that.column4[3].texture = TextureCache[that.getItem(arraySlotData[11], false)];
         that.column4[3].inx = parseInt(arraySlotData[11]);

         that.getItemSpine(that.column4[1], arraySlotData[9], false);
         that.getItemSpine(that.column4[2], arraySlotData[10], false);
         that.getItemSpine(that.column4[3], arraySlotData[11], false);


         that.column5[1].texture = TextureCache[that.getItem(arraySlotData[12], false)];
         that.column5[1].inx = parseInt(arraySlotData[12]);
         that.column5[2].texture = TextureCache[that.getItem(arraySlotData[13], false)];
         that.column5[2].inx = parseInt(arraySlotData[13]);
         that.column5[3].texture = TextureCache[that.getItem(arraySlotData[14], false)];
         that.column5[3].inx = parseInt(arraySlotData[14]);

         that.getItemSpine(that.column5[1], arraySlotData[12], false);
         that.getItemSpine(that.column5[2], arraySlotData[13], false);
         that.getItemSpine(that.column5[3], arraySlotData[14], false);




         that.containerColumn1.y = 0;
         that.containerColumn2.y = 0;
         that.containerColumn3.y = 0;
         that.containerColumn4.y = 0;
         that.containerColumn5.y = 0;

         var listPrizeData = [];
         commonMonster.listLine = [];
         if (result.PositionData !== '') {
             listPrizeData = result.PositionData.split(",");
         }

         if (listPrizeData.length > 0) {
             for (var i = 0; i < listPrizeData.length - 1; i++) {
                 commonMonster.listLine.push(parseInt(listPrizeData[i].split(",")[0]));
             }
         }

         that.spin(result);
     },
     spin: function(result) {
         var that = this;
         that.pointNext = -266;
         that.pointBack = -276;
         TweenMax.to(that.containerColumn1,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0,
                 data: "monster-move",
                 ease: Power0.easeNone,
                 onComplete: function() {
                     TweenMax.to(that.containerColumn1,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "monster-move",
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
                 delay: 0.1 * that.timeSpeed,
                 data: "monster-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn2,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "monster-move",
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

         TweenMax.to(that.containerColumn4,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0.1 * that.timeSpeed,
                 data: "monster-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn4,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "monster-move",
                             ease: Back.easeOut,
                             onComplete: function() {
                                 that.column4[that.totalItems - 3].texture = that.column4[1].texture;
                                 that.column4[that.totalItems - 2].texture = that.column4[2].texture;
                                 that.column4[that.totalItems - 1].texture = that.column4[3].texture;

                                 that.getItemSpine(that.column4[that.totalItems - 3], that.column4[1].inx, false);
                                 that.getItemSpine(that.column4[that.totalItems - 2], that.column4[2].inx, false);
                                 that.getItemSpine(that.column4[that.totalItems - 1], that.column4[3].inx, false);

                             }
                         });
                 }
             });

         TweenMax.to(that.containerColumn5,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0 * that.timeSpeed,
                 data: "monster-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn5,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "monster-move",
                             ease: Back.easeOut,
                             onComplete: function() {
                                 that.column5[that.totalItems - 3].texture = that.column5[1].texture;
                                 that.column5[that.totalItems - 2].texture = that.column5[2].texture;
                                 that.column5[that.totalItems - 1].texture = that.column5[3].texture;

                                 that.getItemSpine(that.column5[that.totalItems - 3], that.column5[1].inx, false);
                                 that.getItemSpine(that.column5[that.totalItems - 2], that.column5[2].inx, false);
                                 that.getItemSpine(that.column5[that.totalItems - 1], that.column5[3].inx, false);


                             }
                         });
                 }
             });




         TweenMax.to(that.containerColumn3,
             that.timeTween * that.timeSpeed, {
                 y: -that.startHeight + that.pointNext,
                 delay: 0.2 * that.timeSpeed,
                 data: "monster-move",
                 ease: Power0.easeNone,
                 onComplete: function() {

                     TweenMax.to(that.containerColumn3,
                         that.timeBack * that.timeSpeed, {
                             y: -that.startHeight + that.pointBack,
                             delay: that.timeDelay * that.timeSpeed,
                             data: "monster-move",
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
         commonMonster.playing = false;
         that.normalWinOrJackPotOrBigWin(result);
     },

     effect: function(id, result) {
         var that = this;
         var containerEffect = new Container();
         that.mainContainer.addChild(containerEffect);
         containerEffect.name = 'effect_monster';
         if (id === 1) {

             var spine = new PIXI.spine.Spine(resources['mini_nohu'].spineData);
             spine.x = 413;
             spine.y = 270;
             spine.scale.set(0.7);
             spine.state.setAnimation(0, 'animation', true);

             var txtJack = new BitmapText('0', {
                 font: '50px fontXjact'
             });
             txtJack.name = 'txtJackMonster';
             txtJack.anchor.set(0.5);
             txtJack.position.set(397, 338);
             txtJack.visible = false;
             containerEffect.addChild(spine, txtJack);

             TweenMax.to(txtJack, 2, {
                 alpha: 1,
                 ease: Linear.easeNone,
                 onComplete: function() {
                     commonGame.showVqJackpot(that, 225, 'Monsters', result.JackpotPrizeCurr, result.JackpotRateCurr, result.JackpotPrizeRateCurr);
                 }
             });
             return;

         } else if (id === 2) {

             var text_bigwin = new Sprite(TextureCache["mini_candy_bigwin.png"]);
             text_bigwin.anchor.set(0.5);
             text_bigwin.position.set(407, 254);

             var moneybig = new BitmapText('0', {
                 font: '50px fontCandy'
             });

             moneybig.anchor.set(0.5);
             moneybig.position.set(404, 322);
             that.countNumber(moneybig, true, false, 0, result.PaylinePrizeValue, 0, 1);

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
             that.countNumber(moneyNormal, true, false, 0, result.PaylinePrizeValue, 0, 1);
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

         var obj1 = that.mainContainer.getChildByName('effect_monster');
         if (obj1 != null) {
             var obj = obj1.getChildByName('txtJackMonster');
             if (obj != null) {
                 obj.text = commonGame.FormatNumber(jack);
                 obj.visible = true;
             }
         }
         commonMonster.playing = false;
         libAccount.UpdateBalance(2, jack, 2);
     },
     normalWinOrJackPotOrBigWin: function(result) {

         var that = this;
         if (result.PaylinePrizeValue > 0) {
             that.resetLines();
             commonGame.showNotify(4, result.PaylinePrizeValue);
             for (var i = 0; i < commonMonster.listLine.length; i++) {
                 that.showLineId(commonMonster.listLine[i]);
             }
             if (result.IsJackpot) {
                 commonMonster.playing = true;
                 that.effect(1, result);
                 that.enableButton();
             } else if (result.PaylinePrizeValue >= 10 * result.TotalBetValue) {
                 that.effect(2, result);
                 commonMonster.timeSpin = setTimeout(function() {
                     if (commonMonster.isAuto) {
                         if (commonMonster.playing)
                             return;
                         that.disableButton();
                         commonMonster.spins();

                         return;
                     }

                     that.enableButton();
                 }, 2500);
             } else {
                 that.effect(3, result);
                 commonMonster.timeSpin = setTimeout(function() {
                     if (commonMonster.isAuto) {
                         if (commonMonster.playing)
                             return;
                         that.disableButton();
                         commonMonster.spins();

                         return;
                     }

                     that.enableButton();
                 }, 1000);
             }
             commonMonster.timeOutEachLine = setTimeout(that.showEachLine, 1000);

         } else {


             if (commonMonster.isAuto) {
                 if (commonMonster.playing)
                     return;
                 that.disableButton();
                 commonMonster.spins();

                 return;
             }


             that.enableButton();
         }

         if (!result.IsJackpot) {
             libAccount.UpdateBalance(2, result.Balance);
         }
     },

     showEachLine: function() {
         var that = commonMonster.GameMonster;
         clearTimeout(commonMonster.timeOutEachLine);
         var lineCount = commonMonster.listLine.length;
         var i = 0;
         if (lineCount === 0) {
             clearTimeout(commonMonster.timeIntEachLine);
             return;
         }
         commonMonster.timeIntEachLine = setInterval(function() {
             if (commonMonster.playing) {
                 clearTimeout(commonMonster.timeIntEachLine);
                 return;
             }

             that.resetLines();
             that.showLineId(commonMonster.listLine[i]);
             i++;
             if (i === lineCount) {
                 clearTimeout(commonMonster.timeIntEachLine);
                 setTimeout(function() {
                         that.resetLines();
                     },
                     1000);
             }
         }, 1000);
     },
     disableButton: function() {
         var that = this;
         $('#monster .btn_spin').addClass('disable');

     },
     enableButton: function() {
         var that = this;
         $('#monster .btn_sieutoc').removeClass('active');
         that.timeSpeed = 1;
         $('#monster .btn_spin').removeClass('disable');


     },
     resetLines: function() {
         var that = this;
         for (var i = 0; i < that.lines.length; i++) {
             var line = that.lines[i];
             line.visible = false;
         }
     },

     showLineId: function(id) {
         var that = this;
         var line = that.lines[id - 1];
         line.visible = true;
     },




     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },
     btnTintOver: function() {
         this.filters = [commonMonster.GameMonster.filter];
     },
     btnTintOut: function() {
         this.filters = null;
     },
     btnActive: function(obj) {
         var that = commonMonster.GameMonster;
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
             if (all[i].data === "monster-effect" || all[i].data === "monster-scale" || all[i].data === "monster-move")
                 all[i].kill();
         }
     },
 };
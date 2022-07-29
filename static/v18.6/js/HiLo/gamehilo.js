 window.Hilo = window.Hilo || {};

 window.Hilo.Game = function() {};
 window.Hilo.Game.prototype = {
     game: null,
     stage: null,
     renderer: null,
     mask: null,
     create: function() {

         this.initGame();

     },
     initGame: function() {
         var that = this;
         this.game = new PIXI.Application(900, 600, {
             antialias: false,
             transparent: true,
             resolution: 1
         });
         $(".hilo_game_v2").append(this.game.view);




         this.filter = new PIXI.filters.ColorMatrixFilter();
         this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
         this.filterGray = new PIXI.filters.ColorMatrixFilter();
         this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];
         this.mainContainer = new Container();
         this.mainContainer.y = 20;
         this.game.stage.addChild(this.mainContainer);
         that.initAsset();
         that.initFrames();





     },

     initAsset: function() {



         $('#HiLo .mini_close').unbind('click').click(function() {
             commonHiLo.hideHiLoGUI();
         });


         $('#HiLo .mini_help').unbind('click').click(function() {
             commonHiLo.showGuide();
         });


         $('#HiLo .mini_rank').unbind('click').click(function() {
             commonHiLo.showRank(commonHiLo.betType);
         });


         $('#HiLo .mini_history').unbind('click').click(function() {
             commonHiLo.showHistory(commonHiLo.betType);
         });














         $('#HiLo .btn_up').unbind('click').click(function() {
             commonHiLo.btn_up_onClick();
         });


         $('#HiLo .btn_down').unbind('click').click(function() {
             commonHiLo.btn_down_onClick();
         });




         $('#HiLo_room .room1K').unbind('click').click(function() {
             if (commonHiLo.playing === true) {
                 return;
             }
             $('#HiLo_room div').removeClass('active');
             $('#HiLo_room .room1K').addClass('active');
             commonHiLo.changeBetValue(1000, 1);
         });

         $('#HiLo_room .room10K').unbind('click').click(function() {
             if (commonHiLo.playing === true) {
                 return;
             }
             $('#HiLo_room div').removeClass('active');
             $('#HiLo_room .room10K').addClass('active');
             commonHiLo.changeBetValue(10000, 2);
         });
         $('#HiLo_room .room50K').unbind('click').click(function() {
             if (commonHiLo.playing === true) {
                 return;
             }
             $('#HiLo_room div').removeClass('active');
             $('#HiLo_room .room50K').addClass('active');
             commonHiLo.changeBetValue(50000, 3);
         });
         $('#HiLo_room .room100K').unbind('click').click(function() {
             if (commonHiLo.playing === true) {
                 return;
             }
             $('#HiLo_room div').removeClass('active');
             $('#HiLo_room .room100K').addClass('active');
             commonHiLo.changeBetValue(100000, 4);
         });
         $('#HiLo_room .room500K').unbind('click').click(function() {
             if (commonHiLo.playing === true) {
                 return;
             }
             $('#HiLo_room div').removeClass('active');
             $('#HiLo_room .room500K').addClass('active');
             commonHiLo.changeBetValue(500000, 5);
         });
         $('#HiLo .card-bg').unbind('click').click(function() {
             commonHiLo.startPlay();
         });



         $('#HiLo .bt_newTurn').unbind('click').click(function() {
             commonHiLo.newTurn();
         });


     },

     initFrames: function() {
         var club = [
             "club-2.png", "club-3.png", "club-4.png", "club-5.png", "club-6.png", "club-7.png", "club-8.png",
             "club-9.png", "club-10.png"
         ];
         var diamond = [
             "diamond-2.png", "diamond-3.png", "diamond-4.png", "diamond-5.png", "diamond-6.png", "diamond-7.png",
             "diamond-8.png", "diamond-9.png", "diamond-10.png"
         ];
         var heart = [
             "heart-2.png", "heart-3.png", "heart-4.png", "heart-5.png", "heart-6.png", "heart-7.png", "heart-8.png",
             "heart-9.png", "heart-10.png"
         ];
         var spade = [
             "spade-2.png", "spade-3.png", "spade-4.png", "spade-5.png", "spade-6.png", "spade-7.png", "spade-8.png",
             "spade-9.png", "spade-10.png"
         ];
         this.framesItems = [];
         var i;
         for (i = 0; i < club.length; i++) {


             this.framesItems.push(TextureCache[club[i]]);
         }
         for (i = 0; i < diamond.length; i++) {

             this.framesItems.push(TextureCache[diamond[i]]);
         }
         for (i = 0; i < heart.length; i++) {

             this.framesItems.push(TextureCache[heart[i]]);
         }
         for (i = 0; i < spade.length; i++) {

             this.framesItems.push(TextureCache[spade[i]]);
         }


     },

     resetAll: function() {
         var that = commonHiLo.GameHilo;
         $('#HiLo .card-bg').show();
         var objDice = that.mainContainer.getChildByName('CardAnimContainer');
         if (objDice != null) {
             objDice.destroy();
         }
         that.updateAcesCount(0);
         commonHiLo.playing = false;
         var betvalue = 0;
         if (commonHiLo.roomId === 1)
             betvalue = 1000;
         if (commonHiLo.roomId === 2)
             betvalue = 10000;
         if (commonHiLo.roomId === 3)
             betvalue = 50000;
         if (commonHiLo.roomId === 4)
             betvalue = 100000;
         if (commonHiLo.roomId === 5)
             betvalue = 500000;


         commonHiLo.betValue = betvalue;
         that.updatePriceAward(commonHiLo.betValue);
     },

     showResult: function(cardId, callback) {
         var that = commonHiLo.GameHilo;

         var objDice = that.mainContainer.getChildByName('CardAnimContainer');
         if (objDice != null) {
             objDice.destroy();
         }

         $('#HiLo .card-bg').hide();
         var diceContainer = new Sprite();
         diceContainer.name = 'CardAnimContainer';
         var effect = new AnimatedSprite(this.framesItems);
         effect.anchor.set(0.5);
         effect.scale.set(1.3);
         effect.animationSpeed = 0.5;
         effect.loop = false;
         effect.play();
         effect.position.set(223, 320);

         effect.onComplete = function() {
             effect.destroy();
             var type = that.getCard(cardId);
             var card = new Sprite(TextureCache[type + ".png"]);
             card.anchor.set(0.5);
             card.scale.set(1.3);
             card.position.set(223, 320);
             diceContainer.addChild(card);
             if (callback != null)
                 callback();
         };
         diceContainer.addChild(effect);
         this.mainContainer.addChild(diceContainer);
     },
     updateCardCurrent: function(cardId) {
         var that = commonHiLo.GameHilo;
         $('#HiLo .card-bg').hide();
         var diceContainer = new Sprite();
         diceContainer.name = 'CardAnimContainer';
         var type = that.getCard(cardId);
         var card = new Sprite(TextureCache[type + ".png"]);
         card.anchor.set(0.5);
         card.scale.set(1.3);
         card.position.set(223, 320);
         diceContainer.addChild(card);
         this.mainContainer.addChild(diceContainer);

     },
     updateAcesCount: function(asesCount) {
         var that = commonHiLo.GameHilo;

         $('#HiLo .Aces div').removeClass('active');
         for (var i = 0; i < asesCount; i++) {
             $('#HiLo .Aces .A' + (i + 1)).addClass('active');
         }
     },
     updateAccountResult: function(sumGold) {

         if (sumGold > 0) {
             var sum = new Text('+' + commonGame.FormatNumber(sumGold),
                 new PIXI.TextStyle({
                     fontFamily: "Conv_UTM_Swiss",
                     fontSize: 40,
                     fill: ["#ff0", "#ff0"]
                 }));
             sum.anchor.set(0.5);
             sum.position.set(330, 330);
             this.subscribe(sum);;
             this.mainContainer.addChild(sum);

             TweenMax.to(sum, 5, {
                 y: 130,

                 ease: Linear.easeNone,
                 onComplete: function() {
                     TweenMax.to(sum, 1, {
                         alpha: 0.3,
                         ease: Linear.easeNone,
                         onComplete: function() {

                             sum.destroy();
                         }
                     });


                 }
             });


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
     enableButtonNew: function(enabled) {
         if (enabled) {

             $('#HiLo .bt_newTurn').removeClass('disable');

         } else {
             $('#HiLo .bt_newTurn').addClass('disable');
         }

     },
     enableButtonUpDown: function(enabled) {
         if (enabled) {
             $('#HiLo .btn_up').removeClass('disable');
             $('#HiLo .btn_down').removeClass('disable');

         } else {

             $('#HiLo .btn_up').addClass('disable');
             $('#HiLo .btn_down').addClass('disable');
         }
     },

     buttonUp: function(enabled) {
         if (enabled) {
             $('#HiLo .btn_up').removeClass('disable');


         } else {
             $('#HiLo .btn_up').addClass('disable');

         }
     },
     stateUp: function() {
         if (!$('#HiLo .btn_up').hasClass('disable'))
             return true;
         return false;

     },
     stateDown: function() {
         if (!$('#HiLo .btn_down').hasClass('disable'))
             return true;
         return false;

     },
     buttonDown: function(enabled) {
         if (enabled) {

             $('#HiLo .btn_down').removeClass('disable');

         } else {

             $('#HiLo .btn_down').addClass('disable');
         }
     },



     updateSession: function(sessionID) {

         $('#hilosessionID').html('#' + sessionID);
     },
     updateTime: function(timecount) {
         $('#hiloTimeId').html(timecount);
     },
     updatePriceAward: function(pzivalueBet) {
         $('#priceAwardId').html(commonGame.FormatNumber(pzivalueBet));
     },

     updateMoneyUpDow: function(valueUp, valueDown) {

         $('#moneyForHigherId').html(valueUp !== '' ? commonGame.FormatNumber(valueUp) : '');
         $('#moneyForLowerId').html(valueDown !== '' ? commonGame.FormatNumber(valueDown) : '');

     },

     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },

     btnTintOver: function() {
         this.filters = [commonHiLo.GameHilo.filter];
     },
     btnTintOut: function() {
         this.filters = null;
     },

     btnActive: function(obj) {
         var that = commonHiLo.GameHilo;
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
             if (all[i].data === "hilo-effect" || all[i].data === "hilo-scale" || all[i].data === "hilo-move")
                 all[i].kill();
         }
     },
 };
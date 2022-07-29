 window.MiniPoker = window.MiniPoker || {};

 window.MiniPoker.Game = function() {};
 window.MiniPoker.Game.prototype = {
     game: null,
     stage: null,
     renderer: null,

     create: function() {
         this.initGame();
     },
     initGame: function() {
         var that = this;
         this.game = new PIXI.Application(840, 420, {
             antialias: false,
             transparent: true,
             resolution: 1
         });
         $(".minipoker_game_v2").append(this.game.view);


         this.filter = new PIXI.filters.ColorMatrixFilter();
         this.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
         this.filterGray = new PIXI.filters.ColorMatrixFilter();
         this.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];

         this.mainContainer = new Container();
         this.mainContainer.y = -40;
         this.mainContainer.x = 0;
         this.game.stage.addChild(this.mainContainer);

         that.MainColum = new window.MiniPoker.MainColum();
         that.MainColum.init(that.mainContainer);
         that.initAsset();
         that.initFrames();
     },

     initAsset: function() {
         var that = this;



         $('#wrap_minipoker .mini_close').unbind('click').click(function() {
             commonMinipoker.hideMinipokerGUI();
         });


         $('#wrap_minipoker .mini_help').unbind('click').click(function() {
             commonMinipoker.showGuide();
         });


         $('#wrap_minipoker .mini_rank').unbind('click').click(function() {
             commonMinipoker.showRank(1);
         });


         $('#wrap_minipoker .mini_history').unbind('click').click(function() {
             commonMinipoker.showHistory(1);
         });















         $('#wrap_minipoker .room100').unbind('click').click(function() {
             if (commonMinipoker.playing)
                 return;
             $('#minipoker_room div').removeClass('active');
             $('#wrap_minipoker .room100').addClass('active');

             commonMinipoker.setPriceBet(1, 100);

         });



         $('#wrap_minipoker .room1K').unbind('click').click(function() {
             if (commonMinipoker.playing)
                 return;
             $('#minipoker_room div').removeClass('active');
             $('#wrap_minipoker .room1K').addClass('active');

             commonMinipoker.setPriceBet(2, 1000);
         });

         $('#wrap_minipoker .room10K').unbind('click').click(function() {
             if (commonMinipoker.playing)
                 return;
             $('#minipoker_room div').removeClass('active');
             $('#wrap_minipoker .room10K').addClass('active');

             commonMinipoker.setPriceBet(3, 10000);
         });


         $('#wrap_minipoker .room5K').unbind('click').click(function() {
             if (commonMinipoker.playing)
                 return;
             $('#minipoker_room div').removeClass('active');
             $('#wrap_minipoker .room5K').addClass('active');

             commonMinipoker.setPriceBet(4, 5000);
         });






         $('#wrap_minipoker .btn_checkAuto').unbind('click').click(function() {

             if (commonMinipoker.isAuto) {
                 commonMinipoker.isAuto = false;
                 $('#wrap_minipoker .btn_checkAuto').removeClass('active');

             } else {
                 commonMinipoker.isAuto = true;
                 $('#wrap_minipoker .btn_checkAuto').addClass('active');
                 if (!commonMinipoker.playing) {
                     commonMinipoker.playing = true;
                     commonMinipoker.DoSpin();
                 }


             }
         });


         $('#wrap_minipoker .btn_sieutoc').unbind('click').click(function() {
             if (commonMinipoker.timeSpeed === 2) {
                 commonMinipoker.timeSpeed = 0.5;

                 $('#wrap_minipoker .btn_sieutoc').addClass('active');
                 if (!commonMinipoker.playing) {
                     commonMinipoker.playing = true;
                     commonMinipoker.DoSpin();
                 }
             } else {
                 commonMinipoker.timeSpeed = 2;
                 $('#wrap_minipoker .btn_sieutoc').removeClass('active');

             }
         });

         $('#wrap_minipoker .btn_spinX5').unbind('click').click(function() {
             if (commonMinipoker.betX5 === 1) {
                 commonMinipoker.betX5 = 5;

                 $('#wrap_minipoker .btn_spinX5').addClass('active');
                 $('.minipoker_game_v2x5').show();

             } else {
                 commonMinipoker.betX5 = 1;
                 $('#wrap_minipoker .btn_spinX5').removeClass('active');
                 $('.minipoker_game_v2x5').hide();
             }
         });
         $('#wrap_minipoker .btn_rolate').unbind('click').click(function() {
             that.bt_spin.visible = false;
             that.mouseDonwSpin();

         });



         this.bt_spin = new Sprite(TextureCache["poker_mini_gat1.png"]);
         this.bt_spin.anchor.set(0.5);
         this.bt_spin.position.set(801, 224);


         this.mainContainer.addChild(this.bt_spin);
     },
     initFrames: function() {

         this.framesItems = [];
         var i;
         for (i = 1; i < 5; i++) {
             this.framesItems.push(TextureCache['poker_mini_gat' + i + '.png']);
         }



     },
     mouseDonwSpin: function() {

         var that = commonMinipoker.GamePoker;
         var effect = new AnimatedSprite(that.framesItems);
         effect.anchor.set(0.5);
         this.visible = false;
         effect.animationSpeed = 0.3;
         effect.loop = false;
         effect.play();
         effect.position.set(799, 194);
         effect.onComplete = function() {
             effect.destroy();
             that.bt_spin.visible = true;
         };
         that.mainContainer.addChild(effect);

         if (commonMinipoker.playing) {

             return;
         }
         commonMinipoker.playing = true;
         commonMinipoker.DoSpin();
     },
     startSpin: function(cards, prize, responseData) {
         var that = this;
         that.MainColum.startSpin(cards, prize, function() {
             commonMinipoker.playing = false;
             if (commonMinipoker.isAuto) {
                 commonMinipoker.DoSpin();
             } else {
                 commonMinipoker.timeSpeed = 2;
                 $('#wrap_minipoker .btn_sieutoc').removeClass('active');

             }
             var isJack = responseData.Cards.filter(t => t.CardTypeID === 12);

             if (isJack.length === 0) {
                 libAccount.UpdateBalance(2, responseData.Balance);
             } else {
                 var moneyJack = 0;
                 for (var i = 0; i < isJack.length; i++) {
                     moneyJack += isJack[0].CardPR1;
                 }
                 libAccount.UpdateBalance(2, responseData.Balance - moneyJack, 2);
             }
         });
     },



     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },
     btnTintOver: function() {
         this.filters = [commonMinipoker.GamePoker.filter];
     },
     btnTintOut: function() {
         this.filters = null;
     },
     btnActive: function(obj) {
         var that = commonMinipoker.GamePoker;
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
             if (all[i].data === "minipoker-effect" || all[i].data === "minipoker-scale" || all[i].data === "minipoker-move")
                 all[i].kill();
         }
     },
 };
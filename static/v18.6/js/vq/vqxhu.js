 window.VQjackpot = window.VQjackpot || {};
 var tempVqJackpot;
 var timeOutLightjack;
 var intervalLightRemain;
 window.VQjackpot.Game = function() {};
 window.VQjackpot.Game.prototype = {
     game: null,
     stage: null,
     renderer: null,
     mask: null,
     create: function() {
         this.initVQ();
     },
     initVQ: function() {
         var that = this;
         this.game = new PIXI.Application(756, 756, {
             antialias: false,
             transparent: true,
             resolution: 1
         });
         if (typeof tempVqJackpot === 'undefined')
             tempVqJackpot = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/vqxhu/vq.html");

         $(".over_poup").show();
         $(".over_poup").append(jQuery.processTemplateToText(tempVqJackpot));
         $(".vqxhu_game_v2").append(this.game.view);

         clearTimeout(timeOutLightjack);
         clearInterval(intervalLightRemain);
         this.timeWait = 15;
         this.listJack = [];
         this.indexJack = 0;
         this.mainContainer = new Container();
         this.game.stage.addChild(this.mainContainer);
         this.initAsset();
         this.initFrames();
         this.lightBg();
         this.initRemain();


     },
     initFrames: function() {
         this.framesItems = [];
         var i;
         for (i = 1; i < 31; i++) {
             this.framesItems.push(TextureCache['fire-' + i + '.png']);
         }
     },
     initRemain: function() {
         var that = this;
         clearInterval(intervalLightRemain);
         that.timeWait = 15;
         intervalLightRemain = setInterval(that.fnRemain, 1000);
     },
     fnRemain: function() {
         var that = commonGame.VQjackpot;
         that.timeWait--;
         if (that.timeWait >= 0) {
             $('.timRemainJack').html(commonGame.formatTime(that.timeWait));
         }
         if (that.timeWait === 0) {
             clearInterval(intervalLightRemain);
             that.spin();
         }

     },


     initAsset: function() {
         var that = this;
         this.bgjackpot = new Sprite(TextureCache["bg_xjackpot.png"]);
         this.bgjackpot.anchor.set(0.5);
         this.bgjackpot.position.set(379, 377);

         this.bgmask = new Sprite(TextureCache["bg_xjackpot_mask.png"]);
         this.bgmask.anchor.set(0.5);
         this.bgmask.position.set(380, 380);
         this.bgmask.visible = false;
         this.mainContainer.addChild(this.bgjackpot, this.bgmask);



         $('.vqjackpot .vqclose').unbind('click').click(function() {
             libs.CloseAll($('.vqjackpot .vqclose').parent());

             for (var i = that.indexJack; i < that.listJack.length; i++) {
                 var obj = that.listJack[i];
                 obj.target.updateTextJack(obj.jackRate);
             }
             that.resetAll();
         });
         $('.vqjackpot .vqxspin').unbind('click').click(function() {
             clearInterval(intervalLightRemain);
             that.spin();
         });


     },
     lightBg: function() {
         var that = this;
         timeOutLightjack = setTimeout(function() {
             if ($('.vqjackpot').hasClass('active')) {
                 $('.vqjackpot').removeClass('active');
             } else {
                 $('.vqjackpot').addClass('active');
             }

             that.lightBg();
         }, 500);
     },
     addJack: function(target, gameId, name, jack, rate, jackRate) {
         this.listJack.push({
             target: target,
             gameId: gameId,
             name: name,
             jack: jack,
             rate: rate,
             jackRate: jackRate
         });
         var html = '';
         for (var i = 0; i < this.listJack.length; i++) {
             var obj = this.listJack[i];
             var state = (i === this.indexJack) ? 'active' : '';
             html += '<li class="' + state + '">';
             html += '<span class="namejack" > Hũ ' + obj.name + '</span>';
             html += '<span class="jacvalue">' + commonGame.FormatNumber(obj.jack) + '</span>';
             html += '</li >';
         }
         $('.list_jactrate').html(html);
     },
     setRolate: function(ruu) {
         var that = this;
         that.bgjackpot.rotation = ruu;
     },
     spin: function() {
         var that = this;
         var obj = that.listJack[that.indexJack];
         if (obj == null)
             return;
         $('.vqjackpot .vqxspin').hide();
         TweenMax.to(that.bgjackpot, 15, {
             rotation: that.getPerRate(obj.rate),
             data: "vqjackpot-effect",
             delay: 0,
             ease: Circ.easeInOut,
             yoyo: true,
             onComplete: function() {
                 that.indexJack++;
                 that.effect(obj.target, obj.rate, obj.jackRate);
             }
         });
     },

     getPerRate: function(rate) {
         if (rate === 90)
             return 90.335;

         if (rate === 50)
             return 91.115;

         if (rate === 20)
             return 91.5;

         if (rate === 60)
             return 91.89;
         if (rate === 10)
             return 92.28;
         if (rate === 70)
             return 92.67;
         if (rate === 40)
             return 93.065;
         if (rate === 30)
             return 93.852;
         if (rate === 100)
             return 95.043;
         if (rate === 80)
             return 95.835;

         return 0;
     },

     effect: function(target, rate, jackRate) {
         var that = this;
         var eff = new Container();
         that.bgmask.visible = true;

         var effect = new AnimatedSprite(that.framesItems);
         effect.anchor.set(0.5);
         effect.animationSpeed = 0.3;
         effect.loop = true;
         effect.play();
         effect.position.set(380, 149);
         eff.addChild(effect);
         TweenMax.to(effect, 1, {
             alpha: 1,
             delay: 0,
             data: "vqjackpot-effect",
             ease: Back.easeOut,
             onComplete: function() {
                 var spine = new PIXI.spine.Spine(resources['Bangketqua'].spineData);
                 spine.x = 384;
                 spine.y = 378;
                 spine.scale.set(0.7);
                 spine.state.setAnimation(0, 'animation', true);
                 var txt = new Sprite(TextureCache["txtxJack.png"]);
                 txt.anchor.set(0.5);
                 txt.position.set(441, 345);

                 var txtrate = new BitmapText('' + rate, {
                     font: '85px fontXjact'
                 });
                 txtrate.anchor.set(0.5);
                 txtrate.position.set(277, 352);
                 var textJackpot = new Text("0",
                     new PIXI.TextStyle({
                         fontFamily: "Conv_UTM_Swiss",
                         fontSize: 40,
                         fill: ["#ffff00", "#ffff00"]
                     }));

                 textJackpot.anchor.set(0.5);
                 textJackpot.position.set(381, 472);
                 eff.addChild(spine, txt, textJackpot, txtrate);
                 that.countNumber(textJackpot, true, false, 0, jackRate, 0, 1);
                 that.subscribe(txtrate);

                 target.updateTextJack(jackRate);

                 TweenMax.to(effect, 5, {
                     alpha: 1,
                     delay: 0,
                     data: "vqjackpot-effect",
                     ease: Back.easeOut,
                     onComplete: function() {
                         eff.destroy();
                         if (that.indexJack === that.listJack.length) {
                             libs.CloseAll($('.vqjackpot .vqclose').parent());
                             commonGame.VQjackpot = null;
                             return;
                         }
                         that.initRemain();
                         that.bgjackpot.rotation = 0;
                         that.bgmask.visible = false;
                         $('.vqjackpot .vqxspin').show();
                         $('.list_jactrate li').removeClass('active');
                         $('.list_jactrate li:nth-child(' + (that.indexJack + 1) + ')').addClass('active');
                     }
                 });
             }
         });
         that.mainContainer.addChild(eff);

     },
     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },
     resetAll: function() {
         var that = this;
         clearInterval(intervalLightRemain);
         clearTimeout(timeOutLightjack);
         that.deleteTweens();
         that.deleteGame();
     },
     deleteGame: function() {
         try {
             commonGame.VQjackpot.game.view.remove();
             commonGame.VQjackpot.game.destroy(true);
             if (commonGame.VQjackpot)
                 delete commonGame.VQjackpot;
         } catch (e) {
             console.log('deleteMap Erro');
         }
     },

     subscribe: function(obj) {
         obj.interactive = true;
         obj.on('pointerdown', this.onDragStart)
             .on('pointerup', this.onDragEnd)
             .on('pointerupoutside', this.onDragEnd)
             .on('pointermove', this.onDragMove);



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
             if (all[i].data === "vqjackpot-effect" || all[i].data === "vqjackpot-scale" || all[i].data === "vqjackpot-move")
                 all[i].kill();
         }
     },
 };
 window.VQMM = window.VQMM || {};
 var tempVqmm;
 var timeOutGetJackVQMM;
 window.VQMM.Game = function() {};
 window.VQMM.Game.prototype = {
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
         if (typeof tempVqmm === 'undefined')
             tempVqmm = jQuery.createTemplateURL(jsConfig.urlRootStatic + "templates/vqmm/vq.html");
         $(".over_poup").show();
         $(".over_poup").append(jQuery.processTemplateToText(tempVqmm));
         $(".vqmm_game_v2").append(this.game.view);

         this.mainContainer = new Container();
         this.game.stage.addChild(this.mainContainer);
         this.isPlay = false;
         this.spinCount = 0;
         that.initAsset();
         that.initColision();
         that.game.ticker.add(that.update);

         clearTimeout(timeOutGetJackVQMM);
         that.updateJackpot();
         that.updateCountSpin();
         that.updateRank();
         $(".right_vqmm .topRank").slimScroll({
             height: '473px'
         });
     },
     updateJackpot: function() {
         var that = this;
         libs.PostData3(jsConfig.urlRootVQMM + 'CircleSpin/getJack', {}, function(data) {
             if (data != null) {
                 for (var i = 0; i < data.length; i++) {
                     if (data[i].RoomId === 3) {
                         $('.top_vqmm span:nth-child(1)').html(util.ParseMoney(data[i].JackPotFun));
                     }
                     if (data[i].RoomId === 2) {
                         $('.top_vqmm span:nth-child(2)').html(util.ParseMoney(data[i].JackPotFun));
                     }
                     if (data[i].RoomId === 1) {
                         $('.top_vqmm span:nth-child(3)').html(util.ParseMoney(data[i].JackPotFun));
                     }

                 }
             }
         }, function() {});

         timeOutGetJackVQMM = setTimeout(function() {

             that.updateJackpot();

         }, 6000);
     },
     updateRank: function() {
         libs.PostData3(jsConfig.urlRootVQMM + 'CircleSpin/getRank', {}, function(data) {
             if (data != null) {
                 var html = '';

                 for (var i = 0; i < data.length; i++) {

                     if (data[i].Type === 2) {
                         html += '<li>';
                         html += '<span class="v_user" > ' + data[i].AccountName + '</span >';
                         html += '<span> trúng </span>';
                         html += '<span class="v_money">' + util.ParseMoney(data[i].Prize) + ' B</span>';
                         html += '</li >';
                     }



                     if (data[i].Type === 1) {
                         html += '<li>';
                         html += '<span class="v_user"> ' + data[i].AccountName + '</span >';
                         html += '<span> trúng </span>';
                         html += '<span class="v_point">' + util.ParseMoney(data[i].Prize) + ' VP</span>';
                         html += '</li >';
                     }

                     if (data[i].Type === 3) {
                         html += '<li>';
                         html += '<span class="v_user">' + data[i].AccountName + '</span>';
                         html += '<span> trúng </span >';
                         html += '<span class="v_jack">Hũ Mini </span>';
                         html += '<span class="v_money">' + util.ParseMoney(data[i].Prize) + ' B</span>';
                         html += '</li >';
                     }

                     if (data[i].Type === 4) {
                         html += '<li>';
                         html += '<span class="v_user">' + data[i].AccountName + '</span>';
                         html += '<span> trúng </span >';
                         html += '<span class="v_jack">Hũ Manor </span>';
                         html += '<span class="v_money">' + util.ParseMoney(data[i].Prize) + ' B</span>';
                         html += '</li >';
                     }

                     if (data[i].Type === 5) {
                         html += '<li>';
                         html += '<span class="v_user">' + data[i].AccountName + '</span>';
                         html += '<span> trúng </span >';
                         html += '<span class="v_jack">Hũ Major  </span>';
                         html += '<span class="v_money">' + util.ParseMoney(data[i].Prize) + ' B</span>';
                         html += '</li >';
                     }
                 }

                 $('.right_vqmm ul').html(html);
             }
         }, function() {});
     },

     updateCountSpin: function() {
         libs.PostData(jsConfig.urlRootVQMM + 'CircleSpin/Turn_GetAPI', {}, function(data) {

             if (data != null) {
                 $('.btn-mail .count').hide();
                 $('.minigame-expand .count').hide();
                 if (data.InboxCount > 0) {
                     $('.btn-mail .count').html(data.InboxCount);
                     $('.btn-mail .count').show();
                 }

                 if (data.SpinCount > 0) {
                     $('.count_spin_vq span').html(data.SpinCount);
                     $('.minigame-expand .count').html(data.SpinCount);
                     $('.minigame-expand .count').show();
                     $('.botton_vqmm .btn_spin_vq').removeClass('disable');
                 } else {
                     $('.botton_vqmm .btn_spin_vq').addClass('disable');
                 }
             }
         }, function(a) {});
     },


     update: function() {
         if (commonGame.VQMM == null)
             return;

         if (commonGame.VQMM.isCollison()) {
             commonGame.VQMM.updateRolate(-0.04);
         } else {
             commonGame.VQMM.updateRolate(0.02);
         }

     },
     updateRolate: function(rote) {
         var that = this;
         if (that.arrow == undefined)
             return;
         that.arrow.rotation += rote;

         if (that.arrow.rotation < -0.8)
             that.arrow.rotation = -0.8;

         if (that.arrow.rotation > 0)
             that.arrow.rotation = 0;
     },
     initAsset: function() {
         var that = this;
         this.cicleContainer = new Sprite(TextureCache['cicrle_vqmm.png']);
         this.cicleContainer.anchor.set(0.5);
         this.cicleContainer.position.set(403, 393);


         this.bg = new Sprite(TextureCache['cicrle_vqmm.png']);
         this.bg.anchor.set(0.5);
         this.bg.position.set(0, 0);


         this.arrow = new Sprite(TextureCache['bt_rolate_vqmm.png']);
         this.arrow.anchor.set(0.5);
         this.arrow.position.set(0, -280);

         this.maskArrow = new PIXI.Graphics();

         // Rectangle
         this.maskArrow.beginFill(0xDE3249);
         this.maskArrow.drawRect(50, 50, 10, 10);
         this.maskArrow.endFill();
         this.maskArrow.position.set(-58, -19);
         this.maskArrow.alpha = 0.01;
         this.arrow.addChild(this.maskArrow);


         this.bgcenter = new Sprite(TextureCache['center_vqmm.png']);
         this.bgcenter.anchor.set(0.5);
         this.bgcenter.position.set(0, 0);

         this.cicleContainer.addChild(this.bg, this.arrow, this.bgcenter);
         that.subscribe(this.maskArrow);
         that.mainContainer.addChild(this.cicleContainer);

         $('.vip_vqmm .vqmm_close').unbind('click').click(function() {
             libs.CloseAll($('.vip_vqmm .vqmm_close').parent());
             clearTimeout(timeOutGetJackVQMM);
             that.deleteTweens();
             that.deleteGame();
         });

         $('.vip_vqmm .btn_spin_vq').unbind('click').click(function() {

             if (that.isPlay)
                 return;

             that.isPlay = true;
             libs.PostData3(jsConfig.urlRootVQMM + 'CircleSpin/Spin_API', {}, function(data) {
                 console.log(data);
                 if (data != null) {
                     if (data.ResponseStatus < 0)
                         return;
                     if (data.SpinCount > 0) {
                         $('.count_spin_vq span').html(data.SpinCount);
                         $('.minigame-expand .count').html(data.SpinCount);
                         $('.minigame-expand .count').show();
                         $('.botton_vqmm .btn_spin_vq').removeClass('disable');
                     } else {
                         $('.botton_vqmm .btn_spin_vq').addClass('disable');
                     }
                     that.spin(data);
                     return;
                 }
                 that.IsSpin = false;
             }, function() {
                 that.IsSpin = false;
             });



         });



     },
     isCollison: function() {
         var that = this;
         if (that.ListCollis == undefined || that.ListCollis == null)
             return false;
         for (var i = 0; i < that.ListCollis.length; i++) {
             if (boxesIntersect(that.ListCollis[i], that.maskArrow))
                 return true;
         }
         return false;

         function boxesIntersect(a, b) {
             var ab = a.getBounds();
             var bb = b.getBounds();
             return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
         }
     },
     initColision: function() {
         var that = this;
         var arr = [];
         arr.push({
             x: -60,
             y: -249
         });
         arr.push({
             x: -153,
             y: -208
         });
         arr.push({
             x: -220,
             y: -132
         });
         arr.push({
             x: -251,
             y: -37
         });
         arr.push({
             x: -242,
             y: 62
         });
         arr.push({
             x: -192,
             y: 152
         });
         arr.push({
             x: -109,
             y: 212
         });
         arr.push({
             x: -11,
             y: 233
         });
         arr.push({
             x: 89,
             y: 212
         });
         arr.push({
             x: 170,
             y: 153
         });

         arr.push({
             x: 221,
             y: 65
         });
         arr.push({
             x: 232,
             y: -37
         });
         arr.push({
             x: 201,
             y: -131
         });
         arr.push({
             x: 134,
             y: -207
         });
         arr.push({
             x: 42,
             y: -249
         });

         that.ListCollis = [];
         for (var i = 0; i < arr.length; i++) {
             var graphics = new PIXI.Graphics();
             graphics.lineStyle(0);
             graphics.beginFill(0xDE3249, 0.01);
             graphics.drawCircle(10, 10, 10);
             graphics.endFill();
             graphics.position.set(arr[i].x, arr[i].y);
             that.bg.addChild(graphics);
             that.ListCollis.push(graphics);
         }
     },
     spin: function(result) {
         var that = this;
         that.isPlay = true;

         that.beforSpin();
         $('.top_vqmm').addClass('active');
         $('.left_vqmm').addClass('active');
         $('.right_vqmm').addClass('active');
         $('.botton_vqmm').addClass('active');
         that.cicleContainer.scale.set(1.15);
         TweenMax.to(that.bg, 15, {
             rotation: that.getRolatePrize(result.PrizeID),
             data: "vqmm-effect",
             delay: 0,
             ease: Circ.easeInOut,
             yoyo: true,
             onComplete: function() {

                 that.cicleContainer.scale.set(1);
                 that.isPlay = false;
                 $('.top_vqmm').removeClass('active');
                 $('.left_vqmm').removeClass('active');
                 $('.right_vqmm').removeClass('active');
                 $('.botton_vqmm').removeClass('active');

                 if (result.Prize === 0) {

                     $('.vq_reslut').html('Chúc bạn may mắn!');
                 }

                 if (result.Prize > 0) {
                     if (result.Type > 2) {

                         var spine = new PIXI.spine.Spine(resources['mini_nohu'].spineData);
                         spine.x = 401;
                         spine.y = 401;
                         spine.name = 'notyfi';
                         spine.scale.set(0.7);
                         spine.state.setAnimation(0, 'animation', true);
                         that.mainContainer.addChild(spine);
                         that.subscribe(spine);
                     }

                     if (result.Type === 3)
                         $('.vq_reslut').html('<span style="color: #ff0000;font-weight: bold;">Nổ hũ Mini </span>  ' + util.ParseMoney(result.Prize));
                     if (result.Type === 4)
                         $('.vq_reslut').html('<span style="color: #ff0000;font-weight: bold;">Nổ hũ Manor </span>  ' + util.ParseMoney(result.Prize));
                     if (result.Type === 5)
                         $('.vq_reslut').html('<span style="color: #ff0000;font-weight: bold;">Nổ hũ Major </span>  ' + util.ParseMoney(result.Prize));

                     if (result.Type === 2)
                         $('.vq_reslut').html(util.ParseMoney(result.Prize / result.RATE) + '<span style="color: #fff"> x </span> ' + result.RATE + '<span style="color: #fff"> = </span>' + util.ParseMoney(result.Prize) + 'B');
                     if (result.Type === 1)
                         $('.vq_reslut').html(util.ParseMoney(result.Prize / result.RATE) + '<span style="color: #fff"> x </span> ' + result.RATE + '<span style="color: #fff"> = </span>' + util.ParseMoney(result.Prize) + 'VP');

                     if (result.Type >= 2) {
                         libAccount.UpdateBalance(2, result.Prize, 2);
                     } else {
                         libAccount.UpdateBalance(1, result.Prize, 2);
                     }

                 }

             }
         });
     },
     beforSpin: function() {
         var that = this;
         $('.vq_reslut').html('Chúc bạn may mắn!');
         that.bg.rotation = 0;
         var objnoty = that.mainContainer.getChildByName('notyfi');
         if (objnoty != null) {
             objnoty.destroy();

         }

     },
     getRolatePrize: function(prizeID) {
         if (prizeID === 1) {
             return 46.05;
         }
         if (prizeID === 2) {
             return 48.15;
         }

         if (prizeID === 3) {
             return 50.25;
         }
         if (prizeID === 4) {
             return 49.42;
         }
         if (prizeID === 5) {
             return 51.52;
         }

         if (prizeID === 6) {
             return 47.33;
         }
         if (prizeID === 7) {
             return 47.75;
         }
         if (prizeID === 8) {
             return 45.65;
         }
         if (prizeID === 9) {
             return 49.85;
         }
         if (prizeID === 10) {
             return 46.92;
         }
         if (prizeID === 11) {
             return 51.1;
         }
         if (prizeID === 12) {
             return 49;
         }
         if (prizeID === 13) {
             return 50.67;
         }
         if (prizeID === 14) {
             return 46.47;
         }
         if (prizeID === 15) {
             return 48.57;
         }


         return 0;


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
             commonGame.VQMM.game.view.remove();
             commonGame.VQMM.game.destroy(true);
             if (commonGame.VQMM)
                 delete commonGame.VQMM;
         } catch (e) {

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
             if (all[i].data === "vqmm-effect" || all[i].data === "vqmm-scale" || all[i].data === "vqmm-move")
                 all[i].kill();
         }
     },
 };
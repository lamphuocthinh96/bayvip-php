 (function(window) {
     window.App = function() {};
     App.currentAccount = {};
     App.GAME_STATUS = 0;
     App.Modules = {};
     App.MainGame = true;
     App.loadResources = function() {

         if (typeof AppLoadLobby === 'undefined') {
             location.href = jsConfig.urlRoot;
             return;
         }



         $('.spinner').show();
         $('#wrapper').hide();

         jsConfig.GetHostConfig(function() {
             $('.baywin .mainloading').css('background', 'url(' + jsConfig.hostConfig.UrlStatic + jsConfig.hostConfig.Loading + ')  center top / 100% no-repeat');
             $('.baywin .mainloading').show();
         });


         WebFont.load({
             custom: {
                 families: ["Conv_UTM_Swiss", "Conv_UTM_Swiss_Condensed"]
             }
         });
         AppLoadLobby.Loader.init(function() {

             $('.baywin .mainloading').remove();
             $('.spinner').hide();
             $('#wrapper').show();
             $('.lobby').show();


             App.treasure = new Treasure();
             App.treasure.showSpinButton();
             jsConfig.loadBanner();
             App.cardgame = new Cardgame();
             libAccount.init();
             libprofile.init();

             libAccount.CheckAuthencation(function(data) {
                 if (data) {
                     libAccount.GetAccountInfor(function(userData) {
                         libAccount.bindAccountInfo(userData);
                     });
                 }
             });
             App.Lobby = new AppLoadLobby.Game();
             App.Lobby.Init();

         });
     };



     App.BackLobby = function() {

         if (App.GAME_STATUS === 2)
             return;

         if (App.GAME_STATUS == 1) {
             App.GAME_STATUS = 0;
             Cardgame.DellCard();
             return;
         }

         Util.showMessage('Bạn muốn thoát tài khoản?', {
             done: true,
             cancel: true,
             doneText: 'Thoát',
             onOK: function() {
                 AccountInfo.logout();
             },
             cancelText: 'Không'
         });

     };

     $(document).ready(function() {
         var userAgent = navigator.userAgent || navigator.vendor || window.opera;
         if ((/android/i.test(userAgent)) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
             window.location = '//download.' + window.location.hostname + '/download.htm';
         }
         App.Modules = {};

         App.loadResources();
     });

 })(window);


 window.AppLoadLobby = window.AppLoadLobby || {};
 window.AppLoadLobby.Loader = {
     init: function(callback) {
         loader.add('asset_lobby', jsConfig.urlRootStatic + 'assets/asset_lobby.json');
         loader.add('asset_linkgroup', jsConfig.urlRootStatic + 'assets/asset_linkgroup.json');

         loader.add('btn_daily', jsConfig.urlRootStatic + 'assets/btn_daily.json');
         loader.add('icon_tienca', jsConfig.urlRootStatic + 'assets/lobby/icon_tienca.json');
         loader.add('icon_daovang', jsConfig.urlRootStatic + 'assets/lobby/icon_daovang.json');
         loader.add('icon_kong', jsConfig.urlRootStatic + 'assets/lobby/icon_kong.json');
         loader.add('icon_traicay', jsConfig.urlRootStatic + 'assets/lobby/icon_traicay.json');
         loader.add('fish-2', jsConfig.urlRootStatic + 'assets/lobby/fish-2.json');
         loader.add('Icon-TaiXiu', jsConfig.urlRootStatic + 'assets/lobby/Icon-TaiXiu.json');
         loader.add('icon-chuadao', jsConfig.urlRootStatic + 'assets/lobby/icon_chuadao.json');
         loader.add('Icon-Candy-2', jsConfig.urlRootStatic + 'assets/lobby/Icon-Candy-2.json');
         loader.add('icon-minipoker', jsConfig.urlRootStatic + 'assets/lobby/icon-minipoker.json');
         loader.add('icon-monster', jsConfig.urlRootStatic + 'assets/lobby/icon-monster.json');
         loader.add('icon_caothap', jsConfig.urlRootStatic + 'assets/lobby/icon_caothap.json');
         loader.add('ic_asset', jsConfig.urlRootStatic + 'assets/lobby/ic_asset.json');
         loader.add('icon_kubo', jsConfig.urlRootStatic + 'assets/lobby/icon_kubo.json');
         loader.add('icon_rongho', jsConfig.urlRootStatic + 'assets/lobby/icon_rongho.json');
         loader.add('icon_mini_xocxoc', jsConfig.urlRootStatic + 'assets/lobby/icon_mini_xocxoc.json');
         loader.add('icon_minixoso', jsConfig.urlRootStatic + 'assets/lobby/icon_minixoso.json');
         //common
         $.each(jsConfig.loadCommon, function(name, value) {
             loader.add(name, value);
         });
         loader.on("progress", this.progress);
         loader.load(callback);

     },
     complete: function() {},
     progress: function(e) {
         var per = e.progress;
         if (per > 100)
             per = 100;

         var w = (per * 745) / 100;
         $('.processMain .process').css('width', w + 'px');
     }
 };

 window.AppLoadLobby.Game = function() {
     this.create();
 };

 window.AppLoadLobby.Game.prototype = {
     game: null,
     stage: null,
     mainGroup: null,
     create: function() {
         var that = this;
         PIXI.utils.skipHello();
         this.game = new PIXI.Application(1920, 900, {
             antialias: true,
             transparent: true
         });
         try {
             $(".lobby canvas").remove();
         } catch (e) {
             console.log('');
         };
         $(".lobby").append(this.game.view);
         TweenLite.ticker.useRAF(true);
         TweenLite.lagSmoothing(0);

         that.filter = new PIXI.filters.ColorMatrixFilter();
         that.filter.matrix = [1, 0, 0, 0.1, 0, 0, 1, 0, 0.1, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 1, 0];
         that.filterGray = new PIXI.filters.ColorMatrixFilter();
         that.filterGray.matrix = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0];

         this.mainGroup = new Container();
         this.game.stage.addChild(this.mainGroup);
         this.containerLobby = new Container();

         this.containerFooter = new Container();
         this.containerJack = new Container();
         this.containerIcon = new Sprite();

         this.iconSprite = [];

         this.mainGroup.addChild(this.containerFooter, this.containerJack, this.containerLobby);
         this.mainGroup.scale.set(0.87);
         this.MaxY = 0;
         this.MinY = -550;

         this.MaxX = -490;
         this.MinX = -2570;
     },

     resetTweenTab: function() {
         window.addEventListener("blur", function() {
             TweenLite.lagSmoothing(0);
         }, false);
         window.addEventListener("focus", function() {
             TweenLite.lagSmoothing(1000, 16);
         }, false);
     },
     resizeWindow: function() {
         if (void 0 === $('.resizeable')[0].style.zoom || navigator.userAgent.match(/(msie|opera|iphone|ipod|ipad|android)/gi)) {
             return;
         }
         var e = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
             t = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
         var bt = {
             width: 1920,
             height: 1000,
             minScale: 0.3,
             maxScale: 1.2
         };
         var n = bt.width,
             r = bt.height;
         //var xt = e / n;
         var xt = Math.min(e / n, t / r);
         xt = Math.max(xt, bt.minScale);
         xt = Math.min(xt, bt.maxScale);
         this.game.view.style.width = 1920 * xt + 'px';
         this.game.view.style.height = 900 * xt + 'px';


     },
     detectFontSystem: function() {
         if (navigator.userAgent.match(/Android|webOS|Linux/i))
             return "Roboto";
         else if (navigator.userAgent.match(/iPhone|iPad|iPod|Mac/i))
             return "Helvetica Neue";
         else if (navigator.userAgent.match(/Windows/i))
             return "Segoe UI";
         return "Arial";
     },
     Init: function() {
         this.fontSystem = this.detectFontSystem();
         this.InitMask();

         this.createFoter();

         this.createLobby();
         this.createMenu();
         this.resizeWindow();
         this.resetTweenTab();

     },
     InitMask: function() {

         var clip = new Sprite();
         clip.anchor.set(0.5);
         clip.position.set(460, 60);



         var graphics = new PIXI.Graphics();
         this.containerIcon.anchor.set(0.5);
         this.containerIcon.position.set(-490, -50);
         // Rectangle
         graphics.beginFill(0xDE3249);
         graphics.drawRect(0, 0, 5000, 800);
         graphics.alpha = 0.001;
         graphics.endFill();
         this.containerIcon.addChild(graphics);


         var mask = new Graphics();
         mask.beginFill(0x2a2120, 0.001);
         mask.drawRect(0, 0, 1780, 800);
         clip.addChild(mask);
         clip.mask = mask;

         clip.addChild(this.containerIcon);


         this.containerLobby.addChild(clip);

         var obj = App.Lobby;
         this.containerIcon.interactive = true;
         this.containerIcon.on('mousedown', obj.onDragStartIcon)
             .on('touchstart', obj.onDragStartIcon)
             .on('mouseup', obj.onDragEndIcon)
             .on('mouseupoutside', obj.onDragEndIcon)
             .on('touchend', obj.onDragEndIcon)
             .on('touchendoutside', obj.onDragEndIcon)
             .on('mousemove', obj.onDragMoveIcon)
             .on('touchmove', obj.onDragMoveIcon);

     },
     //Icon lobby
     onDragEndIcon: function(event) {

         if (this.dragging) {
             this.dragging = false;

             var newPosition = this.data.getLocalPosition(this.parent);

             var xoffset = newPosition.x - this.dragPoint.x;

             var obj = this;
             if (xoffset > App.Lobby.MaxX) {
                 TweenMax.to(obj, 0.6, {
                     x: App.Lobby.MaxX,
                     ease: Back.easeOut.config(0)

                 });

             }

             if (xoffset < App.Lobby.MinX) {
                 TweenMax.to(obj, 0.6, {
                     x: App.Lobby.MinX,
                     ease: Back.easeOut.config(0)

                 });
             }
             this.data = null;
         }

     },
     onDragStartIcon: function(event) {
         if (!this.dragging) {
             this.data = event.data;
             this.dragging = true;
             this.dragPoint = event.data.getLocalPosition(this.parent);
             this.dragPoint.x -= this.x;

         }





     },
     onDragMoveIcon: function(event) {


         if (this.dragging) {
             var newPosition = this.data.getLocalPosition(this.parent);

             var xoffset = newPosition.x - this.dragPoint.x;

             if (xoffset > App.Lobby.MaxX + 200)
                 xoffset = App.Lobby.MaxX + 200;
             if (xoffset < App.Lobby.MinX - 200)
                 xoffset = App.Lobby.MinX - 200;

             var obj = this;

             TweenMax.to(obj, 0.5, {
                 x: xoffset,

                 ease: Back.easeOut.config(1.7),
                 onComplete: function() {


                 }
             });



         }

     },
     countNumber: function(target, isCanvas, isImages, start, value, decimal, time, callback) {
         var count = new util.CountUp(target, isCanvas, isImages, start, value, 0, time);
         if (!callback) count.start();
         else count.start(callback);
     },
     //menu
     createMenu: function() {
         this.containerMenu = new Sprite(TextureCache["bg_menu_game.png"]);
         this.containerMenu.anchor.set(0.5);
         this.containerMenu.position.set(1165, 66);

         var all = new Sprite();
         var btHover = new Sprite(TextureCache["btn_menu_game.png"]);
         btHover.addChild(new Sprite(TextureCache["txt_tatca_1.png"]));
         btHover.getChildAt(0).anchor.set(0.5);
         btHover.getChildAt(0).scale.set(0.95);
         btHover.anchor.set(0.5);
         btHover.visible = true;
         all.addChild(btHover, new Sprite(TextureCache["txt_tatca_2.png"]));
         all.getChildAt(1).anchor.set(0.5);
         all.getChildAt(1).position.set(0, -4);
         all.getChildAt(1).visible = false;
         all.position.set(-285, 3.5);


         var slot = new Sprite();
         var btslotHover = new Sprite(TextureCache["btn_menu_game.png"]);
         btslotHover.addChild(new Sprite(TextureCache["txt_slotgame_1.png"]));
         btslotHover.getChildAt(0).anchor.set(0.5);
         btslotHover.getChildAt(0).scale.set(0.95);
         btslotHover.getChildAt(0).position.set(0, 3);
         btslotHover.anchor.set(0.5);
         btslotHover.visible = false;
         slot.addChild(btslotHover, new Sprite(TextureCache["txt_slotgame_2.png"]));
         slot.getChildAt(1).anchor.set(0.5);
         slot.getChildAt(1).position.set(0, 0);
         slot.getChildAt(1).visible = true;
         slot.position.set(-101, 3.5);



         var minigame = new Sprite();
         var btminigameHover = new Sprite(TextureCache["btn_menu_game.png"]);
         btminigameHover.addChild(new Sprite(TextureCache["txt_minigame_1.png"]));
         btminigameHover.getChildAt(0).anchor.set(0.5);
         btminigameHover.getChildAt(0).scale.set(0.95);
         btminigameHover.getChildAt(0).position.set(0, 3);
         btminigameHover.anchor.set(0.5);
         btminigameHover.visible = false;
         minigame.addChild(btminigameHover, new Sprite(TextureCache["txt_minigame_2.png"]));
         minigame.getChildAt(1).anchor.set(0.5);
         minigame.getChildAt(1).position.set(0, 0);
         minigame.getChildAt(1).visible = true;
         minigame.position.set(90, 3.5);


         var gamebai = new Sprite();
         var btgamebaiHover = new Sprite(TextureCache["btn_menu_game.png"]);
         btgamebaiHover.addChild(new Sprite(TextureCache["txt_gamebai_1.png"]));
         btgamebaiHover.getChildAt(0).anchor.set(0.5);
         btgamebaiHover.getChildAt(0).scale.set(0.95);
         btgamebaiHover.getChildAt(0).position.set(0, 3);
         btgamebaiHover.anchor.set(0.5);
         btgamebaiHover.visible = false;
         gamebai.addChild(btgamebaiHover, new Sprite(TextureCache["txt_gamebai_2.png"]));
         gamebai.getChildAt(1).anchor.set(0.5);
         gamebai.getChildAt(1).position.set(0, 0);
         gamebai.getChildAt(1).visible = true;
         gamebai.position.set(276, 3.5);


         that = this;
         minigame.interactive = true;
         minigame.menuID = 1;
         minigame.buttonMode = true;
         minigame.on("pointerdown", that.menuDown);

         slot.interactive = true;
         slot.menuID = 2;
         slot.buttonMode = true;
         slot.on("pointerdown", that.menuDown);

         all.interactive = true;
         all.menuID = 0;
         all.buttonMode = true;
         all.on("pointerdown", that.menuDown);

         gamebai.interactive = true;
         gamebai.menuID = 3;
         gamebai.buttonMode = true;
         gamebai.on("pointerdown", that.menuDown);

         this.containerMenu.addChild(all, slot, minigame, gamebai);


         this.mainGroup.addChild(this.containerMenu);

     },
     menuDown: function() {

         var that = App.Lobby;

         for (var i = 0; i < that.containerMenu.children.length; i++) {
             var obj = that.containerMenu.children[i];
             obj.getChildAt(0).visible = false;
             obj.getChildAt(1).visible = true;

         }


         this.getChildAt(0).visible = true;
         this.getChildAt(1).visible = false;


         TweenMax.to(that.containerIcon, 0.5, {
             x: that.MaxX,
             ease: Back.easeOut.config(1.7),
             onComplete: function() {


             }
         });


         that.fillLobby(this.menuID);



     },
     //footer
     createFoter: function() {
         var that = this;
         var bgFooter = new Sprite(TextureCache["bg_footer.png"]);
         bgFooter.anchor.set(0.5);
         bgFooter.position.set(1132, 954);
         bgFooter.scale.set(0.9);


         var btGift = new Sprite(TextureCache["btn_giftcode.png"]);
         btGift.anchor.set(0.5);
         btGift.position.set(-665, -18);
         btGift.interactive = true;
         btGift.buttonMode = true;
         btGift.btnID = 7;
         btGift.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);

         var btCk = new Sprite(TextureCache["btn_ck.png"]);
         btCk.anchor.set(0.5);
         btCk.position.set(-482, -18);
         btCk.interactive = true;
         btCk.buttonMode = true;
         btCk.btnID = 2;
         btCk.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);





         var btSk = new Sprite(TextureCache["btn_skien.png"]);
         btSk.anchor.set(0.5);
         btSk.position.set(-297, -18);
         btSk.interactive = true;
         btSk.buttonMode = true;
         btSk.btnID = 6;
         btSk.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);





         var btFb = new Sprite(TextureCache["btn_fb.png"]);
         btFb.anchor.set(0.5);
         btFb.position.set(312, -18);
         btFb.interactive = true;
         btFb.buttonMode = true;
         btFb.btnID = 4;
         btFb.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);




         var btTele = new Sprite(TextureCache["btn_tele.png"]);
         btTele.anchor.set(0.5);
         btTele.position.set(493, -18);
         btTele.interactive = true;
         btTele.buttonMode = true;
         btTele.btnID = 3;
         btTele.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);


         var btGroup = new Sprite(TextureCache["btn_group.png"]);
         btGroup.anchor.set(0.5);
         btGroup.position.set(677, -18);
         btGroup.interactive = true;
         btGroup.buttonMode = true;
         btGroup.btnID = 5;
         btGroup.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);


         var bgDl = new Sprite();
         bgDl.anchor.set(0.5);
         bgDl.position.set(4, 53);
         var spineDl = new PIXI.spine.Spine(resources['btn_daily'].spineData);

         spineDl.scale.set(1);
         spineDl.state.setAnimation(0, 'animation', true);
         bgDl.addChild(spineDl);
         bgDl.interactive = true;
         bgDl.buttonMode = true;
         bgDl.btnID = 1;
         bgDl.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);




         var bgLinkgroup = new Sprite(TextureCache["bg_linkgroup.png"]);
         bgLinkgroup.anchor.set(0.5);
         bgLinkgroup.scale.set(1.2);
         bgLinkgroup.visible = false;

         bgLinkgroup.position.set(780, -80);
         var btlinkgroup = new Sprite(TextureCache["bt_fbgroup.png"]);
         btlinkgroup.anchor.set(0.5);
         btlinkgroup.position.set(0, 23);
         btlinkgroup.interactive = true;
         btlinkgroup.buttonMode = true;
         btlinkgroup.btnID = 10;
         btlinkgroup.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);


         var btlinktele = new Sprite(TextureCache["bt_linkgroup.png"]);
         btlinktele.anchor.set(0.5);
         btlinktele.position.set(0, -18);
         btlinktele.interactive = true;
         btlinktele.buttonMode = true;
         btlinktele.btnID = 11;
         btlinktele.on("pointerover", that.btnTintOver).on("pointerout", that.btnTintOut)
             .on("pointerup", that.btnTintOut).on("pointerdown", that.onMouseDowFotter);

         bgLinkgroup.addChild(btlinkgroup, btlinktele);


         bgFooter.addChild(bgDl, btGift, btCk, btSk, btFb, btTele, btGroup, bgLinkgroup);
         this.containerFooter.addChild(bgFooter);

     },


     //lobby
     createLobby: function() {
         var arrIc = [{
                 id: 1,
                 name: 'Icon-TaiXiu',
                 mask: 'ic_mark.png',
                 x: 633,
                 y: 292,
                 groupX: 633,
                 groupY: 292,
                 x1: 1,
                 y1: -3,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 2,
                 name: 'icon-chuadao',
                 mask: 'ic_mark.png',
                 x: 640,
                 y: 560,
                 groupX: 640,
                 groupY: 560,
                 x1: -6,
                 y1: 9,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },

             {
                 id: 218,
                 name: 'Icon-Candy-2',
                 mask: 'ic_mark.png',
                 x: 903,
                 y: 292,
                 groupX: 903,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 222,
                 name: 'icon_minixoso',
                 mask: 'ic_mark.png',
                 x: 903,
                 y: 570,
                 groupX: 903,
                 groupY: 570,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },


             {
                 id: 3,
                 name: 'fish-2',
                 mask: 'ic_slot_mark.png',
                 x: 1173,
                 y: 429,
                 groupX: 633,
                 groupY: 429,
                 x1: -113,
                 y1: -228,
                 scale: 1,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 2
             },
             {
                 id: 221,
                 name: 'icon_kong',
                 mask: 'ic_slot_mark.png',
                 x: 1443,
                 y: 429,
                 groupX: 903,
                 groupY: 429,
                 x1: 0,
                 y1: 0,
                 scale: .8,
                 isSpine: 1,
                 isShowJack: true,
                 groupID: 2
             },
             {
                 id: 118,
                 name: 'icon_traicay',
                 mask: 'ic_slot_mark.png',
                 x: 1713,
                 y: 429,
                 groupX: 1173,
                 groupY: 429,
                 x1: 0,
                 y1: 0,
                 scale: .8,
                 isSpine: 1,
                 isShowJack: true,
                 groupID: 2
             },
             {
                 id: 116,
                 name: 'icon_tienca',
                 mask: 'ic_slot_mark.png',
                 x: 1983,
                 y: 429,
                 groupX: 1443,
                 groupY: 429,
                 x1: -2,
                 y1: -5,
                 scale: .8,
                 isSpine: 1,
                 isShowJack: true,
                 groupID: 2
             },
             {
                 id: 219,
                 name: 'icon_daovang',
                 mask: 'ic_slot_mark.png',
                 x: 2253,
                 y: 429,
                 groupX: 1713,
                 groupY: 429,
                 x1: 0,
                 y1: 0,
                 scale: .8,
                 isSpine: 1,
                 isShowJack: true,
                 groupID: 2
             },

             {
                 id: 112,
                 name: 'icon_kubo',
                 mask: 'ic_mark.png',
                 x: 2523,
                 y: 289,
                 groupX: 1173,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 6,
                 name: 'icon_mini_xocxoc',
                 mask: 'ic_mark.png',
                 x: 2523,
                 y: 570,
                 groupX: 1173,
                 groupY: 570,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 111,
                 name: 'icon_caothap',
                 mask: 'ic_mark.png',
                 x: 2793,
                 y: 292,
                 groupX: 1173 + 270,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 115,
                 name: 'icon-minipoker',
                 mask: 'ic_mark.png',
                 x: 2793,
                 y: 570,
                 groupX: 1173 + 270,
                 groupY: 570,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },

             {
                 id: 226,
                 name: 'icon-monster',
                 mask: 'ic_mark.png',
                 x: 3063,
                 y: 292,
                 groupX: 1173 + 270 + 270,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },
             {
                 id: 5,
                 name: 'icon_rongho',
                 mask: 'ic_mark.png',
                 x: 3063,
                 y: 570,
                 groupX: 1173 + 270 + 270,
                 groupY: 570,
                 x1: 0,
                 y1: 0,
                 scale: 0.8,
                 isSpine: 1,
                 isShowJack: false,
                 groupID: 1
             },


             {
                 id: 'GAME_TLMN_DL',
                 name: 'ic_tlmn.png',
                 mask: 'ic_mark.png',
                 x: 3333,
                 y: 292,
                 groupX: 1173,
                 groupY: 292,
                 x1: -3,
                 y1: -1,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_SAMLOC',
                 name: 'ic_sam.png',
                 mask: 'ic_mark.png',
                 x: 3333,
                 y: 570,
                 groupX: 1173,
                 groupY: 570,
                 x1: -2,
                 y1: 1,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_BACAY',
                 name: 'ic_bacay.png',
                 mask: 'ic_mark.png',
                 x: 3603,
                 y: 292,
                 groupX: 1443,
                 groupY: 292,
                 x1: -2,
                 y1: 1,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_MAUBINH',
                 name: 'ic_maubinh.png',
                 mask: 'ic_mark.png',
                 x: 3603,
                 y: 570,
                 groupX: 1443,
                 groupY: 570,
                 x1: -2,
                 y1: 1,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_POKER',
                 name: 'ic_poker.png',
                 mask: 'ic_mark.png',
                 x: 3873,
                 y: 292,
                 groupX: 633,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_XOCDIA',
                 name: 'ic_xocxoc.png',
                 mask: 'ic_mark.png',
                 x: 3873,
                 y: 570,
                 groupX: 633,
                 groupY: 570,
                 x1: -2,
                 y1: 0,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_SAMLOC_SOLO',
                 name: 'ic_sam_sl.png',
                 mask: 'ic_mark.png',
                 x: 4143,
                 y: 292,
                 groupX: 903,
                 groupY: 292,
                 x1: 0,
                 y1: 0,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
             {
                 id: 'GAME_TLMN_DL_SOLO',
                 name: 'ic_tlmn_sl.png',
                 mask: 'ic_mark.png',
                 x: 4143,
                 y: 570,
                 groupX: 903,
                 groupY: 570,
                 x1: 0,
                 y1: 0,
                 scale: 1,
                 isSpine: 0,
                 isShowJack: false,
                 groupID: 3
             },
         ];
         var i;
         for (i = 0; i < arrIc.length; i++) {
             var mask = new Sprite(TextureCache[arrIc[i].mask]);
             mask.GameID = arrIc[i].id;
             mask.GroupID = arrIc[i].groupID;
             mask.targetInfo = arrIc[i];
             mask.isShowJack = arrIc[i].isShowJack;
             mask.scale.set(1.15);
             mask.position.set(arrIc[i].x, arrIc[i].y);
             mask.anchor.set(0.5);

             if (arrIc[i].isSpine === 0) {
                 var ic = new Sprite(TextureCache[arrIc[i].name]);
                 ic.position.set(arrIc[i].x1, arrIc[i].y1);
                 ic.anchor.set(0.5);
                 mask.addChild(ic);

             } else {
                 var spine = new PIXI.spine.Spine(resources[arrIc[i].name].spineData);
                 spine.position.set(arrIc[i].x1, arrIc[i].y1);
                 spine.scale.set(arrIc[i].scale);
                 spine.state.setAnimation(0, 'animation', true);
                 mask.addChild(spine);

             }
             if (arrIc[i].isShowJack) {

                 var bg_maskJack = new Sprite(TextureCache['bg_jackmask.png']);
                 bg_maskJack.anchor.set(0.5);
                 bg_maskJack.position.set(-6, 59);
                 bg_maskJack.scale.set(0.9);
                 var text3 = new Text("50.000.000",
                     new PIXI.TextStyle({
                         fontFamily: "Conv_UTM_Swiss_Condensed",
                         fontSize: 26,

                         fill: ["#f7f59b", "#ff9905"],
                         stroke: "#000",
                         strokeThickness: 2,
                         dropShadow: true,
                         dropShadowColor: "#000",
                         dropShadowAlpha: 0.5,
                         dropShadowBlur: 0,
                         dropShadowAngle: Math.PI / 2,
                         dropShadowDistance: 1
                     }));
                 text3.anchor.set(0.5);
                 text3.position.set(0, 40);
                 text3.valueOlde = 0;


                 var text2 = new Text("5.000.000",
                     new PIXI.TextStyle({
                         fontFamily: "Conv_UTM_Swiss_Condensed",
                         fontSize: 22,
                         fill: ["#f7f59b", "#ff9905"],
                         stroke: "#000",
                         strokeThickness: 2,
                         dropShadow: true,
                         dropShadowColor: "#000",
                         dropShadowAlpha: 0.5,
                         dropShadowBlur: 0,
                         dropShadowAngle: Math.PI / 2,
                         dropShadowDistance: 1
                     }));
                 text2.anchor.set(0.5);
                 text2.position.set(0, 68);
                 text2.valueOlde = 0;


                 var text1 = new Text("500.000",
                     new PIXI.TextStyle({
                         fontFamily: "Conv_UTM_Swiss_Condensed",
                         fontSize: 19,

                         fill: ["#f7f59b", "#ff9905"],
                         stroke: "#000",
                         strokeThickness: 2,
                         dropShadow: true,
                         dropShadowColor: "#000",
                         dropShadowAlpha: 0.5,
                         dropShadowBlur: 0,
                         dropShadowAngle: Math.PI / 2,
                         dropShadowDistance: 1
                     }));
                 text1.anchor.set(0.5);
                 text1.position.set(0, 95);
                 text1.valueOlde = 0;
                 mask.addChild(bg_maskJack, text1, text2, text3);
             }
             this.iconSprite.push(mask);
             this.containerIcon.addChild(mask);
             this.onMouseIcon(mask);
         }
     },
     fillLobby: function(tabId) {
         var that = this;
         var i;
         if (tabId === 0) {
             for (i = 0; i < that.iconSprite.length; i++) {
                 that.iconSprite[i].visible = true;
                 that.iconSprite[i].x = that.iconSprite[i].targetInfo.x;
                 that.iconSprite[i].y = that.iconSprite[i].targetInfo.y;
             }
             that.MinX = -2570;
         } else {
             that.MinX = -490;
             for (i = 0; i < that.iconSprite.length; i++) {
                 if (that.iconSprite[i].GroupID === tabId) {
                     that.iconSprite[i].visible = true;

                     that.iconSprite[i].x = that.iconSprite[i].targetInfo.groupX;
                     that.iconSprite[i].y = that.iconSprite[i].targetInfo.groupY;
                 } else {
                     that.iconSprite[i].visible = false;
                 }
             }
         }
     },
     bindingLobby: function(jack) {
         var that = App.Lobby;
         var listJack = jack.ListJacks;

         var iconshowJackpot = this.iconSprite.filter(function(obj) {
             if (obj.isShowJack === true) {
                 return obj;
             }
         });

         for (var i = 0; i < iconshowJackpot.length; i++) {
             var itemIcon = iconshowJackpot[i];
             var jackItem = listJack.filter(function(obj) {
                 if (obj.GameID === itemIcon.GameID) {
                     return obj;
                 }
             });


             for (var j = 0; j < jackItem.length; j++) {

                 if (jackItem[j].RoomID !== 4) {
                     this.countNumber(itemIcon.getChildAt(jackItem[j].RoomID + 1), true, false, itemIcon.getChildAt(jackItem[j].RoomID + 1).valueOlde, jackItem[j].JackpotFund, 0, 1);
                     itemIcon.getChildAt(jackItem[j].RoomID + 1).valueOlde = jackItem[j].JackpotFund;

                 }



             }

         }

     },
     onMouseDowFotter: function() {

         var id = this.btnID;

         if (id === 3) {
             window.open(jsConfig.urlDownloadAPP);
             return;
         }

         if (id === 4) {
             window.open(jsConfig.hostConfig.linkPort.LinkFb);
             return;
         }
         if (id === 5) {


             var that = App.Lobby;
             var obj = that.containerFooter.getChildAt(0).getChildAt(7);
             if (obj.visible) {
                 obj.visible = false;
             } else {
                 obj.visible = true;
             }
             return;
         }
         if (id === 6) {
             window.open(jsConfig.hostConfig.linkPort.LinkTele1);
             return;
         }

         if (id === 10) {
             window.open(jsConfig.hostConfig.linkPort.LinkFbGroup);
             return;
         }

         if (id === 11) {
             window.open(jsConfig.hostConfig.linkPort.LinkTele2);
             return;
         }
         if (App.currentAccount.AccountID === undefined || App.currentAccount.AccountID <= 0) {
             libAccount.Login();
             return;
         }

         if (id === 1) {
             libprofile.listAgent();
             return;
         }
         if (id === 2) {
             libprofile.transfer();
             return;
         }
         if (id === 7) {
             libAccount.giftCode();
             return;
         }



     },
     btnTintOver: function() {
         this.filters = [App.Lobby.filter];
     },
     btnTintOut: function() {
         this.filters = null;
     },
     onMouseIcon: function(obj) {
         obj.interactive = true;
         obj.on('mousedown', this.onIconDragStart)
             .on('touchstart', this.onIconDragStart)
             .on('mouseup', this.onIconDragEnd)
             .on('mouseupoutside', this.onIconDragEnd)
             .on('touchend', this.onIconDragEnd)
             .on('touchendoutside', this.onIconDragEnd)
             .on('mousemove', this.onIconDragmove)
             .on('touchmove', this.onIconDragmove);
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
             console.log("x" + newPosition.x + "y:" + newPosition.y);

         }
     },
     onIconDragStart: function(event) {
         if (!this.dragging) {
             this.data = event.data;

             this.CountDrag = 0;
             this.dragging = true;
             this.scale.x = 1.2;
             this.scale.y = 1.2;

         }
     },
     onIconDragEnd: function() {
         if (this.dragging) {
             this.dragging = false;

             this.scale.x = 1.15;
             this.scale.y = 1.15;


             this.data = null;
             var name = this.name;
             if (this.CountDrag < 2) {
                 this.CountDrag = 0;
                 console.log(this.GameID);
                 libs.ShowGame(this.GameID);
             }
         }
     },
     onIconDragmove: function() {
         if (this.dragging) {
             this.CountDrag += 1;

         }
     }


 };
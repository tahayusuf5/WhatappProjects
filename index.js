const a0_0x8b68bb=a0_0x8511;(function(_0x26f1b5,_0x44ac19){const _0x5c4ba4=a0_0x8511,_0x6b785b=_0x26f1b5();while(!![]){try{const _0x38349f=-parseInt(_0x5c4ba4(0xb1))/0x1*(parseInt(_0x5c4ba4(0xa8))/0x2)+parseInt(_0x5c4ba4(0xf6))/0x3+parseInt(_0x5c4ba4(0xc7))/0x4+parseInt(_0x5c4ba4(0xb3))/0x5*(parseInt(_0x5c4ba4(0xc6))/0x6)+-parseInt(_0x5c4ba4(0xf2))/0x7*(-parseInt(_0x5c4ba4(0xec))/0x8)+-parseInt(_0x5c4ba4(0xa5))/0x9+-parseInt(_0x5c4ba4(0xbe))/0xa*(parseInt(_0x5c4ba4(0xf9))/0xb);if(_0x38349f===_0x44ac19)break;else _0x6b785b['push'](_0x6b785b['shift']());}catch(_0x1a50cd){_0x6b785b['push'](_0x6b785b['shift']());}}}(a0_0x2673,0x8cbea));const a0_0x3426f1=(function(){let _0x317f96=!![];return function(_0x48fbee,_0x430e48){const _0x47c1f5=_0x317f96?function(){if(_0x430e48){const _0x314349=_0x430e48['apply'](_0x48fbee,arguments);return _0x430e48=null,_0x314349;}}:function(){};return _0x317f96=![],_0x47c1f5;};}()),a0_0x3275b4=a0_0x3426f1(this,function(){const _0x212044=a0_0x8511;return a0_0x3275b4['toString']()[_0x212044(0xeb)](_0x212044(0xc9))[_0x212044(0xad)]()['constructor'](a0_0x3275b4)['search'](_0x212044(0xc9));});a0_0x3275b4();const express=require(a0_0x8b68bb(0xbc)),fs=require('fs'),path=require(a0_0x8b68bb(0xf0)),bodyParser=require('body-parser'),{Client,LocalAuth}=require('whatsapp-web.js'),qrcode=require(a0_0x8b68bb(0xb8)),readline=require(a0_0x8b68bb(0xce)),app=express();function a0_0x8511(_0x1a4c42,_0x45f338){const _0x50cddf=a0_0x2673();return a0_0x8511=function(_0x3275b4,_0x3426f1){_0x3275b4=_0x3275b4-0x91;let _0x2673cd=_0x50cddf[_0x3275b4];return _0x2673cd;},a0_0x8511(_0x1a4c42,_0x45f338);}function a0_0x2673(){const _0x234cee=['--disable-background-timer-throttling','resolve','qrcode','Yanlış\x20format','WORKTYPE\x20ERROR!!','sudoUser','express','/send','5300JsXWCe','body','Server\x20error','use','Yanlış\x20kullanım\x20tespit\x20edildi.\x20Örn\x20/send-905510310485-mesajınız\x20buraya.','onMessage','trim','join','12rQHACV','1109400GRKqan','redirect','(((.+)+)+)+$','parse','qr.png','post','reloadConfigAndPlugins','readline','createInterface','authenticated','/start','error','split','@c.us','send','log','message_create','Geçersiz\x20komut.','worktype','/bot','question','bot.html','urlencoded','/login','QR\x20kodu\x20oluşturuldu\x20ve\x20qr.png\x20olarak\x20kaydedildi.','./users.json','Client\x20is\x20ready!','stringify','cache','.js','/qr','Geçersiz\x20kullanıcı\x20adı\x20veya\x20şifre','--disable-renderer-backgrounding','initialize','auth_failure','sendMessage','search','2972104NPiobG','utf8','forEach','Received\x20message:','path','./config','7fTJWpb','toFile','public','listen','1195368syeWLs','Client\x20was\x20logged\x20out','status','3993EvrASN','static','sendFile','Authentication\x20failed:\x20','Config\x20ve\x20pluginler\x20yeniden\x20yüklendi.','name','push','stdin','startsWith','private','endsWith','index.html','register.html','/reload','session.json','WhatsApp\x20Client\x20başlatılırken\x20bir\x20hata\x20oluştu:','length','exit','Bot\x20başlatılırken\x20bir\x20hata\x20oluştu.','--disable-backgrounding-occluded-windows','>>>\x20','./session.json','347670cBjwad','sudoUsers','905510310485@c.us','182866bEhcNj','Mesaj\x20gönderildi:','get','prefix','/command','toString','readdirSync','plugins','/register','7xNPcjB','/exit','1000555RiiRUz','config','stdout'];a0_0x2673=function(){return _0x234cee;};return a0_0x2673();}app[a0_0x8b68bb(0xc1)](bodyParser[a0_0x8b68bb(0xdd)]({'extended':!![]})),app[a0_0x8b68bb(0xc1)](express[a0_0x8b68bb(0xfa)](a0_0x8b68bb(0xf4)));let client;app[a0_0x8b68bb(0xaa)]('/',(_0x42e367,_0x2fc0bb)=>{const _0x53b6b7=a0_0x8b68bb;_0x2fc0bb[_0x53b6b7(0x91)](path[_0x53b6b7(0xc5)](__dirname,_0x53b6b7(0x9a)));}),app[a0_0x8b68bb(0xaa)]('/register',(_0x28434f,_0xcf15b)=>{const _0x257fbd=a0_0x8b68bb;_0xcf15b[_0x257fbd(0x91)](path[_0x257fbd(0xc5)](__dirname,_0x257fbd(0x9b)));}),app[a0_0x8b68bb(0xcc)](a0_0x8b68bb(0xb0),(_0x508583,_0x2db13d)=>{const _0x1e26a3=a0_0x8b68bb,{username:_0x32bc41,password:_0x122ea5}=_0x508583['body'],_0x55ad52={'username':_0x32bc41,'password':_0x122ea5};fs['writeFileSync'](_0x1e26a3(0xe0),JSON[_0x1e26a3(0xe2)](_0x55ad52)),_0x2db13d[_0x1e26a3(0xc8)]('/');}),app[a0_0x8b68bb(0xcc)](a0_0x8b68bb(0xde),(_0x155c6d,_0x38410d)=>{const {username:_0x36bbd9,password:_0x495a03}=_0x155c6d['body'];validateUser(_0x36bbd9,_0x495a03,(_0x14878b,_0x1c7ff1)=>{const _0x2a5267=a0_0x8511;if(_0x14878b){_0x38410d['status'](0x1f4)['send'](_0x2a5267(0xc0));return;}_0x1c7ff1?_0x38410d[_0x2a5267(0xc8)](_0x2a5267(0xd1)):_0x38410d[_0x2a5267(0xf8)](0x191)[_0x2a5267(0xd5)](_0x2a5267(0xe6));});});function validateUser(_0x43b3fd,_0x346d35,_0x4e6baa){const _0x5bd97f=a0_0x8b68bb;fs['readFile'](_0x5bd97f(0x9d),_0x5bd97f(0xed),(_0x3e51ab,_0x5579ad)=>{const _0xf9d5f9=_0x5bd97f;if(_0x3e51ab)return _0x4e6baa(_0x3e51ab);const _0x32bb4a=JSON[_0xf9d5f9(0xca)](_0x5579ad);_0x32bb4a[_0x43b3fd]===_0x346d35?_0x4e6baa(null,!![]):_0x4e6baa(null,![]);});}app['post'](a0_0x8b68bb(0xd1),async(_0x269a72,_0x19140a)=>{const _0x151dc7=a0_0x8b68bb,{sessionId:_0xabdb66,password:_0x4038c7}=_0x269a72[_0x151dc7(0xbf)],_0x3b44b4={'sessionId':_0xabdb66,'password':_0x4038c7};fs['writeFileSync'](_0x151dc7(0xa4),JSON[_0x151dc7(0xe2)](_0x3b44b4));try{await startWhatsAppClient(_0xabdb66),_0x19140a['sendFile'](path[_0x151dc7(0xc5)](__dirname,_0x151dc7(0xdc)));}catch(_0x2f08d3){console[_0x151dc7(0xd2)](_0x151dc7(0x9e),_0x2f08d3),_0x19140a[_0x151dc7(0xf8)](0x1f4)['send'](_0x151dc7(0xa1));}});async function startWhatsAppClient(_0xee2beb){const _0x4a7c24=a0_0x8b68bb;global[_0x4a7c24(0xb4)]=require(_0x4a7c24(0xf1)),global[_0x4a7c24(0xab)]=config[_0x4a7c24(0xab)],global[_0x4a7c24(0xd9)]=config[_0x4a7c24(0xd9)];var _0x5a2f6f=config[_0x4a7c24(0xa6)];_0x5a2f6f[_0x4a7c24(0x95)](_0x4a7c24(0xa7)),console[_0x4a7c24(0xd6)](_0x5a2f6f),global[_0x4a7c24(0xa6)]=_0x5a2f6f,console[_0x4a7c24(0xd6)](sudoUsers),global['sudoUser']=_0x5a2f6f,console[_0x4a7c24(0xd6)](sudoUser);worktype!==_0x4a7c24(0x98)&&worktype!==_0x4a7c24(0xf4)&&(global[_0x4a7c24(0xd9)]=_0x4a7c24(0x98),console[_0x4a7c24(0xd6)](_0x4a7c24(0xba)));const _0x520940=path['join'](__dirname,_0x4a7c24(0xaf));let _0x575f49=_0x34f68f();client=new Client({'authStrategy':new LocalAuth({'clientId':_0xee2beb}),'puppeteer':{'args':[_0x4a7c24(0xb6),_0x4a7c24(0xa2),_0x4a7c24(0xe7)]}});function _0x34f68f(){const _0xfcdf3=_0x4a7c24,_0x37270b=[];return fs[_0xfcdf3(0xae)](_0x520940)[_0xfcdf3(0xee)](_0x14bd5d=>{const _0x439545=_0xfcdf3;if(_0x14bd5d[_0x439545(0x99)](_0x439545(0xe4))){const _0x1215d7=path['join'](_0x520940,_0x14bd5d);delete require['cache'][require[_0x439545(0xb7)](_0x1215d7)];const _0x4499cb=require(_0x1215d7);_0x37270b['push'](_0x4499cb),console['log']('Loaded\x20plugin:\x20'+_0x4499cb[_0x439545(0x94)]);}}),_0x37270b;}global[_0x4a7c24(0xcd)]=()=>{const _0x3ba416=_0x4a7c24;delete require[_0x3ba416(0xe3)][require[_0x3ba416(0xb7)](_0x3ba416(0xf1))],global[_0x3ba416(0xb4)]=require(_0x3ba416(0xf1)),global['prefix']=global[_0x3ba416(0xb4)][_0x3ba416(0xab)],global[_0x3ba416(0xd9)]=global['config'][_0x3ba416(0xd9)];const _0x1274f2=config['sudoUsers'];global[_0x3ba416(0xbb)]=_0x1274f2,global[_0x3ba416(0xd9)]!==_0x3ba416(0x98)&&global['worktype']!==_0x3ba416(0xf4)&&(global[_0x3ba416(0xd9)]=_0x3ba416(0x98),console[_0x3ba416(0xd6)](_0x3ba416(0xba))),_0x575f49=_0x34f68f(),console[_0x3ba416(0xd6)](_0x3ba416(0x93));},client['on']('qr',async _0x436ac1=>{const _0x5543cd=_0x4a7c24,_0x1480e0=path[_0x5543cd(0xc5)](__dirname,_0x5543cd(0xf4),_0x5543cd(0xcb));await qrcode[_0x5543cd(0xf3)](_0x1480e0,_0x436ac1),console[_0x5543cd(0xd6)](_0x5543cd(0xdf));}),client['on'](_0x4a7c24(0xd0),_0x387bf1=>{console['log']('Authenticated');}),client['on']('ready',async()=>{const _0x30828e=_0x4a7c24;console[_0x30828e(0xd6)](_0x30828e(0xe1)),_0x24152a();}),client['on'](_0x4a7c24(0xe9),_0x1ccbb4=>{const _0x12a65d=_0x4a7c24;console[_0x12a65d(0xd2)](_0x12a65d(0x92),_0x1ccbb4);}),client['on']('disconnected',_0x2e539f=>{const _0x1ad640=_0x4a7c24;console['log'](_0x1ad640(0xf7),_0x2e539f);}),client['on'](_0x4a7c24(0xd7),async _0x17af3a=>{const _0x41d7a5=_0x4a7c24;console[_0x41d7a5(0xd6)](_0x41d7a5(0xef),_0x17af3a['body']);for(const _0x2bb7b9 of _0x575f49){_0x2bb7b9['onMessage']&&await _0x2bb7b9[_0x41d7a5(0xc3)](_0x17af3a);}}),client[_0x4a7c24(0xe8)]();function _0x24152a(){const _0x264c67=_0x4a7c24,_0x1bc074=readline[_0x264c67(0xcf)]({'input':process[_0x264c67(0x96)],'output':process[_0x264c67(0xb5)]});_0x1bc074[_0x264c67(0xdb)](_0x264c67(0xa3),_0x10458a=>{const _0x5bcdab=_0x264c67;if(_0x10458a[_0x5bcdab(0x97)](_0x5bcdab(0xbd)))try{const _0x3d0deb=_0x10458a[_0x5bcdab(0xd3)]('-');if(_0x3d0deb[_0x5bcdab(0x9f)]===0x3){const _0x4644f6=_0x3d0deb[0x1][_0x5bcdab(0xc4)]()+_0x5bcdab(0xd4),_0x6547b0=_0x3d0deb[0x2]['trim']();client[_0x5bcdab(0xea)](_0x4644f6,_0x6547b0),console['log'](_0x5bcdab(0xa9),_0x6547b0);}else throw new Error(_0x5bcdab(0xb9));}catch(_0x4b9d87){console[_0x5bcdab(0xd6)](_0x5bcdab(0xc2));}else{if(_0x10458a[_0x5bcdab(0x97)](_0x5bcdab(0xb2)))process[_0x5bcdab(0xa0)](0x0);else _0x10458a[_0x5bcdab(0x97)](_0x5bcdab(0x9c))?global[_0x5bcdab(0xcd)]():console[_0x5bcdab(0xd6)]('Geçersiz\x20komut.');}_0x1bc074['close'](),_0x24152a();});}}app['get'](a0_0x8b68bb(0xda),(_0x39d6ea,_0x289e0d)=>{const _0x46811b=a0_0x8b68bb;_0x289e0d[_0x46811b(0x91)](path[_0x46811b(0xc5)](__dirname,'bot.html'));}),app[a0_0x8b68bb(0xcc)](a0_0x8b68bb(0xac),(_0x236fc9,_0x476db1)=>{const _0x23dd2b=a0_0x8b68bb,_0x269c22=_0x236fc9[_0x23dd2b(0xbf)]['command'];if(_0x269c22===_0x23dd2b(0xb2))process[_0x23dd2b(0xa0)](0x0);else _0x269c22===_0x23dd2b(0x9c)?global[_0x23dd2b(0xcd)]():console[_0x23dd2b(0xd6)](_0x23dd2b(0xd8));_0x476db1['redirect'](_0x23dd2b(0xda));}),app[a0_0x8b68bb(0xaa)]('/start',(_0xae9d14,_0x26db79)=>{const _0x55161f=a0_0x8b68bb;_0x26db79[_0x55161f(0x91)](path[_0x55161f(0xc5)](__dirname,_0x55161f(0xdc))),startWhatsAppClient();}),app[a0_0x8b68bb(0xaa)](a0_0x8b68bb(0xe5),(_0x4bc282,_0x22e7e9)=>{const _0x1d3884=a0_0x8b68bb;_0x22e7e9[_0x1d3884(0x91)](path[_0x1d3884(0xc5)](__dirname,'qr.html'));}),app[a0_0x8b68bb(0xf5)](0xbb8,()=>{console['log']('Server\x20is\x20running\x20on\x20port\x203000');});
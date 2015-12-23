// whatthekeycode.com
//  define some global variables

$(document).ready(function () {


	  $.ajaxSetup({ cache: true });
	  $.getScript('http://connect.facebook.net/en_US/sdk.js', function(){
	    FB.init({
	      appId: '1484948608415623',
	      version: 'v2.0' // or v2.0, v2.1, v2.0
	    });     
	    $('#loginbutton,#feedbutton').removeAttr('disabled');
	    FB.getLoginStatus(updateStatusCallback);
	  });

	var LOG = false, saving=false;
	var autoplay;
	document.getElementById("autoplay_check").checked = false;
	document.getElementById("englishflag").checked = true;

	$('#textbox').val('');

	var platform = navigator.platform;
	
	//  make height and width dynamic and always updated on resize
	$( window ).resize(function() {
		var viewport = {
		    width  : $(window).width(),
		    height : $(window).height()
		};

		if (LOG) console.log("height: " + viewport.height);
		if (LOG) console.log("width: " + viewport.width);
	});
			


	if (LOG) console.log(platform);

	function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}

	// detect if device is mobile
	 var isMobile =  detectmob();

	 $(document).mousemove(function (e) {
		var mouseX = e.pageX; // e.pageX - gives you the X position.
		var mouseY = e.pageY; // e.pageY - gives you the Y position.
	});

	 // add element to on-screen canvas (hidden)
	 function getBase64Image(img) {
	    canvas = document.getElementById("my-canvas");
	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);
	    dataURL = canvas.toDataURL("image/png");
	    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	function hideForSaving(){
 		$('#download').css('visibility','hidden');
 		$('#again').css('visibility','hidden');
 		$('#vocab').css('visibility','hidden');
 		$('#content').css('margin-top', '10%');
	}

	function prepareForDownload(){
		saving = !saving;
		document.getElementById('savingstate').innerHTML=flashDict[saving];
	}


	 function download() {

	 		hideForSaving();
	 		myElement = document.body;
    	    html2canvas(myElement).then(function(c) {
				// document.body.appendChild(canvas);

				// add element to on-screen invisible canvas
				imgData = getBase64Image(c);
				var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
				
				// save hidden element to file
				canvas.toBlob(function(blob) {
				    saveAs(blob, "alphabet-ninja.png");
				});
			});
	          		
    }

		document.getElementById('download').addEventListener('click', prepareForDownload, false);

	 // function ajaxFlickr() {
	 // 	$.ajax({
		//   type: 'GET',
		//   url: '/my/url',
		//   data: data
		// });
	 // }

	var MX_GAME_MSGS = {
		'english' : mixpanel.track("Game - english"),
		'hebrew' : mixpanel.track("Game - hebrew"),
		'croatian' : mixpanel.track("Game - croatian")
	}

	var TAMIL_LETTERS = {
		"A" : "அ", // A // Mother, Amma
		"Q" : "ஆ", // AA // Goat, Aadu, Amai Tortoise
		"S" : "இ", // i Ilai / leaf
		"W" : "ஈ", // ii I - fly
		"D" : "உ", // u ural, grinder
		"E" : "ஊ", // uu unjal swing
		"G" : "எ", // e erumbu, ant
		"T" : "ஏ", // e- eni, ladder
		"R" : "ஐ", // ai aindhu, five
		"C" : "ஒ", // o ondru, one
		"X" : "ஓ", // o: onAn, chameleon
		"Z" : "ஔ", // au 
		"H" : "க்", // k Chakkaram, wheel
		"B" : "ங்", // n: Sangu, Shell
		"[" : "ச்", // c 
		"]" : "ஞ்", // nj
		"O" : "ட்", // t. Ottagam, camel
		"P" : "ண்", // n. kan, eye
		"L" : "த்", // t Thathai, parrot
		";" : "ந்", // nn pandhu, ball
		"J" : "ப்", // p kappal, ship
		"K" : "ம்", // m ambu, arrow
		"'" : "ய்", // y naai, dog
		"M" : "ர்", // r malar, flower
		"N" : "ல்", // l kal, leg
		"V" : "வ்", // v 
		"/" : "ழ்", // l- itazh, lips
		"Y" : "ள்", // l--
		"U" : "ற்", // r
		"I" : "ன்", // nn-
		"" : "ஶ்", // s
		"" : "ஜ்", //  j
		"" : "ஷ்", // sh
		"" : "ஸ்", // ss
		"" : "ஹ்", // h
		"" : "க்ஷ்" // ks
	};

	var TAMIL_PICS = [
			// "A" : 
			"அ", // A Mother, Amma
			// "Q" : 
			"ஆ", // AA Goat, Aadu
			// "S" : 
			"இ", // i
			// "W" : 
			"ஈ", // ii FLY
			// "D" : 
			"உ", // u
			// "E" : 
			"ஊ", // uu
			// "G" : 
			"எ", // e MOUSE
			// "T" : 
			"ஏ", // e-
			// "R" : 
			"ஐ", // ai
			// "C" : 
			"ஒ", // o CAMEL
			// "X" : 
			"ஓ", // o:
			// "Z" : 
			"ஔ", // au
			// "H" : 
			"க்", // k
			// "B" : 
			"ங்", // n:
			// "[" : 
			"ச்", // c
			// "]" : 
			"ஞ்", // nj
			// "O" : 
			"ட்", // t.
			// "P" : 
			"ண்", // n.
			// "L" : 
			"த்", // t
			// ";" : 
			"ந்", // nn
			// "J" : 
			"ப்", // p
			// "K" : 
			"ம்", // m
			// "'" : 
			"ய்", // y RABBIT
			// "M" : 
			"ர்", // r - SAW
			// "N" : 
			"ல்", // l
			// "V" : 
			"வ்", // v
			// "/" : 
			"ழ்", // l-
			// "Y" : 
			"ள்", // l--
			// "U" : 
			"ற்", // r SOME KIND OF BIRD :)
			// "I" : 
			"ன்", // nn-
			// "" : 
			"ஶ்", // s
			// "" : 
			"ஜ்", //  j
			// "" : 
			"ஷ்", // sh
			// "" : 
			"ஸ்", // ss
			// "" : 
			"ஹ்", // h
			// "" : 
			"க்ஷ்" // ks
		];

	var TAMIL_SOUNDS = [
			// "A" : 
			"அ", // A Mother, Amma
			// "Q" : 
			"ஆ", // AA Goat, Aadu
			// "S" : 
			"இ", // i
			// "W" : 
			"ஈ", // ii
			// "D" : 
			"உ", // u
			// "E" : 
			"ஊ", // uu
			// "G" : 
			"எ", // e
			// "T" : 
			"ஏ", // e-
			// "R" : 
			"ஐ", // ai
			// "C" : 
			"ஒ", // o
			// "X" : 
			"ஓ", // o:
			// "Z" : 
			"ஔ", // au
			// "H" : 
			"க்", // k
			// "B" : 
			"ங்", // n:
			// "[" : 
			"ச்", // c
			// "]" : 
			"ஞ்", // nj
			// "O" : 
			"ட்", // t.
			// "P" : 
			"ண்", // n.
			// "L" : 
			"த்", // t
			// ";" : 
			"ந்", // nn
			// "J" : 
			"ப்", // p
			// "K" : 
			"ம்", // m
			// "'" : 
			"ய்", // y
			// "M" : 
			"ர்", // r
			// "N" : 
			"ல்", // l
			// "V" : 
			"வ்", // v
			// "/" : 
			"ழ்", // l-
			// "Y" : 
			"ள்", // l--
			// "U" : 
			"ற்", // r
			// "I" : 
			"ன்", // nn-
			// "" : 
			"ஶ்", // s
			// "" : 
			"ஜ்", //  j
			// "" : 
			"ஷ்", // sh
			// "" : 
			"ஸ்", // ss
			// "" : 
			"ஹ்", // h
			// "" : 
			"க்ஷ்" // ks
		];

	var	tamil_vowel_sounds = ["","a","ā","i","ī","u","ū","e","ē","ai","o","ō","au"];
	var tamil_vowels = ["ஃ","அ","ஆ","இ","ஈ","உ","ஊ","எ","ஏ","ஐ","ஒ","ஓ","ஔ"];	
	var tamil_syllables = [
		{"k" : ["க்",,"க","கா","கி","கீ","கு","கூ","கெ","கே","கை","கொ","கோ","கௌ"]},
		{"ṅ" : ["ங்","ங","ஙா","ஙி","ஙீ","ஙு","ஙூ","ஙெ","ஙே","ஙை","ஙொ","ஙோ","ஙௌ"]},
		{"c" : ["ச்","ச","சா","சி","சீ","சு","சூ","செ","சே","சை","சொ","சோ","சௌ"]},
		{"ñ" : ["ஞ்","ஞ","ஞா","ஞி","ஞீ","ஞு","ஞூ","ஞெ","ஞே","ஞை","ஞொ","ஞோ","ஞௌ"]},
		{"ṭ" : ["ட்","ட","டா","டி","டீ","டு","டூ","டெ","டே","டை","டொ","டோ","டௌ"]},
		{"ṇ" : ["ண்","ண","ணா","ணி","ணீ","ணு","ணூ","ணெ,,ணே","ணை","ணொ","ணோ","ணௌ"]},
		{"t" : ["த்","த","தா","தி","தீ","து","தூ","தெ","தே","தை","தொ","தோ","தௌ"]},
		{"n" : ["ந்","ந","நா","நி","நீ","நு","நூ","நெ","நே","நை","நொ","நோ","நௌ"]},
		{"p" : ["ப்","ப","பா","பி","பீ","பு","பூ","பெ","பே","பை","பொ","போ","பௌ"]},
		{"m" : ["ம்","ம","மா","மி","மீ","மு","மூ","மெ","மே","மை","மொ","மோ","மௌ"]},
		{"y" : ["ய்","ய","யா","யி","யீ","யு","யூ","யெ","யே","யை","யொ","யோ","யௌ"]},
		{"r" : ["ர்","ர","ரா","ரி","ரீ","ரு","ரூ","ரெ","ரே","ரை","ரொ","ரோ","ரௌ"]},
		{"l" : ["ல்","ல","லா","லி","லீ","லு","லூ","லெ","லே","லை","லொ","லோ","லௌ"]},
		{"v" : ["வ்","வ","வா","வி","வீ","வு","வூ","வெ","வே","வை","வொ","வோ","வௌ"]},
		{"ḻ" : ["ழ்","ழ","ழா","ழி","ழீ","ழு","ழூ","ழெ","ழே","ழை","ழொ","ழோ","ழௌ"]},
		{"ḷ" : ["ள்","ள","ளா","ளி","ளீ","ளு","ளூ","ளெ","ளே","ளை","ளொ","ளோ","ளௌ"]},
		{"ṟ" : ["ற்","ற","றா","றி","றீ","று","றூ","றெ","றே","றை","றொ","றோ","றௌ"]},
		{"ṉ" : ["ன்","ன","னா","னி","னீ","னு","னூ","னெ","னே","னை","னொ","னோ","னௌ"]}
	];

	var TamilDict = makeTamilDict();
	if (LOG) console.log(TamilDict);

	var ppp = 0;
	for (key in TamilDict){ppp++;}
	if (LOG) console.log(ppp);

	var HEBREWLETTERS = {"A" : "ש","B" : "נ","C" : "ב","D" : "ג","E" : "ק","F" : "כ","G" : "ע","H" : "י","I" : "ן","J" : "ח","K" : "ל","L" : "ך","M" : "צ","N" : "מ","O" : "ם","P" : "פ","Q" : "","R" : "ר","S" : "ד","T" : "א","U" : "ו","V" : "ה","W" : "","X" : "ס","Y" : "ט","Z" : "ז","," : "ת","." : "ץ",";" : "ף"};
	var HEBREWSOFIT = {"I" : "ן","L" : "ך","." : "ץ",";" : "ף"};
	var NASLETTERS = {"A" : "A","B" : "B","C" : "C","D" : "D","E" : "E","F" : "F","G" : "G","H" : "H","I" : "I","J" : "J","K" : "K","L" : "L","M" : "M","N" : "N","O" : "O","P" : "P","Q" : "Q","R" : "R","S" : "S","T" : "T","U" : "U","V" : "V","W" : "W","X" : "X","Y" : "Y","Z" : "Z","[" : "Š","]" : "Đ",";" : "Č","'" : "Ć","\\": "Ž"};
	var LETTERMAP = {'hebrew' : HEBREWLETTERS,'croatian' : NASLETTERS}

	var KEYCODETOCHAR_UK = {
		// 8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",
		// 48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
		65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"	};
	var KEYCODETOCHAR_ISR = {
		// 8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",
		// 48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
		65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",
		188: ",", 190: ".", 186: ";" };
	var KEYCODETOCHAR_CRO = {
		65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",
		219: "[", 221: "]", 186: ";", 222: "'", 220: "\\" };
	var KEYCODES = {
		'english' : KEYCODETOCHAR_UK,
		'hebrew': KEYCODETOCHAR_ISR,
		'croatian' : KEYCODETOCHAR_CRO};
	var KEYCHARTOCODE = {
		// "Backspace":8,"Tab":9,"Enter":13,"Shift":16,"Ctrl":17,"Alt":18,"Pause/Break":19,"Caps Lock":20,"Esc":27,"Space":32,"Page Up":33,"Page Down":34,"End":35,"Home":36,"Left":37,"Up":38,"Right":39,"Down":40,"Insert":45,"Delete":46,
		// "0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,
		"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,
		"'":39,",":44,"-":45,".":46,"/":47,":":58,"=":61,"[":91,"\\":92,"]":93,"`":96};

	var HEBREWPICS = {
		"א" : "lion 2.svg",
		"ב" : "duck2.svg",
		"ג"	: "guitar.svg",
		"ד" : "bee2.svg",
		"ה" : "hippo.png",
		"ו" : "curtains.svg",
		"ז" : "zebra.svg",
		"ח" : "cat.svg",
		"ט" : "parrot.svg",
		"י" : "owl.svg",
		"כ" : "dog.svg",
		"ל" : "whale.svg",
		"מ" : "umbrella.svg",
		"נ" : "river.svg",		
		"ס" : "horse.svg",
		"ע" : "yawn.svg",
		"פ" : "elephant.svg",
		"צ" : "frog.svg",
		"ק" : "monkey.svg",
		"ר" : "shaker.svg",
		"ש" : "quiet.svg",
		"ת" : "apple2.svg",
		"ן" : "balloon.svg",
		"ך" : "king.svg",
		"ץ" : "explosion.svg",
		"ף" : "drum.svg",
		"ם" : "scissors.svg",
		"rocket" : "rocket-ship-shooting-md.png"};
	var HEBREWSOUNDS = {
		"א" : "audio/Male_snoring_with_effects_-sounds_like_a_lion-_Nightingale_Music_Productions.mp3" ,
		"ב" : "audio/Animals_duck_quack_-nature-_Nightingale_Music_Productions_13810.mp3",
		"ג" : "audio/Acoustic_BPM_110_32_Shriek_2011.mp3" ,
		"ד" : "audio/human_bee.mp3" ,
		"ה" : "audio/hippo.mp3",
		"ו" : "audio/HOSPITAL_BED_CURTAIN_OP.mp3",
		"ז" : "audio/Horse_two_horses_neigh_step_in_dirt_BLASTmp3EFX_00173.mp3" ,
		"ח" : "audio/13_year_old_Tabby_Cat_-_Meows-Irritated.mp3" ,
		"ט" : "audio/parrot_12007201.mp3" ,
		"י" : "audio/owl.mp3" ,
		"כ" : "audio/EFX_INT_Dog_Panting_05_AAA.mp3" ,
		"ל" : "audio/Submarine_sonar_ping_multiple_BLASTWAVEFX_18257.mp3" ,
		"מ" : "audio/rain_car_interior_wind_shield_wipers_on.mp3" ,
		"ם" : "audio/Scissor_cuts_thick_paper_AOS02714.mp3" ,
		"נ" : "audio/river_churnet_water_1998.mp3",
		"ּּן" : "audio/many balloons fly by releasing air.mp3",
		"ס" : "audio/horse.mp3" ,
		"ע" : "audio/HUMAN_VOICE_YAWN_01.mp3" ,
		"פ" : "audio/CARTOON_TROMBONE_DEEP_SLIDE_01.mp3" ,
		"ף" : "audio/Drum_snare_fanfare_BLASTmp3EFX_14764.mp3" ,
		"צ" : "audio/Frogs_croaking_close_in_a_loop.mp3" ,
		"ץ" : "audio/Bomb_explosion_medium_distance_muffled_warped_01_SFXBible_ss06658.mp3" , 
		"ק" : "audio/LTMacaque.mp3" ,
		"ך" : "audio/trumpets_fanfar.mp3" ,
		"ר" : "audio/Bartender_shakes_ice_and_drink_in_metal_ice_shaker_AOS01016.mp3",
		"ש" : "audio/Late_20s_Woman_Says_Shhh-Shush-Soft-Choppy.mp3" ,
		"ת" : "audio/Eating_apple_soundsnap.mp3" ,	
		"success" : "audio/Peppa.mp3",
		"other" : "audio/3.mp3",
		"correct" : "audio/p.mp3",
		"rocket"  : "audio/Rocket_launch_05_SFXBible_ss06674.mp3",
		"tick"	: "audio/Data_beep_counter_tick_1.mp3"};

	var SOUNDS = {
	
			"A" : "audio/Eating_apple_soundsnap.mp3" ,
			"B" : "audio/human_bee.mp3" ,
			"C" : "audio/13_year_old_Tabby_Cat_-_Meows-Irritated.mp3" ,
			"D" : "audio/EFX_INT_Dog_Panting_05_AAA.mp3" ,
			"E" : "audio/CARTOON_TROMBONE_DEEP_SLIDE_01.mp3" ,
			"F" : "audio/Frogs_croaking_close_in_a_loop.mp3" ,
			"G" : "audio/Acoustic_BPM_110_32_Shriek_2011.mp3" ,
			"H" : "audio/horse.mp3" ,
			"I" : "audio/Slurp_BLASTWAVEFX_13030.mp3" ,
			"J" : "audio/Water_fish_swimming.mp3" ,
			"K" : "audio/doing_-_mouth_harp_8_clean_two_kinds.mp3" ,
			"L" : "audio/Male_snoring_with_effects_-sounds_like_a_lion-_Nightingale_Music_Productions.mp3" ,
			"M" : "audio/LTMacaque.mp3" ,
			"N" : "audio/Male_blow_nose_BLASTWAVEFX_19918.mp3" ,
			"O" : "audio/owl.mp3" ,
			"P" : "audio/parrot_12007201.mp3" ,
			"Q" : "audio/Late_20s_Woman_Says_Shhh-Shush-Soft-Choppy.mp3" ,
			"R" : "audio/chewing_carrot.mp3" ,
			"S" : "audio/sheep.mp3" ,
			"T" : "audio/Trumpet-37_D_BPM_77.mp3" ,
			"U" : "audio/rain_car_interior_wind_shield_wipers_on.mp3" ,
			"V" : "audio/Violin_G_major_scale_up_down_BLASTWAVEFX_27410.mp3" ,
			"W" : "audio/Submarine_sonar_ping_multiple_BLASTWAVEFX_18257.mp3" ,
			"X" : "audio/Pretty_xylophone_melody_AOS00288.mp3" ,
			"Y" : "audio/HUMAN_VOICE_YAWN_01.mp3" ,
			"Z" : "audio/Horse_two_horses_neigh_step_in_dirt_BLASTmp3EFX_00173.mp3" ,
			// "0" : "audio/1.mp3" ,
			// "1" : "audio/1.mp3" ,
			// "2" : "audio/2.mp3" ,
			// "3" : "audio/3.mp3" ,
			// "4" : "audio/4.mp3" ,
			// "5" : "audio/5.mp3" ,
			// "6" : "audio/6.mp3" ,
			// "7" : "audio/7.mp3" ,
			// "8" : "audio/8.mp3" ,
			// "9" : "audio/9.mp3" ,
			"success" : "audio/Peppa.mp3",
			"other" : "audio/3.mp3",
			"correct" : "audio/p.mp3",
			"rocket"  : "audio/Rocket_launch_05_SFXBible_ss06674.mp3",
			"tick"	: "audio/Data_beep_counter_tick_1.mp3"};
	var PICS = {
		"A" : "apple2.svg",
		"B" : "bee2.svg",
		"C" : "cat.svg",
		"D" : "dog.svg",
		"E" : "elephant.svg",
		"F" : "frog.svg",
		"G"	: "guitar.svg",
		"H" : "horse.svg",
		"I" : "icecream.svg",
		"J" : "jellyfish.svg",
		"K" : "kangaroo.svg",
		"L" : "lion 2.svg",
		"M" : "monkey.svg",
		"N" : "nose.svg",
		"O"	: "owl.svg",
		"P" : "parrot.svg",
		"Q" : "quiet.svg",
		"R" : "rabbit.svg",
		"S" : "sheep.png",
		"T" : "trumpet.svg",
		"U" : "umbrella.svg",
		"V" : "violin.svg",
		"W" : "whale.svg",
		"X" : "xylophone.svg",
		"Y" : "yawn.svg",
		"Z" : "zebra.svg",
		"rocket" : "rocket-ship-shooting-md.png"};
	var ENG_PLAYLIST_ANIMALS = ['DOG', 'MONKEY', 'PARROT', 'CAT', 'WHALE', 'HORSE', 'ZEBRA', 'FROG', 'OWL', 'RABBIT' ];
	var ENG_PLAYLIST_ANIMALS_SOUNDS = {
		'DOG' : "audio/matan_dog.mp3",
		'MONKEY' : "audio/matan_monkey.mp3",
		'PARROT' : "audio/matan_parrot.mp3" , 
		'CAT' : "audio/matan_cat.mp3",
		'WHALE' : "audio/matan_whale.mp3",
		'HORSE' : "audio/matan_horse.mp3",
		'ZEBRA' : "audio/matan_zebra.mp3",
		'FROG' : "audio/alma-frog.mp3", 
		'OWL' : "audio/alma-owl.mp3",
		'RABBIT' : "audio/alma-rabbit.mp3"}
	var ENG_PLAYLIST_MUSIC = ['VIOLIN', 'GUITAR', 'TRUMPET'];

	var NASPICS = {
		"A"	:"car_pd_192.png", // auto  - revving engine
		"B" :"balloon_new.png" , //balloon
		"C" :"shoe_pd_878.png", // shoes - walking sound cipela
		"Č" :"hammer.png", // hammer - nails hammering sound cekic
		"Ć" :PICS["O"], //owl (ćuk)
		"D" :"dinosaur.png", // dinosaur / roaring lion sound 
		"Dž" :"mosque.png", //pocket (zip sound) - džamija
		"Đ" : "student.png", //pupil, student - sound of school bell? sound of  
		"E" :"esquimal.png", //  Shivering sound? eskim
		"F" :"flute.png",  // camera clicking sound, frula,flauta (flute)
		"G" :PICS["G"], //guitar
		"H" :"octopus.png", // Jellyfish sound hobotnica
		"I" :"needle.png", //"OWWWW!" sound igla
		"J" : PICS["A"] , //apple
		"K" : PICS["X"], //horse, kangaroo(klokan), umbrella,whale, xylo, king
		"L" :PICS["L"], // lion
		"Lj" :"swing_pd_noun_206.png",  //swing ljuljačka, "WHEEEE" sound
		"M" :PICS["M"], //monkey, cat, 
		"N" :PICS["N"], //nose
		"Nj" :"njuska.png", // njuška dog's nose, dog sniffing fast
		"O" : PICS["S"], //sheep
		"P" : HEBREWPICS["ב"], //duck
		"R" : "hand.png", // hands clapping
		"S" : PICS["E"], //elephant     ,icecream, 
		"Š" :HEBREWPICS["ם"], //scissors
		"T" :PICS["T"], //trumpet, quiet, 
		"U" :"clock.png", // ura - clock ticking, cuckoo //race -> cheering at end
		"V" : PICS["V"],//violin
		"Z" : HEBREWPICS["Y"], //rabbit, yawn, zebra, curtain (zavjesa)
		"Ž" : HEBREWPICS["צ"] //frog,
	};
	var NASSOUNDS = {
		"A"	:"audio/Toyota-Matrix-2007-Start-Rev-Small.mp3", // auto  - revving engine
		"B" :"audio/many balloons fly by releasing air.mp3" , //balloon
		"C" :"audio/steps.mp3", // shoes - walking sound cipela
		"Č" :"audio/hitting strongly with hammer.mp3", // hammer - nails hammering sound cekic
		"Ć" :"audio/owl.mp3", //owl (ćuk)
		"D" :"audio/Male_snoring_with_effects_-sounds_like_a_lion-_Nightingale_Music_Productions.mp3", // dinosaur / roaring lion sound 
		"Dž" :"audio/mosque.mp3", //pocket (zip sound) - džamija
		"Đ" :"audio/School bell ring_BLASTWAVEFX_23042.mp3", //pupil, student - sound of school bell? sound of  
		"E" :"audio/Male shivers with cold- long_Nightingale Music Productions_12506.mp3", //  Shivering sound? eskim
		"F" :"audio/Suling.mp3",  // camera clicking sound, frula,flauta (flute)
		"G" :"audio/Acoustic_BPM_110_32_Shriek_2011.mp3", //guitar
		"H" :"audio/Water_fish_swimming.mp3", // Jellyfish sound hobotnica
		"I" :"audio/ouch.mp3", //"OWWWW!" sound igla
		"J" : "audio/Eating_apple_soundsnap.mp3" , //apple
		"K" :"audio/Pretty_xylophone_melody_AOS00288.mp3", //horse, kangaroo(klokan), umbrella,whale, xylo, king
		"L" :"audio/Male_snoring_with_effects_-sounds_like_a_lion-_Nightingale_Music_Productions.mp3", // lion
		"Lj" :"audio/swings.mp3",  //swing ljuljačka, "WHEEEE" sound
		"M" :"audio/LTMacaque.mp3", //monkey, cat, 
		"N" :"audio/Male_blow_nose_BLASTWAVEFX_19918.mp3", //nose
		"Nj" :"audio/Late 20s Woman Sniffs-Random.mp3", // njuška dog's nose, dog sniffing fast
		"O" :"audio/sheep.mp3", //sheep
		"P" : "audio/Animals_duck_quack_-nature-_Nightingale_Music_Productions_13810.mp3", //duck
		"R" :"audio/HUMAN CROWD CLAP PATTERN IN UNISON 01.mp3", // hands clapping
		"S" :"audio/CARTOON_TROMBONE_DEEP_SLIDE_01.mp3", //elephant     ,icecream, 
		"Š" :"audio/Scissor_cuts_thick_paper_AOS02714.mp3", //scissors
		"T" :"audio/Trumpet-37_D_BPM_77.mp3", //trumpet, quiet, 
		"U" :"audio/cuckooclock.mp3", // ura - clock ticking, cuckoo //race -> cheering at end
		"V" :"audio/Violin_G_major_scale_up_down_BLASTWAVEFX_27410.mp3",//violin
		"Z" :"audio/HUMAN_VOICE_YAWN_01.mp3", //rabbit, yawn, zebra, curtain (zavjesa)
		"Ž" :"audio/Frogs_croaking_close_in_a_loop.mp3", //frog,
		"success" : "audio/Peppa.mp3",
		"other" : "audio/3.mp3",
		"correct" : "audio/p.mp3",
		"rocket"  : "audio/Rocket_launch_05_SFXBible_ss06674.mp3",
		"tick"	: "audio/Data_beep_counter_tick_1.mp3"};
	var CRO_PLAYLIST_ANIMALS = ['LAV', 'MAJMUN', 'OVCA', 'SLON', 'PATKA', 'KONJ', 'ZEBRA', 'ŽABA', 'ĆUK'];
	var CRO_PLAYLIST_ANIMALS_SOUNDS = {
		'LAV' : "",
		'MAJMUN' : "",
		'OVCA' : "" , 
		'CAT' : "",
		'SLON' : "",
		'PATKA' : "",
		'KONJ' : "",
		'ŽABA' : "", 
		'ĆUK' : "",
		'ZEBRA' : ""
	}


	var LANGUAGETODICT = {
		'english' : {
			pics: PICS,
			sounds: SOUNDS,
			playlist: ENG_PLAYLIST_ANIMALS,
			playlist_sounds: ENG_PLAYLIST_ANIMALS_SOUNDS},
		'hebrew' : {
			pics: HEBREWPICS,
			sounds: HEBREWSOUNDS,
			playlist: ENG_PLAYLIST_ANIMALS,
			playlist_sounds: ENG_PLAYLIST_ANIMALS_SOUNDS},
		'croatian' : {
			pics: NASPICS,
			sounds: NASSOUNDS,
			playlist: CRO_PLAYLIST_ANIMALS,
			playlist_sounds: CRO_PLAYLIST_ANIMALS_SOUNDS}
	};

	
	var LANGUAGETOMESSAGES = {
		'english' : { 
					ready : "Are You Ready?",
					clickbox : "Please click the box above and write a secret word",
					toolong : "Make your browser wider or choose a shorter word",
					language_error: "Please check the language flag, and what you have written in the box",
					// howtoplay : "How To Play",
					placeholder : "Enter A Secret Word",
					buttontext : "Let's Play",
					instructionsTitle: "Instructions",
					randomTitle: "Random word",
					autoPlayTitle: "Autoplay",
					instructions0 : "Welcome to our game for little ninjas and big ninjas to play together",
					instructions1 : "Ask your little ninja what word they want to spell -  a name works really well",
					instructions2 : "Tell us which language you're using",
					instructions3 : "Get ready to have fun together!",
					text_align : 'left',
					playlist_animals: 'animals',
					playlist_music: 'music',
					playlist_random: 'random'

		},
		'hebrew' : {
					ready : "!קדימה",
					clickbox :"אנא כתוב מילה בתיבה",
					toolong :"אנא כתוב מילה קצרה יותר",
					language_error: "Please check the language flag, and what you have written in the box",
					// howtoplay :"איך לשחק",
					placeholder :"הקלד מילה",
					buttontext :"יאללה נשחק",
					instructionsTitle: "הוראות",
					randomTitle: "מילה אקראית",
					autoPlayTitle: "הפעלה אוטומטית",
					instructions0 : "ברוכים הבאים למשחק משותף עבור נינג׳ות קטנים/ות וגדולים/ות",
					instructions1 : "בקשו מהנינג׳ה הקטן/ה שלכם לבחור מילה לאיות,  שם עובד נפלא",
					instructions2 : "בחרו את השפה הרצויה",
					instructions3 : "תהנו",
					text_align : 'right',
					playlist_animals: 'animals',
					playlist_music: 'music',
					playlist_random: 'random'
		},	
		'croatian' : {
					ready : "Spremni ste?",
					clickbox :"Kliknuti ovdje!",
					toolong :"Vaš rijeć je predugačak",
					language_error: "Molim provjeriti napisani rijeć za pogriješke",
					// howtoplay :"Kako igrati",
					placeholder :"Napisati tajni rijeć",
					buttontext :"Hajmo igrati",
					instructionsTitle: "instrukcije",
					randomTitle: "slučajna riječ",
					autoPlayTitle: "neprekidna igra",
					instructions0 : "Dobro došli do našoj igre za malih i velikih nindže",
					instructions1 : "Pitajte malu nindžu koji rijeć želi - ime radi jako dobro",
					instructions2 : "Koji jezik koristite?",
					instructions3 : "Pripremite se!",
					text_align : 'left',
					playlist_animals: 'životinje',
					playlist_music: 'glazba',
					playlist_random: 'slučajni'
		}
	};

	var ADDITIONALFLAGS = {
		 "hebrew" : "israel.svg",
		 "croatian" : "yugoslavia-bw.png"
		 // "russia" : "russia.svg"
		 // "tamil" : "tamil.png"
	};

	function clearJoyride() {
		jQuery(window).joyride("destroy");
	}

	Array.prototype.subarray=function(start,end){
     	if(!end){ end=-1;} 
    	return this.slice(start, this.length+1-(end*-1));
	}

	function makeTamilDict() {

		tamil_dict = {};
		var len = tamil_syllables.length;

		for (var i=0;i<len;i++){
			s = tamil_syllables[i];
			for (key in s){
						var t = s[key].slice(2,s.length);
						var sound = key;
			}

			// console.log(sound);
			// console.log(t);
			
			for (var j=0;j<t.length;j++){
				english_syllable = sound+tamil_vowel_sounds[j];
      			tamil_syllable = t[j];
      			tamil_dict[english_syllable] = tamil_syllable;
      			// console.log(tamil_syllable);
      			// console.log(english_syllable);
      				
			}
		}

		for (i=0;i<tamil_vowels.length;i++){tamil_dict[tamil_vowel_sounds[i]] = tamil_vowels[i];}
		
		return tamil_dict;
	}

	function translateText() {
		var d = LANGUAGETOMESSAGES;
		var language = $(".selected").attr('value');

		clearJoyride(); // make sure Joyride is cleared before attaching new values

		$('#textbox').attr('placeholder', d[language].placeholder);
		$('#letsplay').text(d[language].buttontext);
		$('#instructions').text(d[language].howtoplay);
		var joyride = $('#joyRideTipContent li p');
		joyride.eq(0).text(d[language].instructions0);
		joyride.eq(1).text(d[language].instructions1);
		joyride.eq(2).text(d[language].instructions2);
		joyride.eq(3).text(d[language].instructions3);
		$( "#textbox" ).focus();
		joyride.css("text-align", d[language].text_align);

		$('#instructions').attr('title',d[language].instructionsTitle);
		$('#randomword').attr('title',d[language].randomTitle);
		$('#autoplay_img').attr('title',d[language].autoPlayTitle);

		document.getElementById("playlist_displayed").innerHTML = d[language].playlist_animals;
		document.getElementById("playlist_animals").innerHTML = d[language].playlist_animals;
		document.getElementById("playlist_music").innerHTML =  d[language].playlist_music;
		document.getElementById("playlist_random").innerHTML =  d[language].playlist_random;


		// change show/hide the text for instructions

		// startTheGame('');

	}

	

	// image condition
	// Get the size of an object by using  defined function

	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	// function negArray(arr) { // only experimental in Chrome
	//   return Proxy({
	//     set: function (proxy, index, value) {
	//         index = parseInt(index);
	//         return index < 0 ? (arr[arr.length + index] = value) : (arr[index] = value);
	//     }, 
	//     get: function (proxy, index) {
	//         index = parseInt(index);
	//         return index < 0 ? arr[arr.length + index] : arr[index];
	//     }
	//   });
	// }

	spectrum();
	function spectrum(){
	    var hue = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.random() - 0.1) + ')';
	    $('body, #inputs input, html').animate( { backgroundColor: hue }, 5000);
	    setTimeout(spectrum,1); // stop it from overloading max cache
	    // console.log(hue);
	};

	function shadeRGBColor(color, percent) { // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    	var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    	return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
	};

	function componentToHex(c) {
    	var hex = c.toString(16);
    	return hex.length == 1 ? "0" + hex : hex;
	};

	function rgbToHex(r, g, b) { // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	    	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};

	function addFlags() {
		for (var lang in ADDITIONALFLAGS) {
			var imgLocation = ADDITIONALFLAGS[lang];
			$('#flags').append("<label><input id='" + lang + "flag' type='radio' name='flag' value='" + lang + "' /><img src='images/" + imgLocation + "' value='" + lang + "'></label>");
		}
	}

	function flashColours(div,timeOut,number) {
						
		for (var i = 0; i < number; i++) {
			var hue = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.random() + 0.3) + ')';
			var newhue = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.random() + 0.3) + ')';
		
			$(div).css("border-color", hue);
			$(div).animate({
				borderColor : newhue
			}, timeOut);
		};
	};

	function makeGaps(stringLength) {

		var gapsString = [];
		var spanString = "<span id='pix' class='col'><img  src='' /></span>";

		for (var i = 0; i < stringLength; i++) {
			gapsString.push(spanString);
		};

		return gapsString.join('');
	};

	function makeNums(stringLength) {

		var numsString = [];
		var spanString = "<span id='num' class='col'></span>";

		for (var i = 0; i < stringLength; i++) {
			numsString.push(spanString);
		};

		return numsString.join('');
	};

	function makeCols(stringLength) {
		var colsString = [];
		var spanString = "<div class='col'></div>";
		for (var i = 0; i < stringLength; i++) {
			colsString.push(spanString);
		};

		return colsString.join('');
	};

	function getOneRight(){
	};

	function loseALife() {
	};

	function startRocket(time){
		setTimeout(function() {
			$('#intro').addClass("shake");
				},time);
	};
		
	function getPosition(e) {
		var coordinates = e.offset();
		// console.log(coordinates);	
		return coordinates;
	};

	function checkPosition() {

			var allLetters = $('#name1').find('img');
			for (var i = 0; i < allLetters.length; i++) { // check coordinates

				var currentLetter = allLetters.eq(i);

				var coordinates = getPosition(currentLetter);
				var details = [currentLetter.text(), screen.width, coordinates.left, screen.height, coordinates.top];
				console.log(details);

				// if ((coordinates.left+100) > screen.width) {
				// 	// currentLetter.stop();
				// 	currentLetter.offset({
				// 		left: (coordinates.left - screen.width),
				// 		top: coordinates.top
				// 	});
				// 	// alert("right bump!");
				// };

				// if ((coordinates.top+200) > screen.height) {
				// 	currentLetter.stop();
				// 	currentLetter.offset({
				// 		top: (coordinates.top - screen.height)
				// 	});
				// 	// alert("bottom bump!");
				// };

			};

			setTimeout(checkPosition, 1000);
	};

	function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
	  	  return array;
	}

	var flashDict = {
		'true' : 'ON',
		'false' : 'OFF'
	};

	function flashmessage(state) {
		var autoplayT1 = "Autoplay ";
		var autoplayT2 = flashDict[state];
		var autoplayMessage = autoplayT1.concat(autoplayT2);

		item = $('#flash');

		item.text(autoplayMessage)
				.animate({
				opacity: 1
		},500)
					.animate({
					opacity: 0
		},1000);
					console.log(state);
	}

	
	// **************************** START CODE ++++++++++++++++++++++++++++

	addFlags();
	startTheGame('');

	function startTheGame(message) {
		
		$('#message').text(message);

		$('.container').css("display", "none");
		$('.letters').hide();

		$('#flags label img').on("click", function() {
			$(this).addClass('selected');
			$(this).siblings().prop("checked", true);
			$(this).parent().siblings().find('img').removeClass('selected');
			$(this).parent().siblings().find('input').prop("checked", false);
			translateText();	
		});

		$('#flags label img').on('mouseover', function() {
			var flagName = $(this).attr('value');
			$(this).attr('title', flagName);	
		});

		$('#othernav label img').on("click", function() {
			$(this).toggleClass('selected');
			autoplay = !document.getElementById("autoplay_check").checked;
			flashmessage(autoplay);	

			if (autoplay==true) {

				var tempLanguage = $('input:radio:checked').val();
				var languagePlaylist = LANGUAGETODICT[tempLanguage].playlist;

				var randomAnimalWord = languagePlaylist[Math.floor(Math.random()*languagePlaylist.length)];
				$('#textbox').val(randomAnimalWord);

			} else {
				$('#textbox').val('');
			}

			 if ( $('#primary_nav_wrap').css('visibility') == 'hidden' ) {
			 	$('#primary_nav_wrap').css('visibility','visible');
			 	$('#primary_nav_wrap').trigger('mouseleave');
			 } else {
			 	$('#primary_nav_wrap').css('visibility','hidden');
			 }
		});

		$('#primary_nav_wrap').on("mouseenter", function() {	
			$("#primary_nav_wrap ul ul").css("display", "block");
		});	

		$('#primary_nav_wrap').on("mouseleave", function() {	
			$("#primary_nav_wrap ul  ul").css("display", "none");
		});	

		$('#primary_nav_wrap ul li ul li a').on("click", function() {
			$(".current-menu-item a")
				.eq(0)
				.text(this.text)
				.animate({
					color: 'white'
				},250)
				.animate({
					color: 'black'
				},250);
			$(".no_display").removeClass("no_display");
			$(this).parent("li").addClass("no_display");
			$('#primary_nav_wrap').trigger('mouseleave');
		});

		$('button.random').on("mouseenter", function() {
			$(this).addClass("shake");
		});
		$('button.random').on("mouseleave", function() {
			$(this).removeClass("shake");
		});

		$('button.random').on("click", function() {
			var randomWord = ENG_PLAYLIST_MUSIC[Math.floor(Math.random()*ENG_PLAYLIST_MUSIC.length)];
			$('#textbox').val(randomWord);
		});
		

		$('#instructions').on('click', function() {
			 $("#joyRideTipContent").joyride({
			 /* Options will go here */
			 autoStart : true
			});
			// return false;
		});

		$('#inputs').keypress(function(e) { // MAKE enter work as submit button
	        if(e.which == 13) {
	            $(this).blur();
	            $('.submit').focus().click();
	        }
	    });
	};

	function showMobileLetters(i){
				
				var letters = $("." + i.toString());
					letters.siblings().removeClass('vis').addClass('invis').css('display','none');

					letters.removeClass('invis').addClass('vis jig').hide()
							.css('opacity', 0)
							.css('display','inline')
							.animate({opacity : 1},5000);

		}

	function languageCheck(language, textInput) {
	
		for (var i=0; i < textInput.length; i++) {

			var testText = LANGUAGETODICT[language].pics[textInput[i]];
			// console.log(typeof testText);
			if (typeof testText === "undefined") return true;
		}
		return false;
	}


	$('.submit').on("click", function() {

		var language = $('input:radio:checked').val();
		var textInput = $('input:text:first').val();

		var maxWidth = $(window).width();
		var columnMargin = ~~(maxWidth / 100 ); 

		var columnWidth = 150 + (2 * columnMargin);
		var maxLength = ~~(maxWidth / columnWidth );
		console.log(maxLength);
		// var maxLength = 100;
		
		//  check for acceptable input
		// no input
		if (textInput.length == 0) {
			mixpanel.track("Name - none");
			startTheGame(LANGUAGETOMESSAGES[language].clickbox);

		// name longer than the width of window allows
		} else if (textInput.length > maxLength ) {
			mixpanel.track("Name - too long");
			startTheGame(LANGUAGETOMESSAGES[language].toolong);
			
		// language and input are not the same 100%
		} else if (languageCheck(language,textInput) == true) {
			mixpanel.track("Name - language error");
			startTheGame(LANGUAGETOMESSAGES[language].language_error);			

		} else {
			mixpanel.track("Name - accepted");
			$('#intro h2').text(LANGUAGETOMESSAGES[language].ready);
			

		var dictsToUse = LANGUAGETODICT[language];
		var MYPICS = dictsToUse.pics;
		var MYSOUNDS = dictsToUse.sounds;

		sessionStorage.setItem("language", language);
		sessionStorage.setItem("sounds", JSON.stringify(MYSOUNDS));
		sessionStorage.setItem("pics", JSON.stringify(MYPICS));

		function createSounds() {
			Object.keys(MYSOUNDS).forEach(function (letter) { 
	    		$('.sounds').append('<audio id="' + letter + '" src="' + 
	    			MYSOUNDS[letter] + '" preload="auto"></audio>');
			})
		};

		function playSound(s) {
			// $('.sounds').append('<audio id="' + s + '" src="' + MYSOUNDS[s] + '" preload="auto"></audio>');
			document.getElementById(s).play();
		};

		function countdown(element, seconds, repeatcase) {

		if (repeatcase == true) {
			$('#new_word img').remove();
			$('#prepare h1').text("");

			$('#rocket div').css("background-image", "url(" + sessionStorage.getItem("image") + ")")
							.css("background-size", "150%")
							.css("background-repeat","no-repeat")
							.css("background-position","100% 0")
							.css("margin-left","20%");


			$('#rocket div').removeClass("liftoff");
			$('#rocket div').css("width", "200px").css("height","400px");
			$('#countdown, #prepare h2').animate({
							fontSize : '60px',
			            	width : '100%',
			            	height: '100%',
			            	opacity : 1
			            },1000);
			$('#countdown').animate({
				width : '45%',
				fontSize : '120px'
				},1);
		} 
			var msTime = seconds*1000;
		    // startRocket(msTime);

	 	 	var interval = setInterval(function() {	

		    	$('#intro').show();
		    	$('#instructions').hide();
		    	$('#othernav').hide();

		    	if (seconds < 10) seconds = "0" + seconds; 
		    	playSound('tick');

		        var el = document.getElementById(element);
		      
	        	if(seconds == 0) {  // zero seconds function   
			        	clearInterval(interval);
			            playSound("rocket");
			            $("#rocket div").addClass("liftoff");
			            $('#countdown, #prepare h2').animate({
			            	fontSize : '600px',
			            	width : '500%',
			            	height: '500%',
			            	opacity : 0
			            },3000);

						setTimeout(function() {
							$('#intro').hide();
							$('.col').css("opacity", 1);
							if (isMobile) showMobileLetters(0);
							return;	
						},2000);
	        	}						// end of zero seconds function
	        	
	        	el.innerHTML = seconds;
		      	seconds--;  // decrease seconds counter each 1000ms  
			    }, 1000);
		};

		function displayNewWord(word) {

			letter = word[0].toUpperCase();
			pics = JSON.parse(sessionStorage.getItem("pics"));
			t = pics[letter];
			$('#new_word').html('<img src="images/' + t + '" />');
			$('#prepare h1').text("Next word...")	
							.css('display', 'inline');

			$('#new_word img').addClass('jig');

			sessionStorage.setItem("image",$('#new_word img').attr("src"));
			var autoplaySound = dictsToUse.playlist_sounds[word];
			if (autoplaySound==undefined) {autoplaySound : 'audio/3.mp3';}
			
			$('.sounds').append('<audio id="' + word + '" src="' + autoplaySound
	    			 + '" preload="auto"></audio>');

			setTimeout(function() {
							playSound(word);
									}, (2000));
			
		}

		function triggernewgame(){
			$("#success").animate({volume: 0}, 1000);
			$(".container").hide();

			lang = sessionStorage.getItem("language");

			var pList = LANGUAGETODICT[lang].playlist;

			var word = pList[Math.floor(Math.random()*pList.length)];

			sessionStorage.setItem("word", word);

			removeFromArray(word,pList);

			displayNewWord(word);

			setTimeout(function() {
							countdown('countdown', 5, true);
									}, (5000));
			
			buildGame(true);
		};


			createSounds();	

			// $('.sounds').each(function(i,obj){console.log(obj)});

			countdown('countdown', 5, false);
		
			buildGame(false);
		}

	

	function cleanGame(){
		$('.col').remove();
		$('#kb_letters').remove();
	}

	function removeFromArray(item,array) {
		console.log(array);
		while (array.indexOf(item) !== -1) {
			  array.splice(array.indexOf(item), 1);
			}

	}

	function addWordToSession(str){

		var sessionWords = JSON.parse(sessionStorage.getItem("session_words"));
		sessionWords.push(str);
		sessionStorage.setItem("session_words", JSON.stringify(sessionWords));

	}

	function addWordsandScoretoScreen(str){
		$('#vocab').css("visibility", "visible")
		.append('<li><img src="images/star 2.svg" /><div>' + str + '</div></li>'); // add word to vocab list
					
	}

				

	// function displayPreviousWords(){
	// 	var sessionWords = JSON.parse(sessionStorage.getItem("session_words"));

	// 	for (var i = 0; i<sessionWords.length; i++) {
	// 		$('#vocab-score').append('<div></div>'); // add star to vocab list
			
			
	// 	}
		
	// }

	function buildGame(repeatcase){


		if (repeatcase==true) {
			cleanGame();
			var name1String = sessionStorage.getItem("word");
			// displayPreviousWords();
			addWordToSession(name1String);

		} else {
			var name1String = $('input:text:first').val();
			
			if (language != 'hebrew') {name1String = name1String.toUpperCase();}

			var tempVar = [name1String];
			sessionStorage.setItem("session_words", JSON.stringify(tempVar));

		
		}

		console.log(JSON.parse(sessionStorage.getItem("session_words")));

		var picArray = $.map(MYPICS, function(value, index) {return [value];});
		var availablePics = [];
		var size = Object.size(MYPICS);
		for (var i = 0; i < size; i++) {var thing = picArray[i];availablePics.push(thing);}

		var NumsCols = makeCols(name1String.length);

		$('#content').append(NumsCols);
		var cols = $('.col');

		var name1LettersArray = [];
		var name1LettersArray = name1String.split('');

		var imageSources = [];
		var randomColours = [];

		for (var i = 0; i < name1LettersArray.length; i++) { 				// start for loop over letters

			// define direction of counting, L to R or R to L depending on language
			if (language == 'hebrew') {var j = -(i+1);} else {var j = i;}

			var textValue = i+1;
			imageSources.push(MYPICS[name1LettersArray[i]]);

			cols.eq(j)
					// add numbers to the 'num' div
					.append('<div id="num" class="row circle">' + textValue + '</div>')
					// add q-mark images to the 'pix' div
					.append('<div id="pix" class="row circle-center"><img src="images/question.svg" ></div>')
					// add empty 'p' to the 'lex' div
					.append('<div id="lex" class="row"><p></p></div>');
			
			//  assign a random colour to each letter and save it in randomColours array
			var random_colour = ('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));	
			cols.eq(j).find("#num").css("color", random_colour);
			randomColours.push(random_colour);	

			// force 'true' state for development
			// isMobile = true;
			if (LOG) console.log(isMobile);

			// if mobile then populate manual keyboard with letter choices
			if (isMobile) {											// start of mobile Building

				// empty array of letters
				var letterArray = [];

				// note current letter
				var thisLetter = name1LettersArray[j];

				// get all possible letters from the correct language
				var availableLetters = Object.keys(MYSOUNDS).filter(checkIsValid);

				// check availableLetters contains only letters and not other elements
				function checkIsValid(e){if (e.length == 1) return true;else return false;}

				// randomly select one
				function getRandomLetter(array) {
					letter = availableLetters[Math.floor(Math.random()*availableLetters.length)];
					return letter;
				}

				// define how many options we want to give
				var maxLetterOptions = 3;	

				// add current letter to the array
				letterArray.push(thisLetter);

				//  add as many random letters to the array as we have defined
				while (letterArray.length < maxLetterOptions) {
					var distractor = getRandomLetter(availableLetters);
					// if letter is not in the array already, add it
					if ($.inArray(distractor, letterArray) == -1 ) {
						letterArray.push(distractor);
					}
				}
				
				// //  randomly sort the array
				letterArray = shuffle(letterArray);

				// console.log(letterArray);

				// add a containing div for each array
				$('#keyboard').append('<div id="kb_letters"></div>');

				// add each letter in the array to the containing div
				for (var x = 0; x < maxLetterOptions; x++) {
					$('#kb_letters').last()
						.append('<div class="invis mob_letter ' +  j + '" id="' + thisLetter + 
							'" >' + letterArray[x] + '</div>');
				}
			} 															// end of mobile Building
		}; 																		// end for loop

		// establish whether first letter is on L or R side depending on language
		var i = 0;
		if (language == 'hebrew') {var j = -1;} else {var j = i;};

		var currentCol = $('.col').eq(j);

		// bring the first image into focus
		currentCol.find("#pix")
						.addClass("circle-focus, jig")
						.css("opacity", "1");

		// replace the first placeholder image with the actual one
		var imageDivs = $('#pix img');
		$(imageDivs.get(j)).attr("src", "images/" + imageSources[i]);
		
		// rainbow animate the first number
		currentCol.find("#num")
						.addClass("animate");

		// store current font size 
		var origNumberFontSize = parseInt(currentCol.find("#num")
								.css("font-size")
								.slice(0,2)
								);
		// gives "40px" so need to slice into it and change to ParseInt

		// then change it
		currentCol.find("#num").css("font-size",origNumberFontSize*1.5 );

		// alert(origNumberFontSize);

		// hide opening page elements
		$('#inputs, #flags').hide();

		// show main game elements
		$('.container').css("display", "inline");

		// send Mixpanel messages related to language
		MX_GAME_MSGS[language];

		// start game
		startgame(name1LettersArray, name1String, availablePics, randomColours, imageSources, imageDivs);
	};

	function startgame(name1LettersArray, name1String, availablePics, randomColours, imageSources, imageDivs){

		// Mobile to-do
		//  Joyride not working
		//  Joyride NEXT button too small
		//  get background to work all the way down beyond initial screen

		$('#left').css("visibility", "visible");
		// change some layout elements if mobile keyboard is involved
		if (isMobile) {													// start of isMobile
				$('#lex p').each(function(){
					$(this).css("font-size", 120);
				})
				$('#lex').css("height", "auto");

				//  check to see if letter is pressed and if so, mimic the behaviour of keydown

				$(function(){
					  $( "div.mob_letter" ).bind('tapone',eventHandler);
					
					 
					  function eventHandler(event){

					  	console.log('top = ' + event.target.offsetTop +
      								'\nleft = ' + event.target.offsetLeft +
      								'\nheight = ' + event.target.offsetHeight +
      								'\nwidth = ' + event.target.offsetWidth);
					  	console.log(event);
					  	
					  var letterTapped = event.target.innerHTML;

					    //  trigger the keydown function using the keycode
					  var keycodeTapped = KEYCHARTOCODE[letterTapped];
					    
					  var e = jQuery.Event("keydown", { keyCode: keycodeTapped });

					  // trigger an artificial keydown event
					  jQuery("body").trigger( e );
					  }
				});

			}															// end of isMobile

		$(document).on("keydown", function (e) {

			//  visual setup
			if ($('#intro').css("display") == 'block') return false;
			$('#intro').hide();
			$('.letters').hide();
			$('.col').css("opacity", 1);

			var random_colour = ('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));

			//  keycodes setup
			// define set of keycodes
			var keycodeForLang = KEYCODES[language];

			// make sure keycode is mapped to correct letter
			if (language != "english") {
				var letter = LETTERMAP[language][keycodeForLang[e.which || e.keyCode]];
			} else {
				var letter = keycodeForLang[e.which || e.keyCode];
			}
			
			//  map sound to letter
			var letterSound = MYSOUNDS[letter];
			var letterDivs = $('#lex p');

			//  on keydown
				// play sound unless game over
			if (name1LettersArray.length == 0) { return false;} 
			else {playSound(letter);} //  play the audio

			//  check to see whether the key press is relevant - core game logic
			letters_function(name1LettersArray); 

			function letters_function (letters) {  // define the main game function

				// 1. If the letter pressed is correct...
				if ($.inArray(letter, letters) == 0) {

					var realFontSize = $('#lex p').css("font-size");

					// L to R counter progression
					var counter = (name1String.length - letters.length);
					var nextCounter = counter + 1;

					// R to L counter progression
					if (language == 'hebrew') {
						counter = (name1LettersArray.length-1);
						nextCounter = (counter-1);
					}

					

					// animate the correct letter in a cool way
					letterDivs.eq(counter)
									.text(letter) // problem here - get() does not work like eq()
									.css("font-size", (Math.floor(Math.random() * 800))) // create random font-size to animate from
									.css("display", "inline-block")
							 		.css("color", randomColours[counter])
							 		.animate({
							 			fontSize: realFontSize
									 		}, 2000);

					//  make the image rotate
					// $(".col").eq(counter).find("#pix").addClass("letter-success");

					//  make the image animate in a more mobile friendly way
					var thisCol = $(".col").eq(counter);
					var nextCol = $(".col").eq(nextCounter);

					thisCol.find("#pix").addClass("letter-success-mob");

					// fade out mobile choices if correct letter chosen
					if (isMobile == true) {
						$('.' + counter).animate({opacity : 0},2000)

					// trying to isolate the single mobile letter and animate that instead but taint workin

						// myDiv = 'div.' + counter;
						// var mobile_letter = $('myDiv:contains(letter)');
						// console.log(mobile_letter.text;
						// mobile_letter.css("color", "white");
						// mobile_letter.siblings().animate({opacity : 0},3000)
					}

					
					// Set up a delay to animate flashing image as it appears in focus
					setTimeout(function() {							
						var myImage = "images/" + imageSources[0];

						if (name1LettersArray.length != 0) { 
							imageDivs.eq(nextCounter)
									.attr("src", myImage)
											.animate({
												opacity : 0},
														500)
											.animate({
												opacity : 1},
													 	500)
											.animate({
												opacity : 0},
														500)
											.animate({
												opacity : 1},
													 	500);

						// make sure image fits to circle height
						var backgroundCircle = $(".col").eq(counter).find(".circle-center");
						var picToEnclose = $(".col").eq(counter).find("#pix");
						var imgToEnclose = $(picToEnclose).find("img");
						var imgToEncloseHeight = $(picToEnclose).find("img").css("height");
						var backgroundCircleHeight = $(backgroundCircle).css("height");

						$(picToEnclose).find("img").css("height", backgroundCircleHeight);


						backgroundCircle.css("background-color", randomColours[counter]);
						picToEnclose.css("border-color", "rgba(255,255,255,0.25)")
															.css("overflow","hidden")
															.removeClass('jig');
						$(".col").eq(nextCounter)
									.find("#pix")
									.addClass('circle-focus')
									.animate({
										opacity : 1},
										2000)
									.addClass('jig');

						// from http://css-tricks.com/examples/ColorAnimateAnyShape
						thisCol.find("#num").removeClass("animate");
						nextCol.find("#num").addClass("animate");

						// restore current font size to normal
						var newNumberFontSize = parseInt(
												thisCol.find("#num")
														.css("font-size")
														.slice(0,2)
														);
						thisCol.find("#num").css("font-size",newNumberFontSize/1.5 );

						// then increase next one
						nextCol.find("#num").css("font-size",newNumberFontSize );

						showMobileLetters(nextCounter);

						setTimeout(function() {
							playSound("correct");
									}, (2000));
						}
						
					}, (3000));

					letters.splice(0, 1);
					imageSources.splice(0, 1);
					// console.log(letters);

				} 

				// 2. else if the letter is non alphabetical
				else if (typeof letter === "undefined") {return;}

				// 3. the letter is NOT correct, so...
				else {

				 	if (name1LettersArray.length == 0) return false;
					var maths = Math.random();
					var maths = (0.3 < maths || 0.8 > maths) ? maths : 0.5;
					var correctImg = (($.inArray(MYPICS[letter], availablePics))+1) ? MYPICS[letter] : "question.svg";

					$('.letters')
						.html("<span id='letterpix' class='shake'><img src='images/" + correctImg + 
											"' /></span> <span id='letterpix' class='shake'>" + letter  + "</span>")
							 .css("display", "inline-block");

					flashColours('.letters',200,10);

					setTimeout(function() {
						$('.letters').fadeOut(2000);
													}, (3000));			
				};
			};

			if (name1LettersArray.length == 0) { gameEnd()};

			function gameEnd() {

				

				addWordsandScoretoScreen(name1String);
				$('#download').css('visibility','visible');

				// make the letters nice and big to start with, back to normal size
				if (isMobile == true) {$('#lex').animate({fontSize:150}, 2000);}

				if (language == 'hebrew') {var counter = 0;} else {var counter = textInput.length - 1;}
						
				backgroundCircle = $(".col").eq(counter).find(".circle-center");
				picToEnclose = $(".col").eq(counter).find("#pix");
				imgToEnclose = $(picToEnclose).find("img");
				imgToEncloseHeight = $(picToEnclose).find("img").css("height");
				backgroundCircleHeight = $(backgroundCircle).css("height");

				$(picToEnclose).find("img").css("height", backgroundCircleHeight);
				backgroundCircle.css("background-color", randomColours[counter]);

				$('.letters').animate({   // make the single letter disappear
									 	paddingTop: '800px'
									 }, 1000)
							.hide(1000);

				var allPics = $('.col').find("img");
				var allCircles = $('.col #pix');
				var allLetters = $('.col #lex p');
				var allNums = $('.col #num'); 

				allNums.removeClass('animate');
				// allLetters.addClass('animate');
				// $('body').addClass('animate');

				$('#lex').css("z-index",100);



				for (var i = 0; i < allPics.length; i++) { // make em dance
				
					var maths = Math.random();
					if (maths < 0.5) { maths = maths + 0.5;}
					// var colorsBackwards = randomColours.reverse();
					var currentPic = allPics.eq(i);
					var currentLetter = allLetters.eq(i);
					var currentNumber = allNums.eq(i);
					var currentCircle = allCircles.eq(i);

					var circleWidth = Math.floor(maths * 1000);

					currentCircle.animate({width : circleWidth +'px',height : circleWidth +'px', borderRadius : circleWidth/2 +'px' }, (Math.floor(maths * 60000)));

					if ((i+1)%2==0) {
						
						currentPic.animate({   width: (Math.floor(maths * 1000)) + 'px',height: '100%'}, (Math.floor(maths * 60000))),
									
						currentLetter.animate({  fontSize : "500px", top: (Math.floor(maths * 800)) + 'px'}, (Math.floor(maths * 60000)));	
						currentNumber.animate({  fontSize : "300px", bottom: (Math.floor(maths * 800)) + 'px'}, (Math.floor(maths * 60000)));		

					} else {
						currentPic.animate({  width: (Math.floor(maths * 1000)) + 'px',height: '100%'}, (Math.floor(maths * 60000)));
						currentLetter.animate({  fontSize : "500px", top: (Math.floor(maths * 800)) + 'px'}, (Math.floor(maths * 60000)));
						currentNumber.animate({  fontSize : "700px", top: (Math.floor(maths * 200)) + 'px'}, (Math.floor(maths * 60000)));	
					};
				};



				
				setTimeout(function() {
					$("#success").animate({volume: 1}, 1);
					playSound("success");
					// save the image if saving turned on
					if (saving) {download()};
													}, 3000);

			
				autoplay = document.getElementById("autoplay_check").checked;

				if (autoplay==true) {
					setTimeout(function() {
							triggernewgame();
													}, 5000);
					
				} else {
					$("#again p").animate({ fontSize: '100px', top: (Math.floor(Math.random() * 800)) + 'px', opacity: 1}, (Math.floor(Math.random() * 100000)));

					$('a#ninjalogo').attr("href", "home.html")
								.find("img")
								.css("z-index", 100)
								.css("position", "fixed");

				$('a#ninjalogo, #again').on('click', function(){
					mixpanel.track('Play again');
				});	

				}



				// checkPosition();

				// function bounceIt(){

				// 	$(this).animate({
				// 		paddingTop: "-20px"},
				// 		{ duration: 1000, easing: 'easeOutBounce'
				// 	});

				// 	setTimeout(bounce, 1);
				// };
			}

		});
	};

	});
			
});


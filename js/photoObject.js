///////////////////////////
// photoObject.js 1.0.0  //
// 2019-06-25            //
// SYNCK GRAPHICA        //
// www.synck.com         //
///////////////////////////

var photoObject = {
	Json: [],
	$: function(id){
		return document.getElementById(id);
	},
	initialize: function(json){
		var _ = this;
		_.Json = json;
		_.t1 = _.Json.interval.transition;
		_.t2 = (_.Json.interval.transition*2) + _.Json.interval.animated;
		_.p = [];
		_.i = [];
		_.ready(function(){
			if(_.Json.rand){
				for(var i=0;i<100;i++){
					var n1 = Math.floor(Math.random() * _.Json.photo.length);
					var n2 = Math.floor(Math.random() * _.Json.photo.length);
					var m = _.Json.photo[n1];
					_.Json.photo[n1] = _.Json.photo[n2];
					_.Json.photo[n2] = m;
				};
			};
			for(var i=0;i<_.Json.photo.length;i++){
				var parent = document.createElement('div');
				parent.id = _.Json.id+'_p'+i;
				parent.style.zIndex = _.Json.photo.length-i;
				var inner = document.createElement('span');
				inner.id = _.Json.id+'_i'+i;
				parent.appendChild(inner);
				document.getElementById(_.Json.id).appendChild(parent);
				_.p[i] = _.$(parent.id);
				_.i[i] = _.$(inner.id);
			};
			_.Json.current = 0;
			_.Json.next = _.Json.current + 1;
			_.Json.prev = null;
			_.Json.step = 0;
			var preloadImage = new Image();
			preloadImage.onload = function(){
				photoObject.loop();
			};
			preloadImage.src = _.Json.photo[0].src;
			_.NextImage = new Image();
		});
	},
	refresh: function(){
		
	},
	loop: function(){
		var _ = this;
		var t = _.Json.interval.transition + _.Json.interval.animated;
		_.Json.current = _.Json.current % _.Json.photo.length;
		_.Json.next = (_.Json.current+1) % _.Json.photo.length;
		var c = _.Json.current;
		var n = _.Json.next;
		var p = _.Json.prev;
		if(_.Json.prev){
			_.p[p].style.zIndex = _.Json.photo.length;
			_.set(_.p[p],10,_.Json.photo[p].transition.out[0]);
			setTimeout(function(){
				_.set(_.p[p],_.t1,_.Json.photo[p].transition.out[1]);
			},100);
		};
		_.i[c].style.backgroundImage = 'url('+_.Json.photo[c].src+')';
		_.set(_.p[c],10,_.Json.photo[c].transition.in[0]);
		_.set(_.i[c],10,_.Json.photo[c].animated.in);
		_.set(_.p[n],10,_.Json.photo[n].transition.in[0]);
		_.set(_.i[n],10,_.Json.photo[n].animated.in);
		_.p[c].style.zIndex = _.Json.photo.length-1;
		setTimeout(function(){
			_.set(_.p[c],_.t1,_.Json.photo[c].transition.in[1]);
			_.set(_.i[c],_.t2,_.Json.photo[c].animated.out);
		},100);
		_.NextImage.src = _.Json.photo[n].src;
		_.Json.prev = _.Json.current;
		_.Json.current++;
		setTimeout(function(){
			_.loop();
		},t);
	},
	set: function(obj,t,className){
		obj.style.transitionDuration = (t / 1000)+'s';
		obj.style.transitionProperty = 'all';
		obj.className = className;
	},
	addEvent: function(elm,listener,fn){
		try {
			elm.addEventListener(listener,fn,false);
		}
		catch(e){
			elm.attachEvent('on'+listener,fn);
		};
	},
	ready: function(fn){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded",fn,false);
		}
		else {
			var IEReady = function(){
				try {
					document.documentElement.doScroll("left");
				}
				catch(e) {
					setTimeout(IEReady,1);
					return;
				};
				fn();
			};
			IEReady();
		};
	}
};
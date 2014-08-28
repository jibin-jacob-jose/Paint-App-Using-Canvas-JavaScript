



if(window.addEventListener) {
window.addEventListener('load', function () {






var tool;

document.getElementById('pencil').onclick=function(){
 
  	//var tool=document.getElementById('dtool');
  	
  	tool=onPencil;
  	alert("tool="+tool)
  }

document.getElementById('line').onclick=function(){
  alert("in line")
  	//var tool=document.getElementById('dtool');
  	
  	tool= onLine;
  	alert("tool="+tool)
  }



{
	
	canvas = document.getElementById('imageView');
	var ctx = canvas.getContext('2d');
	
	// Creating a tmp canvas
	var container = canvas.parentNode;
	tmp_canvas = document.createElement('canvas');
	tmp_canvas.id     = 'imageTemp';
    tmp_canvas.width  = canvas.width;
    tmp_canvas.height = canvas.height;
    container.appendChild(tmp_canvas);
    tmp_ctx = tmp_canvas.getContext('2d');	
	var mouse = {x: 0, y: 0};
	var clickX=[];
	var clickY=[]
	var clickDrag=[];
	var state = false;	
	
	// Pencil Points
	var ppts = [];

	
	/* Mouse Capturing Work */
	tmp_canvas.addEventListener('mousemove', function(e) {
		x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		state = true;
		//alert("x="+x+":"+state)
	}, false);
	
	
	/* Drawing on Paint App */
	tmp_ctx.lineWidth = 5;
	tmp_ctx.lineJoin = 'round';
	tmp_ctx.lineCap = 'round';
	tmp_ctx.strokeStyle = 'blue';
	tmp_ctx.fillStyle = 'blue';
	
	tmp_canvas.addEventListener('mousedown', function(e) {
		//alert("in down")
		//alert("t="+tool)
		tmp_canvas.addEventListener('mousemove',tool, false);
		
		x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		state=true
		//ppts.push({x: mouse.x, y: mouse.y});
		addClick(x,y,state)
		
		tool();
		
	
	}, false);

	tmp_canvas.addEventListener('mouseup', function() {
		state=false
		//alert("in upp")
		addClick(mouse.x,mouse.y,false)
		tmp_canvas.removeEventListener('mousemove', tool, false);
		addClick(mouse.x,mouse.y,false)
		//alert("x="+x+":"+state)
		img_update();
		
			
	}, false);

	

	function addClick(x,y,drag){
	//alert("in addclinik")
	//if(!drag){ alert("falseeeeeeeeeee")}
	clickX.push(x)
	clickY.push(y)
	clickDrag.push(drag)
	}

	function img_update () {
    //alert("in update")
		ctx.drawImage(tmp_canvas, 0, 0);
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		initclicks();
  }


  function initclicks(){
	//alert("in init")
	clickX = []
	clickY = []
	clickDrag =[]
	state=false
}







	var onLine = function() {
		
		addClick(x,y,state)
		
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		tmp_ctx.beginPath();
		var last_index=clickX.length-1
      	tmp_ctx.moveTo(clickX[0],clickY[0]);
    	tmp_ctx.lineTo(clickX[last_index],clickY[last_index]);
	    tmp_ctx.closePath();
		tmp_ctx.stroke();
		
	};

	var onPencil =function(){
		
		addClick(x,y,state)
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		//alert("drag"+clickDrag)
		for(i=0; i < clickX.length; i++) 
		{	
			if(clickDrag){
				tmp_ctx.beginPath();
   				tmp_ctx.moveTo(clickX[i],clickY[i]);
       			tmp_ctx.lineTo(clickX[i+1],clickY[i+1]);
     			tmp_ctx.closePath();
				tmp_ctx.stroke()
			}
		}
	}
	

	var onRectangle =function(){
		
		addClick(x,y,state)
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		//alert("drag"+clickDrag)
		for(i=0; i < clickX.length; i++) 
		{	
			if(clickDrag){
				var last_index=clickX.length-1
				//var x = Math.min(clickX[last_index],clickX[0]);
				//var y = Math.min(clickX[last_index],clickX[0]);
				var width = (clickX[last_index]-clickX[0]);
				var height =(clickY[last_index]-clickY[0]);
				tmp_ctx.strokeRect(clickX[0],clickY[0], width, height);


			}
		}
	}

	var onCircle =function(){
		
		addClick(x,y,state)
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		for(i=0; i < clickX.length; i++) 
		{	
			if(clickDrag){
				//alert("in circle")
				var last_index=clickX.length-1
				var x_cod = (clickX[last_index] + clickX[0])/2 ;
    			var y_cod = (clickY[last_index] + clickY[0])/2 ;
 
    			var radius = Math.max(
        			Math.abs(clickX[last_index] - clickX[0]),
        			Math.abs(clickY[last_index]- clickY[0])
    			) / 2;
 
 				//alert("r:"+radius+"x:"+x_cod+"y:"+y_cod)
    			tmp_ctx.beginPath();
    			tmp_ctx.arc(x_cod, y_cod, radius, 0, Math.PI*2, false);
    			//tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
    			//tmp_ctx.arc(10,10,5,0,Math.PI*2,false)
    			tmp_ctx.closePath();
    			tmp_ctx.stroke();
    				
			}
		}
	}


	var onSpray =function(){
		
		addClick(x,y,state)
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		var getRandomOffset = function(radius) {
			//alert("in random")
    		var random_angle = Math.random() * (2*Math.PI);
    		var random_radius = Math.random() * radius;
     
    		// console.log(random_angle, random_radius, Math.cos(random_angle), Math.sin(random_angle));
     
		    return {
        		x_cod: Math.cos(random_angle) * random_radius,
        		y_cod: Math.sin(random_angle) * random_radius
    		};
		};		
		for(i=0; i < clickX.length; i++) 
		{	
			if(clickDrag){

		    var density = 50;
     
    		for (var j = 0; j < density; j++) {
        			var offset = getRandomOffset(4);
         
        			var x_c = clickX[i]+ offset.x_cod;
        			var y_c = clickY[i]+ offset.y_cod;
         
        			tmp_ctx.fillRect(x_c, y_c, 1, 1);
        			//tmp_ctx.strokeRect(x_c,y_c,1,1);
    		}				
    				
			}
		}
	}

}













}, false); }
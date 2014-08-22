document.getElementById('btn').onclick=function(){
			alert('click meeeeeeee')
			c();

		}
function c()
{
	var c = document.getElementById("b");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
}


document.getElementById('pencil').onclick=function(){
			//document.write("in buton pencil")
			//var a="asd"
			//alert("a="+a)

			pencil();

		}


function pencil()
{
	//alert("1")
	
	document.getElementById('b').onmousedown=function(e){
		var mouseX=e.pageX-this.offsetLeft
		var mouseY=e.pageY-this.offsetTop
		//alert("in pencil="+mouseX)
		 paint=true
		addClick(mouseX,mouseY,paint)
		reDraw()
//	alert("in down="+paint)
      document.getElementById('b').onmouseup=function(){
	
		paint=false
		//clickX=[]
		//clickDrag=[]
		//clickY=[]
		
		}
	document.getElementById('b').onmousemove=function(e){
		//alert("in moves="+paint)
	//	global paint
		if(paint){

			addClick(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,paint)
		//	alert("in drag="+paint)
			reDraw()
		}addClick(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,paint)

	}
	document.getElementById('b').onmouseout=function(){
		//global paint
		paint=false
		//alert("in out="+paint)
		}
	
	}	
}

var clickX = new Array()
var clickY = new Array()
	var clickDrag = new Array()
	var paint
function addClick(x,y,drag){
	//global clickX
	
	

	clickX.push(x)
	clickY.push(y)
	//alert("addClick"+drag)
	clickDrag.push(drag)
	//alert("addClick"+clickDrag)
}








var i

function reDraw(){

	var c = document.getElementById("b");
var context = c.getContext("2d");
  
  context.clearRect(0, 0,300,300); 
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(i=0; i < clickX.length; i++) {	
    //alert("in for")  	
    context.beginPath();
    if(clickDrag[i] && i){
    	//alert("in if ")
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
     //	alert("else")
       context.moveTo(clickX[i], clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
	}

 //alert("end")
}
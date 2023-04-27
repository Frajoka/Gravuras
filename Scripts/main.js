//Variaveis Globais
const c=document.querySelector("#c").getContext("2d")
var w=c.canvas.width=window.innerWidth*0.99
var h=c.canvas.height=window.innerHeight*0.98

var Scene=[]
var keys=[0,0,0,0]//[up,right,down,left]
var FPS=60

var camera={
	x:50,
	y:50,
	fov:[100,100],//[width,height]
	view(obj){
		var x,y
		
		x=(obj.x-(camera.x-camera.fov[0]))/camera.fov[0]/2
		y=(obj.y-(camera.y-camera.fov[1]))/camera.fov[1]/2
		
		c.fillStyle=obj.color
		c.fillRect(x*w,y*h,(obj.size*w)/camera.fov[0]/2,(obj.size*w)/camera.fov[1]/2)
	}
}

var player=new Player(50,50,[1,1,1,1])
Scene.push(player)
var ob1=new Object(100,200,20,'#aaaaaa',true)
Scene.push(ob1)
var ob2=new Object(200,100,20,'#aaaaaa',true)
Scene.push(ob2)

//Eventos
document.addEventListener('keydown',(e)=>{
	switch(e.code){
		case 'ArrowUp':
			keys[0]=1
			break
		case 'ArrowRight':
			keys[1]=1
			break
		case 'ArrowDown':
			keys[2]=1
			break
		case 'ArrowLeft':
			keys[3]=1
			break
		case 'Space':
			for(var i=0;i<Scene.length;i++){
				if(player.x-Scene[i].x==player.size &&
				player.y-Scene[i].y==player.size){
					if(Scene[i] instanceof Object){
						Scene[i].use()
					}
				}
			}
			break
	}
},false)

document.addEventListener('keyup',(e)=>{
	switch(e.code){
		case 'ArrowUp':
			keys[0]=0
			break
		case 'ArrowRight':
			keys[1]=0
			break
		case 'ArrowDown':
			keys[2]=0
			break
		case 'ArrowLeft':
			keys[3]=0
			break
	}
},false)

//Methods
function clear(){
	c.fillStyle="#ffffff"
	c.fillRect(0,0,w,h)
}
setInterval(function(){
	clear()
	
	player.update()
	for(var i=0;i<Scene.length;i++){
		camera.view(Scene[i])
	}
},1000/FPS)
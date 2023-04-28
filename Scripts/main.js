//Variaveis Globais
const c=document.querySelector("#c").getContext("2d")
var w=c.canvas.width=window.innerWidth*0.99
var h=c.canvas.height=window.innerHeight*0.98
var $inventario=document.querySelector("#inventario")
var $settings=document.querySelector("#settings_div")
var $item_info=document.querySelector("#item_info")
var gridSize=10

var Scene=[]
var keys=[0,0,0,0]//[up,right,down,left]
var FPS=30

var camera={
	x:50,
	y:50,
	fov:[100,100],//[width,height]
	view(obj){
		var x,y
		
		x=w*((obj.x-(camera.x-camera.fov[0]))/camera.fov[0]/2)
		y=h*((obj.y-(camera.y-camera.fov[1]))/camera.fov[1]/2)
		
		c.fillStyle=obj.color
		c.fillRect(x,y,(obj.size*gridSize*w)/camera.fov[0]/2,(obj.size*gridSize*w)/camera.fov[1]/2)
		if(obj instanceof Player){
			c.fillStyle="#000"
			c.fillText(obj.hp,x,y)
		}
	}
}

var player=new Player(50,50,[1,0,0,1])
Scene.push(player)
var ob1=new Object(100,200,2,'#aaaaaa')
Scene.push(ob1)
var ob2=new Object(200,100,2,'#aaaaaa')
Scene.push(ob2)

//Eventos
document.addEventListener('keydown',(e)=>{
	switch(e.code){
		case configuracoes['up1']:
			keys[0]=1
			break
		case configuracoes['right1']:
			keys[1]=1
			break
		case configuracoes['down1']:
			keys[2]=1
			break
		case configuracoes['left1']:
			keys[3]=1
			break
		case configuracoes['up2']:
			keys[0]=1
			break
		case configuracoes['right2']:
			keys[1]=1
			break
		case configuracoes['down2']:
			keys[2]=1
			break
		case configuracoes['left2']:
			keys[3]=1
			break
	}
},false)

document.addEventListener('keyup',(e)=>{
	switch(e.code){
		case configuracoes['up1']:
			keys[0]=0
			break
		case configuracoes['right1']:
			keys[1]=0
			break
		case configuracoes['down1']:
			keys[2]=0
			break
		case configuracoes['left1']:
			keys[3]=0
			break
		case configuracoes['up2']:
			keys[0]=0
			break
		case configuracoes['right2']:
			keys[1]=0
			break
		case configuracoes['down2']:
			keys[2]=0
			break
		case configuracoes['left2']:
			keys[3]=0
			break
	}
},false)

document.querySelector("#c").addEventListener('click',(e)=>{
	for(var i=0;i<Scene.length;i++){
		if(Scene[i] instanceof Object){
			
			var x=w*((Scene[i].x-(camera.x-camera.fov[0]))/camera.fov[0]/2)
			var y=h*((Scene[i].y-(camera.y-camera.fov[1]))/camera.fov[1]/2)
			var sx=(Scene[i].size*gridSize*w)/camera.fov[0]/2
			var sy=(Scene[i].size*gridSize*h)/camera.fov[1]/2
			
			if(e.clientX>=x &&
			e.clientX<=x+sx &&
			e.clientY>=y &&
			e.clientY<=y+sy){
				Scene[i].use()
			}
		}
	}
},false)
document.querySelector("#c").addEventListener('mousemove',(e)=>{
},false)

//Methods
function clear(){
	c.fillStyle="#ffffff"
	c.fillRect(0,0,w,h)
}
function showSettings(){
	if($settings.style.display=="block"){
		$settings.style.display="none"
	}
	else{
		$settings.style.display="block"
	}
}

setInterval(function(){
	clear()
	
	for(var i=0;i<Scene.length;i++){
		camera.view(Scene[i])
		
		if(Scene[i].solid){
			player.collide(Scene[i])
		}
		
		c.fillStyle=Scene[i].color
		c.fillRect(Scene[i].x,Scene[i].y,Scene[i].size*gridSize,Scene[i].size*gridSize)
	}
	
	player.prevX=player.x
	player.prevY=player.y
	player.update()
	
},1000/FPS)
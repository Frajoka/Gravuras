//Varaveis Globais
const c=document.querySelector("#c").getContext("2d")
var w=c.canvas.width=window.innerWidth*.98
var h=c.canvas.height=window.innerHeight*.98
var $inventario_div=document.querySelector("#inventario_div")
var $inventario=document.querySelector("#inventario")
var inventario=[]
var inventario_size=3
var gridSize=10

$inventario_div.style.left='0px'
$inventario_div.style.top='0px'


//up,right,down,left
var keys=[0,0,0,0]
var isDragging=false
var dragging=null
var offSetDragX=0
var offSetDragY=0

var FPS=60

//Onde Estao as Entidades
var Scene=[]

var player=new Entity('Player',5,5)
Scene.push(player)

var camera={
	x:0,
	y:0,
	fov:[50,50],
	render(){
		for(var i=0;i<Mapa.length;i++){
			var x,y,size
			x=Mapa[i].x*gridSize-(camera.x-camera.fov[0])
			y=Mapa[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Mapa[i].size*gridSize*Scale
			
			c.drawImage(Mapa[i].img,x,y,size,size)
		}
		for(var i=0;i<Scene.length;i++){
			var x,y
			x=Scene[i].x*gridSize-(camera.x-camera.fov[0])
			y=Scene[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Scene[i].size*gridSize*Scale
			
			c.drawImage(Scene[i].img,x,y,size,size)
		}
	}
}
var Scale=6

//Eventos
document.addEventListener('keydown',(e)=>{
	switch(e.code){
		case Configs['up1']:
			keys[0]=1
			
			break
		case Configs['right1']:
			keys[1]=1
			
			break
		case Configs['down1']:
			keys[2]=1
			
			break
		case Configs['left1']:
			keys[3]=1
			
			break
		case Configs['up2']:
			keys[0]=1
			
			break
		case Configs['right2']:
			keys[1]=1
			
			break
		case Configs['down2']:
			keys[2]=1
			
			break
		case Configs['left2']:
			keys[3]=1
			
			break
		
	}
},false)
document.addEventListener('keyup',(e)=>{
	switch(e.code){
		case Configs['up1']:
			keys[0]=0
			break
		case Configs['right1']:
			keys[1]=0
			break
		case Configs['down1']:
			keys[2]=0
			break
		case Configs['left1']:
			keys[3]=0
			break
		case Configs['up2']:
			keys[0]=0
			break
		case Configs['right2']:
			keys[1]=0
			break
		case Configs['down2']:
			keys[2]=0
			break
		case Configs['left2']:
			keys[3]=0
			break
		
	}
},false)
document.addEventListener('mousedown',(e)=>{
	if(e.target == $inventario_div ||
	e.target == $inventario ||
	e.target == document.querySelector("#inventario_div h3")){
		isDragging=true
		dragging=$inventario_div
		offSetDragX=$inventario_div.style.left.split("px")[0]-e.clientX
		offSetDragY=$inventario_div.style.top.split("px")[0]-e.clientY
	}
},false)
document.addEventListener('mouseup',(e)=>{
	isDragging=false
	dragging=null
},false)
document.addEventListener('mousemove',(e)=>{
	if(isDragging){
		dragging.style.left=e.clientX+offSetDragX +'px'
		dragging.style.top=e.clientY+offSetDragY +'px'
	}
},false)
document.querySelector("#c").addEventListener('click',(e)=>{
	for(var i=0;i<Mapa.length;i++){
		if(Mapa[i] instanceof Block){
			var x,y,size
			x=Mapa[i].x*gridSize-(camera.x-camera.fov[0])
			y=Mapa[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Mapa[i].size*gridSize*Scale
			
			if(e.clientX >= x &&
			e.clientX<= x+size &&
			e.clientY >= y &&
			e.clientY<= y+size &&
			Mapa[i].funcao!=null){
				if(Math.sqrt(Math.pow(player.x-Mapa[i].x,2)+Math.pow(player.y-Mapa[i].y,2))<gridSize/Scale){
					Mapa[i].funcao()
				}
				else{
					console.log("Muito Longe")
				}
			}
		}
	}
},false)

//Methods
function showInventario(){
	if($inventario_div.style.display=='none'){
		$inventario_div.style.display='inline-block'
	}
	else{
		$inventario_div.style.display='none'
	}
}
function createInventario(){
	for(var i=0;i<inventario_size;i++){
		for(var j=0;j<inventario_size;j++){
			var div=document.createElement("DIV")
			var item=document.createElement("IMG")
			div.style.display="inline-block"
			div.style.margin="1%"
			div.style.width=90/inventario_size+"%"
			item.style.width="98%"
			item.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKk-FPXIH6krOHbiL0ky4BRSWu35yhGDkxgCa6BMAQ9rnjTR1GkjseBtmxWw&s"
			div.appendChild(item)
			$inventario.appendChild(div)
		}
	}
}
function clear(){
	c.fillStyle="#fff"
	c.fillRect(0,0,w,h)
}
function movePlayer(){
	if(keys[0]==1 && !collideMap(player.x,player.y-player.velocidade,player.size)){player.y-=player.velocidade}
	if(keys[1]==1 && !collideMap(player.x+player.velocidade,player.y,player.size)){player.x+=player.velocidade}
	if(keys[2]==1 && !collideMap(player.x,player.y+player.velocidade,player.size)){player.y+=player.velocidade}
	if(keys[3]==1 && !collideMap(player.x-player.velocidade,player.y,player.size)){player.x-=player.velocidade}
	camera.x=player.x*gridSize
	camera.y=player.y*gridSize
}
function collideMap(x,y,size){
	for(var i=0;i<Mapa.length;i++){
		if(Mapa[i].solid){
			ox=Mapa[i].x
			oy=Mapa[i].y
			osize=Mapa[i].size
		
			if(x+size>ox &&
			x<ox+osize &&
			y+size>oy &&
			y<oy+osize){
				return true
			}
		}
	}
	return false
}


console.log('Carregando...')
createMap()
createInventario()
console.log('Pronto!')

//Loop Principal
setInterval(()=>{
	clear()
	
	movePlayer()
	
	camera.render()
},1000/FPS)
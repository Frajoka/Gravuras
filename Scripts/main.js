//Varaveis Globais
const c=document.querySelector("#c").getContext("2d")
var w=c.canvas.width=window.innerWidth*.99
var h=c.canvas.height=window.innerHeight*.99
var $inventario_div=document.querySelector("#inventario_div")
var $inventario=document.querySelector("#inventario")
var $armadura_div=document.querySelector("#armadura_div")
var $inventario_items=document.querySelector("#inventario_items")
var $arma_div=document.querySelector("#arma_div")
var $info=document.querySelector("#info")
var inventario=[]
var armaduras=['','','','']
var arma=escudo=''
var XP=0
var inventario_size=3
var gridSize=10

var Scale=6

for(var i=0;i<inventario_size*inventario_size;i++){
	inventario.push('')
}

c.fillText("Carrregando...",w/2,h/2)

//up,right,down,left
var keys=[0,0,0,0]
var isDragging=false
var dragging=null
var offSetDragX=0
var offSetDragY=0

var isInfo=false
var infoItemText=['','']
var isAlerta=[]
var alertaText=[]
var alertaColor=[]

var FPS=60

//Onde Estao as Entidades
var Scene=[]
var Janelas=[]

var player=new Entity('FraJoKaDev',5,5,[Math.round(Math.random()*3),Math.round(Math.random()*3),Math.round(Math.random()*3),Math.round(Math.random()*3)])

var enemy=new Entity('inimigo',Math.random()*tamanhoX,Math.random()*tamanhoY,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)
var enemy=new Entity('inimigo',Math.random()*tamanhoX,Math.random()*tamanhoY,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)
var enemy=new Entity('inimigo',Math.random()*tamanhoX,Math.random()*tamanhoY,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)


Scene.push(player)

var MaxVida=player.vida

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
			
			if(x+size>=0 && y+size>=0 && x<=w && y<=h){
				c.drawImage(Mapa[i].img,x,y,size,size)
			}
		}
		for(var i=0;i<Scene.length;i++){
			var x,y
			x=Scene[i].x*gridSize-(camera.x-camera.fov[0])
			y=Scene[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Scene[i].size*gridSize*Scale
			
			if(x+size>=0 && y+size>=0 && x<=w && y<=h){
				c.font="bold 15px monospace"
				c.fillText(Scene[i].vida,x+size/3,y-5)
				c.drawImage(Scene[i].img,x,y,size,size)
				if(Scene[i]!=player && Scene[i].vida>0){
					enemyAI(Scene[i])
				}
			}
		}
	}
}

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
		case Configs['inventario']:
			showInventario()
			break
		case Configs['status']:
			showInfo()
			break
		case Configs['settings']:
			showSettings()
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
	for(var i=0;i<Janelas.length;i++){
		if(e.target == Janelas[i] ||
		e.target.parentNode == Janelas[i]){
			isDragging=true
			dragging=Janelas[i]
			offSetDragX=Janelas[i].style.left.split("px")[0]-e.clientX
			offSetDragY=Janelas[i].style.top.split("px")[0]-e.clientY
		}
	}
	for(var i=0;i<document.querySelectorAll('.item-div').length;i++){
		if(e.target.parentNode == document.querySelectorAll('.item-div')[i]){
			isDragging=true
			if(e.target.parentNode.parentNode == $inventario_items){
				dragging=inventario[e.target.dataset.index]
				inventario[e.target.dataset.index]=''
				offSetDragX=0
				offSetDragY=e.target.dataset.index
			}
			else if(e.target.parentNode.parentNode == $armadura_div){
				dragging=armaduras[e.target.dataset.index]
				armaduras[e.target.dataset.index]=''
				offSetDragX=1
				offSetDragY=e.target.dataset.index
			}
			else if(e.target.parentNode.parentNode == $arma_div){
				if(e.target.dataset.index==0){
					dragging=arma
					arma=''
					offSetDragX=2
				}
				else if(e.target.dataset.index==1){
					dragging=escudo
					escudo=''
					offSetDragX=3
				}
				offSetDragY=e.target.dataset.index
				
			}
			reloadInfo()
			reloadInventario()
		}
	}
},false)
document.addEventListener('mouseup',(e)=>{
	if(isDragging){
		for(var i=0;i<document.querySelectorAll('.item-div').length;i++){
			if(e.target.parentNode.parentNode == $inventario_items){
				if(inventario[e.target.dataset.index]!=''){
					var item=craft(inventario[e.target.dataset.index],dragging)
					if(item!=null){
						inventario[e.target.dataset.index]=item
						alerta("+1 "+item.nome)
					}
					else{
						returnItem()
					}
				}
				else{
					inventario[e.target.dataset.index]=dragging
				}
			}
			else if(e.target.parentNode.parentNode == $armadura_div){
				if(armaduras[e.target.dataset.index]==''){
					armaduras[e.target.dataset.index]=dragging
				}
				else{
					returnItem()
				}
			}
			else if(e.target.parentNode.parentNode == $arma_div){
				if(e.target.dataset.index==0){
					if(arma==''){
						arma=dragging
					}
					else{
						returnItem()
					}
				}
				else if(e.target.dataset.index==1){
					if(escudo==''){
						escudo=dragging
					}
					else{
						returnItem()
					}
				}
			}
			buffaPlayer()
			reloadInfo()
			reloadInventario()
		}
		if(e.target==document.querySelector("#c")){
			for(var i=Mapa.length-1;i>=0;i--){
				var x,y,size
				x=Mapa[i].x*gridSize-(camera.x-camera.fov[0])
				y=Mapa[i].y*gridSize-(camera.y-camera.fov[1])
				
				x*=Scale
				y*=Scale
				
				size=Mapa[i].size*gridSize*Scale
				
				if(e.clientX >= x &&
				e.clientX<= x+size &&
				e.clientY >= y &&
				e.clientY<= y+size){
					if(dragging.nome.split(' ')[0]=='parede'){
						var temp=new Block(dragging.nome,Mapa[i].x,Mapa[i].y,1,true,pegaItemDuro,dragging.img.src)
					}
					else{
						var temp=new Block(dragging.nome,Mapa[i].x+.25,Mapa[i].y+.25,0.5,false,pegaItem,dragging.img.src)
					}
					alerta("-1 "+dragging.nome,"rgba(255,0,0")
					Mapa.splice(i+1,0,temp)
				}
			}
		}
		isDragging=false
		dragging=null
	}
},false)
document.addEventListener('mousemove',(e)=>{
	if(isDragging){
		if(dragging.style){
			dragging.style.position="absolute"
			dragging.style.left=e.clientX+offSetDragX +'px'
			dragging.style.top=e.clientY+offSetDragY +'px'
		}
	}
},false)
document.querySelector("#c").addEventListener('click',(e)=>{
	for(var i=0;i<Scene.length;i++){
		if(Scene[i]!=player){
			var x,y,size
			x=Scene[i].x*gridSize-(camera.x-camera.fov[0])
			y=Scene[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Scene[i].size*gridSize*Scale
			
			if(e.clientX >= x &&
			e.clientX<= x+size &&
			e.clientY >= y &&
			e.clientY<= y+size &&
			Scene[i].vida>0){
				if(Math.sqrt(Math.pow(player.x-Scene[i].x,2)+Math.pow(player.y-Scene[i].y,2))<player.range){
					damage(player,Scene[i])
					
				}
				else{
					console.log("Muito Longe para atacar")
				}
				return
			}
		}
	}
	for(var i=Mapa.length;i>=0;i--){
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
				if(Math.sqrt(Math.pow(player.x-Mapa[i].x,2)+Math.pow(player.y-Mapa[i].y,2))<player.range){
					Mapa[i].funcao()
				}
				else{
					console.log("Muito Longe")
				}
				return
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
	$inventario_items.textContent=''
	$armadura_div.textContent=''
	$arma_div.textContent=''
	$inventario.style.width="90%"
	
	$inventario_div.style.width=window.innerWidth/2 * Configs["tamanho_das_janelas"] + 'px'
	//$inventario_div.style.height=window.innerWidth/2 * Configs["tamanho_das_janelas"] + 'px'
	
	var inventario_items_tam_px=Configs['tamanho_das_janelas']*window.innerWidth*.25
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(armaduras[0].img){
		item.src=armaduras[0].img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',0)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$armadura_div.appendChild(div)
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(armaduras[1].img){
		item.src=armaduras[1].img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',1)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$armadura_div.appendChild(div)
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(armaduras[2].img){
		item.src=armaduras[2].img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',2)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$armadura_div.appendChild(div)
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(armaduras[3].img){
		item.src=armaduras[3].img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',3)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$armadura_div.appendChild(div)
	
	for(var i=0;i<inventario_size;i++){
		for(var j=0;j<inventario_size;j++){
			var div=document.createElement("DIV")
			var item=document.createElement("IMG")
			div.style.display="inline-block"
			div.style.margin="1%"
			div.style.width= inventario_items_tam_px/inventario_size-window.innerWidth*.02+ 'px'
			div.style.minHeight= inventario_items_tam_px/inventario_size-window.innerWidth*.02 +'px'
			
			item.style.width="100%"
			if(inventario[j+i*inventario_size].img){
				item.src=inventario[j+i*inventario_size].img.src
				inventario[j+i*inventario_size].x=j
				inventario[j+i*inventario_size].y=i
			}
			else{
				item.src=''
			}
			item.setAttribute('data-index',j+i*inventario_size)
			div.setAttribute("class","item-div")
			div.appendChild(item)
			$inventario_items.appendChild(div)
		}
	}
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(arma.img){
		item.src=arma.img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',0)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$arma_div.appendChild(div)
	
	var div=document.createElement("DIV")
	var item=document.createElement("IMG")
	div.style.width='100%'
	item.style.width='98%'
	if(escudo.img){
		item.src=escudo.img.src
	}
	else{
		item.src=''
	}
	item.setAttribute('data-index',1)
	div.appendChild(item)
	div.setAttribute("class","item-div")
	$arma_div.appendChild(div)
	
	Janelas.push($inventario_div)
	
}
function reloadInventario(){
	createInventario()
	Janelas.splice(Janelas.length-1,1)
}
function createInfo(){
	var nome=document.querySelector('#name')
	var vida=document.querySelector('#hp')
	var xp=document.querySelector('#xp')
	var velocidade=document.querySelector('#vel')
	var ataque=document.querySelector('#atk')
	var defesa=document.querySelector('#def')
	
	var bars=document.querySelectorAll('#bar')
	
	$info.style.width=window.innerWidth/3 * Configs["tamanho_das_janelas"] + 'px'
	//$info.style.height=window.innerWidth/3 * Configs["tamanho_das_janelas"] + 'px'
	
	
	player.vida=10+player.stats[0]+player.stats[2]+player.buffs[0]
	player.velocidade=(10+player.stats[1]+player.stats[2]+player.buffs[1])/100
	
	player.atk=player.stats[0]+1+player.buffs[2]
	player.def=0+player.buffs[4]
	
	
	nome.innerHTML=player.nome
	vida.innerHTML='Vida:'+player.vida+'/'+MaxVida
	xp.innerHTML='Level:'+Math.floor(XP/100)+' '+ XP +'xp' 
	velocidade.innerHTML='Velocidade:'+player.velocidade
	
	ataque.innerHTML=player.atk
	defesa.innerHTML=player.def
	
	bars[0].style.backgroundColor="red"
	bars[1].style.backgroundColor="yellow"
	bars[2].style.backgroundColor="lime"
	bars[3].style.backgroundColor="blue"
	
	for(var i=0;i<bars.length;i++){
		bars[i].innerHTML=player.stats[i]
		bars[i].style.width=100/6*(player.stats[i]+1) + "%"
		bars[i].style.minHeight="100%"
	}
	Janelas.push($info)
}
function reloadInfo(){
	var nome=document.querySelector('#name')
	var vida=document.querySelector('#hp')
	var xp=document.querySelector('#xp')
	var velocidade=document.querySelector('#vel')
	var ataque=document.querySelector('#atk')
	var defesa=document.querySelector('#def')
	
	var bars=document.querySelectorAll('#bar')
	
	nome.innerHTML=player.nome
	vida.innerHTML='Vida:'+player.vida+'/'+MaxVida
	xp.innerHTML='Level:'+Math.floor(XP/100)+' '+ XP +'xp' 
	velocidade.innerHTML='Velocidade:'+player.velocidade
	
	ataque.innerHTML=player.atk
	defesa.innerHTML=player.def
	
	bars[0].style.backgroundColor="red"
	bars[1].style.backgroundColor="yellow"
	bars[2].style.backgroundColor="lime"
	bars[3].style.backgroundColor="blue"
	
	for(var i=0;i<bars.length;i++){
		bars[i].innerHTML=player.stats[i]
		bars[i].style.width=100/6*(player.stats[i]+1) + "%"
		bars[i].style.minHeight="100%"
	}
}

function showInfo(){
	if($info.style.display=='none'){
		$info.style.display='inline-block'
	}
	else{
		$info.style.display='none'
	}
}
function showSettings(){
	if(document.querySelector("#settings_div").style.display=='none'){
		document.querySelector("#settings_div").style.display='inline-block'
	}
	else{
		document.querySelector("#settings_div").style.display='none'
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
function addInventario(obj){
	for(var i=0;i<inventario.length;i++){
		if(inventario[i]==''){
			obj.x=i%inventario_size
			obj.y=Math.floor(i/(inventario_size+1))*Math.round(i/inventario_size)
			inventario[i]=obj
			reloadInventario()
			alerta("+1 "+obj.nome)
			return true
		}
	}
	return false
}
function addXp(quanto,causa){
	XP+=quanto
	reloadInfo()
	alerta("+"+quanto+"xp por "+causa,'rgba(0,255,0')
}
function returnItem(){
	switch(offSetDragX){
		case 0:
			inventario[offSetDragY]=dragging
			break;
		case 1:
			armaduras[offSetDragY]=dragging
			break;
		case 2:
			arma=dragging
			break;
		case 3:
			escudo=dragging
			break;
	}
}
function buffaPlayer(){
	var temp=player.buffs
	player.buffs=[0,0,0,0,0,0]
	
	for(var i=0;i<armaduras.length;i++){
		if(armaduras[i] instanceof Item){
			for(var j=0;j<armaduras[i].buffs.length;j++){
				player.buffs[j]+=armaduras[i].buffs[j]
			}
		}
	}
	if(arma instanceof Item){
		for(var j=0;j<arma.buffs.length;j++){
			player.buffs[j]+=arma.buffs[j]
		}
	}
	if(escudo instanceof Item){
		for(var j=0;j<escudo.buffs.length;j++){
			player.buffs[j]+=escudo.buffs[j]
		}
	}
	
	if(player.buffs[0]>temp[0]){alerta("+1 de Vida")}
	if(player.buffs[1]>temp[1]){alerta("+0.01 de Velocidade")}
	if(player.buffs[2]>temp[2]){alerta("+1 de Ataque")}
	if(player.buffs[3]>temp[3]){alerta("+1 de Alcance")}
	if(player.buffs[4]>temp[4]){alerta("+1 de Defesa")}
	if(player.buffs[5]>temp[5]){alerta("+1 de Mineracao")}
	if(player.buffs[6]>temp[6]){alerta("+1 de Agricultura")}
	
	if(player.buffs[0]<temp[0]){alerta("-1 de Vida","rgba(255,0,0")}
	if(player.buffs[1]<temp[1]){alerta("-0.01 de Velocidade","rgba(255,0,0")}
	if(player.buffs[2]<temp[2]){alerta("-1 de Ataque","rgba(255,0,0")}
	if(player.buffs[3]<temp[3]){alerta("-1 de Alcance","rgba(255,0,0")}
	if(player.buffs[4]<temp[4]){alerta("-1 de Defesa","rgba(255,0,0")}
	if(player.buffs[5]<temp[5]){alerta("-1 de Mineracao","rgba(255,0,0")}
	if(player.buffs[6]<temp[6]){alerta("-1 de Agricultura","rgba(255,0,0")}
	
	
	reloadInfo()
}
function destroy(obj){
	for(var i=0;i<Mapa.length;i++){
		if(Mapa[i]==obj){
			Mapa.splice(i,1)
			return
		}
	}
}
function damage(obj1,obj2){
	if(Math.random()*5<=obj1.stats[0]-obj2.def && obj2.vida>0){
		obj2.vida-=obj1.atk
		if(obj2 == player){
			alerta('-'+obj1.atk+' de vida '+obj2.nome,"rgba(255,0,0")
			reloadInfo()
		}
		else{
			alerta('-'+obj1.atk+' de vida '+obj2.nome)
		}
		if(obj2.vida<0){
			obj2.vida=0
		}
		if(obj2.vida==0 && obj2!=player){
			addXp(10,'Matar'+obj2.nome)
		}
	}
	else if(obj1 == player){
		alerta('miss',"rgba(255,0,0")
	}
}
function enemyAI(enemy){
	if(enemy.x<player.x && !collideMap(enemy.x+enemy.velocidade,enemy.y,enemy.size)){
		enemy.x+=enemy.velocidade
	}
	if(enemy.y<player.y && !collideMap(enemy.x,enemy.y+enemy.velocidade,enemy.size)){
		enemy.y+=enemy.velocidade
	}
	if(enemy.x>player.x && !collideMap(enemy.x-enemy.velocidade,enemy.y,enemy.size)){
		enemy.x-=enemy.velocidade
	}
	if(enemy.y>player.y && !collideMap(enemy.x,enemy.y-enemy.velocidade,enemy.size)){
		enemy.y-=enemy.velocidade
	}
	if(Math.sqrt(Math.pow(enemy.x-player.x,2)+Math.pow(enemy.y-player.y,2))<player.range && Date.now()%50==0){
		damage(enemy,player)
	}
}
function infoItem(nome,info){
	infoItemText[0]=nome
	infoItemText[1]=info
	isInfo=true
}
function alerta(text,color="rgba(255,255,255"){
	alertaText.push(text)
	alertaColor.push(color)
	isAlerta.push(1)
}
function reload(){
	createInfo()
	createInventario()
}

console.log('Carregando...')
createMap()
reload()
for(var i=0;i<Janelas.length;i++){
	Janelas[i].style.width='30%'
	Janelas[i].style.left='0px'
	Janelas[i].style.top='0px'
}
Janelas=[]

createInfo()
createInventario()
console.log('Pronto!')

//Loop Principal
setInterval(()=>{
	clear()
	
	if(player.vida>0){
		movePlayer()
	}
	if(Math.floor(XP/100)==1){
		var buttons=document.querySelectorAll('level_up_button')
		for(var i=0;i<buttons.length;i++){
			buttons[i].style.display='inline-block'
		}
	}
	camera.render()
	
	if(isInfo){
		c.fillStyle="rgba(55,55,55,0.3)"
		c.fillRect(w/4-2,2,w/4*2,72)
		c.fillStyle="rgba(255,255,255,8)"
		c.font="bold 30px monospace"
		c.fillText(infoItemText[0],w/3,30)
		c.fillText(infoItemText[1],w/4,70)
	}
	for(var i=0;i<isAlerta.length;i++){
		if(isAlerta[i]>0){
			isAlerta[i]-=Configs['velocidade_dos_textos']+i/300
			c.fillStyle=alertaColor[i]+","+isAlerta[i]+")"
			c.font="bold 20px monospace"
			c.fillText(alertaText[i],w/3,h-140+120*isAlerta[i])
		}
		else{
			isAlerta.splice(i,1)
			alertaText.splice(i,1)
			alertaColor.splice(i,1)
		}
	}
},1000/FPS)
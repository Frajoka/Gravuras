//Varaveis Globais
const c=document.querySelector("#c").getContext("2d")
var w=c.canvas.width=window.innerWidth*.99
var h=c.canvas.height=window.innerHeight*.99
var $inventario_div=document.querySelector("#inventario_div")
var $inventario=document.querySelector("#inventario")
var $info=document.querySelector("#info")
var inventario=[]
var armaduras=['','','','']
var $inventario_items=[]
var $armaduras=[]
var $arma;
var $escudo;

var arma= ''
var escudo=''
var XP=0
var inventario_size=3
var gridSize=10
var showCoords=false

var fov=80

var fogos=[]
var plantas=[]
var baus=[]

var AI=[]
for(var i=0;i<25;i++){
	AI.push(0)
	AI[i]+=Math.random()*Math.random()*2-1
}
for(var i=0;i<inventario_size*inventario_size;i++){
	inventario.push('')
}

console.log(AI)
var Scale=(w/2/fov)-(gridSize/2/fov)


//up,right,down,left
var keys=[0,0,0,0]
var isDragging=false
var dragging=null
var offSetDragX=0
var offSetDragY=0

var isChangingKeys=false
var keyInChange=''

var delayFunction=[]
var delayTime=[]

var isInfo=false
var infoItemText=['','']
var isAlerta=[]
var alertaText=[]
var alertaColor=[]

var FPS=60

//Onde Estao as Entidades
var Scene=[]
var Janelas=[]

var player=new Entity('Jogador',1,1,[Math.round(Math.random()*3),Math.round(Math.random()*3),Math.round(Math.random()*3),Math.round(Math.random()*3)])

var enemy=new Entity('inimigo',Math.random()*tamanhoX-1,Math.random()*tamanhoY-1,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)
var enemy=new Entity('inimigo',Math.random()*tamanhoX-1,Math.random()*tamanhoY-1,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)
var enemy=new Entity('inimigo',Math.random()*tamanhoX-1,Math.random()*tamanhoY-1,[Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4,Math.round(Math.random()*6)-4])
Scene.push(enemy)


Scene.push(player)

var MaxVida=player.vida

var camera={
	x:2.5,
	y:2.5,
	fov:[fov,fov*h/w],
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
				/*if(Scene[i]!=player && Scene[i].vida>0){
					enemyAI(Scene[i])
				}*/
			}
			if(Scene[i]!=player && Scene[i].vida>0){
				enemyAI(Scene[i])
			}
		}
	}
}


//Eventos
document.addEventListener('keydown',(e)=>{
	if(isChangingKeys){
		Configs[keyInChange]=e.code
		isChangingKeys=false
		createSettings()
	}
	else{
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
			case Configs['trocar_maos']:
				var temp=arma
				arma=escudo
				escudo=temp
				reloadInventario()
				break
			case Configs['status']:
				showInfo()
				break
			case Configs['settings']:
				showSettings()
				break
			
		}
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
	
	for(var j=0;j<$inventario_items.length;j++){
		if(e.target == $inventario_items[j]){
			dragging=inventario[j]
			offSetDragX=0
			offSetDragY=j
			inventario[j]=''
		}
	}
	for(var j=0;j<$armaduras.length;j++){
		if(e.target == $armaduras[j]){
			dragging=armaduras[j]
			offSetDragX=1
			offSetDragY=j
			armaduras[j]=''
		}
	}
	for(var j=0;j<baus.length;j++){
		for(var k=0;k<Janelas[baus[j].index].children[0].children.length;k++){
			if(e.target==Janelas[baus[j].index].children[0].children[k]){
				offSetDragX=4
				offSetDragY=[j,k]

				dragging=baus[j].itens[k]
				baus[j].itens[k]=''
			}
		}
	}
	if(e.target == $arma){
		offSetDragX=2
		dragging=arma
		arma=''
	}
	else if(e.target == $escudo){
		offSetDragX=3
		dragging=escudo
		escudo=''
	}
	if(dragging!=null){
		isDragging=true
	}

	reloadInfo()
	reloadInventario()
	reloadBaus()
},false)
document.addEventListener('mouseup',(e)=>{
	if(isDragging){
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
					if(isDragging){
						if(dragging instanceof Block){
							if(dragging.nome=='bau'){
								baus.push({ obj: dragging, itens: [], index: Janelas.length })
								createBaus()
							}
							var temp=dragging
							temp.x=Math.floor(Mapa[i].x)
							temp.y=Math.floor(Mapa[i].y)
						}
						else{
							var temp=craftMapa(Mapa[i],dragging)
							if(temp!=null){
								temp.x=Math.floor(Mapa[i].x)
								temp.y=Math.floor(Mapa[i].y)
								Mapa.splice(i,1)
							}
							else{
								var temp=dragging
								temp.x=Mapa[i].x+.25
								temp.y=Mapa[i].y+.25
							}
							alerta("-1 "+dragging.nome,"rgba(255,0,0")
						}
						Mapa.splice(i+1,0,temp)
						break
					}
				}
			}
		}
		else{
			for(var j=0;j<$inventario_items.length;j++){
				if(e.target == $inventario_items[j]){
					if(inventario[j]==''){
						inventario[j]=dragging
						isDragging=false
					}
					else{
						var temp=craft(inventario[j],dragging)
						if(temp!=null){
							inventario[j]=temp
						}
						else{returnItem()}
						isDragging=false
					}
				}
			}
			if(isDragging){
				for(var j=0;j<$armaduras.length;j++){
					if(e.target == $armaduras[j]){
						if(armaduras[j]==''){
							armaduras[j]=dragging
						}
						else{
							returnItem()
						}
						isDragging=false
					}
				}
			}
			if(isDragging){
				for (var j = 0; j < baus.length; j++) {
					for (var k = 0; k < Janelas[baus[j].index].children[0].children.length; k++) {
						if (e.target == Janelas[baus[j].index].children[0].children[k]) {
							if(baus[j].itens[k]==''){
								baus[j].itens[k] = dragging
							}
							else{
								returnItem()
							}
							isDragging=false
						}
					}
				}
			}
			if(isDragging){
				if(e.target == $arma){
					if(arma==''){
						arma=dragging
						isDragging=false
					}
					else{
						var temp=arma
						arma=dragging
						dragging=temp
						returnItem()
					}
				}
				else if(e.target == $escudo){
					if(escudo==''){
						escudo=dragging
						isDragging=false
					}
					else{
						var temp=escudo
						escudo=dragging
						dragging=temp
						returnItem()
					}
				}
				else{
					returnItem()
				}
			}
		}
		buffaPlayer()
		reloadInfo()
		reloadInventario()
		reloadBaus()
		
		isDragging=false
		dragging=null
	}
},false)
document.addEventListener('mousemove',(e)=>{
	if(isDragging){
		if(dragging != null && dragging.style){
			dragging.style.position="absolute"
			dragging.style.left=e.clientX+offSetDragX +'px'
			dragging.style.top=e.clientY+offSetDragY +'px'
		}
		else{
			var temp=dragging.nome
		}
	}
	else if(e.target==document.querySelector("#c")){
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
				var temp=Mapa[i].nome
				break
			}
		}
		for(var i=0;i<Scene.length;i++){
			var x,y,size
			x=Scene[i].x*gridSize-(camera.x-camera.fov[0])
			y=Scene[i].y*gridSize-(camera.y-camera.fov[1])
			
			x*=Scale
			y*=Scale
			
			size=Scene[i].size*gridSize*Scale
			
			if(e.clientX >= x &&
			e.clientX<= x+size &&
			e.clientY >= y &&
			e.clientY<= y+size){
				var temp=Scene[i].nome
				break
			}
		}
	}
	else{
		for(var j=0;j<$inventario_items.length;j++){
			if(e.target == $inventario_items[j]){
				var temp=inventario[j].nome
			}
		}
		for(var j=0;j<$armaduras.length;j++){
			if(e.target == $armaduras[j]){
				var temp=armaduras[j].nome
			}
		}
		for(var j=0;j<baus.length;j++){
			for(var k=0;k<Janelas[baus[j].index].children[0].children.length;k++){
				if(e.target==Janelas[baus[j].index].children[0].children[k]){
					var temp=baus[j].itens[k].nome
				}
			}
		}
		if(e.target == $arma){
			if(e.target == $arma){
				var temp=arma.nome
			}
		}
		else if(e.target == $escudo){
			if(e.target == $escudo){
				var temp=escudo.nome
			}
		}
	}
	if(temp==undefined){
		infoItemText=['','']
		isInfo=false
	}
	else{
		infoItem(temp)
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
					alerta("Muito Longe para atacar ","rgba(255,0,0")
				}
				return
			}
		}
	}
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
			if(Mapa[i].funcao!=null){
				if(Math.sqrt(Math.pow(player.x-Mapa[i].x,2)+Math.pow(player.y-Mapa[i].y,2))<player.range){
					var temp=construir(i)
					if(temp!=null){
						temp.x=Math.floor(Mapa[i].x)
						temp.y=Math.floor(Mapa[i].y)
						
						Mapa.splice(i,1)
						Mapa.splice(i+1,0,temp)
						if(temp.nome=='bau'){
							baus.push({obj:temp,itens:[],index:Janelas.length})
							createBaus()
						}
					}
					else{
						switch(Mapa[i].funcao){
							case pegaPlanta:
								delay(() => { Mapa[i].funcao() }, 1000)
								break
							case pegaGraveto:
								delay(() => { Mapa[i].funcao() }, 500)
								break
								case pegaPedra:
								delay(() => { Mapa[i].funcao() }, 500)
								break
							case pegaItemDuro:
								delay(() => { Mapa[i].funcao() }, 1000)
								break
							default:
								delay(() => { Mapa[i].funcao() }, 10)
								break
						}
					}
				}
				else{
					alerta("Muito Longe ","rgba(255,0,0")
				}
				return
			}
			else if(Mapa[i] instanceof Item){
				if(Math.sqrt(Math.pow(player.x-Mapa[i].x,2)+Math.pow(player.y-Mapa[i].y,2))<player.range){
					var temp=construir(i)
					if(temp!=null){
						temp.x=Math.floor(Mapa[i].x)
						temp.y=Math.floor(Mapa[i].y)
						
						Mapa.splice(i,1)
						Mapa.splice(i+1,0,temp)
						if(temp==Itens_Lista['fogo']){
							fogos.push(temp)
						}
					}
					else{
						if(addInventario(Mapa[i])){
							destroy(Mapa[i])
						}
						else{
							alerta("Inventario Cheio","rgba(255,0,0")
						}
					}
				}
				else{
					alerta("Muito Longe",'rgba(255,0,0')
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
	$inventario.textContent=''
	$inventario_items=[]
	$armaduras=[]
	$inventario.style.width="90%"
	
	$inventario_div.style.width=window.innerWidth/2 * Configs["tamanho_das_janelas"] + 'px'

	//Criando Coluna de Armaduras! 
	var inventory_col=document.createElement("DIV")
	
	for(var i=0;i<armaduras.length;i++){
		var data=document.createElement("DIV")
		data.style.width=1/8*$inventario_div.style.width.split('px')[0] + 'px'
		data.style.height=1/8*$inventario_div.style.width.split('px')[0] + 'px'
		
		data.style.backgroundSize=1/8*$inventario_div.style.width.split('px')[0] + 'px'

		if(armaduras[i]!=''){
			data.style.backgroundImage="url("+armaduras[i].img.src+")"
		}
		data.style.display="inline-block"
		data.setAttribute("class","item-div")
		$armaduras.push(data)
		inventory_col.appendChild(data)
	}
	inventory_col.style.width=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	inventory_col.style.marginLeft="10%"
	inventory_col.style.display='inline-block'

	

	$inventario.appendChild(inventory_col)

	//Criando Coluna de Itens! 
	var inventory_col=document.createElement("DIV")
	

	for(var i=0;i<inventario.length;i++){
		var data=document.createElement("DIV")
		data.style.margin='0px'
		data.style.width=1/2*Number($inventario_div.style.width.split('px')[0])/inventario_size-inventario_size + 'px'
		data.style.height=1/2*Number($inventario_div.style.width.split('px')[0])/inventario_size-inventario_size + 'px'
		
		data.style.backgroundSize=1/2*Number($inventario_div.style.width.split('px')[0])/inventario_size-inventario_size + 'px'

		if(inventario[i]!=''){
			data.style.backgroundImage="url("+inventario[i].img.src+")"
		}
		data.style.display="inline-block"
		data.setAttribute("class","item-div")

		$inventario_items.push(data)

		inventory_col.appendChild(data)
	}
	inventory_col.style.width=1/2*$inventario_div.style.width.split('px')[0] + 'px'
	inventory_col.style.marginLeft="2.5%"
	inventory_col.style.marginRight="2.5%"
	inventory_col.style.lineHeight="0px"
	inventory_col.style.display='inline-block'
	$inventario.appendChild(inventory_col)
	
	//Criando Arma
	var inventory_col=document.createElement("DIV")

	var data=document.createElement("DIV")
	data.style.width=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	data.style.height=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	
	data.style.backgroundSize=1/8*$inventario_div.style.width.split('px')[0] + 'px'

	if(arma!=''){
		data.style.backgroundImage="url("+arma.img.src+")"
	}
	data.style.display="inline-block"
	data.setAttribute("class","item-div")

	$arma=data

	inventory_col.appendChild(data)

	//Criando Escudo
	
	var data=document.createElement("DIV")
	data.style.width=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	data.style.height=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	
	data.style.backgroundSize=1/8*$inventario_div.style.width.split('px')[0] + 'px'

	if(escudo!=''){
		data.style.backgroundImage="url("+escudo.img.src+")"
	}
	data.style.display="inline-block"
	data.setAttribute("class","item-div")
	inventory_col.appendChild(data)

	inventory_col.style.width=1/8*$inventario_div.style.width.split('px')[0] + 'px'
	inventory_col.style.display='inline-block'

	$escudo=data

	$inventario.appendChild(inventory_col)



	Janelas.push($inventario_div)	
}
function reloadInventario(){
	createInventario()
	for(var i=0;i<inventario_size*inventario_size;i++){
		if(inventario[i]==undefined){
			inventario.push('')
		}
	}
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
	
	player.velocidade=(10+player.stats[1]+player.stats[2]+player.buffs[1])/100
	player.range=2*(player.buffs[3]+1)
	
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
function showHUD(){
	c.font='20px Arial bold'
	if(arma!=''){
		c.fillText(arma.nome,w/10*8,h-h/10-w/29)
		c.drawImage(arma.img,w/10*8,h-h/10-w/30,w/15,w/15)
	}
	if(escudo!=''){
		c.fillText(escudo.nome,w/10*9,h-h/10-w/29)
		c.drawImage(escudo.img,w/10*9,h-h/10-w/30,w/15,w/15)
	}
	c.strokeStyle="#000"
	c.strokeRect(w/10*8,h-h/10-w/30,w/15,w/15)
	c.strokeRect(w/10*9,h-h/10-w/30,w/15,w/15)
}
function createBaus(){
	for(var i=0;i<baus.length;i++){
		if (Janelas[baus[i].index] == undefined) {
			var div = document.createElement("DIV")
			var div_items = document.createElement("DIV")
			
			div.setAttribute('id','bau')
			div.style.position="absolute"
			div.style.opacity="0.9"
			div.style.backgroundColor="#ddd"
			div.style.border="3px solid #000"
			div.style.borderRadius="3px"

			div.style.width = 50 * Configs['tamanho_das_janelas'] + 'vw'
			div.style.height = 50 * Configs['tamanho_das_janelas'] + 'vw'

			div.style.left='0px'
			div.style.top='0px'

			div_items.style.margin='12.5%'
			div_items.style.width='87.5%'
			div_items.style.height='87.5%'
			for (var j = 0; j < 4 * 4; j++) {
				var item = document.createElement("DIV")

				item.style.bakgroundSize='cover'

				item.setAttribute('class', 'item-div')
				item.style.width = '20%'
				item.style.height = '20%'

				item.style.display="inline-block"

				if(baus[i].itens[j]==undefined){
					baus[i].itens[j]=''
				}
				else{
					item.style.backgroundImage='url('+baus[i].itens[j].img.src+')'
				}

				div_items.appendChild(item)
			}
			div.appendChild(div_items)
			document.querySelector('BODY').appendChild(div)
			Janelas.push(div)
		}
	}
}
function reloadBaus(){
	for(var i=0;i<baus.length;i++){
		for (var j = 0; j < baus[i].itens.length; j++){
			if (baus[i].itens[j] != '') {
				document.querySelectorAll("#bau")[i].children[0].children[j].style.backgroundImage = 'url(' + baus[i].itens[j].img.src + ')'
			}
			else {
				document.querySelectorAll("#bau")[i].children[0].children[j].style.backgroundImage = ''
			}
		} 
	}
}
function removeBau(obj){
	for(var i=0;i<baus.length;i++){
		if(baus[i].obj==obj){
			Janelas.splice(baus[i].index,1)
			baus.splice(i,1)
		}
	}
	reload()
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
	
	if(camera.x<player.x*gridSize){camera.x+=(player.x*gridSize-camera.x)*0.1}
	if(camera.x>player.x*gridSize){camera.x+=(player.x*gridSize-camera.x)*0.1}
	if(camera.y<player.y*gridSize){camera.y+=(player.y*gridSize-camera.y)*0.1}
	if(camera.y>player.y*gridSize){camera.y+=(player.y*gridSize-camera.y)*0.1}

	if(baus.length>0){
		for (var i = 0; i < baus.length; i++) {
			if(Janelas[baus[i].index].style.display!="none" && Math.sqrt(Math.pow(baus[i].obj.x-player.x,2)+Math.pow(baus[i].obj.y-player.y,2))>1.5){
				Janelas[baus[i].index].style.display='none'
			}
		}
	}
	
}
function collideMap(x,y,size){
	for(var i=0;i<Mapa.length;i++){
		if(Mapa[i].solid){
			var ox=Mapa[i].x
			var oy=Mapa[i].y
			var osize=Mapa[i].size
		
			if(x+size>ox &&
			x<ox+osize &&
			y+size>oy &&
			y<oy+osize){
				if(Mapa[i] in fogos){
					damage({nome:'fogo',atk:1},player)
				}
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
		case 4:
			baus[offSetDragY[0]].itens[offSetDragY[1]]=dragging
	}
}
function buffaPlayer(){
	var temp=player.buffs
	var temp1=inventario_size
	player.buffs=[0,0,0,0,0,0,0]
	
	for(var i=0;i<armaduras.length;i++){
		if(armaduras[i] instanceof Item){
			if(armaduras[i].nome.split(' ')[0] == 'bolsa'){
				switch(armaduras[i].nome.split(' ')[1]){
					case 'de':
						inventario_size=4
						break
					case 'maior':
						inventario_size=5
						break
					case 'grande':
						inventario_size=6
						break
					default:
						inventario_size=3
				}
			}
			else{
				inventario_size=3
			}
			reloadInventario()
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

	for(var i=0;i<inventario_size*inventario_size-inventario.length;i++){
		inventario.push('')
	}
	
	if(player.buffs[0]>temp[0]){alerta("+1 de Vida")}
	if(player.buffs[1]>temp[1]){alerta("+0.01 de Velocidade")}
	if(player.buffs[2]>temp[2]){alerta("+1 de Ataque")}
	if(player.buffs[3]>temp[3]){alerta("+1 de Alcance")}
	if(player.buffs[4]>temp[4]){alerta("+0.25 de Defesa")}
	if(player.buffs[5]>temp[5]){alerta("+1 de Mineracao")}
	if(player.buffs[6]>temp[6]){alerta("+1 de Agricultura")}
	if(inventario_size>temp1){alerta("Mais espaco no Inventario")}
	
	if(player.buffs[0]<temp[0]){alerta("-1 de Vida","rgba(255,0,0")}
	if(player.buffs[1]<temp[1]){alerta("-0.01 de Velocidade","rgba(255,0,0")}
	if(player.buffs[2]<temp[2]){alerta("-1 de Ataque","rgba(255,0,0")}
	if(player.buffs[3]<temp[3]){alerta("-1 de Alcance","rgba(255,0,0")}
	if(player.buffs[4]<temp[4]){alerta("-0.25 de Defesa","rgba(255,0,0")}
	if(player.buffs[5]<temp[5]){alerta("-1 de Mineracao","rgba(255,0,0")}
	if(player.buffs[6]<temp[6]){alerta("-1 de Agricultura","rgba(255,0,0")}
	if(inventario_size<temp1){alerta("Menos espaco no Inventario","rgba(255,0,0")}
	
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
		
		obj2.x+=(obj2.x-obj1.x)/obj1.atk
		obj2.y+=(obj2.y-obj1.y)/obj1.atk
		
		if(obj2 == player){
			camera.x+=(obj2.x-obj1.x)/obj1.atk
			camera.y+=(obj2.y-obj1.y)/obj1.atk
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
	var input=[0,0,0,0,0]
	var neurons=[0,0,0,0,0]
	var o=[0,0,0,0,0]
	var max=null
	
	input[0]=player.x
	input[1]=player.y
	
	input[2]=enemy.x
	input[3]=enemy.y
	
	input[4]=Math.sqrt(Math.pow(enemy.x-player.x,2)+Math.pow(enemy.y-player.y,2))
	
	for(var i=0;i<input.length;i++){
		for(var j=0;j<neurons.length;j++){
			neurons[j]=Math.floor(input[j]*AI[i])
		}
	}
	for(var i=0;i<neurons.length;i++){
		for(var j=0;j<o.length;j++){
			o[j]=Math.floor(neurons[j]*AI[i])
		}
	}
	for(var i=0;i<o.length;i++){
		if(i==0){
			max=0
		}
		else{
			if(o[i]>=o[max]){
				max=i
			}
		}
	}
	
	if(max==0 && !collideMap(enemy.x+enemy.velocidade,enemy.y,enemy.size)){
		enemy.x+=enemy.velocidade
	}
	if(max==1 && !collideMap(enemy.x,enemy.y+enemy.velocidade,enemy.size)){
		enemy.y+=enemy.velocidade
	}
	if(max==2 && !collideMap(enemy.x-enemy.velocidade,enemy.y,enemy.size)){
		enemy.x-=enemy.velocidade
	}
	if(max==3 && !collideMap(enemy.x,enemy.y-enemy.velocidade,enemy.size)){
		enemy.y-=enemy.velocidade
	}
	if(Math.sqrt(Math.pow(enemy.x-player.x,2)+Math.pow(enemy.y-player.y,2))<enemy.range && max==4){
		damage(enemy,player)
	}
	
	var x=enemy.x*gridSize-(camera.x-camera.fov[0])
	var y=enemy.y*gridSize-(camera.y-camera.fov[1])
	c.fillText(o,x*Scale,y*Scale-30)
}
function infoItem(nome){
	infoItemText[0]=nome
	infoItemText[1]=''
	if(Itens_Lista[nome] instanceof Item){
		for(var i=0;i<Itens_Lista[nome].buffs.length;i++){
			if(Itens_Lista[nome].buffs[i]!=0){
				switch(i){
					case 0:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Vida; '
						break
					case 1:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Velocidade; '
						break
					case 2:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Atk; '
						break
					case 3:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Alcance; '
						break
					case 4:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Defesa; '
						break
					case 5:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Mineracao; '
						break
					case 6:
						infoItemText[1]+='+'+Itens_Lista[nome].buffs[i]+' Agricultura; '
						break
				}
			}
		}
	}
	else if(Itens_Lista[nome] instanceof Block){
		infoItemText[1]='Bloco'
	}
	else{infoItemText[1]=''}
	isInfo=true
}
function alerta(text,color="rgba(255,255,255"){
	alertaText.push(text)
	alertaColor.push(color)
	isAlerta.push(1)
}
function reload(){
	Janelas=[]
	for(var i=0;i<document.querySelectorAll("#bau").length;i++){
		document.querySelectorAll('#bau')[i].remove()
	}
	createInfo()
	createInventario()
	createBaus()
}
function startGame(){
	console.log('Carregando...')

	document.querySelector('#start').style.display='none'
	

	c.fillText("Carregando...",w/2,h/2)

	createMap()
	document.querySelector('#game').style.display='block'
	reload()
	for(var i=0;i<Janelas.length;i++){
		Janelas[i].style.width='30%'
		Janelas[i].style.left='0px'
		Janelas[i].style.top='0px'
	}
	Janelas=[]

	createInfo()
	createInventario()
	createSettings()
	createBaus()
	console.log('Pronto!')

	
	document.querySelector('audio').play()
	document.querySelector('audio').volume=Configs['volume_musica']*Configs['volume_master']
	
}
function delay(func,time,show=true,stop=true){
	delayFunction.push(func)
	delayTime.push({
		now:Date.now(),
		delta:time,
		show:show,
		stop:stop
	})
}
function crescerPlanta(planta){
	plantas[planta].colher=true
	console.log(plantas[planta])
}
function devTP(obj){
	player.x=obj.x
	player.y=obj.y
}
function devCoord(){
	if(showCoords){
		showCoords=false
	}
	else{showCoords=true}
}



//Loop Principal
setInterval(()=>{
	clear()
	
	if(player.vida>0){
		if(delayFunction.length<1 || !delayTime[0].stop){
			movePlayer()
		}	
	}
	if(Math.floor(XP/100)==1){
		var buttons=document.querySelectorAll('level_up_button')
		for(var i=0;i<buttons.length;i++){
			buttons[i].style.display='inline-block'
		}
	}

	camera.render()
	showHUD()
	for(var i=0;i<delayFunction.length;i++){
		if(delayTime[i].show){
			c.fillStyle="#ff0000"
			c.fillRect((player.x*gridSize-(camera.x-camera.fov[0]))*Scale,(player.y*gridSize-(camera.y-camera.fov[1]))*Scale-30,
			player.size*gridSize*Scale*(delayTime[i].delta-(Date.now()-delayTime[i].now))/delayTime[i].delta,10)
			c.strokeStyle="#000000"
			c.strokeRect((player.x*gridSize-(camera.x-camera.fov[0]))*Scale,(player.y*gridSize-(camera.y-camera.fov[1]))*Scale-30,player.size*gridSize*Scale,10)
		}
		if(Date.now()-delayTime[i].now >= delayTime[i].delta){
			delayFunction[i]()
			delayFunction.splice(i,1)
			delayTime.splice(i,1)
		}
	}
	if(showCoords){c.fillStyle="#000";c.fillText('x:'+Math.floor(player.x)+'\ny:'+Math.floor(player.y),20,h-20)}
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
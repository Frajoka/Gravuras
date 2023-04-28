class Player{
	constructor(x,y,stats=[0,0,0,0]){
		this.x=x
		this.y=y
		
		this.prevX=x
		this.prevY=y
		
		this.size=1
		this.color="red"
		this.stats=stats//[Forca, Aglidade, Vitalidade, Intelecto]
		
		this.hp=5+stats[0]+stats[2]//Forca+Vitalidade
		
		this.velocity=1+stats[1]+stats[2]//Agilidade+Vitalidade
		
		this.inventario=[
			['','',''],
			['','',''],
			['','','']
		]
		this.fillInventario()
	}
	fillInventario(){
		$inventario.textContent=''
		for(var i=0;i<this.inventario.length;i++){
			for(var j=0;j<this.inventario[i].length;j++){
				var data=document.createElement("DIV")
				data.addEventListener('mouseover',(e)=>{
					$item_info.innerHTML=this.inventario[i][j]
					$item_info.style.left=e.clientX
					$item_info.style.top=e.clientY
					$item_info.style.display="block"
				},false)
				data.innerHTML=this.inventario[i][j]
				data.style.display='inline-block'
				data.style.width=50/this.inventario.length + '%'
				data.style.height=50/this.inventario[0].length + '%'
				$inventario.appendChild(data)
			}
		}
	}
	showInventario(){
		if($inventario.style.display=="flex"){
			$inventario.style.display="none"
		}
		else{
			$inventario.style.display="flex"
		}
	}
	update(){
		if(keys[0]==1){this.y-=this.velocity}
		if(keys[1]==1){this.x+=this.velocity}
		if(keys[2]==1){this.y+=this.velocity}
		if(keys[3]==1){this.x-=this.velocity}
		camera.x=this.x
		camera.y=this.y
	}
	collide(obj){
		if(this.x+this.size*gridSize>=obj.x &&
		this.x<=obj.x+obj.size*gridSize &&
		this.y+this.size*gridSize>=obj.y &&
		this.y<=obj.y+obj.size*gridSize){
			this.x=this.prevX
			this.y=this.prevY
		}
	}
}


class Entity{}

class Block{}

class Object{
	constructor(x,y,s,c,solid=true,draggable=false){
		this.x=x
		this.y=y
		this.size=s
		this.color=c
		this.solid=solid
		this.draggable=draggable
	}
	use(){
		console.log("usou")
	}
}

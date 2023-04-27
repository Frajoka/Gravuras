class Player{
	constructor(x,y,stats=[0,0,0,0]){
		this.x=x
		this.y=y
		this.size=10
		this.color="red"
		this.stats=stats//[Forca, Aglidade, Vitalidade, Intelecto]
		this.hp=5+stats[0]+stats[2]//Forca+Vitalidade
		
		this.velocity=1+stats[1]+stats[2]//Agilidade+Vitalidade
		
		this.invetory=[]
	}
	update(){
		if(keys[0]==1){this.y-=this.velocity}
		if(keys[1]==1){this.x+=this.velocity}
		if(keys[2]==1){this.y+=this.velocity}
		if(keys[3]==1){this.x-=this.velocity}
		camera.x=this.x
		camera.y=this.y
	}
}

class Entity{}

class Block{}

class Object{
	constructor(x,y,s,c,solid=true){
		this.x=x
		this.y=y
		this.size=s
		this.color=c
		this.solid=solid
	}
	use(){
		console.log("usou")
	}
}

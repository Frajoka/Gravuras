class Entity{
	constructor(nome,x,y,stats=[0,0,0,0],size=0.9,img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA1BMVEX/AAAZ4gk3AAAAJklEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAO8GQIAAAfnHrWYAAAAASUVORK5CYII="){
		this.x=x
		this.y=y
		this.nome=nome
		this.size=size
		this.img=new Image()
		this.img.src=img
		
		//Buffs de Vida/ Velocidade / Atk / range / Def / Mining / Agriculture 
		this.buffs=[0,0,0,0,0,0,0]
		
		//Forca, Agilidade, Vitalidade, Intelecto
		this.stats=stats
		
		this.vida=10+stats[0]+stats[2]+this.buffs[0]
		this.velocidade=(10+stats[1]+stats[2]+this.buffs[1])/100
		this.range=(gridSize/Scale)*(this.buffs[3]+1)
		
		this.atk=this.stats[0]+1+this.buffs[2]
		this.def=0+this.buffs[4]
	}
}
class Item{
	constructor(nome,x,y,buffs=[0,0,0,0,0,0,0],size=0.5,img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAdVBMVEX///8oHgtJNhWJZydoTh729vVINRImHApKOBeGZSYnGgDv7utLOBVkSx3s6+n29PItIQxVRC5RQCRAOS5XRiw6MiRTQSBdTTMxJxU4Lys8MyhRPhk/OCpSPRRMOBEqHwDf3tpgTzpqW0lHQjlOSUEjFgA4LhvxE+MlAAADGklEQVR4nO2b25ajIBBFo0YFMWLaW6K2sS/T//+JI1RhojOvFL2WnIe8sgVOXYCcTl5eXl5eXl5HkdyJfPx2Gha9T6XW4xFTA7wljLE8TAKQA4A81EoBIHMGEKQHB2DuAEJHMyBjJVmsm5AYQHSDVhuhqF0gauV/FiZRxBctANQzUOPUrzNADsAOD+B8CZIdAJULBKhYZiDPQ5Zz7QIe9Q3INoD8qFuljqP9MALe5gJkefyTuGr/s4mDDEBJVQqJK2y+fLf5qAGYB1gBqPeA3O8BNXi5+N86AJb9MwDki/9Bd1BlG6DoBu3/9owy/i8wMlkefwEA/+crQEC79kUHoX8FKD3A8QCS/wFk9gHQZXOHEfB8AYCxGrVsA4jPDsR15OG8VAEgzRqy/F8nWhN/hl6lxnrkMQDdrvhEgN4DHAgA/Y+bkD8CdRqW2Qcw/r9OCABFMK9AX7YBxGet1V1QcA5Y0tX/HfofA98F1/5GVnzi2odnD+AIoHANIPb5P8sg/9svf3X3v+T/JNc6axOq/A/+J8z/oFJHvrKizv+Jyf8lNCAVWeyvt7E/wuKzsv7pHuAXAkAZjPV/b3/7Y/6vp9f+n/OxV/bvv+3nf7D/9YL5F/P/SJj/Vdx7yf/gf/tT/wSA5GMAyDefB/htAGcy/6PL5g79f8H8j/X/t20A2f3T/+svX/wvSPwvBz31ydp6Ua+9bLe3Xx7gwADbTZjZB5A6/cuihfJ/dcHPTevLNoD4qK9au5PPalbXEguZ5fFV6aW+e229sPcjmHoDYNbezADePbkDCDyAI4B1E5L5H6/Z5nbC/h819kqNdf/HNYpj5xFA/9/MRPd/8aDf/yV5hKEPn16MVGsfDyb2883hMzlA7gHcAcAWYNEGILMPgPf/guEBhLkBucFzXOsAsn0DmdIrCFL1/ONeED1Ilu+Y/82Xp1rBner8Txr/R2sE1MnnSAC5awDXM/AebhsQ9D8dwKT8z543oOD/kuwGVGLLlaKaQtD+IUEBgPPht6GK/a8Ar/IABwR4OAd4ZC/680MNcIp3oh7fy8uLXH8BEvBVR2mPI2oAAAAASUVORK5CYII="){
		this.x=x
		this.y=y
		this.nome=nome
		this.size=size
		this.img=new Image()
		this.img.src=img
		this.buffs=buffs
	}
}
class Block{
	constructor(nome,x,y,size=1,solid=true,funcao=null,img="https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c5/Grass.png/revision/latest?cb=20230226144251"){
		this.x=x
		this.y=y
		this.nome=nome
		this.size=size
		this.solid=solid
		this.img=new Image()
		this.img.src=img
		this.funcao=funcao
	}
}

class Tile{
	constructor(x,y,img="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QAHxABAAIDAQADAQEAAAAAAAAAAAERITFBYVFxgaGR/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQIAAwUE/8QAHhEBAQADAQEAAwEAAAAAAAAAAAECESExEiIyQQP/2gAMAwEAAhEDEQA/AJxFv6HeHOPiaCo93LzuGw6Yoyyz9HOG8NF4h9U2Wx4IBCgUNxIyTWSxzBDrQxQRePQPPt/n/Wi+jRoYzrDT8T4UBVL9Jqxo2a+m5mU854mwaSX0bNvqX9LtUeeJfc7stm7VufibNDwcFLznbEtMW0rg14Fw/gXgvBHwZb1MmxEvitJ3qDGnSX6XOtw3w1Xn8LetLtvXFS7ROjx9jOCqbNw7wlOpRJtJua+SXSeb6rfC9fLeGiuBJlJ6MYqReR83o/DeKTLpLqWIZnSpw+HOpjV+/wBYbGMp4S4fX6O0mkyaBxRadi5H4pbljV4l90u4Tnxq5gE3uC81lETpOufkDop7jtbpTl4ICX6drGk+CJ0jZ03Xh3HhuQtRf9dbrx9SlgZpT6XpQ+k5UVvAaNF+r2EZcTZpyaD65eR+J8aNJuzdx8uyceNCHW7w5JbNunp0xm18lxNzc7az6Pqv+o827lXwP1bxuQCmfW/0fLHQZI5Zz6Zgxyv8NcEwW+U27CcrcRTMbXlNq0bzZqKpiCaPUn5oKoKkemYNrY/VPhQlcqs2VXqOsBDG6ErHC5lhoqOTDCmEJkEpTSYWFZjKACtCTKN7a3QPErUj9ztSjWFbmLeJrvDM/RLN9M6Yz1X45wsLdtRJT5NXB1t6G9IatO009+qyN6mzp6HHlNRtM96i36beyuGhQOrLMUdjOlC2J6i5bRa07whLguO20NJRU48/2zh0y7ajanwHijw5ZHKpEKpF0XqTbacy3ztvl//Z"){
		this.x=x
		this.y=y
		this.size=1
		this.img=new Image()
		this.img.src=img
	}
}




var Itens_Lista={
	'graveto':new Item('graveto',0,0,[0,0,1,0,0,0,0]),
	'palito':new Item('palito',0,0,[0,0,1,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2o6uLMtarGlWqzxnsrN_EYGQFEWD75Gefyk1KmUe2yJ6woJQ2tVn0-KZySE&s'),
	'pedra':new Item('pedra',0,0,[0,0,1,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqD9wnQxl1UepVbT2O0yWQn1KJhozR4aVduXipQCWL5QMOVh8C1wRjcvmFZw&s'),
	'pedra longa':new Item('pedra longa',0,0,[0,0,1,0,0,0,0],0.5,'data:image/jpeg;base64,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'),
	'ferro':new Item('ferro',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUre76v5gUumLIGBTyW0GSAwuq-Xu5bdt2VD1GXqWWFTm4yIKhfteuiBe1MuY&s'),
	'ouro':new Item('ouro',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOi3iBN1dVYgA5BZ-ok0rkCSC90ApAT8oft8S0hSTrn0CvakyXQxF3d_Owl1s&s'),
	'obsidiana':new Item('obsidiana',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH-kIpSk86k7dB7JqD-aPJAWiNW9T0mf7QumGFOACmCtyme-B6h905TStQnU&s'),
	'planta-folha':new Item('planta-folha',0,0,[0,0,0,0,0.25,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-wYgOaXow1C1v5ngvCD8vskEJD2ofVT3KgI-Or-WCg9HcoU5nN8ZYTjdxA&s'),
	'trepadeira':new Item('trepadeira',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBjy-HAjclTzVhXMI3K07Es2fV1LY3xdlqVztSk_hTkO3GooSOusIWJqEJLg&s'),
	'pedra afiada':new Item('pedra afiada',0,0,[0,0,1,0,0,0,0]),
	'pedra longa afiada':new Item('pedra longa afiada',0,0,[0,0,1,0,0,0,0]),
	'cajado':new Item('cajado',0,0,[0,0,2,0,0,0,2]),
	'adaga de pedra':new Item('adaga de pedra',0,0,[0,0,2,0,0,0,0]),
	'martelo de pedra':new Item('martelo de pedra',0,0,[0,0,1,0,0,0,0]),
	'picareta de pedra':new Item('picareta de pedra',0,0,[0,0,1,0,0,1,0]),
	'semente de planta-folha':new Item('semente de planta-folha',0,0,[0,0,0,0,0,0,0]),
	'semente de trepaderia':new Item('semente de trepaderia',0,0,[0,0,0,0,0,0,0]),
	'flor de planta-folha':new Item('semente de planta-folha',0,0,[0,0,0,0,0,0,0]),
	'flor de trepaderia':new Item('semente de trepaderia',0,0,[0,0,0,0,0,0,0]),
	'chao de madeira':new Item('chao de madeira',0,0,[0,0,0,0,0,0,0],1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8I-m9x5_LZUw2GO5Rbo-xYdf5KtO8sdBBVFweZ9jIITp7ttBctxqwD9f7cSE&s'),
	'parede de madeira':new Item('parede de madeira',0,0,[0,0,0,0,0,0,0],1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztraApyGq35LW_8eNAq9TOjmK38Q9AtZe3bWy7MZqe5UX4N3a7qGUpOUjtw&s')
	
}

const Craft_Lista={
	'graveto':{
		'graveto':'cajado',
		'pedra':'martelo de pedra',
		'pedra afiada':'adaga de pedra',
		'pedra longa afiada':'picareta de pedra',
		'adaga de pedra': 'palito',
		'adaga de obsidiana': 'palito',
		'adaga de ferro': 'palito',
		'martelo de pedra': 'parede de madeira',
		'martelo  de obsidiana': 'parede de madeira',
		'martelo  de ferro': 'parede de madeira'
	},
	'pedra':{
		'pedra':'pedra afiada',
		'graveto':'martelo de pedra'
	},
	'pedra longa':{
		'pedra':'pedra longa afiada'
	},
	'pedra longa afiada':{
		'graveto':'picareta de pedra'
	},
	'palito':{
		'palito':'palito longo',
		'martelo de pedra':'chao de madeira',
		'martelo de ferro':'chao de madeira',
		'martelo de obsidiana':'chao de madeira'
	},
	'adaga de pedra':{ 'graveto':'palito'},
	'adaga de obsidiana':{ 'graveto':'palito'},
	'adaga de ferro':{ 'graveto':'palito'},
	'martelo de pedra':{ 'graveto':'parede de madeira'},
	'martelo  de obsidiana':{ 'graveto':'parede de madeira'},
	'martelo  de ferro':{ 'graveto':'parede de madeira'}
}

function craft(item1,item2){
	if(Craft_Lista[item1.nome][item2.nome]){
		addXp(0.5,'Construir um Item')
		return Itens_Lista[Craft_Lista[item1.nome][item2.nome]]
	}
	else{return null}
	
}
function pegaGraveto(){
	if(Math.random()*100<50+10*player.buffs[5]){
		addXp(0.5,'Cacar gravetos')
		addInventario(Itens_Lista['graveto'])
	}
	destroy(this)
	
}
function pegaPedra(){
	if(Math.random()*100<50+10*player.buffs[4]){
		addInventario(Itens_Lista['pedra'])
	}
	if(Math.random()*100<15+10*player.buffs[4]){
		addInventario(Itens_Lista['pedra longa'])
	}
	if(player.buffs[4]>0 && Math.random()*100<7+5*(player.buffs[4]-1)){
		addInventario(Itens_Lista['ferro'])
	}
	if(player.buffs[4]>1 && Math.random()*100<3+3*(player.buffs[4]-2)){
		addInventario(Itens_Lista['ouro'])
	}
	addXp(0.5,'Cavar por pedras')
	this.img.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4n5U3GnIAt46sdKA9M5BIt9rPy1uvVW-6Cu1zZJSLQbIVsWSHbEbokweKag&s'
	this.funcao=null
	
}

function pegaPlanta(){
	if(Math.random()*100<50){
		addInventario(Itens_Lista['planta-folha'])
	}
	else{
		addInventario(Itens_Lista['trepadeira'])
	}
	addXp(0.5,'Praticar Agricultura')
	destroy(this)
	
}
function pegaItem(){
	if(addInventario(this)!=null){
		destroy(this)
	}
}
function pegaItemDuro(){
	if(arma!='' && arma.nome.split(" ")[0]=='martelo'){
		if(addInventario(this)!=null){
			destroy(this)
		}
	}
	else{
		alerta("Muito Duro para tirar com a mao","rgba(255,0,0")
	}
}





class Entity{
	constructor(nome,x,y,stats=[0,0,0,0],size=0.8,img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA1BMVEX/AAAZ4gk3AAAAJklEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAO8GQIAAAfnHrWYAAAAASUVORK5CYII="){
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
		this.range=2*(this.buffs[3]+1)
		
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
	constructor(nome,x,y,size=1,solid=true,funcao=null,img="Grass.png"){
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
	'pedra longa':new Item('pedra longa',0,0,[0,0,1,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbH_pRm-EBYgsW_RxpIVhuHEr0hg3Bt4grMjYc9dgfvNqtqC1Xo7PEzGg6I_nHf9WTd0&usqp=CAU'),
	'ferro':new Item('ferro',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUre76v5gUumLIGBTyW0GSAwuq-Xu5bdt2VD1GXqWWFTm4yIKhfteuiBe1MuY&s'),
	'ouro':new Item('ouro',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOi3iBN1dVYgA5BZ-ok0rkCSC90ApAT8oft8S0hSTrn0CvakyXQxF3d_Owl1s&s'),
	'obsidiana':new Item('obsidiana',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH-kIpSk86k7dB7JqD-aPJAWiNW9T0mf7QumGFOACmCtyme-B6h905TStQnU&s'),
	'planta-folha':new Item('planta-folha',0,0,[0,0,0,0,0.25,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-wYgOaXow1C1v5ngvCD8vskEJD2ofVT3KgI-Or-WCg9HcoU5nN8ZYTjdxA&s'),
	'trepadeira':new Item('trepadeira',0,0,[0,0,0,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBjy-HAjclTzVhXMI3K07Es2fV1LY3xdlqVztSk_hTkO3GooSOusIWJqEJLg&s'),
	'pedra afiada':new Item('pedra afiada',0,0,[0,0,1,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2kYSU89P_kpUPSbd8YaA2XZ-FMo9V3OaB9rPZVVDieD0VCPK65aP2NyJjgLwYqeOqQo&usqp=CAU'),
	'pedra longa afiada':new Item('pedra longa afiada',0,0,[0,0,1,0,0,0,0]),
	'cajado':new Item('cajado',0,0,[0,0,2,0,0,0,2]),
	'adaga de pedra':new Item('adaga de pedra',0,0,[0,0,2,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ97j4V94TIsIxQC9Om-q2QEbyYR78Q1EDB1VoI9F5K1EANZILbRhqBLnS74Lo&s'),
	'martelo de pedra':new Item('martelo de pedra',0,0,[0,0,1,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDA98M7jXIFCdaVKs_RhGavWAE3olHrOJP6Gb-1AElAgGP2JCnTU6KdrFbVOA&s'),
	'picareta de pedra':new Item('picareta de pedra',0,0,[0,0,1,0,0,1,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsggFIFwjcnF7MZsSGRuGrrbdr1cqfkXdVMdQ2Nb_2BNYXvGanmyTMMSuQ5AI&s'),
	'semente de planta-folha':new Item('semente de planta-folha',0,0,[0,0,0,0,0,0,0]),
	'semente de trepaderia':new Item('semente de trepaderia',0,0,[0,0,0,0,0,0,0]),
	'flor de planta-folha':new Item('flor de planta-folha',0,0,[0,0,0,0,0,0,1]),
	'flor de trepaderia':new Item('flor de trepaderia',0,0,[0,0,0,0,0,0,1]),
	'tabuas de madeira':new Block('tabuas de madeira',0,0,1,false,pegaItemDuro,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8I-m9x5_LZUw2GO5Rbo-xYdf5KtO8sdBBVFweZ9jIITp7ttBctxqwD9f7cSE&s'),
	'parede de madeira':new Block('parede de madeira',0,0,1,true,pegaItemDuro,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztraApyGq35LW_8eNAq9TOjmK38Q9AtZe3bWy7MZqe5UX4N3a7qGUpOUjtw&s'),
	'chao de pedra':new Block('chao de pedra',0,0,1,false,pegaItemDuro,'https://www.textures.com/system/gallery/photos/Floors/Streets/47570/FloorStreets0100_1_350.jpg'),
	'parede de pedra':new Block('parede de pedra',0,0,1,true,pegaItemDuro,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAB/CAMAAAAQJDo1AAAAP1BMVEV0dHR/f3+Pj49oaGhzc3N+fn6QkJB1dXWMjIx4eHjX19dtbW2CgoLU1NSHh4eysrJhYWGnp6e4uLjy8vLk5OSzv2AyAAAEzElEQVRoge2bjXacOAyFMcEYAkOn3X3/Z90ZrGvwlTUmOc3untS37fQE/PNhRrIsO91ft/ddt4reDVn3r7V3+7u7DfOupaIQi83blGm7i+T6JsWq7cVSw4/ufXa7QvdaPhbzU59pWt52Lbi+SrlKcyEWmxtAAzgBDN3QPf4OhhLAmEkBOC8AUu/oUzrY/x80gBeRmSn5ORf6AQCXf7A99DZ4Uth1MkNoGvtXGn0+MGlIp3Lx/k1GKO/F+VhzKQC87L/v/aDe5wuA3gToGkADMAGqVmAAFOt9wAp42j1Pq8PjD66Txwwb+YeVJGbv4BcAEHVyROLR3p5kA7zW4+N0Pf7NNff7k49TePqExz/vilplRKb8sgFwlnWd3v2EkXkN0DeAbwjQE0C5/48AhEwnAJn+5Lp0OGMEZrlRHgGfAPL7JwDY88oTtwggs8vtGvYOyw6G4FfwIwN48WTjaozhkACi4Pm4XPlN6VenAWSMLgOUy/tabNkAvj3AxS+hDss1QG6FTpkhHEsx3K5q5umYVzy97/IaiMMNu06XK8uKtKzflwvL/acFYEU+1XfbX9K4xfFsAA3gDJCH1f8mQLRIZYZkX2aPuZmaCxQomeFTTzO8LdKQ2LXH/E6ajf6RuICjcvmywNEyo5NiS3JEABANRkxnpXAUANXnVA08+rLCFROAFVT+dgDXAP6vAP/FlzC39xqAmtcBIGIAmq+7VC7FA1vuKKyISAAGKp5WOilyIbFjin6oP3lCKlEFGK+Vh+quuAE0gBzAXJweAJnqACNVUADrtK/M8YEGVXpdANYtF+5jvuV6VHyTrrZlDx+WGJA8NxnkI8mY/zve0SAPpzIpVDzEZ0u96ExpFcDAsgBIgXppAA2gDsC7U1WA17IB2F6DGKonoLmi8uNAnvpxKk2XPCIeCZ5PVkpWxLSyx7OUu+Tpl7k2PADihSrAp9QAGsAZgL6tX20FsvufAGhVvW6DxO9uiz8nP0Dht8T9M/uRjffvpF0QSKkDIJDLSi6ucBDhtD3n4QE5EDE84SwAEycqq0c4DJ9+AOSvxDjCcQKI4/d9ANSa8I8bgd8AIN9za/5nIzFfgWEFCUAcgAJAYA+HQBHR4MmgUR4jgGWB4QYc33cMAMEjUqZUrYhkxCgUG4LhETmP4GwA8ZQaIHfiWClRLGilamnL1jWABvAC4LNWIHG/ZQU0WUpv/pknjDVxCet/2LmZF4Bhox4m/GtaY6/Lz+52F0eCIeCAQ4bAu9ITqEioV5mNqHW/iY9+3GK39wPAypAeAEWpWNBI2VC5U4qmATQAZQVfA0Bu5GwFS74dz0KkZNzW+41GOQKS0wHHecI11HIgRemNSqMdlSmJI+U/HRNCGuBiPXnBDaAB/DBXxzVJQzPP/zjWh56M6sHx6rh2rD8d38v3D9g/BDoAGXhaRjt93L37ZeUJLaUdFWOoVYjGnpMiOzNH9GUAeXMNoAG8yBNaYgA2cAkv7vhZWUG+XDjSdHx+0DwJmD+xOm+Q7FyE1lEe5w6UI2LN1+IDBlAREgFg3LQrVgCX+v8sQGEuaAANgJTSdHyqlsMCBij7jRUARzwAAOQHjIAj/X7B1YMLRroezdHjFo5ysQCwfuzohvUbl3rntAE0gD8e4B+jRa8Uz+Z96QAAAABJRU5ErkJggg=='),
	'folhas de arvore':new Block('folhas de arvore',0,0,1,false,null,'l317bjmr.png'),
	'fogo':new Block("fogo",0,0,1,true,null,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0d4kZgd0JjoxWW7XrT9ubgXXapxxZYEgjdCA9H73i2UFhJa3tlU9Y_Jmpg&s'),
	'espada de pedra':new Item('espada de pedra',0,0,[0,0,3,0,0,0,0],0.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoH04awk9HntjiKndPx4cdKjvw4NbB6P0y8QV4mD_oLGeEjgHw--PHGca_vg&s'),
	'bolsa de folhas':new Item('bolsa de folhas',0,0,[0,0,0,0,0,0,0],0.5,'bolsa.jpg'),
	'bolsa maior':new Item('bolsa maior',0,0,[0,0,0,0,0,0,0],0.6,'bolsa.jpg'),
	'bolsa grande':new Item('bolsa grande',0,0,[0,0,0,0,0,0,0],1,'bolsa.jpg'),
	'balde de madeira':new Item('balde de madeira',0,0,[0,0,0,0,0,0,0],.8,'https://img.freepik.com/vetores-gratis/balde-rustico-de-madeira-isolado-no-branco_528282-23.jpg?w=740&t=st=1686572735~exp=1686573335~hmac=6c60b14ff65e4078091e20a9ecb71bc4d82f3c19c1a31ac6199de4b8c55ea24e'),
	'mesa':new Block('mesa',0,0,1,true,pegaItemDuro,'https://img.freepik.com/free-photo/wood-material-background-wallpaper-texture-concept_53876-42925.jpg?size=626&ext=jpg&ga=GA1.2.1846467481.1686572738&semt=ais'),
	'bau':new Block('bau',0,0,1,true,pegaBau,'https://png.pngtree.com/png-clipart/20230423/ourmid/pngtree-wooden-bucket-like-container-top-view-transparent-png-image_6719664.png'),
	'fornalha':new Block('fornalha',0,0,1,true,pegaItemDuro,'https://img1.gratispng.com/20180408/iwq/kisspng-boiler-furnace-compensatore-idraulico-steam-engine-steampunk-gear-5aca1517a35961.8170900515231931116691.jpg')
}

const Craft_Lista={
	'graveto':{
		'graveto':'cajado',
		'pedra':'martelo de pedra',
		'pedra afiada':'adaga de pedra',
		'pedra longa afiada':'picareta de pedra',
		'planta-folha':'bolsa de folhas'
	},
	'pedra':{
		'pedra':'pedra afiada'
	},
	'pedra afiada':{
		'adaga de pedra':'espada de pedra'
	},
	'pedra longa':{
		'pedra':'pedra longa afiada'
	},
	'palito':{
		'palito':'palito longo'
	},
	'adaga de pedra':{'pedra afiada':'espada de pedra'},
	'planta-folha':{
		'bolsa de folhas':'bolsa maior',
		'bolsa maior':'bolsa grande'
	},
	'bolsa de folhas':{'planta-folha':'bolsa maior'},
	'bolsa maior':{'planta-folha':'bolsa grande'}
}

const Construir_Lista={
	'martelo de pedra':{ 
		'graveto':'parede de madeira',
		'palito':'tabuas de madeira',
		'pedra':'parede de pedra',
		'pedra afiada':'chao de pedra'
	},
	'martelo  de obsidiana':{
		'graveto':'parede de madeira',
		'palito':'tabuas de madeira',
		'pedra':'parede de pedra',
		'pedra afiada':'chao de pedra'
	},
	'martelo  de ferro':{
		'graveto':'parede de madeira',
		'palito':'tabuas de madeira',
		'pedra':'parede de pedra',
		'pedra afiada':'chao de pedra'
	},
	'adaga de pedra':{'graveto':'palito',
		'parede de madeira':'bau'
	},
	'adaga de ferro':{'graveto':'palito',
		'parede de madeira':'bau'
	},
	'adaga de obsidiana':{'graveto':'palito',
		'parede de madeira':'bau'
	}
}


const Craft_Lista_Mapa={
	'graveto':{
		'graveto':'fogo'
	},
	'pedra':{
		'pedra':'fogo'
	},
	'tabuas de madeira':{
		'trepadeira':'balde de madeira'
	},
	'parede de madeira':{
		'ferro':'mesa'
	}
}


function clone(obj){
	if(obj instanceof Block){
		var temp=new Block(obj.nome,obj.x,obj.y,obj.size,obj.solid,obj.funcao,obj.img.src)
	}
	else if(obj instanceof Item){
		var temp=new Item(obj.nome,obj.x,obj.y,obj.buffs,obj.size,obj.img.src)
	}
	else{
		return false
	}
	
	return temp
}
	
function craft(item1,item2){
	if(Craft_Lista[item1.nome]!=undefined){
		if(Craft_Lista[item1.nome][item2.nome]!=undefined){
			addXp(0.5,'Construir um Item')
			return clone(Itens_Lista[Craft_Lista[item1.nome][item2.nome]])
		}
	}
	if(Craft_Lista[item2.nome]!=undefined){
		if(Craft_Lista[item2.nome][item1.nome]!=undefined){
			addXp(0.5,'Construir um Item')
			return clone(Itens_Lista[Craft_Lista[item2.nome][item1.nome]])
		}
	}
	return null
	
}
function craftMapa(item1,item2){
	if(Craft_Lista_Mapa[item1.nome]!=undefined && Craft_Lista_Mapa[item1.nome][item2.nome]!=undefined){
		return clone(Itens_Lista[Craft_Lista_Mapa[item1.nome][item2.nome]])
	}
	else if(Craft_Lista_Mapa[item2.nome]!=undefined && Craft_Lista_Mapa[item2.nome][item1.nome]!=undefined){
		return clone(Itens_Lista[Craft_Lista_Mapa[item2.nome][item1.nome]])
	}
	else{return null}
	
}


function pegaGraveto(){
	if(Math.random()*100<50+10*player.buffs[6]){
		addXp(0.5,'Cacar gravetos')
		addInventario(clone(Itens_Lista['graveto']))
	}
	destroy(this)
	
}
function pegaPedra(){
	if(Math.random()*100<50+10*player.buffs[5]){
		addInventario(clone(Itens_Lista['pedra']))
		addXp(0.5,'Cavar por pedras')
	}
	if(Math.random()*100<15+10*player.buffs[5]){
		addInventario(clone(Itens_Lista['pedra longa']))
		addXp(0.5,'Cavar por pedras')
	}
	if(player.buffs[5]>0 && Math.random()*100<7+5*(player.buffs[5]-1)){
		addInventario(clone(Itens_Lista['ferro']))
		addXp(0.5,'Minerar')
	}
	if(player.buffs[5]>1 && Math.random()*100<3+3*(player.buffs[5]-2)){
		addInventario(clone(Itens_Lista['ouro']))
		addXp(0.5,'Minerar')
	}
	
	this.img.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4n5U3GnIAt46sdKA9M5BIt9rPy1uvVW-6Cu1zZJSLQbIVsWSHbEbokweKag&s'
	this.funcao=()=>{}
}

function pegaPlanta(){
	for(var i=0;i<plantas.length;i++){
		if(plantas[i].obj==this){
			addInventario(clone(Itens_Lista[plantas[i].tipo]))
			addXp(0.5,'Praticar Agricultura')
		}
	}
}

function pegaItemDuro(){
	if(arma!='' && arma.nome.split(" ")[0]=='martelo'){
		if(addInventario(clone(this))!=null){
			destroy(this)
		}
	}
	else{
		alerta("Muito Duro para tirar com a mao","rgba(255,0,0")
	}
}
function pegaBau(){
	if(arma!='' && arma.nome.split(" ")[0]=='martelo'){
		if(addInventario(clone(this))!=null){
			for(var i=0;i<baus.length;i++){
				if(baus[i].obj=this){
					for(var j=0;j<baus[i].itens.length;j++){
						var temp=baus[i].itens[j]
						temp.x=this.x
						temp.y=this.y

						Mapa.splice(this.x+this.y*tamanhoX+1,0,temp)
						console.log(this.x+this.y*tamanhoX+1)
					}
				}
			}
			destroy(this)
		}
	}
	else{
		for(var i=0;i<baus.length;i++){
			if(baus[i].obj==this){
				if(Janelas[baus[i].index].style.display=="inline-block"){
					Janelas[baus[i].index].style.display="none"
				}
				else{Janelas[baus[i].index].style.display="inline-block"}
				break
			}
		}
	}
}
function construir(index){
	if(arma!='' && Construir_Lista[arma.nome]!=undefined){
		if(Construir_Lista[arma.nome][Mapa[index].nome]!=undefined){
			addXp(0.5,'Construir uma Estrutura')
			return clone(Itens_Lista[Construir_Lista[arma.nome][Mapa[index].nome]])
		}
	}
	return null
}




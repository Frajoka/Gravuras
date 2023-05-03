class Entity{
	constructor(nome,x,y,stats=[0,0,0,0],size=0.9,img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA1BMVEX/AAAZ4gk3AAAAJklEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAO8GQIAAAfnHrWYAAAAASUVORK5CYII="){
		this.x=x
		this.y=y
		this.nome=nome
		this.size=size
		this.img=new Image()
		this.img.src=img
		
		//Forca, Agilidade, Vitalidade, Intelecto
		
		this.stats=stats
		
		this.vida=1+stats[0]+stats[2]
		this.velocidade=(10+stats[1]+stats[2])/100
		
	}
}
class Item{
	constructor(nome,x,y,size=0.5,img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAdVBMVEX///8oHgtJNhWJZydoTh729vVINRImHApKOBeGZSYnGgDv7utLOBVkSx3s6+n29PItIQxVRC5RQCRAOS5XRiw6MiRTQSBdTTMxJxU4Lys8MyhRPhk/OCpSPRRMOBEqHwDf3tpgTzpqW0lHQjlOSUEjFgA4LhvxE+MlAAADGklEQVR4nO2b25ajIBBFo0YFMWLaW6K2sS/T//+JI1RhojOvFL2WnIe8sgVOXYCcTl5eXl5eXl5HkdyJfPx2Gha9T6XW4xFTA7wljLE8TAKQA4A81EoBIHMGEKQHB2DuAEJHMyBjJVmsm5AYQHSDVhuhqF0gauV/FiZRxBctANQzUOPUrzNADsAOD+B8CZIdAJULBKhYZiDPQ5Zz7QIe9Q3INoD8qFuljqP9MALe5gJkefyTuGr/s4mDDEBJVQqJK2y+fLf5qAGYB1gBqPeA3O8BNXi5+N86AJb9MwDki/9Bd1BlG6DoBu3/9owy/i8wMlkefwEA/+crQEC79kUHoX8FKD3A8QCS/wFk9gHQZXOHEfB8AYCxGrVsA4jPDsR15OG8VAEgzRqy/F8nWhN/hl6lxnrkMQDdrvhEgN4DHAgA/Y+bkD8CdRqW2Qcw/r9OCABFMK9AX7YBxGet1V1QcA5Y0tX/HfofA98F1/5GVnzi2odnD+AIoHANIPb5P8sg/9svf3X3v+T/JNc6axOq/A/+J8z/oFJHvrKizv+Jyf8lNCAVWeyvt7E/wuKzsv7pHuAXAkAZjPV/b3/7Y/6vp9f+n/OxV/bvv+3nf7D/9YL5F/P/SJj/Vdx7yf/gf/tT/wSA5GMAyDefB/htAGcy/6PL5g79f8H8j/X/t20A2f3T/+svX/wvSPwvBz31ydp6Ua+9bLe3Xx7gwADbTZjZB5A6/cuihfJ/dcHPTevLNoD4qK9au5PPalbXEguZ5fFV6aW+e229sPcjmHoDYNbezADePbkDCDyAI4B1E5L5H6/Z5nbC/h819kqNdf/HNYpj5xFA/9/MRPd/8aDf/yV5hKEPn16MVGsfDyb2883hMzlA7gHcAcAWYNEGILMPgPf/guEBhLkBucFzXOsAsn0DmdIrCFL1/ONeED1Ilu+Y/82Xp1rBner8Txr/R2sE1MnnSAC5awDXM/AebhsQ9D8dwKT8z543oOD/kuwGVGLLlaKaQtD+IUEBgPPht6GK/a8Ar/IABwR4OAd4ZC/680MNcIp3oh7fy8uLXH8BEvBVR2mPI2oAAAAASUVORK5CYII="){
		this.x=x
		this.y=y
		this.nome=nome
		this.size=size
		this.img=new Image()
		this.img.src=img
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
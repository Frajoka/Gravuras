var Mapa=[]

var tamanhoX=200
var tamanhoY=200
var noisePoints=[]
var noiseMap=[]
var noiseLen=20

for(var i=0;i<tamanhoY;i++){
	noiseMap.push([])
	for(var j=0;j<tamanhoX;j++){
		noiseMap[i].push(0)
	}
}
for(var i=0;i<20;i++){
	noisePoints.push({
		x:Math.round(Math.random()*(tamanhoX-5)+5),
		y:Math.round(Math.random()*(tamanhoY-5)+5)
	})
	for(var j=-1*noiseLen;j<=noiseLen;j++){
		for(var k=-1*noiseLen;k<=noiseLen;k++){
			var x,y,dis
			x=noisePoints[i].x + j
			y=noisePoints[i].y + k
			if(x>=0 && y>=0 && x<tamanhoX && y<tamanhoY){
				dis=Math.floor(Math.sqrt(Math.pow(noisePoints[i].x-x,2)+Math.pow(noisePoints[i].y-y,2)))
				noiseMap[y][x]=1-dis/noiseLen
			}
		}
	}
}
function createMap(){
	for(var i=0;i<tamanhoY;i++){
		for(var j=0;j<tamanhoX;j++){
			if(j<1 || i<1 ||
			j>=tamanhoX-1 || i>=tamanhoY-1){
				Mapa.push(new Block('Parede',j,i,1,true,null,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAB/CAMAAAAQJDo1AAAAP1BMVEV0dHR/f3+Pj49oaGhzc3N+fn6QkJB1dXWMjIx4eHjX19dtbW2CgoLU1NSHh4eysrJhYWGnp6e4uLjy8vLk5OSzv2AyAAAEzElEQVRoge2bjXacOAyFMcEYAkOn3X3/Z90ZrGvwlTUmOc3untS37fQE/PNhRrIsO91ft/ddt4reDVn3r7V3+7u7DfOupaIQi83blGm7i+T6JsWq7cVSw4/ufXa7QvdaPhbzU59pWt52Lbi+SrlKcyEWmxtAAzgBDN3QPf4OhhLAmEkBOC8AUu/oUzrY/x80gBeRmSn5ORf6AQCXf7A99DZ4Uth1MkNoGvtXGn0+MGlIp3Lx/k1GKO/F+VhzKQC87L/v/aDe5wuA3gToGkADMAGqVmAAFOt9wAp42j1Pq8PjD66Txwwb+YeVJGbv4BcAEHVyROLR3p5kA7zW4+N0Pf7NNff7k49TePqExz/vilplRKb8sgFwlnWd3v2EkXkN0DeAbwjQE0C5/48AhEwnAJn+5Lp0OGMEZrlRHgGfAPL7JwDY88oTtwggs8vtGvYOyw6G4FfwIwN48WTjaozhkACi4Pm4XPlN6VenAWSMLgOUy/tabNkAvj3AxS+hDss1QG6FTpkhHEsx3K5q5umYVzy97/IaiMMNu06XK8uKtKzflwvL/acFYEU+1XfbX9K4xfFsAA3gDJCH1f8mQLRIZYZkX2aPuZmaCxQomeFTTzO8LdKQ2LXH/E6ajf6RuICjcvmywNEyo5NiS3JEABANRkxnpXAUANXnVA08+rLCFROAFVT+dgDXAP6vAP/FlzC39xqAmtcBIGIAmq+7VC7FA1vuKKyISAAGKp5WOilyIbFjin6oP3lCKlEFGK+Vh+quuAE0gBzAXJweAJnqACNVUADrtK/M8YEGVXpdANYtF+5jvuV6VHyTrrZlDx+WGJA8NxnkI8mY/zve0SAPpzIpVDzEZ0u96ExpFcDAsgBIgXppAA2gDsC7U1WA17IB2F6DGKonoLmi8uNAnvpxKk2XPCIeCZ5PVkpWxLSyx7OUu+Tpl7k2PADihSrAp9QAGsAZgL6tX20FsvufAGhVvW6DxO9uiz8nP0Dht8T9M/uRjffvpF0QSKkDIJDLSi6ucBDhtD3n4QE5EDE84SwAEycqq0c4DJ9+AOSvxDjCcQKI4/d9ANSa8I8bgd8AIN9za/5nIzFfgWEFCUAcgAJAYA+HQBHR4MmgUR4jgGWB4QYc33cMAMEjUqZUrYhkxCgUG4LhETmP4GwA8ZQaIHfiWClRLGilamnL1jWABvAC4LNWIHG/ZQU0WUpv/pknjDVxCet/2LmZF4Bhox4m/GtaY6/Lz+52F0eCIeCAQ4bAu9ITqEioV5mNqHW/iY9+3GK39wPAypAeAEWpWNBI2VC5U4qmATQAZQVfA0Bu5GwFS74dz0KkZNzW+41GOQKS0wHHecI11HIgRemNSqMdlSmJI+U/HRNCGuBiPXnBDaAB/DBXxzVJQzPP/zjWh56M6sHx6rh2rD8d38v3D9g/BDoAGXhaRjt93L37ZeUJLaUdFWOoVYjGnpMiOzNH9GUAeXMNoAG8yBNaYgA2cAkv7vhZWUG+XDjSdHx+0DwJmD+xOm+Q7FyE1lEe5w6UI2LN1+IDBlAREgFg3LQrVgCX+v8sQGEuaAANgJTSdHyqlsMCBij7jRUARzwAAOQHjIAj/X7B1YMLRroezdHjFo5ysQCwfuzohvUbl3rntAE0gD8e4B+jRa8Uz+Z96QAAAABJRU5ErkJggg=='))
			}
			else{
				Mapa.push(new Block('Chao de Terra',j,i,1,false,pegaPedra,"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QAHxABAAIDAQADAQEAAAAAAAAAAAERITFBYVFxgaGR/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQIAAwUE/8QAHhEBAQADAQEAAwEAAAAAAAAAAAECESExEiIyQQP/2gAMAwEAAhEDEQA/AJxFv6HeHOPiaCo93LzuGw6Yoyyz9HOG8NF4h9U2Wx4IBCgUNxIyTWSxzBDrQxQRePQPPt/n/Wi+jRoYzrDT8T4UBVL9Jqxo2a+m5mU854mwaSX0bNvqX9LtUeeJfc7stm7VufibNDwcFLznbEtMW0rg14Fw/gXgvBHwZb1MmxEvitJ3qDGnSX6XOtw3w1Xn8LetLtvXFS7ROjx9jOCqbNw7wlOpRJtJua+SXSeb6rfC9fLeGiuBJlJ6MYqReR83o/DeKTLpLqWIZnSpw+HOpjV+/wBYbGMp4S4fX6O0mkyaBxRadi5H4pbljV4l90u4Tnxq5gE3uC81lETpOufkDop7jtbpTl4ICX6drGk+CJ0jZ03Xh3HhuQtRf9dbrx9SlgZpT6XpQ+k5UVvAaNF+r2EZcTZpyaD65eR+J8aNJuzdx8uyceNCHW7w5JbNunp0xm18lxNzc7az6Pqv+o827lXwP1bxuQCmfW/0fLHQZI5Zz6Zgxyv8NcEwW+U27CcrcRTMbXlNq0bzZqKpiCaPUn5oKoKkemYNrY/VPhQlcqs2VXqOsBDG6ErHC5lhoqOTDCmEJkEpTSYWFZjKACtCTKN7a3QPErUj9ztSjWFbmLeJrvDM/RLN9M6Yz1X45wsLdtRJT5NXB1t6G9IatO009+qyN6mzp6HHlNRtM96i36beyuGhQOrLMUdjOlC2J6i5bRa07whLguO20NJRU48/2zh0y7ajanwHijw5ZHKpEKpF0XqTbacy3ztvl//Z"))
			}
			if(j>=1 && i>=1 &&
			j<tamanhoX-1 && i<tamanhoY-1 && Math.random()<=noiseMap[i][j]){
				Mapa.push(new Block('Grama',j,i,1,false,pegaGraveto))
			}
			else if(j>=1 && i>=1 &&
				j<tamanhoX-1 && i<tamanhoY-1 && Math.random()+0.8<=noiseMap[i][j]){
				Mapa.push(new Block('Planta',j,i,1,false,pegaPlanta,'../Tall_Grass.png'))
				plantas.push(
					{obj:Mapa[Mapa.length-1],
					tipo:Math.random()<.5 ? 'trepadeira' : 'planta-folha'}
				)
			}
			else if(j>=1 && i>=1 &&
			j<tamanhoX-1 && i<tamanhoY-1 && Math.random()+0.5<=noiseMap[i][j]){
				var temp=clone(Itens_Lista['parede de madeira'])
				temp.x=j
				temp.y=i
				Mapa.push(temp)
			}
		}
	}
}
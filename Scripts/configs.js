var Configs={
	//Audio
	volume_master:1,
	volume_musica:0.1,
	//Display
	tamanho_das_janelas:0.6,
	velocidade_dos_textos:0.01,
	//controles
	//Movimentacao
	up1:'KeyW',
	right1:'KeyD',
	down1:'KeyS',
	left1:'KeyA',
	up2:'ArrowUp',
	right2:'ArrowRight',
	down2:'ArrowDown',
	left2:'ArrowLeft',
	//hotkeys
	inventario:'KeyI',
	trocar_maos:'KeyF',
	status:'KeyE',
	settings:'KeyT'
}
var audio=document.querySelectorAll(".audio")
var display=document.querySelectorAll(".display")
var movimentos=document.querySelectorAll(".movimentos")
var atalhos=document.querySelectorAll(".atalhos")

for(var i=0;i<audio.length;i++){
	audio[i].addEventListener('change',(e)=>{changeVolume(e)},false)
}
for(var i=0;i<display.length;i++){
	display[i].addEventListener('change',(e)=>{changeDisplay(e)},false)
}
for(var i=0;i<movimentos.length;i++){
	movimentos[i].addEventListener('click',(e)=>{changeKeys(e)},false)
}
for(var i=0;i<atalhos.length;i++){
	atalhos[i].addEventListener('change',(e)=>{changeHotKeys(e)},false)
}

function createSettings(){
	audio[0].value=Configs['volume_master']
	audio[1].value=Configs['volume_musica']

	display[0].value=Configs['tamanho_das_janelas']
	display[1].value=Configs['velocidade_dos_textos']

	movimentos[0].innerHTML=Configs['up1'].split('Key')[1]
	movimentos[1].innerHTML=Configs['up2'].split('Arrow')[1]
	movimentos[2].innerHTML=Configs['down1'].split('Key')[1]
	movimentos[3].innerHTML=Configs['down2'].split('Arrow')[1]
	movimentos[4].innerHTML=Configs['left1'].split('Key')[1]
	movimentos[5].innerHTML=Configs['left2'].split('Arrow')[1]
	movimentos[6].innerHTML=Configs['right1'].split('Key')[1]
	movimentos[7].innerHTML=Configs['right2'].split('Arrow')[1]

	atalhos[0].innerHTML=Configs['inventario'].split('Key')[1]
	atalhos[1].innerHTML=Configs['trocar_maos'].split('Key')[1]
	atalhos[2].innerHTML=Configs['status'].split('Key')[1]
	atalhos[3].innerHTML=Configs['settings'].split('Key')[1]
}
function changeVolume(e){
	for(var i=0;i<audio.length;i++){
		if(e.target==audio[i]){
			switch(i){
				case 0:
					Configs['volume_master']=audio[i].value
					break
				case 1:
					Configs['volume_musica']=audio[i].value
					break
			}
		}
	}
	document.querySelector('audio').volume=Configs['volume_musica']*Configs['volume_master']
}
function changeDisplay(e){
	for(var i=0;i<display.length;i++){
		if(e.target==display[i]){
			switch(i){
				case 0:
					Configs['tamanho_das_janelas']=display[i].value
					reload()
					break
				case 1:
					Configs['velocidade_dos_textos']=display[i].value
					break
			}
		}
	}
}
function changeKeys(e){
	for(var i=0;i<movimentos.length;i++){
		if(e.target==movimentos[i]){
			switch(i){
				case 0:
					keyInChange='up1'
					break
				case 1:
					keyInChange='up2'
					break
				case 2:
					keyInChange='down1'
					break
				case 3:
					keyInChange='down2'
					break
				case 4:
					keyInChange='left1'
					break
				case 5:
					keyInChange='left2'
					break
				case 6:
					keyInChange='right1'
					break
				case 7:
					keyInChange='right1'
					break
			}
			
			isChangingKeys=true
		}
	}
}
function changeHotKeys(e){}

var Configs={
	//Audio
	volume_master:1,
	volume_musica:1,
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
	status:'KeyE',
	settings:'KeyT'
}

var audio=document.querySelectorAll(".audio")
var display=document.querySelectorAll(".display")
var movimentos=document.querySelectorAll(".movimentos")
var atalhos=document.querySelectorAll(".atalhos")

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
atalhos[1].innerHTML=Configs['status'].split('Key')[1]
atalhos[2].innerHTML=Configs['settings'].split('Key')[1]
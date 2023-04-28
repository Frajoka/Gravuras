var configuracoes={
	volume:1,
	volume_musica:1,
	up1:'KeyW',
	up2:'ArrowUp',
	right1:'KeyD',
	right2:'ArrowRight',
	down1:'KeyS',
	down2:'ArrowDown',
	left1:'KeyA',
	left2:'ArrowLeft'
}

function fillSettings(){
	$settings.children[1].value=configuracoes['volume']
	$settings.children[4].value=configuracoes['volume_musica']
	
	$settings.children[7].innerHTML=configuracoes['up1'].split('Key')[1]
	$settings.children[8].innerHTML=configuracoes['up2'].split('Arrow')[1]
	$settings.children[11].innerHTML=configuracoes['right1'].split('Key')[1]
	$settings.children[12].innerHTML=configuracoes['right2'].split('Arrow')[1]
	$settings.children[15].innerHTML=configuracoes['down1'].split('Key')[1]
	$settings.children[16].innerHTML=configuracoes['down2'].split('Arrow')[1]
	$settings.children[19].innerHTML=configuracoes['left1'].split('Key')[1]
	$settings.children[20].innerHTML=configuracoes['left2'].split('Arrow')[1]
}

function changeVolume(){
	configuracoes['volume']=$settings.children[1].value
	configuracoes['volume_musica']=$settings.children[4].value
}
function changeKeys(){
	
}
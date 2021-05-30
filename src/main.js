import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
import GameOver from './scenes/GameOver'
import PreloadScene from './scenes/PreloadScene'

const config = {
	type: Phaser.WEBGL,
	width: 800,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			//debug: true
		}
	},
	fps: 60,
	roundPixels: true,
	pixelArt: true,
	scene: [PreloadScene,GameScene,GameOver]
}

// @ts-ignore
export default new Phaser.Game(config)

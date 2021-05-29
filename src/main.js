import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
import GameOver from './scenes/GameOver'

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
	scene: [GameScene,GameOver]
}

// @ts-ignore
export default new Phaser.Game(config)

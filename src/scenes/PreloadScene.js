import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
    constructor()
    {
        super('preload-scene')
    }

    preload()
    {   this.load.image('sky','assets/sky.png')
        this.load.image('pokemon','assets/pokemon2.png')
        this.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml")
    }
    create()
    {   
        
        this.add.sprite(400,200,'sky').setOrigin(0.5)
        this.add.sprite(400,200,'pokemon').setScale(1)
        const StartGame = this.add.bitmapText(220,300,"pixelFont","PRESS ENTER TO START GAME",38)
        this.add.existing(StartGame)
        this.tweens.add({targets: StartGame, tint:0xffffff, duration: 500, ease: Phaser.Math.Easing.Sine.InOut, loop: -1,delay:500 })
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        const credits = this.add.bitmapText(this.cameras.main.centerX-50,350,"pixelFont","CREDITS",38)
        // this.enter.on('keydown',()=>{console.log('down')})
    }


    update()
    {
        if(this.enter.isDown)
        {
            this.scene.start('game-scene')
        }   
    }

}
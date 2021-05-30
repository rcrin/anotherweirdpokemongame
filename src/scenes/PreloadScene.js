import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
    constructor()
    {
        super('preload-scene')
    }

    preload()
    {   
        this.load.audio('stage_select','assets/audio/stage_select.mp3')
        this.load.audio('stage_sfx','assets/audio/stage_sfx.wav')
        this.load.audio('fireball_sfx','assets/audio/fireball.mp3')
        this.load.image('sky','assets/sky.png')
        this.load.image('pokemon','assets/pokemon2.png')
        this.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml")
        this.load.audio('stage_bgm','assets/audio/wolf_stage.mp3')
        this.load.audio('fireball_sfx','assets/audio/fireball.mp3')
        this.load.audio('explosion_sfx','assets/audio/meteorimpact.wav')
        this.load.image('sky','assets/sky.png')
        this.load.image('mountain','assets/mountain.png')
        this.load.image('ground', 'assets/ground.png')
        this.load.image('trees', 'assets/trees.png')
        this.load.image('platform','assets/platform.png')
        this.load.image('star','assets/star.png')
        this.load.image('bomb','assets/bomb.png')
        this.load.image('trees','assets/trees.png')
        this.load.image('platform_sm','assets/small_platform.png')
        this.load.image('invi_wall','assets/inviwall.png')
        this.load.spritesheet('spearow','assets/spearow.png',{frameWidth:58, frameHeight:55})
        this.load.spritesheet('vileplume','assets/vileplume.png',{frameWidth:58, frameHeight:52})
        this.load.spritesheet('explosion','assets/explosion.png',{frameWidth:44, frameHeight:41})
        this.load.spritesheet('fireball','assets/fireball.png',{frameWidth: 57, frameHeight:26})
        this.load.spritesheet('weedle','assets/weedle.png',{frameWidth: 53, frameHeight:40})
        this.load.spritesheet('pika_attack','assets/pika_attack.png',{frameWidth: 41, frameHeight:41})
        this.load.spritesheet('rattata_idle','assets/rattata.png',{frameWidth: 41, frameHeight:41})
        this.load.spritesheet('rattata','assets/rattata.png',{frameWidth: 45, frameHeight:46})
        this.load.spritesheet('pika_turn','assets/pika_turn.png',{frameWidth: 37, frameHeight:38})
        this.load.spritesheet('dude','assets/pika_run.png',{frameWidth: 60, frameHeight:38})
        this.load.spritesheet('pika_jump','assets/pika_jump.png',{frameWidth: 45, frameHeight:45})
        this.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml")
    }
    create()
    {   
        this.stage_bgm = this.sound.add('stage_select',{ loop: true, volume : 0.1 })
        this.stage_bgm.play()
        this.stage_sfx = this.sound.add('stage_sfx',{ loop: false, volume : 0.1 })
        this.add.sprite(400,200,'sky').setOrigin(0.5)
        this.add.sprite(400,200,'pokemon').setScale(1)
        const StartGame = this.add.bitmapText(220,300,"pixelFont","PRESS ENTER TO START GAME",38).setDropShadow(2, 1, 0x000000 ,1);
        this.add.existing(StartGame)
        this.tweens.add({targets: StartGame, tint:0xffffff, duration: 500, ease: Phaser.Math.Easing.Sine.InOut, loop: -1,delay:500 })
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        const credits = this.add.bitmapText(this.cameras.main.centerX-50,350,"pixelFont","CREDITS",38).setDropShadow(2, 1, 0x000000 ,1)
        credits.setInteractive()
        credits.on('pointerdown',()=>{console.log('down')})
    }


    update()
    {
        if(this.enter.isDown)
        {
            this.stage_sfx.play()
            this.stage_bgm.stop()
            this.scene.start('game-scene')
           
        }   
    }

}
import Phaser from 'phaser'
import { WeaponPlugin } from 'phaser3-weapon-plugin'
import AnimationFactory from '../elements/AnimationFactory'
import Enemy from '../elements/Enemy'
const PLAT_SM_KEY ='platform_sm'
const GROUND_KEY = 'ground'
const PLAT_KEY = 'platform'
const PIKA_ATTACK_KEY = 'pika_attack'
const DUDE_KEY = 'dude'
const PIKA_TURN = 'pika_turn'
const PIKA_JUMP = 'pika_jump'
const FIREBALL = 'fireball'
const EXPLOSION = 'explosion'
const VILEPLUME = 'vileplume'
const SPEAROW = 'spearow'
const WEEDLE = 'weedle'
const RATTATA = 'rattata'
const STAR_KEY = 'star'
const INVI_WALL_KEY = 'invi_wall'
let direction = 'right'
let ground;
let enemies;
let weapon;
let fireball_sfx;
let explosion_sfx;
const PLAYER_SPEED = 200;



const createSpace = (scene, height, totalWidth, texture, scrollFactor ) => {
    const w = scene.textures.get(texture).getSourceImage().width
   

    const count = Math.ceil(totalWidth / w) * scrollFactor

    let l = 0
    for(let x = 0; x < count; x++)
    {
        const m = scene.add.image(l,height,texture).setOrigin(0,1).setScrollFactor(scrollFactor)
        l += m.width
    }
  

}

export default class GameScene extends Phaser.Scene{

    constructor()
    {
        super('game-scene')
    }

    gameOver()
    {
        console.log('dead')
        return
    }
    
    preload()
    {
        
    }

    create()
    {   
       this.sound.add('stage_bgm',{ loop: true, volume : 0.1 }).play()
       fireball_sfx = this.sound.add('fireball_sfx',{ loop: false, volume : 0.1 })
       explosion_sfx = this.sound.add('explosion_sfx',{ loop: false, volume : 0.1 })
       enemies = this.physics.add.staticGroup()
                   
        this.plugins.installScenePlugin('WeaponPlugin', WeaponPlugin, 'weapons', this);

        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = 7918
        this.score = 0
    
        //BACKGROUND
        this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0)
        createSpace(this,630,totalWidth,'mountain',0.25)
        createSpace(this,468,totalWidth,'trees',0.5)
            
      
        // console.log('Total Width '+totalWidth)
        // @ts-ignore
        weapon = this.add.weapon(40,FIREBALL)
        weapon.bulletKillType = 2
        weapon.bulletKillDistance = 300

       
   
        //ANIMATION CLASS
        new AnimationFactory(this)
    
       
        weapon.addBulletAnimation(FIREBALL)
        weapon.setBulletFrames(0, 80)
        weapon.bulletSpeed = 300;
        weapon.fireRate = 600;
        weapon.bulletGravity.y = -300
       
      
      
        
        //PLATFORMS
        const ground = this.createGround(totalWidth).setScrollFactor(0)
        const platforms = this.createPlaftforms()
       
        
            //CHARACTER/PLAYER
            this.player = this.createPlayer()
            this.player.setOrigin(0.5,0.5)
            this.time.addEvent({
                delay:2000,
                callback: this.DelayRender,
                callbackScope: this,
                loop:false
            })
        
        
    

       
       
      
        console.log('X is '+Number(this.player.x+700)+" Y is "+Number(this.player.y-120))
        enemies.add(this.createEnemy(0,800,330,'rattata',30,ground,platforms))
        enemies.add(this.createEnemy(1,this.player.x+1200,450,'weedle',30,ground,platforms))
        enemies.add(this.createEnemy(2,1598,180,'vileplume',38,ground,platforms))
        enemies.add(this.createEnemy(3,1300,180,'spearow',38,ground,platforms))
        enemies.add(this.createEnemy(4,1700,100,'spearow',38,ground,platforms))
        enemies.add(this.createEnemy(5,2000,200,'spearow',38,ground,platforms))
        
        
        





        //STARS
        // const stars = this.createStars()

        //COLLISION
        this.physics.world.setBoundsCollision(true, true, false, true)
        this.physics.add.collider(this.player,platforms)
        this.physics.add.collider(this.player, ground,this.AddTileCollision,null)
        // this.physics.add.collider(stars,platforms)
        // this.physics.add.collider(stars,ground)
       
        let x = enemies.getChildren()
        for(let m=0;m<x.length;m++)
        {
            if(x[m].type!='spearow')
            {
                this.physics.add.overlap(x[m],this.invi_wall,this.enemeyCollideInviWall,null)
            }
        }
     
       
        

      
        //CAMERA CONFIG
        this.cameras.main.setBounds(0, 0, 6749, height,true)
        this.cameras.main.startFollow(this.player)
        this.KeyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        
      

        //GET STARS
        // this.physics.add.overlap(this.player, stars, this.collectStar, null, this)
        this.physics.world.setBounds(0,0,6760,height)
        
        //SCORE
        this.scoreLabel = this.createScoreLabel(this.cameras.main.centerX - 40, 16, 0)
        this.scoreLabel.setScrollFactor(0)
        
        
        //CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys()
       

    }




    createPlaftforms()
    {
       const platforms = this.physics.add.group({immovable: true, allowGravity: false})

    
    
       this.invi_wall = this.physics.add.staticGroup()
       this.createInviwall(platforms,700,360,this.invi_wall,PLAT_KEY)
       this.createInviwall(platforms,870,220,this.invi_wall,PLAT_KEY)
       this.createInviwall(platforms,1250,360,this.invi_wall,PLAT_SM_KEY)
       this.createInviwall(platforms,1600,220,this.invi_wall,PLAT_SM_KEY)
       this.createInviwall(platforms,1900,100,this.invi_wall,PLAT_SM_KEY)
       this.createInviwall(platforms,2400,220,this.invi_wall,PLAT_KEY)
        
        return platforms
    }

    createInviwall(platforms,x,y,invi_wall,texture)
    {
        platforms.create(x, y, texture)
        if(texture==PLAT_KEY)
        {
            var first_x = x - 205
            var last_x = x + 205
            var final_y = y - 30
        }
        else
        {
            var first_x = x - 100
            var last_x = x + 100
            var final_y = y - 30
        }
       
        invi_wall.create(first_x,final_y,INVI_WALL_KEY)
        invi_wall.create(last_x,final_y,INVI_WALL_KEY)
        invi_wall.setVisible(false)
    }

    createGround(totalWidth)
    { 
        // @ts-ignore
        // body: Phaser.Physics.Arcade.Body;
        ground = this.add.tileSprite(0,476,1600,48,GROUND_KEY)
        this.physics.add.existing(ground,false)
        this.physics.world.enableBody(ground)
        // @ts-ignore
          ground.body.immovable = true;
        // @ts-ignore
        ground.body.setAllowGravity(false);
        // @ts-ignore
        ground.body.setSize(15836,23,true)
      
       
        return ground
    }


    createPlayer()
	{

        const player = this.physics.add.sprite(100, 450, DUDE_KEY)
		player.setCollideWorldBounds(true)
        player.body.maxVelocity.y = 300

        //MOVE RIGHT
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 4 }), frameRate: 10, repeat: -1 })
        //MOVE LEFT
		this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 9 }), frameRate: 10, repeat: -1 })
		//IDLE RIGHT
		this.anims.create({ key: 'turn_right', frames: [ { key: PIKA_TURN, frame: 1 } ], frameRate: 20})
        //IDLE LEFT
        this.anims.create({ key: 'turn_left', frames: [ { key: PIKA_TURN, frame: 0 } ], frameRate: 20 })
        //JUMP RIGHT
        this.anims.create({ key: 'up_right', frames: this.anims.generateFrameNumbers(PIKA_JUMP, { start: 0, end: 3 }), frameRate: 35 })
        //JUMP LEFT
        this.anims.create({ key: 'up_left', frames: this.anims.generateFrameNumbers(PIKA_JUMP, { start: 4, end: 7 }), frameRate: 35 })

        this.anims.create({ key: 'player_attack_right', frames: this.anims.generateFrameNumbers(PIKA_ATTACK_KEY, { start: 0, end: 1 }), frameRate: 25 })
        this.anims.create({ key: 'player_attack_left', frames: this.anims.generateFrameNumbers(PIKA_ATTACK_KEY, { start: 2, end: 3 }), frameRate: 25 })
        return player
	}

    createEnemy(index, x,y,texture,height,ground,platform)
    {
       
        let enemy = new Enemy({scene:this, x: x, y: y, texture: texture})
        enemy.setName(index.toString())
        enemy.type = texture;
        enemy.setTexture(texture)
        enemy.setOrigin(0.5,0.5)
        enemy.setEnemyStatus(true)

        switch(texture)
        {
            case RATTATA: 
            {
                enemy.setEnemyHitPoints(1)
                enemy.setEnemySpeed(80)
                enemy.setEnemyMovement(-enemy.getEnemySpeed())
                enemy.anims.play(RATTATA+'_left')
                enemy.setCollideWorldBounds(true)
                enemy.setEnemyHabitat('land')
                this.physics.add.collider(enemy,ground)
                this.physics.add.collider(enemy,platform)
                break;
            }
            case SPEAROW:
            {
                enemy.setEnemyHitPoints(1)
                enemy.setEnemySpeed(150)
                enemy.setGravityY(0)
                enemy.setEnemyHabitat('air')
                enemy.anims.play(SPEAROW+'_left')
                break;
            }
            case WEEDLE:
            {
                enemy.setEnemyHitPoints(1)
                enemy.setEnemySpeed(40)
                enemy.anims.play(WEEDLE+'_left')
                enemy.setEnemyHabitat('land')
                enemy.setEnemyMovement(-enemy.getEnemySpeed())
                enemy.setCollideWorldBounds(true)
                this.physics.add.collider(enemy,ground)
                this.physics.add.collider(enemy,platform)
                break;
            }
            case VILEPLUME:
            {
                enemy.setEnemyHitPoints(2)
                enemy.setEnemySpeed(70)
                enemy.anims.play(VILEPLUME+'_left')
                enemy.setEnemyHabitat('land')
                enemy.setEnemyMovement(-enemy.getEnemySpeed())
                enemy.setCollideWorldBounds(true)
                this.physics.add.collider(enemy,ground)
                this.physics.add.collider(enemy,platform)
                break;
            }
        }

        
      
        enemy.getEnemyBody().setSize(enemy.width,height,true)
        this.physics.add.overlap(this.player,enemy,this.enemyHitPlayer,null, this)
        this.physics.add.overlap(weapon.bullets,enemy,this.bulletHitEnemies,null, this)
        enemy.setDepth(0)
       
        return enemy

    }

    update()
	{
      
      
        const cam = this.cameras.main
        const camera_speed = 200
        ground.tilePositionX = cam.scrollX * 1.5

        //touching down
        if(this.player.body.touching.down)
        {
            if(this.cursors.left.isDown)
		    {
                cam.scrollX -= camera_speed
                this.player.setVelocityX(-PLAYER_SPEED)
                this.player.anims.play('left', true)
                this.player.body.setSize(this.player.width,29,true)
                direction = 'left';
              
            }
            else if(this.cursors.right.isDown)
            {
                cam.scrollX += camera_speed
                this.player.setVelocityX(PLAYER_SPEED)
                this.player.anims.play('right', true)
                this.player.body.setSize(this.player.width,29,true)
                direction = 'right';  
              
            }
            else if(this.cursors.down.isDown)
            {
                this.player.body.checkCollision.down = false
                console.log('Down is currently held from ground')
            }
            else
            {
               
                this.player.setVelocityX(0)
                if(this.KeyZ.isDown)
                {
                    console.log('X - '+this.player.x+' Y - '+this.player.y)
                    weapon.fireAngle = direction=='right'? 0 : -180 
                    weapon.bullets.setDepth(20)  
                    weapon.trackSprite(this.player,direction=='right'?40:-40,0, false);
                    weapon.on('fire',()=>
                    {
                        this.player.anims.play( direction=='right' ? 'player_attack_right' : 'player_attack_left', true) 
                        fireball_sfx.play()

                    },weapon)
                    weapon.fire() 
                   
                }
                else
                {
                    this.player.anims.play(direction=='right'?'turn_right':'turn_left',true)
                }
                this.player.body.setSize(this.player.width,29,true)
            }

            if(this.cursors.up.isDown)
            {
                this.player.setVelocityY(-300)
                this.player.body.setSize(this.player.width,29,true)
                this.player.body.checkCollision.up = false
            }

          


        }
        else
        {
            if (this.cursors.left.isDown)
		    {
                cam.scrollX -= camera_speed
                this.player.setVelocityX(-PLAYER_SPEED)
                this.player.anims.play('up_left', true)
                this.player.body.setSize(this.player.width,29,true)
                direction = 'left';
            }
            else if(this.cursors.right.isDown)
            {
                cam.scrollX += camera_speed
                this.player.setVelocityX(PLAYER_SPEED)
                this.player.anims.play('up_right', true)
                this.player.body.setSize(this.player.width,29,true)
                direction = 'right';  
            }
            else if(this.cursors.up.isDown)
            {
                this.player.setVelocityX(0)
                this.player.anims.play(direction=='right'? 'up_right':'up_left', true)
                this.player.body.setSize(this.player.width,29,true)
            }
            else
            {
                this.player.setVelocityX(0)
                this.player.anims.play(direction=='right' ? 'up_right':'up_left', true)
                this.player.body.setSize(this.player.width,29,true)
                console.log('going-down')
            }

            if(this.cursors.down.isDown==false)
            {
                this.player.body.checkCollision.down = true
            }
           

          
            



        }
        
        //ENEMY
        let enemy = enemies.getChildren()
        let enemy_size = enemy.length;
        for(let ctr = 0; ctr < enemy_size; ctr++)
        {
            if(enemy[ctr].habitat=='air')
            {
                enemy[ctr].setGravityY(-300)
                if(enemy[ctr].x - this.player.x <= 400)
                {
                    this.physics.moveToObject(enemy[ctr], this.player, enemy[ctr].speed)
                }
               
                if(enemy[ctr].direction >= enemy[ctr].body.x)
                {
                    enemy[ctr].anims.play(enemy[ctr].texture.key+'_left', true)
                }
                else
                {
                    enemy[ctr].anims.play(enemy[ctr].texture.key+'_right', true)
                }
                enemy[ctr].direction = enemy[ctr].body.x;
            }
            
        }
        
      
        
     

        cam.setRoundPixels(true)
	}

   

    createStars()
	{
		const stars = this.physics.add.group({
			key: STAR_KEY,
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
            
		})
		
		stars.children.iterate((param) => {
           
            const child = ( /** @type {Phaser.Physics.Arcade.Sprite} */(param))
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})

		return stars
	}

    // @ts-ignore
    collectStar(player, star)
	{
		star.disableBody(true, true)
        this.score += 10
        this.scoreLabel.text = "SCORE: " + this.score
	}

    // @ts-ignore
    createScoreLabel(x, y, score)
	{
        const label = this.add.bitmapText(x,y,"pixelFont","SCORE: "+this.score,32).setDropShadow(2,1,0x00,1)
		this.add.existing(label)
		return label
	}
    
    DelayRender()
    {
        this.player.body.setSize(this.player.width,29,true)
    }

    setScore(value)
    {
        this.score += value
        this.scoreLabel.text = "SCORE: " + this.score
    }
   
    enemyHitPlayer(player,enemy)
    {
        player.body.checkCollision.down = true
        if(enemy.getEnemyStatus())
        {
            enemy.setVelocityX(0)
            enemy.setVelocityY(0)
            console.log('player dies')
            this.player.setX(100)
            this.player.setY(350)
            console.log('back to start')
            enemy.destroy();
        }   
        
    }

    AddTileCollision(player)
    {
        player.body.checkCollision.down=true
    }

       
    bulletHitEnemies(bullet,enemy)
    {
        enemy.setEnemyHitPoints(enemy.getEnemyHitPoints() - 1)
        if(enemy.getEnemyHitPoints() == 0)
        {
            enemy.setVelocityX(0)
            enemy.setVelocityY(0)
            enemy.body.setAllowGravity(false)
            enemies.remove(enemy)
            enemy.setEnemyStatus(false)
            if(enemy.anims.getName()!==EXPLOSION)
            {
                enemy.body.enable = false;
                enemy.once('animationcomplete',()=> {enemy.destroy()},enemy)
                enemy.anims.play(EXPLOSION,true).once('destroy',()=>{this.setScore(50)})
                bullet.kill()
                explosion_sfx.play()
            }
        }
        else
        {   
            this.tweens.add({targets: enemy, tint:0xffffff, duration:70, ease: Phaser.Math.Easing.Sine.InOut })
            bullet.kill()
        }
        enemy.clearTint()
    }

    enemeyCollideInviWall(enemy,wall)
    {
        if(enemy.habitat!='air')
        {
            if(enemy.body.touching.left || enemy.body.blocked.left)
            {
                enemy.body.setVelocityX(+enemy.speed)
                enemy.anims.play(enemy.texture.key+'_right', true)
            }
            else if(enemy.body.touching.right || enemy.body.blocked.right)
            {
                enemy.body.setVelocityX(-enemy.speed)
                enemy.anims.play(enemy.texture.key+'_left', true)
            }
        }
    }

 

}
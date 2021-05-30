export default class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene,config.x, config.y, config.texture)
        config.scene.physics.world.enableBody(this)
        config.scene.add.existing(this)
        this.name  = null
        this.speed = 0;
        this.alive = true
        this.hitpoints = 0
        this.direction = null
        this.type = config.texture
        this.texture = config.texture
        this.hitpoints = 0
        this.config = config
        this.habitat = null
    }

    setEnemyHabitat(habitat)
    {
        this.habitat = habitat
    }
    
    getHabitat()
    {
        return this.habitat
    }
    
    setDirection(direction)
    {
        this.direction = direction
    }

    getEnemyDirection()
    {
        this.direction
    }

    setEnemyHitPoints(hitpoints)
    {
        this.hitpoints = hitpoints
    }

    getEnemyHitPoints()
    {
        return this.hitpoints
    }

    setEnemyStatus(status)
    {
        this.alive = status
    }
    
    getEnemyStatus()
    {
        return this.alive
    }

    getEnemyName()
    {
        return this.name
    }

    setEnemyName(name)
    {
        this.name = name
    }
    
    getEnemyBody()
    {
        return this.body
    }
    setEnemySpeed(speed)
    {
        this.speed = speed
    }
    
    getTexture()
    {
        return this.texture
    }

    getEnemySpeed()
    {
        return this.speed
    }


    setEnemyMovement(speed)
    {
        this.body.velocity.x=speed
    }
    
    

    
}
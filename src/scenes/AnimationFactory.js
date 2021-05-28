export default class AnimationFactory
{
   
    constructor(gamescene)
    {
      
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

        //FIREBALL
        gamescene.anims.create({ key: FIREBALL,frames: gamescene.anims.generateFrameNumbers(FIREBALL, { start: 0, end: 13 }),frameRate: 30,repeat: -1});

        //ENEMY DEATH EXPLOSION
        gamescene.anims.create({ key:  EXPLOSION, frames: gamescene.anims.generateFrameNumbers(EXPLOSION, { start: 0, end: 5 }), frameRate: 7, repeat: 0})

        //SPEAROW
        gamescene.anims.create({ key: SPEAROW+'_right', frames: gamescene.anims.generateFrameNumbers(SPEAROW, { start: 0, end: 5 }), frameRate: 12, repeat: -1 })
        gamescene.anims.create({ key:  SPEAROW+'_left', frames: gamescene.anims.generateFrameNumbers(SPEAROW, { start: 6, end: 11 }), frameRate: 12, repeat: -1 })

        //WEEDLE
        gamescene.anims.create({ key: WEEDLE+'_right', frames: gamescene.anims.generateFrameNumbers(WEEDLE, { start: 0, end: 6 }), frameRate: 4, repeat: -1 })
        gamescene.anims.create({ key:  WEEDLE+'_left', frames: gamescene.anims.generateFrameNumbers(WEEDLE, { start: 7, end: 13 }), frameRate: 4, repeat: -1 })

        //VILEPLUME
        gamescene.anims.create({ key: VILEPLUME+'_right', frames:  gamescene.anims.generateFrameNumbers(VILEPLUME, { start: 0, end: 7 }), frameRate: 7, repeat: -1})
        gamescene.anims.create({ key:  VILEPLUME+'_left', frames:  gamescene.anims.generateFrameNumbers(VILEPLUME, { start: 8, end: 15 }), frameRate: 7, repeat: -1})

        //RATTATA
        gamescene.anims.create({ key: 'idle', frames: gamescene.anims.generateFrameNumbers(RATTATA, { start: 0, end: 8 }), frameRate: 10, repeat: -1})
        gamescene.anims.create({ key: RATTATA+'_right', frames: gamescene.anims.generateFrameNumbers(RATTATA, { start: 0, end: 8 }), frameRate: 12, repeat: -1 })
        gamescene.anims.create({ key: RATTATA+'_left', frames: gamescene.anims.generateFrameNumbers(RATTATA, { start: 9, end: 17 }), frameRate: 12, repeat: -1 })

    }
}

import Phaser from 'phaser'
import { SYMBOLS } from '@/phaser/symbols'
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' })
  }

  preload() {
    this.load.image('Bg', '/slot-machine/Bg.png')
    this.load.image('Dirt', '/slot-machine/Dirt.png')
    this.load.image('Glare', '/slot-machine/Glare.png')
    this.load.image('Numbers', '/slot-machine/Numbers.png')
    this.load.image('Rewards', '/slot-machine/Rewards.png')
    this.load.image('Sections', '/slot-machine/Sections.png')
    this.load.image('Shadow', '/slot-machine/Shadow.png')
    this.load.image('ActionsBg', '/slot-machine/ActionsBg.png')
    this.load.image('SpinBtn', '/slot-machine/SpinBtn.png')
    this.load.image('HelpBtn', '/slot-machine/HelpBtn.png')
    this.load.plugin('rexKawaseBlurPipeline', KawaseBlurPipelinePlugin)

    for (const symbol of SYMBOLS) {
      this.load.image(symbol.name, symbol.image)
    }
  }

  create() {
    this.scene.start('Game')
  }
}

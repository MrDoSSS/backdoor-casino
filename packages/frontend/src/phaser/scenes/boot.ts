import Phaser from 'phaser'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    this.load.image('Logo', '/logo.png')
    this.game.scale.updateScale()
  }

  create() {
    this.scene.start('Preload')
  }
}

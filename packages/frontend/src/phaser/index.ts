import Phaser from 'phaser'
import { GameScene } from './scenes/game'
import { PreloadScene } from './scenes/preload'

export const initPhaserApp = (parent: HTMLElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scene: [PreloadScene, GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
      parent,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 2540,
      height: 1429 + 865 + 30,
    },
  }
  const game = new Phaser.Game(config)

  return game
}

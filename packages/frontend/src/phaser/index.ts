import Phaser from 'phaser'
import { BootScene } from './scenes/boot'
import { GameScene } from './scenes/game'
import { PreloadScene } from './scenes/preload'
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin'
import AwaitLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitloader-plugin.js'

export const initPhaserApp = (parent: HTMLElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scene: [BootScene, PreloadScene, GameScene],
    backgroundColor: '#070707',
    scale: {
      mode: Phaser.Scale.FIT,
      parent,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 2540,
      height: 1429 + 613 + 30,
    },
    plugins: {
      global: [
        {
          key: 'rexKawaseBlurPipeline',
          plugin: KawaseBlurPipelinePlugin,
          start: true,
        },
        {
          key: 'rexAwaitLoader',
          plugin: AwaitLoaderPlugin,
          start: true,
        },
      ],
    },
  }
  const game = new Phaser.Game(config)
  return game
}

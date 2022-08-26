import Phaser from 'phaser'
import { SYMBOLS } from '@/phaser/symbols'
import { useUserStore } from '@/store/user'
import { useWalletStore } from '@/store/wallet'

export class PreloadScene extends Phaser.Scene {
  private progressBar?: Phaser.GameObjects.Graphics
  private progressBox?: Phaser.GameObjects.Graphics
  private loadingText?: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'Preload' })
  }

  async preload() {
    ;(this.load as any).rexAwait(async (resolve: () => void) => {
      const walletStore = useWalletStore()
      const userStore = useUserStore()

      await userStore.get(walletStore.currentAccount).catch(() => null)
      resolve()
    })

    this.load.image('Logo', '/logo.png')
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

    for (const symbol of SYMBOLS) {
      this.load.image(symbol.name, symbol.image)
    }

    this.add.image(this.cameras.main.width / 2, 400, 'Logo').setScale(2)
    this.progressBox = this.add.graphics()
    this.progressBar = this.add.graphics()
    this.progressBox.fillStyle(0xffffff, 1)
    this.progressBox.fillRoundedRect(
      this.cameras.main.width / 2 - 670,
      850,
      1440,
      50,
      25
    )
    this.loadingText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 750,
      text: '0%',
      style: {
        color: '#ffffff',
        fontFamily: 'Teko',
        fontSize: '8rem',
      },
    })
    this.loadingText.setOrigin(0.5, 0.5)
    this.load.on('progress', (value: number) => {
      this.progressBar!.clear()
      this.progressBar!.fillStyle(0x000000, 1)
      this.progressBar!.fillRoundedRect(
        this.cameras.main.width / 2 - 660,
        855,
        1420 * value,
        40,
        20
      )
      this.loadingText!.setText(
        `Loading Triple Oni... ${Math.round(value * 100)}%`
      )
    })

    this.game.scale.updateScale()
  }

  create() {
    this.scene.start('Game')
  }
}

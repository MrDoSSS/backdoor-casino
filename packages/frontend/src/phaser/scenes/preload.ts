import Phaser from 'phaser'
import { SYMBOLS } from '@/phaser/symbols'
import { useUserStore } from '@/store/user'
import { useWalletStore } from '@/store/wallet'

import Bg from '@/assets/slot-machine/Bg.png'
import Dirt from '@/assets/slot-machine/Dirt.png'
import Glare from '@/assets/slot-machine/Glare.png'
import Numbers from '@/assets/slot-machine/Numbers.png'
import Rewards from '@/assets/slot-machine/Rewards.png'
import Sections from '@/assets/slot-machine/Sections.png'
import Shadow from '@/assets/slot-machine/Shadow.png'
import ActionsBg from '@/assets/slot-machine/ActionsBg.png'
import SpinBtn from '@/assets/slot-machine/SpinBtn.png'
import HelpBtn from '@/assets/slot-machine/HelpBtn.png'

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
    this.load.image('Bg', Bg)
    this.load.image('Dirt', Dirt)
    this.load.image('Glare', Glare)
    this.load.image('Numbers', Numbers)
    this.load.image('Rewards', Rewards)
    this.load.image('Sections', Sections)
    this.load.image('Shadow', Shadow)
    this.load.image('ActionsBg', ActionsBg)
    this.load.image('SpinBtn', SpinBtn)
    this.load.image('HelpBtn', HelpBtn)

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

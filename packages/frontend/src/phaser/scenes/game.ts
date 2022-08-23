import Phaser from 'phaser'
import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'
import { SYMBOLS } from '@/phaser/symbols'
import { useUserStore } from '@/store/user'
import { useWalletStore } from '@/store/wallet'
import { web3 } from '@/web3'
import { slotMachineService } from '@/services/slot-machine'
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin'

export class GameScene extends Phaser.Scene {
  containers: Phaser.GameObjects.Container[] = []
  lock = false
  walletStore: ReturnType<typeof useWalletStore>
  userStore: ReturnType<typeof useUserStore>

  declare ethBalanceText: Phaser.GameObjects.Text
  declare playingChipsText: Phaser.GameObjects.Text
  declare prizeTicketsText: Phaser.GameObjects.Text
  declare messageText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'Game' })
    this.walletStore = useWalletStore()
    this.userStore = useUserStore()
  }

  preload() {}

  get ethBalance() {
    return web3.utils.fromWei(this.userStore.user!.eth, 'ether')
  }

  get centerX() {
    return 242
  }

  get blurPipeline() {
    return this.plugins.get('rexKawaseBlurPipeline') as KawaseBlurPipelinePlugin
  }

  create() {
    this.add.image(413, 524, 'Sections').setOrigin(0, 0)
    this.add.image(930, 624, 'Glare').setOrigin(0, 0)

    this.addSection(428, 530)
    this.addSection(1028, 530)
    this.addSection(1635, 530)

    this.add.image(0, 0, 'Bg').setOrigin(0, 0)
    this.add.image(401, 510, 'Shadow').setOrigin(0, 0)
    this.add.image(436, 474, 'Dirt').setOrigin(0, 0)
    this.add.image(353, 533, 'Numbers').setOrigin(0, 0)
    this.add.image(332, 51, 'Rewards').setOrigin(0, 0)
    this.add.rectangle(0, 1429, 2540, 895, 0x070707).setOrigin(0, 0)

    const actionsBg = this.add.image(0, 1429, 'ActionsBg').setOrigin(0, 0)
    const spinBtn = this.add
      .sprite(0, 0, 'SpinBtn')
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.play())

    spinBtn.setX(actionsBg.width / 2 - spinBtn.width / 2)
    spinBtn.setY(actionsBg.height / 2 - spinBtn.height / 2 + actionsBg.y)

    const helpBtn = this.add
      .sprite(0, 0, 'HelpBtn')
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })

    helpBtn.setX(actionsBg.width / 2 - helpBtn.width / 2)
    helpBtn.setY(actionsBg.height - helpBtn.height / 1.4 + actionsBg.y)

    this.ethBalanceText = this.add.text(400, 1710, this.ethBalance, {
      fontFamily: 'Teko',
      fontSize: '6rem',
      fontStyle: 'bold',
      color: '#000',
      align: 'center',
      fixedWidth: 300,
    })

    this.playingChipsText = this.add.text(
      1800,
      1970,
      this.userStore.user!.playingChips.toString(),
      {
        fontFamily: 'Teko',
        fontSize: '6rem',
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
        fixedWidth: 300,
      }
    )

    this.prizeTicketsText = this.add.text(
      400,
      1970,
      this.userStore.user!.prizeTickets.toString(),
      {
        fontFamily: 'Teko',
        fontSize: '6rem',
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
        fixedWidth: 300,
      }
    )

    this.game.scale.updateScale()
  }

  addSection(x: number, y: number) {
    const container = this.add.container(x, y)
    const images: Phaser.GameObjects.Image[] = []

    shuffle(SYMBOLS).forEach((symbol, i) => {
      const img = this.add.image(0, 0, symbol.name).setOrigin(0).setScale(0.42)
      img.setX(this.centerX - img.displayWidth / 2)
      images.push(img)

      if (images[i - 1]) {
        img.setY(images[i - 1].y + images[i - 1].displayHeight + 40)
      } else {
      }

      img.setVisible([0, 1, 2].includes(i))

      container.add(img)
    })

    this.containers.push(container)
  }

  shuffleSymbols(container: Phaser.GameObjects.Container) {
    const symbols = container.getAll() as Phaser.GameObjects.Image[]

    shuffle(SYMBOLS).forEach(({ name }, i) => {
      symbols[i].setTexture(name)
      symbols[i].setX(this.centerX - symbols[i].displayWidth / 2)
    })
  }

  async play() {
    if (this.lock) return

    this.lock = true

    if (this.userStore.user!.playingChips <= 0) return

    try {
      this.playingChipsText.setText(
        (this.userStore.user!.playingChips - 1).toString()
      )

      this.containers.forEach((container, i) => {
        const symbols = container.getAll() as Phaser.GameObjects.Image[]
        this.blurPipeline.add(container, { blur: 5 })

        this.add.tween({
          targets: container,
          duration: 200,
          props: { y: { value: '+=' + 1000 } },
          repeat: 5 + i * 3,
          onStart: () => {
            container.setY(container.y - 1000)
            this.shuffleSymbols(container)
            symbols.forEach((img) => img.setVisible(true))
          },
          onComplete: () => {
            symbols.forEach((img, i) => img.setVisible([0, 1, 2].includes(i)))
            this.blurPipeline.remove(container)

            if (this.containers.length - 1 !== i) return

            this.lock = false

            this.prizeTicketsText.setText(
              this.userStore.user!.prizeTickets.toString()
            )

            this.ethBalanceText.setText(this.ethBalance)
          },
          onRepeat: () => {
            this.shuffleSymbols(container)
          },
        })
      })

      const data = await slotMachineService.create({})

      if (data.win) {
        const combinations = chunk(data.payline.combination, 3)
        const symbol = SYMBOLS.find((s) => s.id === data.symbol.id)!

        this.containers.forEach((container, i) => {
          const symbols = container.getAll() as Phaser.GameObjects.Image[]

          combinations[i].forEach((value, i) => {
            if (!value) return

            symbols[i].setTexture(symbol.name)
            symbols[i].setX(this.centerX - symbols[i].displayWidth / 2)
          })
        })
      } else {
        this.containers.forEach(this.shuffleSymbols.bind(this))
      }

      await this.userStore.get(this.walletStore.currentAccount)
    } catch (e) {
    } finally {
    }
  }
}

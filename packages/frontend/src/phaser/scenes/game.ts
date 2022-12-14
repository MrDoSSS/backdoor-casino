import Phaser from 'phaser'
import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'
import random from 'lodash/random'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import xor from 'lodash/xor'
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
  lines: Phaser.Geom.Line[] = []

  paylines: {
    left: Phaser.Geom.Circle[][]
    right: Phaser.Geom.Circle[][]
  } = {
    left: Array(13),
    right: Array(13),
  }

  declare ethBalanceText: Phaser.GameObjects.Text
  declare playingChipsText: Phaser.GameObjects.Text
  declare prizeTicketsText: Phaser.GameObjects.Text
  declare messageText: Phaser.GameObjects.Text
  declare numberGraphic: Phaser.GameObjects.Graphics
  declare lineGraphic: Phaser.GameObjects.Graphics

  constructor() {
    super({ key: 'Game' })
    this.walletStore = useWalletStore()
    this.userStore = useUserStore()
  }

  get ethBalance() {
    return web3.utils.fromWei(this.userStore.user!.eth, 'ether')
  }

  get centerX() {
    return 242
  }

  get blurPipeline() {
    if (this.isMobile) return

    return this.plugins.get('rexKawaseBlurPipeline') as KawaseBlurPipelinePlugin
  }

  get isMobile() {
    return window.matchMedia('only screen and (max-width: 959px)').matches
  }

  drawNumbers() {
    this.numberGraphic = this.add.graphics({
      fillStyle: {
        color: 0xd8b341,
      },
      lineStyle: {
        width: 5,
        color: 0x000000,
      },
    })
    const example = new Phaser.Geom.Circle(0, 0, 20)

    const leftX = 378
    const rightX = 2164

    for (let i = 0; i < 13; i++) {
      const left = (this.paylines.left[i] = [Phaser.Geom.Circle.Clone(example)])
      const right = (this.paylines.right[i] = [
        Phaser.Geom.Circle.Clone(example),
      ])

      switch (i) {
        case 0:
          left[0].setPosition(leftX, 877)
          right[0].setPosition(rightX, 877)
          break
        case 1:
          left[0].setPosition(leftX, 555)
          right[0].setPosition(rightX, 555)
          break
        case 2:
          left[0].setPosition(leftX, 1200)
          right[0].setPosition(rightX, 1200)
          break
        case 3:
          left[0].setPosition(leftX, 1158)
          right[0].setPosition(rightX, 598)
          break
        case 4:
          left[0].setPosition(leftX, 598)
          right[0].setPosition(rightX, 1158)
          break
        case 5:
          left[0].setPosition(leftX, 640)
          right[0].setPosition(rightX, 640)
          break
        case 6:
          left[0].setPosition(leftX, 920)
          right[0].setPosition(rightX, 920)
          break
        case 7:
          left[0].setPosition(leftX, 835)
          right[0].setPosition(rightX, 835)
          break
        case 8:
          left[0].setPosition(leftX, 1118)
          right[0].setPosition(rightX, 1118)
          break
        case 9:
          left[0].setPosition(leftX, 960)
          right[0].setPosition(rightX, 960)
          break
        case 10:
          left[0].setPosition(leftX, 1075)
          left[1] = Phaser.Geom.Circle.Clone(example).setPosition(leftX, 680)
          right[0].setPosition(rightX, 792)
          break
        case 11:
          left[0].setPosition(leftX, 793)
          right[0].setPosition(rightX, 682)
          right[1] = Phaser.Geom.Circle.Clone(example).setPosition(rightX, 1075)
          break
        case 12:
          left[0].setPosition(leftX, 720)
          left[1] = Phaser.Geom.Circle.Clone(example).setPosition(leftX, 1005)
          left[2] = Phaser.Geom.Circle.Clone(example).setPosition(leftX, 1245)
          right[0].setPosition(rightX, 725)
          right[1] = Phaser.Geom.Circle.Clone(example).setPosition(rightX, 1005)
          right[2] = Phaser.Geom.Circle.Clone(example).setPosition(rightX, 1245)
          break
      }

      left.concat(right).forEach((c) => {
        this.add.text(c.x - 20, c.y - 15, (i + 1).toString(), {
          fontFamily: 'Teko',
          color: '#000',
          fontSize: '3rem',
          fontStyle: 'bold',
          fixedHeight: 40,
          fixedWidth: 40,
          align: 'center',
        })
        this.numberGraphic.fillCircleShape(c)
        this.numberGraphic.strokeCircleShape(c)
      })
    }
  }

  drawActions() {
    const actionsBg = this.add.image(380, 1429, 'ActionsBg').setOrigin(0, 0)
    const spinBtn = this.add
      .sprite(0, 0, 'SpinBtn')
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })

    Phaser.Display.Align.In.Center(spinBtn, actionsBg)

    spinBtn.on('pointerdown', () => {
      spinBtn.setScale(0.95)
      Phaser.Display.Align.In.Center(spinBtn, actionsBg, 10, 10)
    })

    spinBtn.on('pointerup', () => {
      spinBtn.setScale(1)
      Phaser.Display.Align.In.Center(spinBtn, actionsBg)
      this.play()
    })

    const helpBtn = this.add
      .sprite(0, 0, 'HelpBtn')
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })

    helpBtn.setX(actionsBg.width / 2 - helpBtn.width / 2 + actionsBg.x)
    helpBtn.setY(actionsBg.height - helpBtn.height / 1.4 + actionsBg.y)
  }

  drawText() {
    this.ethBalanceText = this.add.text(630, 1620, this.ethBalance, {
      fontFamily: 'Teko',
      fontSize: '5rem',
      fontStyle: 'bold',
      color: '#000',
      align: 'center',
      fixedWidth: 300,
    })

    this.playingChipsText = this.add.text(
      1630,
      1810,
      this.userStore.user!.playingChips.toString(),
      {
        fontFamily: 'Teko',
        fontSize: '5rem',
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
        fixedWidth: 300,
      }
    )

    this.prizeTicketsText = this.add.text(
      630,
      1810,
      this.userStore.user!.prizeTickets.toString(),
      {
        fontFamily: 'Teko',
        fontSize: '5rem',
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
        fixedWidth: 300,
      }
    )

    this.messageText = this.add.text(1530, 1620, '', {
      fontFamily: 'Teko',
      fontSize: '5rem',
      fontStyle: 'bold',
      color: '#000',
      align: 'center',
      fixedWidth: 500,
    })
  }

  create() {
    this.add.image(413, 524, 'Sections').setOrigin(0, 0)
    this.add.image(930, 624, 'Glare').setOrigin(0, 0)

    this.drawSection(428, 530)
    this.drawSection(1028, 530)
    this.drawSection(1635, 530)

    this.add.image(0, 0, 'Bg').setOrigin(0, 0)

    this.add.image(401, 510, 'Shadow').setOrigin(0, 0)

    this.add.image(436, 474, 'Dirt').setOrigin(0, 0)

    this.drawNumbers()

    this.add.image(332, 51, 'Rewards').setOrigin(0, 0)
    this.add.rectangle(380, 1429, 1800, 643, 0x000000).setOrigin(0, 0)

    this.drawActions()
    this.drawText()
  }

  drawSection(x: number, y: number) {
    const container = this.add.container(x, y)
    const images: Phaser.GameObjects.Image[] = []

    shuffle(SYMBOLS).forEach((symbol, i) => {
      const img = this.add.image(0, 0, symbol.name).setOrigin(0).setScale(0.42)
      img.setX(this.centerX - img.displayWidth / 2)
      images.push(img)

      if (images[i - 1]) {
        img.setY(images[i - 1].y + images[i - 1].displayHeight + 40)
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

  anotherSymbol(winner: Record<string, any>, exclude: Set<string>) {
    const uniq = SYMBOLS.filter(
      (s) => !exclude.has(s.name) && s.id !== winner.id
    )
    const newSymbol = uniq[random(0, uniq.length - 1, false)]

    return newSymbol
  }

  drawUniqueSymbols(winner = {}) {
    const usedSymbols = new Set<string>()

    this.containers.forEach((container, ci) => {
      const symbols = container.getAll() as Phaser.GameObjects.Image[]

      symbols.slice(0, 3).forEach((s) => {
        const newSymbol = this.anotherSymbol(winner, usedSymbols)
        usedSymbols.add(newSymbol.name)
        s.setTexture(newSymbol.name)
        s.setX(this.centerX - s.displayWidth / 2)
      })
    })
  }

  drawPayline(winners: Phaser.GameObjects.Image[]) {
    const winnersPoints = winners.map((s) => {
      const { x, y } = s.getCenter()
      return {
        x: x + s.parentContainer.x,
        y: y + s.parentContainer.y,
      }
    })

    let points: { x: number; y: number }[] = []

    const top = minBy(winnersPoints, 'y')!
    const bottom = maxBy(winnersPoints, 'y')!
    const left = minBy(winnersPoints, 'x')!
    const right = maxBy(winnersPoints, 'x')!

    if (winners.length === 4) {
      const [center] = xor(winnersPoints, [top, bottom, left, right])

      if (left.x === top.x || left.x === bottom.x) {
        points = [
          {
            x: top.x,
            y: top.y,
          },
          {
            x: center.x,
            y: center.y,
          },
          {
            x: bottom.x,
            y: bottom.y,
          },
          {
            x: center.x,
            y: center.y,
          },
          {
            x: right.x,
            y: right.y,
          },
          {
            x: center.x,
            y: center.y,
          },
        ]
      } else if (right.x === top.x || right.x === bottom.x) {
        points = [
          {
            x: top.x,
            y: top.y,
          },
          {
            x: center.x,
            y: center.y,
          },
          {
            x: bottom.x,
            y: bottom.y,
          },
          {
            x: center.x,
            y: center.y,
          },
          {
            x: left.x,
            y: left.y,
          },
          {
            x: center.x,
            y: center.y,
          },
        ]
      } else {
        points = [
          {
            x: top.x,
            y: top.y,
          },
          {
            x: left.x,
            y: left.y,
          },
          {
            x: left.x,
            y: left.y,
          },
          {
            x: bottom.x,
            y: bottom.y,
          },
          {
            x: bottom.x,
            y: bottom.y,
          },
          {
            x: right.x,
            y: right.y,
          },
          {
            x: right.x,
            y: right.y,
          },
          {
            x: top.x,
            y: top.y,
          },
        ]
      }
    } else if (winners.length === 3) {
      const [center] = xor(winnersPoints, [left, right])

      points = [
        {
          x: center.x,
          y: center.y,
        },
        {
          x: left.x,
          y: left.y,
        },
        {
          x: center.x,
          y: center.y,
        },
        {
          x: right.x,
          y: right.y,
        },
      ]
    } else {
      return [
        [winnersPoints[0], winnersPoints[6]],
        [winnersPoints[1], winnersPoints[7]],
        [winnersPoints[2], winnersPoints[8]],
      ].forEach(([start, end]) => {
        this.lineGraphic.strokeLineShape(
          new Phaser.Geom.Line(start.x, start.y, end.x, end.y)
        )
      })
    }

    const polygon = new Phaser.Geom.Polygon(points)

    this.lineGraphic.strokePoints(polygon.points, true)
  }

  async play() {
    if (this.lock) return

    this.lock = true

    if (this.userStore.user!.playingChips <= 0) return

    this.playingChipsText.setText(
      (this.userStore.user!.playingChips - 1).toString()
    )

    this.messageText.setText('')

    this.lineGraphic?.destroy()

    this.lineGraphic = this.add.graphics({
      lineStyle: {
        width: 20,
        color: 0xd8b341,
      },
    })

    this.drawUniqueSymbols()

    this.containers.forEach((container, i) => {
      const symbols = container.getAll() as Phaser.GameObjects.Image[]
      this.blurPipeline?.add(container, { blur: 5 })

      this.add.tween({
        targets: container,
        duration: 200,
        props: { y: { value: '+=' + 1000 } },
        repeat: -1,
        onStart: () => {
          container.setY(container.y - 1000)
          symbols.forEach((img) => img.setVisible(true))
        },
        onComplete: () => {
          symbols.forEach((img, i) => img.setVisible([0, 1, 2].includes(i)))
          this.blurPipeline?.remove(container)

          if (this.containers.length - 1 !== i) return

          this.lock = false

          this.prizeTicketsText.setText(
            this.userStore.user!.prizeTickets.toString()
          )

          this.ethBalanceText.setText(this.ethBalance)
        },
      })
    })

    this.request()
  }

  async request() {
    try {
      const data = await slotMachineService.create({})
      const tweens = this.tweens.getAllTweens()

      await this.userStore.get(this.walletStore.currentAccount)

      if (!data.win) {
        this.drawUniqueSymbols()
        tweens[tweens.length - 1].on('complete', () => {
          this.messageText.setText('Better luck next time')
        })

        return
      }

      const combinations = chunk(data.payline.combination, 3)
      const symbol = SYMBOLS.find((s) => s.id === data.symbol.id)!

      this.drawUniqueSymbols(symbol)

      const winners: Phaser.GameObjects.Image[] = []

      this.containers.forEach((container, ci) => {
        const symbols = container.getAll() as Phaser.GameObjects.Image[]

        combinations[ci].forEach((value, si) => {
          if (!value) return

          symbols[si].setTexture(symbol.name)
          symbols[si].setX(this.centerX - symbols[si].displayWidth / 2)

          winners.push(symbols[si])
        })
      })

      tweens[tweens.length - 1].on('complete', () => {
        this.messageText.setText(
          `WIN ${
            data.symbol.prize * data.multiplier
          } ${data.symbol.unit.toUpperCase()}`
        )

        this.drawPayline(winners)
      })
    } catch (e) {
      this.messageText.setText('Something went wrong...')
      this.drawUniqueSymbols()
    } finally {
      this.tweens.getAllTweens().forEach((tween, i) => {
        const [config] = tween.data
        config.repeat = 5 + i * 3
        tween.restart()
      })
    }
  }
}

import { inject } from 'vue'

export const useSmoothScroll = () => {
  const mq = inject('mq') as any

  const smoothScroll = (e: MouseEvent) => {
    const link = e.target as HTMLElement
    const href = link.getAttribute('href')!
    const target = document.querySelector(href)!
    const { top: bodyTop } = document.body.getBoundingClientRect()
    const { top } = target.getBoundingClientRect()

    scroll({
      top: top - bodyTop - (mq.lgPlus ? 180 : 20),
      behavior: 'smooth',
    })
  }

  return smoothScroll
}

/*
 * @Descripttion: 图片类，管理图片DOM、真实的src、预加载的url、加载的状态以及图片的加载
 * @version: 0.0.1
 * @Author: Charles Guo
 * @Date: 2021-12-08 11:58:29
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-08 15:52:52
 */
import { ImageManagerOptions, State } from "../types"

export default class ImageManager {
  el: HTMLElement
  parent: HTMLElement | Window
  src: string
  error: string
  loading: string
  cache: Set<string>
  state: State
  constructor(options: ImageManagerOptions) {
    this.el = options.el
    this.parent = options.parent
    this.src = options.src
    this.loading = options.loading
    this.error = options.error
    this.cache = options.cache
    this.state = State.loading

    this.render(this.loading)
  }
  private render(src: string): void {
    this.el.setAttribute('src', src)
  }
  load(next?: Function): void {
    if (this.state > State.loading) {
      return
    }
    this.renderSrc(next)
  }
  update(src: string) {
    const currentSrc = this.src
    if (src !== currentSrc) {
      this.src = src
      this.state = State.loading
    }
  }
  renderSrc(next?: Function) {
    loadImage(this.src).then(() => {
      this.state = State.loaded
      this.render(this.src)
      next && next()
    }).catch((e) => {
      this.state = State.error
      this.render(this.error)
      console.warn(`load faild with src image(${this.src}) and this error msg is ${e.message}`);
    })
  }
}

export function loadImage(src: string): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.onload = function () {
      resolve()
      dispose()
    }

    image.onerror = function (e) {
      reject(e)
      dispose()
    }

    image.src = src
    
    function dispose() {
      image.onload = image.onerror = null
    }
  })
}
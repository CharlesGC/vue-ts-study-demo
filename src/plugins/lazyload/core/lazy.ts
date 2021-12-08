/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-08 11:58:22
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-08 16:29:55
 */
const DEFAULT_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ajux_loader.gif/600px-Ajux_loader.gif'
const ERROR_URL = 'https://love2dev.com/img/error-message-laptop-1920x1297.jpg'
import { LazyOptions, State, Target } from '../types/index'
import ImageManager from './imageManager';
import { DirectiveBinding } from '@vue/runtime-core';

export default class Lazy {
  error: string
  loading: string
  cache: Set<string>
  observer?: IntersectionObserver
  managerQuere: ImageManager[]
  constructor(options: LazyOptions) {
    this.managerQuere = [];
    this.initIntersectionObserver();

    this.loading = options.loading || DEFAULT_URL
    this.error = options.error || ERROR_URL
  }
  
  add(el: HTMLElement, binding: DirectiveBinding) {
    const src = binding.value

    const manager = new ImageManager({
      el, parent, src, loading: this.loading, error: this.error, cache: this.cache
    })

    this.managerQuere.push(manager)

    this.observer!.observe(el)
  }

  update(el: HTMLElement, binding: DirectiveBinding) {
    const src = binding.value
    const manager = this.managerQuere.find((manager) => {
      return manager.el === el
    })

    if (manager) {
      manager.update(src)
    }
  }

  remove(el:HTMLElement) {
    const manager = this.managerQuere.find((manager) => {
      return manager.el === el
    })
    if (manager) {
      this.removeManager(manager)
    }
  }

  initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const manager = this.managerQuere.find((manager) => {
            return manager.el === entry.target
          })
          if (manager) {
            if (manager.state === State.loaded) {
              this.removeManager(manager)
              return
            }
            manager.load()
          }
        }
      })
    }, {
      rootMargin: '0px',
      threshold: 0
    })
  }
  
  removeManager(manager: ImageManager) {
    const index = this.managerQuere.indexOf(manager)
    if (index > -1) {
      this.managerQuere.splice(index, 1)
    }
    if (this.observer) {
      this.observer.unobserve(manager.el)
    }
  }
}
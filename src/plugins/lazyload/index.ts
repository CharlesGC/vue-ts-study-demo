/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-08 11:48:39
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-08 15:54:48
 */
import Lazy from "./core/lazy"
const lazyPlugin = {
  install(app, options) {
    const lazy = new Lazy(options)
    app.directive('lazy', {
      mounted: lazy.add.bind(lazy),
      unmounted: lazy.remove.bind(lazy),
      updated: lazy.update.bind(lazy)
    })
  }
}
export default lazyPlugin
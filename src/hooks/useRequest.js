/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-07 17:24:55
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-07 18:18:00
 */
import { reactive, toRefs, isRef } from "@vue/reactivity";

export default () => {
  const state = reactive({
    hits: [],
    error: false,
    loading: false
  })
  const run = async (options) => {
    const { url, params = {} } = options;
    let query = ''
    Object.keys(params).forEach(key => {
      const val = params[key]
      const value = isRef(val) ? val.value : val
      query += `${key}=${value}`
    })
    state.error =  false
    state.loading = true
    try {
      const data = await fetch(`${url}?${query}`)
      .then(res => res.json())
      state.hits = data.hits
    } catch (error) {
      state.error = true
    }
    state.loading = false
  }

  return {
    run, ...toRefs(state)
  }
}
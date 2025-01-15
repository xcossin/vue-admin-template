import { IEVersion } from '@/utils/common'

const isIE = IEVersion() !== -1
const base = {
  state: {
    darkSkin: false,
    blueSkin: false,
    whiteSkin: false,
    isIE,
    currentWrapperWidth: 0
  },
  mutations: {
    setSkin: (state, command) => {
      changeSkin(command)
      localStorage.setItem('skinType', command)
    },
    getSkin: state => {
      const skinType = localStorage.getItem('skinType')
      changeSkin(skinType)
    }
  },
  actions: {
    actionSkin: ({ commit }, payload) => {
      commit('setSkin', payload)
    },
    getSkin: ({ commit }) => {
      commit('getSkin')
    }
  }
}

export default base
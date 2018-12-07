const state = {
  menuShowHide: false
}

const getters = {
  getMenuVisible(state) {
    return state.menuShowHide;
  }
}

const mutations = {
  setmenuVisible(state, type) {
    if (type === 0)
      state.menuShowHide = false;
    else
      state.menuShowHide = !state.menuShowHide;
  }
}


export default {
  state,
  getters,
  mutations
}

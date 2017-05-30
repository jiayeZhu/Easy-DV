import * as types from '../mutation-types'

const state = {
  current: 'DB'
}

const mutations = {
  [types.CHANGE_STAGE_2_DATAFILTER] (state) {
    state.current = 'datafilter';
  },
  [types.CHANGE_STAGE_2_DBCONNECTION] (state) {
    state.current = 'DB';
  },
  [types.CHANGE_STAGE_2_DVBUILDING] (state) {
    state.current = 'DVbuild';
  },
  [types.CHANGE_STAGE_2_SHOW] (state) {
    state.current = 'show';
  },
  [types.CHANGE_STAGE_2_SAVE] (state) {
    state.current = 'save';
  }
}

export default {
  state,
  mutations
}

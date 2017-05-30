import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const changStage2DB = ({ commit }) => {
  commit(types.CHANGE_STAGE_2_DBCONNECTION)
}

export const changStage2DataFilter = ({ commit }) => {
  commit(types.CHANGE_STAGE_2_DATAFILTER)
}

export const changeStage2DVBuilding = ({ commit }) => {
  commit(types.CHANGE_STAGE_2_DVBUILDING)
}

export const changeStage2Show = ({ commit }) => {
  commit(types.CHANGE_STAGE_2_SHOW)
}

export const changStage2Save = ({ commit }) => {
  commit(types.CHANGE_STAGE_2_SAVE)
}
import Vue from 'vue'
import Vuex from 'vuex'

import pathify from './pathify'

import { QUERY_SINGLE_FIELD_SUCCESSED } from './common/mutation'
import { UPDATE_AUDITING_DETAIL } from '@/store/auditing/mutation'
import { EDIT_MOBILE_INFO_SUCCESSED } from '@/store/account/mutation'
import {
  getMobileInfoEffect,
  refreshMobileInfoEffect
} from '@/effects/account'
import { getMobileInfoEffectAfterUpdateAuditingDetail } from '@/effects/aduting'
import common from './common/index'
import notification from './notification/index'
import channelManage from './channelManage/index'
import riskAdmin from './riskAdmin/index'
import tools from './tools/index'
import external from './external/index'
import storage from './storage/index'
import map from './map/index'
import contentManage from './contentManage/index'
import contentV2 from './contentV2/index'
import financing from './financing/index'
import outbound from './outbound/index'
import dataSrc from './dataSrc/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [pathify.plugin],

  modules: {
    common,
    notification,
    channelManage,
    riskAdmin,
    tools,
    external,
    storage,
    map,
    contentManage,
    contentV2,
    financing,
    outbound,
    dataSrc
  }
})

store.subscribe((mutation, state) => {
  const { type } = mutation
  // console.warn('type...', type)

  switch (type) {
    case QUERY_SINGLE_FIELD_SUCCESSED:
      return getMobileInfoEffect(mutation, state)
    case UPDATE_AUDITING_DETAIL:
      return getMobileInfoEffectAfterUpdateAuditingDetail(mutation, state)
    case EDIT_MOBILE_INFO_SUCCESSED:
      return refreshMobileInfoEffect()
  }
})

export default store

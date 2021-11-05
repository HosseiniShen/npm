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

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [pathify.plugin]
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

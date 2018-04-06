import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import fetchFestivals from "../api/festivals";

Vue.use(Vuex);

const LIST_OF_FESTIVALS = "LIST_OF_FESTIVALS";
const SET_LOADING = "SET_LOADING";
const TOGGLE_INFO_PANEL = "TOGGLE_INFO_PANEL";

const initialState = {
  festivals: [],
  loading: false,
  showInfoPanel: false
};

const getters = {
  festivals(state) {
    return state.festivals;
  },
  festival(state, id) {
    return state.festivals.filter(festival => festival.id === id);
  }
};

const mutations = {
  [LIST_OF_FESTIVALS](state, festivals) {
    state.festivals = festivals;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [TOGGLE_INFO_PANEL](state) {
    state.showInfoPanel = !state.showInfoPanel;
    console.log(state.showInfoPanel);
  }
};

const actions = {
  getFestivals({ commit }) {
    commit(SET_LOADING, true);
    fetchFestivals().then(response => {
      commit(LIST_OF_FESTIVALS, response.data.items);
      commit(SET_LOADING, false);
    });
  },
  toggleInfoPanel({ commit }) {
    commit(TOGGLE_INFO_PANEL);
  }
};

export default new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState()],
  getters,
  actions,
  mutations
});

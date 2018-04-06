import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import fetchFestivals from "../api/festivals";

Vue.use(Vuex);

const LIST_OF_FESTIVALS = "LIST_OF_FESTIVALS";
const SET_LOADING = "SET_LOADING";
const TOGGLE_INFO_PANEL = "TOGGLE_INFO_PANEL";
const SET_FESTIVAL_ID = "SET_FESTIVAL_ID";

const initialState = {
  festivals: [],
  loading: false,
  showInfoPanel: false,
  festivalId: null
};

const getters = {
  festivals(state) {
    return state.festivals;
  },
  getFestivalById: state => id =>
    state.festivals.filter(festival => festival.sys.id === id)
};

const mutations = {
  [LIST_OF_FESTIVALS](state, festivals) {
    state.festivals = festivals;
    state.festivalId = festivals[0].sys.id;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [TOGGLE_INFO_PANEL](state) {
    state.showInfoPanel = !state.showInfoPanel;
  },
  [SET_FESTIVAL_ID](state, festivalId) {
    state.festivalId = festivalId.festivalId;
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
  },
  setFestivalId({ commit }, festivalId) {
    commit(SET_FESTIVAL_ID, festivalId);
  }
};

export default new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState()],
  getters,
  actions,
  mutations
});

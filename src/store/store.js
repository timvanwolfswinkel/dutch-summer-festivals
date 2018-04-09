import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import fetchFestivals from "../api/festivals";

const moment = require("moment");

Vue.use(Vuex);

const LIST_OF_FESTIVALS = "LIST_OF_FESTIVALS";
const SET_LOADING = "SET_LOADING";
const TOGGLE_INFO_PANEL = "TOGGLE_INFO_PANEL";
const SET_FESTIVAL_ID = "SET_FESTIVAL_ID";
const SET_IMAGE_ANIMATING = "SET_IMAGE_ANIMATING";

const initialState = {
  festivals: [],
  loading: false,
  showInfoPanel: false,
  festivalId: null,
  imageAnimating: false
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
    moment.locale("en");
    const months = moment.months();
    const festivalsDividedInMonths = [];
    let festivalId = null;

    // filter festivals and separate into months
    months.forEach(month => {
      const festivalsInMonth = festivals.filter(festival => {
        const festivalMonth = moment(
          festival.fields.startDate,
          "YYYY-MM-DD"
        ).format("MMMM");
        return festivalMonth === month ? festivalMonth : null;
      });

      festivalsDividedInMonths.push({
        month,
        festivalsInMonth: festivalsInMonth || []
      });
    });

    // get first festival and set festivalId
    festivalsDividedInMonths.forEach(festival => {
      if (!festivalId) {
        if (festival.festivalsInMonth && festival.festivalsInMonth.length > 0) {
          festivalId = festival.festivalsInMonth[0].sys.id;
        }
      }
    });

    console.log(festivalsDividedInMonths);

    state.festivals = festivalsDividedInMonths;
    state.festivalId = festivalId;

    // state.festivals = festivals;
    // state.festivalId = festivals[0].sys.id;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [TOGGLE_INFO_PANEL](state) {
    state.showInfoPanel = !state.showInfoPanel;
  },
  [SET_FESTIVAL_ID](state, festivalId) {
    state.festivalId = festivalId.festivalId;
  },
  [SET_IMAGE_ANIMATING](state) {
    state.imageAnimating = !state.imageAnimating;
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
  },
  setImageAnimating({ commit }) {
    commit(SET_IMAGE_ANIMATING);
  }
};

export default new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState()],
  getters,
  actions,
  mutations
});

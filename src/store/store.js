import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import fetchFestivals from "../api/festivals";

const moment = require("moment");

Vue.use(Vuex);

const LIST_OF_FESTIVALS_BY_MONTH = "LIST_OF_FESTIVALS_BY_MONTH";
const SET_LOADING = "SET_LOADING";
const TOGGLE_INTRO = "TOGGLE_INTRO";
const TOGGLE_INFO_PANEL = "TOGGLE_INFO_PANEL";
const TOGGLE_MONTHS_PANEL = "TOGGLE_MONTHS_PANEL";
const TOGGLE_IMAGE_POSITION = "TOGGLE_IMAGE_POSITION";
const SET_FESTIVAL_ID = "SET_FESTIVAL_ID";
const SET_IMAGE_ANIMATING = "SET_IMAGE_ANIMATING";

const initialState = {
  festivals: [],
  loading: false,
  showIntro: true,
  showInfoPanel: false,
  showMonthsPanel: false,
  festivalId: null,
  imageAnimating: false,
  imagePosition: true
};

const getters = {
  festivals(state) {
    return state.festivals;
  },
  getFestivalById(state) {
    const temp = [];

    // TODO: replace this with reduce
    // flatten array
    state.festivals.forEach(festival => {
      if (festival.festivalsInMonth.length > 0) {
        festival.festivalsInMonth.forEach(item => {
          temp.push(item);
        });
      }
    });

    const festivals = [].concat(...temp);

    return festivalItem =>
      festivals.filter(festival => festival.sys.id === festivalItem);
  },
  getFestivalByUrl() {
    // TODO:return festival based on given url
  }
};

const mutations = {
  [LIST_OF_FESTIVALS_BY_MONTH](state, festivals) {
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

    state.festivals = festivalsDividedInMonths;
    state.festivalId = festivalId;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [TOGGLE_INTRO](state) {
    state.showIntro = !state.showIntro;
  },
  [TOGGLE_INFO_PANEL](state) {
    state.showInfoPanel = !state.showInfoPanel;
  },
  [TOGGLE_MONTHS_PANEL](state) {
    state.showMonthsPanel = !state.showMonthsPanel;
  },
  [TOGGLE_IMAGE_POSITION](state) {
    state.imagePosition = !state.imagePosition;
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
      commit(LIST_OF_FESTIVALS_BY_MONTH, response.data.items);
      commit(SET_LOADING, false);
    });
  },
  toggleIntro({ commit }) {
    commit(TOGGLE_INTRO);
  },
  toggleInfoPanel({ commit }) {
    commit(TOGGLE_INFO_PANEL);
  },
  toggleMonthsPanel({ commit }) {
    commit(TOGGLE_MONTHS_PANEL);
  },
  toggleImagePosition({ commit }) {
    commit(TOGGLE_IMAGE_POSITION);
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


const state = {
  userInfo:{},
};

const mutations = {
  SET_USER_INFO(state,user){
    state.userInfo = user;
  },
};

const actions = {
  setLoginUserDetail({commit},user) {
    return new Promise(resolve => {
      commit('SET_USER_INFO',user);
      resolve()
    })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

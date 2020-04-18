const state = {
    name: ''
}

const getters = {
    getMemberName: state => state.name
}

const actions = {
    setMemberName({ commit }, memberName) {
        commit('setName', memberName);
    }
}

const mutations = {
    setName(state, memberName) {
        state.name = memberName
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}



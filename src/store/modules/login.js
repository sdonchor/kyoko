import Axios from "axios";

const state = {
  authdata: "test"
};
const getters = {
  getAuthdata: state => state.authdata
};
const actions = {
   logIn(state, pw) {
        axios
          .post("/api/login", {
            password: pw
          })
          .then(response => {
            if (response.data === "inactive") {
              Swal.fire({
                type: "error",
                text: "Konto nieaktywne."
              });
              return;
            }
            if (response.data != "0") {
              this.logged_in = true;
              state.commit('setAuthdata',response.data); ////
              Swal.fire({
                type: "success",
                text: `Zalogowano jako ${response.data.user}.`,
                showConfirmButton: false,
                timer: 1200
              });
            } else {
              Swal.fire({
                type: "error",
                text: "Nie udało się zalogować."
              });
            }
          });
      }
};
const mutations = {
    setAuthdata: (state, authdata) => (state.authdata=authdata)
};

export default {
  state,
  getters,
  actions,
  mutations
};

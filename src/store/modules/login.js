import Axios from "axios";

const state = {
  authdata: null
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
                icon: "error",
                text: "Konto nieaktywne."
              });
              return;
            }
            if (response.data != "0") {
              this.logged_in = true;
              state.commit('setAuthdata',response.data); ////
              Swal.fire({
                icon: "success",
                text: `Zalogowano jako ${response.data.name}.`,
                showConfirmButton: false,
                timer: 1200
              });
            } else {
              Swal.fire({
                icon: "error",
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

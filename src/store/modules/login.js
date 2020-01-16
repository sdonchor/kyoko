import Axios from "axios";
import cookies from 'vue-cookies'
const state = {
  authdata: null
};
const getters = {
  getAuthdata: state => state.authdata
};
const actions = {
   logIn(state, pw) {
     if(!pw)
     {
       return;
     }
        axios
          .post("/api/login", {
            password: pw
          })
          .then(response => {
            if (response.data === "inactive") {
              Swal.fire({
                icon: "error",
                text: "Account inactive."
              });
              return;
            }
            if (response.data != "0") {
              this.logged_in = true;
              state.commit('setAuthdata',response.data); ////
              Swal.fire({
                icon: "success",
                text: `Logged in as ${response.data.name}.`,
                showConfirmButton: false,
                timer: 1200
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Couldn't log in"
              });
            }
          });
      },
      updateAuthdata(state,auth){
        state.commit('setAuthdata',auth);
      },
      logOut(state){
        axios.get('/api/logout');

        state.commit('setAuthdata',null);
        
      },
      checkCookies(state){
        let cookie = cookies.get('user');
        let regex = /{([^}]+)}/g;
        let cookiejson = regex.exec(cookie);
        if(!cookiejson || cookiejson.length<1)
        {
          state.dispatch('logOut');
          return;
        }
        cookiejson = cookiejson[0]; 
        let cookieobj = JSON.parse(cookiejson);
        if(cookieobj){
          state.commit('setAuthdata',cookieobj);
        }
        else
        {
          state.dispatch('logOut');
        }
        
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



module.exports={
    sendLoginCookies: function(res,authdata){
        const usercookie = {
            id: authdata.id,
            name: authdata.name,
            permissions: authdata.permission_level
        }
        res.cookie('user',usercookie,{signed:true, maxAge: 4320000})
    }  ,
    isUserLoggedIn: function(req){
        const usercookie = req.signedCookies.user;
        if(usercookie){
            return true;
        }
        else
        {
            return false;
        }
    },
    sendLogoutCookies: function(res){
        res.cookie('user','',{signed:true})
        res.cookie('user','',{maxAge:-1});
    }
}
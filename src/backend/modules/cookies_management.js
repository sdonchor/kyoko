

module.exports={
    sendLoginCookies: function(res,authdata){
        const usercookie = {
            id: authdata.id,
            name: authdata.name,
            permission_level: authdata.permission_level
        }
        res.cookie('user',usercookie,{signed:true, maxAge: Number.MAX_SAFE_INTEGER/2})
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
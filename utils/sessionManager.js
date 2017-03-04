/**
 * Created by matri on 16/7/25.
 */


function SessionManager(options){
  options =options ||{};
}

SessionManager.sessions=[];
SessionManager.loginAtOther={};

/**
 * 设置登录session
 * @param req
 * @param user
 */
SessionManager.set=function (req,user) {
  
  if(user&& user.id){
    var session=SessionManager.sessions[user.id];
    SessionManager.sessions[user.id]=req.session;
    
    if(!!session){
      //session.destroy();
      SessionManager.loginAtOther[''+session.id]=true;
    }
  }
  
  req.session.user=user;
};

/**
 * 是否在其他地方登录
 */
SessionManager.isLoginAtOther=function(req){
  if(SessionManager.loginAtOther[''+req.session.id]){
    delete SessionManager.loginAtOther[''+req.session.id];
    return true;
  }
  return false;
};



module.exports=SessionManager;
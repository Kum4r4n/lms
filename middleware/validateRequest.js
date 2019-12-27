module.exports = function(req, res, next) {
    // next();
    appFun.verifyToken(req,function(err,result){
        if(err) return res.status(400).json({status: false, message: "failed", result:result});        
        else if(result.verify != appFun.encriptString(req.useragent.browser+'_'+req.useragent.version)+'.'+appFun.encriptString(req.ip)) return res.status(400).json({status: false, message: "failed", result:'Invalid Access'});
        else if(result.uId == undefined) return res.status(400).json({status: false, message: "failed", result:'Hey , you are trying to hack, enjoy'});
        else next();
        //TODO::database validation
    });
};



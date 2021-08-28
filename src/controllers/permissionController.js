const Permission = require("../models/Permission");

exports.getUserPermission =  async (req, res, next) => {
    const user = await Permission.findOne({rol: "6129709bcb2afe5bd8b80fe2", resource: "61296c005331a6daac16018a"});
    return res.json({
        user
    })
};

exports.updateUserPermission =  async (req, res, next) => {
    var {read} = req.body;
    
    const user = await Permission.findOne({rol: "6129709bcb2afe5bd8b80fe2", resource: "61296c005331a6daac16018a"});
    // user.updateOne({ read: read });
    user.read = read;
    
    await user.save();

    return res.json({
        msg: "perfecto",
        operation: true
    })
};
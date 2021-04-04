exports.policy =  async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/policy.html'));
};
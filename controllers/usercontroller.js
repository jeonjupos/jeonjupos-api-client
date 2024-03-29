const userService = require("../services/userservice");
const statusCode = require("../common/statusCode");
const util = require("../common/responseUtill");

const userController = {
    getPostpaidGroupList: async (req, res) => {
        const storepkey = req.storepkey;
        const {search} = req.query;

        try{
            const getPostpaidGroupList = await userService.getPostpaidGroupList(storepkey, search);

            return res.status(200).json({res_code: "0000", message: "후불명부 조회 성공", postpaidgrouplist: getPostpaidGroupList.data});
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail("9999"))
        }
    },
    login: async (req, res) => {

        const {id, password} = req.body;

        try{
            let getOwner = await userService.login(id, password);
            if (getOwner.retcode === "0000") {
                return res.status(statusCode.OK).json(util.success(getOwner.retcode, getOwner.data));
            } else {
                return res.status(statusCode.OK).json(util.fail(getOwner.retcode));
            }
        } catch (err) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail("9999"))
        }
    },
    jwtLogin: async (req, res) => {
        // 미들웨어를 통한 토큰 검증 후 성공 시 바로 응답

        return res.status(statusCode.OK).json(util.success("0000", {
            storename: req.storename,
            storeid: req.storepkey,
            jwt: req.headers.jwt
        }));
    },
    ownerRegister: async (req, res) => {
        const {id, password} = req.body;

        try{
            const ownerRegister = await userService.ownerRegister(id, password);
            return res.status(statusCode.OK).json(util.success(ownerRegister.retcode, {}));
        } catch (err) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail("9999"));
        }
    }
}

module.exports = userController;
let spaceservice = require("../services/spaceservice");

exports.spacelist = async (req, res) => {

    const spaceserviceres = await spaceservice.spacelist();

    if (spaceserviceres.retcode === "-99") {
        return res.status(500).json({res_code: "9999", message: "데이터베이스 오류"})
    }

    return res.status(200).json({res_code: "0000", message: "테이블 정보 조회 성공", spacelist: spaceserviceres.spacequeryset});
}

exports.orderlist = async (req, res) => {

    let spacepkey = req.query.spacepkey;

    let spaceserviceres = await spaceservice.orderlist(spacepkey);
    if (spaceserviceres.retcode === "-99") {
        return res.status(500).json({res_code: "9999", message: "데이터베이스 오류"})
    }

    return res.status(200).json({res_code: "0000", message: "테이블 주문정보 조회 성공", space: spaceserviceres.space, orderlist: spaceserviceres.orderlist})
}
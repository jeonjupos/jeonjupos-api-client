let getConnection = require("../common/db");
const menuModel = require("../models/menuModel");

menuService = {
    menulist: async (storepkey) => {
        /**
         * 카테고리별 메뉴 리스트
         * @type {unknown}
         */

        try{
            const connection = await getConnection();
            let getMenuList = await menuModel.getMenuList(storepkey, connection);
            connection.release();

            if (getMenuList.retcode === "-99") {
                return getMenuList;
            }

            const categorymenulist = [];    // 카테고리별 메뉴 리스트
            const categorylist = [];        // 카테고리 리스트
            for (const categorymenuqueryset of getMenuList.data) {
                //  카테고리 리스트 생성
                let menulistidx = categorymenulist.findIndex((category) => category.categorypkey===categorymenuqueryset.categorypkey);
                if (menulistidx === -1){
                    categorylist.push({
                        categorypkey: categorymenuqueryset.categorypkey,
                        categoryname: categorymenuqueryset.categoryname
                    })
                    categorymenulist.push({
                        categorypkey: categorymenuqueryset.categorypkey,
                        menulist: []
                    });
                }

                // 카테고리별 메뉴 리스트 생성
                let cgmidx = categorymenulist.findIndex((category) => category.categorypkey===categorymenuqueryset.categorypkey);
                if (cgmidx !== -1){
                    categorymenulist[cgmidx].menulist.push({
                        menupkey: categorymenuqueryset.menupkey,
                        menuname: categorymenuqueryset.menuname,
                        saleprice: categorymenuqueryset.saleprice,
                        takeoutyn: categorymenuqueryset.takeoutyn,
                        takeinyn: categorymenuqueryset.takeinyn,
                        takeoutprice: categorymenuqueryset.takeoutprice
                    });
                }
            }

            return {retcode: "00", categorylist: categorylist, categorymenulist: categorymenulist}
        } catch (err) {
            throw err;
        }
    }
}

module.exports = menuService;
module.exports = {
  'DANWEI': { // 单位基本信息
    'YWLSH': '_id', // 法人和其他组织统一社会信用代码+省代号
    'FRHQTZZTYSHXYDM': 'code', // 法人和其他组织统一社会信用代码
    'SJZGDW_GAJGJGDM': 'organCode', // 公安机关机构代码
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'YZBWXHXPSJHJDM': 'linkCode', // 易制爆危险化学品涉及环节代码
    'DWMC': 'name', // 企业名称
    'FDDBR_XM': 'legalName', // 法定代表人
    'GDDH': 'telephone', // 固定电话
    'DZMC': 'address', // 地址详情
    'DQJD': 'longitude', // 地球经度
    'DQWD': 'latitude', // 地球纬度
    'ZRMJ_XM': 'dutyPoliceName', // 责任民警姓名
    'BWFZR_XM': 'guardName', // 保卫负责人
    'AQGLR_RS': 'guardSum', // 安全管理人数
    'CCCS_SL': 'storagePlaceSum', // 储存场所数量
    'CCCSRL_YZBWXHXPJLDWLX': 'storageUnit', // 储存场所单位
    'CCCSRL_SZ': 'storageCapacity', // 储存场所容量
    'SPJKSB_SL': 'monitoringSum', // 视频监控设备数量
    'SFZX_PDBZ': 'isCancel', // 是否已注销
    'BJZZ_PDBZ': 'BJZZ', // 是否有报警装置
    'YYZZ_PDBZ': 'YYZZ', // 是否有营业执照
    'WXHXPAQSCXKZ_PDBZ': 'WXHXPAQSCXKZ', // 是否有危险化学品安全生产许可证
    'WXHXPJYXKZ_PDBZ': 'WXHXPJYXKZ', // 是否有危险化学品经营许可证
    'WXHXPAQSYXKZ_PDBZ': 'WXHXPAQSYXKZ', // 是否有危险化学品安全使用许可证
    'WXHXPAQPJBG_PDBZ': 'WXHXPAQPJBG', // 是否有危险化学品安全评价报告
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'DANWEI_WP': { // 单位涉及易制爆危险化学品信息
    'YWLSH': '_id', // 业务流水号+省代号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'YZBWXHXPDM': 'code', // 化学品代码
    'WP_NAME': 'name', // 化学品名
    'SFSJSC_PDBZ': 'operationModes', // 是否涉及生产_判断标识
    'SFSJJY_PDBZ': 'operationModes', // 是否涉及经营_判断标识
    'SFSJCC_PDBZ': 'operationModes', // 是否涉及储存_判断标识
    'SFSJSY_PDBZ': 'operationModes', // 是否涉及使用_判断标识
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'SFZX_PDBZ': 'isCancel', // 是否已注销
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'RENYUAN': { // 从业人员信息
    'YWLSH': '_id', // 业务流水号+省代号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'YZBCYRYSFZJLX': 'identity', // 身份证件类型
    'SFZJ_ZJHM': 'idNumber', // 证件号
    'YZBCYRYLX': 'type', // 从业人员类型
    'XLDM': 'education', // 学历代码
    'MZDM': 'nation', // 民族代码
    'JGGJDQDM': 'areaCode', // 籍贯国家/地区代码
    'HJDZ_DZMC': 'regAddress', // 户籍地址
    'XZZ_DZMC': 'address', // 现住地址
    'LXDH': 'telephone', // 联系电话
    'XP': 'image', // 相片
    'XM': 'name', // 姓名
    'XBDM': 'gender', // 性别
    'CSRQ': 'birthday', // 生日
    'ZGZLX_MC': 'ZGZLX_MC', // 资格证类型_名称
    'ZGZ_ZJHM': 'ZGZ_ZJHM', // 资格证证件号码
    'ZGZ_YXQJZRQ': 'ZGZ_YXQJZRQ', // 资格证有效期截止日期
    'ZGZBF_DWMC': 'ZGZBF_DWMC', // 资格证颁发单位名称
    'ZGZBF_RQ': 'ZGZBF_RQ', // 资格证颁发日期
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'SFZX_PDBZ': 'isCancel', // 是否已注销
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'KUFANG': { // 储存场所基本信息
    'YZBCCCSBM': '_id', // 场所编码+省代号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'CCCS_JZWMC': 'building', // 建筑物名称
    'CCCS_XZQHMC': 'district', // 行政区划名称
    'CCCS_DZMC': 'address', // 地址名称
    'CCCS_DQJD': 'longitude', // 地球经度
    'CCCS_DQWD': 'latitude', // 地球纬度
    'CCCS_MJPFM': 'area', // 面积（平方米）
    'CCCSRL_YZBWXHXPJLDWLX': 'capacityUnit', // 计量单位类型
    'CCCSRL_SZ': 'capacity', // 储存场所容量
    'GAJGJGDM': 'organCode', // 公安机关机构代码
    'YZBCCCSLX': 'type', // 场所类型
    'FDMJB': 'FDMJB', // 防盗门级别(J Y B D)
    'SPJKSB_PDBZ': 'SPJKSB', // 是否有视频监控设备
    'FDM_PDBZ': 'FDM', // 是否有防盗门
    'XXCJSB_PDBZ': 'XXCJSB', // 是否有信息采集设备
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'SFZX_PDBZ': 'isCancel', // 是否已注销
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'KUFANG_WP': { // 储存信息
    'ID': '_id', // id
    'YZBCCCSBM': 'storage', // 场所编码+省代号
    'YZBWXHXPDM': 'code', // 化学品代码
    'WP_NAME': 'name', // 化学品名
    'DQKCL_YZBWXHXPJLDWLXW': 'unit', // 化学品计量单位类型
    'DQKCL_SZ': 'amount', // 数值
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'CHELIANG': { // 运输车辆备案信息
    'YWLSH': '_id', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'JDCHPHM': 'idNumber', // 机动车号牌号码
    'JDCHPYSDM': 'color', // 机动车号牌颜色代码
    'CLSBDH': 'sign', // 车辆识别代号
    'JDCFDJDDJH': 'engineNum', // 机动车发动机（电动机）号
    'JDCXSZ_YXQJZRQ': 'drivingExpire', // 机动车行驶证有效期截止日期
    'DLYSJYXKZBH': 'licenseNum', // 道路运输经营许可证编号
    'DLYSJYXKZ_YXQJZRQ': 'licenseExpire', // 道路运输经营许可证_有效期截止日期
    'CLJKSB_PDBZ': 'CLJKSB', // 是否有车载监控设备
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'SFZX_PDBZ': 'isCancel', // 是否已注销
    'DJSJ': 'crtime', // 登记时间
    'GXSJ': 'moditime' // 更新时间
  },
  'XIAOSHOU': { // 销售业务信息
    'YWLSH': 'code', // 业务流水号
    'XSDW_FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'XSDWJBR_XM': 'registrant', // 销售单位经办人_姓名
    'DJSJ': 'regtime', // 登记时间
    'XS_RQ': 'crtime', // 销售_日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'GMDW_FRHQTZZTYSHXYDM': 'ext.companyCode', // 购买单位_法人和其他组织统一社会信用代码
    'GMDW_COMP_NAME': 'ext.companyName', // 购买单位名
    'GMDW_DZMC': 'ext.address', // 地址
    'GMDWJBR_XM': 'ext.name', // 购买人姓名
    'GMDWJBR_YZBCYRYSFZJLX': 'ext.identity', // 购买人身份证件类型
    'GMDWJBR_ZJHM': 'ext.idNumber', // 购买人证件号码
    'GMDWJBR_YDDH': 'ext.telephone', // 购买人移动电话
    'GMDW_YZBWXHXPJYZZZMFLDM': 'ext.JYZZCode', // 易制爆危险化学品经营资质证明分类代码
    'GMDW_YZBWXHXPJYZZZMBM': 'ext.JYZZNumber' // 易制爆危险化学品经营资质证明编号
  },
  'XIAOSHOU_WP': { // 销售数量信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'XS_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'XS_SZ': 'amount', // 数值
    'SH_SZ': 'lossAmount', // 损耗_数值
    'YT_BZ': 'memo', // 备注
    'DJSJ': 'regtime' // 登记时间
  },
  'GOUMAI': { // 购买业务信息
    'YWLSH': 'code', // 业务流水号
    'GMDW_FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'GMDWJBR_XM': 'registrant', // 销售单位经办人_姓名
    'DJSJ': 'regtime', // 登记时间
    'GM_RQ': 'crtime', // 购买_日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'XSDW_FRHQTZZTYSHXYDM': 'ext.companyCode', // 销售单位_法人和其他组织统一社会信用代码
    'XSDW_COMP_NAME': 'ext.companyName', // 销售单位名
    'XSDW_DZMC': 'ext.address', // 地址
    'XSDWJBR_XM': 'ext.name', // 销售人姓名
    'XSDWJBR_YZBCYRYSFZJLX': 'ext.identity', // 销售人身份证件类型
    'XSDWJBR_ZJHM': 'ext.idNumber', // 销售人证件号码
    'XSDWJBR_YDDH': 'ext.telephone', // 销售人移动电话
    'YZBWXHXPJYZZZMFLDM': 'ext.JYZZCode', // 易制爆危险化学品经营资质证明分类代码
    'YZBWXHXPJYZZZMBM': 'ext.JYZZNumber' // 易制爆危险化学品经营资质证明编号
  },
  'GOUMAI_WP': { // 购买数量信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'GM_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'GM_SZ': 'amount', // 数值
    'SH_SZ': 'lossAmount', // 损耗_数值
    'YT_BZ': 'memo', // 备注
    'DJSJ': 'regtime' // 登记时间
  },
  'SHENGCHAN': { // 生产业务信息
    'YWLSH': 'code', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'SC_RQ': 'crtime', // 日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName' // 归属单位名称
  },
  'SHENGCHAN_WP': { // 生产数量信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'SC_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'SC_SZ': 'amount', // 数值
    'YT_BZ': 'memo', // 备注
    'DJSJ': 'regtime' // 登记时间
  },
  'SHIYONG': { // 使用业务信息
    'YWLSH': 'code', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'SY_RQ': 'crtime', // 日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName' // 归属单位名称
  },
  'SHIYONG_WP': { // 使用数量信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'SY_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'SY_SZ': 'amount', // 数值
    'YT_BZ': 'memo', // 备注
    'DJSJ': 'regtime' // 登记时间
  },
  'CHUZHI': { // 处置业务信息
    'YWLSH': 'code', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'WPCZ_RQ': 'crtime', // 日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName' // 归属单位名称
  },
  'CHUZHI_WP': { // 处置数量信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'WPCZ_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'WPCZ_SZ': 'amount', // 数值
    'DJSJ': 'regtime' // 登记时间
  },
  'ZHUANRANG': { // 转让业务信息
    'YWLSH': 'code', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'ZR_RQ': 'crtime', // 日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'JSDW_FRHQTZZTYSHXYDM': 'ext.companyCode', // 接收单位_法人和其他组织统一社会信用代码
    'JSDW_COMP_NAME': 'ext.companyName', // 接收单位名
    'JSDW_YZBCCCSBM': 'ext.storageCode', // 接收单位储存场所编码
    'JSDW_KF_NAME': 'ext.storageName' // 接收单位储存场所名
  },
  'ZHUANRANG_WP': { // 转让物品信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'ZR_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'ZR_SZ': 'amount', // 数值
    'DJSJ': 'regtime' // 登记时间
  },
  'DIUSHIBEIDAO': { // 丢失被盗信息
    'YWLSH': 'code', // 业务流水号
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'RQ': 'crtime', // 日期
    'YZBCCCSBM': 'storage', // 储存场所+省号
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'DSBD_PDBZ': 'ext.DSBD' // 丢失/被盗_判断标识
  },
  'DIUSHIBEIDAO_WP': { // 丢失被盗物品信息
    'ID': '_id', // 唯一序列
    'YWLSH': 'code', // 业务流水号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'BC_MC': 'nick', // 化学品别称
    'DSBD_YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'DSBD_SZ': 'amount', // 数值
    'DJSJ': 'regtime' // 登记时间
  },
  'BIAOSHI': { // 标识生成信息
    'YZBBZBM': '_id', // 标识编码
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'YZBWXHXPDM': 'chemicalCode', // 化学品代码
    'WP_NAME': 'chemicalName', // 化学品名
    'YZBWXHXPJLDWLX': 'unit', // 化学品计量单位类型
    'SZ': 'amount', // 数值
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'SHC_RQ': 'crtime' // 生成时间
  },
  'BIAOSHI_LIUXIANG': { // 标识流向信息,只合到track
    'YZBBZBM': 'signMark', // 标识编码
    'SJLX_YWLSH': 'code' // 业务流水号
  },
  'BIAOSHI_FENPEI': { // 标识分配信息
    'YZBBZBM': '_id', // 标识编码
    'FRHQTZZTYSHXYDM': 'company', // 法人和其他组织统一社会信用代码+省代号
    'YY_YZBBZBM': 'signMark', // 原有_易制爆标识编码
    'DJR_XM': 'registrant', // 登记人
    'DJSJ': 'regtime', // 登记时间
    'SJGSDWDM': 'companyCode', // 归属单位代码
    'SJGSDWMC': 'companyName', // 归属单位名称
    'FS_RQSJ': 'crtime' // 生成时间
  }
}

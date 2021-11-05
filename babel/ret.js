import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import * as userActions from '@/store/user/action'
import { CLEAR_COOKIE } from '@/store/user/mutation'
import { processRouterQueryToUrl } from '@/utils'
import Home from '@/view/home/Home'
import CrmHome from '@/view/home/CrmHome'
import ExternalHome from '@/view/home/ExternalHome'
import Login from '@/view/login/Login'
import SecondLogin from '@/view/login/SecondLogin'
import SecondaryVerification from '@/view/login/SecondaryVerification'
import ResetPassword from '@/view/login/ResetPassword'
import Logout from '@/view/logout/Logout'
import Bounce from '@/components/Bounce'

import Routes from './path'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: Routes.Root,
  routes: [
    {
      path: Routes.PdfViewPage,
      name: 'PdfView',
      component: () => import('@/view/viewPage/PdfViewPage'),
      props: (route) => ({ attachmentType: route.query.attachmentType, attachmentName: route.query.attachmentName }),
      meta: {
        loginCheck: true,
        permissionCheck: true
      }
    },
    {
      path: Routes.Login,
      name: 'Login',
      component: Login,
      props: (route) => ({ redirectUri: route.query.redirectUri }),
      meta: {
        loginCheck: false,
        permissionCheck: false
      },
      beforeEnter: (to, from, next) => {
        store.commit(CLEAR_COOKIE)
        next()
      }
    },
    {
      path: Routes.SecondLogin,
      name: 'SecondLogin',
      component: SecondLogin,
      props: (route) => ({ redirectUri: route.query.redirectUri }),
      meta: {
        loginCheck: false,
        permissionCheck: false
      }
      // afterEach: (to, from, next) => {
      //   store.commit(CLEAR_COOKIE)
      //   next()
      // }
    },
    {
      path: Routes.SecondaryVerification,
      name: 'SecondaryVerification',
      component: SecondaryVerification,
      props: (route) => ({ redirectUri: route.query.redirectUri }),
      meta: {
        loginCheck: false,
        permissionCheck: false
      }
    },
    {
      path: Routes.ResetPassword,
      name: 'ResetPassword',
      component: ResetPassword,
      props: (route) => ({ redirectUri: route.query.redirectUri }),
      meta: {
        loginCheck: false,
        permissionCheck: false
      }
    },
    {
      path: Routes.Logout,
      name: 'Logout',
      component: Logout,
      props: (route) => ({ redirectUri: route.query.redirectUri }),
      meta: {
        loginCheck: true,
        permissionCheck: false
      }
    },
    //外部用户首页
    {
      path: Routes.ExternalHome,
      name: 'ExternalHome',
      component: ExternalHome,
      meta: {
        loginCheck: true,
        permissionCheck: true
      }
    },
    { // crm 首页
      path: Routes.CrmHome,
      name: 'CrmHome',
      component: CrmHome,
      meta: {
        loginCheck: true,
        permissionCheck: true
      },
      children: [
        { // CRM
          path: Routes.Customers,
          name: 'Customers',
          component: () => import('@/view/customer/crm/Crm'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // Leads管理
          path: Routes.LeadsManagement,
          name: 'LeadsManagement',
          component: () => import('@/view/customer/leads/LeadsManagement'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // Leads新增
          path: Routes.LeadsAddition,
          name: 'LeadsAddition',
          component: () => import('@/view/customer/leads/LeadsAddition'),
          props: (route) => {
            return ({ partnerLeads: route.query.partnerLeads, phone: route.query.phone })
          },
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        {
          path: Routes.CrmMap,
          name: 'CrmMap',
          component: () => import('@/view/amap/CustomerMap'),
          props: (route) => {
            return ({ type: route.query.type })
          },
          meta: {
            loginCheck: true,
            permissionCheck: false
          }
        },
        { // 渠道 Leads 新增
          path: Routes.PartnerLeadsAddition,
          name: 'PartnerLeadsAddition',
          component: () => import('@/view/customer/leads/LeadsAddition'),
          props: () => {
            return ({ partnerLeads: true })
          },
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 渠道Leads
          path: Routes.CrmPartnerLeads,
          name: 'CrmPartnerLeads',
          component: () => import('@/view/customer/partnerLeads/PartnerLeadsManage'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 签约小渠道
          path: Routes.TopRunnerChannelManage,
          name: 'TopRunnerChannelManage',
          component: () => import('@/view/customer/channelManage/TopRunnerChannelManagement'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 权限申请
          path: Routes.CrmBusiPermissionMannage,
          name: 'CrmBusiPermissionMannage',
          component: () => import('@/view/businessApply/permissionApply/PermissionMannage'),
          props: (route) => {
            return ({
              permissionRouter: Routes.CrmBusiPermissionApply,
              roleRoter: Routes.CrmPermissionRoleApply,
              reviewDetail: Routes.CrmApplicationReviewDetail
            })
          },
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 业务申请
          path: Routes.CrmBusiPermissionApply,
          name: 'CrmBusiPermissionApply',
          component: () => import('@/view/businessApply/permissionApply/PermissionApply'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 用户角色复制申请
          path: Routes.CrmPermissionRoleApply,
          name: 'CrmBusiPermissionRoleApply',
          component: () => import('@/view/businessApply/permissionApply/PermissionRoleApply'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 用户申请审核详情
          path: Routes.CrmApplicationReviewDetail,
          name: 'CrmApplicationReviewDetail',
          component: () => import('@/view/businessApply/busApplication/ApplicationReviewDetail'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 测试账号
          path: Routes.CrmOauth2Authorize,
          name: 'CrmOauth2Authorize',
          component: () => import('@/view/authority/UserMannage/Oauth2Authorize'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 销售工单
          path: Routes.CrmSaleServiceOrder,
          name: 'CrmSaleServiceOrder',
          component: () => import('@/view/customerservice/serviceOrder/SaleServiceOrder'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 编辑客户客服工单
          path: Routes.CrmEditOrViewCustomerServiceOrder,
          name: 'CrmEditOrViewCustomerServiceOrder',
          component: () => import('@/view/customerservice/serviceOrder/EditCustomerOrder'),
          props: (route) => ({ orderId: route.query.orderId, viewDetail: route.query.viewDetail }),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 查看客户客服工单
          path: Routes.CrmViewCustomerServiceOrder,
          name: 'CrmViewCustomerServiceOrder',
          component: () => import('@/view/customerservice/serviceOrder/EditCustomerOrder'),
          props: (route) => ({ orderId: route.query.orderId, viewDetail: true }),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 呼叫中心
          path: Routes.CrmLeadsCallCenter,
          name: 'CallRecords',
          component: () => import('@/view/marketing/callCenter/CallCenter'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 我的合伙人
          path: Routes.MyPartner,
          name: 'MyPartner',
          component: () => import('@/view/customer/partner/MyPartner'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        },
        { // 企微账号申请
          path: Routes.BusiWxAcctApplyOne,
          name: 'BusiWxAcctApplyOne',
          component: () => import('@/view/businessApply/permissionApply/BusiWxAcctApply'),
          meta: {
            loginCheck: true,
            permissionCheck: true
          }
        }
      ]
    },
    {
      path: Routes.Home,
      alias: Routes.HomeAlias,
      name: 'Home',
      component: Home,
      meta: {
        loginCheck: true,
        permissionCheck: true
      },
      children: [{
        path: Routes.map,
        name: 'map',
        component: () => import('@/view/amap/CustomerMap'),
        props: (route) => {
          return ({ type: route.query.type, address: route.query.address })
        },
        meta: {
          loginCheck: true,
          permissionCheck: false
        }
      }, {
        path: Routes.PermissionDenied,
        name: 'PermissionDenied',
        component: () => import('@/view/error/PermissionDenied'),
        meta: {
          loginCheck: true,
          permissionCheck: false
        }
      }, { // 账户查询
        path: Routes.AccountTop,
        name: 'AccountTop',
        component: () => import('@/view/account/AccountTop'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 账户退款
        path: Routes.AccountWithdraw,
        name: 'AccountWithdraw',
        component: () => import('@/view/account/AccountWithdraw'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 创建工单
        path: Routes.CreateOrder,
        name: 'CreateOrder',
        component: () => import('@/view/account/operation/CreateOrder'),
        props: (route) => {
          return ({ firmId: route.query.firmId || '', userId: route.query.userId || '', requestId: route.query.requestId || '' })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 账户操作
        path: Routes.AccountOperation,
        name: 'AccountOperation',
        props: (route) => ({ firmId: route.query.firmId, tabInit: route.query.tabInit, userId: route.query.userId, payerName: route.query.payerName, payerAccount: route.query.payerAccount }),
        component: () => import('@/view/account/AccountOperation'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 合同详情
        path: Routes.ContractInfo,
        name: 'ContractInfo',
        component: () => import('@/view/account/operation/ContractInfo'),
        props: (route) => ({ contractId: route.query.contractid }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 合同编辑
        path: Routes.ContractEdit,
        name: 'ContractEdit',
        component: () => import('@/view/account/operation/ContractEdit'),
        props: (route) => ({ contractId: route.query.contractid }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 风控
      { // 数据中心
        path: Routes.DataCenter,
        name: 'DataCenter',
        component: () => import('@/view/auditing/DataCenter'),
        props: (route) => ({ payerName: route.query.payerName, payerAccount: route.query.payerAccount }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 汇款记录
        path: Routes.PayRecords,
        name: 'PayRecords',
        component: () => import('@/view/auditing/components/PayRecords'),
        props: (route) => ({ firmId: route.query.firmId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 工单查询
        path: Routes.AuditingItems,
        name: 'AuditingItems',
        props: (route) => ({ firmName: route.query.firmName }),
        component: () => import('@/view/auditing/audit/AuditingItems'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 工单审核
        path: Routes.AuditingRequest,
        name: 'AuditingRequest',
        props: (route) => ({ requestId: route.query.requestId, orderType: route.query.orderType }),
        component: () => import('@/view/auditing/audit/AuditingRequest'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 评分卡配置
        path: Routes.ScoreCard,
        name: 'ScoreCard',
        component: () => import('@/view/auditing/scorecard/ScoreCard.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 评分卡审核页面
        path: Routes.ScoreCardAudit,
        name: 'ScoreCardAudit',
        props: (route) => ({ requestId: route.query.requestId, firmId: route.query.firmId }),
        component: () => import('@/view/auditing/audit/ScoreCard'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 认证报告审核页面
        path: Routes.CertificationReport,
        name: 'CertificationReport',
        props: (route) => ({ requestId: route.query.requestId, firmId: route.query.firmId }),
        component: () => import('@/view/auditing/audit/CertificationReport'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // dowjones审核结果页
        path: Routes.DowjonesResult,
        name: 'DowjonesResult',
        component: () => import('@/view/auditing/audit/DowjonesResult'),
        props: (route) => (
          {
            instructionId: route.query.instructionid,
            requestId: route.query.requestId,
            target: route.query.target,
            targetId: route.query.targetId,
            modelName: route.query.modelName
          }
        ),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 平台商户名单
        path: Routes.ImportPage,
        name: 'ImportPage',
        component: () => import('@/view/auditing/ImportPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 借贷平台合同查询
        path: Routes.DebtContracts,
        name: 'DebtContracts',
        component: () => import('@/view/auditing/DebtContracts'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 白名单
        path: Routes.WhiteListDetail,
        name: 'WhiteListDetail',
        props: (route) => ({ whitelistMemberId: route.query.whitelistMemberId }),
        component: () => import('@/view/auditing/WhiteListTabs/WhiteListDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 黑名单
        path: Routes.BlackListPage,
        name: 'BlackListPage',
        props: (route) => ({ tabName: route.query.tabName, nameId: route.query.nameId }),
        component: () => import('@/view/auditing/BlackListPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 风铃审核详情
      {
        path: Routes.RingBellAuditingPage,
        name: 'RingBellAuditingPage',
        props: (route) => ({ requestId: route.query.requestId }),
        component: () => import('@/view/auditing/RingBellAuditingPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 风控工作流查询
        path: Routes.RiskWorkflowQuery,
        name: 'RiskWorkflowQuery',
        component: () => import('@/view/riskadmin/RiskWorkflowQuery'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 风控工作流详情
        path: Routes.RiskWorkflowDetail,
        name: 'RiskWorkflowDetail',
        props: (route) => ({ workflowId: route.query.workflowId }),
        component: () => import('@/view/riskadmin/RiskWorkflowDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 风控工作流详情
        path: Routes.RiskControlStrategy,
        name: 'RiskControlStrategy',
        component: () => import('@/view/auditing/RiskControlStrategy'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.LabelManagement,
        name: 'LabelManagement',
        component: () => import('@/view/labelManagement/LabelManageWrapper'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 客资
      { // 结汇申报处理
        path: Routes.SettlementReportPage,
        name: 'SettlementReportPage',
        component: () => import('@/view/customerfund/SettlementReport'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 结汇申报处理
        path: Routes.SettlementFileDetail,
        name: 'SettlementFileDetail',
        props: (route) => ({ auditBatchId: route.query.auditBatchId }),
        component: () => import('@/view/customerfund/SettlementReport/SettlementFileDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 结汇申报处理
        path: Routes.SettlementBatchDetail,
        name: 'SettlementBatchDetail',
        props: (route) => ({ batchId: route.query.batchId }),
        component: () => import('@/view/customerfund/SettlementReport/SettlementBatchDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 结汇申报处理/按批次号查询
        path: Routes.ReportContract,
        name: 'ReportContract',
        props: (route) => ({ batchId: route.query.batchId }),
        component: () => import('@/view/customerfund/ReportContract'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 异常VA
        path: Routes.IncomingRecords,
        name: 'IncomingRecords',
        component: () => import('@/view/customerfund/IncomingRecords'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 异常VA详情
        path: Routes.IncomingRecord,
        name: 'IncomingRecord',
        component: () => import('@/view/customerfund/IncomingRecord'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 异常数据处理
        path: Routes.ExceptionDatas,
        name: 'ExceptionDatas',
        component: () => import('@/view/customerfund/ExceptionDatas'),
        props: { isAuditing: false },
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 异常数据处理审核
        path: Routes.ExceptionDatasAudit,
        props: { isAuditing: true },
        name: 'ExceptionDatasAudit',
        component: () => import('@/view/customerfund/ExceptionDatas'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // va report创建
        path: Routes.VAReportCreate,
        name: 'VAReportCreate',
        component: () => import('@/view/customerfund/VAReportCreate'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 异常VA详情
        path: Routes.ExceptionData,
        props: { isAuditing: false },
        name: 'ExceptionData',
        component: () => import('@/view/customerfund/ExceptionData'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 异常VA审核
        path: Routes.ExceptionDataAudit,
        props: { isAuditing: true },
        name: 'ExceptionDataAudit',
        component: () => import('@/view/customerfund/ExceptionData'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 汇路优化中间行配置
        path: Routes.IntermediaryAgentMappingPage,
        name: 'IntermediaryAgentMappingPage',
        component: () => import('@/view/customerfund/IntermediaryAgentMappingPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 资金调整
        path: Routes.BookingClearings,
        name: 'BookingClearings',
        component: () => import('@/view/customerfund/BookingClearings'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 资金调整详情
        path: Routes.BookingClearing,
        name: 'BookingClearing',
        props: (route) => ({ clearingId: route.query.clearingId }),
        component: () => import('@/view/customerfund/BookingClearing'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 业务调整
        path: Routes.BookingTxns,
        name: 'BookingTxns',
        component: () => import('@/view/customerfund/BookingTxns'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 业务调整明细
        path: Routes.BookingTxn,
        name: 'BookingTxn',
        props: (route) => ({ txnId: route.query.txnId }),
        component: () => import('@/view/customerfund/BookingTxn'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 资金调整审核
        path: Routes.BookingAuditManagement,
        name: 'BookingAuditManagement',
        component: () => import('@/view/customerfund/BookingAuditManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 线下异常数据处理 -- 列表
        path: Routes.OfflineExceptionDatas,
        name: 'OfflineExceptionDatas',
        component: () => import('@/view/customerfund/OfflineExceptionDatas'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 异常入账线下数据详情
        path: Routes.OfflineExceptionDataDetails,
        name: 'OfflineExceptionDataDetails',
        component: () => import('@/view/customerfund/OfflineExceptionDataDetails'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 日常业务管理
        path: Routes.DailyBusinessManagement,
        name: 'DailyBusinessManagement',
        component: () => import('@/view/customerfund/DailyBusinessManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 结汇提现管理
        path: Routes.SettlementManagement,
        name: 'SettlementManagement',
        component: () => import('@/view/customerfund/SettlementManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 快速换汇管理
        path: Routes.FastExchangeManagement,
        name: 'FastExchangeManagement',
        component: () => import('@/view/customerfund/FastExchangeManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 快速换汇管理
        path: Routes.FinancialManagement,
        name: 'FinancialManagement',
        component: () => import('@/view/customerfund/FinancialManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 渠道配置
        path: Routes.ProductChannelManagement,
        name: 'ProductChannelManagement',
        component: () => import('@/view/customerfund/ProductChannelManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 节假日维护
        path: Routes.HolidayMaintenance,
        name: 'HolidayMaintenance',
        component: () => import('@/view/customerfund/HolidayMaintenance/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 预警管理
        path: Routes.EarlyWarningManagement,
        name: 'EarlyWarningManagement',
        component: () => import('@/view/customerfund/EarlyWarningManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 预警规则创建
        path: Routes.AddEarlyWarningManagement,
        name: 'EditEarlyWarningRules',
        component: () => import('@/view/customerfund/EarlyWarningManagement/EditEarlyWarningRules'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 预警规则编辑
        path: Routes.EditEarlyWarningManagement,
        name: 'EditEarlyWarningRules',
        component: () => import('@/view/customerfund/EarlyWarningManagement/EditEarlyWarningRules'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 汇路优化中间行配置
        path: Routes.OptimizationSetting,
        name: 'OptimizationSetting',
        component: () => import('@/view/customerfund/OptimizationSetting/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 记账协议/账户管理
        path: Routes.AccountingManagement,
        name: 'AccountingManagement',
        component: () => import('@/view/customerfund/BookingAuditManagement/index.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 资金调整操作记录
        path: Routes.BookingReviewDetail,
        name: 'BookingReviewDetail',
        props: (route) => ({ adjustmentReviewId: route.query['adjustment-review-id'] }),
        component: () => import('@/view/customerfund/BookingReviewDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //风控-退款申请
        path: Routes.RefundApplyList,
        name: 'RefundApplyList',
        component: () => import('@/view/customerfund/RefundAuditList'),
        props: { isAuditing: false },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //风控-退款审核详情
        path: Routes.RefundDetail,
        props: { isAuditing: false },
        name: 'RefundDetail',
        component: () => import('@/view/customerfund/RefundAuditDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //风控-退款申请
        path: Routes.RefundApply,
        name: 'RefundApply',
        component: () => import('@/view/customerfund/RefundApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-退款审核
        path: Routes.RefundAuditList,
        name: 'RefundAuditList',
        props: { isAuditing: true },
        component: () => import('@/view/customerfund/RefundAuditList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-退款审核详情
        path: Routes.RefundAuditDetail,
        name: 'RefundAuditDetail',
        props: { isAuditing: true },
        component: () => import('@/view/customerfund/RefundAuditDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-境内清分退票详情单独列表
        path: Routes.ClearfundDetail,
        name: 'ClearfundDetail',
        component: () => import('@/view/customerfund/ClearfundDetail'),
        props: (route) => {
          return ({ id: route.query.id })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-资金文件审核
        path: Routes.FunCheckDetail,
        name: 'FunCheckDetail',
        props: (route) => {
          return ({ id: route.query.id })
        },
        component: () => import('@/view/customerfund/FunCheckDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-快速换汇查询
        path: Routes.SpotFxPage,
        name: 'SpotFxPage',
        component: () => import('@/view/customerfund/SpotFxPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结汇代发处理
        path: Routes.ExchangeAgent,
        name: 'ExchangeAgent',
        component: () => import('@/view/customerfund/ExchangeAgent'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-渠道余额查询
        path: Routes.ChannelBalance,
        name: 'ChannelBalance',
        component: () => import('@/view/customerfund/ChannelBalance'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结汇渠道设置
        path: Routes.ExchangeChannel,
        name: 'ExchangeChannel',
        component: () => import('@/view/customerfund/ExchangeChannel'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结转
        path: Routes.CarryoverList,
        name: 'CarryoverList',
        component: () => import('@/view/customerfund/CarryoverList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结转申请
        path: Routes.CarryoverApply,
        name: 'CarryoverApply',
        component: () => import('@/view/customerfund/CarryoverApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结转详情
        path: Routes.CarryoverDetail,
        name: 'CarryoverDetail',
        component: () => import('@/view/customerfund/CarryoverDetail'),
        props: (route) => {
          return ({
            auditId: route.query.auditId
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结转审核
        path: Routes.CarryoverReviewList,
        name: 'CarryoverReviewList',
        component: () => import('@/view/customerfund/CarryoverReviewList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-结转审核详情
        path: Routes.CarryoverReviewDetail,
        name: 'CarryoverReviewDetail',
        component: () => import('@/view/customerfund/CarryoverReviewDetail'),
        props: (route) => {
          return ({
            auditReviewId: route.query.auditReviewId
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //客资-节假日维护
        path: Routes.HolidayMaintain,
        name: 'HolidayMaintain',
        component: () => import('@/view/customerfund/HolidayMaintain'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { //客资-极速到账设置
        path: Routes.SpeedAccountSetting,
        name: 'SpeedAccountSetting',
        component: () => import('@/view/customerfund/SpeedAccountSetting'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { //客资-额度管理中心
        path: Routes.QuotaManagementCenter,
        name: 'QuotaManagementCenter',
        component: () => import('@/view/customerfund/QuotaManagementCenter'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { //客资-额度管理详情
        path: Routes.QuotaManagementDetail,
        name: 'QuotaManagementDetail',
        props: (route) => ({ quotaId: route.query.quotaId }),
        component: () => import('@/view/customerfund/QuotaManagementDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 客资-额度管理-运营活动-额度详情
        path: Routes.QuotaActivityDetail,
        name: 'QuotaActivityDetail',
        props: (route) => ({ executorId: route.query.executorId }),
        component: () => import('@/view/customerfund/QuotaAuditDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 水位看板
        path: Routes.WaterLevelBoard,
        name: 'WaterLevelBoard',
        component: () => import('@/view/customerfund/WaterLevelBoard/WaterLevelBoard'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 审核界面（审核详情）
        path: Routes.WaterAuditDetail,
        name: 'WaterAuditDetail',
        props: (route) => ({ serviceProviderCode: route.query.serviceProviderCode, requestId: route.query.requestId }),
        component: () => import('@/view/customerfund/WaterLevelBoard/WaterAuditDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.AdjustWaterLevel,
        name: 'AdjustWaterLevel',
        props: (route) => ({ requestId: route.query.requestId, operation: route.query.operation }),
        component: () => import('@/view/customerfund/WaterLevelBoard/AdjustWaterLevel'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // TODO:权限要解除注释
      { // 渠道配置 -- 渠道管理 -- 渠道详情页
        path: Routes.ChannelManagementDetail,
        name: 'ChannelManagementDetail',
        props: (route) => ({ id: route.query.id }),
        component: () => import('@/view/customerfund/componentsOfChannelManagement/detail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // Leads管理
        path: Routes.MarketingLeadsManagement,
        name: 'MarketingLeadsManagement',
        component: () => import('@/view/customer/leads/LeadsManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 批量外呼任务列表
        path: Routes.OutboundTaskList,
        name: 'OutboundTaskList',
        component: () => import('@/view/customer/outbound/OutboundTaskList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 批量外呼任务详情
        path: Routes.OutboundTaskDetails,
        name: 'OutboundTaskDetails',
        component: () => import('@/view/customer/outbound/OutboundTaskDetails'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // CRM
        path: Routes.MarketingCrm,
        name: 'MarketingCrm',
        component: () => import('@/view/customer/crm/Crm'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // CRM  X拍档详情
        path: Routes.applyXPartnerDetail,
        name: 'applyXPartnerDetail',
        props: (route) => ({ crmId: route.query.crmId, firmIdInfo: route.query.firmIdInfo }),
        component: () => import('@/view/customer/crm/customer/ApplyXPartnerDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 渠道管理
        path: Routes.MarketingChannelManage,
        name: 'MarketingChannelManage',
        component: () => import('@/view/customer/channelManage/ManageTab'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 渠道 Leads
        path: Routes.MarketingPartnerLeadsManagement,
        name: 'MarketingPartnerLeadsManagement',
        component: () => import('@/view/customer/partnerLeads/PartnerLeadsManage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 融资
      { // 质押贷白名单
        path: Routes.LoansWhiteList,
        name: 'LoansWhiteList',
        component: () => import('@/view/financing/WhiteList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 产品管理
        path: Routes.ProductManagement,
        name: 'ProductManagement',
        component: () => import('@/view/financing/ProductManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 借贷查询
        path: Routes.BorrowingQuery,
        name: 'BorrowingQuery',
        component: () => import('@/view/financing/BorrowingQuery'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 贷款协议
        path: Routes.LoanAgreement,
        name: 'LoanAgreement',
        component: () => import('@/view/financing/LoanAgreement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 资金管理
        path: Routes.FundsManagement,
        name: 'FundsManagement',
        component: () => import('@/view/financing/FundsManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 保理池
        path: Routes.FactoringPool,
        name: 'FactoringPool',
        component: () => import('@/view/financing/FactoringPool'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 新闻资讯
      { // 新闻资讯
        path: Routes.News,
        name: 'News',
        component: () => import('@/view/marketing/news/MarketingNews'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 新增新闻
        path: Routes.NewsAdd,
        name: 'NewsAdd',
        component: () => import('@/view/marketing/news/NewsEditor'),
        props: (route) => {
          return ({
            isModify: false,
            newsId: route.query.id
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 新闻编辑
        path: Routes.NewsEdit,
        name: 'NewsEdit',
        component: () => import('@/view/marketing/news/NewsEditor'),
        props: (route) => {
          return ({
            isModify: true,
            newsId: route.query.id
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 新闻预览
        path: Routes.NewsDetail,
        name: 'NewsDetail',
        component: () => import('@/view/marketing/news/NewsDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //内容管理 -- 业务产品管理
        path: Routes.ContentManage,
        name: 'ContentManage',
        component: () => import('@/view/marketing/contentManage/ContentManage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //活动管理 -- 营销活动查询页面
        path: Routes.CampaignManage,
        name: 'CampaignManage',
        component: () => import('@/view/marketing/campaignManage/CampaignManage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //活动管理 -- 营销活动查询页面
        path: Routes.CampaignRecord,
        name: 'CampaignRecord',
        component: () => import('@/view/marketing/campaignManage/CampaignRecord'),
        props: (route) => {
          return ({
            promotionId: route.query.promotionId
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //内容管理 -- 业务产品详情列表
        path: Routes.PrudoctContent,
        name: 'PrudoctContent',
        component: () => import('@/view/marketing/contentManage/PrudoctContent'),
        props: (route) => {
          return ({
            title: route.query.title,
            clintType: route.query.clintType
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //内容管理v2 -- home
        path: Routes.ContentV2,
        name: 'ContentModule',
        component: () => import('@/view/marketing/contentV2/ContentModule'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //内容管理v2 -- page
        path: Routes.ContentV2Page,
        name: 'ContentPage',
        component: () => import('@/view/marketing/contentV2/ContentPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { //内容管理v2 -- content
        path: Routes.ContentV2Core,
        name: 'ContentCore',
        component: () => import('@/view/marketing/contentV2/ContentCore'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 卡券发放
        path: Routes.CouponGrantPage,
        name: 'CouponGrantPage',
        component: () => import('@/view/marketing/coupon/CouponGrantPage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 卡券发放审核
        path: Routes.CouponGrantAuditPage,
        name: 'CouponGrantAuditPage',
        component: () => import('@/view/marketing/coupon/CouponGrantAudit'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 卡券发放申请
        path: Routes.CouponGrantApply,
        name: 'CouponGrantApply',
        component: () => import('@/view/marketing/coupon/CouponGrantApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 卡券发放详情
        path: Routes.CouponGrantDetail,
        name: 'CouponGrantDetail',
        component: () => import('@/view/marketing/coupon/CouponGrantDetail'),
        props: (route) => {
          return ({
            auditId: route.query.auditId,
            isAudit: false
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 卡券发放详情审核
        path: Routes.CouponGrantAudit,
        name: 'CouponGrantAudit',
        component: () => import('@/view/marketing/coupon/CouponGrantDetail'),
        props: (route) => {
          return ({
            auditId: route.query.auditId,
            isAudit: true
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 合伙人计划
        path: Routes.PromotionPartner,
        name: 'PromotionPartner',
        component: () => import('@/view/marketing/promotion/PromotionPartner'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // Call Center
        path: Routes.CallCenter,
        name: 'CallCenter',
        component: () => import('@/view/marketing/callCenter/CallCenter'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 通话记录详情
        path: Routes.CallRecordDetail,
        name: 'CallRecordDetail',
        component: () => import('@/view/marketing/callCenter/CallRecordsDetail'),
        props: true,
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 营销短信或邮件
        path: Routes.MessageManagement,
        name: 'MessageManagement',
        component: () => import('@/view/tools/MessageManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 营销短信详情页
        path: Routes.MessageDetail,
        name: 'MessageDetail',
        component: () => import('@/view/tools/MessageDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // { // 营销产品化-执行器-编辑
      //   path: Routes.EditExecutor,
      //   name: 'EditExecutor',
      //   component: () => import('@/view/marketing/campaignManage/components/EditExecutor'),
      //   meta: {
      //     loginCheck: true,
      //     permissionCheck: true
      //   }
      // },
      // Scheduler
      { // 任务添加
        path: Routes.SchedulerAdd,
        name: 'SchedulerAdd',
        component: () => import('@/view/scheduler/SchedulerEdit'),
        props: (route) => {
          return ({
            isAdding: true,
            jobId: route.query.jobId
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 任务编辑
        path: Routes.SchedulerEdit,
        name: 'SchedulerEdit',
        component: () => import('@/view/scheduler/SchedulerEdit'),
        props: (route) => {
          return ({
            isAdding: false,
            jobId: route.query.jobId
          })
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 任务查询
        path: Routes.SchedulerList,
        name: 'SchedulerList',
        component: () => import('@/view/scheduler/SchedulerList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 任务监控
        path: Routes.SchedulerMonitor,
        name: 'SchedulerMonitor',
        component: () => import('@/view/scheduler/SchedulerMonitor'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 工具
      { // 发短信或邮件
        path: Routes.SendMessage,
        name: 'SendMessage',
        component: () => import('@/view/tools/SendMessage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 方法调用
        path: Routes.CallMethod,
        name: 'CallMethod',
        component: () => import('@/view/tools/CallMethodList'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 帮助中心
        path: Routes.HelpCenter,
        name: 'HelpCenter',
        component: () => import('@/view/tools/HelpCenter'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 通知重试
        path: Routes.NotificationRetry,
        name: 'NotificationRetry',
        component: () => import('@/view/notification/components/Notification'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // workflow重试
        path: Routes.workflow,
        name: 'workflow',
        component: () => import('@/view/notification/components/Workflow'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 存储管理
        path: Routes.StorageManage,
        name: 'StorageManage',
        component: () => import('@/view/storage/StorageManage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 坐席管理
        path: Routes.SeatMannage,
        name: 'SeatMannage',
        component: () => import('@/view/authority/callManagement/CallCenterManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 呼叫中心管理
        path: Routes.CallCenterManager,
        name: 'CallCenterManager',
        component: () => import('@/view/authority/callManagement/NewCallCenterManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // boss用户管理
        path: Routes.UserMannage,
        name: 'UserMannage',
        component: () => import('@/view/authority/UserMannage/UserMannage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // boss新增用户
        path: Routes.AddUser,
        name: 'AddUser',
        component: () => import('@/view/authority/UserMannage/AddUser'),
        meta: {
          loginCheck: true
        }
      }, { // boss修改用户
        path: Routes.ModifyUser,
        name: 'ModifyUser',
        props: true,
        component: () => import('@/view/authority/UserMannage/ModifyUser'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // boss用户组管理
        path: Routes.UserGroupManage,
        name: 'UserGroupManage',
        props: true,
        component: () => import('@/view/authority/UserGroupManage/GroupConfig'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 授权登陆用户端
        path: Routes.Oauth2Authorize,
        name: 'Oauth2Authorize',
        component: () => import('@/view/authority/UserMannage/Oauth2Authorize'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 角色管理
        path: Routes.RoleManage,
        name: 'RoleManage',
        props: (route) => ({ routeTabName: route.query.tabName, routeSubTabName: route.query.subTabName }),
        component: () => import('@/view/authority/ProductRoleConfig/ProductRoleConfig'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 操作日志
        path: Routes.OperationRecord,
        name: 'OperationRecord',
        component: () => import('@/view/authority/OperationRecord/OperationRecord'),
        meta: {
          loginCheck: true,
          permissionCheck: true // 开发设置为false
        }
      }, { // 角色创建之新增角色
        path: Routes.AddRole,
        name: 'AddRole',
        component: () => import('@/view/authority/RoleCreate/AddRole'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 角色创建之角色修改
        path: Routes.ModifyRole,
        name: 'ModifyRole',
        props: true,
        component: () => import('@/view/authority/RoleCreate/ModifyRole'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 权限管理
        path: Routes.PermissionMannage,
        name: 'PermissionMannage',
        component: () => import('@/view/authority/Permission/PermissionMannage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 新增权限
        path: Routes.AddPermission,
        name: 'AddPermission',
        component: () => import('@/view/authority/Permission/AddPermission'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 角色赋权
        path: Routes.ModifyPermission,
        name: 'ModifyPermission',
        props: true,
        component: () => import('@/view/authority/Permission/ModifyPermission'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        // 产品角色管理
        path: Routes.ProductRoleConfig,
        name: 'ProductRoleConfig',
        component: () => import('@/view/authority/ProductRoleConfig/ProductRoleConfig'),
        meta: {
          loginCheck: true
          // permissionCheck: true
        }
      }, { // 新增产品角色
        path: Routes.AddProductRole,
        name: 'AddProductRole',
        component: () => import('@/view/authority/UserMannage/AddProductRole'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 新增角色组
        path: Routes.AddRoleGroup,
        name: 'AddRoleGroup',
        component: () => import('@/view/authority/UserMannage/AddRoleGroup'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 内部审核
        path: Routes.InnerAudit,
        name: 'InnerAudit',
        component: () => import('@/view/authority/InnerAudit/AuditMannage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 客服菜单
      { // 配置账户入口列表
        path: Routes.SettingAccountIndex,
        name: 'SettingAccountIndex',
        component: () => import('@/view/service/SettingAccount/SettingAccountIndex'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 配置账户
        path: Routes.SettingAccountSetting,
        name: 'SettingAccountSetting',
        component: () => import('@/view/service/SettingAccount/SettingAccountSetting'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 账户详情
        path: Routes.SettingAccountDetail,
        name: 'SettingAccountDetail',
        component: () => import('@/view/service/SettingAccount/SettingAccountDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 账户复核
        path: Routes.AccountCheckIndex,
        name: 'AccountCheckIndex',
        component: () => import('@/view/finance/AccountCheck/AccountCheckIndex'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 账户复核详情
        path: Routes.AccountCheckDetail,
        name: 'AccountCheckDetail',
        component: () => import('@/view/finance/AccountCheck/AccountCheckDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 配置费率入口列表
        path: Routes.SettingRateIndex,
        name: 'SettingRateIndex',
        component: () => import('@/view/service/SettingRate/SettingRateIndex'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 配置费率详情
        path: Routes.SettingRateDetail,
        name: 'SettingRateDetail',
        component: () => import('@/view/service/SettingRate/SettingRateDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 费率详情
        path: Routes.FirmRateDetail,
        name: 'FirmRateDetail',
        component: () => import('@/view/service/SettingRate/FirmRateDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 配置费率
        path: Routes.SettingRateSetting,
        name: 'SettingRateSetting',
        component: () => import('@/view/service/SettingRate/SettingRateSetting'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 费率复核
        path: Routes.RateCheckIndex,
        name: 'RateCheckIndex',
        component: () => import('@/view/finance/RateCheck/RateCheckIndex'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 费率复核详情
        path: Routes.RateCheckDetail,
        name: 'RateCheckDetail',
        component: () => import('@/view/finance/RateCheck/RateCheckDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 服务补偿及其他收费
        path: Routes.ServerAndCharge,
        name: 'ServerAndCharge',
        component: () => import('@/view/customerservice/ServiceAndCharges/ServiceAndCharges'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        },
        props: {
          applyOrAudit: 'apply'
        }
      }, {
        path: Routes.ServerAndChargeAudit,
        name: 'ServerAndChargeAudit',
        component: () => import('@/view/customerservice/ServiceAndCharges/ServiceAndCharges'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        },
        props: {
          applyOrAudit: 'audit'
        }
      }, {
        path: Routes.ApplyServerAndCharge,
        name: 'ApplyServerAndCharge',
        component: () => import('@/view/customerservice/ServiceAndCharges/ApplyServiceAndCharges'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.DetailServerAndCharge,
        name: 'DetailServerAndCharge',
        component: () => import('@/view/customerservice/ServiceAndCharges/DetailServiceAndCharges'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        },
        props: (route) => ({ compensationId: route.query.compensationId })
      }, {
        path: Routes.ReviewServerAndCharge,
        name: 'ReviewServerAndCharge',
        component: () => import('@/view/customerservice/ServiceAndCharges/ReviewServiceAndCharges'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        },
        props: (route) => ({ compensationId: route.query.compensationId })
      }, { // 客服工单
        path: Routes.CustomerServiceOrder,
        name: 'CustomerServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/ServiceOrder'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 销售工单
        path: Routes.SaleServiceOrder,
        name: 'SaleServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/SaleServiceOrder'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 创建客户客服工单
        path: Routes.CreateCustomerServiceOrder,
        name: 'CreateCustomerServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/NewCreateOrder'),
        props: (route) => ({ firmId: route.query.firmId, userId: route.query.userId, callInfo: route.query }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, //CreateCustomerServiceOrderV2
      { // 创建客户客服工单 - v2
        path: Routes.CreateCustomerServiceOrderV2,
        name: 'CreateCustomerServiceOrderV2',
        component: () => import('@/view/customerservice/serviceOrder/NewCreateOrderV2'),
        props: (route) => ({
          isRegistered: route.query.isRegistered !== 'false',
          firmId: route.query.firmId,
          userId: route.query.userId,
          callInfo: route.query,
          mode: route.query.mode,
          orderId: route.query.orderId
        }),
        meta: {
          loginCheck: true,
          permissionCheck: false // >>> mock
        }
      }, { // 编辑客户客服工单
        path: Routes.EditOrViewCustomerServiceOrder,
        name: 'EditOrViewCustomerServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/EditCustomerOrder'),
        props: (route) => ({ orderId: route.query.orderId, viewDetail: route.query.viewDetail }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 查看客户客服工单
        path: Routes.ViewCustomerServiceOrder,
        name: 'ViewCustomerServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/EditCustomerOrder'),
        props: (route) => ({ orderId: route.query.orderId, viewDetail: true, mode: route.query.mode }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 服务工单详情
        path: Routes.ServiceOrderDetail,
        name: 'ServiceOrderDetail',
        component: () => import('@/view/customer/crm/serviceOrder/ServiceOrderDetail'),
        props: (route) => ({ userId: route.query.userId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 流程工单
        path: Routes.ProcessOrder,
        name: 'ProcessOrder',
        component: () => import('@/view/customerservice/ProcessOrder/ProcessOrder.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 流程工单详情
        path: Routes.ProcessOrderDetail,
        name: 'ProcessOrderDetail',
        component: () => import('@/view/customerservice/ProcessOrder/ProcessOrderDetail.vue'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 工单配置
        path: Routes.OrderConfiguration,
        name: 'OrderConfiguration',
        component: () => import('@/view/customerservice/OrderConfiguration/OrderConfiguration'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 付款人/买家/第三方名单 -> 添加监控名单
        path: Routes.AddMonitor,
        name: 'AddMonitor',
        component: () => import('@/view/auditing/BlackListModal/MonitorForm'),
        props: (route) => ({ type: route.query.type }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 付款人/买家/第三方名单 -> 查看监控名单
        path: Routes.ViewMonitor,
        name: 'ViewMonitor',
        component: () => import('@/view/auditing/BlackListModal/MonitorDetail'),
        props: (route) => ({ nameId: route.query.nameId, type: route.query.type }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 付款人/买家/第三方名单 -> 编辑监控名单
        path: Routes.EditMonitor,
        name: 'EditMonitor',
        component: () => import('@/view/auditing/BlackListModal/MonitorForm'),
        props: (route) => ({ nameId: route.query.nameId, isEdit: true, type: route.query.type }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // FX定价
        path: Routes.FxRateSetting,
        name: 'FxRateSetting',
        component: () => import('@/view/customerfund/FxRateSetting'),
        meta: {
          loginCheck: true,
          permissionCheck: true,
          keepAlive: true
        }
      }, { // 账户部分金额冻结记录详情
        path: Routes.FreezingAccountBalanceDetail,
        name: 'FreezingAccountBalanceDetail',
        props: (route) => ({ fundFreezeRequestId: route.query.id }),
        component: () => import('@/view/account/operation/FreezingAccountBalanceDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
          // keepAlive: true
        }
      }, { // 业务申请 - 权限申请列表
        path: Routes.BusiPermissionMannage,
        name: 'busiPermissionMannage',
        component: () => import('@/view/businessApply/permissionApply/PermissionMannage'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 业务申请 - 企微账号申请
        path: Routes.BusiWxAcctApply,
        name: 'BusiWxAcctApply',
        component: () => import('@/view/businessApply/permissionApply/BusiWxAcctApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // { // 业务申请审核
      //   path: Routes.ApplicationReview,
      //   name: 'ApplicationReview',
      //   component: () => import('@/view/businessApply/busApplication/ApplicationReview'),
      //   meta: {
      //     loginCheck: true,
      //     permissionCheck: true
      //   }
      // },
      { // 业务申请
        path: Routes.BusiPermissionApply,
        name: 'BusiPermissionApply',
        component: () => import('@/view/businessApply/permissionApply/PermissionApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 用户角色复制申请
        path: Routes.PermissionRoleApply,
        name: 'BusiPermissionRoleApply',
        component: () => import('@/view/businessApply/permissionApply/PermissionRoleApply'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 用户申请审核详情
        path: Routes.ApplicationReviewDetail,
        name: 'ApplicationReviewDetail',
        component: () => import('@/view/businessApply/busApplication/ApplicationReviewDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 客资调拨
        path: Routes.FinancialTransfer,
        name: 'FinancialTransfer',
        component: () => import('@/view/customerfund/FinancialTransfer'),
        meta: {
          loginCheck: true,
          permissionCheck: true // 开发使用
        }
      }, { // 客资-客资审核管理-详情
        path: Routes.FinancialTransferAudit,
        name: 'FinancialTransferAudit',
        component: () => import('@/view/customerfund/BookingAuditManagement/FinancialTransferAudit'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 审核详情-理财管理
        path: Routes.FinancialReview,
        name: 'FinancialReview',
        component: () => import('@/view/customerfund/components/FinancialReview'),
        props: (route) => ({ template: route.query.template, id: route.query.id }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 审核详情模版
        path: Routes.AuditConfigTabs,
        name: 'AuditConfigTabs',
        component: () => import('@/view/auditing/auditAutoConfig/AuditConfigTabs'),
        props: (route) => ({ template: route.query.template, id: route.query.id }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 商机管理
        path: Routes.BusinessOpportunity,
        name: 'BusinessOpportunity',
        component: () => import('@/view/marketing/businessOpportunity/BusinessOpportunity'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 商机详情
        path: Routes.BusinessOpportunityDetail,
        name: 'BusinessOpportunityDetail',
        component: () => import('@/view/marketing/businessOpportunity/BusinessOpportunityDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 商机工单详情
        path: Routes.BusinessServiceOrder,
        name: 'BusinessServiceOrder',
        component: () => import('@/view/customerservice/serviceOrder/BusinessServiceOrder'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 运维工具-渠道路由
        path: Routes.ChannelRoute,
        name: 'ChannelRoute',
        component: () => import('@/view/tools/channelRoute/ChannelRoute'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, { // 运维工具-渠道路由审核列表
        path: Routes.ChannelRouteAudit,
        name: 'ChannelRouteAudit',
        component: () => import('@/view/tools/channelRoute/ChannelRoute'),
        props: {
          isAuditing: true
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 运维工具-渠道路由配置
      {
        path: Routes.ChannelRouteConfig,
        name: 'ChannelRouteConfig',
        component: () => import('@/view/tools/channelRoute/ChannelRouteConfig'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 运维工具-渠道路由配置审核
      {
        path: Routes.ChannelRouteAuditDetail,
        name: 'ChannelRouteAuditDetail',
        component: () => import('@/view/tools/channelRoute/ChannelRouteAuditDetail'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.UrgentConfig,
        name: 'UrgentConfig',
        component: () => import('@/view/operate/UrgentConfig'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 运营 - 通知模版管理
      {
        path: Routes.NotificationTemplateManagement,
        name: 'NotificationTemplateManagement',
        component: () => import('@/view/operate/NotificationTemplateManagement'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.MessageTemplatePage,
        name: 'MessageTemplatePage',
        component: () => import('@/view/operate/MobileMessage/MessageTemplatePage'),
        props: (route) => ({ scene: route.query.scene, operation: route.query.operation, templateId: route.query.templateId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.WechatTemplatePage,
        name: 'WechatTemplatePage',
        component: () => import('@/view/operate/WechatNotification/WechatTemplatePage'),
        props: (route) => ({ scene: route.query.scene, operation: route.query.operation, templateId: route.query.templateId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.AppTemplatePage,
        name: 'AppTemplatePage',
        component: () => import('@/view/operate/AppNotification/AppTemplatePage'),
        props: (route) => ({ scene: route.query.scene, operation: route.query.operation, templateId: route.query.templateId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.MailTemplatePage,
        name: 'MailTemplatePage',
        component: () => import('@/view/operate/MailNotification/MailTemplatePage'),
        props: (route) => ({ scene: route.query.scene, operation: route.query.operation, templateId: route.query.templateId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.NotificationAuditing,
        name: 'NotificationAuditing',
        component: () => import('@/view/operate/NotificationAuditing'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.TemplateAuditing,
        name: 'TemplateAuditing',
        component: () => import('@/view/operate/TemplateAuditing/TemplateAuditing'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, {
        path: Routes.TemplateAuditingPage,
        name: 'TemplateAuditing',
        component: () => import('@/view/operate/TemplateAuditing/TemplateAuditingPage'),
        props: (route) => ({ scene: route.query.scene, operation: route.query.operation, templateId: route.query.templateId, operateRequestId: route.query.operateRequestId }),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 财务-权益包-退款审核列表
      {
        path: Routes.WithDrawCheck,
        name: 'WithDrawCheck',
        component: () => import('@/view/account/AccountWithdraw'),
        props: {
          type: 'audit'
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, // 财务-权益包-退款审核
      {
        path: Routes.WithDrawCheckDetail,
        name: 'WithDrawCheckDetail',
        component: () => import('@/view/finance/WithDrawCheck/WithDrawCheckDetail'),
        props: {
          type: 'audit'
        },
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }, /**
       * 运营
       */
      // 运营 -- 加急配置
      {
        path: Routes.UrgentConfig,
        name: 'UrgentConfig',
        component: () => import('@/view/operate/UrgentConfig'),
        meta: {
          loginCheck: true,
          permissionCheck: true
        }
      }]
    },
    {
      path: '*',
      alias: '/404',
      name: '404',
      component: () => import('@/view/error/404'),
      meta: {
        loginCheck: true,
        permissionCheck: false
      }
    }]
})

router.beforeEach((to, from, next) => {
  const isToLogin = !!~to.path.indexOf('login')
  const redirectUri = isToLogin ? '' : `/boss2${processRouterQueryToUrl(to)}`

  if (!to.meta.loginCheck) {
    next()
    return
  }

  if (!to.meta.permissionCheck) {
    next()
    return
  }

  store.dispatch(userActions.CHECK_PERMISSION, {
    path: to.path.startsWith('/crm') ? to.path : `/boss${to.path}`,
    next,
    redirectUri
  })
})

router.beforeResolve((to, from, next) => {
  Bounce.hide()
  next()
})

router.afterEach((to, from) => {
  if (to.meta.loginCheck) {
    store.dispatch(userActions.USER_PROFILE)
  }
})

export default router

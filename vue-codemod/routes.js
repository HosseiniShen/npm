export const Root = '/boss2'
export const Login = '/login'
export const SecondLogin = '/second-login'
export const SecondaryVerification = '/secondary-verification'
export const ResetPassword = '/reset-passward'
export const Logout = '/logout'

/* ===== External ===== */
export const ExternalHome = '/external'

/* ===== CRM ===== */

export const CrmHome = '/crm'

export const Customers = `${CrmHome}/customers`

/* ===== Leads ===== */
export const LeadsManagement = `${CrmHome}/leads`

export const LeadsManager = `${CrmHome}/leads/manager` // leads 管理员

export const LeadsPrincipal = `${CrmHome}/leads/principal` // leads 负责人

export const LeadsAddition = `${CrmHome}/leads/addition`

export const PartnerLeadsAddition = `${CrmHome}/partner-leads/addition`

export const CrmLeadsCallCenter = `${CrmHome}/call-records`

export const CrmSaleServiceOrder = `${CrmHome}/sale/order`
export const CrmEditOrViewCustomerServiceOrder = `${CrmHome}/customerservice/edit-customer-service-order`
export const CrmViewCustomerServiceOrder = `${CrmHome}/customerservice/customer-service-order-detail`

export const CrmMap = `${CrmHome}/map`

//授权登陆用户端
export const CrmOauth2Authorize = `${CrmHome}/oauth2/authorize`

// 我的合伙人
export const MyPartner = `${CrmHome}/my-partner`
// 企微账号申请
export const BusiWxAcctApplyOne = `${CrmHome}/business/permissionApply/BusiWxAcctApply`

// 渠道Leads
export const CrmPartnerLeads = `${CrmHome}/partner-leads`

//签约小渠道
export const TopRunnerChannelManage = `${CrmHome}/top-runner/channel-manage`
//权限申请
export const CrmBusiPermissionMannage = `${CrmHome}/business/permissionApply/busiPermissionMannage`
export const CrmBusiPermissionApply = `${CrmHome}/business/permissionApply/BusiPermissionApply`
export const CrmPermissionRoleApply = `${CrmHome}/business/permissionApply/permissionRoleApply`
export const CrmApplicationReviewDetail = `${CrmHome}/business/busApplication/applicationReviewDetail`

export const Home = '/'
export const HomeAlias = '/home'

export const PermissionDenied = '/denied'

// pdf view page
export const PdfViewPage = '/pdf-view'

/* =====账户===== */

//账户查询
export const AccountTop = '/accountop'
//账户退款 -- 权益包
export const AccountWithdraw = '/accountWithdraw'
//账户退款复核 -- 权益包
export const WithDrawCheckDetail = '/withDrawCheckDetail'

//创建工单
export const CreateOrder = '/createrequest'
//账户操作
export const AccountOperation = '/doaccountopbyfirmid'
//权益包 -- 账户退款
export const WithDrawCheck = '/withDrawCheck'
//合同详情
export const ContractInfo = '/contractinfo'
//合同编辑
export const ContractEdit = '/contractedit'

/* =====账户===== */

/* =====风控===== */
//数据中心
export const DataCenter = '/data-center'
//汇款记录
export const PayRecords = '/pay-record'

//工单查询
export const AuditingItems = '/auditing-items'

//工单审核
export const AuditingRequest = '/auditing'
//评分卡配置
export const ScoreCard = '/scorecard'
//评分卡审核页面
export const ScoreCardAudit = '/scorecard-audit'
//认证报告审核页面
export const CertificationReport = '/certification-report'
//dowjones审核结果页
export const DowjonesResult = '/dowjones'
//平台商户名单
export const ImportPage = '/gotoimportpage'
//借贷平台合同查询
export const DebtContracts = '/debtcontracts'
//白名单
export const WhiteListPage = '/whitelistpage'
//白名单详情
export const WhiteListDetail = '/whitelistpage/detail'
//黑名单
export const BlackListPage = '/gotoblacklist'
//退款申请列表
export const RefundApplyList = '/refund/list'
//退款审核详情
export const RefundDetail = '/refund/detail/:requestId'
//退款申请
export const RefundApply = '/refund/apply'
//风控策略
export const RiskControlStrategy = '/riskControlStrategy'
// 标签管理
export const LabelManagement = '/labelManagement'
// 风铃审核详情
export const RingBellAuditingPage = '/queryFirmInfoChangeDetail'

/* =====风控===== */

/* =====客资===== */

//结汇申报处理
export const SettlementReportPage = '/settlementreportpage'
export const SettlementFileDetail = '/settlement-file-detail'
export const SettlementBatchDetail = '/settlement-batch-detail'

//结汇申报处理/按批次号查询
export const ReportContract = '/gotoreportcontract'
//异常VA
export const IncomingRecords = '/incomingRecords'
//异常VA详情
export const IncomingRecord = '/incomingRecord/:id'
//异常数据处理
export const ExceptionDatas = '/exceptionDatas'
//异常数据处理审核
export const ExceptionDatasAudit = '/exceptionDatas/audit'
//va report创建
export const VAReportCreate = '/VAReportCreate'
//异常VA详情
export const ExceptionData = '/exceptionData/:id'
//异常VA审核
export const ExceptionDataAudit = '/exceptionData/audit/:id'
//汇路优化中间行配置
export const IntermediaryAgentMappingPage = '/intermediary-agent-mapping-page'
//资金调整
export const BookingClearings = '/booking-clearings'
//资金调整详情
export const BookingClearing = '/booking-clearing'
//业务调整
export const BookingTxns = '/booking-txns'
//业务调整明细
export const BookingTxn = '/booking-txn'
//资金调整审核
export const BookingReviewList = '/booking-review-list'

//异常入账线下数据列表
export const OfflineExceptionDatas = '/offline-exception-datas'

//异常入账线下数据详情
export const OfflineExceptionDataDetails = '/offline-exception-data-details'

// 客资审核管理
// export const BookingAuditManagement = '/booking-audit-management'
//资金调整操作记录
export const BookingReviewDetail = '/booking-review-detail'
//退款审核
export const RefundAuditList = '/refund/audit/list'
//退款审核详情
export const RefundAuditDetail = '/refund/audit/detail/:requestId'
//境内清分退票审核
export const ClearfundDetail = '/refund/ClearDetail/page'
//创建资金文件审核
export const FunCheckDetail = '/refund/FunCheckDetail/page'
//快速换汇查询
export const SpotFxPage = '/spotfx-page'
//结汇代发处理
export const ExchangeAgent = '/exchange-agent'
//渠道余额查询
export const ChannelBalance = '/channel-balance-list'
//结汇渠道设置
export const ExchangeChannel = '/exchange-channel'
//结转
export const CarryoverList = '/carryover-list'
//结转申请
export const CarryoverApply = '/carryover'
//结转详情
export const CarryoverDetail = '/carryover-detail'
//结转审核
export const CarryoverReviewList = '/carryover-review-list'
//结转审核详情
export const CarryoverReviewDetail = '/carryover-review-detail'
//节假日维护
export const HolidayMaintain = '/holiday-maintain'
//极速到账设置
export const SpeedAccountSetting = '/speed-account-setting'
//额度管理中心
export const QuotaManagementCenter = '/quota-management-center'
export const QuotaManagementDetail = '/quota-management-detail'

// 额度调整审核页面
export const QuotaManagementAdjust = '/quota-management-center/adjust/list'
export const QuotaActivityDetail = '/quota-management-center/quota-activity-detail'

// 水位看板 -------------
export const WaterLevelBoard = '/water-level-board'
// 水位调整（审核）
export const WaterAuditList = '/water-audit-list'
// 审核页面（审核详情）
export const WaterAuditDetail = '/water-audit-detail'
// 调整水位页面
export const AdjustWaterLevel = '/adjust-water-level'
// -----------
// 渠道配置 -- 渠道管理 -- 渠道详情页
export const ChannelManagementDetail = '/product-channel-management/detail'

/* =====客资===== */

/* =====融资=====start====*/
// 质押贷白名单
export const LoansWhiteList = '/financing/white-list'
// 产品管理
export const ProductManagement = '/financing/product-management'
// 贷款协议
export const LoanAgreement = '/financing/loan-agreement'
// 借贷查询
export const BorrowingQuery = '/financing/borrowing-query'
// 资金管理
export const FundsManagement = '/financing/funds-management'
// 保理池
export const FactoringPool = '/financing/factoring-pool'
/* =====融资=====end======*/

/* =====营销===== */

//渠道 Leads
export const MarketingPartnerLeadsManagement = '/marketing-partner/partner-leads'

//Leads管理
export const MarketingLeadsManagement = '/marketing-leads/leads'
//任务列表
export const OutboundTaskList = '/marketing-outbound/task-list'
// 任务详情
export const OutboundTaskDetails = '/marketing-outbound/task-details'
//CRM 管理
export const MarketingCrm = '/marketing-crm/customers'
//CRM X拍档详情页
export const applyXPartnerDetail = '/marketing-crm/customers/applyXPartnerDetail'
//渠道管理
export const MarketingChannelManage = '/marketing-crm/channel-manage'
//新闻资讯
export const News = '/marketing-news'
//新增新闻
export const NewsAdd = '/marketing-news-add'
//新闻编辑
export const NewsEdit = '/marketing-news-edit'
//新闻预览
export const NewsDetail = '/marketing-news-view'
//内容管理 - 产品列表
export const ContentManage = '/contentManage-page'
//内容管理 - 产品列表详情
export const PrudoctContent = '/contentManage-page/PrudoctContent'

//活动管理 - 活动页面
export const CampaignManage = '/campaign-manage'

//活动管理 - 活动页面
export const CampaignRecord = '/campaign-manage/campaign-record'

//内容管理v2 - 模块列表
export const ContentV2 = '/contentv2'
//内容管理v2 - 页面列表
export const ContentV2Page = '/contentv2/page'
//内容管理v2 - 内容列表
export const ContentV2Core = '/contentv2/core'
//卡券发放
export const CouponGrantPage = '/coupon-grant-page'
//卡券发放审核
export const CouponGrantAuditPage = '/coupon-grant-audit-page'
//卡券发放申请
export const CouponGrantApply = '/coupon-grant-apply'
//卡券发放详情
export const CouponGrantDetail = '/coupon-grant-detail'
//卡券发放详情-审核
export const CouponGrantAudit = '/coupon-grant-audit'
//合伙人计划
export const PromotionPartner = '/promotion-partner'
//营销短信或邮件
export const MessageManagement = '/message-management'
//营销短信详情页
export const MessageDetail = '/message-detail/:batchCode'
// Call Center 通话记录
export const CallCenter = '/call-center'
// Call Center 通话记录详情
export const CallRecordDetail = '/call-center-detail/:callCenterId'
// 商机管理
export const BusinessOpportunity = '/business-opportunity'

export const BusinessOpportunityDetail = '/business-opportunity-detail'

// export const EditExecutor = '/edit-executor'

/* =====营销===== */

/* =====运维工具===== */

//任务添加
export const SchedulerAdd = '/scheduler-jobs/add'
//任务编辑
export const SchedulerEdit = '/scheduler-jobs/edit'
//任务查询
export const SchedulerList = '/scheduler-jobs/list'
//任务监控
export const SchedulerMonitor = '/scheduler-jobs/monitor'
//发短信或邮件
export const SendMessage = '/send-message-view'
//方法调用
export const CallMethod = '/doopt'
//帮助中心
export const HelpCenter = '/help-center/upload-file'
//通知服务
export const NotificationRetry = '/notification/retry'
//workflow重试
export const workflow = '/workflow/retry'
//存储管理
export const StorageManage = '/storage/manage'

/* =====运维工具===== */

/* =====用户权限管理===== */

// 坐席管理
export const SeatMannage = '/seat/seat-management'
//授权登陆用户端
export const Oauth2Authorize = '/user/oauth2/authorize'
//用户管理
export const UserMannage = '/user/user'
//boss新增用户
export const AddUser = '/user/add/user'
//boss修改用户
export const ModifyUser = '/user/modify/user/:id'
//boss用户组管理
export const UserGroupManage = '/user/group'
//角色管理
export const RoleManage = '/user/role'
//角色创建之新增角色
export const AddRole = '/user/add/role'
//角色创建之角色修改
export const ModifyRole = '/user/modify/role/:id'
//权限管理
export const PermissionMannage = '/user/permission'
//新增权限
export const AddPermission = '/user/add/permission'
//用户赋权
export const ModifyPermission = '/user/modify/permission/:id'
//内部审核
export const InnerAudit = '/inner-audit/list'
//产品角色管理
export const ProductRole = '/user/ProductRole/list'
//新增产品角色
export const AddProductRole = '/user/ProductRole/add'
//产品角色配置
export const ProductRoleConfig = '/user/ProductRoleConfig/tabs'
// 新增角色组
export const AddRoleGroup = '/user/RoleGroup/add'
// 操作日志
export const OperationRecord = '/user/OperationRecord/list'

/* =====用户权限管理===== */

/* =====客服===== */

//配置账户入口列表
export const SettingAccountIndex = '/service/setting-account'
//配置账户
export const SettingAccountSetting = '/service/setting-account/setting'
//配置账户详情
export const SettingAccountDetail = '/service/setting-account/detail'
//账户复核
export const AccountCheckIndex = '/finance/account-check'
//账户复核详情
export const AccountCheckDetail = '/finance/account-check/detail'
//配置费率入口列表
export const SettingRateIndex = '/service/setting-rate'
//配置费率详情
export const SettingRateDetail = '/service/setting-rate/detail'
//费率详情
export const FirmRateDetail = '/service/firm-rate/detail'
//配置费率
export const SettingRateSetting = '/service/setting-rate/setting'
//费率复核
export const RateCheckIndex = '/finance/rate-check'
//费率复核详情
export const RateCheckDetail = '/finance/rate-check/detail'
//服务补偿及其他收费
export const ServerAndCharge = '/server-charge'
//
export const ServerAndChargeAudit = '/server-charge-audit'
//
export const ApplyServerAndCharge = '/apply-server-charge'
//
export const DetailServerAndCharge = '/server-charge-detail'
//
export const ReviewServerAndCharge = '/server-charge-review'
//客服工单
export const CustomerServiceOrder = '/customerservice/order'

export const SaleServiceOrder = '/sale/order'

// 创建客户客服工单
export const CreateCustomerServiceOrder = '/customerservice/create-customer-service-order'
// 创建客户客服工单V2
export const CreateCustomerServiceOrderV2 = '/customerservice/create-customer-service-order-v2'

// 编辑客户客服工单
export const EditOrViewCustomerServiceOrder = '/customerservice/edit-customer-service-order'
// 查看客户客服工单
export const ViewCustomerServiceOrder = '/customerservice/customer-service-order-detail'

// 商机工单详情
export const BusinessServiceOrder = '/customerservice/business-service-order-detail'

//服务工单详情
export const ServiceOrderDetail = '/customerservice/service-order-detail'

//创建未注册客户客服工单
// export const CreateUnregisteredOrder = '/customerservice/create-unregistered-order'
//编辑未注册客户客服工单
// export const EditUnregisteredOrder = '/customerservice/edit-unregistered-order'
//未注册客户客服工单详情
// export const UnregisteredOrderDetail = '/customerservice/unregistered-order-detail'
//创建已注册客户客服工单
// export const CreateRegisteredServiceOrder = '/customerservice/createregisteredorder'
//查看已注册客户客服工单
// export const RegisteredOrderDetail = '/customerservice/registered-order-detail'
//编辑已注册客户客服工单
// export const EditRegisteredServiceOrder = '/customerservice/edit-registered-order'
//工单配置
export const OrderConfiguration = '/customerservice/orderconfiguration'
// 流程工单
export const ProcessOrder = '/customerservice/process-order'
// 流程工单详情
export const ProcessOrderDetail = '/customerservice/process-order-detail'

/* =====客服===== */

// 付款人/买家/第三方名单监控名单
export const ListMonitor = '/monitor-list/list'
export const AddMonitor = '/monitor-list/add'
export const EditMonitor = '/monitor-list/edit'
export const ViewMonitor = '/monitor-list/view'
// 客资-FX定价
export const FxRateSetting = '/fx-rate-setting'

// BOSS客资功能整合
export const DailyBusinessManagement = '/daily-business-management'
export const BookingAuditManagement = '/booking-audit-management'
export const SettlementManagement = '/settlement-management'
export const FastExchangeManagement = '/fast-exchange-management'
export const FinancialManagement = '/financial-management'
export const ProductChannelManagement = '/product-channel-management'
export const HolidayMaintenance = '/holiday-maintenance'
export const OptimizationSetting = '/optimization-setting'
export const AccountingManagement = '/accounting-management'
export const EarlyWarningManagement = '/early-warning-management'

//添加预警规则 -- 页面
export const AddEarlyWarningManagement = '/earlyWarningRules'
// 编辑预警规则 -- 页面
export const EditEarlyWarningManagement = '/earlyWarningRules/:product'

// 账户部分金额冻结记录详情
export const FreezingAccountBalanceDetail = '/freezing-account-balance/detail'

// 初始化通话组件
export const CallComponentInt = '/call_center_component/init'

// leads 管理员
export const LeadsManagerPage = '/crm/leads/manager'

// leads 负责人
export const LeadsPrincipalPage = '/crm/leads/principal'

// 查询Risk工作流
export const RiskWorkflowQuery = '/risk/workflow/query'

// 查询Risk工作流详情
export const RiskWorkflowDetail = '/risk/workflow/detail'

//地图
export const map = '/map'

/* =====业务申请===== */
export const BusiPermissionMannage = '/business/permissionApply/busiPermissionMannage'
export const BusiWxAcctApply = '/business/permissionApply/BusiWxAcctApply'
export const ApplicationReview = '/business/busApplication/applicationReview'
export const BusiPermissionApply = '/business/permissionApply/BusiPermissionApply'
export const PermissionRoleApply = '/business/permissionApply/permissionRoleApply'
export const ApplicationReviewDetail = '/business/busApplication/applicationReviewDetail'
//呼叫中心
export const CallCenterManager = '/call_center_manager'

//客资调拨
export const FinancialTransfer = '/financialTransfer'

//客资-客资审核管理-调拨审核详情
export const FinancialTransferAudit = '/financialTransferAudit'
//理财审核详情
export const FinancialReview = '/financialReview'

//风控-自动工单配置
export const AuditConfigTabs = '/auditConfigTabs'
// 运维工具--渠道路由
export const ChannelRoute = '/channelRoute/list'
export const ChannelRouteAudit = '/channelRoute/audit'
export const ChannelRouteConfig = '/channelRoute/config'
export const ChannelRouteAuditDetail = '/channelRoute/auditDetail'

// 运营 - 加急配置
export const UrgentConfig = '/urgent/config'
// 运营 - 表单构建
export const FormBuildTools = '/operation/formBuild'
export const FormManage = '/operation/form-manage'

// 运营 - 通知模版管理
export const NotificationTemplateManagement = '/notification-template-management'
// 运营 - 通知模版管理 - 短信首页
export const MobileMessageIndex = '/mobile-message-index'
// 运营 - 通知模版管理 - 短信模版页
export const MessageTemplatePage = '/message-template-page'
// 运营 - 通知模版管理 - 微信模版页
export const WechatTemplatePage = '/wechat-template-page'
// 运营 - 通知模版管理 - app push模版页
export const AppTemplatePage = '/app-template-page'
// 运营 - 通知模版管理 - 邮件模版页
export const MailTemplatePage = '/mail-template-page'

// 运营 - 通知审核
export const NotificationAuditing = '/notification-auditing'
// 运营 - 通知审核 - 模版审核
export const TemplateAuditing = '/template-auditing'
// 运营 - 通知审核 - 模版审核详情页
export const TemplateAuditingPage = '/template-auditing-page'

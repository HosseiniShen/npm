"\n<div class=\"sale-backhost\">\n    <el-tabs v-model=\"activeName\" type=\"card\" @tab-click=\"handleTabClick\">\n        <el-tab-pane v-if=\"authPoster\" label=\"转介绍海报\" name=\"post\"> \n            <div class=\"title-box\">\n                <div v-if=\"![2,3].includes(userState)\">\n                    {{ $route.query.userName || 'xx' }}同学的专属转介绍海报已生成，您可以点击海报下方按钮下载海报发送给学生家长\n                </div>\n                <div v-if=\"![2,3].includes(userState)\">\n                    <el-button @click=\"showDialog(1, 'https://mp.weixin.qq.com/s/RytSURk8FsymDTbzrMirPg')\" plain type=\"primary\" size=\"small\">转介绍示范</el-button>\n                </div>\n                <div v-if=\"userState === 3\" class=\"title-line\">\n                    <i class=\"el-icon-info font-blue\"></i>升年级用户，无法参加少儿转介绍活动\n                </div>\n                <div v-if=\"userState === 2\">\n                    可参与亲友礼包活动，将下方链接发给用户，用户点击进入，可邀请好友，成功注册后，获得对应彩虹币奖励（相当于0.5节直播课）\n                </div>\n            </div>\n            <div class=\"active-link-wrap\" v-if=\"userState === 2\">\n                <el-row :gutter=\"24\" type=\"flex\">\n                    <el-col v-if=\"showHonourPoster\" :span=\"12\" class=\"copy-button\">\n                        <div class=\"title\">荣誉校长</div>\n                        <el-carousel :initial-index=\"0\" :loop=\"false\" @change=\"changeImg\" arrow=\"always\" indicator-position=\"none\" trigger=\"click\" :autoplay=\"false\" height=\"596px\">\n                            <el-carousel-item v-for=\"(item,index) in postArr\" :key=\"item.experimentId+ index\">\n                                <el-image\n                                    style=\"width: 390px;height: 596px;display: block;margin: 0 auto;\"\n                                    :src=\"item.poster\"\n                                    fit=\"cover\"></el-image>\n                            </el-carousel-item>\n                        </el-carousel>\n                        <el-col :offset=\"8\">\n                            <a @click=\"handleDownloadPoster\">\n                                <el-button  type=\"primary\" size=\"small\">下载海报</el-button>\n                            </a>\n                        </el-col>\n                    </el-col>\n\n                    <el-col :span=\"12\" class=\"copy-button\">\n                        <div v-if=\"showHonourPoster\" style=\"margin-top: -22px;\">\n                            <el-row :gutter=\"24\" type=\"flex\">\n                            <div class=\"copy-content\">\n                                <span v-html=\"shareText[0]\"></span>\n                                <el-button @click=\"changeCopyContent\" plain icon=\"el-icon-refresh\" size=\"small\">换一个</el-button>\n                            </div>\n                            </el-row>\n                            <el-row :gutter=\"24\" type=\"flex\">\n                                <el-col class=\"copy-button\">\n                                    <el-button type=\"primary\"\n                                    @click=\"handleCopyText\"\n                                    v-clipboard:copy=\"shareText[1]\"\n                                    v-clipboard:success=\"onCopySuccess\"\n                                    v-clipboard:error=\"onCopyError\"\n                                    size=\"small\">复制转发语</el-button>\n                                </el-col>\n                            </el-row>\n                        </div>\n                        <div class=\"title\">亲友礼包</div>\n                        <div class=\"active-link\">\n                            {{activeUrl}}\n                        </div>\n                        <el-button type=\"primary\"\n                        @click=\"handleCopyActUrl\"\n                        v-clipboard:copy=\"activeUrl\"\n                        v-clipboard:success=\"onCopySuccess\"\n                        v-clipboard:error=\"onCopyError\"\n                        size=\"small\">复制活动链接</el-button>\n                    </el-col>\n                </el-row>\n            </div>\n            <div class=\"post-wrap-box\" v-if=\"![2,3].includes(userState)\">\n                <el-row :gutter=\"24\" type=\"flex\">\n                    <el-col :span=\"12\">\n                        <el-tabs v-model=\"activeTab\" type=\"card\" @tab-click=\"handleClick\" v-if=\"showHonourPoster\">\n                            <el-tab-pane label=\"朋友圈\" name=\"circle\"></el-tab-pane>\n                            <el-tab-pane label=\"荣誉校长\" name=\"honour\"></el-tab-pane>\n                        </el-tabs>\n                        <el-row :gutter=\"24\">\n                            <el-carousel :initial-index=\"0\" :loop=\"false\" @change=\"changeImg\" arrow=\"always\" indicator-position=\"none\" trigger=\"click\" :autoplay=\"false\" height=\"596px\">\n                                <el-carousel-item v-for=\"(item,index) in postArr\" :key=\"item.experimentId+ index\">\n                                    <el-image\n                                        style=\"width: 390px;height: 596px;display: block;margin: 0 auto;\"\n                                        :src=\"item.poster\"\n                                        fit=\"cover\"></el-image>\n                                </el-carousel-item>\n                            </el-carousel>\n                        </el-row>\n                        <!-- <el-row :gutter=\"24\" type=\"flex\">\n                            <el-col :offset=\"8\">\n                                <a @click=\"handleDownloadPoster\">\n                                    <el-button  type=\"primary\" size=\"small\">下载海报</el-button>\n                                </a>\n                            </el-col>\n                        </el-row> -->\n                    </el-col>\n                    <el-col :span=\"12\">\n                        <el-row :gutter=\"24\" type=\"flex\">\n                            <div class=\"copy-content\" :class=\"showHonourPoster ? '': 'marginnone'\">\n                                <span v-html=\"shareText[0]\"></span>\n                                <el-button @click=\"changeCopyContent\" plain icon=\"el-icon-refresh\" size=\"small\">换一个</el-button>\n                            </div>\n                        </el-row>\n                        <el-row :gutter=\"24\" type=\"flex\">\n                            <el-col :offset=\"8\" class=\"copy-button\">\n\n                                <a @click=\"handleDownloadPoster\">\n                                    <el-button  type=\"primary\" size=\"small\">下载海报</el-button>\n                                </a>\n\n                                <el-button type=\"primary\"\n                                @click=\"handleCopyText\"\n                                v-clipboard:copy=\"shareText[1]\"\n                                v-clipboard:success=\"onCopySuccess\"\n                                v-clipboard:error=\"onCopyError\"\n                                size=\"small\">复制转发语</el-button>\n                            </el-col>\n                        </el-row>\n                    </el-col>\n                </el-row>\n            </div>\n        </el-tab-pane>\n        <el-tab-pane v-if=\"isShow && authScreenShot && ![2,3].includes(userState)\" label=\"转介绍记录\" name=\"record\">\n            <div class=\"table-wrap\">\n                <el-row :gutter=\"24\" class=\"button-wrap\">\n                    <el-col :span=\"3\" :offset=\"offset\">\n                        <el-button @click=\"showDialog(2, 'https://web-data.zmlearn.com/image/gVjjHxDnF3fBMRbKaZaeEV/rule.png')\"  type=\"primary\" size=\"small\">截图操作规范</el-button>\n                    </el-col>\n                    <el-col :span=\"3\" v-if=\"authUpload && canUploadNew\">\n                        <el-upload\n                            :action=\"uploadPicture\"\n                            :show-file-list=\"false\"\n                            :on-success=\"uploadSuccess\"\n                            :before-upload=\"beforeUpload\"\n                        >\n                            <el-button type=\"primary\" @click=\"setActType(1, null, 'card_click_Upload', '新签任务')\" size=\"small\" v-loading.fullscreen.lock=\"fullscreenLoading\">新手福利上传</el-button>\n                        </el-upload>\n                    </el-col>\n                    <el-col :span=\"3\" v-if=\"authUpload && canUpload\">\n                        <el-upload\n                            :action=\"uploadPicture\"\n                            :show-file-list=\"false\"\n                            :on-success=\"uploadSuccess\"\n                            :before-upload=\"beforeUpload\"\n                        >\n                            <el-button type=\"primary\" @click=\"setActType(0, null, 'card_click_Upload', uploadButton)\" size=\"small\" v-loading.fullscreen.lock=\"fullscreenLoading\">{{uploadButton}}</el-button>\n                        </el-upload>\n                    </el-col>\n\n                    <el-col :span=\"2\" v-if=\"bu !== 1 && authReUpload\">\n                        <el-button \n                            :disabled=\"!reuploadTableData || !reuploadTableData.length\"\n                            type=\"primary\"\n                            size=\"small\"\n                            @click=\"reuploadPopVisible = true\" \n                        >补上传</el-button>\n                    </el-col>\n\n                </el-row>\n                <el-row :gutter=\"24\">\n                    <el-col :span=\"24\">\n                    <el-table\n                        :data=\"tableData\"\n                        border\n                        style=\"width: 100%\">\n                        <el-table-column\n                            fixed\n                            prop=\"actName\"\n                            label=\"阶段\"\n                            min-width=\"200\">\n                            <template slot-scope=\"scope\">\n                                {{ scope.row.actName }}\n                                <el-tag v-if=\"scope.row.reApplyTime\"  size=\"small\">申诉</el-tag>\n                            </template>\n                        </el-table-column>\n                        <el-table-column prop=\"uploadTimeStr\" label=\"更新时间\" min-width=\"180\"></el-table-column>\n                        <el-table-column label=\"审核状态\" min-width=\"180\">\n                            <template slot-scope=\"scope\">\n                                <div class=\"green-color\" v-if=\"scope.row.auditState == 1\">{{scope.row.auditState | auditStates}}</div>\n                                <div v-else>\n                                    <span class=\"red-color\">{{scope.row.auditState | auditStates}}</span>\n                                    <span v-if=\"scope.row.auditDesc\">({{scope.row.auditDesc}})</span>    \n                                </div>\n                            </template>\n                        </el-table-column>\n                        <el-table-column\n                            fixed=\"right\"\n                            label=\"操作\"\n                            min-width=\"180\">\n                            <div class=\"wrap-action-btns\" slot-scope=\"scope\">\n                                <el-button \n                                    v-if=\"isStautsIng(nowTime, scope.row.circleBegin , scope.row.circleEnd) && !scope.row.reuploadFlag\" \n                                    type=\"text\"\n                                    size=\"small\"\n                                    @click=\"showDialog(3,scope.row.url)\"\n                                >预览</el-button>\n\n                                <el-button\n                                    v-if=\"scope.row.auditState === 0 && authAudit && !scope.row.reuploadFlag && !scope.row.reUploadTime\" \n                                    type=\"text\"\n                                    size=\"small\"\n                                    @click=\"verify(scope.row)\"\n                                >审核</el-button>\n\n                                <el-button\n                                    v-if=\"authReAudit && scope.row.auditState === 2\" \n                                    type=\"text\"\n                                    size=\"small\"\n                                    @click=\"showChangeStateDia(scope.row)\"\n                                >变更状态</el-button>\n\n                                <el-upload\n                                    v-if=\"authUpload && isStautsIng(nowTime, scope.row.circleBegin , scope.row.circleEnd) && scope.row.auditState !== 1 && nowTime < scope.row.circleEnd\"\n                                    :action=\"uploadPicture\"\n                                    :show-file-list=\"false\"\n                                    :on-success=\"uploadSuccess\"\n                                    :before-upload=\"beforeUpload\"\n                                >\n                                    <el-button type=\"text\" @click=\"setActType(scope.row.awardType, null, 'card_click_Upload', '上传')\" size=\"small\" v-loading.fullscreen.lock=\"fullscreenLoading\">上传</el-button>\n                                </el-upload>\n                                <el-upload\n                                    v-if=\"authReUpload && scope.row.reuploadFlag\"\n                                    :action=\"uploadPicture\"\n                                    :show-file-list=\"false\"\n                                    :on-success=\"reUploadSuccess\"\n                                    :before-upload=\"beforeUpload\"\n                                >\n                                    <el-button type=\"text\" @click=\"setActType(scope.row.type, scope.row.id)\" size=\"small\" v-loading.fullscreen.lock=\"fullscreenLoading\">补上传</el-button>\n                                </el-upload>\n\n                                <el-button\n                                    v-if=\"scope.row.auditState == 2\n                                        && isStautsIng(nowTime, scope.row.circleBegin , scope.row.circleEnd)\n                                        && authReApply\"\n                                    type=\"text\"\n                                    size=\"small\"\n                                    @click=\"auditAppeal(scope.row.id)\"\n                                >申诉</el-button>\n                            </div>\n                        </el-table-column>\n                </el-table>\n                </el-col>\n            </el-row>\n        </div>\n        </el-tab-pane>\n    </el-tabs>\n    <el-dialog :title=\"dialogTitle\" width=\"400px\" center :visible.sync=\"dialogTableVisible\">\n        <el-image\n        style=\"width: 350px;display: block; margin: 0 auto;\"\n        :src=\"dialogImg\"\n        :alt=\"dialogTitle\"\n        fit=\"contain\"></el-image>\n    </el-dialog>\n    <el-dialog title=\"审核\" :visible.sync=\"verifyFlag\">\n        <div>\n            <el-input\n                type=\"textarea\"\n                :rows=\"2\"\n                placeholder=\"请输入内容\"\n                v-model=\"textarea\">\n                </el-input>\n        </div>\n        <div style=\"margin-top: 20px\">\n            <el-radio v-model=\"radio\" :label=\"1\">海报合格</el-radio>\n            <el-radio v-model=\"radio\" :label=\"2\">海报不是本月最新海报</el-radio>\n            <el-radio v-model=\"radio\" :label=\"3\">海报设置分组可见</el-radio>\n            <el-radio v-model=\"radio\" :label=\"4\">海报错误</el-radio>\n            <el-radio v-model=\"radio\" :label=\"5\">海报未配转发语</el-radio>\n            <el-radio v-model=\"radio\" :label=\"6\">海报与上一阶段分享海报重复</el-radio>\n            <el-radio v-model=\"radio\" :label=\"7\">海报未截图朋友圈上传</el-radio>\n            <el-radio v-model=\"radio\" :label=\"8\">海报不是本月最新海报</el-radio>\n            <el-radio v-model=\"radio\" :disabled=\"true\" :label=\"9\">朋友圈截图时间未满1小时</el-radio>\n            <el-radio v-model=\"radio\" :label=\"10\">朋友圈截图转发链接错误</el-radio>\n            <!-- <el-radio v-model=\"radio\" :label=\"11\">朋友圈截图无点赞</el-radio>\n            <el-radio v-model=\"radio\" :label=\"12\">朋友圈截图无评论</el-radio> -->\n        </div>\n        <span slot=\"footer\">\n            <el-button @click=\"verifyFlag = false\">取 消</el-button>\n            <el-button type=\"primary\" @click=\"crAudit\">确 定</el-button>\n        </span>\n    </el-dialog>\n\n    <el-dialog title=\"补上传\" width=\"400px\" center :visible.sync=\"reuploadPopVisible\">\n        <el-table\n            :data=\"reuploadTableData\"\n            border\n            style=\"width: 100%\">\n            <el-table-column\n                fixed\n                prop=\"name\"\n                label=\"名称\"\n                min-width=\"260\">\n            </el-table-column>\n            <el-table-column\n                label=\"操作\"\n                width=\"80\">\n                <template slot-scope=\"scope\">\n                    <el-col :span=\"8\" >\n                        <el-upload\n                            :action=\"uploadPicture\"\n                            :show-file-list=\"false\"\n                            :on-success=\"reUploadSuccess\"\n                            :before-upload=\"beforeUpload\"\n                        >\n                            <el-button type=\"text\" @click=\"setActType(scope.row.type, scope.row.id, 'click_changeUpload', '补上传')\" size=\"small\" v-loading.fullscreen.lock=\"fullscreenLoading\">补上传</el-button>\n                        </el-upload>\n                    </el-col>\n                </template>\n                </el-table-column>\n            </el-table>\n    </el-dialog>\n\n    <img :src=\"base64\" alt=\"\" width=\"400\">\n    <div id=\"qrcode\" style=\"display: none\"></div>\n    <canvas id=\"canvas\" width=\"800\" height=\"1200\" style=\"display: none\"></canvas>\n    <change-state ref=\"changeState\" @changeStateConfirm=\"changeStateConfirm\" />\n</div>\n"
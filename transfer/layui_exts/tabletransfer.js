layui.define(['table'], function(exports) {
    var $ = layui.$,
        table = layui.table,
        MOD_NAME = 'transfer',
        LEFT_TABLE = 'left-table-',
        RIGHT_TABLE = 'right-table-',
        LEFT_BTN = 'left-btn-',
        RIGHT_BTN = 'right-btn-',
        FILTER = 'test',
        DISABLED = 'layui-btn-disabled',
        BTN = 'button',
        BTN_STLY = 'btn',
        MD5 = 'layui-col-md5',
        MD2 = 'layui-col-md2';

    //表格列

    var myTransfer = {
        /**
         * 程序入口
         */
        render: function(options) {
            var that = this;
            var opt = $.extend({}, options)
            myTransfer[`index${opt.index}`] = opt.index; //当前数据表格索引序号
            myTransfer[`dataleft${opt.index}`] = opt.data[0]; //未选数据
            myTransfer[`dataRight${opt.index}`] = opt.data[1] || []; //已选数据

            var dataLeft = myTransfer[`dataleft${opt.index}`];
            var dataRight = myTransfer[`dataRight${opt.index}`]

            that.creatHtmlTag(opt);
            this.leftRender(opt);
            this.rightRender(opt);

            var btnLeft = $(`button[data-left=${LEFT_BTN + opt.index}]`); //左按钮
            var btnRight = $(`button[data-right=${RIGHT_BTN + opt.index}]`); //右按钮

            btnLeft.on("click", function() {
                var checkStatus = that.checkStatus(`${LEFT_TABLE + opt.index}`);
                var checkList = checkStatus.data;
                for (var i = 0; i < checkList.length; i++) {
                    dataRight.unshift(checkList[i]);
                }
                for (var i = 0; i < dataLeft.length; i++) {
                    if (dataLeft[i].LAY_CHECKED) {
                        delete dataLeft[i];
                    }
                }
                dataLeft = dataLeft.filter(d => d);
                that.renderTable({
                    elem: "#" + LEFT_TABLE + opt.index,
                    cols: opt.cols,
                    data: dataLeft,
                });
                that.renderTable({
                    elem: "#" + RIGHT_TABLE + opt.index,
                    cols: opt.cols,
                    data: dataRight,
                });
                btnLeft.addClass(`${DISABLED}`);
                return false;
            })
            btnRight.on("click", function() {
                var checkStatus = that.checkStatus(`${RIGHT_TABLE + opt.index}`);
                var checkList = checkStatus.data;
                for (var i = 0; i < checkList.length; i++) {
                    dataLeft.unshift(checkList[i]);
                }
                for (var i = 0; i < dataRight.length; i++) {
                    if (dataRight[i].LAY_CHECKED) {
                        delete dataRight[i];
                    }
                }
                dataRight = dataRight.filter(d => d);
                that.renderTable({
                    elem: "#" + LEFT_TABLE + opt.index,
                    cols: opt.cols,
                    data: dataLeft,
                });
                that.renderTable({
                    elem: "#" + RIGHT_TABLE + opt.index,
                    cols: opt.cols,
                    data: dataRight,
                });
                btnRight.addClass(`${DISABLED}`);
                return false
            })
            return this;
        },
        /**
         * 获取右边的数据
         * @param {number} index 当前数据表格的索引
         */
        getRightData: function(index) {
            let data = myTransfer["dataRight" + index];
            data = data.filter(a => a);
            return data;
        },
        /**
         * 渲染表格
         * @param {object} opt   
         */
        renderTable: function(opt) {
            var options = {
                data: opt.data,
                height: opt.height || 300
            };
            options = $.extend({}, opt, options)
            table.render(options)
        },
        /**
         * 复选框的状态
         * @param {*} id 
         * return {*}被选中的行和是否全选
         */
        checkStatus: function(id) {
            return table.checkStatus(id)
        },
        /**
         * 左边数据渲染
         * @param {object} opt 表格参数
         */
        leftRender: function(opt) {
            var that = this;
            var options = {
                elem: "#" + LEFT_TABLE + opt.index,
                data: opt.data[0]
            }
            options = $.extend({}, opt, options)
            this.renderTable(options)
                //左边复选框状态,并移除切换数据按钮禁用状态
            var filter = LEFT_TABLE + opt.index;
            var btn = $(`button[data-left=${LEFT_BTN + opt.index}]`)
            this.toggleBtn(filter, btn);
        },
        /**
         * 右边数据渲染
         * @param {object} opt 表格参数
         */
        rightRender: function(opt) {
            var that = this;
            var options = {
                elem: "#" + RIGHT_TABLE + opt.index,
                data: opt.data[1] || []
            }
            options = $.extend({}, opt, options)
            this.renderTable(options)
                //右边复选框状态,并移除切换数据按钮禁用状态
            var filter = RIGHT_TABLE + opt.index;
            var btn = $(`button[data-right=${RIGHT_BTN + opt.index}]`);
            this.toggleBtn(filter, btn)
        },
        /**
         * 切换交换数据按钮状态
         * @param {string} filter 当前点击表格的filter
         * @param {string} btn 
         */
        toggleBtn: function(filter, btn) {
            var that = this;
            table.on(`checkbox(${filter})`, function(obj) {
                checkStatus = that.checkStatus(`${filter}`);
                if (checkStatus.data.length > 0) {
                    btn.removeClass(`${DISABLED}`)
                } else {
                    btn.addClass(`${DISABLED}`)
                }
            })
        },
        /**
         * 创建一个表格模板
         * @param {object} opt 表格所需的一些参数
         */
        creatHtmlTag: function(opt) {
            var that = this,
                elem = opt.ele,
                index = opt.index;
            var html = `<div class="layui-container" style="display: flex;justify-content: center;align-items: center;">
                            <div class="${MD5}">
                                <table class="layui-hide" id="${LEFT_TABLE + index }" lay-filter="${LEFT_TABLE + index}"></table>
                            </div>
                            <div class="${MD2}" style="text-align: center;">
                                <div id="${LEFT_BTN + index}"   style="margin-bottom: 10px;"><button data-left="${LEFT_BTN + index}" data-type="0" data-index="${index}" class="layui-btn ${DISABLED} ${LEFT_TABLE + index + BTN_STLY}"> <i class="layui-icon">&#xe602;</i></button></div>
                                <div id="${RIGHT_BTN + index}" ><button data-type="1" data-right="${RIGHT_BTN + index}" data-index="${index}" class="layui-btn  ${DISABLED} ${RIGHT_TABLE + index + BTN_STLY}"> <i class="layui-icon">&#xe603;</i></button></div>
                            </div>
                            <div class="${MD5}">
                                <table class="layui-hide" id="${RIGHT_TABLE + index}" lay-filter="${RIGHT_TABLE + index}"></table>
                            </div>
                            </div>
                        </div>`;
            $(elem).html(html)
        },

    }

    exports("transfer", myTransfer)
});
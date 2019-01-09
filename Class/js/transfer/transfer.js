/**
 * 重大bug
 * 改放法表头不能排序
 */

layui.define(['table'], function(exports) {
    let $ = layui.$,
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
    let index = 0;

    class transfer {

        constructor(options) {
            this.index = index++;
            this.dataLeft = options.data[0];
            this.dataRight = options.data[1] || [];
            this.opt = $.extend({}, options);

        }

        /**
         * 程序入口
         */
        render() {
                let that = this;
                let opt = this.opt;

                this.creatHtmlTag(opt);
                this.leftRender(opt);
                this.rightRender(opt);

                let btnLeft = $(`button[data-left=${LEFT_BTN + this.index}]`); //左按钮
                let btnRight = $(`button[data-right=${RIGHT_BTN + this.index}]`); //右按钮

                btnLeft.on("click", function() {
                    let checkList = that.checkStatus(`${LEFT_TABLE + that.index}`);
                    for (let i = 0; i < checkList.length; i++) {
                        that.dataRight.unshift(checkList[i]);
                    }
                    that.dataLeft = that.dataLeft.filter(item => {
                        if (!item.LAY_CHECKED) {
                            return item;
                        }
                    });
                    that.renderTable({
                        elem: "#" + LEFT_TABLE + that.index,
                        cols: opt.cols,
                        data: that.dataLeft,
                    });
                    that.renderTable({
                        elem: "#" + RIGHT_TABLE + that.index,
                        cols: opt.cols,
                        data: that.dataRight,
                    });
                    btnLeft.addClass(`${DISABLED}`);
                    return false;
                })
                btnRight.on("click", function() {
                    let checkList = that.checkStatus(`${RIGHT_TABLE + that.index}`);
                    for (let i = 0; i < checkList.length; i++) {
                        that.dataLeft.unshift(checkList[i]);
                    }
                    that.dataRight = that.dataRight.filter(function(item) {
                        if (!item.LAY_CHECKED) {
                            return item;
                        }
                    });

                    that.renderTable({
                        elem: "#" + LEFT_TABLE + that.index,
                        cols: opt.cols,
                        data: that.dataLeft,
                    });
                    that.renderTable({
                        elem: "#" + RIGHT_TABLE + that.index,
                        cols: opt.cols,
                        data: that.dataRight,
                    });
                    btnRight.addClass(`${DISABLED}`);
                    return false
                })
                return this;
            }
            /**
             * 获取右边的数据
             * @param {number} index 当前数据表格的索引
             */
        get() {
                return this.dataRight;
            }
            /**
             * 渲染表格
             * @param {object} opt   
             */
        renderTable(opt) {
                let options = {
                    data: opt.data,
                    height: opt.height || 300
                };
                options = $.extend({}, opt, options)
                table.render(options)
            }
            /**
             * 复选框的状态
             * @param {*} id 
             * return {*}被选中的行和是否全选
             */
        checkStatus(id) {
                return table.checkStatus(id).data;
            }
            /**
             * 左边数据渲染
             * @param {object} opt 表格参数
             */
        leftRender(opt) {
                let that = this;
                let options = {
                    elem: "#" + LEFT_TABLE + this.index,
                    data: opt.data[0]
                }
                options = $.extend({}, opt, options)
                this.renderTable(options)
                    //左边复选框状态,并移除切换数据按钮禁用状态
                let filter = LEFT_TABLE + this.index;
                let btn = $(`button[data-left=${LEFT_BTN + this.index}]`)
                this.toggleBtn(filter, btn);
            }
            /**
             * 右边数据渲染
             * @param {object} opt 表格参数
             */
        rightRender(opt) {
                let that = this;
                let options = {
                    elem: "#" + RIGHT_TABLE + this.index,
                    data: opt.data[1] || []
                }
                options = $.extend({}, opt, options)
                this.renderTable(options)
                    //右边复选框状态,并移除切换数据按钮禁用状态
                let filter = RIGHT_TABLE + this.index;
                let btn = $(`button[data-right=${RIGHT_BTN + this.index}]`);
                this.toggleBtn(filter, btn)
            }
            /**
             * 切换交换数据按钮状态
             * @param {string} filter 当前点击表格的filter
             * @param {string} btn 
             */
        toggleBtn(filter, btn) {
                let that = this;
                table.on(`checkbox(${filter})`, function(obj) {
                    let checkList = that.checkStatus(`${filter}`);
                    if (checkList.length > 0) {
                        btn.removeClass(`${DISABLED}`)
                    } else {
                        btn.addClass(`${DISABLED}`)
                    }
                })
            }
            /**
             * 创建一个表格模板
             * @param {object} opt 表格所需的一些参数
             */
        creatHtmlTag(opt) {
            let that = this,
                elem = opt.ele,
                index = this.index;
            let html = `<div class="layui-container" style="display: flex;justify-content: center;align-items: center;">
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
        }
    }
    exports('transfer', transfer);
});
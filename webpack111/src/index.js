let str = require('./hello');
//require('./index.css'); //因为webpack默认只支持js的模块  所以css文件需要安装loader;
import './main.less';
console.log(str);
if (module.hot) {
    module.hot.accept(); //这个js发生改变时  就会热更新,不会刷新页面;
}
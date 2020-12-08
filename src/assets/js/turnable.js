// 抽奖的一个实例化
/*
 * @method Turntable
 * @desc 转盘抽奖
 * @param {Object} options，实例化时的参数
 * @param {jQuery} options.ele ，转盘的旋转按钮元素，必须要存在的
 * @param {Object} options.gifts，奖品的角度相关数据
 * @param {Function} options.callback 转盘抽奖结束后的回调函数
 * @param {Number} options.speed 旋转的最大速度，默认为10，越大越快
 * @param {Number} options.startAngle 初始的角度，默认为0
 *
 * */
var Turntable=function (options) {

    if (!(this instanceof Turntable)) {
        return new Turntable(options);
    }

    if (!options || typeof options != "object") {
        throw new Error("在实例化Turntable时，传入参数错误！");
    }

    try {
        if (!options.ele.size()) {
            throw new Error();
        }
    } catch (e) {
        throw new Error("在实例化Turntable时，需要传入ele元素");
    }

    // 初始化一些配置信息
    this.init(options);

    // 初始化事件
    this.initEvent();

}

Turntable.prototype.init = function (options) {

    this.rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    this.options = options;

    // 目标元素
    this.ele = options.ele;

    // 基础速度
    this.baseSpeed = options.speed || 10;

    // 当前的速度
    this.speed = this.baseSpeed;

    // 状态码
    this.statusCode = {
        // 还未开始
        "unBegin": "1",
        // 正在旋转
        "activity": "2",
        // 正在停止
        "isStoping": "3"
    };

    // 当前的状态码
    this.status = this.statusCode.unBegin;

    // 开始时的启动速度
    this.beiginStep = 0.2;

    // 结束时的减速速度
    this.stopStep = 0.1;

};

// 开始转盘
Turntable.prototype.begin = function () {
    var statusCode = this.statusCode;

    if (statusCode.unBegin != this.status) {
        return "";
    }

    // 设置为开始
    this.status = statusCode.activity;

    this.speed = Math.floor(this.baseSpeed / 2);

    this._beigin();

    this.stopId = "";

    this.json = "";

};

// 停止，传入两个参数，id为目标id，json为相关的全部信息
Turntable.prototype.stop = function (id, json) {
    // 停止的目标id
    var statusCode = this.statusCode;
    if (statusCode.activity != this.status) {
        return "";
    }

    this.status = statusCode.isStoping;

    this.stopId = id;

    this.json = json;
};

// 当前转盘的状态，是否已经停止
Turntable.prototype.isStoped = function () {
    return this.status == this.statusCode.unBegin;
};

// 获取到停止需要的旋转的角度
Turntable.prototype.getStopAngle = function () {
    var speed = this.speed,
        n = 0,
        angle = 0,
        stopStep = this.stopStep;

    n = Math.ceil(speed / stopStep);

    angle = n * speed - n * (n - 1) * stopStep / 2 + 3600;

    return angle % 360;
};

// 绑定事件的部分
Turntable.prototype.initEvent = function () {
    var rAF = this.rAF,
        that = this,
        ele = this.ele,
        options = this.options,
        gifts = options.gifts,
        callback = options.callback,
        curAngle = options.startAngle || 0,
        cbs = {},
        statusCode = this.statusCode,
        baseSpeed = this.baseSpeed,
        beiginStep = this.beiginStep,
        stopStep = this.stopStep,
        isStoping = false;

    function _cb() {
        if (typeof callback == "function") {
            callback.call(ele, that.stopId, that.json);
        }
    }

    function _scroll(speed) {
        curAngle = curAngle + speed;

        if (curAngle >= 360) {
            curAngle = curAngle % 360;
        }

        ele.css({
            "transform": "rotate(-" + curAngle + "deg)"
        });

    }

    // 根据不同的状态，做不同的处理

    // 未开始时，轮训函数
    cbs[statusCode.unBegin] = function () {
    };

    // 开始时的轮训函数
    cbs[statusCode.activity] = function () {

        // 加速的时候
        if (that.speed < baseSpeed) {
            that.speed += beiginStep;
        }

        // 限制最大的速度
        if (that.speed > baseSpeed) {
            that.speed = baseSpeed;
        }

        _scroll(that.speed);

    };

    // 正在停止
    cbs[statusCode.isStoping] = function () {
        var speed = that.speed;

        // 表示速度已经降低到最小单位以下，那么就设置为停止
        if (that.speed < 0.1 * stopStep) {
            that.status = statusCode.unBegin;
            isStoping = false;
            _cb();
            return "";
        }

        // 当前没有开始停止的话
        // 并且当前的角度，不适合停止的话，那么就再按照正在旋转执行
        if (!isStoping && !_isBeginStop()) {
            cbs[statusCode.activity]();
            return "";
        }

        isStoping = true;

        // 开始停止
        if (that.speed > 2 * stopStep) {
            if (_justfiyStop()) {
                that.speed -= stopStep;
            }
        } else {
            // 去做停止位置的修正
            if (_canStop()) {
                that.speed -= stopStep;
            }
        }

        _scroll(that.speed);
    };

    function _circle() {
        var status = that.status,
            cb = cbs[status];

        if (typeof cb == "function") {
            cb();
        }

        if (status != statusCode.unBegin) {
            rAF(_circle);
        }
    }

    //
    this._beigin = _circle;

    function _canStop() {
        var gift = gifts[that.stopId],
            flag = false;

        if (gift) {
            return true;
        }

        return Math.abs(that.lastAngle - curAngle) < 0.001;
    }

    //
    function _justfiyStop() {
        var bwAngle = that.getStopAngle(),
            curBase = 0;

        curBase = that.lastAngle - bwAngle;

        if (curBase < 0) {
            curBase += 360;
        }

        if (Math.abs(curBase - curAngle) < that.speed) {
            return true;
        } else {
            return false;
        }
    }

    // error 的时候，指向两个的中间
    function _getErrorAngle() {
        var errorAngles = {},
            errorArr = [],
            i = "",
            one = null,
            angle = 0,
            len = 0;

        for (i in gifts) {
            one = gifts[i];
            angle = one.angleCenter - one.angleRange;

            if (angle < 0) {
                angle = 360 + angle;
            }

            errorAngles[angle] = 1;

            angle = one.angleCenter + one.angleRange;

            if (angle >= 360) {
                angle = angle - 360;
            }

            errorAngles[angle] = 1;
        }

        for (i in errorAngles) {
            errorArr.push(i);
        }

        len = errorArr.length;

        _getErrorAngle = function () {
            return errorArr[Math.floor(Math.random() * len)];
        };

        return _getErrorAngle();

    }

    function _getStopAngle(gift) {
        var angleRange = gift.angleRange,
            flag = Math.random - 0.5 > 0 ? 1 : -1,
            angle = 0;

        angle = gift.angleCenter - flag * Math.floor(Math.random() * angleRange * 0.6);

        return (angle + 360) % 360;
    }

    //
    function _isBeginStop() {
        var gift = gifts[that.stopId],
            bwAngle = 0,
            lastAngle = 0,
            curBase = 0;

        if (!gift) {
            lastAngle = _getErrorAngle();
        } else {
            lastAngle = _getStopAngle(gift);
        }

        bwAngle = that.getStopAngle();

        curBase = lastAngle - bwAngle;

        if (curBase < 0) {
            curBase += 360;
        }

        if (Math.abs(curBase - curAngle) < that.speed) {
            that.lastAngle = lastAngle;
            return true;
        } else {
            that.lastAngle = "";
            return false;
        }
    }

};

export default Turntable;


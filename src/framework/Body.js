import _ from 'lodash'
/**
 * body对象
 * @author wuyuchuan
 */
export function Body() {
	this.logic = {};
	this.data = {};
	/**
	 * 获取body节点
	 * @param nodeName 节点名称（默认default节点）
	 */
	this.getNode = function (nodeName) {
		if (nodeName == undefined || nodeName == null) {
			nodeName = 'default';
		}
		if (this.logic instanceof Array) {
			this.data = _.find(this.logic, function (o) { return o.name == nodeName; });
		} else {
			if (_.get(this.logic, 'name') == nodeName) {
				this.data = this.logic;
			} else {
				this.data = {};
			}
		}
		return this;

	}
	/**根据属性名获取节点属性的值
	 * 当传一个参数时表示根据属性名获取属性值(name)
	 * 当传二个参数时表示根据节点名称获取属性名获取属性值（node,name）
	 * 返回字符串
	 */
	this.getNodeItem = function () {
		var value = "";
		if (arguments.length === 1) {
			value = this.getNodeItemOne(arguments[0]);
		} else if (arguments.length === 2) {
			value = this.getNodeItemTwo(arguments[0], arguments[1]);
		}
		return value;

	}
	/**
	 * 根据属性名获取节点属性的值
	 * @param name (属性名称)
	 * @return 属性值
	 */
	this.getNodeItemOne = function (name) {
		var value = "";
		var bodyNode = this.data;
		if (bodyNode == undefined || Object.keys(bodyNode).length == 0) {
			return value;
		} else {
			bodyNode = bodyNode.data;
		}
		if (bodyNode instanceof Array) {
			value = _.get(_.find(bodyNode, function (o) { return o[name]; }), name);
		} else {
			value = _.get(bodyNode, name);
		}
		return value;
	}
	/**
	 * 获取特定节点属性的值
	 * @param node 节点名
	 * @param name 属性名称
	 */
	this.getNodeItemTwo = function (node, name) {
		this.getNode(node);
		var value = "";
		var bodyNode = this.data;
		if (bodyNode == undefined || Object.keys(bodyNode).length == 0) {
			return value;
		} else {
			bodyNode = bodyNode.data;
		}
		if (bodyNode instanceof Array) {
			value = _.get(_.find(bodyNode, function (o) { return o[name]; }), name);
		} else {
			value = _.get(bodyNode, name);
		}
		return value;
	}
	/**获取节点dataset
	 * 当不传参数时代表获取默认节点dataset
	 * 当传一个参数时代表获取特定节点的dataset（node）
	 * 返回数组
	 */
	this.getNodeDataSet = function () {
		var arr = new Array();
		if (arguments.length === 0) {
			arr = this.getNodeDataSetZero();
		} else if (arguments.length === 1) {
			arr = this.getNodeDataSetOne(arguments[0]);
		}
		return arr;
	}
	/**
	 * 获取默认节点dataset
	 * @param name (属性名称)
	 * @return dataset 数组
	 */
	this.getNodeDataSetZero = function () {
		var arr = new Array();
		var bodyNode = this.data;
		if (bodyNode == undefined || Object.keys(bodyNode).length == 0) {
			return arr;
		}
		arr = bodyNode.dataset.row;
		return arr;
	}
	/**
	 * 根据属节点名获取dataset
	 * @param name (属性名称)
	 * @return dataset 数组
	 */
	this.getNodeDataSetOne = function (node) {
		this.getNode(node);
		var arr = new Array();
		var bodyNode = this.data;
		if (bodyNode == undefined || Object.keys(bodyNode).length == 0) {
			return arr;
		}
		arr = bodyNode.dataset.row;
		return arr;
	}
	/**
	 *@return 返回报文体json
	 *
	 */
	this.getValueofBody = function () {
		var obj = {
			"body": {
			}
		};
		var bodydata = obj["body"];
		var body_json = this;
		if (body_json == '' || body_json == undefined) {
			return obj;
		}
		var body_data = body_json.logic;

		if (!body_data) {
			bodydata = {};
		} else if (body_data.length == undefined) {
			//单笔返回数据
			var _paramsbody = body_data;
			var _data = _paramsbody["data"] //获取data值
			var _dataSet = _paramsbody["dataset"] //获取dataset值
			bodydata[_paramsbody["name"]] = {};
			if (_data != undefined && _data.length != undefined) { //多个data
				// bodydata[_paramsbody["name"]] = {};
				for (var j = 0; j < _data.length; j++) {
					for (var key in _data[j]) {
						bodydata[_paramsbody["name"]][key] = _data[j][key];
					}
				}
			} else if (_data != undefined) { //单个data
				//bodydata[_paramsbody["name"]] = {};
				for (var key in _data) {
					bodydata[_paramsbody["name"]][key] = _data[key];
				}

			}
			if (_dataSet != undefined && _dataSet["row"] && _dataSet["row"].length != undefined) {
				bodydata[_paramsbody["name"]][_dataSet.name] = [];
				for (var h = 0; h < _dataSet["row"].length; h++) {
					bodydata[_paramsbody["name"]][_dataSet.name].push(_dataSet["row"][h]);
				}
			} else if (_dataSet != undefined && _dataSet["row"]) {
				bodydata[_paramsbody["name"]][_dataSet.name] = [];
				bodydata[_paramsbody["name"]][_dataSet.name].push(_dataSet.row);
			}

		} else {
			//多笔返回数据
			for (var i = 0; i < body_data.length; i++) {
				var _paramsbody = body_data[i];
				var _data = _paramsbody["data"] //获取data值
				var _dataSet = _paramsbody["dataset"] //获取dataset值
				bodydata[_paramsbody["name"]] = {};
				if (_data != undefined && _data.length != undefined) { //多个data
					// bodydata[_paramsbody["name"]] = {};
					for (var j = 0; j < _data.length; j++) {
						for (var key in _data[j]) {
							bodydata[_paramsbody["name"]][key] = _data[j][key];
						}
					}
				} else if (_data != undefined) { //单个data
					//bodydata[_paramsbody["name"]] = {};
					for (var key in _data) {
						bodydata[_paramsbody["name"]][key] = _data[key];
					}

				}
				if (_dataSet != undefined && _dataSet["row"] && _dataSet["row"].length != undefined) {
					bodydata[_paramsbody["name"]][_dataSet.name] = [];
					for (var h = 0; h < _dataSet["row"].length; h++) {
						bodydata[_paramsbody["name"]][_dataSet.name].push(_dataSet["row"][h]);
					}
				} else if (_dataSet != undefined && _dataSet["row"]) {
					bodydata[_paramsbody["name"]][_dataSet.name] = [];
					bodydata[_paramsbody["name"]][_dataSet.name].push(_dataSet.row);
				}

			}
		}
		return obj;
	}
}

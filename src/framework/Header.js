import _ from 'lodash'
/**
 * header对象
 * @author wuyuchuan
 */
export function Header() {
	//头部对象
	this.data = {};
	this.name = 'default';
	/**
	 * 获取头部节点
	 */
	this.getNode = function () {
		return this;

	}
	/**
	 * 根据属性名获取节点属性的值
	 * @param name (属性名称)
	 * @return 属性值
	 */
	this.getNodeItem = function (name) {
		var value = "";
		var headerNode = this.data;
		if (headerNode == undefined) {
			return value;
		}
		value = _.get(_.find(this.data, function (o) { return o[name]; }), name);
		if (value == undefined) {
			value = "";
		}
		return value;

	}
	/**
	 *@return 报文头部json对象
	 *
	 */
	this.getValueofHeader = function () {
		var obj = {
			"header": {
			}
		};
		var headerdata = obj["header"];
		var header_data = this;
		if (!header_data) {
			headerdata = {};
		} else if (header_data.length == undefined) {
			var _name = header_data.name;
			var _data = header_data.data;
			headerdata[_name] = {};
			for (var i = 0; i < _data.length; i++) {
				var _paramsheader = _data[i];
				for (var key in _paramsheader) {
					headerdata[_name][key] = _paramsheader[key];
				}
			}
		} else {
			for (var i = 0; i < header_data.length; i++) {
				var _name = header_data[i].name;
				var _data = header_data[i].data;
				headerdata[_name] = {};
				for (var j = 0; j < _data.length; j++) {
					var _paramsheader = _data[j];
					for (var key in _paramsheader) {
						headerdata[_name][key] = _paramsheader[key];
					}
				}
			}
		}
		return obj;
	}
}

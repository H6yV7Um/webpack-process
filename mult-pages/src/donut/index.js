var _DataSet = DataSet,
  DataView = _DataSet.DataView;

var data = [{
  item: '事例一',
  count: 40
}, {
  item: '事例二',
  count: 21
}, {
  item: '事例三',
  count: 17
}, {
  item: '事例四',
  count: 13
}, {
  item: '事例五',
  count: 9
}];
window.onload = () => {
  var dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  });
  var chart = new G2.Chart({
    container: 'mountNode',
    forceFit: true,
    height: window.innerHeight,
    animate: false
  });
  chart.source(dv, {
    percent: {
      formatter: function formatter(val) {
        val = val * 100 + '%';
        return val;
      }
    }
  });
  chart.coord('theta', {
    radius: 0.75,
    innerRadius: 0.6
  });
  chart.tooltip({
    showTitle: false,
    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
  });
  // 辅助文本
  chart.guide().html({
    position: ['50%', '50%'],
    html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
    alignX: 'middle',
    alignY: 'middle'
  });
  var interval = chart.intervalStack().position('percent').color('item').label('percent', {
    formatter: function formatter(val, item) {
      return item.point.item + ': ' + val;
    }
  }).tooltip('item*percent', function (item, percent) {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: percent
    };
  }).style({
    lineWidth: 1,
    stroke: '#fff'
  });
  chart.render();
  interval.setSelected(dv.rows[0]);

}

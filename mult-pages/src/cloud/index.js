import cloudData from './cloud'

window.onload = () => {
  function getTextAttrs(cfg) {
    return _.assign({}, {
      fillOpacity: cfg.opacity,
      fontSize: cfg.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: 'center',
      fontFamily: cfg.origin._origin.font,
      fill: cfg.color,
      textBaseline: 'Alphabetic'
    }, cfg.style);
  }
  // 给point注册一个词云的shape
  G2.Shape.registerShape('point', 'cloud', {
    drawShape(cfg, container) {
      const attrs = getTextAttrs(cfg);
      return container.addShape('text', {
        attrs: _.assign(attrs, {
          x: cfg.x,
          y: cfg.y
        })
      });
    }
  });
  const ds = new DataSet();
  const dv = ds.createView('g2pv').source(cloudData);
  dv.transform({
    type: 'tag-cloud',
    fields: ['site', 'pv'],
    font: 'Impact',
    // imageMask,
    size: [window.innerWidth, window.innerHeight],
    padding: 1,
    text(d) {
      const site = d.site;
      let index = site.indexOf('.');
      let text = site;
      if (index > 0 && index < site.length) {
        text = site.substr(0, index);
        // 当字符串是'www'时获取下一个
        if (text === 'www') {
          text = site.substr(index + 1);
          index = text.indexOf('.');
          text = text.substr(0, index);
        }
        // 当字符串是数字时获取整个网址
        if (/^[0-9]*$/g.test(text)) {
          text = site;
        }
      }
      return text;
    },
    fontSize(d) {
      const max = dv.max('pv');
      const min = dv.min('pv');
      return ((d.pv - min) / (max - min)) * (80 - 14) + 14;
    }
  });
  const chart = new G2.Chart({
    container: 'canvas',
    forceFit: true,
    height: window.innerHeight
  });
  chart.source(dv);
  chart.legend(false);
  chart.axis(false);
  chart.tooltip(true, {
    showTitle: false
  });
  chart.coord().reflect();
  chart.point()
    .position('x*y')
    .color('text')
    .size('size', function (size) {
      return size;
    })
    .shape('cloud');
  chart.render();
}

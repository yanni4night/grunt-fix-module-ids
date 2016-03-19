/**
  * Copyright (C) 2016 yanni4night.com
  * case.js
  *
  * changelog
  * 2016-03-19[09:58:01]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
const System = {
  imp: {},
  reg: {},
  import: function(id) {
    this.imp[id] = true;
  },
  register: function(id, deps) {
    if (id && id.constructor === String) {
      this.reg[id] = this.reg[id] || [];
      this.reg[id].push(deps);
    }
  }
};

System.register('A', ['B', 'C']);
System.register('B', ['C', 'D']);
System.register();
System.register(['C', 'D']);
System.import();
System.import('D');

module.exports = System;
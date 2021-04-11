import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../vant-variables.less'
import { Lazyload } from 'vant';

Vue.use(Lazyload, {
  lazyComponent: true
});

Vue.use(Vant)

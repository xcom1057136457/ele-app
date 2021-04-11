import vuescroll from 'vuescroll';
import Vue from 'vue'

Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'slide',
      sizeStrategy: 'percent',
      detectResize: true,
      pullRefresh: {
        enable: false,
        tips: {
          deactive: 'Pull to Refresh',
          active: 'Release to Refresh',
          start: 'Refreshing...',
          beforeDeactive: 'Refresh Successfully!'
        }
      },
      pushLoad: {
        enable: false,
        tips: {
          deactive: 'Push to Load',
          active: 'Release to Load',
          start: 'Loading...',
          beforeDeactive: 'Load Successfully!'
        },
        auto: false,
        autoLoadDistance: 0
      },
      paging: false,
      zooming: true,
      snapping: {
        enable: false,
        width: 100,
        height: 100
      },
      scroller: {
        /*
          Allow to scroll out of boundaries
          true or false or an array specify which direction can be
          bounced. The options can be:
          ['top','bottom','left','right']
        */
        bouncing: {
          top: 100,
          bottom: 100,
          left: 0,
          right: 0
        },
        /** Enable locking to the main axis if user moves only slightly on one of them at start */
        locking: true,
        /** Minimum zoom level */
        minZoom: 0,
        /** Maximum zoom level */
        maxZoom: 0,
        /** Multiply or decrease scrolling speed **/
        speedMultiplier: 1,
        /** This configures the amount of change applied to deceleration when reaching boundaries  **/
        penetrationDeceleration: 0.03,
        /** This configures the amount of change applied to acceleration when reaching boundaries  **/
        penetrationAcceleration: 0.08,
        /** Whether call e.preventDefault event when sliding the content or not */
        preventDefault: false,
        /** Whether call preventDefault when (mouse/touch)move*/
        preventDefaultOnMove: false,
        // whether to  disable scroller or not.
        disable: false
      }
    },
    scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: false,
      scrollingY: true,
      speed: 300,
      easing: undefined,
      verticalNativeBarPos: 'right',
      maxHeight: undefined,
      maxWidth: undefined,
    },
    bar: {
      showDelay: 200,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '2px',
      disable: false
    }
  }
});
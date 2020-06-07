import Vue from "vue";

// 给Notice添加一个创建组件实例的方法，可以动态编译自身模板并挂载
function create(Component, props) {
  // 创建一个Vue实例 ， vue实例不是dom，是一个容器，管理员
  const instance = new Vue({
    render(h) { // 渲染函数，用于渲染指定模板为虚拟dom
      // <BallAnim :el="el">
      return h(Component, { props })
    }
  }).$mount(); //执行挂载，若不指定选择器，则模板将被渲染为文档之外的元素，和真正dom挂钩

  // 必须使用原生DOM api把它插入文档中
  // $el指的是渲染的Notice中真实的dom元素,
  document.body.appendChild(instance.$el);

  // 获取 notice实例, $children指的是当前Vue实例中包含的所有组件实例
  const comp = instance.$children[0];
  comp.remove = () => {
    instance.$destroy(); // 销毁实例，释放内存
  }
  return comp;
}


// 暴露接口
export default create;
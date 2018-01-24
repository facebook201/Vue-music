### 播发器的开发

首先播发器可以通过多个组件来打开。 所以播放器的数据是全局的。使用vuex管理



> state
>
> state是原始数据 跟这个组件或者这个模块相关的底层数据。



> Getters
>
> Getters 是对state的映射。 它可以是一个函数 根据state来计算一个新的值



> mutations
>
> 定义怎么修改数据的逻辑。修改之前 先到mutations-type里面定义修改的动作。 一般是定义字符串常量。



> actions
>
> 如果在一个动作中多次改变mutations 。 那就要用到actions 他就是一个动作





### 播放器的动画效果

```Vue
<template>
  <!--正常部分的动画  事件钩子函数-->
  <transition name="normal" @enter >
  	
  </transition>
</template>	

<style>
  normal-enter-active, normal-leave-active{
     transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  }
  normal-enter, normal-leave-to{
    opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  }
</style>
```


















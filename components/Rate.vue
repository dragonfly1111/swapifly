<template>
  <div class="container">
    <div class="feedback" :style="!checkAble ? 'pointer-events: none' : ''">
      <div class="rating">
        <input type="radio" name="rating" :id="'rating-' + idVal + 5" @change="changeCheck(5)">
        <label :for="'rating-' + idVal + 5"></label>
        <input type="radio"  name="rating" :id="'rating-' + idVal + 4" @change="changeCheck(4)">
        <label :for="'rating-' + idVal + 4"></label>
        <input type="radio"  name="rating" :id="'rating-' + idVal + 3" @change="changeCheck(3)">
        <label :for="'rating-' + idVal + 3"></label>
        <input type="radio"  name="rating" :id="'rating-' + idVal + 2" @change="changeCheck(2)">
        <label :for="'rating-' + idVal + 2"></label>
        <input type="radio" name="rating" :id="'rating-' + idVal + 1" @change="changeCheck(1)">
        <label :for="'rating-' + idVal + 1"></label>
      </div>
    </div>
  </div>
</template>

<!-- 由于沙雕arco的rate组件在dialog中使用出不来 从codepen搞了一个 -->
<script setup>
const props = defineProps({
  idVal: {
    type: String,
    default: '',
  },
  checkAble: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['changeVal'])
const setValue = (e) =>{
  console.log('setValue')
  console.log(props)
  const ele = document.getElementById('rating-' + props.idVal + e)
  console.log(ele)
  ele.checked = true
}
const changeCheck = (e) =>{
  emits('changeVal', e)
}
defineExpose({
  setValue
})
</script>

<style scoped lang="scss">

.rating {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  overflow: hidden;
  flex-direction: row-reverse;
  position: relative;
  label{
    margin-right: 2px;
  }
}

.rating-0 {
  filter: grayscale(100%);
}

.rating > input {
  display: none;
}

.rating > label {
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-top: auto;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: .3s;
}

.rating > input:checked ~ label,
.rating > input:checked ~ label ~ label {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23FFB400' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}


.rating > input:not(:checked) ~ label:hover,
.rating > input:not(:checked) ~ label:hover ~ label {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23FFB400' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}

</style>

<template>
  <div class="input-group log-event" data-td-target-input="nearest" data-td-target-toggle="nearest">
    <a-input
        :model-value="inputValue"
        id="datetimepicker"
        data-td-target="#datetimepicker"
        data-td-toggle="datetimepicker"
        @input="changeInput"
        :placeholder="$t('profile.countries_birth_empty')"
    ></a-input>
  </div>
</template>
<script setup>
import {TempusDominus} from "@eonasdan/tempus-dominus";
import {useI18n} from "vue-i18n";
import {parseTime} from "~/utils/time";

const {t, locale} = useI18n();
const inputValue = ref(null);
// const showPicker = ref(false);
const emits = defineEmits(["change"]);

const props = defineProps({
  pickOptions: {
    default: () => ({
      components: {
        calendar: true,
        date: true,
        month: true,
        year: true,
        decades: true,
        clock: false,
        hours: false,
        minutes: false,
        seconds: false,
        useTwentyfourHour: undefined,
      },
    }),
  },
});
const picker = ref(null);
const initPicker = (data) => {
  console.log('----initPicker----')
  console.log(document.getElementById("datetimepicker"))
  nextTick(() => {
    console.log(document.getElementById("datetimepicker"))
    if (document.getElementById("datetimepicker")) {
      console.log(TempusDominus)
      console.log(document.getElementById("datetimepicker"))
      picker.value = new TempusDominus(document.getElementById("datetimepicker"), {
        localization: {
          locale: locale.value,
        },
        useCurrent: false,
        display: {
          buttons: {
            today: true,
            clear: true,
            close: true,
          },
          ...props.pickOptions,
        },
      });
      console.log(picker.value)
      changeInput();
      if (data) {
        setInput(data)
      }
      //logs the selected index. This will always be 0 if multipleDates is false
    }
  });
};

const setInput = (val) => {
  if (val) {
    nextTick(() => {
      const parsedDate = picker.value.dates.parseInput(new Date(val));
      picker.value.dates.setValue(parsedDate, picker.value.dates.lastPickedIndex);
    });
  }
};

const changeInput = (e) => {
  console.log(e);
  document
      .getElementById("datetimepicker")
      .getElementsByTagName("input")[0]
      .addEventListener("change", function (e) {
        console.log(e.detail.date);
        // inputValue.value = e.target.value;
        inputValue.value = parseTime(e.detail.date, "{y}-{m}-{d}");
        console.log(inputValue.value);
        emits("change", inputValue.value);
      });
};

// 删除弹出层
onBeforeUnmount(() => {
  var doms = document.getElementsByClassName("tempus-dominus-widget");
  doms = [].slice.apply(doms);
  doms = doms.filter(function (item) {
    item.remove();
  });
});

onUnmounted(() => {
  // showPicker.value = false;
});

defineExpose({
  initPicker,
  setInput,
});
</script>

<style>
.input-group {
  width: 100%;
}
</style>

<template>
  <div class="input-group log-event" data-td-target-input="nearest" data-td-target-toggle="nearest">
    <a-input
      :model-value="inputValue"
      id="datetimepicker"
      data-td-target="#datetimepicker"
      data-td-toggle="datetimepicker"
      @input="changeInput"
    ></a-input>
  </div>
</template>
<script setup>
import { TempusDominus } from "@eonasdan/tempus-dominus";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const inputValue = ref(null);
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
const initPicker = () => {
  if (document.getElementById("datetimepicker")) {
    picker.value = new TempusDominus(document.getElementById("datetimepicker"), {
      localization: {
        locale: locale.value,
      },
      display: {
        buttons: {
          today: true,
          clear: true,
          close: true,
        },
        ...props.pickOptions,
      },
    });
    changeInput();
    //logs the selected index. This will always be 0 if multipleDates is false
  }
};

const setInput = (val) => {
  const parsedDate = picker.value.dates.parseInput(new Date(val));
  picker.value.dates.setValue(parsedDate, picker.value.dates.lastPickedIndex);
};

const changeInput = (e) => {
  console.log('changeInput')
  console.log(e)
  document
    .getElementById("datetimepicker")
    .getElementsByTagName("input")[0]
    .addEventListener("change", function (e) {
      inputValue.value = e.target.value;
      emits("change", inputValue.value);
    });
};

defineExpose({
  initPicker,
  setInput
});
</script>

<style>
.input-group {
  width: 100%;
}
</style>

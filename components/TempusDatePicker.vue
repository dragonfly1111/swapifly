<template>
  <div class="input-group log-event" data-td-target-input="nearest" data-td-target-toggle="nearest">
    <a-input
      :model-value="inputValue"
      allow-clear
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
const { t } = useI18n();
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
        today: t("datePicker.today"),
        clear: t("datePicker.clear"),
        close: t("datePicker.close"),
        selectMonth: t("datePicker.selectMonth"),
        previousMonth: t("datePicker.previousMonth"),
        nextMonth: t("datePicker.nextMonth"),
        selectYear: t("datePicker.selectYear"),
        previousYear: t("datePicker.previousYear"),
        nextYear: t("datePicker.nextYear"),
        selectDecade: t("datePicker.selectDecade"),
        previousDecade: t("datePicker.previousDecade"),
        nextDecade: t("datePicker.nextDecade"),
        previousCentury: t("datePicker.previousCentury"),
        nextCentury: t("datePicker.nextCentury"),
        pickHour: t("datePicker.pickHour"),
        incrementHour: t("datePicker.incrementHour"),
        decrementHour: t("datePicker.decrementHour"),
        pickMinute: t("datePicker.pickMinute"),
        incrementMinute: t("datePicker.incrementMinute"),
        decrementMinute: t("datePicker.decrementMinute"),
        pickSecond: t("datePicker.pickSecond"),
        incrementSecond: t("datePicker.incrementSecond"),
        decrementSecond: t("datePicker.decrementSecond"),
        toggleMeridiem: t("datePicker.toggleMeridiem"),
        selectTime: t("datePicker.selectTime"),
        selectDate: t("datePicker.selectDate"),
        locale: "en", // 如果是中文 日期上面就会带有'日'、'周' 所以使用英文 并且手动配置字段
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

const changeInput = () => {
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
});
</script>

<style>
.input-group {
  width: 100%;
}
</style>

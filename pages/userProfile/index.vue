<template>
  <div class="common-row global-content">
    <div class="page-body">
      <div class="left-content">
        <a-tabs v-if="isMounted" position="right" :active-key="activeTab" @change="handleTabChange">
          <a-tab-pane key="profile" :title="$t('profile.edit_profile')"> </a-tab-pane>
          <a-tab-pane key="password" :title="$t('profile.edit_password')"> </a-tab-pane>
        </a-tabs>
        <div v-else style="width: 120px">
          <a-skeleton :animation="true">
            <a-skeleton-line :rows="2" :line-height="24" :line-spacing="12"/>
          </a-skeleton>
        </div>
      </div>
      <div class="right-content">
        <Profile v-if="activeTab == 'profile'" />
        <Password v-if="activeTab == 'password'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from "./components/Profile";
import Password from "./components/Password";
const route = useRoute();
const activeTab = ref("profile");
const isMounted = ref(false)
onMounted(()=>{
  isMounted.value = true
})
const type = route.query.type;
activeTab.value = type || 'profile'
const handleTabChange = (e) => {
  activeTab.value = e;
};
</script>

<style lang="scss" scoped>
@import "assets/sass/var";

:deep(.arco-tabs-tab) {
  border-color: transparent;
}
:deep(.arco-tabs-nav::before) {
  background-color: transparent;
}
.page-body {
  padding: 30px 0;
  display: flex;
  justify-content: flex-start;
  :deep(.arco-tabs-tab) {
    color: $grey-font-label;
  }
  :deep(.arco-tabs-tab-active, .arco-tabs-tab-active:hover) {
    color: $main-grey;
  }
  :deep(.arco-tabs-nav-ink) {
    background-color: $main-grey;
  }
}
.left-content{
  display: block;
  min-width: 120px;
  margin-left: 6vw;
}
.right-content {
  margin-left: 5vw;
  width: 60%;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .page-body{
    padding-top: 0;
  }
  .left-content{
    display: none;
  }
  .right-content{
    margin-left: 0;
    width: 100%;
  }

}
</style>

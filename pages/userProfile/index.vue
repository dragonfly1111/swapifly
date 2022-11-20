<template>
  <div class="common-row global-content">
    <div class="page-body">
      <a-row justify="end">
        <a-col flex="20%">
          <a-tabs position="right" :active-key="activeTab" @change="handleTabChange">
            <a-tab-pane key="profile" :title="$t('profile.edit_profile')"> </a-tab-pane>
            <a-tab-pane key="password" :title="$t('profile.edit_password')"> </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col flex="auto">
          <div class="right-content">
            <Profile v-show="activeTab == 'profile'" />
            <Password v-show="activeTab == 'password'" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import Profile from "./components/Profile";
import Password from "./components/Password";

const activeTab = ref("profile");

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
.right-content {
  margin: 0 15vw 0 5vw;
}
</style>

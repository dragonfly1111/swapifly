<template>
  <div class="common-row global-content">
    <div class="page-body">
      <a-row justify="end">
        <a-col flex="100px">
          <a-tabs position="right" :active-key="activeTab" @change="handleTabChange">
            <a-tab-pane key="profile" :title="$t('pages.edit_profile')"> </a-tab-pane>
            <a-tab-pane key="password" :title="$t('pages.edit_password')"> </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col flex="auto">
            <Profile v-show="activeTab == 'profile'" />
            <Password v-show="activeTab == 'password'" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, h } from "vue";
import Profile from "./components/Profile";
import Password from "./components/Password";
export default {
  name: "UserProfile",
  components: { Profile, Password },

  setup() {
    const activeTab = ref("profile");
    const handleQuery = (data) => {
      console.log("form", data);
    };

    const handleTabChange = (e) =>{
        console.log('e',e)
        activeTab.value = e
    }

    return {
      handleQuery,
      activeTab,
      handleTabChange
    };
  },
};
</script>

<style lang="scss" scoped>
.page-body {
  padding: 30px 0;
}
</style>

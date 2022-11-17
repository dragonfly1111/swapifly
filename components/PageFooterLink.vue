<template>
  <div class="page-footer-link">
    <section class="search-box">
      <div class="content-title">{{ $t("footer.recentTopSearches") }}</div>
      <div class="hot-search">
        <div class="hot-search-item" v-for="item in 20">
          <a-link href="link">关键词</a-link>
          <a-divider direction="vertical" />
        </div>
      </div>
    </section>

    <section class="footer-link-box">
      <div class="content-title bold">限量绝版</div>
      <div class="content">
        <div class="recommendation-item" v-for="item in 8">
          <a-link href="link">限量版</a-link>
        </div>
      </div>
    </section>
    <section class="footer-link-box">
      <div class="content-title bold">限量绝版</div>
      <div class="content">
        <div class="recommendation-item" v-for="item in 8">
          <a-link href="link">限量版</a-link>
        </div>
      </div>
    </section>
    <section class="footer-link-box">
      <div class="content-title bold">限量绝版</div>
      <div class="content">
        <div class="recommendation-item" v-for="item in 8">
          <a-link href="link">限量版</a-link>
        </div>
      </div>
    </section>

  </div>
</template>
<style scoped lang="scss">
.page-footer-link{
    padding: 20px 30px;
    border-top: 1px solid rgba(229, 229, 229, 1);
}

.content-title{
    margin: 10px 0;
    &.bold{
    font-weight: bold;
}
}

.search-box{
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    margin-bottom: 50px;
    .hot-search{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 10px;
        &-item{
            flex-shrink: 0;
            margin-bottom: 10px;
            .arco-link{
                color: rgba(42, 130, 228, 1);

            }
        }
    }
}

.footer-link-box{
    margin-bottom: 30px;
    .content{
        display: flex;
        flex-wrap: wrap;
        .arco-link{
            padding: 0;
            color: rgba(56, 56, 56, 1);
            margin-right: 20px;
        }
    }
}

</style>

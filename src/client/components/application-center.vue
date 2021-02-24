<template lang="pug">
.application-center.p-20(@click.self="close")
  .application-search-wrapper.flex.justify-center(@click.self="close")
    a-input.application-search(ref="search" @change.preserve="onSearchInput")
  .application-list.flex.py-10(@click.self="close")
    .application.mx-10(
      v-for="app of applications" 
      :key="app.name"
      @click.preserve="onOpenApp(app.name)"
      )
      div.icon: img(:src="app.icon")
      div.title.text-white.text-center.py-3 {{app.title}}
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { ApplicationList } from '@/config/application.config';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';

const store = useStore();
const subject = new Subject<string>();
const searchText = ref('');
const close = inject('close:application-center') as any;
const search = ref();

// 应用列表
const applications = computed(() => {
  const list = store.state.applications.map((app) =>
    ApplicationList.find((x) => x.name === app),
  );

  return list.filter((x) => x.title.includes(searchText.value));
});

const onOpenApp = (app) => {
  close();
  store.commit('openApp', app);
};

function onSearchInput({ target: { value } }) {
  subject.next(value);
}

subject.pipe(debounceTime(100)).subscribe((name) => {
  searchText.value = name;
});

function onEsc(e) {
  if (e.keyCode == 27) close();
}

onMounted(() => {
  const searchInput = search.value as any;
  searchInput.focus();
  document.addEventListener('keyup', onEsc);
});

onUnmounted(() => {
  document.removeEventListener('keyup', onEsc);
});
</script>

<style lang="stylus" scoped>
.application-center
  background:rgba(0,0,0,0.5)
  backdrop-filter: blur(5px)

  .application-search-wrapper
    .application-search
      width:300px
      height:40px
      background:rgba(50,50,50,0.8)
      border-color:rgba(255,255,255,0.3);
      color:#fff;
</style>

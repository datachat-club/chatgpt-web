<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { useRouter } from 'vue-router'
const router = useRouter
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const show = ref(false)
const handleLoginOut = async () => {
  localStorage.removeItem('pp-token')
  location.reload()
}
</script>

<template>
  <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
    <div class="flex-1 flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>

    <HoverButton @click="show = true">
      <span class="text-xl text-[#4f555e] dark:text-white">
        <SvgIcon icon="ri:settings-4-line" />
      </span>
    </HoverButton>
    <HoverButton @click="handleLoginOut()">
      <span class="text-xl text-[#e72c2c] dark:text-white">
        <SvgIcon icon="ic:sharp-log-out" />
      </span>
    </HoverButton>


    <!-- <Setting v-if="show" v-model:visible="show" /> -->
  </footer>
</template>

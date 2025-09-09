<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeStyle = computed(() => {
  const sizeMap = {
    xs: { width: '1rem', height: '1rem' },
    sm: { width: '1.5rem', height: '1.5rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' },
    xl: { width: '4rem', height: '4rem' },
  }
  return sizeMap[props.size]
})
</script>

<template>
  <svg :style="sizeStyle" viewBox="0 0 143 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M142 73.2252L142 48C142 45.2386 139.761 43 137 43L47 43C44.2386 43 42 45.2386 42 48L42 138C42 140.761 44.2386 143 47 143L142 143L142 112.588C127.382 113.372 106.5 111.587 106.5 94.9999C106.5 74.8376 127.382 72.4361 142 73.2252Z"
      fill="#732DAF"
    />
    <path
      d="M112 22.5C112 34.9264 101.926 45 89.5 45C77.0736 45 67 34.9264 67 22.5C67 10.0736 77.0736 0 89.5 0C101.926 0 112 10.0736 112 22.5Z"
      fill="#732DAF"
    />
    <circle cx="89.5" cy="157.5" r="22.5" fill="#732DAF" />
    <circle cx="22.5" cy="89.5" r="22.5" fill="#732DAF" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M142.5 48V73.2252C127.882 72.4361 107 74.8376 107 94.9999C107 111.587 127.882 113.372 142.5 112.588L142.5 142.592C140.263 142.86 137.783 142.999 135.037 143C135.024 143 135.012 143 135 143C134.981 143 134.962 143 134.943 143C97.6924 142.989 70 132.48 70 92.5C70 49.5 97.7207 43 135 43C136.118 43 137.192 43.0174 138.224 43.052C140.642 43.4028 142.5 45.4844 142.5 48Z"
      fill="#A742FF"
    />
  </svg>
</template>

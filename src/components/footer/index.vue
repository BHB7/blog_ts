<script setup lang="ts">
import LineMdGithubLoop from '~icons/line-md/github-loop'
import LogosPinia from '~icons/logos/pinia'
import LogosTypescript from '~icons/logos/typescript'
import LogosDaisyui from '~icons/logos/daisyui'
import DeviconTailwindcss from '~icons/devicon/tailwindcss'
import DeviconCloudflare from '~icons/devicon/cloudflare'
</script>
<template>
  <footer class="footer sm:footer-horizontal bg-base-100/70 bg-blur text-neutral-content p-10">
    <aside>
      <img class="w-20" src="/public/favicon.ico" alt="">
      BY 7z 2024
    </aside>
    <nav>
      <h6 class="footer-title">DEV</h6>
      <div class="grid grid-flow-col gap-4">
        <DeviconTailwindcss />
        <LogosPinia />
        <LogosTypescript />
        <DeviconCloudflare></DeviconCloudflare>
      </div>
    </nav>
  </footer>
</template>

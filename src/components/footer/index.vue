<script setup lang="ts">
import LineMdGithubLoop from '~icons/line-md/github-loop';
import LogosPinia from '~icons/logos/pinia';
import LogosTypescript from '~icons/logos/typescript';
import LogosDaisyui from '~icons/logos/daisyui';
import DeviconTailwindcss from '~icons/devicon/tailwindcss';
</script>
<template>
  <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
    <aside>
      <img class="w-20" src="/public/favicon.ico" alt="">
      7z' HOME BLOG @2024
    </aside>
    <nav>
      <h6 class="footer-title">DEV</h6>
      <div class="grid grid-flow-col gap-4">
        <DeviconTailwindcss />
        <LogosDaisyui />
        <LogosPinia />
        <LogosTypescript />
        <LineMdGithubLoop></LineMdGithubLoop>
      </div>
    </nav>
  </footer>
</template>

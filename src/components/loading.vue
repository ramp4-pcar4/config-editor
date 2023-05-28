<template>
  <div class="loader">
    {{ $t('loading') }}
  </div>
</template>

<style lang="css" scoped>
@property --a {
  initial-value: 0deg;
  inherits: false;
  syntax: '<angle>';
}
@property --h {
  initial-value: 0;
  inherits: false;
  syntax: '<number>';
}
.loader {
  padding: 2rem 4rem;
  font-family: monospace !important;
  font-weight: bold;
  color: #fff;
  border-style: solid;
  border-width: 1vmin;
  font-size: 2rem;
  --charge: hsl(var(--h, 0), 80%, 50%);
  -o-border-image: conic-gradient(var(--charge) var(--a), transparent calc(var(--a) + 0.5deg)) 30;
  border-image: conic-gradient(var(--charge) var(--a), transparent calc(var(--a) + 0.5deg)) 30;
  -webkit-animation: load 2s infinite ease-in-out;
  animation: load 2s infinite ease-in-out;
}
@-webkit-keyframes load {
  0%,
  10% {
    --a: 0deg;
    --h: 0;
  }
  100% {
    --a: 360deg;
    --h: 100;
  }
}
@keyframes load {
  0%,
  10% {
    --a: 0deg;
    --h: 0;
  }
  100% {
    --a: 360deg;
    --h: 100;
  }
}
</style>

### Install

```
npm install @kayrain/code --save
 
# or
yarn add @kayrain/code
```
### Example for vue

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" /> 
    <div id="container">
      <canvas id="canvas"></canvas>
      <input class="code" type="text" id="input" />
      <input @click="handleVerify" type="button" value="Enter" id="btn" />
    </div>
  </div>
</template>

<script>
import Verify from "@kayrain/code";

export default {
  name: "App",
  data() {
    return {
      verify: null,
    };
  },
  methods: {
    handleVerify() {
      const res = this.verify.check(document.getElementById("input").value);
      if (res) {
        alert("RIGHT");
      } else {
        alert("FALSE");
      }
    },
  },
  mounted() {
    this.verify = new Verify({
      id: "container", // containerID
      canvasId: "canvas", // canvasID
      width: "80",
      height: "30",
      code: "",
    });

    this.verify.refreshCode();
  },
};
</script> 

```
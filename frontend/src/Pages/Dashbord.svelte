<script>
  import { Link } from "svelte-navigator";

  var toggle = true;
</script>

<div class="transition duration-500 h-full flex flex-row ">
  <div
    class="transition duration-500 h-full {toggle
      ? 'md:w-56 sm:w-10'
      : 'w-10'} bg-gray-800"
  >
    <div class="w-full flex justify-center">
      <img
        src="./assets/img/Logo.png"
        alt="Logo"
        class={toggle ? "" : "hidden"}
      />
      <div />
    </div>
    <div class="w-full">
        <Link to="login/"
        ><div
          class="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400"
        >
          <div class="w-10 h-10 flex flex-row items-center justify-center">
            <i class="fa fa-user" />
          </div>
          <span class="ml-2">Login</span>
        </div></Link
      >
      <Link to="register/"
        ><div
          class="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400"
        >
          <div class="w-10 h-10 flex flex-row items-center justify-center">
            <i class="fa fa-user" />
          </div>
          <span class="ml-2">Register</span>
        </div></Link
      >
    </div>
  </div>

  <div>
    <button
      on:click={() => (toggle = !toggle)}
      class="w-10  h-10  flex items-center justify-center text-white border-0"
      ><i
        class="fa {toggle ? 'fa-chevron-left' : 'fa fa-chevron-right'}"
      /></button
    >
  </div>
</div>

<style>
</style>

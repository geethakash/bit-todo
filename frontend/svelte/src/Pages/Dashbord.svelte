<script>
import { onDestroy } from "svelte";

  import { Link } from "svelte-navigator";
  import { storedUser } from '../Stores/stores.js';
  import Spinner from '../Components/Spinner.svelte'

  var user = null;
  console.log(user);
  const unsubscribe = storedUser.subscribe(value => user = value)


  var toggle = true;

onDestroy(unsubscribe)
</script>

<div class="transition duration-500 h-full flex flex-row ">
  <div
    class="transition duration-500 h-full md:w-56 sm:w-10 bg-gray-800" style={toggle? '' : 'display:none'}
  >
    <div class="pl-3 w-full flex justify-start items-center border-b-2 text-gray-400">
      <!-- <img
        src="./assets/img/Logo.png"
        alt="Logo"
        class={toggle ? "" : "hidden"}
      /> -->
      <div class="w-1/4 h-10"><img src="./assets/img/user.png" class="h-full" alt="user"></div>
      <div >{user.username}</div>
      <div />
    </div>
    <div class="w-full">
      {#if user === !null}
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
    {:else}
    <Link to="logout/"
      ><div
        class="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400"
      >
        <div class="w-10 h-10 flex flex-row items-center justify-center">
          <i class="fa fa-signout" />
        </div>
        <span class="ml-2">Logout</span>
      </div></Link
    >
      {/if}
      
    </div>
  </div>

  <div class="w-full h-full">
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

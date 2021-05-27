<script>
  export let id = "switch";
  export let label = "Label";
  export let mono = false;
  export let checked;
</script>

<div class="switch">
  <input bind:checked {id} type="checkbox" class="switch-input" tabindex="0" />
  <label for={id} class="switch-label" class:mono>{label}</label>
</div>

<style>
  .switch {
    position: relative;
    display: inline-block;
  }
  .switch-input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .switch-label::before,
  .switch-label::after {
    content: "";
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .switch-label {
    display: block;
    cursor: pointer;
    margin-top: -4px;
    margin-left: 58px;
  }
  .switch-label::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 48px;
    height: 24px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #aaa;
    border-radius: 9999em;
    -webkit-transition: background-color 0.25s ease;
    -o-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
  }
  .switch-label::after {
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    -webkit-transition: left 0.25s ease;
    -o-transition: left 0.25s ease;
    transition: left 0.25s ease;
  }
  .switch-input:checked + .switch-label::before {
    background-color: rgb(32, 96, 149);
  }
  .switch-input:checked + .switch-label::after {
    left: 27px;
    top: 3px;
  }

  .mono::before {
    border: 2px solid white;
    background: none !important;
  }
</style>
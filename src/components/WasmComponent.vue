<script setup lang="ts">
  import { ref } from 'vue';
  import { getContract } from '@/api/contract.ts';

  const wasmBase64 = ref('');
  const functions = ref<string[]>([]);
  const functionName = ref('');
  const result = ref('');
  let wasmInstance: WebAssembly.Instance | null = null;

  const loadWasm = async () => {
    try {
      const res = await getContract();
      console.log(res.data.data);
      wasmBase64.value = res.data.data.replace(/\s/g, '');
      const wasmBinary = Uint8Array.from(atob(wasmBase64.value), c =>
        c.charCodeAt(0),
      );
      // test simple wasm
      // const wasmBinary = await (await fetch('/simple.wasm')).arrayBuffer();
      const wasmModule = await WebAssembly.compile(wasmBinary);
      const imports = {
        env: {
          abort: () => {},
          promise_results_count: () => {},
          promise_result: () => {},
          storage_has_key: () => {},
          storage_read: () => {},
          storage_write: () => {},
          storage_remove: () => {},
          storage_iter_create: () => {},
          storage_iter_next: () => {},
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
          promise_batch_then: () => {},
          promise_batch_create: () => {},
          promise_batch_action_create_account: () => {},
          promise_batch_action_deploy_contract: () => {},
          promise_batch_action_function_call: () => {},
          promise_batch_action_function_call_weight: () => {},
          promise_batch_action_transfer: () => {},
          promise_batch_action_stake: () => {},
          promise_batch_action_add_key_with_full_access: () => {},
          promise_batch_action_add_key_with_function_call: () => {},
          promise_batch_action_delete_key: () => {},
          promise_batch_action_delete_account: () => {},
          promise_and: () => {},
          promise_return: () => {},
          panic_utf8: () => {},
          register_len: () => {},
          read_register: () => {},
          current_account_id: () => {},
          signer_account_pk: () => {},
          predecessor_account_id: () => {},
          input: () => {},
          attached_deposit: () => {},
          value_return: () => {},
          log_utf8: () => {},
        },
      };
      wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
      functions.value = [];
      const ex = wasmInstance.exports;
      for (const name in ex) {
        debugger;
        if (typeof ex[name] === 'function') {
          functions.value.push(name);
        }
      }
      console.log(functions.value);
    } catch (err) {
      console.error('Error loading Wasm:', err);
    }
  };

  const callWasmFunction = () => {
    if (wasmInstance && wasmInstance.exports[functionName.value]) {
      try {
        const func = wasmInstance.exports[functionName.value] as Function;
        result.value = `Result: ${func()}`;
      } catch (err) {
        result.value = `Error: ${err}`;
      }
    } else {
      result.value = `Function ${functionName.value} not found`;
    }
  };
</script>

<template>
  <div>
    <h1>Wasm Functions</h1>
    <input v-model="wasmBase64" placeholder="Enter Base64 encoded Wasm" />
    <button @click="loadWasm">Load Wasm</button>
    <ul>
      <li v-for="func in functions" :key="func">{{ func }}</li>
    </ul>
    <div>
      <h2>Call Function</h2>
      <input v-model="functionName" placeholder="Enter Function Name" />
      <button @click="callWasmFunction">Call Function</button>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

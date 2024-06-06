import { getProbableInterfaces } from '@/utils/contract/getProbableInterfaces.ts';
import { ParsedContract } from '@/utils/contract/ParesedContract.ts';
import { getContractCode } from '@/api/contract.ts';

export async function parseContract(
  wasmBase64: string,
): Promise<ParsedContract> {
  const bytes = base64StringToUint8Array(wasmBase64);
  const wasmModule = await WebAssembly.compile(bytes);
  const methodNames = await exportedFunctionNames(wasmModule);
  const probableInterfaces = getProbableInterfaces(methodNames);

  return {
    methodNames,
    ...probableInterfaces,
  };
}

/**
 * Converts a base64-encoded string to a byte array. Works in browser and Node
 * environments.
 *
 * @param strb64 base64 string
 * @returns Decoded byte array
 */
function base64StringToUint8Array(strb64: string): Uint8Array {
  return new Uint8Array(
    atob(strb64.toString().trim())
      .split('')
      .map(c => c.charCodeAt(0)),
  );
}

/**
 * Retrieves the names of all exported functions from a WebAssembly module.
 *
 * @param {WebAssembly.Module} wasmModule - The WebAssembly module to extract the exported function names from.
 * @return {Promise<string[]>} An array of strings containing the names of all exported functions.
 */
async function exportedFunctionNames(
  wasmModule: WebAssembly.Module,
): Promise<string[]> {
  const exports = WebAssembly.Module.exports(wasmModule);

  return exports.filter(e => e.kind === 'function').map(e => e.name);
}

async function loadWasm(accountId: string) {
  let wasmInstance;
  try {
    const res = await getContractCode(accountId);
    let strb64 = res.data.data.code_base64.replace(/\s/g, '');
    const wasmBinary = Uint8Array.from(atob(strb64), c => c.charCodeAt(0));
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
        block_index: () => {},
        storage_usage: () => {},
      },
    };
    let functions = [];
    wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
    const exs = wasmInstance.exports;
    for (const e in exs) {
      debugger;
      if (typeof exs[e] === 'function') {
        functions.push(e);
      }
    }
  } catch (err) {
    console.error('Error loading Wasm:', err);
  }
}

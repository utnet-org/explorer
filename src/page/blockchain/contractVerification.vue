<script setup lang="ts">
  // 验证并发布合约源代码
  import { ElMessage } from 'element-plus';
  import { onMounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // import Mock from 'mockjs';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  // defineProps<{ msg: string }>()
  const size = getScreenSize().currentScreenSize;
  const address = ref('');
  const compilerVersion = ref(null);
  const CompilerVersionOptions = ref([
    {
      value: 'v0.8.19+commit.7dd6d404',
      label: 'v0.8.19+commit.7dd6d404',
    },
    {
      value: 'v0.8.18+commit.87f61d96',
      label: 'v0.8.18+commit.87f61d96',
    },
    {
      value: 'v0.8.17+commit.8df45f5f',
      label: 'v0.8.17+commit.8df45f5f',
    },
    {
      value: 'v0.8.16+commit.07a7930e',
      label: 'v0.8.16+commit.07a7930e',
    },
    {
      value: 'v0.8.15+commit.e14f2714',
      label: 'v0.8.15+commit.e14f2714',
    },
    {
      value: 'v0.8.14+commit.80d49f37',
      label: 'v0.8.14+commit.80d49f37',
    },
    {
      value: 'v0.8.13+commit.abaa5c0e',
      label: 'v0.8.13+commit.abaa5c0e',
    },
    {
      value: 'v0.8.12+commit.f00d7308',
      label: 'v0.8.12+commit.f00d7308',
    },
    {
      value: 'v0.8.11+commit.d7f03943',
      label: 'v0.8.11+commit.d7f03943',
    },
    {
      value: 'v0.8.10+commit.fc410830',
      label: 'v0.8.10+commit.fc410830',
    },
  ]);
  const openSourceLicenseTypes = ref(null);
  const openSourceLicenseTypesOptions = ref([
    {
      value: 'No License (None)',
      label: 'No License (None)',
    },
    {
      value: 'The Unlicense (Unlicense)',
      label: 'The Unlicense (Unlicense)',
    },
    {
      value: 'MIT License (MIT)',
      label: 'MIT License (MIT)',
    },
    {
      value: 'GNU General Public License v2.0 (GNU GPLv2)',
      label: 'GNU General Public License v2.0 (GNU GPLv2)',
    },
    {
      value: 'GNU General Public License v3.0 (GNU GPLv3)',
      label: 'GNU General Public License v3.0 (GNU GPLv3)',
    },
    {
      value: 'GNU Lesser General Public License v2.1 (GNU LGPLv2.1)',
      label: 'GNU Lesser General Public License v2.1 (GNU LGPLv2.1)',
    },
    {
      value: 'GNU Lesser General Public License v3.0 (GNU LGPLv3)',
      label: 'GNU Lesser General Public License v3.0 (GNU LGPLv3)',
    },
    {
      value: 'BSD 2-clause "Simplified" license (BSD-2-Clause)',
      label: 'BSD 2-clause "Simplified" license (BSD-2-Clause)',
    },
    {
      value: 'BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)',
      label: 'BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)',
    },
    {
      value: 'Mozilla Public License 2.0 (MPL-2.0)',
      label: 'Mozilla Public License 2.0 (MPL-2.0)',
    },
  ]);
  const checkTermsOfService = ref(false);
  const nextStep = () => {
    if (!address.value) {
      return;
    }
    if (!compilerVersion.value) {
      return;
    }
    if (!openSourceLicenseTypes.value) {
      return;
    }
    if (!checkTermsOfService.value) {
      ElMessage.error('请同意服务条款');
      return;
    }
    console.log(
      address.value,
      compilerVersion.value,
      openSourceLicenseTypes.value,
      checkTermsOfService.value,
    );
  };
  const resetAll = () => {
    address.value = '';
    compilerVersion.value = null;
    openSourceLicenseTypes.value = null;
  };
  onMounted(() => {});
</script>
<template>
  <div class="content">
    <HeaderPage />
    <div
      :style="size === Screen.Large ? 'height: 160px' : 'height: 180px'"
    ></div>
    <div class="block_list">
      <div class="content_header">
        <div class="main_title"
          >{{ $t('home.Verify_and_publish_contract_source_code') }}
        </div>
        <div class="sub_title">
          {{ $t('home.Compiler_typeand_version_selection') }}
        </div>
      </div>
      <div class="content_text">
        {{ $t('home.Source_code_verification') }}
      </div>
      <div class="setion_input">
        <div class="setion_input_title">{{
          $t('home.Please_enter_the_contract')
        }}</div>
        <el-input
          class="input_element"
          v-model="address"
          :placeholder="$t('home.Please_enter_address')"
          clearable
        />
      </div>
      <div class="setion_input">
        <div class="setion_input_title">{{
          $t('home.Please_select_a_compiler')
        }}</div>
        <el-select-v2
          v-model="compilerVersion"
          :options="CompilerVersionOptions"
          :placeholder="$t('home.Please_select_from')"
          :style="size === Screen.Large ? 'width: 50%;' : 'width: 90%;'"
          filterable
          clearable
        />
      </div>
      <div class="setion_input">
        <div class="setion_input_title">{{
          $t('home.Please_select_an_open')
        }}</div>
        <el-select-v2
          v-model="openSourceLicenseTypes"
          :options="openSourceLicenseTypesOptions"
          :placeholder="$t('home.Please_select_from')"
          :style="size === Screen.Large ? 'width: 50%;' : 'width: 90%;'"
          filterable
          clearable
        />
      </div>
      <el-checkbox class="checkbox" v-model="checkTermsOfService">{{
        $t('home.I_agree_to_the_terms_of_service')
      }}</el-checkbox>
      <div class="submit_botton_group">
        <div class="continue" @click="nextStep">Continue</div>
        <div class="reset" @click="resetAll">{{ $t('home.reset') }}</div>
      </div>
      <div class="view_contract_list">{{ $t('home.View_contract_list') }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
    position: relative;

    .block_list {
      width: calc(100% - 64px);
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0px 4px 15px 0px rgba(92, 255, 243, 0.1),
        0px 4px 8px 0px rgba(0, 0, 0, 0.04);
      position: relative;
      z-index: 10;
      margin: 35px auto 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      .content_header {
        width: calc(100% - 82px);
        height: 155px;
        margin: 0 41px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 0.5px solid #3edfcf;

        .main_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .sub_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 18px;
          font-weight: 400;
          opacity: 0.5;
        }
      }

      .content_text {
        width: calc(100% - 108px);
        padding: 71px 54px 20px;
        color: #000;
        text-align: center;
        font-family: PingFang SC;
        font-size: 18px;
        font-weight: 400;
        opacity: 0.5;
      }

      .setion_input {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 23px;

        .setion_input_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 8px;
        }

        .input_element {
          width: 50%;
        }
      }

      .checkbox {
        margin: 43px 0;
      }

      .submit_botton_group {
        display: flex;
        justify-content: center;
        color: #191919;
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 400;

        .continue {
          width: 126px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          flex-shrink: 0;
          border-radius: 76px;
          background: #3edfcf;
          margin-right: 48px;
          cursor: pointer;
        }

        .reset {
          width: 126px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          flex-shrink: 0;
          border-radius: 76px;
          background: linear-gradient(
            180deg,
            rgba(118, 221, 214, 0.25) 0%,
            rgba(140, 180, 197, 0.31) 51.56%,
            rgba(140, 180, 197, 0.5) 100%
          );
          cursor: pointer;
        }
      }

      .view_contract_list {
        margin: 94px 0 45px;
        color: #0facb6;
        font-family: PingFang SC;
        font-size: 18px;
        font-weight: 400;
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 320px) and (max-width: 843px) {
    .content {
      .block_list {
        width: calc(100% - 36px);
        margin: 0 18px 36px;

        .content_header {
          width: calc(100% - 44px);
          margin: 0 22px;

          .main_title {
            font-size: 20px;
            margin-bottom: 23px;
          }

          .sub_title {
            font-size: 16px;
          }
        }

        .content_text {
          width: calc(100% - 64px);
          padding: 42px 32px;
          font-size: 14px;
        }

        .setion_input {
          .setion_input_title {
            font-size: 16px;
            margin-bottom: 14px;
          }

          .input_element {
            width: 90%;
          }
        }

        .submit_botton_group {
          .continue {
            margin-right: 68px;
          }
        }

        .view_contract_list {
          margin: 51px 0 79px;
        }
      }
    }
  }

  // :global(.el-input .el-input__wrapper) {
  //     padding: 11px;
  // }

  // :global(.el-input__inner) {
  //     color: #000;
  //     font-family: PingFang SC;
  //     font-size: 20px;
  //     font-weight: 400;
  // }
</style>

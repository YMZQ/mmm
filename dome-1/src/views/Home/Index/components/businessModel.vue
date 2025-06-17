<script setup>

</script>

<template>
  <div class="px-16 mb-30">
    <div class="text-18 text-center font-bold mb-12">{{ $t('home.businessModel.title') }}</div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.businessModel.text-0') }}
    </div>
    <div class="flex bg-[#20191a] mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.businessModel.text-1') }}:</span>
          <span>0.01</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.businessModel.text-2', {text: 'BNB'}) }}:</span>
          <span>{{ $t('home.businessModel.text-3', {number: 3}) }}</span>
        </div>
      </div>
    </div>
    <div class="text-style-1 text-14 mb-10"> {{ $t('home.businessModel.text-4') }}</div>
    <div class="text-12 font-500 mb-10">{{ $t('home.businessModel.text-5') }}</div>
    <div class="text-center border border-sold border-[rgba(255,255,255,0.30)] rounded-sm mb-12">
      <div
          class="font-bold grid grid-cols-3 py-6 bg-[linear-gradient(180deg,#FB4B18_37.3%,#8F2405_100%)] rounded-[10px_10px_0_0]">
        <div>{{ $t('home.businessModel.text-6') }}</div>
        <div>{{ $t('home.businessModel.text-7') }}</div>
        <div>{{ $t('home.businessModel.text-8') }}</div>
      </div>
      <div class="grid grid-cols-3 ">
        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">1-2{{
            $t('home.businessModel.text-9')
          }}
        </div>
        <div class="py-9 border-b border-x border-solid border-[rgba(255,255,255,0.30)]">10%-9%</div>
        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">1BNB</div>

        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">3-4{{
            $t('home.businessModel.text-9')
          }}
        </div>
        <div class="py-9 border-b border-x border-solid border-[rgba(255,255,255,0.30)]">8%-7%</div>
        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">2BNB</div>


        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">5-6{{
            $t('home.businessModel.text-9')
          }}
        </div>
        <div class="py-9 border-b border-x border-solid border-[rgba(255,255,255,0.30)]">6%-4%</div>
        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">3BNB</div>

        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">7-8{{
            $t('home.businessModel.text-9')
          }}
        </div>
        <div class="py-9 border-b border-x border-solid border-[rgba(255,255,255,0.30)]">3%-2%</div>
        <div class="py-9 border-b border-solid border-[rgba(255,255,255,0.30)]">4BNB</div>

        <div class="py-9">9{{ $t('home.businessModel.text-9') }}</div>
        <div class="py-9 border-x border-solid border-[rgba(255,255,255,0.30)]">1%</div>
        <div class="py-9">5BNB</div>
      </div>
    </div>
    <div class="text-style-1 text-14 mb-10"> {{ $t('home.businessModel.text-10') }}</div>
    <div class="px-30">
      <div class="px-10 flex items-end text-12 text-center">
        <div class="pt-21 w-[30%] ">
          <div class="px-6 mb-4">{{ $t('home.businessModel.text-11') }}</div>
          <div
              class="h-[72px] rounded-[5px_0_0_0] bg-[linear-gradient(180deg,#FD4E1C_0.11%,#982301_106.73%)] text-style-2 flex items-center justify-center">
            3%
          </div>
        </div>
        <div class="pt-21 w-[40%] ">
          <div class="px-6 mb-4">{{ $t('home.businessModel.text-12') }}</div>
          <div
              class="h-[102px] rounded-[5px_5px_0_0] bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)] text-style-2 flex items-center justify-center">
            4%
          </div>
        </div>
        <div class="pt-21 w-[30%]">
          <div class="px-6 mb-4">{{ $t('home.businessModel.text-13') }}</div>
          <div
              class="h-[72px] rounded-[0_5px_0_0] bg-[linear-gradient(180deg,#FD4E1C_0.11%,_#982301_106.73%)] text-style-2 flex items-center justify-center">
            3%
          </div>
        </div>
      </div>
      <div class="rounded-[2px] h-[8px] bg-[linear-gradient(180deg,#FD4E1C_0.11%,#982301_106.73%)]"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.text-style-1 {
  font-weight: 500;
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-style-2 {
  color: #FFF;
  text-align: justify;
  font-feature-settings: 'liga' off, 'clig' off;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  font-family: 'AaYuanWeiTuSi';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 130% */
}
</style>

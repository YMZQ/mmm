<template>
	<van-pull-refresh v-model="isRefresh" @refresh="refreshClick" :loading-text="$t('common.loading')"
		:success-text="$t('common.refreshSuccess')">
		<van-list v-model:loading="isListLoading" :loading-text="$t('common.loading')" :finished="isFinished" :offset="state.offset"
			finished-text="" :immediate-check="false" @load="onLoad">
			<slot></slot>
		</van-list>
	</van-pull-refresh>
	<div v-if="state.nodata === true">
		<van-empty :image="getImageUrl('img')" :description="$t('common.noData')" />
	</div>
</template>
<script setup>
	const { proxy } = getCurrentInstance();
	const emits = defineEmits(['getList', 'update:pageModel', 'update:dataList', 'update:dataInfo']);
	const props = defineProps({
		pageModel: {
			type: Object,
			default: () => {
				return {
					pageNo: 1,
					pageSize: 20,
					total: 0,
					pages: 0
				}
			},
		},
		dataList: {
			type: [Array],
			default: () => []
		},
		dataInfo: {
			type: Object,
			default: () => {
				return {}
			},
		},
		getListApi: {
			type: Function,
			default: () => {}
		}
	});

	const state = {
		offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
		nodata: false,
	};

	// 控制下拉刷新的状态，如果为true则会显示，则为一直处于加载中，到请求接口成功手动设置false,则代表刷新成功
	const isRefresh = ref(false);

	// 可以判断如果是上拉加载的最后一页的时候，加载成功设置为true,再上拉则不会进行加载了
	const isFinished = ref(false);

	// 是否在加载过程中，如果是true则不会继续出发onload事件
	const isListLoading = ref(false);

	onBeforeMount(() => {
		getList()
	});
  const getImageUrl = (name) => {
    return new URL(`/src/assets/image/empty-img/${name}.png`, import.meta.url).href;
  }
	const refreshClick = () => {
		isRefresh.value = true;
		isFinished.value = false;
		isListLoading.value = true;
    // 通过接口调用数据
    props.pageModel.pageNo = 1;
    props.pageModel.pageSize = 20;
    props.pageModel.pages = 0;
    props.pageModel.total = 0;
    emits('update:pageModel', props.pageModel)
    getList()
	};

	const onLoad = () => {
		isListLoading.value = true
		if (props.pageModel.pageNo + 1 > props.pageModel.pages) {
			isFinished.value = true
			isListLoading.value = false
			return;
		} else {
			props.pageModel.pageNo = props.pageModel.pageNo + 1;
		}
		emits('update:pageModel', props.pageModel)
		getList()
	};

  const searchFun = () => {
    // 通过接口调用数据
    props.pageModel.pageNo = 1;
    emits('update:pageModel', props.pageModel)
    getList()
  };

	const dataList = ref([]);
	const dataInfo = ref({});
	const getList = () => {
    isListLoading.value = true;
    if (props.pageModel.pageNo === 1) ;
    props.getListApi(props.pageModel).then((result) => {
      let tempList = result.page.pageItems
      let dataInfo = result
      dataInfo.value = dataInfo
      props.pageModel.pageSize = result.page.pageSize
      props.pageModel.pageNo = result.page.pageNumber
      props.pageModel.pages = result.page.pagesAvailable
      props.pageModel.total = result.page.pageTotle
      isListLoading.value = false
      isRefresh.value = false
      if (props.pageModel.total !== 0) {
        if (props.pageModel.pageNo === 1) {
          dataList.value = tempList
        } else {
          dataList.value = [...props.dataList, ...tempList]
        }
      } else {
        dataList.value = []
        state.nodata = true;
      }
      emits('update:dataList', dataList.value)
      emits('update:dataInfo', dataInfo.value)
      emits('update:pageModel', props.pageModel)
      isListLoading.value = false;
    })
	};
	// 判断是否有数据
	watch(() => props.pageModel.total, (newValue, oldValue) => {
		state.nodata = !(newValue > 0)
	})
</script>

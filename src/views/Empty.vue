<template>
	<div class="PageList">
		<t-table
			row-key="index"
			:data="data"
			:columns="columns"
			height="300"
			:hover="true"
			:resizable="true"
			:hide-sort-tips="true"
			:header-affixed-top="true"
			:show-sort-column-bg-color="true"
			:pagination="pagination"
			cell-empty-content="-"
		>
		</t-table>
	</div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
const data: TableProps['data'] = [];
const total = 28;
for (let i = 0; i < total; i++) {
	data.push({
		index: i + 1,
		applicant: ['贾明', '张三', '王芳'][i % 3],
		status: i % 3,
		channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
		detail: {
			email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
		},
		matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
		time: [2, 3, 1, 4][i % 4],
		createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
	});
}
const columns = ref<TableProps['columns']>([
	{
		colKey: 'applicant',
		title: '申请人',
		width: '100',
		fixed: 'left',
	},
	{
		colKey: 'status',
		title: '申请状态',
		width: '800',
	},
	{
		colKey: 'channel',
		title: '签署方式',
		width: '800',
	},
	{
		colKey: 'detail.email',
		title: '邮箱地址',
		width: '800',
		ellipsis: true,
	},
	{
		colKey: 'createTime',
		title: '申请时间',
		width: '200',
		fixed: 'right',
	},
]);
const pagination: TableProps['pagination'] = {
	defaultCurrent: 1,
	defaultPageSize: 10,
	total,
};
</script>

<template>
    <div class="AgGrid">
        <div class="card-body">
            <div class="row">
                <div class="buttonList">
                    <p class="add" @click="add()">点击添加数据</p>
                    <p class="add" @click="addColumn()">新增列</p>
                    <p class="add" @click="selectData()">输出选中数据</p>
                    <p class="add" @click="deleteFun()">删除选中数据</p>
                </div>
                <div class="col-lg-12">
                    <ag-grid-vue
                        style="width: 100%; height: 300px"
                        class="ag-theme-balham"
                        :gridOptions="gridOptions"
                        :columnDefs="columnDefs"
                        :rowDataChanged="onRowDataChanged"
                        :rowSelected="onRowSelected"
                        :rowData="rowData"
                        @grid-ready="onReady"
                        rowSelection="multiple"
                    >
                    </ag-grid-vue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";
export default {
name: "App",
    data() {
        return {
            columnDefs: null,
            rowData: null,
            gridOptions: null,
        };
    },
    components: {
        AgGridVue,
        "edit-component": {
            template: '<span @click="editTable">编辑</span>',
            methods: {
                editTable() {
                    console.log(this.params.data);
                    alert(JSON.stringify(this.params.data));
                },
            },
        },
    },
    created() {
        (this.gridOptions = {
            defaultColDef: {
                sortable: true,
				resizable: true,
				filter: true
			},
			pagination: true,  //开启分页（前端分页）
			paginationAutoPageSize: true, //根据网页高度自动分页（前端分页）
            enableColResize: true,
            enableSorting: true,
            suppressRowClickSelection: true,
            columnDefs: this.createColumnDefs(),
        }),
		(this.rowData = [
			{
				test1: "张三",
				test2: "男",
				test3: "3333",
				test4: "44444",
				test5: "55555",
				test6: "6666",
				test7: "江苏",
			},
			{
				test1: "张三",
				test2: "男",
				test3: "ccc",
				test4: "ddd",
				test5: "eee",
				test6: "fffff",
				test7: "江苏",
			},
			{
				test1: "李四",
				test2: "女",
				test3: "455",
				test4: "hj",
				test5: "uhyt",
				test6: "fffff",
				test7: "浙江",
			},
		]);
    },
    methods: {
        createColumnDefs() {
            this.columnDefs = [
                {
                    headerName: "分组A",
                    children: [
                        {
                            headerName: "#",
                            field: "deliver",
                            suppressSorting: true,
                            checkboxSelection: true,
                            headerCheckboxSelection: true,
                            width: 100,
                        },
                        {
                            headerName: "性别",
                            field: "test2",
                            cellEditor: "agSelectCellEditor",
                            cellEditorParams: { values: ["男", "女"] },
                        },
                        {
                            headerName: "姓名",
                            field: "test1",
                        },
                        {
                            headerName: "表头3",
                            field: "test3",
                            cellStyle: { color: "red" },
                        },
                        { headerName: "表头4", field: "test4" },
                        { headerName: "表头5", field: "test5" },
                        { headerName: "表头6", field: "test6" },
                    ],
                },
                {
                    headerName: "操作",
                    children: [
                        {
                            headerName: "编辑",
                            field: "edit",
                            cellRendererFramework: "edit-component",
                            suppressSorting: true,
                        },
                    ],
                },
            ];
        },
        onReady(params) {
            params.api.sizeColumnsToFit();
        },
        add() {
            this.rowData.push({
                test1: "亚马逊",
                test2: "男 ",
                test3: "电商",
                test7: "北京"
            });
        },
        addColumn() {
            this.gridOptions.columnDefs.push({
                headerName: "地址",
                field: "test7",
            });
            this.gridOptions.api.setColumnDefs(this.gridOptions.columnDefs);
            //调整表格大小自适应
            this.gridOptions.api.sizeColumnsToFit();
        },
        selectData() {
            console.log(this.gridOptions.api.getSelectedRows());
        },
        deleteFun() {
            var selRows = this.gridOptions.api.getSelectedRows(); //获取选中的行
            if (selRows.length <= 0) {
                this.$confirm("请选中一行数据");
                return;
            }
            this.gridOptions.api.updateRowData({ remove: selRows });
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
            });
        },
        onRowSelected() {
            console.log(this.gridOptions.api.getSelectedRows());
        },
    },
};
</script>

<style>
.buttonList {
    display: flex;
    margin-bottom: 15px;
}
.buttonList .add {
    cursor: pointer;
    border: 1px solid #c1c0c0;
    width: 120px;
    text-align: center;
    padding: 8px;
    margin-right: 20px;
}
.buttonList .add:hover {
    background-color: #eee;
}
</style>
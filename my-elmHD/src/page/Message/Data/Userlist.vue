<template>
    <div class="yhlist">
        <div class="table">
            <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
                <el-table-column type="index" width="100"></el-table-column>
                <el-table-column property="registe_time" label="注册日期" width="200"></el-table-column>
                <el-table-column property="username" label="用户姓名" width="200"></el-table-column>
                <el-table-column property="city" label="注册地址"></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="20"
                    background
                    layout="total, prev, pager, next"
                    :total=count>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        currentRow: null,
        currentPage:1,
        count:0
      }
    },

    methods: {
        handleCurrentChange(val) {
            this.axios
            .get('https://elm.cangdu.org/v1/users/list?offset='+(val-1)*20+'&limit=20')
            .then(res=>{
                this.tableData=res.data
            })
        },
        handleSizeChange(val) {
            this.axios
            .get('https://elm.cangdu.org/v1/users/list?offset='+(val-1)*20+'&limit=20')
            .then(res=>{
                this.tableData=res.data
            })
        }
    },
    mounted(){
        this.axios
        .get('https://elm.cangdu.org/v1/users/list?offset=0&limit=20')
        .then(res=>{
            this.tableData=res.data
        })

        this.axios
        .get('https://elm.cangdu.org/v1/users/count')
        .then(res=>{
            this.count=res.data.count
        })
    }
}
</script>

<style lang="scss" scoped>
    .yhlist{
        width:100%;
        height:100%;
        padding-bottom: 50px;
    }
    .el-table__row{
        line-height: 15px;
    }
    .el-table thead {
        color: #333;
        font-weight: 500;
        background: pink;
    }
    .page{
        margin-top: 15px;
        margin-left: 20px;
    }
    .el-table__header .has-gutter tr{
        background-color: #EEF1F6;
        color:#1F2D3D;
    }
    .table{
        padding: 20px;
        .el-table{
            border: 1px solid #DFE6EC;
        }
    }
    
</style>

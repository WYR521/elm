<template>
    <div class="foodlist">
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="店铺名称">
                            <span>{{ props.row.restaurant_name }}</span>
                        </el-form-item>
                        <el-form-item label="收货地址">
                            <span>{{ props.row.item_id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.restaurant_id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column label="订单 ID" prop="id"></el-table-column>
                <el-table-column label="总价格" prop="total_amount"></el-table-column>
                <el-table-column label="订单状态" prop="status_bar.title"></el-table-column>
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
        currentPage:1,
        count:0
      }
    },
    methods: {
        handleCurrentChange(val) {
            this.axios
            .get('https://elm.cangdu.org/bos/orders?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined')
            .then(res=>{
                this.tableData=res.data
            })
        },
        handleSizeChange(val) {
            this.axios
            .get('https://elm.cangdu.org/bos/orders?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined')
            .then(res=>{
                this.tableData=res.data
            })
        }
    },
    mounted(){
        this.axios
        .get('https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined')
        .then(res=>{
            console.log(res.data)
            this.tableData=res.data
        })

        this.axios
        .get('https://elm.cangdu.org/bos/orders/count?restaurant_id=undefined')
        .then(res=>{
            console.log(res.data)
            this.count=res.data.count
        })

    }
}
</script>

<style lang="scss" scoped>
    .foodlist{
        width: 100%;
        height:100%;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
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

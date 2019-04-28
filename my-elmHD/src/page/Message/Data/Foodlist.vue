<template>
    <div class="foodlist">
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="食品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆名称">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="食品 ID">
                            <span>{{ props.row.item_id }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆 ID">
                            <span>{{ props.row.restaurant_id }}</span>
                        </el-form-item>
                        <el-form-item label="食品介绍">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆地址">
                            <span>{{ props.row.rating }}</span>
                        </el-form-item>
                        <el-form-item label="食品评分">
                            <span>{{ props.row.recent_order_num }}</span>
                        </el-form-item>
                        <el-form-item label="食品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="月销量">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name"></el-table-column>
                <el-table-column label="食品介绍" prop="category"></el-table-column>
                <el-table-column label="评分" prop="rating"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
            .get('https://elm.cangdu.org/shopping/v2/foods?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined')
            .then(res=>{
                this.tableData=res.data
            })
        },
        handleSizeChange(val) {
            this.axios
            .get('https://elm.cangdu.org/shopping/v2/foods?offset='+(val-1)*20+'&limit=20&restaurant_id=undefined')
            .then(res=>{
                this.tableData=res.data
            })
        }
    },
    mounted(){
        this.axios
        .get('https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined')
        .then(res=>{
            console.log(res.data)
            this.tableData=res.data
        })

        this.axios
        .get('https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=undefined')
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

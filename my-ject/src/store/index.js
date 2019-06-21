import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);



// import VuePersist from 'vuex-persist'
// const vuexLocal=new VuePersist({
//     storage:window.localStorage
// })


export default new vuex.Store({
    // plugins:[vuexLocal.plugin], 
    state:{ 
        user_id:'',   //id
        address:'',   //新增地址
        name:'',      //用户名
        shopCar:[],    //加入购物车
        Allnum:0,     //总数
        Allprice:0    //总价

    },
    mutations:{ 
        login(state,res){
            state.user_id=res.data.user_id;
            window.localStorage.setItem('user_id',res.data.user_id)
        },
        back(state){
            state.user_id=''
        },
        ress(state,item){
            state.address=item.name
        },
        name(state,uname){
            state.name=uname
        },
        add(state,k){
            let cart=JSON.parse(localStorage.getItem("shopCar"))
            if(cart){
                state.shopCar=cart
            }
            if(state.shopCar.length==0){
                k.number++
                state.shopCar.push(k)
            }else{
                //去重
                var bool = true;
                state.shopCar.map(i => {
                    if (i.item_id === k.item_id){
                        i.number++;
                        bool = false
                    }
                })
            }
            //没有重复  直接加入购物车
            if(bool === true){
                k.number++
                state.shopCar.push(k)
            }
            getCarInfo(state)
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        },
        less(state,k){
            state.shopCar.map((i,index)=>{
                if(i.item_id === k.item_id){
                    if(i.number>0){
                        i.number--;
                    }else{
                        state.shopCar.splice(index,1) 
                    }
                }
            })
            getCarInfo(state)
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        }
    }
})

function getCarInfo(state){
    state.Allnum = 0;
    state.Allprice = 0;
    state.shopCar.map(item=>{
        state.Allnum += item.number
        state.Allprice += item.specfoods[0].price * item.number
        let obj = {}
        obj.Allnum = state.Allnum
        obj.Allprice = state.Allprice
        localStorage.setItem('All', JSON.stringify(obj))
    })
}
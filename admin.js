var EventBus=new Vue;

Vue.component('app-icon',{
    template:'<i :class="cssClass" aria-hidden="true"></i>',
    props:['img'],
    computed:{
        cssClass:function(){
            return "fa fa-"+this.img;
        }
    }
});

Vue.component('app-task',{
    data:function(){
        return{
            editting:false,
            draft:''
        }
    },
    template:'#task-template',
    props:['task','index'],
    created:function(){
        EventBus.$on('editting',function(index){
            {
                if(this.index != index){
                    this.discard();
                }
            }
        }.bind(this));
    },
    methods:{
        toggleStatus:function(){
            this.pending = !this.task.pending;
        },
        edit:function(){
            EventBus.$emit('editting',this.index);

            this.draft=this.task.description;

            this.editting=true;
        },
        update:function(){
          this.task.description=this.draft;  
          this.editting=false;
        },
        discard:function(){
          this.editting=false;  
          this.draft='';
        },
        remove:function(){
            this.$emit('remove','this.index');
        },
    }

});

var vm = new Vue({
            el:'#app',
            data:{
                draft:'',
                newTask:'',
                tasks:[
                {
                    description:'Aprender Vue.js',
                    
                    pending:true
                },
                {
                    description:'Suscribirse a Styde',
                    
                    pending:true
                },
                {
                    description:'Hacer los ejercicios',
                    
                    pending:false
                }

                ],
            },
            methods:{
                createTask:function(){
                    this.tasks.push({
                           description:this.newTask,
                           editting:false,
                           pending:true
                    });
                    this.newTask='';
                },
                
                deleteTask:function(index){
                    this.tasks.splice(index, 1);
                },
                deleteCompleted:function(){
                    this.tasks = this.tasks.filter(function(task){
                        return task.pending;
                    })
                }
            }
        });
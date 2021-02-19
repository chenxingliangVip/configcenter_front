<template>
    <div class="Approval">
        <ExpenseMenu @showFun='getShow'></ExpenseMenu>
        <div class="ApprovalBody">
            <project v-if="showNav==1"></project>
            <contract v-else-if="showNav==2"></contract>
            <purchase v-else-if="showNav==3"></purchase>
        </div>
    </div>
</template>

<script>
    import ExpenseMenu from '@/components/SomeMenu/ExpenseMenu'
    import Project from './Project'
    import Contract from './Contract'
    import Purchase from './Purchase'
    export default {
        data(){
            return{
                showNav: 1,
            }
        },
        methods: {
            getShow(msg){ 
                this.showNav = msg
            }
        },
        components: {
            ExpenseMenu,
            Project,
            Contract,
            Purchase
        }
    }
</script>
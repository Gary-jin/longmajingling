<template>
    <div class="v-dialog fontS_10">
        {{text}}
    </div>
</template>
<script >
    import "@/assets/js/iconfont/iconfont.css";
    import {Component, Vue,Prop} from 'vue-property-decorator';

    @Component
    export default class Dialog  extends Vue {
        @Prop(String) width;
        @Prop(String) text;
    }
</script>
<style lang="scss">
.v-dialog{
    position: relative;
    display: flex;
    padding: 4px 7px;
    color: white;
    margin-right: calc(-50% + 20px);
    background-color: rgba(0,0,0,.2);
    margin-top:10px;
    border-radius: 3px;
    white-space: nowrap;
    &::before{
        content: "";
        display: block;
        height: 0;
        border: 6px solid  transparent;
        border-bottom-color: rgba(0,0,0,.2);
        position: absolute;
        top:-12px;
        left: 50%;
        margin-left: -2px;
    }
}
</style>

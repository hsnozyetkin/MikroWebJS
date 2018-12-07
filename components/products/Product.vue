<template>
    <div class="row rowContainer w-100 border text-nowrap mb-2 bg-light">
        <div class="col-12 mb-2"><strong class="text-info"> {{ index }} {{ product.sto_isim }} </strong></div>
        <div class="col-sm-12 col-md-4 mb-1">
            <div class="col-12"><strong>Ana Grubu</strong> <span class="badge badge-info"> Yüzey Rem Rustikli </span> </div>
        </div>
        <div class="col-sm-12 col-md-4 mb-1">
            <div class="col-12"><strong>Alt Grubu</strong> <span class="badge badge-info"> Yüzey Rem Rustikli </span> </div>
        </div>
        <div class="col-sm-12 col-md-4 mb-1">
            <div class="col-12"><div class="row"><div class="col-9"><strong>Bölüm Deposu :</strong></div> <div class="col-3 p-0"><span class="w-100 badge badge-info"> 1568 </span></div> </div></div>
            <div class="col-12"><div class="row"><div class="col-9"><strong>Toplam Depo Miktarı :</strong></div> <div class="col-3 p-0"><span class="w-100 badge badge-success"> 6876 </span></div></div> </div>
        </div>
        <div class=" col-12">
            <div class="row">
                <hr>
                <div class="col-md-6 col-sm-12">
                    <button type="button" class="btn btn-primary btn-sm btn-block mb-2 w-75 mx-auto">Kartı Düzenle</button>
                </div>
                <div class="col-md-6 col-sm-12">
                    <button type="button" class="btn btn-danger btn-sm btn-block mb-2 w-75 mx-auto">Kartı Sil</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["product","index"]
    }
</script>

<style scoped>

</style>


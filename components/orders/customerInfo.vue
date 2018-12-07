<template>
    <div class="customerInfo col-12">
        <div class="row">
            <div class="col-12 p-0">
                <div class="card border-0 w-100">
                    <div class="card-header bg-info py-1 text-center">
                        <strong class="text-light text-center">Müşteri Detayları</strong>
                    </div>
                    <div class="card-body">
                        <!-- <h5 class="card-title">Special title treatment</h5> -->
                        <table class="table table-sm w-50">
                            <tbody>
                                <tr>
                                    <td><fa class="ml-2" :icon="faPhoneVolume" /> </td>
                                    <td> {{ customerinfo.cari_CepTel }} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <fa class="ml-2" :icon="faMailBulk" />
                                    </td>
                                    <td>
                                        {{ customerinfo.cari_EMail }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

//import { faPhone, faPhoneVolume,faMailBulk } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
    }
  },
  props: ["customerinfo"],
  computed: {
    /*faAd() {
      return faPhone;
    },
    faPhoneVolume() {
      return faPhoneVolume;
    },
    faMailBulk(){
        return faMailBulk;
    }*/
  }
};
</script>

<style scoped>
.customerInfo {
    color: #000;
}
</style>

<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="Periodo">
            <el-input v-model="form.periodo" placeholder="AAAAMM" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Descrição">
            <el-input v-model="form.descricao" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Indicador">
            <el-select
              v-model="form.idindicador"
              filterable
              allow-create
              default-first-option
              placeholder="Escolha o Indicador"
            >
              <el-option
                v-for="item in indicadorPrin"
                :key="item.id"
                :label="item.descricao"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Modo do Indicador" inline="true">
            <el-select
              v-model="form.modoindicador"
              placeholder="Selecione o Modo do Indicador"
            >
              <el-option label="CALCULO SOMA" value="CSM" />
              <el-option label="CALCULO SUBTRAI" value="CSB" />
              <el-option label="CALCULO MULTIPLICA" value="CMU" />
              <el-option label="CALCULO DIVIDE" value="CDI" />
              <el-option label="UNITARIO" value="UNI" />
              <el-option label="CONTAR" value="CON" />
              <el-option label="NAO FAZ PARTE" value="NDA" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Incluso no Cálculo">
            <el-switch v-model="form.incluso" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Cálculo Inverso">
            <el-switch v-model="form.inverso" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Meta">
            <el-input-number
              v-model="form.meta"
              placeholder="0.00"
              label="Meta"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Descrição">
            <el-input-number
              v-model="form.resultado"
              placeholder="0.00"
              label="Resultado"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { NovoIndicador, IndicadorPrincipal } from "../../api/dashboard";

export default {
  data() {
    return {
      form: {
        id: "",
        periodo: "",
        idindicador: '',
        modoindicador: "",
        incluso: false,
        inverso: false,
        descricao: "",
        meta: 0,
        resultado: 0
        // ITENS PADRÃ•ES DO USUARIO

        //
        // */
      },
      indicadorPrin: null,
    };
  },
  created() {
    IndicadorPrincipal().then((response)=>{
      this.indicadorPrin = response.results
      console.log(this.indicadorPrin)
      this.form = 
    });
  },
  methods: {
    onSubmit() {
      this.form.idfilial = this.$store.getters.user.filial.id;
      this.form.idempresa = this.$store.getters.user.empresa.id;
      this.form.criadopor = this.$store.getters.user.id;
      // Colocar o indicador pq precisa
      NovoIndicador(this.form).then((response) => {
        this.$message("Indicador Criado conforme solicitado!");
      this.$router.push('/CadastroAV/Indicadores/')
      });
    },
    onCancel() {
      this.$router.push('/CadastroAV/Indicadores/')
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>


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
          <el-form-item label="Codigo">
            <el-input-number
              v-model="form.codigo"
              placeholder="0"
              label="Meta"
            ></el-input-number>
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
        <el-col :span="12"> </el-col>
        <el-col :span="16">
          <el-form-item label="Modo do Indicador" inline="true">
            <el-select
              v-model="form.modo"
              placeholder="Selecione o Modo do Indicador"
            >
              <el-option label="CALCULO" value="CAL" />
              <el-option label="CONTAR" value="CON" />
              <el-option label="UNITARIO" value="UNI" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> </el-col>
        <el-col :span="12">
          <el-form-item label="Cálculo Inverso">
            <el-switch v-model="form.inverso" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Peso">
            <el-input-number
              v-model="form.peso"
              placeholder="0.00"
              label="Meta"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Criar</el-button>
        <el-button @click="onCancel">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { NovoIndicadorPrincipal } from "../../api/indicadorPrincipal";

export default {
  data() {
    return {
      form: {
        codigo: "",
        modo: "",
        inverso: false,
        descricao: "",
        peso: 0,
      },
      indicadorPrin: null,
    };
  },
  created() {
    IndicadorPrincipal().then((response) => {
      this.indicadorPrin = response.results;
    });
  },
  methods: {
    onSubmit() {
      this.form.idfilial = this.$store.getters.user.filial.id;
      this.form.idempresa = this.$store.getters.user.empresa.id;
      this.form.criadopor = this.$store.getters.user.id;
      // Colocar o indicador pq precisa
      NovoIndicadorPrincipal(this.form).then((response) => {
        this.$message({
            type: "success",
            message: "Indicador Criado conforme solicitado!",
          });
        this.$router.push({name: 'IndicadoresPrincipalList' });
      });
    },
    onCancel() {
      this.$router.push({name: 'IndicadoresPrincipalList' });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>


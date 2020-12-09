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
          <el-form-item label="Código Filial">
            <el-input v-model="form.codfilial" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="CNPJ">
            <el-input v-model="form.cnpj" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Nome">
            <el-input v-model="form.nomefilial" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"> </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Indicador">
            <el-select
              v-model="form.idempresa"
              filterable
              allow-create
              default-first-option
              placeholder="Escolha o Indicador"
            >
              <el-option
                v-for="item in empresas"
                :key="item.id"
                :label="item.nomeempresa"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Alterar</el-button>
        <el-button @click="onCancel">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { empresaList,  } from "../../api/empresas";
import { detalheFilialid, filialEditar, } from "../../api/filiais";
export default {
  data() {
    return {
      form: {
        id: "",
        codfilial: "",
        nomefilial: "",
        ativo: true,
        cnpj: "",
        idempresa: "",
      },
      empresas: null,
    };
  },
  created() {
    detalheFilialid(this.$route.query.id).then((response) => {
      this.form = response
    });
    empresaList().then((response) => {
      this.empresas = response.results;
    });
  },
  methods: {
    onSubmit() {
      
      this.form.criadopor = this.$store.getters.user.id;
      delete this.form.empresa
      console.log(this.form);
      // Colocar o indicador pq precisac
      filialEditar(this.form).then((response) => {
        this.$message("Filial alterada conforme solicitado!");
        this.$router.push("/administracao/filiais/");
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    onCancel() {
      this.$router.push("/administracao/empresas/");
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>


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
          <el-form-item label="Código Empresa">
            <el-input v-model="form.codempresa" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Nome">
            <el-input v-model="form.nomeempresa" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"> </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Ativo">
            <el-switch v-model="form.ativo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Logo da Empresa">
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
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
import { empresaNovo } from "../../api/empresas";

export default {
  data() {
    return {
      form: {
        codempresa: "",
        nomeempresa: "",
        ativo: true,
      },
      file: "",
      fileData: {},
    };
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      formData.append("logoempresa", this.file);
      formData.append("codempresa", this.form.codempresa);
      formData.append("nomeempresa", this.form.nomeempresa);
      formData.append("ativo", this.form.ativo);
      formData.append("criadopor", this.$store.getters.user.id);

      console.log(formData);
      // Colocar o indicador pq precisac
      empresaNovo(formData).then((response) => {
        this.$message("Empresa Criada conforme solicitado!");
        this.$router.push("/administracao/empresas/");
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

